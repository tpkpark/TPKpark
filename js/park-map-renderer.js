const loadLeaflet=()=>new Promise((resolve,reject)=>{
 if(window.L)return resolve(window.L);
 const css=document.createElement('link');css.rel='stylesheet';css.href='/assets/map/leaflet/leaflet.css';document.head.append(css);
 const js=document.createElement('script');js.src='/assets/map/leaflet/leaflet.js';js.onload=()=>resolve(window.L);js.onerror=reject;document.head.append(js);
});
export async function createMap(canvas,{copy:c,entries,officeIcon,onSelect}){
 const [L,response,shopResponse,buildingResponse]=await Promise.all([loadLeaflet(),fetch('/assets/map/context.geojson'),fetch('/assets/map/shop-premises.geojson'),fetch('/assets/map/building-premises.geojson')]);
 if(!response.ok||!shopResponse.ok||!buildingResponse.ok)throw new Error('Map data unavailable');
 const context=await response.json(),shops=await shopResponse.json(),buildings=await buildingResponse.json();
 const map=L.map(canvas,{scrollWheelZoom:false,attributionControl:true,zoomControl:false,minZoom:15,maxZoom:21,zoomSnap:0.25});
 L.control.zoom({zoomInTitle:c.zoomIn,zoomOutTitle:c.zoomOut}).addTo(map);
 L.control.scale({imperial:false,position:'bottomleft'}).addTo(map);
 map.attributionControl.setPrefix(false);map.attributionControl.addAttribution('© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a> · ODbL');
 const roads=context.features.filter(x=>x.geometry.type==='LineString');
 const streetRoads=roads.filter(x=>/^Jalan TPK /.test(x.properties.name||''));
 L.geoJSON(context,{interactive:false,style:f=>f.geometry.type==='Polygon'?{color:'#c4cbbf',weight:1,fillColor:'#dce1d7',fillOpacity:.8}:{color:f.properties.name?.startsWith('Jalan TPK')?'#fffef9':'#e5dcca',weight:f.properties.highway?.includes('trunk')?8:5,opacity:1}}).addTo(map);
 const bounds=L.geoJSON({type:'FeatureCollection',features:streetRoads}).getBounds().pad(.10);
 map.setMaxBounds(bounds.pad(.6));
 const highlight=L.geoJSON(null,{interactive:false,style:{color:'#a86d26',weight:7,opacity:.9}}).addTo(map);
 const labels=L.layerGroup().addTo(map);let activeStreet='';
 const labelRoads=[...new Map(streetRoads.map(x=>[x.properties.name,x])).values()];
 function refreshLabels(){
  labels.clearLayers();const placed=[];
  const priority=new Set(['Jalan TPK 1/3','Jalan TPK 1/4','Jalan TPK 2/2','Jalan TPK 2/3','Jalan TPK 2/8']);
  const ordered=[...labelRoads].sort((a,b)=>Number(b.properties.name===activeStreet)-Number(a.properties.name===activeStreet)||Number(priority.has(b.properties.name))-Number(priority.has(a.properties.name)));
  for(const road of ordered){const name=road.properties.name;const coords=road.geometry.coordinates;const mid=coords[Math.floor(coords.length/2)];const ll=[mid[1],mid[0]],pixel=map.latLngToContainerPoint(ll);if(placed.some(p=>Math.abs(p.x-pixel.x)<64&&Math.abs(p.y-pixel.y)<23))continue;placed.push(pixel);const text=document.createElement('span');text.textContent=name.replace('Jalan ','');L.marker(ll,{interactive:false,icon:L.divIcon({className:'park-road-label',html:text,iconSize:[70,20],iconAnchor:[35,10]})}).addTo(labels);}
 }
 map.on('zoomend moveend resize',refreshLabels);
 function reset(){map.fitBounds(bounds,{padding:[24,24],animate:false});}
 // Whole approximate premises, never asserted entrance pins. Co-located floors
 // share a footprint and a chooser instead of displacing markers.
 let visible=new Set(entries.map(x=>x.id)),active=null;
 // This icon marks an approximate premises centre, never a verified entrance.
 const officeEntry=entries.find(e=>e.id==='tpk-management-office');
 const officeLayer=officeEntry?L.marker([officeEntry.coordinates[1],officeEntry.coordinates[0]],{title:officeEntry.name,alt:officeEntry.name,keyboard:true,icon:L.divIcon({className:'park-office-icon',html:officeIcon,iconSize:[32,32],iconAnchor:[16,16]})}).on('click',()=>onSelect(officeEntry.id)):null;
 if(officeLayer){const label=document.createElement('span');label.textContent=officeEntry.name;officeLayer.bindTooltip(label,{direction:'top',offset:[0,-18]});}
 function refreshOffice(){
  if(!officeLayer)return;
  if(visible.has(officeEntry.id)){if(!map.hasLayer(officeLayer))officeLayer.addTo(map);}else if(map.hasLayer(officeLayer))map.removeLayer(officeLayer);
  const el=officeLayer.getElement();if(el){el.classList.toggle('is-selected',active?.id===officeEntry.id);el.setAttribute('data-map-office','true');el.setAttribute('aria-label',officeEntry.name);el.setAttribute('aria-pressed',String(active?.id===officeEntry.id));}
 }
 // Management confirmed the pickup outside Shop 23. Anchor its symbol to
 // the road-facing edge of the existing plan geometry, not the whole street.
 const pickupEntry=entries.find(e=>e.id==='drt-pickup');
 const pickupShop=shops.features.find(f=>f.properties.number===pickupEntry?.frontage?.shopNumber);
 let pickupLayer=null;
 if(pickupShop){
  const ring=pickupShop.geometry.coordinates[0],edge=pickupEntry.frontage.edge;
  const a=ring[edge],b=ring[(edge+1)%(ring.length-1)];
  const lat=(a[1]+b[1])/2,frontLng=(a[0]+b[0])/2;
  // Shop 23 fronts west onto Jalan TPK 2/8; place the symbol in its forecourt.
  const lng=frontLng-pickupEntry.frontage.offsetMetres/(111320*Math.cos(lat*Math.PI/180));
  const label=document.createElement('span');label.textContent='DRT';
  pickupLayer=L.marker([lat,lng],{title:pickupEntry.address,alt:pickupEntry.name,keyboard:true,zIndexOffset:500,icon:L.divIcon({className:'park-drt-icon',html:label,iconSize:[38,28],iconAnchor:[19,14]})}).on('click',()=>onSelect(pickupEntry.id));
  const tooltip=document.createElement('span');tooltip.textContent=pickupEntry.address;
  pickupLayer.bindTooltip(tooltip,{direction:'top',offset:[0,-16]});
 }
 function refreshPickup(){
  if(!pickupLayer)return;
  if(visible.has(pickupEntry.id)){if(!map.hasLayer(pickupLayer))pickupLayer.addTo(map);}else if(map.hasLayer(pickupLayer))map.removeLayer(pickupLayer);
  const el=pickupLayer.getElement();if(el){el.classList.toggle('is-selected',active?.id===pickupEntry.id);el.setAttribute('data-map-drt','true');el.setAttribute('aria-label',pickupEntry.name+' · '+pickupEntry.address);el.setAttribute('aria-pressed',String(active?.id===pickupEntry.id));}
 }
 const shopLayers=new Map(),numberLabels=L.layerGroup().addTo(map);
 const occupants=number=>entries.filter(e=>visible.has(e.id)&&e.premises?.some(p=>p.number===number));
 function selectedUnit(number){return active?.premises?.some(p=>p.number===number);}
 function style(feature){const populated=occupants(feature.properties.number).length>0,on=selectedUnit(feature.properties.number);return {color:on?'#a86d26':populated?'#173e31':'#89958a',weight:on?3:1,fillColor:on?'#d5a965':populated?'#456e55':'#cbd2c7',fillOpacity:on?.9:populated?.65:.3,dashArray:'3 2'};}
 function popup(feature){const {number,block}=feature.properties,box=document.createElement('div');box.className='park-unit-popup';const h=document.createElement('strong');h.textContent=`${c.block} ${block} · ${number}`;box.append(h);const list=occupants(number);
  if(!list.length){const p=document.createElement('p');p.textContent=c.noOccupants;box.append(p);}
  for(const e of list){const button=document.createElement('button');button.type='button';button.dataset.mapBusiness=e.id;button.textContent=e.name+' · '+e.premises.filter(p=>p.number===number).map(p=>c[p.floor]).join(' / ');button.onclick=()=>{map.closePopup();onSelect(e.id);};box.append(button);}return box;
 }
 const shopLayer=L.geoJSON(shops,{style,onEachFeature:(f,layer)=>{shopLayers.set(f.properties.number,layer);layer.on('add',()=>layer.getElement()?.setAttribute('data-shop-number',f.properties.number));layer.bindPopup(()=>popup(f));}}).addTo(map);
 function refreshShops(){shopLayer.setStyle(style);numberLabels.clearLayers();if(map.getZoom()<18)return;
  for(const [number,layer] of shopLayers){const el=document.createElement('span');el.textContent=number;L.marker(layer.getBounds().getCenter(),{interactive:false,icon:L.divIcon({className:'park-unit-number',html:el,iconSize:[24,18],iconAnchor:[12,9]})}).addTo(numberLabels);}
 }
 const buildingLayers=new Map();
 const buildingOccupants=id=>entries.filter(e=>visible.has(e.id)&&e.buildingIds?.includes(id));
 function buildingStyle(f){const on=active?.buildingIds?.includes(f.properties.id),populated=buildingOccupants(f.properties.id).length;return {color:on?'#a86d26':'#173e31',weight:on?3:1,fillColor:on?'#d5a965':'#456e55',fillOpacity:on?.9:populated?.65:.2,dashArray:'3 2'};}
 const buildingLayer=L.geoJSON(buildings,{style:buildingStyle,onEachFeature:(f,layer)=>{buildingLayers.set(f.properties.id,layer);layer.bindTooltip(String(f.properties.number),{permanent:false,direction:'center'});layer.on('add',()=>layer.getElement()?.setAttribute('data-building-id',f.properties.id));layer.bindPopup(()=>{const box=document.createElement('div');box.className='park-unit-popup';const h=document.createElement('strong');h.textContent=`${f.properties.number}, ${f.properties.street}`;box.append(h);for(const e of buildingOccupants(f.properties.id)){const b=document.createElement('button');b.type='button';b.dataset.mapBusiness=e.id;b.textContent=e.name;b.onclick=()=>{map.closePopup();onSelect(e.id);};box.append(b);}return box;});}}).addTo(map);
 map.on('zoomend',refreshShops);
 function select(entry){active=entry;activeStreet=entry?.street||'';highlight.clearLayers();refreshShops();refreshOffice();refreshPickup();buildingLayer.setStyle(buildingStyle);if(!entry)return reset();
  if(entry.id===pickupEntry?.id&&pickupLayer){map.setView(pickupLayer.getLatLng(),19,{animate:false});return;}
  if(entry.id===officeEntry?.id){map.setView([entry.coordinates[1],entry.coordinates[0]],19,{animate:false});return;}
  const units=[...(entry.premises?.map(p=>shopLayers.get(p.number))||[]),...(entry.buildingIds?.map(id=>buildingLayers.get(id))||[])].filter(Boolean);
  if(units.length){const b=L.latLngBounds([]);units.forEach(l=>b.extend(l.getBounds()));map.fitBounds(b.pad(.5),{padding:[60,60],maxZoom:19,animate:false});return;}
  const matched=streetRoads.filter(f=>f.properties.name===entry.street);if(!matched.length)return reset();highlight.addData({type:'FeatureCollection',features:matched});map.fitBounds(highlight.getBounds().pad(.20),{padding:[45,45],maxZoom:18,animate:false});
 }
 reset();refreshLabels();refreshShops();refreshOffice();refreshPickup();
 return {select,reset,filter(ids){visible=new Set(ids);map.closePopup();refreshShops();refreshOffice();refreshPickup();buildingLayer.setStyle(buildingStyle);},resize(){map.invalidateSize({animate:false});},destroy(){map.remove();}};
}
