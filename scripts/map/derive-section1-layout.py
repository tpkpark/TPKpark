"""Section 1 plot alignment; candidate assignments stay outside visitor map data."""
import numpy as np
# Pixel controls in the 893x1263 combined site-plan review render.
controls=[
 ([262,258],[101.6347197,3.0486833]), # 1/2 x 1/4
 ([378,254],[101.6354580,3.0486719]), # 1/1 x 1/4
 ([262,405],[101.6347198,3.0478013]), # 1/2 x 1/3
 ([262,556],[101.6347215,3.0468455]), # 1/2 x 1/5
 ([378,552],[101.6354367,3.0468381]), # 1/1 x 1/5
 ([267,657],[101.6347012,3.0462452]), # 1/8 x 1/6
 ([135,560],[101.6338803,3.0468572]), # 1/3 x 1/5
]
a=np.array([[*p,1] for p,q in controls]);b=np.array([q for p,q in controls]);fit=np.linalg.lstsq(a,b,rcond=None)[0]
errors=(a@fit-b)*[111160,111320]
alignment=dict(method='affine least-squares; seven Section 1 road junctions',controlCount=7,controlResidualRMSEMetres=round(float(np.sqrt((errors**2).sum(1).mean())),1),warning='Fit residual is not absolute positional accuracy. Archival scan and OSM road errors remain.')
def xy(p):return [round(float(v),7) for v in np.array([*p,1])@fit]
def feature(id,number,street,points,source,confirmed):
 return dict(type='Feature',properties=dict(id=id,number=number,street=street,precision='plan-derived-approximate',geometryRole='premises-area',entranceVerified=False,addressMatchConfirmed=confirmed,source=source),geometry=dict(type='Polygon',coordinates=[[xy(p) for p in points+[points[0]]]]))
# The annotated No.4 layout points to the second plot west of the main entrance.
# Trace the corresponding whole plot in the combined plan; do not call it a roof outline.
features=[feature('tpk-1-4-4',4,'Jalan TPK 1/4',[[330,188],[355,187],[355,237],[330,238]],'Owner-confirmed No.4 next to management office No.2 (2026-10-07); annotated management layout + combined site plan + seven OSM junction controls',True)]
# Unlabelled parcels: inferred ordering only. Review data, never visitor-map assignments.
candidates=[
 feature('candidate-fadzil',3,'Jalan TPK 1/3',[[90,391],[134,393],[125,485],[82,482]],'Candidate northern detached plot; address-to-plot assignment requires owner confirmation',False),
 feature('candidate-toyokar',7,'Jalan TPK 1/3',[[73,581],[116,584],[105,674],[62,671]],'Candidate southern detached plot; address-to-plot assignment requires owner confirmation',False),
]
