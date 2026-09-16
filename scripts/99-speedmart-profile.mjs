// Source verification and editorial boundaries: docs/99-speedmart-profile-sources.md.
const website = "https://99speedmart.com.my/";
const storeLocator = "https://99speedmart.com.my/store-locations/";
const speedpoint = "https://99speedmart.com.my/Speedpoint/";
const directions = "https://www.google.com/maps/search/?api=1&query=99+Speedmart+3116+Taman+Perindustrian+Kinrara&query_place_id=ChIJxUFi-XdLzDER3RV5RcDFcwg";
const image = "https://i.imgur.com/Z5h4hmH.jpg";
const address = "19 & 21 (Ground Floor), Jalan TPK 2/8, Taman Perindustrian Kinrara, Seksyen 2, 47150 Puchong, Selangor";

export const speedmart99Business = {
  "@type": "ConvenienceStore",
  "@id": "https://www.tpkpark.com/lifestyle/99-speedmart/#business",
  name: "99 Speedmart 3116 Taman Perindustrian Kinrara",
  alternateName: "99 Speedmart",
  url: website,
  sameAs: [website, storeLocator],
  hasMap: directions,
  address: {
    "@type": "PostalAddress",
    streetAddress: "19 & 21 (Ground Floor), Jalan TPK 2/8, Taman Perindustrian Kinrara, Seksyen 2",
    addressLocality: "Puchong",
    addressRegion: "Selangor",
    postalCode: "47150",
    addressCountry: "MY"
  },
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "10:00",
    closes: "22:00"
  }],
  contactPoint: [{
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: "+60105000099",
    email: "customer_service@99speedmart.com.my"
  }],
  containedInPlace: { "@id": "https://www.tpkpark.com/#taman-perindustrian-kinrara" }
};

export const speedmart99Profiles = {
  en: {
    parentRoute: "lifestyle",
    eyebrow: "99 Speedmart 3116 · Everyday convenience",
    title: "99 Speedmart at TPK Park.",
    description: "Find 99 Speedmart 3116 at 19 & 21, Jalan TPK 2/8, TPK Park, Puchong for groceries, household essentials and everyday convenience.",
    lead: "99 Speedmart 3116 Taman Perindustrian Kinrara occupies the ground floor at No. 19 & 21, Jalan TPK 2/8. It adds a practical everyday stop to TPK Park’s Lifestyle mix, with the chain’s familiar mini-market format for groceries, drinks, household products, personal care and other daily necessities.",
    image,
    heroImage: image,
    heroAlt: "TPK Park Lifestyle frontage in Puchong, used as contextual imagery for the 99 Speedmart guide",
    business: speedmart99Business,
    datePublished: "2026-09-17",
    blocks: [
      { type: "split", title: "Daily essentials, close at hand.", text: "99 Speedmart describes its stores as neighbourhood mini supermarkets built around convenience and value. Its current website highlights more than 50 categories of household products, while the chain’s Speedpoint service also supports bill payments, prepaid reloads and selected payment services in store.", image, alt: "TPK Park Lifestyle frontage in Puchong", route: "lifestyle", linkLabel: "Explore Lifestyle" },
      { type: "cards", alignHeadings: true, kicker: "What to expect", title: "A straightforward neighbourhood mini-market.", items: [
        { number: "01", title: "Groceries & household", text: "99 Speedmart’s published range covers groceries, food and beverages, household products, personal care, baby care and other daily-use items. Individual stock can vary by outlet." },
        { number: "02", title: "Speedpoint services", text: "99 Speedmart also publishes in-store services for utility bill payments, mobile prepaid and reloads, e-wallet or payment needs and selected gaming or entertainment credits." },
        { number: "03", title: "Open daily", text: "The current branch listing for outlet 3116 publishes daily opening hours of 10am–10pm. Temporary changes can occur, so check the current listing before a time-sensitive trip." }
      ] },
      { type: "businessVisit", kicker: "Plan your visit", title: "Find outlet 3116 at No. 19 & 21.", text: "The current Google business listing and independent branch directories identify this location as 99 Speedmart 3116 Taman Perindustrian Kinrara, occupying two ground-floor shoplots on Jalan TPK 2/8.", addressLabel: "TPK Park address", address,
        contacts: [
          { label: "99 Speedmart customer service", value: "+60 10 500 0099", url: "tel:+60105000099" },
          { label: "Customer service email", value: "customer_service@99speedmart.com.my", url: "mailto:customer_service@99speedmart.com.my" }
        ],
        hours: [{ label: "Monday–Sunday", value: "10am–10pm (current branch listing)" }],
        note: "The public +60 3 3362 6863 number repeated across branch directories is 99 Speedmart’s corporate business line, not a dedicated TPK Park outlet line. Use the official store locator or customer service for current store-specific information.",
        links: [
          { label: "Find outlet 3116 on Google Maps", url: directions },
          { label: "Open 99 Speedmart store locator", url: storeLocator },
          { label: "Visit 99 Speedmart", url: website },
          { label: "See Speedpoint services", url: speedpoint }
        ]
      }
    ],
    cta: { title: "Pick up the everyday essentials.", text: "Check the current 99 Speedmart store listing or browse the official site before you go.", button: "Find a 99 Speedmart", url: storeLocator }
  },
  ms: {
    parentRoute: "lifestyle",
    eyebrow: "99 Speedmart 3116 · Keperluan harian",
    title: "99 Speedmart di TPK Park.",
    description: "Cari 99 Speedmart 3116 di 19 & 21, Jalan TPK 2/8, TPK Park, Puchong untuk barangan runcit, keperluan rumah dan kegunaan harian.",
    lead: "99 Speedmart 3116 Taman Perindustrian Kinrara berada di tingkat bawah No. 19 & 21, Jalan TPK 2/8. Ia menambah kemudahan harian yang praktikal dalam kluster Lifestyle TPK Park, dengan format pasar mini untuk barangan runcit, minuman, keperluan rumah, penjagaan diri dan barangan harian lain.",
    image,
    heroImage: image,
    heroAlt: "Bahagian hadapan kluster Lifestyle TPK Park di Puchong, digunakan sebagai imej konteks untuk panduan 99 Speedmart",
    business: speedmart99Business,
    datePublished: "2026-09-17",
    blocks: [
      { type: "split", title: "Keperluan harian, dekat dan mudah.", text: "99 Speedmart menerangkan rangkaiannya sebagai pasar raya mini kejiranan yang menumpukan kemudahan dan nilai. Laman rasminya kini menampilkan lebih 50 kategori produk isi rumah, manakala perkhidmatan Speedpoint turut menyokong bayaran bil, tambah nilai prabayar dan urusan pembayaran terpilih di kedai.", image, alt: "Bahagian hadapan Lifestyle TPK Park di Puchong", route: "lifestyle", linkLabel: "Terokai Lifestyle" },
      { type: "cards", alignHeadings: true, kicker: "Apa yang tersedia", title: "Pasar mini kejiranan yang praktikal.", items: [
        { number: "01", title: "Barangan runcit & rumah", text: "Rangkaian yang diterbitkan 99 Speedmart merangkumi barangan runcit, makanan dan minuman, produk isi rumah, penjagaan diri, penjagaan bayi serta keperluan harian lain. Stok boleh berbeza mengikut cawangan." },
        { number: "02", title: "Perkhidmatan Speedpoint", text: "99 Speedmart turut menerbitkan perkhidmatan di kedai untuk bayaran bil utiliti, prabayar dan tambah nilai mudah alih, e-dompet atau pembayaran serta kredit hiburan tertentu." },
        { number: "03", title: "Dibuka setiap hari", text: "Penyenaraian cawangan semasa bagi outlet 3116 menerbitkan waktu 10 pagi–10 malam setiap hari. Perubahan sementara boleh berlaku, jadi semak penyenaraian semasa jika masa perjalanan penting." }
      ] },
      { type: "businessVisit", kicker: "Rancang kunjungan", title: "Cari outlet 3116 di No. 19 & 21.", text: "Penyenaraian perniagaan Google semasa dan direktori cawangan bebas mengenal pasti lokasi ini sebagai 99 Speedmart 3116 Taman Perindustrian Kinrara, merangkumi dua lot kedai tingkat bawah di Jalan TPK 2/8.", addressLabel: "Alamat TPK Park", address,
        contacts: [
          { label: "Khidmat pelanggan 99 Speedmart", value: "+60 10 500 0099", url: "tel:+60105000099" },
          { label: "E-mel khidmat pelanggan", value: "customer_service@99speedmart.com.my", url: "mailto:customer_service@99speedmart.com.my" }
        ],
        hours: [{ label: "Isnin–Ahad", value: "10 pagi–10 malam (penyenaraian cawangan semasa)" }],
        note: "Nombor awam +60 3 3362 6863 yang berulang dalam direktori cawangan ialah talian perniagaan korporat 99 Speedmart, bukan talian khusus outlet TPK Park. Gunakan pencari kedai rasmi atau khidmat pelanggan untuk maklumat khusus kedai semasa.",
        links: [
          { label: "Cari outlet 3116 di Google Maps", url: directions },
          { label: "Buka pencari kedai 99 Speedmart", url: storeLocator },
          { label: "Lawati 99 Speedmart", url: website },
          { label: "Lihat perkhidmatan Speedpoint", url: speedpoint }
        ]
      }
    ],
    cta: { title: "Dapatkan keperluan harian.", text: "Semak penyenaraian kedai 99 Speedmart semasa atau laman rasmi sebelum berkunjung.", button: "Cari 99 Speedmart", url: storeLocator }
  },
  zh: {
    parentRoute: "lifestyle",
    eyebrow: "99 Speedmart 3116 · 日常便利",
    title: "TPK Park里的99 Speedmart。",
    description: "99 Speedmart 3116位于蒲种TPK Park的Jalan TPK 2/8门牌19与21号底层，提供杂货、家居用品及日常所需。",
    lead: "99 Speedmart 3116 Taman Perindustrian Kinrara位于Jalan TPK 2/8门牌19及21号底层，为TPK Park的Lifestyle组合提供实用的日常便利。其迷你超市模式涵盖杂货、饮料、家居用品、个人护理及其他日用品。",
    image,
    heroImage: image,
    heroAlt: "蒲种TPK Park生活品味区街景，作为99 Speedmart页面的园区背景图片",
    business: speedmart99Business,
    datePublished: "2026-09-17",
    blocks: [
      { type: "split", title: "日常所需，就在附近。", text: "99 Speedmart把旗下门店定位为兼顾便利与价格的社区迷你超市。现行官网介绍超过50类家居日用品，而Speedpoint店内服务也涵盖账单缴付、手机预付与充值，以及部分电子付款服务。", image, alt: "蒲种TPK Park生活品味区街景", route: "lifestyle", linkLabel: "查看生活品味" },
      { type: "cards", alignHeadings: true, kicker: "门店内容", title: "实用的社区迷你超市。", items: [
        { number: "01", title: "杂货与家居用品", text: "99 Speedmart公开介绍的商品范围包括杂货、食品与饮料、家居用品、个人护理、婴儿护理及其他日用品。各分店实际库存可能不同。" },
        { number: "02", title: "Speedpoint服务", text: "99 Speedmart也提供店内公用事业账单缴付、手机预付与充值、电子钱包或付款，以及部分游戏与娱乐充值服务。" },
        { number: "03", title: "每日营业", text: "3116分店的现行公开商家资料列出每天上午10时至晚上10时。临时调整仍可能发生，如行程时间较紧可先查看最新资料。" }
      ] },
      { type: "businessVisit", kicker: "到访安排", title: "3116分店位于19及21号底层。", text: "现行Google商家资料及独立分店目录均把这里列为99 Speedmart 3116 Taman Perindustrian Kinrara，位于Jalan TPK 2/8的两个底层店面。", addressLabel: "TPK Park地址", address,
        contacts: [
          { label: "99 Speedmart客户服务", value: "+60 10 500 0099", url: "tel:+60105000099" },
          { label: "客户服务电邮", value: "customer_service@99speedmart.com.my", url: "mailto:customer_service@99speedmart.com.my" }
        ],
        hours: [{ label: "星期一至日", value: "上午10时–晚上10时（现行分店资料）" }],
        note: "多个分店目录重复显示的+60 3 3362 6863其实是99 Speedmart企业业务电话，并非TPK Park分店专线。如需最新分店资讯，请使用官方门店查询或客户服务。",
        links: [
          { label: "在Google Maps查找3116分店", url: directions },
          { label: "打开99 Speedmart门店查询", url: storeLocator },
          { label: "浏览99 Speedmart官网", url: website },
          { label: "查看Speedpoint服务", url: speedpoint }
        ]
      }
    ],
    cta: { title: "补充日常所需。", text: "出发前可查看99 Speedmart最新门店资料或官方网站。", button: "查找99 Speedmart", url: storeLocator }
  }
};
