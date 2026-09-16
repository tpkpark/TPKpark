// Source verification and editorial boundaries: docs/optimum-swim-school-profile-sources.md.
const website = "https://optimumswimschool.com/";
const trial = "https://optimumswimschool.com/free-trial/";
const learnToSwim = "https://optimumswimschool.com/learn-to-swim/";
const lifesaving = "https://optimumswimschool.com/water-lifesaving/";
const directions = "https://www.google.com/maps/search/?api=1&query=Optimum+Swim+School+Puchong+Kinrara+2+Jalan+TPK+2%2F2+Puchong";
const waze = "https://www.waze.com/live-map/directions/my/selangor/puchong/optimum-swim-school-%40-puchong-kinrara-%28learn-to-swim-for-kids-and-adults%29?to=place.ChIJ1XiPLEdLzDER-U3WYmrZsdI";
const image = "https://www.tpkpark.com/assets/images/optimum-swim-school-puchong-kinrara.webp";
const address = "2, Jalan TPK 2/2, Taman Perindustrian Kinrara, 47100 Puchong, Selangor";

export const optimumSwimSchoolBusiness = {
  "@type": "SportsActivityLocation",
  "@id": "https://www.tpkpark.com/lifestyle/optimum-swim-school/#swim-school",
  name: "Optimum Swim School @ Puchong Kinrara",
  url: website,
  telephone: "+60192848138",
  image,
  hasMap: waze,
  address: {
    "@type": "PostalAddress",
    streetAddress: "2, Jalan TPK 2/2, Taman Perindustrian Kinrara",
    addressLocality: "Puchong",
    addressRegion: "Selangor",
    postalCode: "47100",
    addressCountry: "MY"
  },
  contactPoint: [
    { "@type": "ContactPoint", contactType: "Puchong Kinrara enquiries", telephone: "+60192848138" },
    { "@type": "ContactPoint", contactType: "alternate branch line", telephone: "+60134808138" }
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "16:00",
      closes: "21:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "08:00",
      closes: "19:00"
    }
  ],
  containedInPlace: { "@id": "https://www.tpkpark.com/#taman-perindustrian-kinrara" }
};

export const optimumSwimSchoolProfiles = {
  en: {
    parentRoute: "lifestyle",
    eyebrow: "Optimum Swim School · Indoor heated swimming",
    title: "Optimum Swim School Puchong Kinrara at TPK Park.",
    description: "Find Optimum Swim School Puchong Kinrara at 2, Jalan TPK 2/2, TPK Park, Puchong. Explore swimming programmes, free trials, hours and directions.",
    lead: "Optimum Swim School’s Puchong Kinrara centre is at No. 2, Jalan TPK 2/2. The school operates an indoor heated swimming facility and offers structured programmes ranging from young-swimmer water familiarisation to learn-to-swim, water-lifesaving and competitive or pre-competitive pathways.",
    image,
    heroImage: image,
    heroAlt: "Optimum Swim School Puchong Kinrara facility at 2, Jalan TPK 2/2, TPK Park, Puchong",
    business: optimumSwimSchoolBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "Build confidence in the water.", text: "The Puchong Kinrara branch gives children and adults an all-weather place to learn in an indoor heated pool. Optimum’s current programme pathway starts with Young Swimmer for ages 3–5, moves into Learn to Swim from age 6 and adults, and extends to lifesaving and competitive or pre-competitive training for suitable swimmers.", image, alt: "Optimum Swim School Puchong Kinrara indoor swimming facility at TPK Park", route: "lifestyle", linkLabel: "Explore Lifestyle" },
      { type: "cards", alignHeadings: true, kicker: "Swimming pathways", title: "From first confidence to stronger technique.", items: [
        { number: "01", title: "Young Swimmer · ages 3–5", text: "A water-familiarisation pathway designed to help younger children become comfortable and confident in the pool under guided instruction." },
        { number: "02", title: "Learn to Swim · age 6+ & adults", text: "The current programme uses a structured nine-level evaluation pathway covering water safety, foundational skills, freestyle, backstroke, butterfly, endurance and progression toward advanced technique." },
        { number: "03", title: "Lifesaving & performance pathways", text: "From age 7, Optimum also publishes water-lifesaving and competitive or pre-competitive pathways. Entry requirements and class suitability should be confirmed directly with the school." }
      ] },
      { type: "businessVisit", kicker: "Plan your visit", title: "Find Optimum Swim School on Jalan TPK 2/2.", text: "The Puchong Kinrara centre is at No. 2, Jalan TPK 2/2. Optimum’s official branch page, its current Google business listing and Waze all identify the same TPK Park location.", addressLabel: "TPK Park address", address,
        contacts: [
          { label: "Puchong Kinrara enquiries", value: "+60 19 284 8138", url: "tel:+60192848138" },
          { label: "Alternate branch line", value: "+60 13 480 8138", url: "tel:+60134808138" }
        ],
        hours: [
          { label: "Monday", value: "Closed" },
          { label: "Tuesday–Friday", value: "4pm–9pm" },
          { label: "Saturday–Sunday", value: "8am–7pm" }
        ],
        note: "Class schedules, programme availability and trial slots are managed by Optimum Swim School. Confirm the preferred class and centre before travelling.",
        links: [
          { label: "Visit Optimum Swim School", url: website },
          { label: "Claim a free trial", url: trial },
          { label: "Learn-to-swim programme", url: learnToSwim },
          { label: "Water-lifesaving programme", url: lifesaving },
          { label: "Find the centre on Google Maps", url: directions },
          { label: "Directions on Waze", url: waze }
        ]
      }
    ],
    cta: { title: "Try a lesson at Optimum Swim School.", text: "Choose Puchong Kinrara when registering for Optimum’s current free-trial programme.", button: "Claim a free trial", url: trial }
  },
  ms: {
    parentRoute: "lifestyle",
    eyebrow: "Optimum Swim School · Renang dalam kolam dipanaskan",
    title: "Optimum Swim School Puchong Kinrara di TPK Park.",
    description: "Cari Optimum Swim School Puchong Kinrara di 2, Jalan TPK 2/2, TPK Park, Puchong. Lihat program renang, percubaan percuma, waktu dan arah perjalanan.",
    lead: "Pusat Optimum Swim School Puchong Kinrara terletak di No. 2, Jalan TPK 2/2. Sekolah ini menggunakan kemudahan kolam renang dalaman yang dipanaskan dan menawarkan program berstruktur daripada pengenalan air untuk kanak-kanak kecil kepada Learn to Swim, penyelamatan air serta laluan kompetitif dan pra-kompetitif.",
    image,
    heroImage: image,
    heroAlt: "Kemudahan Optimum Swim School Puchong Kinrara di 2, Jalan TPK 2/2, TPK Park, Puchong",
    business: optimumSwimSchoolBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "Bina keyakinan di dalam air.", text: "Cawangan Puchong Kinrara menyediakan tempat belajar sepanjang cuaca untuk kanak-kanak dan orang dewasa dalam kolam renang dalaman yang dipanaskan. Laluan program semasa Optimum bermula dengan Young Swimmer bagi umur 3–5 tahun, diteruskan dengan Learn to Swim dari umur 6 tahun dan dewasa, serta merangkumi penyelamatan air dan latihan kompetitif atau pra-kompetitif untuk perenang yang sesuai.", image, alt: "Kemudahan renang dalaman Optimum Swim School Puchong Kinrara di TPK Park", route: "lifestyle", linkLabel: "Terokai Lifestyle" },
      { type: "cards", alignHeadings: true, kicker: "Laluan renang", title: "Daripada keyakinan awal kepada teknik yang lebih kukuh.", items: [
        { number: "01", title: "Young Swimmer · umur 3–5", text: "Laluan pengenalan air untuk membantu kanak-kanak kecil menjadi lebih selesa dan yakin di kolam melalui bimbingan jurulatih." },
        { number: "02", title: "Learn to Swim · umur 6+ & dewasa", text: "Program semasa menggunakan penilaian sembilan tahap yang meliputi keselamatan air, kemahiran asas, gaya bebas, kuak lentang, kupu-kupu, daya tahan dan kemajuan ke teknik yang lebih tinggi." },
        { number: "03", title: "Penyelamatan & laluan prestasi", text: "Mulai umur 7 tahun, Optimum turut menerbitkan laluan penyelamatan air serta kompetitif atau pra-kompetitif. Syarat kemasukan dan kesesuaian kelas perlu disahkan terus dengan sekolah." }
      ] },
      { type: "businessVisit", kicker: "Rancang kunjungan", title: "Cari Optimum Swim School di Jalan TPK 2/2.", text: "Pusat Puchong Kinrara berada di No. 2, Jalan TPK 2/2. Halaman cawangan rasmi Optimum, penyenaraian Google semasa dan Waze semuanya mengenal pasti lokasi TPK Park yang sama.", addressLabel: "Alamat TPK Park", address,
        contacts: [
          { label: "Pertanyaan Puchong Kinrara", value: "+60 19 284 8138", url: "tel:+60192848138" },
          { label: "Talian cawangan alternatif", value: "+60 13 480 8138", url: "tel:+60134808138" }
        ],
        hours: [
          { label: "Isnin", value: "Tutup" },
          { label: "Selasa–Jumaat", value: "4 petang–9 malam" },
          { label: "Sabtu–Ahad", value: "8 pagi–7 malam" }
        ],
        note: "Jadual kelas, ketersediaan program dan slot percubaan diurus oleh Optimum Swim School. Sahkan kelas dan pusat pilihan sebelum berkunjung.",
        links: [
          { label: "Lawati Optimum Swim School", url: website },
          { label: "Mohon percubaan percuma", url: trial },
          { label: "Program Learn to Swim", url: learnToSwim },
          { label: "Program penyelamatan air", url: lifesaving },
          { label: "Cari pusat di Google Maps", url: directions },
          { label: "Arah melalui Waze", url: waze }
        ]
      }
    ],
    cta: { title: "Cuba satu sesi di Optimum Swim School.", text: "Pilih Puchong Kinrara ketika mendaftar untuk program percubaan percuma semasa Optimum.", button: "Mohon percubaan percuma", url: trial }
  },
  zh: {
    parentRoute: "lifestyle",
    eyebrow: "Optimum Swim School · 室内恒温泳池",
    title: "TPK Park里的Optimum Swim School Puchong Kinrara。",
    description: "Optimum Swim School Puchong Kinrara位于蒲种TPK Park的Jalan TPK 2/2门牌2号。查看游泳课程、免费体验、营业时间与导航。",
    lead: "Optimum Swim School蒲种金銮分校位于Jalan TPK 2/2门牌2号，设有室内恒温泳池，并提供循序渐进的游泳课程，从幼儿水中适应、Learn to Swim，到水上救生及竞技或准竞技训练路线。",
    image,
    heroImage: image,
    heroAlt: "蒲种TPK Park Jalan TPK 2/2门牌2号的Optimum Swim School Puchong Kinrara设施",
    business: optimumSwimSchoolBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "在水中建立真正的信心。", text: "蒲种金銮分校以室内恒温泳池提供不受天气影响的学习环境，适合儿童与成人。Optimum目前的课程路线由3至5岁的Young Swimmer开始，6岁以上及成人可进入Learn to Swim，合适的学员也可继续水上救生、竞技或准竞技训练。", image, alt: "TPK Park的Optimum Swim School Puchong Kinrara室内游泳设施", route: "lifestyle", linkLabel: "查看生活品味" },
      { type: "cards", alignHeadings: true, kicker: "游泳路线", title: "从初步适应到更扎实的泳术。", items: [
        { number: "01", title: "Young Swimmer · 3–5岁", text: "以水中适应为重点，通过教练指导帮助幼儿逐步熟悉泳池环境并建立信心。" },
        { number: "02", title: "Learn to Swim · 6岁以上及成人", text: "现行课程采用九级评估路线，涵盖水上安全、基础技巧、自由泳、仰泳、蝶泳、耐力，以及逐步迈向更高阶技术。" },
        { number: "03", title: "救生与竞技路线", text: "从7岁起，Optimum也设有水上救生及竞技或准竞技路线。具体入学条件与课程适合度请直接向泳校确认。" }
      ] },
      { type: "businessVisit", kicker: "到访安排", title: "在Jalan TPK 2/2找到Optimum Swim School。", text: "蒲种金銮分校位于Jalan TPK 2/2门牌2号。Optimum官方分校页面、目前的Google商家资料和Waze均指向同一个TPK Park地址。", addressLabel: "TPK Park地址", address,
        contacts: [
          { label: "蒲种金銮分校咨询", value: "+60 19 284 8138", url: "tel:+60192848138" },
          { label: "另一个分校电话", value: "+60 13 480 8138", url: "tel:+60134808138" }
        ],
        hours: [
          { label: "星期一", value: "休息" },
          { label: "星期二至星期五", value: "下午4时至晚上9时" },
          { label: "星期六至星期日", value: "上午8时至晚上7时" }
        ],
        note: "课程时间、各项目供应及体验课名额由Optimum Swim School自行安排。出发前请确认所选课程与分校。",
        links: [
          { label: "浏览Optimum Swim School官网", url: website },
          { label: "申请免费体验课", url: trial },
          { label: "Learn to Swim课程", url: learnToSwim },
          { label: "水上救生课程", url: lifesaving },
          { label: "在Google Maps查找分校", url: directions },
          { label: "使用Waze导航", url: waze }
        ]
      }
    ],
    cta: { title: "到Optimum Swim School体验一堂课。", text: "填写Optimum现行免费体验课表格时选择Puchong Kinrara分校。", button: "申请免费体验课", url: trial }
  }
};
