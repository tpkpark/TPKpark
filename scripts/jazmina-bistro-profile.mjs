// Source verification and editorial boundaries: docs/jazmina-bistro-profile-sources.md.
const menu = "https://www.foodpanda.my/restaurant/rlie/jazmina-bistro-rlie";
const directions = "https://www.google.com/maps/search/?api=1&query=Jazmina+Bistro+23G+Jalan+TPK+2%2F8+Puchong";
const waze = "https://www.waze.com/ul?q=Jazmina%20Bistro%2023G%20Jalan%20TPK%202%2F8%20Puchong&navigate=yes";
const image = "https://www.tpkpark.com/assets/images/jazmina-bistro-kinrara-720.webp";
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
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59"
    }
  ],
  containedInPlace: { "@id": "https://www.tpkpark.com/#taman-perindustrian-kinrara" }
};

export const jazminaBistroProfiles = {
  en: {
    parentRoute: "lifestyle",
    eyebrow: "Jazmina Bistro · 24-hour dining",
    title: "Jazmina Bistro at TPK Park.",
    description: "Find Jazmina Bistro at 23G, Jalan TPK 2/8, TPK Park, Puchong. Open 24 hours for casual Indian Muslim dining, with public menu and directions.",
    lead: "Jazmina Bistro is a casual Indian Muslim restaurant on Jalan TPK 2/8, open 24 hours. Its public menu spans roti and naan, tosai, nasi kandar, nasi lemak, briyani, fried rice and noodles, soups and drinks—an everyday dining option within TPK Park’s Lifestyle cluster.",
    image,
    heroImage: image,
    heroAlt: "Jazmina Bistro at 23G, Jalan TPK 2/8, TPK Park, Puchong, with outdoor dining and parked cars",
    business: jazminaBistroBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "An easy stop, at any hour.", text: "Jazmina Bistro suits a quick breakfast, a meal between appointments, a late-night bite or a casual sit-down with colleagues and family. The menu covers familiar Malaysian Indian Muslim staples and made-to-order rice and noodle dishes, from roti or tosai to nasi kandar, briyani and tomyam-style dishes.", image, alt: "Jazmina Bistro storefront and dining area at TPK Park, Puchong", caption: "Jazmina Bistro at No. 23G, Jalan TPK 2/8, TPK Park, Puchong.", route: "lifestyle", linkLabel: "Explore Lifestyle" },
      { type: "cards", alignHeadings: true, kicker: "Around the clock", title: "Choose what suits the moment.", items: [
        { number: "01", title: "Breakfast & lighter bites", text: "The public menu lists roti canai, tosai, capati, naan and breakfast items for a simple start or lighter meal." },
        { number: "02", title: "Rice, noodles & cooked dishes", text: "Nasi kandar, nasi lemak, briyani, fried rice, noodles, soups and tomyam-style dishes provide broader meal choices through the day and night. Availability and prices can change, so treat third-party menus as a current guide rather than a fixed catalogue." },
        { number: "03", title: "Open 24 hours", text: "Jazmina Bistro operates around the clock, making it a practical option for early breakfasts, daytime meals and late-night dining at TPK Park." }
      ] },
      { type: "businessVisit", kicker: "Plan your visit", title: "Find Jazmina Bistro on Jalan TPK 2/8.", text: "The restaurant is at ground-floor No. 23G in Seksyen 2. The address is independently listed by MBSJ and current food-delivery directories.", addressLabel: "TPK Park address", address,
        hours: [
          { label: "Daily", value: "Open 24 hours" }
        ],
        note: "Jazmina Bistro’s 24-hour opening is confirmed by TPK Park management. Temporary closures or special arrangements may still apply from time to time.",
        links: [
          { label: "Find Jazmina Bistro on Google Maps", url: directions },
          { label: "Find Jazmina Bistro on Waze", url: waze },
          { label: "View the current public menu", url: menu }
        ]
      }
    ],
    cta: { title: "Plan a meal at Jazmina Bistro.", text: "Open 24 hours at No. 23G on Jalan TPK 2/8, with an extensive everyday menu for different times of day.", button: "View current menu", url: menu }
  },
  ms: {
    parentRoute: "lifestyle",
    eyebrow: "Jazmina Bistro · Makan 24 jam",
    title: "Jazmina Bistro di TPK Park.",
    description: "Cari Jazmina Bistro di 23G, Jalan TPK 2/8, TPK Park, Puchong. Dibuka 24 jam untuk hidangan India Muslim santai, dengan menu awam dan arah perjalanan.",
    lead: "Jazmina Bistro ialah restoran India Muslim santai di Jalan TPK 2/8 yang dibuka 24 jam. Menu awamnya merangkumi roti dan naan, tosai, nasi kandar, nasi lemak, briyani, nasi dan mi goreng, sup serta minuman—pilihan makan harian dalam kluster Lifestyle TPK Park.",
    image,
    heroImage: image,
    heroAlt: "Jazmina Bistro di 23G, Jalan TPK 2/8, TPK Park, Puchong, dengan ruang makan luar dan kenderaan di hadapan",
    business: jazminaBistroBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "Mudah singgah, pada bila-bila masa.", text: "Jazmina Bistro sesuai untuk sarapan ringkas, makan di antara janji temu, hidangan lewat malam atau santai bersama rakan sekerja dan keluarga. Menunya merangkumi sajian India Muslim Malaysia yang biasa serta hidangan nasi dan mi yang dimasak apabila dipesan, daripada roti atau tosai hingga nasi kandar, briyani dan hidangan gaya tomyam.", image, alt: "Bahagian hadapan dan ruang makan Jazmina Bistro di TPK Park, Puchong", caption: "Jazmina Bistro di No. 23G, Jalan TPK 2/8, TPK Park, Puchong.", route: "lifestyle", linkLabel: "Terokai Lifestyle" },
      { type: "cards", alignHeadings: true, kicker: "Sepanjang masa", title: "Pilih mengikut waktu dan selera.", items: [
        { number: "01", title: "Sarapan & hidangan ringan", text: "Menu awam menyenaraikan roti canai, tosai, capati, naan dan pilihan sarapan untuk permulaan hari atau hidangan lebih ringan." },
        { number: "02", title: "Nasi, mi & hidangan panas", text: "Nasi kandar, nasi lemak, briyani, nasi goreng, mi, sup dan hidangan gaya tomyam memberi pilihan lebih luas siang dan malam. Ketersediaan dan harga boleh berubah, jadi gunakan menu pihak ketiga sebagai panduan semasa dan bukan senarai tetap." },
        { number: "03", title: "Dibuka 24 jam", text: "Jazmina Bistro beroperasi sepanjang masa, sesuai untuk sarapan awal, makan tengah hari atau malam, serta hidangan lewat malam di TPK Park." }
      ] },
      { type: "businessVisit", kicker: "Rancang kunjungan", title: "Cari Jazmina Bistro di Jalan TPK 2/8.", text: "Restoran ini terletak di tingkat bawah No. 23G, Seksyen 2. Alamat tersebut disenaraikan secara berasingan oleh MBSJ dan direktori penghantaran makanan semasa.", addressLabel: "Alamat TPK Park", address,
        hours: [
          { label: "Setiap hari", value: "Dibuka 24 jam" }
        ],
        note: "Operasi 24 jam Jazmina Bistro disahkan oleh pengurusan TPK Park. Penutupan sementara atau pengaturan khas masih boleh berlaku dari semasa ke semasa.",
        links: [
          { label: "Cari Jazmina Bistro di Google Maps", url: directions },
          { label: "Cari Jazmina Bistro di Waze", url: waze },
          { label: "Lihat menu awam semasa", url: menu }
        ]
      }
    ],
    cta: { title: "Rancang waktu makan di Jazmina Bistro.", text: "Dibuka 24 jam di No. 23G, Jalan TPK 2/8, dengan menu harian yang luas untuk pelbagai waktu.", button: "Lihat menu semasa", url: menu }
  },
  zh: {
    parentRoute: "lifestyle",
    eyebrow: "Jazmina Bistro · 24小时餐饮",
    title: "TPK Park里的Jazmina Bistro。",
    description: "Jazmina Bistro位于蒲种TPK Park的Jalan TPK 2/8，23G，24小时营业。查看公开菜单、地址与导航，安排印度穆斯林风味日常用餐。",
    lead: "Jazmina Bistro是一家位于Jalan TPK 2/8、24小时营业的休闲印度穆斯林餐馆。公开菜单包括roti与naan、tosai、nasi kandar、nasi lemak、briyani、炒饭炒面、汤类及饮品，为TPK Park生活品味集群提供全天候日常餐饮选择。",
    image,
    heroImage: image,
    heroAlt: "蒲种TPK Park Jalan TPK 2/8 23G的Jazmina Bistro，店外设有用餐区并可见停泊车辆",
    business: jazminaBistroBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "任何时候，都可以顺路吃一顿。", text: "无论是简单早餐、办事之间吃一顿、深夜想吃点东西，或与同事家人轻松用餐，Jazmina Bistro都提供较日常的选择。公开菜单涵盖常见的马来西亚印度穆斯林料理，以及现点现炒的饭面类，从roti、tosai到nasi kandar、briyani和冬炎风味料理都有选择。", image, alt: "蒲种TPK Park的Jazmina Bistro店面与用餐区", caption: "Jazmina Bistro位于蒲种TPK Park的Jalan TPK 2/8，23G。", route: "lifestyle", linkLabel: "查看生活品味" },
      { type: "cards", alignHeadings: true, kicker: "全天候", title: "按时间与口味选择。", items: [
        { number: "01", title: "早餐与轻食", text: "公开菜单列有roti canai、tosai、capati、naan和早餐选项，适合简单开始一天或较轻便的一餐。" },
        { number: "02", title: "饭面与热食", text: "nasi kandar、nasi lemak、briyani、炒饭、面食、汤类及冬炎风味料理，提供从白天到深夜的正餐选择。供应与价格可能调整，因此第三方菜单适合作为当前参考，而不是固定菜单。" },
        { number: "03", title: "24小时营业", text: "Jazmina Bistro全天候营业，无论是早早餐、日常正餐或深夜用餐，在TPK Park都多一个方便选择。" }
      ] },
      { type: "businessVisit", kicker: "到访安排", title: "在Jalan TPK 2/8找到Jazmina Bistro。", text: "餐厅位于Seksyen 2的23G底层单位。MBSJ及现有餐饮外送目录均有独立列出这个地址。", addressLabel: "TPK Park地址", address,
        hours: [
          { label: "每日", value: "24小时营业" }
        ],
        note: "Jazmina Bistro的24小时营业时间已由TPK Park管理方确认。临时休业或特别安排仍可能偶尔出现。",
        links: [
          { label: "在Google Maps查找Jazmina Bistro", url: directions },
          { label: "使用Waze导航前往Jazmina Bistro", url: waze },
          { label: "查看当前公开菜单", url: menu }
        ]
      }
    ],
    cta: { title: "安排到Jazmina Bistro用餐。", text: "Jalan TPK 2/8的23G，24小时营业，从早餐到深夜都有日常餐饮选择。", button: "查看当前菜单", url: menu }
  }
};