"""Render an independent road/plot review diagram; no private drawings reproduced."""
import json,runpy
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Polygon
s=runpy.run_path('scripts/map/derive-section1-layout.py')
fig,ax=plt.subplots(figsize=(10,10),dpi=150)
fig.patch.set_facecolor('#f5f2ea');ax.set_facecolor('#f5f2ea')
for f in json.load(open('assets/map/context.geojson'))['features']:
 if f['geometry']['type']=='LineString':
  xs,ys=zip(*f['geometry']['coordinates']);ax.plot(xs,ys,color='#d7d1c3',linewidth=5,zorder=1);ax.plot(xs,ys,color='#ffffff',linewidth=2,zorder=2)
for f in s['features']+s['candidates']:
 confirmed=f['properties']['addressMatchConfirmed'];ax.add_patch(Polygon(f['geometry']['coordinates'][0],facecolor='#426f5b' if confirmed else '#e8bf73',edgecolor='#244a38' if confirmed else '#986413',linestyle='-' if confirmed else '--',linewidth=2,zorder=3,alpha=.9))
def centre(f):
 g=f['geometry']['coordinates'][0][:-1];return tuple(sum(x[i] for x in g)/len(g) for i in range(2))
labels=[(s['features'][0],'JAECOO\nNo.4, Jalan TPK 1/4\nPlot matched',(101.63475,3.04955)),(s['features'][1],'A · FADZIL\nNo.3, Jalan TPK 1/3\nNorthern detached premises',(101.63292,3.04835)),(s['features'][2],'B · TOYOKAR\nNo.7, Jalan TPK 1/3\nSouthern detached premises',(101.63292,3.0458))]
for f,text,pos in labels:
 ax.annotate(text,xy=centre(f),xytext=pos,fontsize=10,fontweight='bold',color='#20392e',ha='left',va='center',arrowprops={'arrowstyle':'-','color':'#314d3d','lw':1.3},bbox={'boxstyle':'round,pad=.5','fc':'#fffcf5','ec':'#d7d1c3'},zorder=5)
for text,xy,rot in [('Jalan TPK 1/4',(101.63485,3.0486),0),('Jalan TPK 1/3',(101.63394,3.04713),90),('Jalan TPK 1/5',(101.63465,3.04691),0),('Jalan TPK 1/6',(101.63465,3.0463),0),('Jalan TPK 1/2',(101.63478,3.04732),90),('Jalan TPK 1/1',(101.63552,3.04745),90)]:ax.text(*xy,text,fontsize=9,color='#506456',rotation=rot,ha='center',va='center',zorder=4)
# Owner-confirmed neighbouring office provides a familiar visual reference.
office=s['xy']([370,213]);ax.plot(*office,marker='s',color='#446579',markersize=6,zorder=4)
ax.annotate('No.2 · TPK Park\nManagement Office',xy=office,xytext=(101.63465,3.04898),fontsize=9,color='#314d3d',ha='right',va='center',arrowprops={'arrowstyle':'-','color':'#446579'},bbox={'boxstyle':'round,pad=.4','fc':'#fffcf5','ec':'#d7d1c3'},zorder=5)
ax.annotate('N',xy=(101.6329,3.0495),xytext=(101.6329,3.04918),ha='center',arrowprops={'arrowstyle':'-|>','color':'#244a38'},fontsize=12,fontweight='bold')
ax.plot([101.63305,101.63395],[3.04536,3.04536],color='#244a38',lw=3);ax.text(101.6335,3.0454,'Approx. 100 m',ha='center',fontsize=9)
ax.set_xlim(101.63265,101.63595);ax.set_ylim(3.04515,3.0498);ax.set_aspect(1);ax.axis('off')
fig.suptitle('Section 1 · Confirmed locations',fontsize=20,fontweight='bold',color='#20392e',y=.975)
fig.text(.5,.935,'Address-to-plot assignments confirmed by management · 7 October 2026',ha='center',fontsize=11,color='#506456')
fig.text(.5,.05,'Approximate premises areas, not entrances or surveyed boundaries.',ha='center',fontsize=9,color='#506456')
fig.text(.5,.028,'Road geometry © OpenStreetMap contributors · ODbL | Plot tracing: archival management plan',ha='center',fontsize=8,color='#506456')
fig.savefig('docs/map-review/section1-confirmation.png',facecolor=fig.get_facecolor(),bbox_inches='tight')
