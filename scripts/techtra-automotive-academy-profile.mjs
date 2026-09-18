// Academy identity/photo provenance: docs/techtra-automotive-academy-profile-sources.md.
// Supplier revisions: docs/techtrics-techtra-supplied-revisions.md.
const website = "https://techtra.edu.my/";
const courses = "https://techtra.edu.my/automotive-technology-courses/";
const directions = "https://goo.gl/maps/MCXU7FG4A48o4gh36";
const waze = "https://ul.waze.com/ul?place=ChIJWw6MShNLzDERhKns89Ds4m8&ll=3.04601220%2C101.63798550&navigate=yes";
const whatsapp = "https://wa.me/60182886565";
const image = "https://www.tpkpark.com/assets/images/techtra-automotive-training-1280.webp";
const address = "65, Jalan TPK 2/8, Taman Perindustrian Kinrara, 47180 Puchong, Selangor";

export const techtraAcademyBusiness = {
  "@type": "EducationalOrganization",
  "@id": "https://www.tpkpark.com/automotive/techtra-automotive-academy/#business",
  name: "Techtra Automotive Academy",
  legalName: "Tri Taycan Sdn Bhd",
  url: website, telephone: "+60182886565", email: "enquiry@techtra.edu.my", image, hasMap: waze,
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
    description: "Techtra Automotive Academy at 65, Jalan TPK 2/8, Puchong: automotive technology training focused on European vehicles. Courses, enquiries and campus visits.",
    lead: "Techtra Automotive Academy is located at No. 65, Jalan TPK 2/8. It is an academy specializing in automotive technology training, with a primary focus on European vehicle technology. The academy combines classroom theory with hands-on practical training, allowing students to gain a better understanding of automotive knowledge and repair techniques through practical experience. If you would like to learn more about the course content, entry requirements, or learning environment, you can contact the academy directly for more information or arrange a visit.",
    image, heroImage: image,
    heroAlt: "Practical automotive work shown in Techtra Automotive Academy’s official photo gallery",
    business: techtraAcademyBusiness, datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "Learn how modern vehicles work.", text: "Techtra Automotive Academy primarily offers automotive technology courses, automotive refinishing courses, and short-term technical training programmes. The training covers areas such as vehicle maintenance, automotive systems, diagnostics, and repair techniques, allowing students to gradually develop a better understanding of how modern vehicles are built and operate. You can also share your interests, educational background, and relevant experience with the academy’s education consultant. The consultant can then introduce the different courses, their content, and learning pathways to help you identify a course that suits your interests and goals.", image, alt: "A person wearing a Techtra Automotive Academy apron examines an orange vehicle in a workshop", route: "automotive", linkLabel: "Explore Automotive" },
      { type: "cards", alignHeadings: true, kicker: "Before you enquire", title: "Prepare for your course discussion.", items: [
        { number: "01", title: "Choose your training path", text: "Tell the team about your education, work experience and interests. Ask which courses are open to your background and what the entry requirements are. Explain whether you want to begin an automotive career or develop a particular technical skill." },
        { number: "02", title: "Understand the programme", text: "Speak with the education consultant to learn more about the course outline, duration, class schedule, teaching language, and other relevant details. You can also ask about the practical training, assessments, and internship arrangements. Confirm the relevant certificate or qualification awarded upon completion of the course." },
        { number: "03", title: "Plan fees and your visit", text: "Ask for a written fee breakdown, including tools, materials, assessments and any additional charges. Check payment terms and available assistance directly with the academy. Arrange a campus visit to see the learning environment and discuss your questions before applying." }
      ] },
      { type: "businessVisit", kicker: "Plan your visit", title: "Find Techtra on Jalan TPK 2/8.", text: "The academy is at No. 65. Contact Techtra directly for course enquiries and to arrange a campus visit.", addressLabel: "TPK Park academy address", address,
        contacts: [
          { label: "Course enquiries", value: "+60 18 288 6565", url: "tel:+60182886565" },
          { label: "Alternative enquiry line", value: "+60 18 388 6565", url: "tel:+60183886565" },
          { label: "Email enquiries", value: "enquiry@techtra.edu.my", url: "mailto:enquiry@techtra.edu.my" }
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
    description: "Techtra Automotive Academy di 65, Jalan TPK 2/8, Puchong: latihan teknologi automotif berfokus pada kenderaan Eropah. Kursus, pertanyaan dan lawatan kampus.",
    lead: "Techtra Automotive Academy terletak di No. 65, Jalan TPK 2/8. Akademi ini mengkhusus dalam latihan teknologi automotif, dengan tumpuan utama pada teknologi kenderaan Eropah. Akademi menggabungkan teori dalam kelas dengan latihan amali, membolehkan pelajar memahami pengetahuan automotif dan teknik pembaikan dengan lebih baik melalui pengalaman praktikal. Untuk mengetahui lebih lanjut tentang kandungan kursus, syarat kemasukan atau persekitaran pembelajaran, anda boleh menghubungi akademi secara terus untuk mendapatkan maklumat atau mengatur lawatan.",
    image, heroImage: image,
    heroAlt: "Kerja amali automotif yang dipaparkan dalam galeri foto rasmi Techtra Automotive Academy",
    business: techtraAcademyBusiness, datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "Pelajari cara kenderaan moden berfungsi.", text: "Techtra Automotive Academy menawarkan kursus teknologi automotif, kursus kemasan semula dan pengecatan kenderaan serta program latihan teknikal jangka pendek. Latihan merangkumi penyelenggaraan kenderaan, sistem automotif, diagnostik dan teknik pembaikan, supaya pelajar dapat memahami secara beransur-ansur struktur dan cara kenderaan moden berfungsi. Anda juga boleh berkongsi minat, latar belakang pendidikan dan pengalaman berkaitan dengan perunding pendidikan akademi. Perunding boleh menerangkan kursus, kandungan dan laluan pembelajaran yang berbeza untuk membantu anda mengenal pasti kursus yang sesuai dengan minat dan matlamat anda.", image, alt: "Seorang individu memakai apron Techtra Automotive Academy memeriksa kenderaan berwarna jingga di bengkel", route: "automotive", linkLabel: "Terokai Automotif" },
      { type: "cards", alignHeadings: true, kicker: "Sebelum membuat pertanyaan", title: "Bersedia untuk perbincangan kursus.", items: [
        { number: "01", title: "Pilih laluan latihan", text: "Maklumkan latar belakang pendidikan, pengalaman kerja dan minat anda. Tanya kursus yang sesuai dengan latar belakang anda serta syarat kemasukannya. Jelaskan sama ada anda ingin memulakan kerjaya automotif atau meningkatkan kemahiran teknikal tertentu." },
        { number: "02", title: "Fahami struktur program", text: "Berbincang dengan perunding pendidikan untuk mengetahui rangka kursus, tempoh pengajian, jadual kelas, bahasa pengantar dan butiran berkaitan. Anda juga boleh bertanya tentang latihan amali, penilaian dan aturan latihan industri. Sahkan sijil atau kelayakan berkaitan yang dianugerahkan setelah menamatkan kursus." },
        { number: "03", title: "Rancang yuran dan lawatan", text: "Minta pecahan yuran bertulis yang merangkumi peralatan, bahan, penilaian dan sebarang caj tambahan. Semak syarat pembayaran serta bantuan yang tersedia secara terus dengan akademi. Atur lawatan kampus untuk melihat persekitaran pembelajaran dan mendapatkan penjelasan sebelum memohon." }
      ] },
      { type: "businessVisit", kicker: "Rancang kunjungan", title: "Cari Techtra di Jalan TPK 2/8.", text: "Akademi terletak di No. 65. Hubungi Techtra secara terus untuk pertanyaan kursus dan mengatur lawatan kampus.", addressLabel: "Alamat akademi TPK Park", address,
        contacts: [
          { label: "Pertanyaan kursus", value: "+60 18 288 6565", url: "tel:+60182886565" },
          { label: "Talian pertanyaan alternatif", value: "+60 18 388 6565", url: "tel:+60183886565" },
          { label: "Pertanyaan e-mel", value: "enquiry@techtra.edu.my", url: "mailto:enquiry@techtra.edu.my" }
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
    description: "Techtra Automotive Academy位于蒲种Jalan TPK 2/8的65号，以欧系汽车技术为主要培训方向。查看汽车维修技术、汽车喷漆及短期技术培训课程介绍、咨询方式与参观安排。",
    lead: "Techtra Automotive Academy 位于 65 号 Jalan TPK 2/8，是一所专注于汽车维修技术培训的学院，课程以欧系汽车技术为主要学习方向。学院结合课堂理论与实际操作，让学生在学习汽车知识的同时，也能通过实操进一步了解汽车维修技术。如想进一步了解课程内容、入学要求或学习环境，可直接联系学院咨询，并预约参观。",
    image, heroImage: image,
    heroAlt: "Techtra Automotive Academy官方相册中的汽车技术实操照片",
    business: techtraAcademyBusiness, datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "了解现代汽车如何运作。", text: "Techtra Automotive Academy 主要提供汽车维修技术课程、汽车喷漆课程及短期技术培训课程。课程内容涵盖汽车保养、车辆各系统运作、故障诊断及维修技术等，让学员逐步了解现代汽车的结构与运作方式。你也可以向学院的课程顾问说明自己的兴趣、学习背景及相关经验，由课程顾问进一步介绍不同课程的内容与学习方向，帮助你了解适合自己的课程选择。", image, alt: "一名身穿Techtra Automotive Academy围裙的人在车间检查橙色车辆", route: "automotive", linkLabel: "查看汽车服务" },
      { type: "cards", alignHeadings: true, kicker: "咨询之前", title: "为课程咨询做好准备。", items: [
        { number: "01", title: "选择适合的培训方向", text: "向团队说明你的学历、工作经验与兴趣。询问哪些课程适合你的背景，以及相关入学条件。说明你是希望开始汽车行业的职业生涯，还是加强某项具体技术，方便讨论合适的学习方向。" },
        { number: "02", title: "了解课程安排", text: "向课程顾问了解课程大纲、修读时长、上课时间及教学语言等等。同时，可进一步询问实操培训、课程考核及实习安排，了解理论与实践部分的学习方式，并确认课程完成后所获得的相关证书。" },
        { number: "03", title: "规划费用与参观", text: "索取书面费用明细，了解工具、材料、考核及其他项目是否另行收费。直接向学院确认付款条件与可申请的援助，并安排参观学习环境，在申请前提出你的问题。" }
      ] },
      { type: "businessVisit", kicker: "到访安排", title: "在Jalan TPK 2/8找到Techtra。", text: "学院位于65号。课程咨询与参观安排请直接联系Techtra。", addressLabel: "TPK Park学院地址", address,
        contacts: [
          { label: "课程咨询", value: "+60 18 288 6565", url: "tel:+60182886565" },
          { label: "另一咨询电话", value: "+60 18 388 6565", url: "tel:+60183886565" },
          { label: "电邮咨询", value: "enquiry@techtra.edu.my", url: "mailto:enquiry@techtra.edu.my" }
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
