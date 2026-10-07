const loadLeaflet=()=>new Promise((resolve,reject)=>{
 if(window.L)return resolve(window.L);
 const css=document.createElement('link');css.rel='stylesheet';css.href='/assets/map/leaflet/leaflet.css';document.head.append(css);
 const js=document.createElement('script');js.src='/assets/map/leaflet/leaflet.js';js.onload=()=>resolve(window.L);js.onerror=reject;document.head.append(js);
});
export async function createMap(canvas,{copy:c,entries}){
 const [L,response]=await Promise.all([loadLeaflet(),fetch('/assets/map/context.geojson')]);
 if(!response.ok)throw new Error('Map data unavailable');
 const context=await response.json();
 const map=L.map(canvas,{scrollWheelZoom:false,attributionControl:true,zoomControl:false,minZoom:15,maxZoom:19,zoomSnap:0.25});
 L.control.zoom({zoomInTitle:c.zoomIn,zoomOutTitle:c.zoomOut}).addTo(map);
 L.control.scale({imperial:false,position:'bottomleft'}).addTo(map);
 map.attributionControl.setPrefix(false);map.attributionControl.addAttribution('© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a> · ODbL');
 const roads=context.features.filter(x=>x.geometry.type==='LineString');
 const streetRoads=roads.filter(x=>/^Jalan TPK /.test(x.properties.name||''));
 L.geoJSON(context,{interactive:false,style:f=>f.geometry.type==='Polygon'?{color:'#c4cbbf',weight:1,fillColor:'#dce1d7',fillOpacity:.8}:{color:f.properties.name?.startsWith('Jalan TPK')?'#fffef9':'#e5dcca',weight:f.properties.highway?.includes('trunk')?8:5,opacity:1}}).addTo(map);
 const bounds=L.geoJSON({type:'FeatureCollection',features:streetRoads}).getBounds().pad(.10);
 map.setMaxBounds(bounds.pad(.6));
 const highlight=L.geoJSON(null,{interactive:false,style:{color:'#a86d26',weight:7,opacity:.9}}).addTo(map);
 const labels=L.layerGroup().addTo(map);const seen=new Set();
 for(const road of streetRoads){const name=road.properties.name;if(seen.has(name))continue;seen.add(name);const coords=road.geometry.coordinates;const mid=coords[Math.floor(coords.length/2)];const text=document.createElement('span');text.textContent=name.replace('Jalan ','');L.marker([mid[1],mid[0]],{interactive:false,icon:L.divIcon({className:'park-road-label',html:text,iconSize:[95,20],iconAnchor:[47,10]})}).addTo(labels);}
 function reset(){map.fitBounds(bounds,{padding:[24,24],animate:false});}
 // No business coordinates are currently independently verified. No road-centroid pins.
 // Exact pins must be implemented and tested once approved location records exist.
 function select(entry){highlight.clearLayers();if(!entry)return reset();const matched=streetRoads.filter(f=>f.properties.name===entry.street);if(!matched.length)return reset();highlight.addData({type:'FeatureCollection',features:matched});map.fitBounds(highlight.getBounds().pad(.20),{padding:[45,45],maxZoom:18,animate:false});}
 reset();
 return {select,reset,filter(){},resize(){map.invalidateSize({animate:false});},destroy(){map.remove();}};
}
