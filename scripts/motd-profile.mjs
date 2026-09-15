// Visitor information for the park's MOTD profile. Current menus and bookings live on MOTD's own website.
export const motdBusiness = {
  "@type": "Restaurant",
  "@id": "https://www.motdgroup.com/#restaurant",
  name: "MOTD Bar & Dining",
  url: "https://www.motdgroup.com/",
  telephone: "+60166626951",
  menu: "https://www.motdgroup.com/menu",
  image: "https://www.tpkpark.com/assets/images/motd-entrance-1400.webp",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1, Jalan TPK 2/8, Taman Perindustrian Kinrara",
    addressLocality: "Puchong",
    addressRegion: "Selangor",
    postalCode: "47180",
    addressCountry: "MY"
  },
  containedInPlace: { "@id": "https://www.tpkpark.com/#taman-perindustrian-kinrara" }
};

const image = "https://www.tpkpark.com/assets/images/motd-entrance-1400.webp";

export const motdProfiles = {
  en: {
    parentRoute: "lifestyle",
    eyebrow: "MOTD · Bar & Dining",
    title: "MOTD at TPK Park.",
    description: "Visit MOTD Bar & Dining at TPK Park, Puchong, for Chef Kit’s food, CHAR, drinks and live music. Find the location, free parking and official menus.",
    lead: "A place for a meal, afternoon drinks and live music on Jalan TPK 2/8, within TPK Park’s Lifestyle cluster in Puchong.",
    image,
    business: motdBusiness,
    datePublished: "2026-09-15",
    blocks: [
      { type: "split", title: "Stay for a meal.", text: "A visit to TPK Park can continue around a dining table. At MOTD, Chef Kit’s contemporary cooking brings Malaysian, Chinese and European influences together, alongside yakitori-inspired CHAR grilled over charcoal. The dining room’s industrial materials and Bauhaus-inspired details reflect its setting in the park.", image, alt: "MOTD entrance and sign on Jalan TPK 2/8 at TPK Park" },
      { type: "cards", kicker: "Around your visit", title: "From daytime plans to an evening out.", items: [
        { number: "01", title: "After the showrooms", text: "Meet over a meal after comparing furniture, tiles or kitchens in the Home & Living cluster. Check MOTD’s opening hours when planning your stops." },
        { number: "02", title: "An afternoon stop", text: "Afternoon drinks and CHAR offer another reason to stay in the park after appointments, or to meet colleagues and friends." },
        { number: "03", title: "Return for the music", text: "Live performances take place on selected evenings. Check MOTD’s current programme before planning a night out." }
      ] },
      { type: "businessVisit", kicker: "Plan your stop", title: "Find MOTD in the park.", text: "The entrance is on Jalan TPK 2/8, facing Bukit Jalil Highway. Ample free parking makes it practical to combine dining with other visits around TPK Park.", addressLabel: "Address", address: "1, Jalan TPK 2/8, Taman Perindustrian Kinrara, 47180 Puchong, Selangor", phoneLabel: "MOTD enquiries", phoneDisplay: "+60 16 662 6951", note: "Menus, opening hours, performances and table reservations are managed directly by MOTD. Check its website for current details before travelling.", links: [
        { label: "MOTD menus", url: "https://www.motdgroup.com/menu" },
        { label: "Live music at MOTD", url: "https://www.motdgroup.com/live-house" },
        { label: "Opening hours, directions & reservations", url: "https://www.motdgroup.com/contact-us" }
      ] }
    ],
    cta: { title: "Plan your visit to MOTD.", text: "Explore the restaurant’s food, drinks and music, then contact the MOTD team to arrange your table.", button: "Visit MOTD’s website", url: "https://www.motdgroup.com/" }
  },
  ms: {
    parentRoute: "lifestyle",
    eyebrow: "MOTD · Bar & Dining",
    title: "MOTD di TPK Park.",
    description: "Kunjungi MOTD Bar & Dining di TPK Park, Puchong, untuk hidangan Chef Kit, CHAR, minuman dan muzik secara langsung. Lihat lokasi, parkir percuma dan menu rasmi.",
    lead: "Tempat untuk menjamu selera, menikmati minuman petang dan mendengar muzik secara langsung di Jalan TPK 2/8, dalam kluster Lifestyle TPK Park, Puchong.",
    image,
    business: motdBusiness,
    datePublished: "2026-09-15",
    blocks: [
      { type: "split", title: "Singgah untuk menjamu selera.", text: "Lawatan ke TPK Park boleh diteruskan di meja makan. Di MOTD, masakan kontemporari Chef Kit menggabungkan pengaruh Malaysia, Cina dan Eropah, bersama CHAR berinspirasikan yakitori yang dipanggang di atas arang. Bahan industri dan perincian berinspirasikan Bauhaus menghubungkan ruang makan ini dengan suasana taman.", image, alt: "Pintu masuk dan papan tanda MOTD di Jalan TPK 2/8, TPK Park" },
      { type: "cards", kicker: "Lengkapkan lawatan", title: "Daripada urusan siang ke santai malam.", items: [
        { number: "01", title: "Selepas ke bilik pameran", text: "Bertemu sambil makan selepas membandingkan perabot, jubin atau dapur dalam kluster Home & Living. Semak waktu operasi MOTD semasa merancang persinggahan." },
        { number: "02", title: "Persinggahan petang", text: "Minuman petang dan CHAR melengkapkan lawatan selepas janji temu, atau pertemuan bersama rakan sekerja dan sahabat." },
        { number: "03", title: "Kembali untuk muzik", text: "Persembahan muzik secara langsung berlangsung pada malam terpilih. Semak program terkini MOTD sebelum merancang kunjungan." }
      ] },
      { type: "businessVisit", kicker: "Rancang persinggahan", title: "Cari MOTD di taman ini.", text: "Pintu masuk terletak di Jalan TPK 2/8, menghadap Bukit Jalil Highway. Parkir percuma yang mencukupi memudahkan anda menggabungkan waktu makan dengan lawatan lain di TPK Park.", addressLabel: "Alamat", address: "1, Jalan TPK 2/8, Taman Perindustrian Kinrara, 47180 Puchong, Selangor", phoneLabel: "Pertanyaan MOTD", phoneDisplay: "+60 16 662 6951", note: "Menu, waktu operasi, persembahan dan tempahan meja diurus terus oleh MOTD. Semak butiran terkini di laman webnya sebelum berkunjung. Pautan MOTD di bawah membuka halaman dalam bahasa Inggeris.", links: [
        { label: "Menu MOTD", url: "https://www.motdgroup.com/menu" },
        { label: "Muzik secara langsung di MOTD", url: "https://www.motdgroup.com/live-house" },
        { label: "Waktu operasi, arah & tempahan", url: "https://www.motdgroup.com/contact-us" }
      ] }
    ],
    cta: { title: "Rancang lawatan ke MOTD.", text: "Terokai hidangan, minuman dan muzik, kemudian hubungi pasukan MOTD untuk mengatur tempahan meja.", button: "Laman web MOTD (Inggeris)", url: "https://www.motdgroup.com/" }
  },
  zh: {
    parentRoute: "lifestyle",
    eyebrow: "MOTD · 餐酒馆",
    title: "TPK Park里的MOTD。",
    description: "认识位于蒲种TPK Park的MOTD餐酒馆：Chef Kit料理、CHAR炭烤、酒吧与现场音乐。查看地址、免费停车及官方菜单，规划到访行程。",
    lead: "在蒲种金銮工业园Jalan TPK 2/8用餐、小酌或听现场音乐。MOTD是TPK Park生活品味业态中的餐饮去处。",
    image,
    business: motdBusiness,
    datePublished: "2026-09-15",
    blocks: [
      { type: "split", title: "逛完之后，坐下来吃一顿。", text: "到访TPK Park的行程，也可以在餐桌旁延续。MOTD由Chef Kit主理料理，融合马来西亚、中式与欧洲风味，并提供以日式串烧为灵感的CHAR炭烤。餐厅运用工业材质与包豪斯风格细节，呼应园区的环境。", image, alt: "TPK Park内Jalan TPK 2/8的MOTD入口与招牌" },
      { type: "cards", kicker: "把行程接起来", title: "从白天的安排，到晚上的相聚。", items: [
        { number: "01", title: "看完展厅，再约一餐", text: "在家居生活集群比较家具、瓷砖或厨房设计后，可以到MOTD用餐。安排行程时，请先确认餐厅营业时间。" },
        { number: "02", title: "下午，留一点相聚时间", text: "下午饮品与CHAR炭烤，让办完事后的停留，或与同事、朋友的见面，多一个选择。" },
        { number: "03", title: "晚上，为音乐再来", text: "MOTD在指定晚上安排现场演出。出发前查看最新节目，选择适合自己的音乐之夜。" }
      ] },
      { type: "businessVisit", kicker: "到访安排", title: "在园区找到MOTD。", text: "入口位于Jalan TPK 2/8，面向Bukit Jalil Highway。现场设有充足免费停车位，方便把用餐与TPK Park内的其他行程安排在一起。", addressLabel: "地址", address: "1, Jalan TPK 2/8, Taman Perindustrian Kinrara, 47180 Puchong, Selangor", phoneLabel: "联系MOTD", phoneDisplay: "+60 16 662 6951", note: "菜单、营业时间、演出与订位均由MOTD直接管理。出发前，请在餐厅官网查看最新资料与订位安排。", links: [
        { label: "MOTD菜单", url: "https://www.motdgroup.com/zh/menu" },
        { label: "MOTD现场音乐与演出安排", url: "https://www.motdgroup.com/zh/live-house" },
        { label: "营业时间、路线与订位", url: "https://www.motdgroup.com/zh/contact-us" }
      ] }
    ],
    cta: { title: "安排一次MOTD之约。", text: "在餐厅官网了解料理、饮品与音乐，再与MOTD团队联系订位。", button: "前往MOTD官网", url: "https://www.motdgroup.com/zh" }
  }
};
