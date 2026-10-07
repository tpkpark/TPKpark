import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {site} from './site-data.mjs';
import {directoryEntries} from './business-directory.mjs';
import {mapEntries,transportEntry} from './park-map.mjs';
for(const locale of ['en','ms','zh']){
 test(`${locale}: every business represented once; transport remains separate`,()=>{
 const entries=mapEntries(site[locale]);assert.equal(entries.length,directoryEntries(site[locale]).length);assert.equal(new Set(entries.map(x=>x.id)).size,entries.length);
 for(const x of entries){assert.ok(x.street);assert.equal(x.status,'unlocated');assert.equal(x.coordinates,null);assert.equal(x.kind,'business');}
 assert.equal(transportEntry(locale).kind,'poi');assert.ok(!entries.some(x=>x.id==='drt-pickup'));
 });
 test(`${locale}: relocation and approved destinations preserved`,()=>{
 const entries=mapEntries(site[locale]),get=id=>entries.find(x=>x.id===id);
 assert.match(get('forseeLens').address,/53G/);assert.match(get('forseeLens').map,/53G/);assert.doesNotMatch(get('forseeLens').map,/\b71\b/);
 assert.match(get('kucheBath').map,/ChIJYc4kaEdLzDER458Isaliopc/);assert.match(get('kucheBath').address,/39G/);
 assert.doesNotMatch(get('fadzilEnterprise').map,/Serindit|ChIJk5RtBjtLzDERQKmx-S41mac/i);assert.match(get('fadzilEnterprise').map,/TPK/);assert.equal(get('fadzilEnterprise').addressFallback,true);
 assert.match(get('jaecooServiceCentre').name,/Puchong Kinrara/);assert.ok(!entries.some(x=>x.name==='Signature Space Sdn Bhd'));
 });
}
test('open map geometry covers required streets and advertises its licence',()=>{
 const data=JSON.parse(readFileSync('assets/map/context.geojson','utf8'));assert.match(data.licence,/odbl/);
 for(const name of ['Jalan TPK 1/3','Jalan TPK 1/4','Jalan TPK 2/2','Jalan TPK 2/3','Jalan TPK 2/8'])assert.ok(data.features.some(x=>x.properties.name===name),name);
 assert.ok(data.features.every(x=>['LineString','Polygon'].includes(x.geometry.type)));
});
test('no Google coordinate extraction, visitor geolocation or external map requests',()=>{
 const code=readFileSync('js/park-map-renderer.js','utf8');assert.doesNotMatch(code,/getCurrentPosition|watchPosition|tileLayer|maps\.google/);
 const markup=readFileSync('directory/index.html','utf8');assert.match(markup,/park-map-data/);assert.doesNotMatch(markup,/<script[^>]+src="[^\"]*leaflet/);assert.match(markup,/canonical[^>]+https:\/\/www.tpkpark.com\/directory\//);
});
const {shopBlocks,shopPremises,premisesForBusiness,businessPremises}=await import('./shop-premises.mjs');
test('29 shoplots recover the 12/9/8 bay sequence without creating coordinates',()=>{
 assert.deepEqual(shopBlocks.map(x=>x.bays),[12,9,8]);assert.equal(shopPremises.length,29);assert.equal(new Set(shopPremises.map(x=>x.number)).size,29);
 assert.deepEqual(shopPremises.map(x=>x.number),Array.from({length:29},(_,i)=>1+2*i));assert.ok(shopPremises.every(x=>x.coordinates===null));
});
test('floor-specific premises distinguish neighbours and retain preferred KBO destination',()=>{
 assert.equal(premisesForBusiness('jazminaBistro')[0].bay,12);assert.equal(premisesForBusiness('klot')[0].floor,'first');
 assert.equal(premisesForBusiness('premioDoor')[0].block,'B');assert.equal(premisesForBusiness('balensDesign')[0].number,25);
 assert.equal(premisesForBusiness('kucheBath')[0].number,39);assert.equal(premisesForBusiness('dcMoto')[0].bay,4);
 assert.equal(premisesForBusiness('vHausLiving').length,4);assert.equal(premisesForBusiness('forseeLens')[0].number,53);assert.equal(premisesForBusiness('forseeLens')[0].block,'C');assert.equal(premisesForBusiness('forseeLens')[0].bay,6);assert.equal(premisesForBusiness('forseeLens')[0].floor,'ground');
 for(const id of Object.keys(businessPremises))assert.ok(mapEntries(site.en).some(x=>x.id===id));
});

test('approximate shop geometry covers the same 29 numbered premises with explicit uncertainty',()=>{
 const data=JSON.parse(readFileSync('assets/map/shop-premises.geojson','utf8'));
 assert.equal(data.features.length,29);assert.match(data.licence,/ODbL/);
 assert.deepEqual(data.features.map(f=>f.properties.number),shopPremises.map(p=>p.number));
 for(const f of data.features){assert.equal(f.properties.precision,'plan-derived-approximate');assert.equal(f.properties.entranceVerified,false);const ring=f.geometry.coordinates[0];assert.deepEqual(ring[0],ring.at(-1));assert.ok(ring.every(([lng,lat])=>lng>101.637&&lng<101.639&&lat>3.046&&lat<3.05));}
 assert.ok(data.alignment.controlResidualRMSEMetres<5);assert.match(data.alignment.warning,/not absolute/);
});

test('frontage buildings preserve shared No.6 and independently identified addresses',()=>{
 const data=JSON.parse(readFileSync('assets/map/building-premises.geojson','utf8'));assert.deepEqual(data.features.map(f=>f.properties.number),[2,4,6,8]);
 const entries=mapEntries(site.en),get=id=>entries.find(e=>e.id===id);assert.deepEqual(get('lavino').buildingIds,get('totalTools').buildingIds);assert.deepEqual(get('optimumSwimSchool').buildingIds,['tpk-2-2-2']);assert.deepEqual(get('mazdaKinrara').buildingIds,['tpk-2-2-8']);assert.deepEqual(get('peroduaKinrara').buildingIds,[]);
 for(const f of data.features){assert.equal(f.properties.entranceVerified,false);assert.equal(f.properties.precision,'plan-derived-approximate');}
});
