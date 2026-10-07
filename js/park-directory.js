const root=document.querySelector('[data-business-directory]');
const payload=JSON.parse(document.querySelector('#park-map-data').textContent);
const {entries,copy:c}=payload;
const byId=new Map(entries.map(x=>[x.id,x]));
const $=s=>root.querySelector(s);
const cards=[...root.querySelectorAll('[data-directory-entry]')];
const search=$('[data-directory-search]'),cluster=$('[data-directory-cluster]'),transport=$('[data-transport]');
const normalise=x=>x.normalize('NFKC').toLocaleLowerCase().trim();
let selected=null,view='list',mapModule=null,loading=null;
const emit=(action,target)=>document.dispatchEvent(new CustomEvent('tpk:map',{detail:{action,target}}));
const visibleIds=()=>cards.filter(x=>!x.hidden).map(x=>x.dataset.id);
function selectionFromURL(){const id=new URLSearchParams(location.hash.slice(1)).get('place');return byId.has(id)?id:null;}
function languageLinks(){for(const a of document.querySelectorAll('.locale-nav a')){const u=new URL(a.href);u.hash=selected?'place='+encodeURIComponent(selected):'';a.href=u.href;}}
function changeURL(id){const u=new URL(location.href);u.hash=id?'place='+encodeURIComponent(id):'';if(u.href!==location.href)history.pushState(null,'',u);}
function element(tag,text,className){const n=document.createElement(tag);n.textContent=text;if(className)n.className=className;return n;}
function renderDetail(){
 const box=$('[data-map-detail]');box.replaceChildren();
 if(!selected){box.append(element('p',c.select));return;}
 const x=byId.get(selected),heading=element('div','','park-detail-heading');
 const close=element('button',c.close);close.type='button';close.onclick=()=>{select(null,true);root.querySelector(`[data-select="${x.id}"]`).focus();};
 heading.append(element('h3',x.name),close);box.append(heading,element('p',x.category,'park-detail-category'),element('address',x.address),element('p',x.description),element('p',c.status,'park-location-status'));
 const links=element('div','','business-directory-actions');
 if(x.guide){const a=element('a',payload.guideLabel);a.href=x.guide;links.append(a);}
 if(x.map){const a=element('a',x.addressFallback?c.addressMap:c.directions);a.href=x.map;a.target='_blank';a.rel='noopener noreferrer';if(x.destination)a.dataset.directoryDestination=x.destination;links.append(a);}
 const share=element('button',c.share);share.type='button';share.onclick=async()=>{try{await navigator.clipboard.writeText(location.href);share.textContent=c.copied;}catch{share.textContent=c.copyFail;}};
 links.append(share);box.append(links);
}
function select(id,push=false){
 selected=byId.has(id)?id:null;
 for(const card of cards){const on=card.dataset.id===selected;card.classList.toggle('is-selected',on);card.querySelector('[data-select]').setAttribute('aria-pressed',String(on));}
 if(push)changeURL(selected);
 languageLinks();renderDetail();mapModule?.select(selected?byId.get(selected):null);
}
async function showMap(){
 view='map';root.classList.add('map-active');$('[data-map-panel]').hidden=false;
 for(const b of root.querySelectorAll('[data-view]'))b.setAttribute('aria-pressed',String(b.dataset.view===view));
 if(!loading){emit('open','directory');loading=import('./park-map-renderer.js').then(async module=>{mapModule=await module.createMap($('[data-map-canvas]'),payload);mapModule.filter(visibleIds());mapModule.select(selected?byId.get(selected):null);}).catch(()=>{$('[data-map-error]').hidden=false;});}
 await loading;mapModule?.resize();
}
function showList(){view='list';root.classList.remove('map-active');$('[data-map-panel]').hidden=true;for(const b of root.querySelectorAll('[data-view]'))b.setAttribute('aria-pressed',String(b.dataset.view===view));}
function update(){
 const terms=normalise(search.value).split(/\s+/).filter(Boolean);let business=0,poi=0;
 for(const card of cards){const isPoi=card.dataset.kind==='poi';const match=(isPoi?transport.checked:(!cluster.value||card.dataset.cluster===cluster.value||(cluster.value==='food'&&card.dataset.food==='true')))&&terms.every(t=>normalise(card.dataset.search).includes(t));card.hidden=!match;if(match){isPoi?poi++:business++;}}
 $('[data-directory-count]').textContent=String(business);$('[data-poi-count]').textContent=String(poi);$('[data-directory-empty]').hidden=business+poi!==0;
 if(selected&&!visibleIds().includes(selected))select(null,true);
 mapModule?.filter(visibleIds());
}
search.addEventListener('input',update);
cluster.addEventListener('change',()=>{update();emit('filter',cluster.value||'all');});
transport.addEventListener('change',()=>{update();emit('filter',transport.checked?'transport-on':'transport-off');});
$('[data-directory-reset]').onclick=()=>{search.value='';cluster.value='';transport.checked=true;select(null,true);update();mapModule?.reset();search.focus();};
root.querySelectorAll('[data-select]').forEach(b=>{b.hidden=false;b.onclick=async()=>{select(b.dataset.select,true);emit('select',b.dataset.select);await showMap();$('[data-map-detail]').focus({preventScroll:true});if(matchMedia('(max-width: 760px)').matches)$('[data-map-detail]').scrollIntoView({behavior:'instant',block:'nearest'});};});
$('[data-map-open]').hidden=false;$('[data-map-open]').onclick=showMap;
root.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>b.dataset.view==='map'?showMap():showList());
$('[data-map-reset]').onclick=()=>mapModule?.reset();
$('[data-directory-controls]').hidden=false;$('[data-map-toolbar]').hidden=false;
window.addEventListener('popstate',()=>{search.value='';cluster.value='';transport.checked=true;update();select(selectionFromURL());if(selected)showMap();});
window.addEventListener('hashchange',()=>{select(selectionFromURL());if(selected)showMap();});
update();select(selectionFromURL());if(selected)showMap();
