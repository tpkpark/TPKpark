// Source verification and editorial boundaries: docs/nuarina-profile-sources.md.
const menu = "https://www.foodpanda.my/restaurant/qq2q/nasi-lemak-nuarina-since-2010";
const facebook = "https://m.me/aafiyah2018";
const directions = "https://maps.app.goo.gl/G3W9LGDYd4kUX9qW9";
const waze = "https://www.waze.com/ul?q=Nasi%20Lemak%20Daun%20Pisang%20Nuarina%2041G%20Jalan%20TPK%202%2F8%20Puchong&navigate=yes";
const image = "https://www.tpkpark.com/assets/images/nuarina-puchong-41g.webp";
const address = "41G, Jalan TPK 2/8, Taman Perindustrian Kinrara, 47180 Puchong, Selangor";

export const nuarinaBusiness = {
  "@type": "Restaurant",
  "@id": "https://www.tpkpark.com/lifestyle/nasi-lemak-nuarina/#restaurant",
  name: "Nasi Lemak Daun Pisang Nuarina",
  alternateName: "Nasi Lemak Nuarina Since 2010",
  telephone: "+60122282290",
  hasMenu: menu,
  hasMap: directions,
  address: {
    "@type": "PostalAddress",
    streetAddress: "41G, Jalan TPK 2/8, Taman Perindustrian Kinrara",
    addressLocality: "Puchong",
    addressRegion: "Selangor",
    postalCode: "47180",
    addressCountry: "MY"
  },
  containedInPlace: { "@id": "https://www.tpkpark.com/#taman-perindustrian-kinrara" }
};

export const nuarinaProfiles = {
  en: {
    parentRoute: "lifestyle",
    eyebrow: "Nasi Lemak Daun Pisang Nuarina · Malaysian dining",
    title: "Nasi Lemak Daun Pisang Nuarina at TPK Park.",
    description: "Find Nasi Lemak Daun Pisang Nuarina at 41G, Jalan TPK 2/8, TPK Park, Puchong. See the current menu, phone number and directions.",
    lead: "Nasi Lemak Daun Pisang Nuarina is a Malaysian eatery at No. 41G, Jalan TPK 2/8. Its current public menu centres on nasi lemak, with banana-leaf nasi lemak and a choice of familiar accompaniments and lauk, alongside selected breakfast and lunch dishes.",
    image,
    heroImage: image,
    heroAlt: "Nasi Lemak Daun Pisang Nuarina at 41G, Jalan TPK 2/8, TPK Park, Puchong",
    business: nuarinaBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "Start with the nasi lemak.", text: "The current menu includes nasi lemak wrapped with banana leaf, served with sambal, cucumber, anchovies and egg, as well as versions paired with ayam rendang, kerang, bilis, udang and fried egg. Check the live menu for the day’s available combinations rather than treating any third-party list as permanent.", image, alt: "Nasi Lemak Daun Pisang Nuarina at TPK Park, Puchong", route: "lifestyle", linkLabel: "Explore Lifestyle" },
      { type: "cards", alignHeadings: true, kicker: "On the menu", title: "A straightforward Malaysian meal stop.", items: [
        { number: "01", title: "Banana-leaf nasi lemak", text: "The restaurant’s namesake nasi lemak is listed with coconut rice, sambal, cucumber, anchovies and boiled egg, wrapped with banana leaf." },
        { number: "02", title: "Choose your lauk", text: "Current menu options include rendang, shellfish, anchovies, prawns and fried egg, with availability and prices changing independently of TPK Park." },
        { number: "03", title: "More than one meal", text: "The current delivery menu also lists selected breakfast items, laksa, chicken rice, ayam penyet, lunch sets and drinks, giving visitors options beyond the core nasi lemak range." }
      ] },
      { type: "businessVisit", kicker: "Plan your visit", title: "Find Nuarina at No. 41G.", text: "The restaurant is on the ground floor along Jalan TPK 2/8. Its address and phone number are consistent across the current Google business listing and several public restaurant directories.", addressLabel: "TPK Park address", address,
        contacts: [{ label: "Restaurant enquiries", value: "+60 12 228 2290", url: "tel:+60122282290" }],
        hours: [
          { label: "Monday", value: "Public listings generally show closed" },
          { label: "Tuesday–Sunday", value: "Opens early; published closing times currently differ — confirm before travelling" }
        ],
        note: "Current public listings do not agree on closing times, and delivery hours can differ from dine-in hours. Call the restaurant or check its current listing before making a time-sensitive trip.",
        links: [
          { label: "Find Nuarina on Google Maps", url: directions },
          { label: "Directions on Waze", url: waze },
          { label: "View the current Foodpanda menu", url: menu },
          { label: "Message the restaurant on Facebook Messenger", url: facebook }
        ]
      }
    ],
    cta: { title: "Plan a nasi lemak stop at Nuarina.", text: "Find the restaurant at No. 41G on Jalan TPK 2/8 and check the current menu before you go.", button: "View current menu", url: menu }
  },
  ms: {
    parentRoute: "lifestyle",
    eyebrow: "Nasi Lemak Daun Pisang Nuarina · Sajian Malaysia",
    title: "Nasi Lemak Daun Pisang Nuarina di TPK Park.",
    description: "Cari Nasi Lemak Daun Pisang Nuarina di 41G, Jalan TPK 2/8, TPK Park, Puchong. Lihat menu semasa, nombor telefon dan arah perjalanan.",
    lead: "Nasi Lemak Daun Pisang Nuarina ialah kedai makan Malaysia di No. 41G, Jalan TPK 2/8. Menu awam semasanya berteraskan nasi lemak, termasuk nasi lemak daun pisang dengan pilihan lauk biasa, di samping beberapa hidangan sarapan dan makan tengah hari.",
    image,
    heroImage: image,
    heroAlt: "Nasi Lemak Daun Pisang Nuarina di 41G, Jalan TPK 2/8, TPK Park, Puchong",
    business: nuarinaBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "Mulakan dengan nasi lemak.", text: "Menu semasa menyenaraikan nasi lemak berbungkus daun pisang bersama sambal, timun, ikan bilis dan telur, serta pilihan dengan ayam rendang, kerang, bilis, udang dan telur goreng. Semak menu langsung untuk pilihan yang tersedia pada hari tersebut kerana senarai pihak ketiga boleh berubah.", image, alt: "Nasi Lemak Daun Pisang Nuarina di TPK Park, Puchong", route: "lifestyle", linkLabel: "Terokai Lifestyle" },
      { type: "cards", alignHeadings: true, kicker: "Dalam menu", title: "Persinggahan mudah untuk sajian Malaysia.", items: [
        { number: "01", title: "Nasi lemak daun pisang", text: "Nasi lemak yang menjadi nama restoran disenaraikan bersama nasi bersantan, sambal, timun, ikan bilis dan telur rebus, dibungkus dengan daun pisang." },
        { number: "02", title: "Pilih lauk", text: "Pilihan menu semasa termasuk rendang, kerang, ikan bilis, udang dan telur goreng. Ketersediaan serta harga berubah secara berasingan daripada TPK Park." },
        { number: "03", title: "Bukan nasi lemak sahaja", text: "Menu penghantaran semasa turut menyenaraikan beberapa pilihan sarapan, laksa, nasi ayam, ayam penyet, set makan tengah hari dan minuman." }
      ] },
      { type: "businessVisit", kicker: "Rancang kunjungan", title: "Cari Nuarina di No. 41G.", text: "Restoran ini berada di tingkat bawah di Jalan TPK 2/8. Alamat dan nombor telefonnya adalah konsisten pada penyenaraian Google semasa serta beberapa direktori restoran awam.", addressLabel: "Alamat TPK Park", address,
        contacts: [{ label: "Pertanyaan restoran", value: "+60 12 228 2290", url: "tel:+60122282290" }],
        hours: [
          { label: "Isnin", value: "Penyenaraian awam umumnya menunjukkan tutup" },
          { label: "Selasa–Ahad", value: "Dibuka awal; waktu tutup yang diterbitkan kini berbeza — sahkan sebelum bertolak" }
        ],
        note: "Penyenaraian awam semasa tidak sependapat tentang waktu tutup, dan waktu penghantaran boleh berbeza daripada waktu makan di premis. Telefon restoran atau semak penyenaraian terkini jika masa kunjungan penting.",
        links: [
          { label: "Cari Nuarina di Google Maps", url: directions },
          { label: "Arah melalui Waze", url: waze },
          { label: "Lihat menu Foodpanda semasa", url: menu },
          { label: "Mesej restoran melalui Facebook Messenger", url: facebook }
        ]
      }
    ],
    cta: { title: "Rancang persinggahan nasi lemak di Nuarina.", text: "Cari restoran di No. 41G, Jalan TPK 2/8 dan semak menu semasa sebelum berkunjung.", button: "Lihat menu semasa", url: menu }
  },
  zh: {
    parentRoute: "lifestyle",
    eyebrow: "Nasi Lemak Daun Pisang Nuarina · 马来西亚餐饮",
    title: "TPK Park里的Nasi Lemak Daun Pisang Nuarina。",
    description: "Nasi Lemak Daun Pisang Nuarina位于蒲种TPK Park的Jalan TPK 2/8，41G。查看当前菜单、联系电话与导航。",
    lead: "Nasi Lemak Daun Pisang Nuarina位于Jalan TPK 2/8的41G，是一家马来西亚餐馆。现有公开菜单以椰浆饭为主，包括香蕉叶椰浆饭与多种常见配菜，同时也提供部分早餐及午餐选择。",
    image,
    heroImage: image,
    heroAlt: "蒲种TPK Park Jalan TPK 2/8 41G的Nasi Lemak Daun Pisang Nuarina",
    business: nuarinaBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "先从一份椰浆饭开始。", text: "现有菜单列有香蕉叶包装的椰浆饭，搭配参巴、黄瓜、江鱼仔及鸡蛋，也可选择仁当鸡、蛤蜊、江鱼仔、虾和煎蛋等搭配。每日供应可能调整，因此出发前可查看实时菜单。", image, alt: "蒲种TPK Park的Nasi Lemak Daun Pisang Nuarina", route: "lifestyle", linkLabel: "查看生活品味" },
      { type: "cards", alignHeadings: true, kicker: "菜单选择", title: "简单直接的马来西亚日常餐饮。", items: [
        { number: "01", title: "香蕉叶椰浆饭", text: "同名主打椰浆饭以椰浆米饭、参巴、黄瓜、江鱼仔及水煮蛋为基本搭配，并以香蕉叶包裹。" },
        { number: "02", title: "搭配不同配菜", text: "当前菜单可见仁当、蛤蜊、江鱼仔、虾及煎蛋等选择；供应与价格由餐厅及相关平台自行更新。" },
        { number: "03", title: "不只椰浆饭", text: "现有外送菜单也列有部分早餐、北马叻沙、鸡饭、Ayam Penyet、午餐套餐及饮品。" }
      ] },
      { type: "businessVisit", kicker: "到访安排", title: "在41G找到Nuarina。", text: "餐厅位于Jalan TPK 2/8的底层单位。现有Google商家资料及多个公开餐饮目录对地址与电话号码的记录一致。", addressLabel: "TPK Park店址", address,
        contacts: [{ label: "餐厅咨询", value: "+60 12 228 2290", url: "tel:+60122282290" }],
        hours: [
          { label: "星期一", value: "现有公开资料一般列为休息" },
          { label: "星期二至星期日", value: "较早开门；不同公开来源的打烊时间目前不一致，请出发前确认" }
        ],
        note: "现有公开资料对打烊时间并不一致，而外送时段也可能与堂食营业时间不同。如行程时间较紧，请先致电餐厅或查看最新商家资料。",
        links: [
          { label: "在Google Maps查找Nuarina", url: directions },
          { label: "使用Waze导航", url: waze },
          { label: "查看当前Foodpanda菜单", url: menu },
          { label: "通过Facebook Messenger联系餐厅", url: facebook }
        ]
      }
    ],
    cta: { title: "安排到Nuarina吃一顿椰浆饭。", text: "餐厅位于Jalan TPK 2/8的41G，出发前可先查看当前菜单。", button: "查看当前菜单", url: menu }
  }
};
