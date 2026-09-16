// Source verification and editorial boundaries: docs/forsee-lens-profile-sources.md.
const website = "https://forseelens.com/";
const contact = "https://forseelens.com/contact";
const lensSelector = "https://forseelens.com/post-listing";
const myoboost = "https://forseelens.com/myoboostplus";
const whatsapp = "https://wa.me/60162057917";
const directions = "https://www.google.com/maps/search/?api=1&query=Forsee+Sdn+Bhd+71+Jalan+TPK+2%2F8+Puchong";
const image = "/assets/images/forsee-lens-eyewear.svg";
const address = "71, Jalan TPK 2/8, Taman Perindustrian Kinrara, 47180 Puchong, Selangor";

export const forseeLensBusiness = {
  "@type": "LocalBusiness",
  "@id": "https://www.tpkpark.com/lifestyle/forsee-lens/#business",
  name: "Forsee Lens",
  alternateName: "Forsee Vision Care",
  url: website,
  sameAs: [website],
  telephone: "+60378000373",
  email: "cs_forsee@forsee.com.my",
  hasMap: directions,
  address: {
    "@type": "PostalAddress",
    streetAddress: "71, Jalan TPK 2/8, Taman Perindustrian Kinrara",
    addressLocality: "Puchong",
    addressRegion: "Selangor",
    postalCode: "47180",
    addressCountry: "MY"
  },
  contactPoint: [
    { "@type": "ContactPoint", contactType: "general enquiries", telephone: "+60378000373", email: "cs_forsee@forsee.com.my" },
    { "@type": "ContactPoint", contactType: "WhatsApp enquiries", telephone: "+60162057917", url: whatsapp }
  ],
  parentOrganization: { "@type": "Organization", name: "Eyepoint Technology Sdn Bhd" },
  containedInPlace: { "@id": "https://www.tpkpark.com/#taman-perindustrian-kinrara" }
};

export const forseeLensProfiles = {
  en: {
    parentRoute: "lifestyle",
    eyebrow: "Forsee Lens · Ophthalmic lens lab",
    title: "Forsee Lens at TPK Park.",
    description: "Find Forsee Lens and Eyepoint Technology at 71, Jalan TPK 2/8, TPK Park, Puchong. Explore lens categories, technology, contacts and directions.",
    lead: "Forsee Lens is an ophthalmic lens brand and in-house lens laboratory based at No. 71, Jalan TPK 2/8. Its current official site describes the Puchong operation as a fully automated lab producing freeform-design lenses and advanced lens technologies for the Malaysian market.",
    image,
    heroImage: image,
    heroAlt: "Forsee eyewear displayed on a Forsee box and brochure",
    business: forseeLensBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "Lens technology, made in Puchong.", text: "Forsee’s public range is organised around different wearer needs, including Above 40, Young Adult and Kids categories, with products and technologies such as MYOBOOST PLUS, SmartLife, Blue Defend and Photoshift. The TPK Park address is also the contact base published by Eyepoint Technology Sdn Bhd.", image, alt: "Forsee eyewear displayed on a Forsee box and brochure", route: "lifestyle", linkLabel: "Explore Lifestyle" },
      { type: "cards", alignHeadings: true, kicker: "What Forsee does", title: "A lens lab rather than a conventional optical storefront.", items: [
        { number: "01", title: "Freeform lens production", text: "Forsee describes its Puchong operation as an in-house ophthalmic lens lab producing freeform-design lenses with automated manufacturing technology." },
        { number: "02", title: "Different wearer needs", text: "The current product site groups lens solutions around older wearers, young adults and children, with separate product families and lens technologies." },
        { number: "03", title: "Check fitting and purchase arrangements", text: "Forsee’s website focuses on lens technology and eye-care professional partnerships rather than publishing a conventional retail-store service menu. Contact Forsee directly if you need to confirm fitting, ordering or visit arrangements." }
      ] },
      { type: "businessVisit", kicker: "Plan your visit", title: "Find Forsee at No. 71 on Jalan TPK 2/8.", text: "Forsee’s official contact page and company information place the Puchong operation at No. 71, Jalan TPK 2/8. The current official site does not publish regular opening hours, so contact the team before a time-sensitive visit.", addressLabel: "TPK Park address", address,
        contacts: [
          { label: "General enquiries", value: "+60 3 7800 0373", url: "tel:+60378000373" },
          { label: "WhatsApp", value: "+60 16 205 7917", url: whatsapp },
          { label: "Email", value: "cs_forsee@forsee.com.my", url: "mailto:cs_forsee@forsee.com.my" }
        ],
        hours: [{ label: "Opening hours", value: "Not published on the current official site — confirm directly before visiting" }],
        note: "Forsee is presented publicly as an ophthalmic lens lab and technology business. Product suitability, prescription, fitting and ordering should be discussed with Forsee or an appropriate eye-care professional.",
        links: [
          { label: "Visit the Forsee Lens website", url: website },
          { label: "Use the Forsee Lens Selector", url: lensSelector },
          { label: "Explore MYOBOOST PLUS", url: myoboost },
          { label: "Find Forsee on Google Maps", url: directions },
          { label: "Contact Forsee online", url: contact }
        ]
      }
    ],
    cta: { title: "Explore Forsee lens options.", text: "Use Forsee’s official product information and Lens Selector, or contact the Puchong team for current ordering and visit arrangements.", button: "Visit Forsee Lens", url: website }
  },
  ms: {
    parentRoute: "lifestyle",
    eyebrow: "Forsee Lens · Makmal kanta oftalmik",
    title: "Forsee Lens di TPK Park.",
    description: "Cari Forsee Lens dan Eyepoint Technology di 71, Jalan TPK 2/8, TPK Park, Puchong. Terokai kategori kanta, teknologi, hubungan dan arah perjalanan.",
    lead: "Forsee Lens ialah jenama kanta oftalmik dan makmal kanta dalaman yang beroperasi di No. 71, Jalan TPK 2/8. Laman rasmi semasanya menerangkan operasi Puchong sebagai makmal automatik yang menghasilkan kanta reka bentuk freeform serta teknologi kanta untuk pasaran Malaysia.",
    image,
    heroImage: image,
    heroAlt: "Cermin mata Forsee dipamerkan di atas kotak dan risalah Forsee",
    business: forseeLensBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "Teknologi kanta, dibuat di Puchong.", text: "Rangkaian awam Forsee disusun mengikut keperluan pemakai yang berbeza termasuk kategori Above 40, Young Adult dan Kids, dengan produk serta teknologi seperti MYOBOOST PLUS, SmartLife, Blue Defend dan Photoshift. Alamat TPK Park ini juga ialah pangkalan hubungan yang diterbitkan oleh Eyepoint Technology Sdn Bhd.", image, alt: "Cermin mata Forsee dipamerkan di atas kotak dan risalah Forsee", route: "lifestyle", linkLabel: "Terokai Lifestyle" },
      { type: "cards", alignHeadings: true, kicker: "Peranan Forsee", title: "Makmal kanta, bukan kedai optik konvensional.", items: [
        { number: "01", title: "Pengeluaran kanta freeform", text: "Forsee menerangkan operasi Puchong sebagai makmal kanta oftalmik dalaman yang menghasilkan kanta reka bentuk freeform menggunakan teknologi pembuatan automatik." },
        { number: "02", title: "Keperluan pemakai berbeza", text: "Laman produk semasa mengelompokkan penyelesaian kanta untuk pemakai berusia, dewasa muda dan kanak-kanak, bersama keluarga produk dan teknologi kanta yang berbeza." },
        { number: "03", title: "Sahkan urusan pemasangan dan pembelian", text: "Laman Forsee memberi tumpuan kepada teknologi kanta dan kerjasama dengan profesional penjagaan mata, bukan menu perkhidmatan kedai runcit biasa. Hubungi Forsee untuk mengesahkan urusan pemasangan, tempahan atau lawatan." }
      ] },
      { type: "businessVisit", kicker: "Rancang kunjungan", title: "Cari Forsee di No. 71, Jalan TPK 2/8.", text: "Halaman hubungan rasmi Forsee dan maklumat syarikat meletakkan operasi Puchong di No. 71, Jalan TPK 2/8. Laman rasmi semasa tidak menerbitkan waktu operasi tetap, jadi hubungi pasukan sebelum kunjungan yang terikat masa.", addressLabel: "Alamat TPK Park", address,
        contacts: [
          { label: "Pertanyaan umum", value: "+60 3 7800 0373", url: "tel:+60378000373" },
          { label: "WhatsApp", value: "+60 16 205 7917", url: whatsapp },
          { label: "E-mel", value: "cs_forsee@forsee.com.my", url: "mailto:cs_forsee@forsee.com.my" }
        ],
        hours: [{ label: "Waktu operasi", value: "Tidak diterbitkan pada laman rasmi semasa — sahkan terus sebelum berkunjung" }],
        note: "Forsee dipersembahkan secara awam sebagai makmal kanta oftalmik dan perniagaan teknologi. Kesesuaian produk, preskripsi, pemasangan dan tempahan hendaklah dibincangkan dengan Forsee atau profesional penjagaan mata yang sesuai.",
        links: [
          { label: "Lawati laman Forsee Lens", url: website },
          { label: "Gunakan Forsee Lens Selector", url: lensSelector },
          { label: "Terokai MYOBOOST PLUS", url: myoboost },
          { label: "Cari Forsee di Google Maps", url: directions },
          { label: "Hubungi Forsee dalam talian", url: contact }
        ]
      }
    ],
    cta: { title: "Terokai pilihan kanta Forsee.", text: "Gunakan maklumat produk rasmi dan Lens Selector Forsee, atau hubungi pasukan Puchong untuk urusan tempahan dan lawatan semasa.", button: "Lawati Forsee Lens", url: website }
  },
  zh: {
    parentRoute: "lifestyle",
    eyebrow: "Forsee Lens · 眼镜镜片实验室",
    title: "TPK Park里的Forsee Lens。",
    description: "Forsee Lens与Eyepoint Technology位于蒲种TPK Park的Jalan TPK 2/8门牌71号。查看镜片类别、技术、联系方式与导航。",
    lead: "Forsee Lens是位于Jalan TPK 2/8门牌71号的眼镜镜片品牌及内部镜片实验室。其现行官方网站把蒲种业务介绍为自动化镜片实验室，在马来西亚生产freeform自由曲面设计镜片及相关镜片技术。",
    image,
    heroImage: image,
    heroAlt: "Forsee眼镜陈列在Forsee包装盒与宣传册上",
    business: forseeLensBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "镜片技术，落户蒲种。", text: "Forsee现有公开产品按不同佩戴者需要划分，包括Above 40、Young Adult及Kids，并介绍MYOBOOST PLUS、SmartLife、Blue Defend及Photoshift等产品与技术。TPK Park地址也是Eyepoint Technology Sdn Bhd在官网公布的联系地点。", image, alt: "Forsee眼镜陈列在Forsee包装盒与宣传册上", route: "lifestyle", linkLabel: "查看生活品味" },
      { type: "cards", alignHeadings: true, kicker: "Forsee业务", title: "以镜片实验室和技术为核心。", items: [
        { number: "01", title: "Freeform镜片生产", text: "Forsee把蒲种业务介绍为内部眼镜镜片实验室，利用自动化生产技术制作freeform自由曲面设计镜片。" },
        { number: "02", title: "不同佩戴需求", text: "现有产品网站按年长佩戴者、年轻成人及儿童等需要整理镜片方案，并设有不同产品系列与镜片技术。" },
        { number: "03", title: "先确认验配与购买安排", text: "Forsee官网主要介绍镜片技术及与眼科护理专业人士的合作，而不是一般眼镜零售店的服务菜单。如需确认验配、订购或到访安排，请直接联系Forsee。" }
      ] },
      { type: "businessVisit", kicker: "到访安排", title: "Forsee位于Jalan TPK 2/8门牌71号。", text: "Forsee现行官方联系页面及公司资料均把蒲种业务列在Jalan TPK 2/8门牌71号。官网目前没有公布固定营业时间，如行程时间较紧，请先联系团队确认。", addressLabel: "TPK Park地址", address,
        contacts: [
          { label: "一般咨询", value: "+60 3 7800 0373", url: "tel:+60378000373" },
          { label: "WhatsApp", value: "+60 16 205 7917", url: whatsapp },
          { label: "电邮", value: "cs_forsee@forsee.com.my", url: "mailto:cs_forsee@forsee.com.my" }
        ],
        hours: [{ label: "营业时间", value: "现行官网没有公布固定时段，请在到访前直接确认" }],
        note: "Forsee公开定位为眼镜镜片实验室及技术业务。产品适用性、处方、验配与订购应直接向Forsee或合适的眼科护理专业人士查询。",
        links: [
          { label: "浏览Forsee Lens官网", url: website },
          { label: "使用Forsee Lens Selector", url: lensSelector },
          { label: "了解MYOBOOST PLUS", url: myoboost },
          { label: "在Google Maps查找Forsee", url: directions },
          { label: "在线联系Forsee", url: contact }
        ]
      }
    ],
    cta: { title: "了解Forsee镜片选择。", text: "可浏览Forsee官方产品资料及Lens Selector，或直接联系蒲种团队确认目前的订购及到访安排。", button: "浏览Forsee Lens", url: website }
  }
};
