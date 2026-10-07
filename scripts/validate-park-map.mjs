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
