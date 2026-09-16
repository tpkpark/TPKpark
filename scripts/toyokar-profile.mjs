// Verified branch details and photo provenance: docs/toyokar-profile-sources.md.
const website = "https://www.toyokar.my/";
const whatsapp = "https://wa.me/60123856228";
const directions = "https://www.google.com/maps/search/?api=1&query=Toyokar+7+Jalan+TPK+1%2F3+Puchong";
const waze = "https://www.waze.com/ul?q=Toyokar%207%20Jalan%20TPK%201%2F3%20Puchong&navigate=yes";
const image = "https://www.tpkpark.com/assets/images/toyokar-workshop-960.webp";
const imageSource = { label: "Toyokar", url: "https://www.toyokar.my/gallery" };
const address = "7, Jalan TPK 1/3, Taman Perindustrian Kinrara, Seksyen 1, 47180 Puchong, Selangor";

export const toyokarBusiness = {
  "@type": "AutoRepair",
  "@id": "https://www.tpkpark.com/automotive/toyokar/#business",
  name: "Toyokar",
  url: website, telephone: "+60123856228", email: "info@toyokar.my", image, hasMap: directions,
  address: {
    "@type": "PostalAddress",
    streetAddress: "7, Jalan TPK 1/3, Taman Perindustrian Kinrara, Seksyen 1",
    addressLocality: "Puchong", addressRegion: "Selangor", postalCode: "47180", addressCountry: "MY"
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "09:00", closes: "17:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday"], opens: "00:00", closes: "00:00" }
  ],
  containedInPlace: { "@id": "https://www.tpkpark.com/#taman-perindustrian-kinrara" }
};

export const toyokarProfiles = {
  en: {
    parentRoute: "automotive",
    eyebrow: "Toyokar · Servicing & repairs",
    title: "Toyokar at TPK Park.",
    description: "Find Toyokar at 7, Jalan TPK 1/3, Puchong. Phone, WhatsApp, opening hours and directions for car servicing, vehicle checks and repair enquiries.",
    lead: "Toyokar is a car service and repair workshop at No. 7, Jalan TPK 1/3. Its published services include routine maintenance, engine checks, brakes, transmission and air conditioning, adding to TPK Park’s Automotive cluster.",
    image, heroImage: image,
    heroAlt: "A technician working on a vehicle raised on a lift at Toyokar’s workshop, from its official gallery",
    business: toyokarBusiness, datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "Understand what your car needs.", text: "A useful workshop conversation starts with how you use the car, its service history and any changes you have noticed. Whether you are arranging routine maintenance or investigating a fault, ask Toyokar to explain the checks, proposed work and estimate. Agree on the repair scope before work starts, and confirm when the team will update you.", image, alt: "A Toyokar technician carrying out repair work beside a vehicle raised on a workshop lift", route: "automotive", linkLabel: "Explore Automotive" },
      { type: "cards", alignHeadings: true, kicker: "Before your visit", title: "Prepare for your workshop appointment.", items: [
        { number: "01", title: "Plan routine servicing", text: "Share your vehicle’s make, model, mileage and maintenance records. Ask which service items are due and what the quotation includes, from fluids and filters to labour. Confirm the appointment and expected collection time so you can plan around the visit." },
        { number: "02", title: "Describe the problem", text: "Explain any warning lights, unusual sounds, cooling issues or changes in how the vehicle drives. Note when the symptoms appear and any recent repairs. Ask how the team will assess the issue, whether diagnostic charges apply and what happens before additional work is approved." },
        { number: "03", title: "Clarify parts and coverage", text: "Ask about replacement-part options, compatibility, availability and the estimated completion time. If considering a service package or in-house warranty, request the written terms, vehicle eligibility, exclusions, mileage limits and servicing conditions before deciding." }
      ] },
      { type: "businessVisit", kicker: "Plan your visit", title: "Find Toyokar on Jalan TPK 1/3.", text: "The workshop is at No. 7 in Seksyen 1. Contact Toyokar directly to discuss your vehicle, request an estimate and arrange a suitable appointment.", addressLabel: "TPK Park workshop address", address,
        contacts: [
          { label: "Telephone enquiries", value: "+60 12 385 6228", url: "tel:+60123856228" },
          { label: "WhatsApp enquiries", value: "+60 12 385 6228", url: whatsapp },
          { label: "Email enquiries", value: "info@toyokar.my", url: "mailto:info@toyokar.my" }
        ],
        hours: [
          { label: "Monday–Friday", value: "9am–6pm" },
          { label: "Saturday", value: "9am–5pm" },
          { label: "Sunday", value: "Closed" }
        ],
        note: "Hours are published by Toyokar. Confirm appointment availability, public-holiday hours and the work required for your model before travelling. Arrange any drop-off or collection outside these hours directly with the team.", links: [
          { label: "Find the workshop on Google Maps", url: directions },
          { label: "Find the workshop on Waze", url: waze },
          { label: "Toyokar website", url: website }
        ]
      }
    ],
    cta: { title: "Plan your next workshop visit.", text: "Contact Toyokar with your vehicle details and the servicing or repair work you would like to discuss.", button: "WhatsApp Toyokar", url: whatsapp }
  },
  ms: {
    parentRoute: "automotive",
    eyebrow: "Toyokar · Servis & pembaikan",
    title: "Toyokar di TPK Park.",
    description: "Cari Toyokar di 7, Jalan TPK 1/3, Puchong. Telefon, WhatsApp, waktu operasi dan arah perjalanan untuk servis, pemeriksaan serta pembaikan kereta.",
    lead: "Toyokar ialah bengkel servis dan pembaikan kereta di No. 7, Jalan TPK 1/3. Perkhidmatan yang disenaraikannya merangkumi penyelenggaraan berkala, pemeriksaan enjin, brek, transmisi dan penyaman udara, melengkapi kluster Automotif TPK Park.",
    image, heroImage: image,
    heroAlt: "Juruteknik bekerja pada kenderaan yang diangkat di bengkel Toyokar, daripada galeri rasminya",
    business: toyokarBusiness, datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "Fahami keperluan kereta anda.", text: "Mulakan perbincangan dengan cara anda menggunakan kereta, rekod servis dan perubahan yang diperhatikan. Sama ada untuk penyelenggaraan berkala atau pemeriksaan masalah, minta Toyokar menerangkan pemeriksaan, cadangan kerja dan anggaran kos. Persetujui skop pembaikan sebelum kerja dimulakan dan sahkan bila pasukan akan memberikan maklum balas.", image, alt: "Juruteknik Toyokar menjalankan kerja pembaikan di sisi kenderaan yang diangkat menggunakan lif bengkel", route: "automotive", linkLabel: "Terokai Automotif" },
      { type: "cards", alignHeadings: true, kicker: "Sebelum berkunjung", title: "Bersedia untuk janji temu bengkel.", items: [
        { number: "01", title: "Rancang servis berkala", text: "Sediakan jenama, model, bacaan perbatuan dan rekod penyelenggaraan kenderaan. Tanya item servis yang perlu dibuat serta perkara yang termasuk dalam sebut harga, daripada bendalir dan penapis hingga upah kerja. Sahkan janji temu dan anggaran masa pengambilan untuk merancang kunjungan." },
        { number: "02", title: "Terangkan masalah kenderaan", text: "Maklumkan lampu amaran, bunyi luar biasa, masalah penyejukan atau perubahan semasa memandu. Catat bila gejala muncul serta pembaikan yang baru dilakukan. Tanya cara pasukan menilai masalah, sama ada caj diagnostik dikenakan dan proses kelulusan sebelum kerja tambahan dibuat." },
        { number: "03", title: "Semak alat ganti dan perlindungan", text: "Tanya pilihan alat ganti, kesesuaian, ketersediaan dan anggaran masa siap. Jika mempertimbangkan pakej servis atau waranti dalaman, minta terma bertulis, kelayakan kenderaan, pengecualian, had perbatuan dan syarat penyelenggaraan sebelum membuat keputusan." }
      ] },
      { type: "businessVisit", kicker: "Rancang kunjungan", title: "Cari Toyokar di Jalan TPK 1/3.", text: "Bengkel terletak di No. 7, Seksyen 1. Hubungi Toyokar secara terus untuk membincangkan keperluan kenderaan, meminta anggaran kos dan mengatur janji temu yang sesuai.", addressLabel: "Alamat bengkel TPK Park", address,
        contacts: [
          { label: "Pertanyaan telefon", value: "+60 12 385 6228", url: "tel:+60123856228" },
          { label: "Pertanyaan WhatsApp", value: "+60 12 385 6228", url: whatsapp },
          { label: "Pertanyaan e-mel", value: "info@toyokar.my", url: "mailto:info@toyokar.my" }
        ],
        hours: [
          { label: "Isnin–Jumaat", value: "9 pagi–6 petang" },
          { label: "Sabtu", value: "9 pagi–5 petang" },
          { label: "Ahad", value: "Tutup" }
        ],
        note: "Waktu operasi diterbitkan oleh Toyokar. Sahkan ketersediaan janji temu, waktu cuti umum dan kerja yang diperlukan untuk model anda sebelum bertolak. Atur penghantaran atau pengambilan di luar waktu ini secara terus dengan pasukan.", links: [
          { label: "Cari bengkel di Google Maps", url: directions },
          { label: "Cari bengkel di Waze", url: waze },
          { label: "Laman web Toyokar", url: website }
        ]
      }
    ],
    cta: { title: "Rancang kunjungan bengkel anda.", text: "Hubungi Toyokar dengan butiran kenderaan serta kerja servis atau pembaikan yang ingin dibincangkan.", button: "WhatsApp Toyokar", url: whatsapp }
  },
  zh: {
    parentRoute: "automotive",
    eyebrow: "Toyokar · 汽车保养与维修",
    title: "TPK Park里的Toyokar。",
    description: "Toyokar位于蒲种Jalan TPK 1/3的7号。查看电话、WhatsApp、营业时间及导航，咨询汽车保养、车辆检查和维修预约。",
    lead: "Toyokar是一家位于Jalan TPK 1/3的7号汽车保养与维修厂。其公布的服务包括定期保养、引擎检查、刹车、变速箱及空调维修，为TPK Park汽车服务集群增添选择。",
    image, heroImage: image,
    heroAlt: "Toyokar官方图库中，技术人员在维修厂内为升降机上的车辆进行维修",
    business: toyokarBusiness, datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "先了解车辆需要哪些照顾。", text: "与维修团队沟通时，可以先说明日常用车情况、保养记录，以及最近留意到的变化。无论是安排定期保养，还是检查车辆故障，都可请Toyokar说明检查流程、建议项目及估价。施工前先确认维修范围，并约定团队提供进展的时间。", image, alt: "Toyokar技术人员在维修厂升降机旁为车辆进行维修", route: "automotive", linkLabel: "查看汽车服务" },
      { type: "cards", alignHeadings: true, kicker: "到访之前", title: "为保养与维修预约做好准备。", items: [
        { number: "01", title: "安排定期保养", text: "准备车辆品牌、车型、行驶里程及保养记录。询问目前需要进行哪些保养项目，以及报价包含哪些油液、滤芯和工时费用。确认预约时间与预计取车安排，方便规划当天的行程。" },
        { number: "02", title: "说明车辆问题", text: "说明仪表板警示灯、异常声响、冷却问题或驾驶表现的变化。记录症状在什么情况下出现，以及近期做过哪些维修。询问评估方式、是否收取诊断费用，以及追加施工前会如何征求你的同意。" },
        { number: "03", title: "确认零件与保障", text: "询问替换零件的选择、适配情况、供货时间及预计完工日期。如果考虑服务配套或店内保修，请先索取书面条款，了解车辆资格、不保范围、里程上限及保养要求，再作决定。" }
      ] },
      { type: "businessVisit", kicker: "到访安排", title: "在Jalan TPK 1/3找到Toyokar。", text: "维修厂位于Seksyen 1的7号。请直接联系Toyokar说明车辆需求、询问估价，并安排合适的预约时间。", addressLabel: "TPK Park维修厂地址", address,
        contacts: [
          { label: "电话咨询", value: "+60 12 385 6228", url: "tel:+60123856228" },
          { label: "WhatsApp咨询", value: "+60 12 385 6228", url: whatsapp },
          { label: "电邮咨询", value: "info@toyokar.my", url: "mailto:info@toyokar.my" }
        ],
        hours: [
          { label: "星期一至星期五", value: "上午9时至下午6时" },
          { label: "星期六", value: "上午9时至下午5时" },
          { label: "星期日", value: "休息" }
        ],
        note: "营业时间依据Toyokar公布的资料。出发前请确认预约空档、公共假期营业安排，以及团队能否处理你的车型所需项目。如需在上述时间以外送车或取车，请先与团队商定。", links: [
          { label: "在Google Maps查找维修厂", url: directions },
          { label: "在Waze查找维修厂", url: waze },
          { label: "Toyokar官方网站", url: website }
        ]
      }
    ],
    cta: { title: "安排下一次维修厂到访。", text: "联系Toyokar，提供车辆资料，并说明希望咨询的保养或维修项目。", button: "WhatsApp联系Toyokar", url: whatsapp }
  }
};
