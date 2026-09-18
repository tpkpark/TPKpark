// Workshop identity/photo provenance: docs/techtrics-auto-profile-sources.md.
// Supplier revisions: docs/techtrics-techtra-supplied-revisions.md.
const website = "https://mercedesworkshop.com.my/";
const directions = "https://www.google.com/maps/search/?api=1&query=Techtrics+Auto+61+63+Jalan+TPK+2%2F8+47180+Puchong";
const waze = "https://ul.waze.com/ul?preview_venue_id=66584606.666108209.9699534&navigate=yes";
const whatsapp = "https://wa.me/60124496696";
const image = "https://www.tpkpark.com/assets/images/techtrics-auto-exterior-1280.webp";
const address = "61 & 63, Jalan TPK 2/8, Taman Perindustrian Kinrara, 47180 Puchong, Selangor";

export const techtricsAutoBusiness = {
  "@type": "AutoRepair",
  "@id": "https://www.tpkpark.com/automotive/techtrics-auto/#business",
  name: "Techtrics Auto",
  legalName: "Techtrics Auto Sdn Bhd",
  url: website, telephone: "+60358916661", email: "info@mercedesworkshop.com.my", image, hasMap: waze,
  contactPoint: [
    { "@type": "ContactPoint", telephone: "+60358916661", contactType: "Office enquiries" },
    { "@type": "ContactPoint", telephone: "+60124496696", contactType: "Mobile and WhatsApp enquiries", url: whatsapp }
  ],
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:30", closes: "17:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "15:00" }
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
    eyebrow: "Techtrics Auto · European & continental car care",
    title: "Techtrics Auto at TPK Park.",
    description: "Techtrics Auto in Puchong: European and continental vehicle servicing, diagnostics and repairs at 61 & 63, Jalan TPK 2/8. Opening hours and WhatsApp.",
    lead: "Techtrics Auto is an automotive service and repair specialist located at TPK Park, Puchong. The workshop provides vehicle servicing, diagnostics, maintenance and repair solutions, specialising in European and continental vehicles. For servicing, repairs or automotive enquiries, contact Techtrics Auto directly or visit the workshop at TPK Park.",
    image, heroImage: image,
    heroAlt: "Techtrics Auto’s workshop exterior and service bays, from the workshop’s official website",
    business: techtricsAutoBusiness, datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "Servicing, diagnostics and repair.", text: "Services include servicing, diagnostics, repair and maintenance, covering engines, transmissions, brakes, electrical systems and air-conditioning. Vehicle brands include Lamborghini, Ferrari, McLaren, Mercedes-Benz, BMW, Audi, Porsche, MINI, Volkswagen and more. Contact Techtrics Auto directly to discuss the work required for your vehicle.", image, alt: "Techtrics Auto’s illuminated workshop frontage, with cars in the forecourt and service bays", route: "automotive", linkLabel: "Explore Automotive" },
      { type: "cards", alignHeadings: true, kicker: "Before your visit", title: "Make the most of your workshop appointment.", items: [
        { number: "01", title: "Plan scheduled servicing", text: "Have your model, year, mileage and service records ready. Ask which maintenance items are due and what the estimate includes. Confirm the drop-off time and expected collection arrangements before booking." },
        { number: "02", title: "Describe the problem", text: "Note any warning lights, unusual sounds or changes in how the car drives. Explain when the issue occurs and whether any recent work has been done. Ask about the inspection process, diagnostic charges and when to expect an update." },
        { number: "03", title: "Review the repair plan", text: "Ask the team to explain its findings and proposed work before you give approval. Clarify the parts options, labour charges and estimated completion time. Agree how you will be contacted if further work is identified." }
      ] },
      { type: "businessVisit", kicker: "Plan your visit", title: "Find Techtrics Auto on Jalan TPK 2/8.", text: "The workshop is at No. 61 & 63. Opening hours: Monday–Friday, 8:30am–5:30pm; Saturday, 9:00am–3:00pm. Contact Techtrics Auto directly to discuss your vehicle and arrange a suitable appointment.", addressLabel: "TPK Park workshop address", address,
        contacts: [
          { label: "Office enquiries", value: "+60 3 5891 6661", url: "tel:+60358916661" },
          { label: "Mobile enquiries", value: "+60 12 449 6696", url: "tel:+60124496696" },
          { label: "WhatsApp enquiries", value: "+60 12 449 6696", url: whatsapp },
          { label: "Email enquiries", value: "info@mercedesworkshop.com.my", url: "mailto:info@mercedesworkshop.com.my" }
        ],
        note: "Confirm appointment availability and whether the workshop can handle the work required for your specific vehicle before travelling.", links: [
          { label: "Find the workshop on Google Maps", url: directions },
          { label: "Directions to the workshop on Waze", url: waze },
          { label: "Techtrics Auto website", url: website }
        ]
      }
    ],
    cta: { title: "Talk through your car’s next service.", text: "Contact Techtrics Auto with your vehicle details and the work you would like to discuss.", button: "WhatsApp Techtrics Auto", url: whatsapp }
  },
  ms: {
    parentRoute: "automotive",
    eyebrow: "Techtrics Auto · Penjagaan kereta Eropah & kontinental",
    title: "Techtrics Auto di TPK Park.",
    description: "Techtrics Auto di Puchong: servis, diagnostik dan pembaikan kenderaan Eropah serta kontinental di 61 & 63, Jalan TPK 2/8. Waktu operasi dan WhatsApp.",
    lead: "Techtrics Auto ialah pakar servis dan pembaikan automotif yang terletak di TPK Park, Puchong. Bengkel ini menyediakan servis, diagnostik, penyelenggaraan dan pembaikan kenderaan, dengan pengkhususan dalam kenderaan Eropah dan kontinental. Untuk servis, pembaikan atau pertanyaan automotif, hubungi Techtrics Auto secara terus atau kunjungi bengkelnya di TPK Park.",
    image, heroImage: image,
    heroAlt: "Bahagian luar dan ruang servis bengkel Techtrics Auto, daripada laman web rasminya",
    business: techtricsAutoBusiness, datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "Servis, diagnostik dan pembaikan.", text: "Perkhidmatan merangkumi servis, diagnostik, pembaikan dan penyelenggaraan, termasuk enjin, transmisi, brek, sistem elektrik serta penyaman udara. Jenama kenderaan termasuk Lamborghini, Ferrari, McLaren, Mercedes-Benz, BMW, Audi, Porsche, MINI, Volkswagen dan lain-lain. Hubungi Techtrics Auto secara terus untuk membincangkan kerja yang diperlukan bagi kenderaan anda.", image, alt: "Bahagian hadapan bengkel Techtrics Auto yang bercahaya, dengan kereta di halaman dan ruang servis", route: "automotive", linkLabel: "Terokai Automotif" },
      { type: "cards", alignHeadings: true, kicker: "Sebelum berkunjung", title: "Bersedia untuk janji temu bengkel.", items: [
        { number: "01", title: "Rancang servis berkala", text: "Sediakan model, tahun, bacaan perbatuan dan rekod servis. Tanya item penyelenggaraan yang perlu dibuat serta perkara yang termasuk dalam anggaran harga. Sahkan masa penghantaran dan aturan pengambilan kereta sebelum menempah janji temu." },
        { number: "02", title: "Terangkan masalah kereta", text: "Catat lampu amaran, bunyi luar biasa atau perubahan semasa memandu. Terangkan bila masalah berlaku dan maklumkan sebarang kerja yang baru dilakukan. Tanya tentang proses pemeriksaan, caj diagnostik dan bila anda boleh menerima maklum balas." },
        { number: "03", title: "Semak cadangan pembaikan", text: "Minta pasukan menerangkan hasil pemeriksaan dan kerja yang dicadangkan sebelum anda memberikan kelulusan. Jelaskan pilihan alat ganti, caj upah dan anggaran masa siap. Tetapkan cara pasukan akan menghubungi anda jika kerja tambahan diperlukan." }
      ] },
      { type: "businessVisit", kicker: "Rancang kunjungan", title: "Cari Techtrics Auto di Jalan TPK 2/8.", text: "Bengkel terletak di No. 61 & 63. Waktu operasi: Isnin–Jumaat, 8:30 pagi–5:30 petang; Sabtu, 9:00 pagi–3:00 petang. Hubungi Techtrics Auto secara terus untuk membincangkan keperluan kenderaan dan mengatur janji temu yang sesuai.", addressLabel: "Alamat bengkel TPK Park", address,
        contacts: [
          { label: "Telefon pejabat", value: "+60 3 5891 6661", url: "tel:+60358916661" },
          { label: "Telefon bimbit", value: "+60 12 449 6696", url: "tel:+60124496696" },
          { label: "Pertanyaan WhatsApp", value: "+60 12 449 6696", url: whatsapp },
          { label: "Pertanyaan e-mel", value: "info@mercedesworkshop.com.my", url: "mailto:info@mercedesworkshop.com.my" }
        ],
        note: "Sahkan ketersediaan janji temu dan sama ada bengkel boleh menjalankan kerja yang diperlukan untuk kenderaan anda sebelum bertolak.", links: [
          { label: "Cari bengkel di Google Maps", url: directions },
          { label: "Arah ke bengkel melalui Waze", url: waze },
          { label: "Laman web Techtrics Auto", url: website }
        ]
      }
    ],
    cta: { title: "Bincangkan servis kereta anda.", text: "Hubungi Techtrics Auto dengan butiran kenderaan dan kerja yang ingin anda bincangkan.", button: "WhatsApp Techtrics Auto", url: whatsapp }
  },
  zh: {
    parentRoute: "automotive",
    eyebrow: "Techtrics Auto · 欧系车保养与维修",
    title: "TPK Park里的Techtrics Auto。",
    description: "Techtrics Auto位于蒲种Jalan TPK 2/8的61及63号，专注于欧系车保养、故障诊断及维修。查看营业时间、电话、WhatsApp与导航。",
    lead: "Techtrics Auto是一家位于蒲种TPK Park的汽车保养与维修专门店，提供车辆保养、故障诊断、维护及维修服务，专注于欧系汽车。如需保养、维修或咨询汽车相关事宜，可直接联系Techtrics Auto，或到访其位于TPK Park的维修厂。",
    image, heroImage: image,
    heroAlt: "Techtrics Auto官网刊载的维修厂外观及维修工位照片",
    business: techtricsAutoBusiness, datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "车辆保养、故障诊断与维修。", text: "服务涵盖车辆保养、故障诊断、维修及维护，包括引擎、变速箱、刹车、电路系统与冷气。服务的汽车品牌包括Lamborghini、Ferrari、McLaren、Mercedes-Benz、BMW、Audi、Porsche、MINI、Volkswagen等。可直接联系Techtrics Auto，咨询你的车辆所需的项目。", image, alt: "灯光亮起的Techtrics Auto维修厂外观，前院与维修工位内停有多辆汽车", route: "automotive", linkLabel: "查看汽车服务" },
      { type: "cards", alignHeadings: true, kicker: "到访之前", title: "为维修预约做好准备。", items: [
        { number: "01", title: "安排定期保养", text: "准备好车型、年份、行驶里程及保养记录。预约前，先确认建议进行的保养项目、报价包含的内容及预计维修时间，并确认送车与取车安排，方便提前规划行程。" },
        { number: "02", title: "说明车辆问题", text: "记录仪表板警示灯、异常声响或驾驶表现的变化。说明问题通常在什么情况下发生，以及车辆近期是否进行过维修。询问检查流程、诊断费用及预计何时收到反馈。" },
        { number: "03", title: "确认维修方案", text: "授权施工前，请团队说明检查结果与建议项目。了解零件选择、人工费用及预计完工时间，并约定如发现需要额外处理的问题，团队应如何联系你确认。" }
      ] },
      { type: "businessVisit", kicker: "到访安排", title: "在Jalan TPK 2/8找到Techtrics Auto。", text: "维修厂位于61及63号。营业时间：星期一至星期五，上午8:30至下午5:30；星期六，上午9:00至下午3:00。请直接联系Techtrics Auto说明车辆需求，并安排合适的预约。", addressLabel: "TPK Park维修厂地址", address,
        contacts: [
          { label: "办公室电话", value: "+60 3 5891 6661", url: "tel:+60358916661" },
          { label: "手机咨询", value: "+60 12 449 6696", url: "tel:+60124496696" },
          { label: "WhatsApp咨询", value: "+60 12 449 6696", url: whatsapp },
          { label: "电邮咨询", value: "info@mercedesworkshop.com.my", url: "mailto:info@mercedesworkshop.com.my" }
        ],
        note: "出发前请确认预约空档，以及维修厂能否为你的具体车型处理所需项目。", links: [
          { label: "在Google Maps查找维修厂", url: directions },
          { label: "通过Waze导航至维修厂", url: waze },
          { label: "Techtrics Auto官网", url: website }
        ]
      }
    ],
    cta: { title: "咨询爱车的下一次保养。", text: "联系Techtrics Auto，说明车辆资料及希望咨询的维修保养项目。", button: "WhatsApp联系Techtrics Auto", url: whatsapp }
  }
};
