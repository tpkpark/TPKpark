// Street-address/bay sequence checked against management's leasable-area register
// and archival architectural plans on 2026-10-07. No geographic coordinates.
// This is a public location subset, not the private tenancy/occupancy database.
export const shopBlocks = [
 {id:'A',firstNumber:1,lastNumber:23,bays:12},
 {id:'B',firstNumber:25,lastNumber:41,bays:9},
 {id:'C',firstNumber:43,lastNumber:57,bays:8}
];
export const shopPremises = shopBlocks.flatMap(block => Array.from({length:block.bays},(_,i)=>({
 id:`tpk-2-8-${block.firstNumber+i*2}`,number:block.firstNumber+i*2,street:'Jalan TPK 2/8',block:block.id,bay:i+1,
 floors:['ground','first'],verification:'address-to-bay',checkedAt:'2026-10-07',coordinates:null
})));
// Public visitor premises only. A lease does not by itself prove visitor access.
export const businessPremises = {
 motd:[[1,'ground'],[3,'ground']],
 vHausLiving:[[1,'first'],[3,'first'],[5,'ground'],[5,'first']],
 baagus:[[7,'ground']],signature:[[9,'ground']],mkCurtain:[[11,'ground']],acesGymnasticAcademy:[[11,'first']],
 builtop:[[13,'first']],speedmart99:[[19,'ground'],[21,'ground']],chooseInterior:[[21,'first']],jazminaBistro:[[23,'ground']],klot:[[23,'first']],
 premioDoor:[[25,'ground']],balensDesign:[[25,'first']],happivilles:[[31,'first']],
 kucheBath:[[39,'ground']], // Preferred visitor destination. Do not turn lease extent into multiple businesses.
 nuarina:[[41,'ground']],yummyNyonya:[[43,'ground']],fagolli:[[43,'first']],dcMoto:[[49,'ground']]
};
export function premisesForBusiness(id){return (businessPremises[id]||[]).map(([number,floor])=>({...shopPremises.find(x=>x.number===number),floor}));}
