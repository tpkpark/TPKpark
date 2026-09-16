// Public details, naming and photo provenance: docs/mazda-kinrara-profile-sources.md.
const branch = "https://www.facebook.com/MazdaPersadaAuto/";
const dealerLocator = "https://mazda.com.my/find-a-dealer/";
const testDrive = "https://mazda.com.my/mazda-connect-test-drive-page/";
const directions = "https://www.google.com/maps/search/?api=1&query=Mazda+Persada+Auto+8+Jalan+TPK+2%2F2+47180+Puchong";
const waze = "https://waze.com/ul/hw2832g1br";
const image = "https://www.tpkpark.com/assets/images/mazda-kinrara-exterior-1280.webp";
const imageSource = { label: "Persada Auto", url: "https://www.facebook.com/photo/?fbid=1582745068698441&set=pcb.1582745768698371" };
const address = "8, Jalan TPK 2/2, Taman Perindustrian Kinrara, Seksyen 2, 47180 Puchong, Selangor";

export const mazdaKinraraBusiness = {
  "@type": "AutoDealer",
  "@id": "https://www.tpkpark.com/automotive/mazda-kinrara/#business",
  name: "Mazda Kinrara — Persada Auto",
  legalName: "Persada Auto Sdn Bhd",
  url: branch, telephone: "+60380750812", image, hasMap: waze,
  address: {
    "@type": "PostalAddress",
    streetAddress: "8, Jalan TPK 2/2, Taman Perindustrian Kinrara, Seksyen 2",
    addressLocality: "Puchong", addressRegion: "Selangor", postalCode: "47180", addressCountry: "MY"
  },
  contactPoint: [
    { "@type": "ContactPoint", contactType: "Branch enquiries", telephone: "+60380750812" },
    { "@type": "ContactPoint", contactType: "Branch enquiries", telephone: "+60380750813" }
  ],
  containedInPlace: { "@id": "https://www.tpkpark.com/#taman-perindustrian-kinrara" }
};

export const mazdaKinraraProfiles = {
  en: {
    parentRoute: "automotive",
    eyebrow: "Persada Auto · Mazda 4S centre",
    title: "Mazda Kinrara at TPK Park.",
    description: "Find Mazda Kinrara, operated by Persada Auto, at No. 8, Jalan TPK 2/2, Puchong. Branch contacts, directions and advice for sales, servicing and bodywork enquiries.",
    lead: "Mazda Kinrara is operated by Persada Auto Sdn Bhd at No. 8, Jalan TPK 2/2. The Mazda 4S centre offers vehicle sales, servicing, spare parts and body and paint services within TPK Park’s Automotive cluster.",
    image, heroImage: image,
    heroAlt: "Archive photograph of Persada Auto’s Mazda Kinrara frontage, published in 2016",
    business: mazdaKinraraBusiness, datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "A place to choose and care for your Mazda.", text: "Visit the showroom to discuss a Mazda that suits your everyday journeys, or contact the team about maintenance and parts for your current vehicle. The Kinrara branch also handles body and paint enquiries. Call ahead to arrange the right appointment and confirm which models, services or parts are available.", image, alt: "Persada Auto’s Mazda Kinrara entrance and service frontage in its 2016 branch announcement", route: "automotive", linkLabel: "Explore Automotive" },
      { type: "cards", alignHeadings: true, kicker: "Before your visit", title: "Make the most of your appointment.", items: [
        { number: "01", title: "Arrange a test drive", text: "Share the models you are considering and what matters in your daily driving. Ask which variants are available to view or test, and bring your driving licence for an arranged test drive. Confirm the full quotation, booking terms and expected delivery timing before placing an order." },
        { number: "02", title: "Prepare for servicing", text: "Have your model, registration number, mileage and service history ready. Describe any symptoms you have noticed and ask about the recommended work, estimated cost and collection time. For parts, confirm compatibility and availability with the branch." },
        { number: "03", title: "Discuss body and paint", text: "Explain the area of damage or finish you want assessed. Ask whether an inspection is needed before a quotation, what the proposed work includes and how long it may take. Agree the scope and cost before authorising repairs." }
      ] },
      { type: "businessVisit", kicker: "Plan your visit", title: "Find Mazda on Jalan TPK 2/2.", text: "The Persada Auto Kinrara branch is at No. 8. Call to arrange a showroom visit, service appointment or repair assessment.", addressLabel: "Kinrara branch address", address,
        contacts: [
          { label: "Branch enquiries", value: "+60 3 8075 0812", url: "tel:+60380750812" },
          { label: "Alternative branch line", value: "+60 3 8075 0813", url: "tel:+60380750813" }
        ],
        note: "Confirm opening hours and appointment availability with the branch before travelling, especially on weekends and public holidays. Arrange branch appointments directly with Persada Auto in Puchong.", links: [
          { label: "Directions on Google Maps", url: directions },
          { label: "Directions on Waze", url: waze },
          { label: "Mazda Kinrara on Facebook", url: branch },
          { label: "Mazda Malaysia dealer locator", url: dealerLocator },
          { label: "Mazda Malaysia test-drive enquiry", url: testDrive }
        ]
      }
    ],
    cta: { title: "Speak with the Kinrara team.", text: "Call Persada Auto to discuss a car, plan your next service or arrange a body and paint assessment.", button: "Call Mazda Kinrara", url: "tel:+60380750812" }
  },
  ms: {
    parentRoute: "automotive",
    eyebrow: "Persada Auto · Pusat Mazda 4S",
    title: "Mazda Kinrara di TPK Park.",
    description: "Mazda Kinrara, dikendalikan oleh Persada Auto, terletak di No. 8, Jalan TPK 2/2, Puchong. Dapatkan nombor cawangan, arah perjalanan serta panduan lawatan.",
    lead: "Mazda Kinrara dikendalikan oleh Persada Auto Sdn Bhd di No. 8, Jalan TPK 2/2. Pusat Mazda 4S ini menawarkan jualan kenderaan, servis, alat ganti serta pembaikan badan dan cat dalam kluster Automotif TPK Park.",
    image, heroImage: image,
    heroAlt: "Foto arkib bahagian hadapan Mazda Kinrara oleh Persada Auto, diterbitkan pada 2016",
    business: mazdaKinraraBusiness, datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "Untuk memilih dan menjaga Mazda anda.", text: "Kunjungi bilik pameran untuk berbincang tentang Mazda yang sesuai dengan perjalanan harian anda, atau hubungi pasukan bagi urusan penyelenggaraan dan alat ganti kenderaan sedia ada. Cawangan Kinrara turut menerima pertanyaan pembaikan badan dan cat. Hubungi dahulu untuk mengatur janji temu serta mengesahkan ketersediaan model, perkhidmatan atau alat ganti.", image, alt: "Pintu masuk dan bahagian hadapan servis Mazda Kinrara dalam pengumuman cawangan Persada Auto pada 2016", route: "automotive", linkLabel: "Terokai Automotif" },
      { type: "cards", alignHeadings: true, kicker: "Sebelum berkunjung", title: "Bersedia untuk janji temu anda.", items: [
        { number: "01", title: "Atur pandu uji", text: "Maklumkan model yang anda pertimbangkan dan keutamaan pemanduan harian anda. Tanya varian yang boleh dilihat atau diuji, dan bawa lesen memandu untuk pandu uji yang telah diatur. Sahkan sebut harga penuh, syarat tempahan dan anggaran masa penyerahan sebelum membuat pesanan." },
        { number: "02", title: "Sediakan maklumat servis", text: "Sediakan model, nombor pendaftaran, bacaan perbatuan dan rekod servis. Terangkan sebarang gejala yang diperhatikan serta tanya tentang kerja yang disyorkan, anggaran kos dan masa pengambilan. Untuk alat ganti, sahkan kesesuaian dan ketersediaannya dengan cawangan." },
        { number: "03", title: "Bincang badan dan cat", text: "Terangkan bahagian yang rosak atau kemasan yang ingin diperiksa. Tanya sama ada pemeriksaan diperlukan sebelum sebut harga, skop kerja yang dicadangkan dan anggaran tempoh siap. Persetujui skop dan kos sebelum membenarkan pembaikan." }
      ] },
      { type: "businessVisit", kicker: "Rancang kunjungan", title: "Cari Mazda di Jalan TPK 2/2.", text: "Cawangan Persada Auto Kinrara terletak di No. 8. Hubungi untuk mengatur lawatan bilik pameran, janji temu servis atau pemeriksaan pembaikan.", addressLabel: "Alamat cawangan Kinrara", address,
        contacts: [
          { label: "Pertanyaan cawangan", value: "+60 3 8075 0812", url: "tel:+60380750812" },
          { label: "Talian alternatif cawangan", value: "+60 3 8075 0813", url: "tel:+60380750813" }
        ],
        note: "Sahkan waktu operasi dan ketersediaan janji temu sebelum bertolak, khususnya pada hujung minggu dan cuti umum. Atur janji temu cawangan secara terus dengan Persada Auto di Puchong.", links: [
          { label: "Arah perjalanan di Google Maps", url: directions },
          { label: "Arah perjalanan di Waze", url: waze },
          { label: "Mazda Kinrara di Facebook", url: branch },
          { label: "Pencari pengedar Mazda Malaysia", url: dealerLocator },
          { label: "Pertanyaan pandu uji Mazda Malaysia", url: testDrive }
        ]
      }
    ],
    cta: { title: "Hubungi pasukan Kinrara.", text: "Telefon Persada Auto untuk berbincang tentang kereta, merancang servis seterusnya atau mengatur pemeriksaan badan dan cat.", button: "Telefon Mazda Kinrara", url: "tel:+60380750812" }
  },
  zh: {
    parentRoute: "automotive",
    eyebrow: "Persada Auto · Mazda 4S中心",
    title: "TPK Park里的Mazda Kinrara。",
    description: "Mazda Kinrara由Persada Auto经营，位于蒲种Jalan TPK 2/2的8号。查看分行电话、导航及购车、保养维修和车身喷漆咨询指南。",
    lead: "Mazda Kinrara由Persada Auto Sdn Bhd经营，位于Jalan TPK 2/2的8号。这家Mazda 4S中心提供汽车销售、保养维修、零件及车身修复与喷漆服务，是TPK Park汽车服务集群的一部分。",
    image, heroImage: image,
    heroAlt: "Persada Auto于2016年发布的Mazda Kinrara建筑外观资料照片",
    business: mazdaKinraraBusiness, datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "从选车到照顾你的Mazda。", text: "可到展厅了解适合日常出行的Mazda车款，也可联系团队，讨论现有车辆的保养与零件需求。Kinrara分行亦接受车身修复和喷漆咨询。出发前先致电安排合适的预约，并确认所需车款、服务或零件是否可供选择。", image, alt: "Persada Auto于2016年分行公告中展示的Mazda Kinrara入口及维修中心外观", route: "automotive", linkLabel: "查看汽车服务" },
      { type: "cards", alignHeadings: true, kicker: "到访之前", title: "为预约做好准备。", items: [
        { number: "01", title: "安排看车与试驾", text: "告诉团队你正在考虑的车款，以及日常用车最重视的需求。询问哪些版本可供参观或试驾；如已安排试驾，请携带驾驶执照。订车前，先确认完整报价、预订条件及预计交车时间。" },
        { number: "02", title: "准备保养资料", text: "准备车型、车牌号码、行驶里程及保养记录。说明留意到的异常情况，并询问建议进行的项目、预计费用和取车时间。如需零件，请向分行确认适用性及供应情况。" },
        { number: "03", title: "咨询车身与喷漆", text: "说明受损位置或希望检查的漆面状况。询问报价前是否需要实车检查、建议维修包含哪些工作，以及预计完工时间。授权施工前，先确认维修范围与费用。" }
      ] },
      { type: "businessVisit", kicker: "到访安排", title: "在Jalan TPK 2/2找到Mazda。", text: "Persada Auto Kinrara分行位于8号。可致电安排看车、保养预约或维修评估。", addressLabel: "Kinrara分行地址", address,
        contacts: [
          { label: "分行咨询", value: "+60 3 8075 0812", url: "tel:+60380750812" },
          { label: "分行另一电话", value: "+60 3 8075 0813", url: "tel:+60380750813" }
        ],
        note: "出发前请向分行确认营业时间和预约安排，周末及公共假期尤其如此。分行预约请直接联系蒲种的Persada Auto。", links: [
          { label: "使用Google Maps导航", url: directions },
          { label: "使用Waze导航", url: waze },
          { label: "Mazda Kinrara的Facebook专页", url: branch },
          { label: "Mazda Malaysia经销商查询", url: dealerLocator },
          { label: "Mazda Malaysia试驾咨询", url: testDrive }
        ]
      }
    ],
    cta: { title: "联系Kinrara团队。", text: "致电Persada Auto咨询车款、安排下一次保养，或预约车身与喷漆评估。", button: "致电Mazda Kinrara", url: "tel:+60380750812" }
  }
};
