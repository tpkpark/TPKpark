// Verified branch details and photo provenance: docs/jaecoo-service-centre-profile-sources.md.
const dealerLocator = "https://omodajaecoo.com.my/dealer-locator";
const whatsapp = "https://wa.me/60193988817";
const directions = "https://www.google.com/maps/search/?api=1&query=Jaecoo+Service+Centre+Apple+Autotech+4+Jalan+TPK+1%2F4+Puchong";
const waze = "https://www.waze.com/ul?q=Jaecoo%20Service%20Centre%20Apple%20Autotech%204%20Jalan%20TPK%201%2F4%20Puchong&navigate=yes";
const image = "https://www.tpkpark.com/assets/images/jaecoo-technical-diagnostics-1280.webp";
const imageSource = { label: "OMODA & JAECOO Malaysia", url: "https://www.omodajaecoo.com.my/news-events/inaugural-omoda-i-jaecoo-technical-skills-competition-spotlights-excellence-and-competitive-spirit" };
const address = "4, Jalan TPK 1/4, Taman Perindustrian Kinrara, Seksyen 1, 47180 Puchong, Selangor";

export const jaecooServiceCentreBusiness = {
  "@type": "AutoRepair",
  "@id": "https://www.tpkpark.com/automotive/jaecoo-service-centre/#business",
  name: "Jaecoo Service Centre — Puchong Kinrara",
  legalName: "Apple Autotech Sdn Bhd",
  url: dealerLocator, telephone: "+60193988817", hasMap: directions,
  address: {
    "@type": "PostalAddress",
    streetAddress: "4, Jalan TPK 1/4, Taman Perindustrian Kinrara, Seksyen 1",
    addressLocality: "Puchong", addressRegion: "Selangor", postalCode: "47180", addressCountry: "MY"
  },
  containedInPlace: { "@id": "https://www.tpkpark.com/#taman-perindustrian-kinrara" }
};

export const jaecooServiceCentreProfiles = {
  en: {
    parentRoute: "automotive",
    eyebrow: "Jaecoo Service Centre · Puchong Kinrara",
    title: "Jaecoo Service Centre at TPK Park.",
    description: "Find Apple Autotech’s Jaecoo service centre at 4, Jalan TPK 1/4, Puchong. Call or WhatsApp for service bookings, vehicle checks and after-sales enquiries.",
    lead: "Jaecoo’s Puchong Kinrara service centre is operated by Apple Autotech Sdn Bhd at No. 4, Jalan TPK 1/4. Contact the team for scheduled servicing, vehicle checks and after-sales enquiries within TPK Park’s Automotive cluster.",
    image, heroImage: image,
    heroAlt: "Technical diagnostic work at OMODA & JAECOO’s 2025 skills competition in Klang, from the brand’s official archive",
    business: jaecooServiceCentreBusiness, datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "Keep your next service well planned.", text: "A clear appointment starts with your model, mileage and the reason for your visit. Whether maintenance is due or you have a concern to discuss, contact the service team before bringing the car in. Ask which checks are needed, what the proposed work includes and how long the visit is likely to take.", image, alt: "Technicians carrying out diagnostic work during OMODA & JAECOO’s 2025 technical skills competition in Klang", route: "automotive", linkLabel: "Explore Automotive" },
      { type: "cards", alignHeadings: true, kicker: "Before your visit", title: "Prepare for your service appointment.", items: [
        { number: "01", title: "Arrange scheduled servicing", text: "Have your model, variant, mileage and service records ready. Ask which maintenance items are due for your vehicle and what the estimate covers. Confirm a booking time and the expected collection arrangements so you can plan your day." },
        { number: "02", title: "Explain the concern", text: "Describe warning lights, unusual sounds or changes in how the vehicle behaves. Note when the issue occurs and whether any recent work has been done. Ask about the assessment process, possible diagnostic charges and when the team will update you." },
        { number: "03", title: "Agree on the work", text: "Review the findings and proposed work before giving approval. Clarify parts availability, costs and the expected completion time. If a warranty enquiry is involved, ask which records and checks are needed and how the team will confirm the outcome." }
      ] },
      { type: "businessVisit", kicker: "Plan your visit", title: "Find Jaecoo service on Jalan TPK 1/4.", text: "Apple Autotech’s service centre is at No. 4 in Seksyen 1. The national locator lists this service address under OMODA JAECOO Bukit Jalil. Use the service contact below to arrange your visit.", addressLabel: "TPK Park service centre address", address,
        contacts: [
          { label: "Service enquiries", value: "+60 19 398 8817", url: "tel:+60193988817" },
          { label: "WhatsApp service enquiries", value: "+60 19 398 8817", url: whatsapp }
        ],
        note: "Confirm opening days and hours, appointment availability and the work required for your specific model before travelling. Agree on drop-off and collection arrangements directly with the service team.", links: [
          { label: "Find the service centre on Google Maps", url: directions },
          { label: "Find the service centre on Waze", url: waze },
          { label: "OMODA & JAECOO Malaysia dealer locator", url: dealerLocator }
        ]
      }
    ],
    cta: { title: "Arrange your next service visit.", text: "Contact Apple Autotech’s Jaecoo service team with your vehicle details and the work you would like to discuss.", button: "WhatsApp the service team", url: whatsapp }
  },
  ms: {
    parentRoute: "automotive",
    eyebrow: "Pusat Servis Jaecoo · Puchong Kinrara",
    title: "Pusat Servis Jaecoo di TPK Park.",
    description: "Cari pusat servis Jaecoo Apple Autotech di 4, Jalan TPK 1/4, Puchong. Telefon atau WhatsApp untuk janji temu servis, pemeriksaan dan urusan selepas jualan.",
    lead: "Pusat servis Jaecoo Puchong Kinrara dikendalikan oleh Apple Autotech Sdn Bhd di No. 4, Jalan TPK 1/4. Hubungi pasukan untuk penyelenggaraan berkala, pemeriksaan kenderaan dan pertanyaan selepas jualan dalam kluster Automotif TPK Park.",
    image, heroImage: image,
    heroAlt: "Kerja diagnostik dalam pertandingan kemahiran OMODA & JAECOO 2025 di Klang, daripada arkib rasmi jenama",
    business: jaecooServiceCentreBusiness, datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "Rancang servis kereta dengan teratur.", text: "Mulakan perbincangan janji temu dengan model, bacaan perbatuan dan tujuan kunjungan anda. Sama ada penyelenggaraan sudah tiba masanya atau ada masalah yang ingin dibincangkan, hubungi pasukan servis sebelum membawa kereta. Tanya pemeriksaan yang diperlukan, perkara yang termasuk dalam cadangan kerja dan anggaran tempoh kunjungan.", image, alt: "Juruteknik menjalankan kerja diagnostik semasa pertandingan kemahiran teknikal OMODA & JAECOO 2025 di Klang", route: "automotive", linkLabel: "Terokai Automotif" },
      { type: "cards", alignHeadings: true, kicker: "Sebelum berkunjung", title: "Bersedia untuk janji temu servis.", items: [
        { number: "01", title: "Atur servis berkala", text: "Sediakan model, varian, bacaan perbatuan dan rekod servis. Tanya item penyelenggaraan yang perlu dibuat untuk kenderaan anda serta perkara yang termasuk dalam anggaran harga. Sahkan masa janji temu dan aturan pengambilan kereta supaya anda dapat merancang hari anda." },
        { number: "02", title: "Terangkan masalah kenderaan", text: "Maklumkan lampu amaran, bunyi luar biasa atau perubahan pada prestasi kenderaan. Catat bila masalah berlaku dan sama ada kerja lain baru dilakukan. Tanya proses penilaian, kemungkinan caj diagnostik dan bila pasukan akan memberikan maklum balas." },
        { number: "03", title: "Persetujui skop kerja", text: "Semak hasil pemeriksaan dan cadangan kerja sebelum memberikan kelulusan. Jelaskan ketersediaan alat ganti, kos dan anggaran masa siap. Jika melibatkan pertanyaan waranti, tanya rekod serta pemeriksaan yang diperlukan dan cara pasukan akan memaklumkan keputusan." }
      ] },
      { type: "businessVisit", kicker: "Rancang kunjungan", title: "Cari servis Jaecoo di Jalan TPK 1/4.", text: "Pusat servis Apple Autotech terletak di No. 4, Seksyen 1. Pencari pengedar nasional menyenaraikan alamat servis ini di bawah OMODA JAECOO Bukit Jalil. Gunakan nombor servis di bawah untuk mengatur kunjungan.", addressLabel: "Alamat pusat servis TPK Park", address,
        contacts: [
          { label: "Pertanyaan servis", value: "+60 19 398 8817", url: "tel:+60193988817" },
          { label: "Pertanyaan servis WhatsApp", value: "+60 19 398 8817", url: whatsapp }
        ],
        note: "Sahkan hari dan waktu operasi, ketersediaan janji temu serta kerja yang diperlukan untuk model anda sebelum bertolak. Tetapkan aturan penghantaran dan pengambilan secara terus dengan pasukan servis.", links: [
          { label: "Cari pusat servis di Google Maps", url: directions },
          { label: "Cari pusat servis di Waze", url: waze },
          { label: "Pencari pengedar OMODA & JAECOO Malaysia", url: dealerLocator }
        ]
      }
    ],
    cta: { title: "Atur kunjungan servis anda.", text: "Hubungi pasukan servis Jaecoo Apple Autotech dengan butiran kenderaan dan kerja yang ingin dibincangkan.", button: "WhatsApp pasukan servis", url: whatsapp }
  },
  zh: {
    parentRoute: "automotive",
    eyebrow: "Jaecoo服务中心 · 蒲种金銮",
    title: "TPK Park里的Jaecoo服务中心。",
    description: "Apple Autotech的Jaecoo服务中心位于蒲种Jalan TPK 1/4的4号。查看电话、WhatsApp与导航，咨询保养预约、车辆检查及售后服务。",
    lead: "Jaecoo蒲种金銮服务中心由Apple Autotech Sdn Bhd经营，位于Jalan TPK 1/4的4号。作为TPK Park汽车服务集群的一部分，可联系团队咨询定期保养、车辆检查及售后服务。",
    image, heroImage: image,
    heroAlt: "OMODA & JAECOO官方档案中，2025年巴生技术技能竞赛的车辆诊断作业照片",
    business: jaecooServiceCentreBusiness, datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "为下一次保养做好安排。", text: "预约时可先说明车型、行驶里程及到访目的。无论是到了保养时间，还是有车辆问题需要咨询，都可在送车前联系服务团队。询问需要进行哪些检查、建议项目包含什么，以及预计需要多长时间，方便安排当天行程。", image, alt: "技术人员在2025年巴生OMODA & JAECOO技术技能竞赛中进行车辆诊断作业", route: "automotive", linkLabel: "查看汽车服务" },
      { type: "cards", alignHeadings: true, kicker: "到访之前", title: "为保养与检查预约做好准备。", items: [
        { number: "01", title: "安排定期保养", text: "准备车型、版本、行驶里程及保养记录。询问车辆目前需要进行哪些保养项目，以及估价包含什么。确认预约时间与预计取车安排，方便规划当天的交通和其他行程。" },
        { number: "02", title: "说明车辆问题", text: "说明仪表板警示灯、异常声响或车辆表现的变化。记录问题在什么情况下出现，以及近期是否做过其他维修。询问评估流程、可能产生的诊断费用，以及团队预计何时提供反馈。" },
        { number: "03", title: "确认施工范围", text: "授权施工前，先了解检查结果与建议项目。确认零件供应、费用及预计完工时间。如果涉及保修咨询，请询问需要哪些记录及检查，以及团队会如何通知你处理结果。" }
      ] },
      { type: "businessVisit", kicker: "到访安排", title: "在Jalan TPK 1/4找到Jaecoo服务中心。", text: "Apple Autotech服务中心位于Seksyen 1的4号。全国经销商查询页面将此维修地址列在OMODA JAECOO Bukit Jalil名下。请使用以下服务专线安排到访。", addressLabel: "TPK Park服务中心地址", address,
        contacts: [
          { label: "服务咨询", value: "+60 19 398 8817", url: "tel:+60193988817" },
          { label: "WhatsApp服务咨询", value: "+60 19 398 8817", url: whatsapp }
        ],
        note: "出发前请确认营业日、营业时间、预约空档，以及团队能否处理你的车型所需项目。送车与取车安排请直接与服务团队商定。", links: [
          { label: "在Google Maps查找服务中心", url: directions },
          { label: "在Waze查找服务中心", url: waze },
          { label: "OMODA & JAECOO Malaysia经销商查询", url: dealerLocator }
        ]
      }
    ],
    cta: { title: "安排下一次车辆保养。", text: "联系Apple Autotech的Jaecoo服务团队，提供车辆资料，并说明希望咨询的项目。", button: "WhatsApp联系服务团队", url: whatsapp }
  }
};
