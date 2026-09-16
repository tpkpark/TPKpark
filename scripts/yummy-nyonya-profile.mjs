// Source verification and editorial boundaries: docs/yummy-nyonya-profile-sources.md.
const directions = "https://www.google.com/maps/search/?api=1&query=Yummy+Nyonya+Kitchen+43G+Jalan+TPK+2%2F8+Puchong";
const waze = "https://www.waze.com/live-map/directions/yummy-nyonya-kitchen-jalan-tpk-28-puchong?to=place.w.66584606.666108209.5814230";
const image = "https://i.imgur.com/Z5h4hmH.jpg";
const address = "43G, Jalan TPK 2/8, Taman Perindustrian Kinrara, 47180 Puchong, Selangor";

export const yummyNyonyaBusiness = {
  "@type": "Restaurant",
  "@id": "https://www.tpkpark.com/lifestyle/yummy-nyonya-kitchen/#restaurant",
  name: "Yummy Nyonya Kitchen",
  telephone: "+601111631126",
  hasMap: directions,
  address: {
    "@type": "PostalAddress",
    streetAddress: "43G, Jalan TPK 2/8, Taman Perindustrian Kinrara",
    addressLocality: "Puchong",
    addressRegion: "Selangor",
    postalCode: "47180",
    addressCountry: "MY"
  },
  contactPoint: [
    { "@type": "ContactPoint", contactType: "restaurant enquiries", telephone: "+601111631126" },
    { "@type": "ContactPoint", contactType: "alternate public line", telephone: "+60108912102" }
  ],
  containedInPlace: { "@id": "https://www.tpkpark.com/#taman-perindustrian-kinrara" }
};

export const yummyNyonyaProfiles = {
  en: {
    parentRoute: "lifestyle",
    eyebrow: "Yummy Nyonya Kitchen · Daytime dining",
    title: "Yummy Nyonya Kitchen at TPK Park.",
    description: "Find Yummy Nyonya Kitchen at 43G, Jalan TPK 2/8, TPK Park, Puchong. See public contact numbers, directions and practical visit guidance.",
    lead: "Yummy Nyonya Kitchen is a daytime restaurant at No. 43G, Jalan TPK 2/8, serving the TPK Park community from the Lifestyle cluster. Public listings describe it as a restaurant associated with breakfast and brunch, while the business name positions its cooking around Nyonya-style Malaysian food.",
    image,
    heroImage: image,
    heroAlt: "TPK Park Lifestyle frontage in Puchong, used as contextual imagery for the Yummy Nyonya Kitchen guide",
    business: yummyNyonyaBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "A daytime Nyonya stop.", text: "Yummy Nyonya Kitchen is set up for a practical daytime meal, whether you are starting early, taking a break between appointments or stopping for lunch. Current public directories categorise it under restaurants and breakfast or brunch. Menu choices can change, so call ahead if you are looking for a particular dish.", image, alt: "Lifestyle frontage at TPK Park in Puchong", route: "lifestyle", linkLabel: "Explore Lifestyle" },
      { type: "cards", alignHeadings: true, kicker: "Plan your meal", title: "Keep the visit simple.", items: [
        { number: "01", title: "Breakfast & brunch", text: "Current business directories place Yummy Nyonya Kitchen in the restaurant and breakfast or brunch categories, making it a natural daytime dining option within the park." },
        { number: "02", title: "Nyonya-style local cooking", text: "The restaurant trades as Yummy Nyonya Kitchen. For a particular Nyonya dish, daily special or takeaway request, check directly with the restaurant rather than relying on an old third-party menu." },
        { number: "03", title: "Confirm the timing", text: "Public listings agree that the restaurant is primarily a daytime operation and generally list Sunday as closed, but their exact Monday–Saturday opening and closing times differ. Confirm before a time-sensitive trip." }
      ] },
      { type: "businessVisit", kicker: "Plan your visit", title: "Find Yummy Nyonya Kitchen at No. 43G.", text: "The strongest location evidence places the restaurant at No. 43G on Jalan TPK 2/8. A payment-merchant record identifies 43G, Jalan TPK 2/8, while Waze independently places Yummy Nyonya Kitchen on Jalan TPK 2/8. Some older directories incorrectly show Jalan TPK 2/7.", addressLabel: "TPK Park address", address,
        contacts: [
          { label: "Restaurant enquiries", value: "+60 11 1163 1126", url: "tel:+601111631126" },
          { label: "Alternate public line", value: "+60 10 891 2102", url: "tel:+60108912102" }
        ],
        hours: [
          { label: "Monday–Saturday", value: "Daytime opening; exact published hours currently differ — confirm before travelling" },
          { label: "Sunday", value: "Public listings generally show closed" }
        ],
        note: "Exact operating times are not encoded into the Restaurant schema because current public listings conflict. Call the restaurant before a time-sensitive visit.",
        links: [
          { label: "Find Yummy Nyonya Kitchen on Google Maps", url: directions },
          { label: "Directions on Waze", url: waze }
        ]
      }
    ],
    cta: { title: "Plan a daytime meal at Yummy Nyonya Kitchen.", text: "Call the restaurant to confirm today’s operating time or ask about a particular dish before you go.", button: "Call Yummy Nyonya Kitchen", url: "tel:+601111631126" }
  },
  ms: {
    parentRoute: "lifestyle",
    eyebrow: "Yummy Nyonya Kitchen · Makan siang",
    title: "Yummy Nyonya Kitchen di TPK Park.",
    description: "Cari Yummy Nyonya Kitchen di 43G, Jalan TPK 2/8, TPK Park, Puchong. Lihat nombor hubungan awam, arah perjalanan dan panduan kunjungan.",
    lead: "Yummy Nyonya Kitchen ialah restoran waktu siang di No. 43G, Jalan TPK 2/8, dalam kluster Lifestyle TPK Park. Penyenaraian awam mengkategorikannya sebagai restoran yang berkaitan dengan sarapan dan brunch, manakala nama perniagaannya menampilkan sajian Malaysia gaya Nyonya.",
    image,
    heroImage: image,
    heroAlt: "Bahagian hadapan kluster Lifestyle TPK Park di Puchong, digunakan sebagai imej konteks untuk panduan Yummy Nyonya Kitchen",
    business: yummyNyonyaBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "Persinggahan Nyonya pada waktu siang.", text: "Yummy Nyonya Kitchen sesuai untuk hidangan praktikal pada waktu siang, sama ada memulakan hari lebih awal, berehat di antara urusan atau singgah makan tengah hari. Direktori awam semasa mengkategorikannya di bawah restoran serta sarapan atau brunch. Pilihan menu boleh berubah, jadi telefon dahulu jika anda mencari hidangan tertentu.", image, alt: "Bahagian hadapan Lifestyle TPK Park di Puchong", route: "lifestyle", linkLabel: "Terokai Lifestyle" },
      { type: "cards", alignHeadings: true, kicker: "Rancang waktu makan", title: "Pastikan kunjungan ringkas dan mudah.", items: [
        { number: "01", title: "Sarapan & brunch", text: "Direktori perniagaan semasa meletakkan Yummy Nyonya Kitchen dalam kategori restoran serta sarapan atau brunch, sesuai sebagai pilihan makan waktu siang di taman ini." },
        { number: "02", title: "Masakan tempatan gaya Nyonya", text: "Restoran ini beroperasi dengan nama Yummy Nyonya Kitchen. Untuk hidangan Nyonya tertentu, hidangan harian atau permintaan bungkus, semak terus dengan restoran dan bukan bergantung pada menu pihak ketiga yang lama." },
        { number: "03", title: "Sahkan waktu", text: "Penyenaraian awam bersetuju bahawa restoran ini terutama beroperasi pada waktu siang dan lazimnya menyenaraikan Ahad sebagai tutup, tetapi waktu tepat Isnin–Sabtu berbeza antara sumber. Sahkan sebelum kunjungan yang terikat masa." }
      ] },
      { type: "businessVisit", kicker: "Rancang kunjungan", title: "Cari Yummy Nyonya Kitchen di No. 43G.", text: "Bukti lokasi paling kukuh meletakkan restoran di No. 43G, Jalan TPK 2/8. Rekod peniaga pembayaran menyenaraikan 43G, Jalan TPK 2/8, manakala Waze secara berasingan meletakkan Yummy Nyonya Kitchen di Jalan TPK 2/8. Beberapa direktori lama tersilap menyatakan Jalan TPK 2/7.", addressLabel: "Alamat TPK Park", address,
        contacts: [
          { label: "Pertanyaan restoran", value: "+60 11 1163 1126", url: "tel:+601111631126" },
          { label: "Talian awam alternatif", value: "+60 10 891 2102", url: "tel:+60108912102" }
        ],
        hours: [
          { label: "Isnin–Sabtu", value: "Beroperasi waktu siang; waktu tepat yang diterbitkan kini berbeza — sahkan sebelum bertolak" },
          { label: "Ahad", value: "Penyenaraian awam umumnya menunjukkan tutup" }
        ],
        note: "Waktu operasi tepat tidak dimasukkan ke dalam skema Restaurant kerana sumber awam semasa bercanggah. Telefon restoran sebelum kunjungan yang terikat masa.",
        links: [
          { label: "Cari Yummy Nyonya Kitchen di Google Maps", url: directions },
          { label: "Arah melalui Waze", url: waze }
        ]
      }
    ],
    cta: { title: "Rancang makan siang di Yummy Nyonya Kitchen.", text: "Telefon restoran untuk mengesahkan waktu operasi hari ini atau bertanya tentang hidangan tertentu sebelum berkunjung.", button: "Telefon Yummy Nyonya Kitchen", url: "tel:+601111631126" }
  },
  zh: {
    parentRoute: "lifestyle",
    eyebrow: "Yummy Nyonya Kitchen · 日间餐饮",
    title: "TPK Park里的Yummy Nyonya Kitchen。",
    description: "Yummy Nyonya Kitchen位于蒲种TPK Park的Jalan TPK 2/8，43G。查看公开联系电话、导航与到访建议。",
    lead: "Yummy Nyonya Kitchen位于Jalan TPK 2/8的43G，是TPK Park生活品味集群内的日间餐馆。现有公开资料将其归入餐厅及早餐或早午餐类别，而店名本身则以娘惹风味的马来西亚料理为定位。",
    image,
    heroImage: image,
    heroAlt: "蒲种TPK Park生活品味区的街景，作为Yummy Nyonya Kitchen页面的园区背景图片",
    business: yummyNyonyaBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "白天，来一顿娘惹风味。", text: "Yummy Nyonya Kitchen适合安排一顿简单的日间餐饮，无论是较早开始一天、办事之间休息，或中午顺路吃一顿。现有公开目录把它归类为餐厅及早餐或早午餐。每日菜色可能调整，如想吃特定料理，出发前直接致电餐厅会较稳妥。", image, alt: "蒲种TPK Park生活品味区街景", route: "lifestyle", linkLabel: "查看生活品味" },
      { type: "cards", alignHeadings: true, kicker: "用餐安排", title: "简单安排一趟日间用餐。", items: [
        { number: "01", title: "早餐与早午餐", text: "现有商业目录把Yummy Nyonya Kitchen列在餐厅及早餐或早午餐类别，适合作为园区内的日间餐饮选择。" },
        { number: "02", title: "娘惹风味本地料理", text: "餐厅以Yummy Nyonya Kitchen为店名。若想确认某一道娘惹菜、当日菜色或外带安排，请直接向餐厅查询，不宜依赖旧的第三方菜单。" },
        { number: "03", title: "先确认营业时间", text: "公开资料一致显示餐厅主要在日间营业，并普遍把星期日列为休息；但星期一至六的具体开门及打烊时间并不一致。若行程时间较紧，请先确认。" }
      ] },
      { type: "businessVisit", kicker: "到访安排", title: "在43G找到Yummy Nyonya Kitchen。", text: "目前最有力的地点资料指向Jalan TPK 2/8的43G。支付商户记录列出43G、Jalan TPK 2/8，而Waze也独立把Yummy Nyonya Kitchen定位在Jalan TPK 2/8。部分较旧的目录则误写为Jalan TPK 2/7。", addressLabel: "TPK Park店址", address,
        contacts: [
          { label: "餐厅咨询", value: "+60 11 1163 1126", url: "tel:+601111631126" },
          { label: "另一个公开号码", value: "+60 10 891 2102", url: "tel:+60108912102" }
        ],
        hours: [
          { label: "星期一至星期六", value: "日间营业；现有公开资料的具体时间不一致，请出发前确认" },
          { label: "星期日", value: "公开资料一般列为休息" }
        ],
        note: "由于现有公开来源对具体营业时间有冲突，页面没有把未经确认的时段写入Restaurant结构化资料。若行程时间较紧，请先致电餐厅。",
        links: [
          { label: "在Google Maps查找Yummy Nyonya Kitchen", url: directions },
          { label: "使用Waze导航", url: waze }
        ]
      }
    ],
    cta: { title: "安排到Yummy Nyonya Kitchen吃一顿。", text: "出发前可致电餐厅确认当天营业时间，或询问是否供应你想吃的菜色。", button: "致电Yummy Nyonya Kitchen", url: "tel:+601111631126" }
  }
};
