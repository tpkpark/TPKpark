// Source verification and editorial boundaries: docs/happivilles-profile-sources.md.
const facebook = "https://www.facebook.com/happivilles";
const whatsapp = "https://wa.me/60126997215";
const directions = "https://www.google.com/maps/search/?api=1&query=Happivilles+31-1+Jalan+TPK+2%2F8+Puchong";
const image = "https://i.imgur.com/Dp6P0OV.jpg";
const address = "31-1, Jalan TPK 2/8, Taman Perindustrian Kinrara, 47180 Puchong, Selangor";

export const happivillesBusiness = {
  "@type": "LocalBusiness",
  "@id": "https://www.tpkpark.com/lifestyle/happivilles/#business",
  name: "Happivilles",
  alternateName: "Happivilles 快乐坊",
  url: facebook,
  sameAs: [facebook],
  telephone: "+60126997215",
  email: "happivilles@gmail.com",
  hasMap: directions,
  address: {
    "@type": "PostalAddress",
    streetAddress: "31-1, Jalan TPK 2/8, Taman Perindustrian Kinrara",
    addressLocality: "Puchong",
    addressRegion: "Selangor",
    postalCode: "47180",
    addressCountry: "MY"
  },
  containedInPlace: { "@id": "https://www.tpkpark.com/#taman-perindustrian-kinrara" }
};

export const happivillesProfiles = {
  en: {
    parentRoute: "lifestyle",
    eyebrow: "Happivilles · Personal development & wellness",
    title: "Happivilles at TPK Park.",
    description: "Find Happivilles at 31-1, Jalan TPK 2/8, TPK Park, Puchong. Explore its personal-development workshops, public contact details and directions.",
    lead: "Happivilles (快乐坊) is a personal-development and wellness centre at No. 31-1, Jalan TPK 2/8. Its public communications focus on workshops and guided programmes around self-awareness, meditation, relationships, happiness and personal growth.",
    image,
    heroImage: image,
    heroAlt: "Happivilles brand graphic for the personal-development and wellness centre at TPK Park",
    business: happivillesBusiness,
    datePublished: "2026-09-17",
    blocks: [
      { type: "split", title: "A space for reflection and personal growth.", text: "Happivilles’ public communications centre on workshops and guided sessions touching on self-awareness, meditation, relationships, emotional patterns and personal growth. Programme names, dates, languages and availability can change, so check directly before joining.", image, alt: "Happivilles brand graphic", route: "lifestyle", linkLabel: "Explore Lifestyle" },
      { type: "cards", alignHeadings: true, kicker: "What to expect", title: "Programmes built around self-awareness and personal development.", items: [
        { number: "01", title: "Workshops & guided sessions", text: "Happivilles publishes talks, courses and workshops around personal-development themes. Contact the team for the current programme and booking arrangements." },
        { number: "02", title: "Meditation & reflection", text: "Public material also refers to meditation, reflection and self-awareness practices. The page describes these as programme themes and does not make medical or therapeutic claims." },
        { number: "03", title: "Check the current programme", text: "Dates, language, fees and places can vary by session. Confirm the latest information directly with Happivilles before attending." }
      ] },
      { type: "businessVisit", kicker: "Plan your visit", title: "Find Happivilles on the first floor at No. 31-1.", text: "Happivilles is publicly listed at 31-1, Jalan TPK 2/8, Taman Perindustrian Kinrara. Current business listings and the existing TPK Park directory record point to this same Puchong address.", addressLabel: "TPK Park address", address,
        contacts: [
          { label: "Happivilles enquiries", value: "+60 12 699 7215", url: "tel:+60126997215" },
          { label: "WhatsApp", value: "+60 12 699 7215", url: whatsapp },
          { label: "Email", value: "happivilles@gmail.com", url: "mailto:happivilles@gmail.com" }
        ],
        hours: [{ label: "Opening hours", value: "A current public business listing shows 9am–6pm daily — confirm directly before a time-sensitive visit" }],
        note: "Workshop schedules can differ from general business-listing hours. Confirm the current programme, language, fees and availability directly with Happivilles.",
        links: [
          { label: "Visit Happivilles on Facebook", url: facebook },
          { label: "Find Happivilles on Google Maps", url: directions }
        ]
      }
    ],
    cta: { title: "See what Happivilles is currently running.", text: "Contact Happivilles to confirm the latest workshop or guided-session schedule before you go.", button: "Visit Happivilles on Facebook", url: facebook }
  },
  ms: {
    parentRoute: "lifestyle",
    eyebrow: "Happivilles · Pembangunan diri & kesejahteraan",
    title: "Happivilles di TPK Park.",
    description: "Cari Happivilles di 31-1, Jalan TPK 2/8, TPK Park, Puchong. Terokai bengkel pembangunan diri, maklumat hubungan awam dan arah perjalanan.",
    lead: "Happivilles (快乐坊) ialah pusat pembangunan diri dan kesejahteraan di No. 31-1, Jalan TPK 2/8. Komunikasi awamnya memberi tumpuan kepada bengkel dan program berpandu berkaitan kesedaran diri, meditasi, hubungan, kebahagiaan dan perkembangan diri.",
    image,
    heroImage: image,
    heroAlt: "Grafik jenama Happivilles untuk pusat pembangunan diri dan kesejahteraan di TPK Park",
    business: happivillesBusiness,
    datePublished: "2026-09-17",
    blocks: [
      { type: "split", title: "Ruang untuk refleksi dan perkembangan diri.", text: "Komunikasi awam Happivilles memberi tumpuan kepada bengkel dan sesi berpandu mengenai kesedaran diri, meditasi, hubungan, corak emosi dan perkembangan diri. Nama program, tarikh, bahasa dan ketersediaan boleh berubah, jadi sahkan terus sebelum menyertai.", image, alt: "Grafik jenama Happivilles", route: "lifestyle", linkLabel: "Terokai Lifestyle" },
      { type: "cards", alignHeadings: true, kicker: "Apa yang tersedia", title: "Program berasaskan kesedaran diri dan pembangunan peribadi.", items: [
        { number: "01", title: "Bengkel & sesi berpandu", text: "Happivilles menerbitkan ceramah, kursus dan bengkel berkaitan tema pembangunan diri. Hubungi pasukan untuk program dan aturan tempahan semasa." },
        { number: "02", title: "Meditasi & refleksi", text: "Bahan awam turut merujuk kepada meditasi, refleksi dan amalan kesedaran diri. Halaman ini menerangkannya sebagai tema program tanpa membuat tuntutan perubatan atau terapeutik." },
        { number: "03", title: "Semak program semasa", text: "Tarikh, bahasa, yuran dan tempat boleh berbeza mengikut sesi. Sahkan maklumat terkini terus dengan Happivilles sebelum hadir." }
      ] },
      { type: "businessVisit", kicker: "Rancang kunjungan", title: "Cari Happivilles di tingkat satu, No. 31-1.", text: "Happivilles disenaraikan secara awam di 31-1, Jalan TPK 2/8, Taman Perindustrian Kinrara. Penyenaraian perniagaan semasa dan direktori TPK Park sedia ada merujuk kepada alamat Puchong yang sama.", addressLabel: "Alamat TPK Park", address,
        contacts: [
          { label: "Pertanyaan Happivilles", value: "+60 12 699 7215", url: "tel:+60126997215" },
          { label: "WhatsApp", value: "+60 12 699 7215", url: whatsapp },
          { label: "E-mel", value: "happivilles@gmail.com", url: "mailto:happivilles@gmail.com" }
        ],
        hours: [{ label: "Waktu operasi", value: "Penyenaraian perniagaan awam semasa menunjukkan 9 pagi–6 petang setiap hari — sahkan terus sebelum kunjungan yang terikat masa" }],
        note: "Jadual bengkel boleh berbeza daripada waktu penyenaraian umum. Sahkan program, bahasa, yuran dan ketersediaan semasa terus dengan Happivilles.",
        links: [
          { label: "Lawati Happivilles di Facebook", url: facebook },
          { label: "Cari Happivilles di Google Maps", url: directions }
        ]
      }
    ],
    cta: { title: "Lihat program semasa Happivilles.", text: "Hubungi Happivilles untuk mengesahkan jadual bengkel atau sesi berpandu terkini sebelum berkunjung.", button: "Lawati Happivilles di Facebook", url: facebook }
  },
  zh: {
    parentRoute: "lifestyle",
    eyebrow: "Happivilles 快乐坊 · 个人成长与身心探索",
    title: "TPK Park里的Happivilles快乐坊。",
    description: "Happivilles快乐坊位于蒲种TPK Park的Jalan TPK 2/8门牌31-1。查看个人成长工作坊、公开联系方式与导航。",
    lead: "Happivilles快乐坊位于Jalan TPK 2/8门牌31-1，是一个以个人成长与身心探索为主题的活动空间。现有公开内容主要介绍自我觉察、静心、关系、快乐与个人成长等工作坊及引导课程。",
    image,
    heroImage: image,
    heroAlt: "Happivilles快乐坊品牌图片，用于TPK Park个人成长与身心探索页面",
    business: happivillesBusiness,
    datePublished: "2026-09-17",
    blocks: [
      { type: "split", title: "留一点空间，认识自己。", text: "Happivilles快乐坊现有公开内容以工作坊及引导活动为主，主题包括自我觉察、静心、关系、情绪模式与个人成长。课程名称、日期、语言及名额可能调整，参加前请直接确认。", image, alt: "Happivilles快乐坊品牌图片", route: "lifestyle", linkLabel: "查看生活品味" },
      { type: "cards", alignHeadings: true, kicker: "活动内容", title: "围绕自我觉察与个人成长的课程。", items: [
        { number: "01", title: "工作坊与引导活动", text: "Happivilles快乐坊公开发布与个人成长相关的讲座、课程及工作坊。可直接联系团队查询目前活动及报名方式。" },
        { number: "02", title: "静心与反思", text: "公开资料也提及静心、反思与自我觉察等练习。本页只把这些内容作为活动主题介绍，并不作医疗或治疗效果声明。" },
        { number: "03", title: "先确认最新课程", text: "不同活动的日期、语言、费用及名额可能不同。参加之前请直接向Happivilles快乐坊确认最新资料。" }
      ] },
      { type: "businessVisit", kicker: "到访安排", title: "Happivilles快乐坊位于31-1的一楼单位。", text: "Happivilles快乐坊公开地址为Taman Perindustrian Kinrara的Jalan TPK 2/8门牌31-1。现有商家资料及TPK Park原有目录均指向同一蒲种地址。", addressLabel: "TPK Park地址", address,
        contacts: [
          { label: "Happivilles咨询", value: "+60 12 699 7215", url: "tel:+60126997215" },
          { label: "WhatsApp", value: "+60 12 699 7215", url: whatsapp },
          { label: "电邮", value: "happivilles@gmail.com", url: "mailto:happivilles@gmail.com" }
        ],
        hours: [{ label: "营业时间", value: "现有公开商家资料显示每天上午9时至下午6时；如行程时间较紧，请先直接确认" }],
        note: "工作坊时间可能与一般商家营业时段不同。请直接向Happivilles快乐坊确认现有课程、语言、费用及名额。",
        links: [
          { label: "浏览Happivilles Facebook", url: facebook },
          { label: "在Google Maps查找Happivilles", url: directions }
        ]
      }
    ],
    cta: { title: "看看Happivilles快乐坊最近有什么活动。", text: "出发前直接联系Happivilles快乐坊，确认最新工作坊或引导活动时间。", button: "浏览Happivilles Facebook", url: facebook }
  }
};
