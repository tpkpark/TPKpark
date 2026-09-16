// Source verification and editorial boundaries: docs/aces-gymnastic-academy-profile-sources.md.
const facebook = "https://www.facebook.com/Acesgymnasticacademy";
const directions = "https://www.google.com/maps/search/?api=1&query=Aces+Gymnastics+Academy&query_place_id=ChIJGTa-2l-zzTEROuSOVRTdLYM";
const waze = "https://www.waze.com/live-map/directions/my/selangor/puchong/aces-gymnastics-academy?to=place.ChIJGTa-2l-zzTEROuSOVRTdLYM";
const image = "https://i.imgur.com/Z5h4hmH.jpg";
const academyPhoto = "/assets/images/aces-gymnastics-academy-entrance.webp";
const address = "11-1, Jalan TPK 2/8, Taman Perindustrian Kinrara, 47180 Puchong, Selangor";

export const acesGymnasticAcademyBusiness = {
  "@type": "SportsActivityLocation",
  "@id": "https://www.tpkpark.com/lifestyle/aces-gymnastic-academy/#business",
  name: "Aces Gymnastic Academy",
  alternateName: "Aces Gymnastics Academy",
  url: facebook,
  sameAs: [facebook],
  telephone: "+60103658213",
  hasMap: waze,
  address: {
    "@type": "PostalAddress",
    streetAddress: "11-1, Jalan TPK 2/8, Taman Perindustrian Kinrara",
    addressLocality: "Puchong",
    addressRegion: "Selangor",
    postalCode: "47180",
    addressCountry: "MY"
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday"], opens: "17:00", closes: "21:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday"], opens: "16:00", closes: "20:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "11:00", closes: "20:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday"], opens: "11:00", closes: "18:00" }
  ],
  containedInPlace: { "@id": "https://www.tpkpark.com/#taman-perindustrian-kinrara" }
};

export const acesGymnasticAcademyProfiles = {
  en: {
    parentRoute: "lifestyle",
    eyebrow: "Aces Gymnastic Academy · Gymnastics & dance",
    title: "Aces Gymnastic Academy at TPK Park.",
    description: "Find Aces Gymnastic Academy at 11-1, Jalan TPK 2/8, TPK Park, Puchong. See public contact details, current listed hours and directions.",
    lead: "Aces Gymnastic Academy is a gymnastics and dance training centre at No. 11-1, Jalan TPK 2/8. Public business records describe its activity as gymnastics sport and dance, while Aces’ own published material lists artistic gymnastics classes for boys and girls.",
    image,
    heroImage: image,
    heroAlt: "TPK Park Lifestyle frontage in Puchong, used as contextual imagery for the Aces Gymnastic Academy guide",
    business: acesGymnasticAcademyBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "Build the fundamentals.", text: "Aces’ published class material centres on artistic gymnastics for boys and girls, with training framed around strength, coordination, balance, movement skills, discipline and confidence. Current levels, age groups and class places can change, so contact the academy directly before enrolling.", image: academyPhoto, alt: "Aces Gymnastic Academy entrance at TPK Park with glass-door signage and promotional banner", route: "lifestyle", linkLabel: "Explore Lifestyle" },
      { type: "cards", alignHeadings: true, kicker: "Training focus", title: "Gymnastics with a clear progression mindset.", items: [
        { number: "01", title: "Artistic gymnastics", text: "Aces’ published materials list artistic gymnastics classes for boys and girls. Ask the academy which current class best matches the student’s age and experience." },
        { number: "02", title: "Movement foundations", text: "The academy’s own material highlights strength, body movement skills, coordination, balance and discipline as core training themes rather than promising a particular competitive outcome." },
        { number: "03", title: "Check the current timetable", text: "The current public listing publishes operating hours for Monday to Wednesday and the weekend, but does not publish Thursday or Friday hours. Confirm the latest class timetable directly with Aces." }
      ] },
      { type: "businessVisit", kicker: "Plan your visit", title: "Find Aces on the first floor at No. 11-1.", text: "The academy is on the first floor along Jalan TPK 2/8. Waze and the current Google business listing agree on the branch address and public phone number.", addressLabel: "TPK Park address", address,
        contacts: [{ label: "Academy enquiries", value: "+60 10 365 8213", url: "tel:+60103658213" }],
        hours: [
          { label: "Monday", value: "5pm–9pm" },
          { label: "Tuesday–Wednesday", value: "4pm–8:30pm" },
          { label: "Saturday", value: "11am–8pm" },
          { label: "Sunday", value: "11am–6pm" },
          { label: "Thursday–Friday", value: "No hours published in the current public listing — confirm directly" }
        ],
        note: "Gymnastics class schedules can differ from general listing hours. Contact Aces directly before a time-sensitive visit or enrolment enquiry.",
        links: [
          { label: "Find Aces on Google Maps", url: directions },
          { label: "Directions on Waze", url: waze },
          { label: "Visit Aces on Facebook", url: facebook }
        ]
      }
    ],
    cta: { title: "Ask Aces about the right gymnastics class.", text: "Contact the academy to confirm the current timetable, age group and available class before you go.", button: "Visit Aces on Facebook", url: facebook }
  },
  ms: {
    parentRoute: "lifestyle",
    eyebrow: "Aces Gymnastic Academy · Gimnastik & tarian",
    title: "Aces Gymnastic Academy di TPK Park.",
    description: "Cari Aces Gymnastic Academy di 11-1, Jalan TPK 2/8, TPK Park, Puchong. Lihat maklumat hubungan awam, waktu semasa yang disenaraikan dan arah perjalanan.",
    lead: "Aces Gymnastic Academy ialah pusat latihan gimnastik dan tarian di No. 11-1, Jalan TPK 2/8. Rekod perniagaan awam menerangkan aktivitinya sebagai sukan gimnastik dan tarian, manakala bahan terbitan Aces menyenaraikan kelas gimnastik artistik untuk lelaki dan perempuan.",
    image,
    heroImage: image,
    heroAlt: "Bahagian hadapan kluster Lifestyle TPK Park di Puchong, digunakan sebagai imej konteks untuk panduan Aces Gymnastic Academy",
    business: acesGymnasticAcademyBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "Bina asas yang kukuh.", text: "Bahan kelas yang diterbitkan Aces memberi tumpuan kepada gimnastik artistik untuk lelaki dan perempuan, dengan latihan berkaitan kekuatan, koordinasi, keseimbangan, kemahiran pergerakan, disiplin dan keyakinan. Tahap, kumpulan umur dan tempat kelas semasa boleh berubah, jadi hubungi akademi sebelum mendaftar.", image: academyPhoto, alt: "Pintu masuk Aces Gymnastic Academy di TPK Park dengan papan tanda pada pintu kaca dan bunting promosi", route: "lifestyle", linkLabel: "Terokai Lifestyle" },
      { type: "cards", alignHeadings: true, kicker: "Fokus latihan", title: "Gimnastik dengan perkembangan yang berperingkat.", items: [
        { number: "01", title: "Gimnastik artistik", text: "Bahan terbitan Aces menyenaraikan kelas gimnastik artistik untuk lelaki dan perempuan. Tanya akademi kelas semasa yang sesuai dengan umur dan pengalaman pelajar." },
        { number: "02", title: "Asas pergerakan", text: "Bahan Aces menonjolkan kekuatan, kemahiran pergerakan badan, koordinasi, keseimbangan dan disiplin sebagai tema latihan utama tanpa menjanjikan hasil pertandingan tertentu." },
        { number: "03", title: "Semak jadual semasa", text: "Penyenaraian awam semasa menerbitkan waktu bagi Isnin hingga Rabu serta hujung minggu, tetapi tidak menerbitkan waktu Khamis atau Jumaat. Sahkan jadual kelas terkini terus dengan Aces." }
      ] },
      { type: "businessVisit", kicker: "Rancang kunjungan", title: "Cari Aces di tingkat satu, No. 11-1.", text: "Akademi ini berada di tingkat satu di Jalan TPK 2/8. Waze dan penyenaraian Google semasa sepadan pada alamat cawangan serta nombor telefon awam.", addressLabel: "Alamat TPK Park", address,
        contacts: [{ label: "Pertanyaan akademi", value: "+60 10 365 8213", url: "tel:+60103658213" }],
        hours: [
          { label: "Isnin", value: "5 petang–9 malam" },
          { label: "Selasa–Rabu", value: "4 petang–8:30 malam" },
          { label: "Sabtu", value: "11 pagi–8 malam" },
          { label: "Ahad", value: "11 pagi–6 petang" },
          { label: "Khamis–Jumaat", value: "Tiada waktu diterbitkan dalam penyenaraian awam semasa — sahkan terus" }
        ],
        note: "Jadual kelas gimnastik boleh berbeza daripada waktu penyenaraian umum. Hubungi Aces sebelum kunjungan yang terikat masa atau pertanyaan pendaftaran.",
        links: [
          { label: "Cari Aces di Google Maps", url: directions },
          { label: "Arah melalui Waze", url: waze },
          { label: "Lawati Aces di Facebook", url: facebook }
        ]
      }
    ],
    cta: { title: "Tanya Aces tentang kelas gimnastik yang sesuai.", text: "Hubungi akademi untuk mengesahkan jadual semasa, kumpulan umur dan kekosongan kelas sebelum berkunjung.", button: "Lawati Aces di Facebook", url: facebook }
  },
  zh: {
    parentRoute: "lifestyle",
    eyebrow: "Aces Gymnastic Academy · 体操与舞蹈",
    title: "TPK Park里的Aces Gymnastic Academy。",
    description: "Aces Gymnastic Academy位于蒲种TPK Park的Jalan TPK 2/8，11-1。查看公开联系方式、现有营业时段与导航。",
    lead: "Aces Gymnastic Academy位于Jalan TPK 2/8的11-1，是一家体操与舞蹈训练中心。公开商业记录把其业务描述为体操运动及舞蹈，而Aces过往自行发布的资料则列有男孩及女孩的竞技体操课程。",
    image,
    heroImage: image,
    heroAlt: "蒲种TPK Park生活品味区街景，作为Aces Gymnastic Academy页面的园区背景图片",
    business: acesGymnasticAcademyBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "从基本功开始。", text: "Aces已发布的课程资料以男孩及女孩的竞技体操为主，并把力量、协调、平衡、身体动作技巧、纪律与自信列为训练重点。现有级别、年龄组及课程名额可能调整，报名之前应直接向学院确认。", image: academyPhoto, alt: "TPK Park内Aces Gymnastic Academy的入口，附有玻璃门招牌与宣传立牌", route: "lifestyle", linkLabel: "查看生活品味" },
      { type: "cards", alignHeadings: true, kicker: "训练重点", title: "循序建立体操基础。", items: [
        { number: "01", title: "竞技体操", text: "Aces已发布的资料列有男孩及女孩竞技体操课程。可直接向学院查询目前适合不同年龄与经验程度的班级。" },
        { number: "02", title: "动作基础", text: "Aces的资料强调力量、身体动作技巧、协调、平衡及纪律等训练主题，并不把某一项比赛成绩作为保证。" },
        { number: "03", title: "先确认最新课表", text: "现有公开商家资料列有星期一至三及周末时段，但没有公布星期四及星期五的时段。出发或报名之前请直接向Aces确认最新课表。" }
      ] },
      { type: "businessVisit", kicker: "到访安排", title: "Aces位于11-1的一楼单位。", text: "学院位于Jalan TPK 2/8的一楼。现有Waze及Google商家资料对该分店地址与公开电话号码的记录一致。", addressLabel: "TPK Park店址", address,
        contacts: [{ label: "学院咨询", value: "+60 10 365 8213", url: "tel:+60103658213" }],
        hours: [
          { label: "星期一", value: "下午5时–晚上9时" },
          { label: "星期二至三", value: "下午4时–晚上8时30分" },
          { label: "星期六", value: "上午11时–晚上8时" },
          { label: "星期日", value: "上午11时–下午6时" },
          { label: "星期四至五", value: "现有公开资料没有公布时段，请直接确认" }
        ],
        note: "体操课程时段可能与一般商家营业时间不同。如行程时间较紧或准备报名，请先直接联系Aces。",
        links: [
          { label: "在Google Maps查找Aces", url: directions },
          { label: "使用Waze导航", url: waze },
          { label: "查看Aces Facebook", url: facebook }
        ]
      }
    ],
    cta: { title: "向Aces查询适合的体操课程。", text: "出发前可直接向学院确认最新课表、年龄组及课程名额。", button: "查看Aces Facebook", url: facebook }
  }
};
