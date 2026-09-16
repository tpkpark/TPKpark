// Verified branch details and photo provenance: docs/kia-4s-service-profile-sources.md.
const branch = "https://kiapuchong.com.my/";
const dealerLocator = "https://www.kia.com/my/shopping-tools/find-a-dealer.html";
const directions = "https://www.google.com/maps/search/?api=1&query=Kia+Puchong+KMW+Auto+59+Jalan+TPK+2%2F8+Puchong";
const waze = "https://www.waze.com/ul?q=Kia%20Puchong%2059%20Jalan%20TPK%202%2F8&navigate=yes";
const image = "https://www.tpkpark.com/assets/images/kia-puchong-workshop-1280.webp";
const imageSource = { label: "Kia Puchong", url: "https://kiapuchong.com.my/wp-content/uploads/2024/09/Kia-Puchong-Workshop-2.jpg" };
const address = "59, Jalan TPK 2/8, Taman Perindustrian Kinrara, 47180 Puchong, Selangor";

export const kia4sServiceBusiness = {
  "@type": "AutoRepair",
  "@id": "https://www.tpkpark.com/automotive/kia-4s-service/#business",
  name: "Kia 4S Service — Kia Puchong",
  legalName: "KMW Auto Sdn Bhd",
  url: branch, telephone: "+60380761005", email: "sales@kiapuchong.com.my", image, hasMap: directions,
  address: {
    "@type": "PostalAddress",
    streetAddress: "59, Jalan TPK 2/8, Taman Perindustrian Kinrara",
    addressLocality: "Puchong", addressRegion: "Selangor", postalCode: "47180", addressCountry: "MY"
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:30", closes: "17:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "08:30", closes: "15:00" }
  ],
  containedInPlace: { "@id": "https://www.tpkpark.com/#taman-perindustrian-kinrara" }
};

export const kia4sServiceProfiles = {
  en: {
    parentRoute: "automotive",
    eyebrow: "Kia Puchong · Service & repairs",
    title: "Kia 4S Service at TPK Park.",
    description: "Find Kia Puchong’s service workshop at 59, Jalan TPK 2/8. Contact details, opening hours and directions for servicing, repairs and bodywork enquiries.",
    lead: "Kia Puchong’s service workshop, operated by KMW Auto Sdn Bhd, is at No. 59, Jalan TPK 2/8. Contact the team about scheduled servicing, repairs and parts, or body and paint work within TPK Park’s Automotive cluster.",
    image, heroImage: image,
    heroAlt: "A vehicle service discussion in Kia Puchong’s workshop, from the branch’s official website",
    business: kia4sServiceBusiness, datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "A clear plan for your next service.", text: "Whether your car is due for maintenance or needs a problem checked, start by describing what you need to the workshop team. Kia Puchong also lists painting, body repairs and insurance-claim enquiries among its services. Call ahead to agree the right appointment and confirm which work can be carried out for your vehicle.", image, alt: "Kia Puchong workshop photograph showing a discussion beside a vehicle with its bonnet open", caption: "Service consultation at Kia Puchong’s workshop. Photo:", captionSource: imageSource, route: "automotive", linkLabel: "Explore Automotive" },
      { type: "cards", alignHeadings: true, kicker: "Before your visit", title: "Prepare for your workshop appointment.", items: [
        { number: "01", title: "Book your service", text: "Have your model, registration number, mileage and service history ready. Ask which maintenance items are due, what the estimate includes and when to bring the car in. Confirm the expected collection time so you can plan your day." },
        { number: "02", title: "Explain repairs and parts", text: "Describe any warning lights, unusual sounds or changes in how the car drives, including when they happen. Ask whether an inspection is needed before a quotation. For replacement parts, confirm compatibility, availability and the proposed cost with the team." },
        { number: "03", title: "Discuss body and paint", text: "Explain the damaged area or paintwork you would like assessed. Ask about the repair scope, finish and estimated turnaround. If an insurance claim is involved, check what documents and approvals are needed before authorising the work." }
      ] },
      { type: "businessVisit", kicker: "Plan your visit", title: "Find Kia service on Jalan TPK 2/8.", text: "The TPK Park workshop is at No. 59. Arrange servicing and repair appointments directly with Kia Puchong.", addressLabel: "TPK Park workshop address", address,
        contacts: [
          { label: "Telephone enquiries", value: "+60 3 8076 1005", url: "tel:+60380761005" },
          { label: "Email enquiries", value: "sales@kiapuchong.com.my", url: "mailto:sales@kiapuchong.com.my" }
        ],
        hours: [
          { label: "Monday–Friday", value: "8.30am–5.30pm" },
          { label: "Saturday", value: "8.30am–3pm" }
        ],
        note: "Hours are listed by Kia Malaysia. Confirm appointment availability and Sunday or public-holiday arrangements before travelling. For a showroom visit or test drive, ask Kia Puchong to confirm the meeting location.", links: [
          { label: "Find the workshop on Google Maps", url: directions },
          { label: "Find the workshop on Waze", url: waze },
          { label: "Kia Puchong website", url: branch },
          { label: "Kia Malaysia dealer locator", url: dealerLocator }
        ]
      }
    ],
    cta: { title: "Plan your next workshop visit.", text: "Call Kia Puchong to discuss the work you need and arrange a suitable appointment.", button: "Call Kia Puchong", url: "tel:+60380761005" }
  },
  ms: {
    parentRoute: "automotive",
    eyebrow: "Kia Puchong · Servis & pembaikan",
    title: "Kia 4S Service di TPK Park.",
    description: "Cari bengkel Kia Puchong di 59, Jalan TPK 2/8. Nombor telefon, waktu operasi dan arah perjalanan untuk servis, pembaikan serta kerja badan dan cat.",
    lead: "Bengkel servis Kia Puchong, yang dikendalikan oleh KMW Auto Sdn Bhd, terletak di No. 59, Jalan TPK 2/8. Hubungi pasukan untuk penyelenggaraan berkala, pembaikan, alat ganti serta kerja badan dan cat dalam kluster Automotif TPK Park.",
    image, heroImage: image,
    heroAlt: "Perbincangan servis kenderaan di bengkel Kia Puchong, daripada laman rasmi cawangan",
    business: kia4sServiceBusiness, datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "Rancang servis kereta anda.", text: "Sama ada kereta anda memerlukan penyelenggaraan atau pemeriksaan masalah tertentu, mulakan dengan menerangkan keperluan anda kepada pasukan bengkel. Kia Puchong turut menyenaraikan kerja cat, pembaikan badan dan urusan tuntutan insurans dalam perkhidmatannya. Hubungi dahulu untuk mengatur janji temu dan mengesahkan kerja yang sesuai bagi kenderaan anda.", image, alt: "Foto bengkel Kia Puchong menunjukkan perbincangan di sisi kenderaan dengan bonet terbuka", caption: "Perbincangan servis di bengkel Kia Puchong. Foto:", captionSource: imageSource, route: "automotive", linkLabel: "Terokai Automotif" },
      { type: "cards", alignHeadings: true, kicker: "Sebelum berkunjung", title: "Bersedia untuk janji temu bengkel.", items: [
        { number: "01", title: "Tempah janji temu servis", text: "Sediakan model, nombor pendaftaran, bacaan perbatuan dan rekod servis. Tanya item penyelenggaraan yang perlu dibuat, perkara yang termasuk dalam anggaran harga dan masa untuk menghantar kereta. Sahkan anggaran masa pengambilan supaya anda boleh merancang hari anda." },
        { number: "02", title: "Terangkan keperluan pembaikan", text: "Maklumkan lampu amaran, bunyi luar biasa atau perubahan semasa memandu, termasuk bila ia berlaku. Tanya sama ada pemeriksaan diperlukan sebelum sebut harga diberikan. Bagi alat ganti, sahkan kesesuaian, ketersediaan dan anggaran kos dengan pasukan." },
        { number: "03", title: "Bincang badan dan cat", text: "Terangkan bahagian yang rosak atau cat yang ingin diperiksa. Tanya tentang skop pembaikan, kemasan dan anggaran tempoh siap. Jika melibatkan tuntutan insurans, semak dokumen dan kelulusan yang diperlukan sebelum membenarkan kerja dimulakan." }
      ] },
      { type: "businessVisit", kicker: "Rancang kunjungan", title: "Cari servis Kia di Jalan TPK 2/8.", text: "Bengkel di TPK Park terletak di No. 59. Atur janji temu servis dan pembaikan secara terus dengan Kia Puchong.", addressLabel: "Alamat bengkel TPK Park", address,
        contacts: [
          { label: "Pertanyaan telefon", value: "+60 3 8076 1005", url: "tel:+60380761005" },
          { label: "Pertanyaan e-mel", value: "sales@kiapuchong.com.my", url: "mailto:sales@kiapuchong.com.my" }
        ],
        hours: [
          { label: "Isnin–Jumaat", value: "8.30 pagi–5.30 petang" },
          { label: "Sabtu", value: "8.30 pagi–3 petang" }
        ],
        note: "Waktu operasi disenaraikan oleh Kia Malaysia. Sahkan janji temu serta aturan hari Ahad atau cuti umum sebelum bertolak. Untuk lawatan bilik pameran atau pandu uji, minta Kia Puchong mengesahkan lokasi pertemuan.", links: [
          { label: "Cari bengkel di Google Maps", url: directions },
          { label: "Cari bengkel di Waze", url: waze },
          { label: "Laman web Kia Puchong", url: branch },
          { label: "Pencari pengedar Kia Malaysia", url: dealerLocator }
        ]
      }
    ],
    cta: { title: "Rancang kunjungan bengkel anda.", text: "Telefon Kia Puchong untuk berbincang tentang kerja yang diperlukan dan mengatur janji temu yang sesuai.", button: "Telefon Kia Puchong", url: "tel:+60380761005" }
  },
  zh: {
    parentRoute: "automotive",
    eyebrow: "Kia Puchong · 保养与维修",
    title: "TPK Park里的Kia 4S Service。",
    description: "Kia Puchong维修中心位于蒲种Jalan TPK 2/8的59号。查看电话、营业时间与导航，安排汽车保养、维修及车身喷漆咨询。",
    lead: "Kia Puchong维修中心由KMW Auto Sdn Bhd经营，位于Jalan TPK 2/8的59号，是TPK Park汽车服务集群的一部分。可联系团队咨询定期保养、维修、零件，以及车身修复与喷漆。",
    image, heroImage: image,
    heroAlt: "Kia Puchong官网刊载的维修中心照片，展示车辆保养咨询场景",
    business: kia4sServiceBusiness, datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "为下一次保养做好安排。", text: "无论是到期保养，还是需要检查某个问题，都可先向维修团队说明车辆状况与需求。Kia Puchong亦列有喷漆、车身修复及保险索赔咨询服务。出发前先致电安排合适的预约，并确认团队可为你的车辆处理哪些项目。", image, alt: "Kia Puchong维修中心内，两人在引擎盖打开的车辆旁讨论保养事项", caption: "Kia Puchong维修中心的服务咨询场景。图片来源：", captionSource: imageSource, route: "automotive", linkLabel: "查看汽车服务" },
      { type: "cards", alignHeadings: true, kicker: "到访之前", title: "为维修预约做好准备。", items: [
        { number: "01", title: "预约车辆保养", text: "准备车型、车牌号码、行驶里程及保养记录。询问本次建议进行的保养项目、估价包含的内容，以及送车时间。确认预计取车时间，方便安排当天行程。" },
        { number: "02", title: "说明维修与零件需求", text: "说明仪表板警示灯、异常声响或驾驶表现的变化，以及问题通常在什么情况下出现。询问报价前是否需要实车检查。如需更换零件，请向团队确认适用性、供应情况及预计费用。" },
        { number: "03", title: "咨询车身与喷漆", text: "说明受损位置或希望检查的漆面状况，并询问维修范围、表面处理及预计完工时间。如涉及保险索赔，先了解所需文件与审批安排，再授权施工。" }
      ] },
      { type: "businessVisit", kicker: "到访安排", title: "在Jalan TPK 2/8找到Kia维修中心。", text: "TPK Park的维修中心位于59号。保养和维修预约请直接联系Kia Puchong。", addressLabel: "TPK Park维修中心地址", address,
        contacts: [
          { label: "电话咨询", value: "+60 3 8076 1005", url: "tel:+60380761005" },
          { label: "电邮咨询", value: "sales@kiapuchong.com.my", url: "mailto:sales@kiapuchong.com.my" }
        ],
        hours: [
          { label: "星期一至星期五", value: "上午8时30分至下午5时30分" },
          { label: "星期六", value: "上午8时30分至下午3时" }
        ],
        note: "以上时间根据Kia Malaysia的经销商资料。出发前请确认预约，以及星期日或公共假期的安排。如计划参观展厅或试驾，请先向Kia Puchong确认会面地点。", links: [
          { label: "在Google Maps查找维修中心", url: directions },
          { label: "在Waze查找维修中心", url: waze },
          { label: "Kia Puchong官网", url: branch },
          { label: "Kia Malaysia经销商查询", url: dealerLocator }
        ]
      }
    ],
    cta: { title: "安排下一次维修中心到访。", text: "致电Kia Puchong说明所需项目，并安排合适的预约。", button: "致电Kia Puchong", url: "tel:+60380761005" }
  }
};
