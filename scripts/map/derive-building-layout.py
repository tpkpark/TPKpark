"""Approximate historical building footprints; not current surveyed outlines."""
import runpy,json
from pathlib import Path
source=runpy.run_path('scripts/map/derive-shop-layout.py');xy=source['xy']
# Address order checked against annotated DYM TPK2 layout. Building rectangles
# traced on full archival architectural site plan (same render and alignment).
rects={2:[1138,627,1184,664],4:[1136,712,1182,750],6:[1134,784,1180,821],8:[1133,865,1179,903]}
features=[]
for n,(l,t,r,b) in rects.items():
 ring=[xy(p) for p in [[l,t],[r,t],[r,b],[l,b],[l,t]]]
 features.append(dict(type='Feature',properties=dict(id=f'tpk-2-2-{n}',number=n,street='Jalan TPK 2/2',precision='plan-derived-approximate',entranceVerified=False,source='Archival architectural site plan; address sequence from annotated DYM TPK2 layout; OSM alignment'),geometry=dict(type='Polygon',coordinates=[ring])))
Path('assets/map/building-premises.geojson').write_text(json.dumps(dict(type='FeatureCollection',description='Approximate archival building footprints. Current extensions and visitor entrances unverified.',licence='OSM-derived alignment: Open Database Licence (ODbL) 1.0',features=features),separators=(',',':'))+'\n')
