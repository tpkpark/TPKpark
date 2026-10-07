"""Approximate historical building footprints; not current surveyed outlines."""
import runpy,json
from pathlib import Path
source=runpy.run_path('scripts/map/derive-shop-layout.py');xy=source['xy']
# Traces use the full 1667x1179 architectural site-plan render.
# Address evidence is documented in docs/map-review/README.md.
def rectangle(l,t,r,b):return [[l,t],[r,t],[r,b],[l,b]]
traces=[]
for n,rect in {2:[1138,627,1184,664],4:[1136,712,1182,750],6:[1134,784,1180,821],8:[1133,865,1179,903]}.items():
 traces.append((n,'2/2',rectangle(*rect),'Annotated DYM TPK2 layout'))
traces.extend([
 (7,'2/3',rectangle(1047,865,1093,903),'Annotated DYM TPK2 layout; No.7 tenancy floor plan'),
 (8,'2/3',rectangle(895,850,942,887),'Annotated DYM TPK2 layout; Ops Hub premises address'),
 # Annotated layout in No.59 tenancy folder explicitly labels 59 through 77.
 (59,'2/8',[[692,1014],[726,1004],[733,1032],[699,1042]],'Annotated No.59 tenancy layout'),
 (61,'2/8',[[660,1023],[692,1014],[699,1042],[667,1051]],'Annotated No.59 tenancy layout'),
 (63,'2/8',[[596,1035],[630,1034],[631,1059],[597,1060]],'Annotated No.59 tenancy layout'),
 (65,'2/8',[[560,1036],[596,1035],[597,1060],[561,1061]],'Annotated No.59 tenancy layout'),
 (71,'2/8',[[408,1039],[442,1038],[442,1064],[408,1065]],'Annotated No.59 tenancy layout'),
])
features=[]
for n,street,points,evidence in traces:
 ring=[xy(p) for p in points+[points[0]]]
 features.append(dict(type='Feature',properties=dict(id=f'tpk-{street.replace("/","-")}-{n}',number=n,street=f'Jalan TPK {street}',precision='plan-derived-approximate',entranceVerified=False,source=f'Archival architectural site plan; {evidence}; OSM alignment'),geometry=dict(type='Polygon',coordinates=[ring])))
section1=runpy.run_path('scripts/map/derive-section1-layout.py')
features.extend(section1['features'])
Path('assets/map/building-premises.geojson').write_text(json.dumps(dict(type='FeatureCollection',description='Approximate archival buildings and premises areas. Current extensions, surveyed boundaries and visitor entrances unverified.',section1Alignment=section1['alignment'],licence='OSM-derived alignment: Open Database Licence (ODbL) 1.0',features=features),separators=(',',':'))+'\n')

Path('docs/map-review/section1-candidates.geojson').write_text(json.dumps(dict(type='FeatureCollection',description='No outstanding candidates. Owner confirmed A=Fadzil and B=Toyokar on 2026-10-07; both are now in visitor map data.',features=section1['candidates']),indent=2)+'\n')
