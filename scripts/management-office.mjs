// Approximate premises centre from combined plan pixel [370,213], using the
// same seven road controls as derive-section1-layout.py. Not an entrance pin.
export const officeIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2m2 0h2M9 11h2m2 0h2M10 21v-6h4v6"/></svg>';
export const officeCopy = {
 en: {name:'TPK Park Sdn. Bhd. (Management Office)',category:'Company office',description:'Office for enquiries about properties owned or managed by TPK Park Sdn. Bhd.',contact:'Contact the company',count:'company office',approximate:'Approximate office location · entrance not verified'},
 ms: {name:'TPK Park Sdn. Bhd. (Pejabat Pengurusan)',category:'Pejabat syarikat',description:'Pejabat untuk pertanyaan mengenai hartanah yang dimiliki atau diurus oleh TPK Park Sdn. Bhd.',contact:'Hubungi syarikat',count:'pejabat syarikat',approximate:'Anggaran lokasi pejabat · pintu masuk belum disahkan'},
 zh: {name:'TPK Park Sdn. Bhd.（管理办公室）',category:'公司办公室',description:'受理有关TPK Park Sdn. Bhd.所拥有或管理物业的咨询。',contact:'联系公司',count:'个公司办公室',approximate:'办公室位置为估算 · 入口未核实'}
};
export function managementOfficeEntry(locale){
 const c=officeCopy[locale];
 return {id:'tpk-management-office',kind:'poi',cluster:'management',name:c.name,category:c.category,address:'2, Jalan TPK 1/4, Taman Perindustrian Kinrara, Puchong, Selangor',street:'Jalan TPK 1/4',description:c.description,aliases:'TPK Park Sdn Bhd management office leasing enquiries pejabat pengurusan 管理办公室',coordinates:[101.635417,3.0489299],status:'approximate',precision:'plan-derived-approximate',pointType:'premises-centre',entranceVerified:false,source:'Owner-confirmed address and neighbouring Jaecoo No.4; combined site plan + seven OSM junction controls (2026-10-07)',licence:'OSM-derived alignment: ODbL 1.0',addressFallback:true,contactRoute:'contact',guideLabel:c.contact,locationNote:c.approximate,map:'https://www.google.com/maps/search/?api=1&query=TPK+Park+Sdn+Bhd+2+Jalan+TPK+1%2F4+Puchong'};
}
