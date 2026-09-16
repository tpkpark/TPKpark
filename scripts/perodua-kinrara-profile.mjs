// Public details and image provenance: docs/perodua-kinrara-profile-sources.md.
const website = "https://www.perodua3skinrara.com/";
const booking = "https://www.perodua3skinrara.com/onlineservicebooking";
const directions = "https://maps.google.com/?daddr=3.047798,101.637174";
const waze = "https://ul.waze.com/ul?ll=3.04748271%2C101.63726807&navigate=yes&zoom=17&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location";
const image = "https://www.tpkpark.com/assets/images/perodua-kinrara-showroom-810.webp";
const imageSource = { label: "Perodua 3S Kinrara", url: website };
const address = "8, Jalan TPK 2/3, Taman Perindustrian Kinrara, Seksyen 2, 47180 Puchong, Selangor";
const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: "8, Jalan TPK 2/3, Taman Perindustrian Kinrara, Seksyen 2",
  addressLocality: "Puchong", addressRegion: "Selangor", postalCode: "47180", addressCountry: "MY"
};
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const salesHours = [
  { "@type": "OpeningHoursSpecification", dayOfWeek: weekdays, opens: "08:30", closes: "20:00" },
  { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday", "PublicHolidays"], opens: "10:00", closes: "16:00" }
];
const serviceHours = [
  { "@type": "OpeningHoursSpecification", dayOfWeek: weekdays, opens: "08:30", closes: "17:00" },
  { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday", "PublicHolidays"], opens: "00:00", closes: "00:00" }
];

export const peroduaKinraraBusiness = {
  "@type": "AutoDealer",
  "@id": "https://www.tpkpark.com/automotive/perodua-3s-kinrara/#business",
  name: "Perodua 3S Kinrara",
  legalName: "Lon G Setia Auto Sdn. Bhd.",
  url: website, telephone: "+60332912266", image, hasMap: directions, address: postalAddress,
  openingHoursSpecification: salesHours,
  contactPoint: [
    { "@type": "ContactPoint", contactType: "Sales", telephone: "+60332912266" },
    { "@type": "ContactPoint", contactType: "Service", telephone: "+60332162255", url: booking }
  ],
  department: {
    "@type": "AutoRepair",
    "@id": "https://www.tpkpark.com/automotive/perodua-3s-kinrara/#service",
    name: "Perodua 3S Kinrara Service Centre", url: booking,
    telephone: "+60332162255", address: postalAddress,
    openingHoursSpecification: serviceHours,
    parentOrganization: { "@id": "https://www.tpkpark.com/automotive/perodua-3s-kinrara/#business" }
  },
  containedInPlace: { "@id": "https://www.tpkpark.com/#taman-perindustrian-kinrara" }
};

export const peroduaKinraraProfiles = {
  en: {
    parentRoute: "automotive",
    eyebrow: "Perodua 3S Kinrara · Sales, service & spare parts",
    title: "Perodua 3S Kinrara at TPK Park.",
    description: "Visit Perodua 3S Kinrara at No. 8, Jalan TPK 2/3, Puchong. Find separate sales and service contacts, opening hours, directions and service appointment requests.",
    lead: "Perodua 3S Kinrara brings vehicle sales, servicing and spare parts to No. 8, Jalan TPK 2/3. Operated by Lon G Setia Auto Sdn. Bhd., the centre is part of TPK Park’s Automotive cluster. Contact the sales team to discuss a car or test drive, and the service team for maintenance appointments.",
    image, heroImage: image,
    heroAlt: "The Perodua 3S Kinrara showroom entrance and frontage at TPK Park",
    business: peroduaKinraraBusiness, datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "From choosing a car to looking after it.", text: "A 3S centre combines sales, service and spare parts. At Kinrara, you can speak with a sales adviser about the current Perodua range and arrange a test drive, or contact the service department about your existing vehicle. The branch also accepts service appointment requests online; its service adviser will call to confirm the booking.", image, alt: "Perodua 3S Kinrara’s grey showroom facade, entrance and forecourt on Jalan TPK 2/3", caption: "Perodua 3S Kinrara premises at TPK Park. Photo:", captionSource: imageSource, route: "automotive", linkLabel: "Explore Automotive" },
      { type: "cards", alignHeadings: true, kicker: "Before your visit", title: "Prepare for the right conversation.", items: [
        { number: "01", title: "Plan a showroom visit", text: "Tell the sales team which models interest you and how you use your car. Ask about the variants on display and test-drive availability. Bring your driving licence if a test drive is arranged, and confirm the full quotation, booking terms and expected delivery timing before deciding." },
        { number: "02", title: "Book your service", text: "Have your car model, registration number, mileage and service history ready. Explain any symptoms you have noticed and request a suitable appointment. Confirm the planned work, estimated cost and collection time with the service adviser." },
        { number: "03", title: "Check parts and fitting", text: "For a parts enquiry, provide the vehicle model and year, together with the part you need. Ask the team to confirm compatibility, stock, pricing and whether fitting requires an appointment. Clarify which work is included before authorising it." }
      ] },
      { type: "businessVisit", kicker: "Plan your visit", title: "Find Perodua on Jalan TPK 2/3.", text: "The Kinrara 3S centre is at No. 8. Sales and servicing have separate contacts and opening hours.", addressLabel: "Kinrara 3S centre address", address,
        contacts: [
          { label: "Sales enquiries", value: "+60 3 3291 2266", url: "tel:+60332912266" },
          { label: "Service enquiries", value: "+60 3 3216 2255", url: "tel:+60332162255" }
        ],
        hours: [
          { label: "Sales showroom hours", value: "Monday–Saturday, 8:30am–8pm. Sunday and public holidays, 10am–4pm." },
          { label: "Service centre hours", value: "Monday–Saturday, 8:30am–5pm. Closed on Sunday and public holidays." }
        ],
        note: "Hours are published by the branch. Confirm your visit or appointment directly, particularly around public holidays. An online service request is confirmed only when the service adviser contacts you.", links: [
          { label: "Directions on Google Maps", url: directions },
          { label: "Directions on Waze", url: waze },
          { label: "Request a service appointment", url: booking },
          { label: "Perodua 3S Kinrara website", url: website }
        ]
      }
    ],
    cta: { title: "Arrange your next visit.", text: "Contact the branch for a showroom visit or test drive, or use its service booking form to request a maintenance appointment.", button: "Visit Perodua 3S Kinrara online", url: website }
  },
  ms: {
    parentRoute: "automotive",
    eyebrow: "Perodua 3S Kinrara · Jualan, servis & alat ganti",
    title: "Perodua 3S Kinrara di TPK Park.",
    description: "Kunjungi Perodua 3S Kinrara di No. 8, Jalan TPK 2/3, Puchong. Dapatkan nombor jualan dan servis, waktu operasi, arah perjalanan serta permohonan janji temu servis.",
    lead: "Perodua 3S Kinrara menawarkan jualan kenderaan, servis dan alat ganti di No. 8, Jalan TPK 2/3. Dikendalikan oleh Lon G Setia Auto Sdn. Bhd., pusat ini merupakan sebahagian daripada kluster Automotif TPK Park. Hubungi pasukan jualan untuk pertanyaan kereta atau pandu uji, dan pasukan servis untuk janji temu penyelenggaraan.",
    image, heroImage: image,
    heroAlt: "Pintu masuk dan bahagian hadapan bilik pameran Perodua 3S Kinrara di TPK Park",
    business: peroduaKinraraBusiness, datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "Daripada memilih kereta hingga menjaganya.", text: "Pusat 3S menggabungkan jualan, servis dan alat ganti. Di Kinrara, anda boleh berbincang dengan penasihat jualan tentang rangkaian Perodua semasa dan mengatur pandu uji, atau menghubungi jabatan servis mengenai kenderaan sedia ada. Cawangan ini turut menerima permohonan janji temu servis dalam talian; penasihat servis akan menghubungi anda untuk mengesahkan tempahan.", image, alt: "Fasad kelabu, pintu masuk dan ruang hadapan Perodua 3S Kinrara di Jalan TPK 2/3", caption: "Premis Perodua 3S Kinrara di TPK Park. Foto:", captionSource: imageSource, route: "automotive", linkLabel: "Terokai Automotif" },
      { type: "cards", alignHeadings: true, kicker: "Sebelum berkunjung", title: "Sediakan maklumat untuk urusan anda.", items: [
        { number: "01", title: "Rancang lawatan jualan", text: "Maklumkan model yang anda minati dan cara anda menggunakan kereta. Tanya tentang varian pameran dan ketersediaan pandu uji. Bawa lesen memandu jika pandu uji telah diatur, dan sahkan sebut harga penuh, syarat tempahan serta anggaran masa penyerahan sebelum membuat keputusan." },
        { number: "02", title: "Tempah servis kereta", text: "Sediakan model kereta, nombor pendaftaran, bacaan perbatuan dan rekod servis. Terangkan sebarang gejala yang anda perhatikan dan mohon masa janji temu yang sesuai. Sahkan kerja yang dirancang, anggaran kos serta masa pengambilan dengan penasihat servis." },
        { number: "03", title: "Semak alat ganti", text: "Untuk pertanyaan alat ganti, berikan model dan tahun kenderaan serta komponen yang diperlukan. Minta pasukan mengesahkan kesesuaian, stok, harga dan sama ada pemasangan memerlukan janji temu. Jelaskan skop kerja sebelum memberikan persetujuan." }
      ] },
      { type: "businessVisit", kicker: "Rancang kunjungan", title: "Cari Perodua di Jalan TPK 2/3.", text: "Pusat 3S Kinrara terletak di No. 8. Bahagian jualan dan servis mempunyai nombor telefon serta waktu operasi berasingan.", addressLabel: "Alamat pusat 3S Kinrara", address,
        contacts: [
          { label: "Pertanyaan jualan", value: "+60 3 3291 2266", url: "tel:+60332912266" },
          { label: "Pertanyaan servis", value: "+60 3 3216 2255", url: "tel:+60332162255" }
        ],
        hours: [
          { label: "Waktu bilik pameran jualan", value: "Isnin–Sabtu, 8:30 pagi–8 malam. Ahad dan cuti umum, 10 pagi–4 petang." },
          { label: "Waktu pusat servis", value: "Isnin–Sabtu, 8:30 pagi–5 petang. Tutup pada Ahad dan cuti umum." }
        ],
        note: "Waktu ini diterbitkan oleh cawangan. Sahkan lawatan atau janji temu secara terus, khususnya sekitar cuti umum. Permohonan servis dalam talian hanya disahkan apabila penasihat servis menghubungi anda.", links: [
          { label: "Arah perjalanan di Google Maps", url: directions },
          { label: "Arah perjalanan di Waze", url: waze },
          { label: "Mohon janji temu servis", url: booking },
          { label: "Laman Perodua 3S Kinrara", url: website }
        ]
      }
    ],
    cta: { title: "Atur kunjungan seterusnya.", text: "Hubungi cawangan untuk lawatan bilik pameran atau pandu uji, atau gunakan borang servisnya untuk memohon janji temu penyelenggaraan.", button: "Layari Perodua 3S Kinrara", url: website }
  },
  zh: {
    parentRoute: "automotive",
    eyebrow: "Perodua 3S Kinrara · 汽车销售、保养与零件",
    title: "TPK Park里的Perodua 3S Kinrara。",
    description: "Perodua 3S Kinrara位于蒲种Jalan TPK 2/3的8号。查看销售与维修部门的电话、营业时间、导航及保养预约申请链接。",
    lead: "Perodua 3S Kinrara位于Jalan TPK 2/3的8号，提供汽车销售、保养维修及零件服务。中心由Lon G Setia Auto Sdn. Bhd.经营，是TPK Park汽车服务集群的一部分。选车或试驾可联系销售团队；车辆保养预约则请联系维修部门。",
    image, heroImage: image,
    heroAlt: "TPK Park的Perodua 3S Kinrara展厅入口及建筑外观",
    business: peroduaKinraraBusiness, datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "从选车到日常保养。", text: "3S中心集合汽车销售、保养维修与零件服务。在Kinrara，可向销售顾问了解Perodua现有车款及安排试驾，也可联系维修部门，讨论现有车辆的保养需要。分行提供线上保养预约申请，提交后将由服务顾问致电确认。", image, alt: "Jalan TPK 2/3上的Perodua 3S Kinrara灰色建筑外墙、展厅入口及前方空地", caption: "TPK Park的Perodua 3S Kinrara营业场所。图片来源：", captionSource: imageSource, route: "automotive", linkLabel: "查看汽车服务" },
      { type: "cards", alignHeadings: true, kicker: "到访之前", title: "准备好资料，让沟通更清楚。", items: [
        { number: "01", title: "安排看车与试驾", text: "告诉销售团队你感兴趣的车款及日常用车方式，并询问现有展示版本和试驾安排。如已约好试驾，请携带驾驶执照。决定订车前，先确认完整报价、预订条件及预计交车时间。" },
        { number: "02", title: "预约车辆保养", text: "准备车型、车牌号码、行驶里程及保养记录，并说明留意到的异常情况。申请合适的预约时段，再向服务顾问确认计划进行的项目、预计费用及取车时间。" },
        { number: "03", title: "询问零件与安装", text: "查询零件时，请提供车型、年份及所需部件，让团队确认适用性、库存和价格。也可询问安装是否需要预约，并在同意施工前厘清包含哪些工作。" }
      ] },
      { type: "businessVisit", kicker: "到访安排", title: "在Jalan TPK 2/3找到Perodua。", text: "Kinrara 3S中心位于8号。销售与维修部门各有联系电话及营业时间。", addressLabel: "Kinrara 3S中心地址", address,
        contacts: [
          { label: "销售咨询", value: "+60 3 3291 2266", url: "tel:+60332912266" },
          { label: "保养与维修咨询", value: "+60 3 3216 2255", url: "tel:+60332162255" }
        ],
        hours: [
          { label: "销售展厅营业时间", value: "星期一至六，上午8时30分至晚上8时；星期日及公共假期，上午10时至下午4时。" },
          { label: "维修中心营业时间", value: "星期一至六，上午8时30分至下午5时；星期日及公共假期休息。" }
        ],
        note: "以上为分行公布的营业时间。出发前请直接确认到访或预约安排，公共假期前后尤其如此。线上保养申请须经服务顾问联系确认后才算预约成功。", links: [
          { label: "使用Google Maps导航", url: directions },
          { label: "使用Waze导航", url: waze },
          { label: "申请保养预约", url: booking },
          { label: "Perodua 3S Kinrara网站", url: website }
        ]
      }
    ],
    cta: { title: "安排下一次到访。", text: "看车或试驾可先联系分行；如需保养车辆，可通过分行表格申请预约时段。", button: "前往Perodua 3S Kinrara网站", url: website }
  }
};
