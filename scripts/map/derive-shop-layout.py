"""Approximate visitor footprints from archival site-plan tracing, not surveyed boundaries.
No original drawing or private tenancy data is redistributed.
"""
import json
from pathlib import Path
import numpy as np
# Pixel control points in the 1667x1179 review render. Cross-street junctions
# identify the same road centres in OSM; the archival plan predates current roads.
controls=[
 ([1006,571],[101.6359026,3.0478818]), # 2/1 x 2/3
 ([770,580],[101.6358835,3.0468298]), # 2/1 x 2/4
 ([1004,958],[101.6375459,3.0478214]), # 2/8 x 2/3
 ([770,943],[101.6374995,3.0467849]), # 2/8 x 2/4
 ([1240,964],[101.6375643,3.0489113]), # 2/8 x 2/2
]
a=np.array([[*p,1] for p,q in controls]);b=np.array([q for p,q in controls]);fit=np.linalg.lstsq(a,b,rcond=None)[0]
errors=(a@fit-b)*np.array([111160,111320]);rmse=float(np.sqrt((errors**2).sum(1).mean()))
def xy(p):return [round(float(v),7) for v in np.array([*p,1])@fit]
# Trace bay divisions on the FULL site plan. Lot 1 = address 1, lot 29 = address57.
# Block C bends after lot27; retain the bend instead of evenly spacing all lots.
A=[1230,1208,1195,1182,1168,1155,1142,1129,1115,1102,1089,1077,1063]
B=[1033,1007,993,980,966,953,940,927,914,888]
C=[888,873,861,849,836,822,800,778,748]
features=[]
for block,edges,start in [('A',A,1),('B',B,25),('C',C,43)]:
 def top(x):
  if block=='A':return 981
  if block=='B':return 973+(x-888)*.055
  return 968+(888-x)*(-.055) if x>=800 else 963.16+(800-x)*.27
 for i,(r,l) in enumerate(zip(edges,edges[1:])):
  corners=[[r,top(r)],[l,top(l)],[l,top(l)+43],[r,top(r)+43]]
  ring=[xy(p) for p in corners];ring.append(ring[0]);n=start+2*i
  features.append(dict(type='Feature',properties=dict(id=f'tpk-2-8-{n}',number=n,block=block,bay=i+1,precision='plan-derived-approximate',source='Archival architectural site plan + OSM road-centre controls; address sequence checked against management register',entranceVerified=False),geometry=dict(type='Polygon',coordinates=[ring])))
# Owner-requested visual alignment (2026-10-07): keep B/C between access roads.
# These are cartographic corrections to approximate outlines, not measured boundaries.
block_adjustments={"B":{"latitudeOrigin":3.04763495,"northScale":0.961,"northShiftMetres":8.901},"C":{"latitudeOrigin":3.04699225,"northScale":0.903,"northShiftMetres":4.571}}
for feature in features:
 adjustment=block_adjustments.get(feature['properties']['block'])
 if adjustment:
  origin=adjustment['latitudeOrigin']
  feature['geometry']['coordinates']=[[[lng,round(origin+(lat-origin)*adjustment['northScale']+adjustment['northShiftMetres']/111320,7)] for lng,lat in feature['geometry']['coordinates'][0]]]
  feature['properties']['source']+='; owner-requested road-clearance adjustment (2026-10-07)'
out=dict(type='FeatureCollection',description='Approximate shop premises for visitor orientation. Not cadastral boundaries or entrance coordinates.',licence='Contains OSM-derived alignment; Open Database Licence (ODbL) 1.0',alignment=dict(method='affine least-squares; five road-centre controls',controlResidualRMSEMetres=round(rmse,1),controlCount=5,warning='Residual is alignment fit only, not absolute positional accuracy. Archival-plan and OSM errors remain.'),features=features)
out['alignment']['blockAdjustments']=block_adjustments
out['alignment']['adjustmentNote']='B/C adjusted within mapped access roads with approximately 4m centreline clearance. Road widths and premises boundaries remain unverified.'
Path('assets/map/shop-premises.geojson').write_text(json.dumps(out,separators=(',',':'))+'\n')
print(out['alignment'])
