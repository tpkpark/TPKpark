// Source verification and editorial boundaries: docs/jazmina-bistro-profile-sources.md.
const menu = "https://www.foodpanda.my/restaurant/rlie/jazmina-bistro-rlie";
const directions = "https://www.google.com/maps/search/?api=1&query=Jazmina+Bistro+23G+Jalan+TPK+2%2F8+Puchong";
const waze = "https://www.waze.com/ul?q=Jazmina%20Bistro%2023G%20Jalan%20TPK%202%2F8%20Puchong&navigate=yes";
const image = "https://i.imgur.com/Z5h4hmH.jpg";
const address = "23G, Jalan TPK 2/8, Taman Perindustrian Kinrara, Seksyen 2, 47180 Puchong, Selangor";

export const jazminaBistroBusiness = {
  "@type": "Restaurant",
  "@id": "https://www.tpkpark.com/lifestyle/jazmina-bistro/#restaurant",
  name: "Jazmina Bistro",
  hasMenu: menu,
  hasMap: directions,
  address: {
    "@type": "PostalAddress",
    streetAddress: "23G, Jalan TPK 2/8, Taman Perindustrian Kinrara, Seksyen 2",
    addressLocality: "Puchong",
    addressRegion: "Selangor",
    postalCode: "47180",
    addressCountry: "MY"
  },
  containedInPlace: { "@id": "https://www.tpkpark.com/#taman-perindustrian-kinrara" }
};

export const jazminaBistroProfiles = {
  en: {
    parentRoute: "lifestyle",
    eyebrow: "Jazmina Bistro · Everyday dining",
    title: "Jazmina Bistro at TPK Park.",
    description: "Find Jazmina Bistro at 23G, Jalan TPK 2/8, TPK Park, Puchong. Explore its public menu, location and directions for casual everyday dining.",
    lead: "Jazmina Bistro is a casual Indian Muslim restaurant on Jalan TPK 2/8. Its current public menu spans roti and naan, tosai, nasi kandar, nasi lemak, briyani, fried rice and noodles, soups and drinks—an everyday dining option within TPK Park’s Lifestyle cluster.",
    image,
    heroImage: image,
    heroAlt: "Lifestyle and dining setting at TPK Park in Puchong",
    business: jazminaBistroBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "An easy stop for an everyday meal.", text: "Jazmina Bistro suits a quick breakfast, a meal between appointments or a casual sit-down with colleagues and family. The menu covers familiar Malaysian Indian Muslim staples and made-to-order rice and noodle dishes, so visitors can choose anything from roti or tosai to nasi kandar, briyani and tomyam-style dishes.", image, alt: "Lifestyle businesses and visitor setting within TPK Park, Puchong", route: "lifestyle", linkLabel: "Explore Lifestyle" },
      { type: "cards", alignHeadings: true, kicker: "Before you go", title: "Plan the meal around your day.", items: [
        { number: "01", title: "Breakfast & lighter bites", text: "The public menu lists roti canai, tosai, capati, naan and breakfast items. Check the current menu if you are looking for a particular preparation or add-on before travelling." },
        { number: "02", title: "Rice, noodles & cooked dishes", text: "Nasi kandar, nasi lemak, briyani, fried rice, noodles, soups and tomyam-style dishes provide broader meal choices later in the day. Availability and prices can change, so treat third-party menus as a current guide rather than a fixed catalogue." },
        { number: "03", title: "Check current hours", text: "Public directories do not agree on the restaurant’s exact opening hours. Check the current map or ordering listing before making a special trip, particularly late at night, early in the morning or on public holidays." }
      ] },
      { type: "businessVisit", kicker: "Plan your visit", title: "Find Jazmina Bistro on Jalan TPK 2/8.", text: "The restaurant is at ground-floor No. 23G in Seksyen 2. The address is independently listed by MBSJ and current food-delivery directories.", addressLabel: "TPK Park address", address,
        hours: [
          { label: "Opening hours", value: "Check the current listing before travelling" }
        ],
        note: "Opening hours and menu availability can change. Current public sources conflict on the exact operating hours, so TPK Park does not publish an unverified 24-hour claim here.",
        links: [
          { label: "Find Jazmina Bistro on Google Maps", url: directions },
          { label: "Find Jazmina Bistro on Waze", url: waze },
          { label: "View the current public menu", url: menu }
        ]
      }
    ],
    cta: { title: "Plan a meal at Jazmina Bistro.", text: "Check the current menu and opening information, then use the directions to find No. 23G on Jalan TPK 2/8.", button: "View current menu", url: menu }
  },
  ms: {
    parentRoute: "lifestyle",
    eyebrow: "Jazmina Bistro · Sajian harian",
    title: "Jazmina Bistro di TPK Park.",
    description: "Cari Jazmina Bistro di 23G, Jalan TPK 2/8, TPK Park, Puchong. Lihat menu awam, lokasi dan arah perjalanan untuk hidangan santai harian.",
    lead: "Jazmina Bistro ialah restoran India Muslim santai di Jalan TPK 2/8. Menu awam semasanya merangkumi roti dan naan, tosai, nasi kandar, nasi lemak, briyani, nasi dan mi goreng, sup serta minuman—pilihan makan harian dalam kluster Lifestyle TPK Park.",
    image,
    heroImage: image,
    heroAlt: "Suasana lifestyle dan tempat makan di TPK Park, Puchong",
    business: jazminaBistroBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "Persinggahan mudah untuk hidangan harian.", text: "Jazmina Bistro sesuai untuk sarapan ringkas, makan di antara janji temu atau santai bersama rakan sekerja dan keluarga. Menunya merangkumi sajian India Muslim Malaysia yang biasa serta hidangan nasi dan mi yang dimasak apabila dipesan, daripada roti atau tosai hingga nasi kandar, briyani dan hidangan gaya tomyam.", image, alt: "Perniagaan lifestyle dan suasana pengunjung di TPK Park, Puchong", route: "lifestyle", linkLabel: "Terokai Lifestyle" },
      { type: "cards", alignHeadings: true, kicker: "Sebelum berkunjung", title: "Rancang waktu makan mengikut hari anda.", items: [
        { number: "01", title: "Sarapan & hidangan ringan", text: "Menu awam menyenaraikan roti canai, tosai, capati, naan dan pilihan sarapan. Semak menu terkini jika anda mencari penyediaan atau tambahan tertentu sebelum bertolak." },
        { number: "02", title: "Nasi, mi & hidangan panas", text: "Nasi kandar, nasi lemak, briyani, nasi goreng, mi, sup dan hidangan gaya tomyam memberi pilihan lebih luas sepanjang hari. Ketersediaan dan harga boleh berubah, jadi gunakan menu pihak ketiga sebagai panduan semasa dan bukan senarai tetap." },
        { number: "03", title: "Semak waktu semasa", text: "Direktori awam tidak sependapat tentang waktu operasi tepat restoran ini. Semak penyenaraian peta atau pesanan semasa sebelum membuat perjalanan khas, terutama lewat malam, awal pagi atau pada cuti umum." }
      ] },
      { type: "businessVisit", kicker: "Rancang kunjungan", title: "Cari Jazmina Bistro di Jalan TPK 2/8.", text: "Restoran ini terletak di tingkat bawah No. 23G, Seksyen 2. Alamat tersebut disenaraikan secara berasingan oleh MBSJ dan direktori penghantaran makanan semasa.", addressLabel: "Alamat TPK Park", address,
        hours: [
          { label: "Waktu operasi", value: "Semak penyenaraian semasa sebelum bertolak" }
        ],
        note: "Waktu operasi dan ketersediaan menu boleh berubah. Sumber awam semasa berbeza tentang waktu operasi tepat, jadi TPK Park tidak menerbitkan dakwaan 24 jam yang belum disahkan di sini.",
        links: [
          { label: "Cari Jazmina Bistro di Google Maps", url: directions },
          { label: "Cari Jazmina Bistro di Waze", url: waze },
          { label: "Lihat menu awam semasa", url: menu }
        ]
      }
    ],
    cta: { title: "Rancang waktu makan di Jazmina Bistro.", text: "Semak menu dan maklumat operasi semasa, kemudian gunakan arah perjalanan untuk mencari No. 23G di Jalan TPK 2/8.", button: "Lihat menu semasa", url: menu }
  },
  zh: {
    parentRoute: "lifestyle",
    eyebrow: "Jazmina Bistro · 日常餐饮",
    title: "TPK Park里的Jazmina Bistro。",
    description: "Jazmina Bistro位于蒲种TPK Park的Jalan TPK 2/8，23G。查看公开菜单、地址与导航，安排日常用餐。",
    lead: "Jazmina Bistro是一家位于Jalan TPK 2/8的休闲印度穆斯林餐馆。目前公开菜单包括roti与naan、tosai、nasi kandar、nasi lemak、briyani、炒饭炒面、汤类及饮品，为TPK Park生活品味集群提供日常餐饮选择。",
    image,
    heroImage: image,
    heroAlt: "蒲种TPK Park的生活品味与餐饮环境",
    business: jazminaBistroBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "日常用餐，顺路就能停下来。", text: "无论是简单早餐、办事之间吃一顿，或与同事家人轻松用餐，Jazmina Bistro都提供较日常的选择。公开菜单涵盖常见的马来西亚印度穆斯林料理，以及现点现炒的饭面类，从roti、tosai到nasi kandar、briyani和冬炎风味料理都有选择。", image, alt: "蒲种TPK Park内的生活品味商家与访客环境", route: "lifestyle", linkLabel: "查看生活品味" },
      { type: "cards", alignHeadings: true, kicker: "出发之前", title: "把用餐安排进当天行程。", items: [
        { number: "01", title: "早餐与轻食", text: "公开菜单列有roti canai、tosai、capati、naan和早餐选项。如想吃指定做法或配料，出发前可先查看最新菜单。" },
        { number: "02", title: "饭面与热食", text: "nasi kandar、nasi lemak、briyani、炒饭、面食、汤类及冬炎风味料理，提供较完整的正餐选择。供应与价格可能调整，因此第三方菜单适合作为当前参考，而不是固定菜单。" },
        { number: "03", title: "先确认营业时间", text: "不同公开平台对餐厅的准确营业时间资料并不一致。若准备深夜、清晨或公共假期专程前往，建议先查看最新地图或点餐平台资料。" }
      ] },
      { type: "businessVisit", kicker: "到访安排", title: "在Jalan TPK 2/8找到Jazmina Bistro。", text: "餐厅位于Seksyen 2的23G底层单位。MBSJ及现有餐饮外送目录均有独立列出这个地址。", addressLabel: "TPK Park地址", address,
        hours: [
          { label: "营业时间", value: "出发前查看最新公开资料" }
        ],
        note: "营业时间与餐点供应可能调整。目前不同公开来源对准确营业时间资料并不一致，因此TPK Park不在这里把“24小时营业”作为未经核实的固定资料发布。",
        links: [
          { label: "在Google Maps查找Jazmina Bistro", url: directions },
          { label: "使用Waze导航前往Jazmina Bistro", url: waze },
          { label: "查看当前公开菜单", url: menu }
        ]
      }
    ],
    cta: { title: "安排到Jazmina Bistro用餐。", text: "先查看最新菜单与营业资料，再按导航前往Jalan TPK 2/8的23G。", button: "查看当前菜单", url: menu }
  }
};