// Verified workshop details and photo provenance: docs/techtrics-auto-profile-sources.md.
const website = "https://mercedesworkshop.com.my/";
const directions = "https://www.google.com/maps/search/?api=1&query=Techtrics+Auto+61+63+Jalan+TPK+2%2F8+47180+Puchong";
const waze = "https://ul.waze.com/ul?preview_venue_id=66584606.666108209.9699534&navigate=yes";
const image = "https://www.tpkpark.com/assets/images/techtrics-auto-exterior-1280.webp";
const imageSource = { label: "Techtrics Auto", url: "https://mercedesworkshop.com.my/wp-content/uploads/2017/04/hq-1-1.png" };
const address = "61 & 63, Jalan TPK 2/8, Taman Perindustrian Kinrara, 47180 Puchong, Selangor";

export const techtricsAutoBusiness = {
  "@type": "AutoRepair",
  "@id": "https://www.tpkpark.com/automotive/techtrics-auto/#business",
  name: "Techtrics Auto",
  legalName: "Techtrics Auto Sdn Bhd",
  url: website, telephone: "+60358916661", email: "info@mercedesworkshop.com.my", image, hasMap: waze,
  contactPoint: [
    { "@type": "ContactPoint", telephone: "+60358916661", contactType: "Office enquiries" },
    { "@type": "ContactPoint", telephone: "+60124496696", contactType: "Mobile enquiries" }
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "61 & 63, Jalan TPK 2/8, Taman Perindustrian Kinrara",
    addressLocality: "Puchong", addressRegion: "Selangor", postalCode: "47180", addressCountry: "MY"
  },
  containedInPlace: { "@id": "https://www.tpkpark.com/#taman-perindustrian-kinrara" }
};

export const techtricsAutoProfiles = {
  en: {
    parentRoute: "automotive",
    eyebrow: "Techtrics Auto · Continental car care",
    title: "Techtrics Auto at TPK Park.",
    description: "Find Techtrics Auto at 61 & 63, Jalan TPK 2/8, Puchong. Contacts and directions for continental car servicing, diagnostics and repair enquiries.",
    lead: "Techtrics Auto is an independent workshop for continental cars at No. 61 & 63, Jalan TPK 2/8. Contact the team about servicing, diagnostics and repairs within TPK Park’s Automotive cluster.",
    image, heroImage: image,
    heroAlt: "Techtrics Auto’s workshop exterior and service bays, from the workshop’s official website",
    business: techtricsAutoBusiness, datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "Understand what your car needs.", text: "From routine maintenance to investigating a fault, a useful first conversation starts with your car’s details and the reason for your visit. Techtrics Auto lists continental makes including Mercedes-Benz, BMW, Audi and Porsche. Share your model, year and concerns so the team can advise on an appointment and the next steps.", image, alt: "Techtrics Auto’s illuminated workshop frontage, with cars in the forecourt and service bays", route: "automotive", linkLabel: "Explore Automotive" },
      { type: "cards", alignHeadings: true, kicker: "Before your visit", title: "Make the most of your workshop appointment.", items: [
        { number: "01", title: "Plan scheduled servicing", text: "Have your model, year, mileage and service records ready. Ask which maintenance items are due and what the estimate includes. Confirm the drop-off time and expected collection arrangements before booking." },
        { number: "02", title: "Describe the problem", text: "Note any warning lights, unusual sounds or changes in how the car drives. Explain when the issue occurs and whether any recent work has been done. Ask about the inspection process, diagnostic charges and when to expect an update." },
        { number: "03", title: "Review the repair plan", text: "Ask the team to explain its findings and proposed work before you give approval. Clarify the parts options, labour charges and estimated completion time. Agree how you will be contacted if further work is identified." }
      ] },
      { type: "businessVisit", kicker: "Plan your visit", title: "Find Techtrics Auto on Jalan TPK 2/8.", text: "The workshop is at No. 61 & 63. Contact Techtrics Auto directly to discuss your vehicle and arrange a suitable appointment.", addressLabel: "TPK Park workshop address", address,
        contacts: [
          { label: "Office enquiries", value: "+60 3 5891 6661", url: "tel:+60358916661" },
          { label: "Mobile enquiries", value: "+60 12 449 6696", url: "tel:+60124496696" },
          { label: "Email enquiries", value: "info@mercedesworkshop.com.my", url: "mailto:info@mercedesworkshop.com.my" }
        ],
        note: "Confirm opening hours, appointment availability and whether the workshop can handle the work required for your specific vehicle before travelling.", links: [
          { label: "Find the workshop on Google Maps", url: directions },
          { label: "Directions to the workshop on Waze", url: waze },
          { label: "Techtrics Auto website", url: website }
        ]
      }
    ],
    cta: { title: "Talk through your car’s next service.", text: "Call Techtrics Auto with your vehicle details and the work you would like to discuss.", button: "Call Techtrics Auto", url: "tel:+60358916661" }
  },
  ms: {
    parentRoute: "automotive",
    eyebrow: "Techtrics Auto · Penjagaan kereta kontinental",
    title: "Techtrics Auto di TPK Park.",
    description: "Cari Techtrics Auto di 61 & 63, Jalan TPK 2/8, Puchong. Maklumat hubungan dan arah perjalanan untuk servis, diagnostik serta pembaikan kereta kontinental.",
    lead: "Techtrics Auto ialah bengkel bebas untuk kereta kontinental di No. 61 & 63, Jalan TPK 2/8. Hubungi pasukan untuk servis, diagnostik dan pembaikan dalam kluster Automotif TPK Park.",
    image, heroImage: image,
    heroAlt: "Bahagian luar dan ruang servis bengkel Techtrics Auto, daripada laman web rasminya",
    business: techtricsAutoBusiness, datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "Fahami keperluan kereta anda.", text: "Sama ada untuk penyelenggaraan berkala atau mengenal pasti masalah, mulakan perbincangan dengan butiran kereta dan tujuan kunjungan anda. Techtrics Auto menyenaraikan jenama kontinental termasuk Mercedes-Benz, BMW, Audi dan Porsche. Maklumkan model, tahun dan masalah yang dialami supaya pasukan boleh memberi panduan tentang janji temu dan langkah seterusnya.", image, alt: "Bahagian hadapan bengkel Techtrics Auto yang bercahaya, dengan kereta di halaman dan ruang servis", route: "automotive", linkLabel: "Terokai Automotif" },
      { type: "cards", alignHeadings: true, kicker: "Sebelum berkunjung", title: "Bersedia untuk janji temu bengkel.", items: [
        { number: "01", title: "Rancang servis berkala", text: "Sediakan model, tahun, bacaan perbatuan dan rekod servis. Tanya item penyelenggaraan yang perlu dibuat serta perkara yang termasuk dalam anggaran harga. Sahkan masa penghantaran dan aturan pengambilan kereta sebelum menempah janji temu." },
        { number: "02", title: "Terangkan masalah kereta", text: "Catat lampu amaran, bunyi luar biasa atau perubahan semasa memandu. Terangkan bila masalah berlaku dan maklumkan sebarang kerja yang baru dilakukan. Tanya tentang proses pemeriksaan, caj diagnostik dan bila anda boleh menerima maklum balas." },
        { number: "03", title: "Semak cadangan pembaikan", text: "Minta pasukan menerangkan hasil pemeriksaan dan kerja yang dicadangkan sebelum anda memberikan kelulusan. Jelaskan pilihan alat ganti, caj upah dan anggaran masa siap. Tetapkan cara pasukan akan menghubungi anda jika kerja tambahan diperlukan." }
      ] },
      { type: "businessVisit", kicker: "Rancang kunjungan", title: "Cari Techtrics Auto di Jalan TPK 2/8.", text: "Bengkel terletak di No. 61 & 63. Hubungi Techtrics Auto secara terus untuk membincangkan keperluan kenderaan dan mengatur janji temu yang sesuai.", addressLabel: "Alamat bengkel TPK Park", address,
        contacts: [
          { label: "Telefon pejabat", value: "+60 3 5891 6661", url: "tel:+60358916661" },
          { label: "Telefon bimbit", value: "+60 12 449 6696", url: "tel:+60124496696" },
          { label: "Pertanyaan e-mel", value: "info@mercedesworkshop.com.my", url: "mailto:info@mercedesworkshop.com.my" }
        ],
        note: "Sahkan waktu operasi, ketersediaan janji temu dan sama ada bengkel boleh menjalankan kerja yang diperlukan untuk kenderaan anda sebelum bertolak.", links: [
          { label: "Cari bengkel di Google Maps", url: directions },
          { label: "Arah ke bengkel melalui Waze", url: waze },
          { label: "Laman web Techtrics Auto", url: website }
        ]
      }
    ],
    cta: { title: "Bincangkan servis kereta anda.", text: "Telefon Techtrics Auto dengan butiran kenderaan dan kerja yang ingin anda bincangkan.", button: "Telefon Techtrics Auto", url: "tel:+60358916661" }
  },
  zh: {
    parentRoute: "automotive",
    eyebrow: "Techtrics Auto · 欧系车保养与维修",
    title: "TPK Park里的Techtrics Auto。",
    description: "Techtrics Auto位于蒲种Jalan TPK 2/8的61及63号。查看电话、电邮与导航，咨询欧系车保养、故障诊断及维修。",
    lead: "Techtrics Auto是一家欧系车独立维修厂，位于Jalan TPK 2/8的61及63号。作为TPK Park汽车服务集群的一部分，提供车辆保养、故障诊断与维修咨询。",
    image, heroImage: image,
    heroAlt: "Techtrics Auto官网刊载的维修厂外观及维修工位照片",
    business: techtricsAutoBusiness, datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "了解爱车需要哪些维护。", text: "无论是定期保养，还是检查某个故障，都可先说明车辆资料与到访目的。Techtrics Auto列出的欧系车品牌包括Mercedes-Benz、BMW、Audi和Porsche。告知团队车型、年份及你关注的问题，方便咨询预约安排与后续步骤。", image, alt: "灯光亮起的Techtrics Auto维修厂外观，前院与维修工位内停有多辆汽车", route: "automotive", linkLabel: "查看汽车服务" },
      { type: "cards", alignHeadings: true, kicker: "到访之前", title: "为维修预约做好准备。", items: [
        { number: "01", title: "安排定期保养", text: "准备车型、年份、行驶里程及保养记录。询问本次建议进行的保养项目，以及估价包含哪些内容。预约前确认送车时间与预计取车安排，方便规划行程。" },
        { number: "02", title: "说明车辆问题", text: "记录仪表板警示灯、异常声响或驾驶表现的变化。说明问题通常在什么情况下发生，以及车辆近期是否进行过维修。询问检查流程、诊断费用及预计何时收到反馈。" },
        { number: "03", title: "确认维修方案", text: "授权施工前，请团队说明检查结果与建议项目。了解零件选择、人工费用及预计完工时间，并约定如发现需要额外处理的问题，团队应如何联系你确认。" }
      ] },
      { type: "businessVisit", kicker: "到访安排", title: "在Jalan TPK 2/8找到Techtrics Auto。", text: "维修厂位于61及63号。请直接联系Techtrics Auto说明车辆需求，并安排合适的预约。", addressLabel: "TPK Park维修厂地址", address,
        contacts: [
          { label: "办公室电话", value: "+60 3 5891 6661", url: "tel:+60358916661" },
          { label: "手机咨询", value: "+60 12 449 6696", url: "tel:+60124496696" },
          { label: "电邮咨询", value: "info@mercedesworkshop.com.my", url: "mailto:info@mercedesworkshop.com.my" }
        ],
        note: "出发前请确认营业时间、预约空档，以及维修厂能否为你的具体车型处理所需项目。", links: [
          { label: "在Google Maps查找维修厂", url: directions },
          { label: "通过Waze导航至维修厂", url: waze },
          { label: "Techtrics Auto官网", url: website }
        ]
      }
    ],
    cta: { title: "咨询爱车的下一次保养。", text: "致电Techtrics Auto，说明车辆资料及希望咨询的维修保养项目。", button: "致电Techtrics Auto", url: "tel:+60358916661" }
  }
};
