// Verified academy details and photo provenance: docs/techtra-automotive-academy-profile-sources.md.
const website = "https://techtra.edu.my/";
const courses = "https://techtra.edu.my/automotive-technology-courses/";
const directions = "https://goo.gl/maps/MCXU7FG4A48o4gh36";
const waze = "https://ul.waze.com/ul?place=ChIJWw6MShNLzDERhKns89Ds4m8&ll=3.04601220%2C101.63798550&navigate=yes";
const whatsapp = "https://wa.me/60182886565";
const image = "https://www.tpkpark.com/assets/images/techtra-automotive-training-1280.webp";
const imageSource = { label: "Techtra Automotive Academy", url: "https://techtra.edu.my/wp-content/uploads/2023/02/Techtra-Automotive-Academy-Malaysia-11-min.jpg" };
const address = "65, Jalan TPK 2/8, Taman Perindustrian Kinrara, 47180 Puchong, Selangor";

export const techtraAcademyBusiness = {
  "@type": "EducationalOrganization",
  "@id": "https://www.tpkpark.com/automotive/techtra-automotive-academy/#business",
  name: "Techtra Automotive Academy",
  legalName: "Tri Taycan Sdn Bhd",
  url: website, telephone: "+60182886565", email: "enquiry@techtraacademy.my", image, hasMap: waze,
  contactPoint: [
    { "@type": "ContactPoint", telephone: "+60182886565", contactType: "Course enquiries", url: whatsapp },
    { "@type": "ContactPoint", telephone: "+60183886565", contactType: "Course enquiries" }
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "65, Jalan TPK 2/8, Taman Perindustrian Kinrara",
    addressLocality: "Puchong", addressRegion: "Selangor", postalCode: "47180", addressCountry: "MY"
  },
  containedInPlace: { "@id": "https://www.tpkpark.com/#taman-perindustrian-kinrara" }
};

export const techtraAcademyProfiles = {
  en: {
    parentRoute: "automotive",
    eyebrow: "Techtra · Automotive training",
    title: "Techtra Automotive Academy at TPK Park.",
    description: "Explore Techtra Automotive Academy at 65, Jalan TPK 2/8, Puchong. Course enquiries, campus visits, contact details and directions for prospective students.",
    lead: "Techtra Automotive Academy combines classroom learning with practical automotive training at No. 65, Jalan TPK 2/8. Speak to the academy about courses and campus visits within TPK Park’s Automotive cluster.",
    image, heroImage: image,
    heroAlt: "Practical automotive work shown in Techtra Automotive Academy’s official photo gallery",
    business: techtraAcademyBusiness, datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "Learn how modern vehicles work.", text: "Techtra’s published course options include automotive technology, automotive refinishing and short technical courses. Its training combines vehicle systems, diagnostics and workshop practice, with a focus on European vehicles. Discuss your interests and experience with the academy to understand which programme suits your goals.", image, alt: "A person wearing a Techtra Automotive Academy apron examines an orange vehicle in a workshop", caption: "Practical automotive work from Techtra’s official photo gallery. Photo:", captionSource: imageSource, route: "automotive", linkLabel: "Explore Automotive" },
      { type: "cards", alignHeadings: true, kicker: "Before you enquire", title: "Prepare for your course discussion.", items: [
        { number: "01", title: "Choose your training path", text: "Tell the team about your education, work experience and interests. Ask which courses are open to your background and what the entry requirements are. Explain whether you want to begin an automotive career or develop a particular technical skill." },
        { number: "02", title: "Understand the programme", text: "Request the course outline, duration, timetable and teaching language. Ask how practical training, assessment and any internship are arranged. Confirm the exact qualification awarded and the awarding body for the programme you are considering." },
        { number: "03", title: "Plan fees and your visit", text: "Ask for a written fee breakdown, including tools, materials, assessments and any additional charges. Check payment terms and available assistance directly with the academy. Arrange a campus visit to see the learning environment and discuss your questions before applying." }
      ] },
      { type: "businessVisit", kicker: "Plan your visit", title: "Find Techtra on Jalan TPK 2/8.", text: "The academy is at No. 65. Contact Techtra directly for course enquiries and to arrange a campus visit.", addressLabel: "TPK Park academy address", address,
        contacts: [
          { label: "Course enquiries", value: "+60 18 288 6565", url: "tel:+60182886565" },
          { label: "Alternative enquiry line", value: "+60 18 388 6565", url: "tel:+60183886565" },
          { label: "Email enquiries", value: "enquiry@techtraacademy.my", url: "mailto:enquiry@techtraacademy.my" }
        ],
        note: "Confirm current intakes, entry requirements, fees and visiting hours directly with the academy before applying or travelling.", links: [
          { label: "Open the academy on Google Maps", url: directions },
          { label: "Directions to the academy on Waze", url: waze },
          { label: "Techtra Automotive Academy website", url: website },
          { label: "Automotive technology course information", url: courses }
        ]
      }
    ],
    cta: { title: "Explore your next step in automotive training.", text: "Contact Techtra to discuss course options and arrange a visit to the academy.", button: "WhatsApp Techtra", url: whatsapp }
  },
  ms: {
    parentRoute: "automotive",
    eyebrow: "Techtra · Latihan automotif",
    title: "Techtra Automotive Academy di TPK Park.",
    description: "Kenali Techtra Automotive Academy di 65, Jalan TPK 2/8, Puchong. Maklumat hubungan, pertanyaan kursus dan arah perjalanan untuk merancang lawatan kampus.",
    lead: "Techtra Automotive Academy menggabungkan pembelajaran dalam kelas dengan latihan amali automotif di No. 65, Jalan TPK 2/8. Hubungi akademi untuk maklumat kursus dan lawatan kampus dalam kluster Automotif TPK Park.",
    image, heroImage: image,
    heroAlt: "Kerja amali automotif yang dipaparkan dalam galeri foto rasmi Techtra Automotive Academy",
    business: techtraAcademyBusiness, datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "Pelajari cara kenderaan moden berfungsi.", text: "Pilihan kursus yang disenaraikan oleh Techtra merangkumi teknologi automotif, kemasan semula dan pengecatan kenderaan serta kursus teknikal jangka pendek. Latihannya menggabungkan sistem kenderaan, diagnostik dan amali bengkel, dengan tumpuan pada kenderaan Eropah. Bincangkan minat dan pengalaman anda dengan akademi untuk memahami program yang sesuai dengan matlamat anda.", image, alt: "Seorang individu memakai apron Techtra Automotive Academy memeriksa kenderaan berwarna jingga di bengkel", caption: "Kerja amali automotif daripada galeri foto rasmi Techtra. Foto:", captionSource: imageSource, route: "automotive", linkLabel: "Terokai Automotif" },
      { type: "cards", alignHeadings: true, kicker: "Sebelum membuat pertanyaan", title: "Bersedia untuk perbincangan kursus.", items: [
        { number: "01", title: "Pilih laluan latihan", text: "Maklumkan latar belakang pendidikan, pengalaman kerja dan minat anda. Tanya kursus yang sesuai dengan latar belakang anda serta syarat kemasukannya. Jelaskan sama ada anda ingin memulakan kerjaya automotif atau meningkatkan kemahiran teknikal tertentu." },
        { number: "02", title: "Fahami struktur program", text: "Minta rangka kursus, tempoh, jadual dan bahasa pengantar. Tanya cara latihan amali, penilaian dan sebarang latihan industri diatur. Sahkan kelayakan yang akan dianugerahkan serta badan penganugerah bagi program yang sedang anda pertimbangkan." },
        { number: "03", title: "Rancang yuran dan lawatan", text: "Minta pecahan yuran bertulis yang merangkumi peralatan, bahan, penilaian dan sebarang caj tambahan. Semak syarat pembayaran serta bantuan yang tersedia secara terus dengan akademi. Atur lawatan kampus untuk melihat persekitaran pembelajaran dan mendapatkan penjelasan sebelum memohon." }
      ] },
      { type: "businessVisit", kicker: "Rancang kunjungan", title: "Cari Techtra di Jalan TPK 2/8.", text: "Akademi terletak di No. 65. Hubungi Techtra secara terus untuk pertanyaan kursus dan mengatur lawatan kampus.", addressLabel: "Alamat akademi TPK Park", address,
        contacts: [
          { label: "Pertanyaan kursus", value: "+60 18 288 6565", url: "tel:+60182886565" },
          { label: "Talian pertanyaan alternatif", value: "+60 18 388 6565", url: "tel:+60183886565" },
          { label: "Pertanyaan e-mel", value: "enquiry@techtraacademy.my", url: "mailto:enquiry@techtraacademy.my" }
        ],
        note: "Sahkan pengambilan terkini, syarat kemasukan, yuran dan waktu lawatan secara terus dengan akademi sebelum memohon atau bertolak.", links: [
          { label: "Buka lokasi akademi di Google Maps", url: directions },
          { label: "Arah ke akademi melalui Waze", url: waze },
          { label: "Laman web Techtra Automotive Academy", url: website },
          { label: "Maklumat kursus teknologi automotif", url: courses }
        ]
      }
    ],
    cta: { title: "Terokai langkah seterusnya dalam latihan automotif.", text: "Hubungi Techtra untuk membincangkan pilihan kursus dan mengatur lawatan ke akademi.", button: "WhatsApp Techtra", url: whatsapp }
  },
  zh: {
    parentRoute: "automotive",
    eyebrow: "Techtra · 汽车技术培训",
    title: "TPK Park里的Techtra Automotive Academy。",
    description: "Techtra Automotive Academy位于蒲种Jalan TPK 2/8的65号。查看课程咨询电话、电邮与导航，了解汽车技术培训并安排参观。",
    lead: "Techtra Automotive Academy位于Jalan TPK 2/8的65号，将课堂学习与汽车技术实操相结合。可直接联系学院，咨询课程及安排参观，了解TPK Park汽车服务集群中的技术培训选择。",
    image, heroImage: image,
    heroAlt: "Techtra Automotive Academy官方相册中的汽车技术实操照片",
    business: techtraAcademyBusiness, datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "了解现代汽车如何运作。", text: "Techtra公布的课程选项包括汽车技术、汽车喷漆及短期技术课程。培训结合车辆系统、故障诊断与车间实操，并以欧系车辆为重点。向学院说明你的兴趣与经验，了解哪种课程更符合你的学习目标。", image, alt: "一名身穿Techtra Automotive Academy围裙的人在车间检查橙色车辆", caption: "Techtra官方相册中的汽车技术实操场景。图片来源：", captionSource: imageSource, route: "automotive", linkLabel: "查看汽车服务" },
      { type: "cards", alignHeadings: true, kicker: "咨询之前", title: "为课程咨询做好准备。", items: [
        { number: "01", title: "选择适合的培训方向", text: "向团队说明你的学历、工作经验与兴趣。询问哪些课程适合你的背景，以及相关入学条件。说明你是希望开始汽车行业的职业生涯，还是加强某项具体技术，方便讨论合适的学习方向。" },
        { number: "02", title: "了解课程安排", text: "索取课程大纲、修读时长、上课时间与教学语言资料。询问实操培训、考核及可能涉及的实习如何安排，并确认所考虑课程最终颁发的具体资格与颁发机构。" },
        { number: "03", title: "规划费用与参观", text: "索取书面费用明细，了解工具、材料、考核及其他项目是否另行收费。直接向学院确认付款条件与可申请的援助，并安排参观学习环境，在申请前提出你的问题。" }
      ] },
      { type: "businessVisit", kicker: "到访安排", title: "在Jalan TPK 2/8找到Techtra。", text: "学院位于65号。课程咨询与参观安排请直接联系Techtra。", addressLabel: "TPK Park学院地址", address,
        contacts: [
          { label: "课程咨询", value: "+60 18 288 6565", url: "tel:+60182886565" },
          { label: "另一咨询电话", value: "+60 18 388 6565", url: "tel:+60183886565" },
          { label: "电邮咨询", value: "enquiry@techtraacademy.my", url: "mailto:enquiry@techtraacademy.my" }
        ],
        note: "申请或出发前，请直接向学院确认最新招生批次、入学条件、费用及可参观时间。", links: [
          { label: "在Google Maps查看学院位置", url: directions },
          { label: "通过Waze导航至学院", url: waze },
          { label: "Techtra Automotive Academy官网", url: website },
          { label: "查看汽车技术课程资料", url: courses }
        ]
      }
    ],
    cta: { title: "探索汽车技术学习的下一步。", text: "联系Techtra咨询课程选择，并安排到学院参观。", button: "WhatsApp联系Techtra", url: whatsapp }
  }
};
