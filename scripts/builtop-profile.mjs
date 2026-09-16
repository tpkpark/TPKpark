// Public details and editorial boundaries: docs/builtop-profile-sources.md.
const website = "https://www.builtopmalaysia.com/";
const contact = "https://www.builtopmalaysia.com/contactus/";
const services = "https://www.builtopmalaysia.com/services/";
const directions = "https://www.google.com/maps/dir/?api=1&destination=BUILTOP%2C+13-1%2C+Jalan+TPK+2%2F8%2C+47100+Puchong%2C+Selangor";
// Residential project photograph from BUILTOP’s official Sunway Geo portfolio.
const image = "https://www.tpkpark.com/assets/images/builtop-sunway-geo-1440.webp";
const imageSource = { label: "BUILTOP", url: "https://www.builtopmalaysia.com/showproducts/productid/5306104/cid/554650/sunway-geo/" };
const address = "13-1, Jalan TPK 2/8, Taman Perindustrian Kinrara, 47100 Puchong, Selangor";

export const builtopBusiness = {
  "@type": "LocalBusiness",
  "@id": "https://www.tpkpark.com/home-living/builtop/#business",
  name: "BUILTOP",
  legalName: "Builtop Group Sdn. Bhd.",
  url: website,
  telephone: "+601126838848",
  address: {
    "@type": "PostalAddress",
    streetAddress: "13-1, Jalan TPK 2/8, Taman Perindustrian Kinrara",
    addressLocality: "Puchong",
    addressRegion: "Selangor",
    postalCode: "47100",
    addressCountry: "MY"
  },
  containedInPlace: { "@id": "https://www.tpkpark.com/#taman-perindustrian-kinrara" }
};

export const builtopProfiles = {
  en: {
    parentRoute: "homeLiving",
    eyebrow: "BUILTOP · Design, renovation & construction",
    title: "BUILTOP at TPK Park.",
    description: "Discuss residential or commercial projects with BUILTOP in Puchong. Find its Jalan TPK 2/8 office, design and build services, contact details and directions.",
    lead: "BUILTOP provides design and construction services for homes and commercial premises. Based on Jalan TPK 2/8 in Taman Perindustrian Kinrara, it brings project planning and building services to TPK Park’s Home & Living cluster.",
    image,
    heroImage: image,
    heroAlt: "Built-in timber shelving and a desk in BUILTOP’s Sunway Geo townhouse project",
    business: builtopBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "Plan the design and the work together.", text: "BUILTOP’s services include interior design, design and build, renovation, construction and project management consultation. Whether you are adapting an existing home or fitting out business premises, start by explaining the space, the intended use and what needs to change. This gives the team a clearer basis for discussing the scope, materials and sequence of work.", image, alt: "Built-in timber shelving and a desk in BUILTOP’s Sunway Geo townhouse project", caption: "A study space in BUILTOP’s Sunway Geo townhouse project. Photo:", captionSource: imageSource, route: "homeLiving", linkLabel: "Explore Home & Living" },
      { type: "cards", alignHeadings: true, kicker: "Before the first meeting", title: "Give the project a clear starting point.", items: [
        { number: "01", title: "Describe the property", text: "Bring available drawings, measurements and recent photos. Explain whether the space is a home, office, shop or another type of premises, what is already there and how you want to use it. Note anything that needs to remain in place." },
        { number: "02", title: "Define the work", text: "Separate the work you need from optional additions, and share your budget range. Ask which design, construction and coordination services are included. Clarify who will handle any required submissions and how materials and changes will be recorded." },
        { number: "03", title: "Plan the sequence", text: "Discuss site access, delivery arrangements and whether the premises will stay in use during the work. Ask about the programme, progress updates, payment stages and handover. Agree which decisions are needed before work can begin." }
      ] },
      { type: "businessVisit", kicker: "Plan your meeting", title: "Find BUILTOP on Jalan TPK 2/8.", text: "Contact the team at 13-1 to arrange a project discussion.", addressLabel: "Office address", address, phoneLabel: "BUILTOP enquiries", phoneDisplay: "+60 11 2683 8848", note: "Confirm office hours and your meeting time directly with BUILTOP before travelling. Mention the type of project when you call so the team can advise what to prepare.", links: [
        { label: "Directions on Google Maps", url: directions },
        { label: "BUILTOP contact details", url: contact },
        { label: "Explore BUILTOP’s services", url: services }
      ] }
    ],
    cta: { title: "Talk through the project before work begins.", text: "Share your plans, priorities and proposed timing with BUILTOP to discuss the next steps for your home or business premises.", button: "Visit BUILTOP’s website", url: website }
  },
  ms: {
    parentRoute: "homeLiving",
    eyebrow: "BUILTOP · Reka bentuk, pengubahsuaian & pembinaan",
    title: "BUILTOP di TPK Park.",
    description: "Bincangkan projek kediaman atau komersial dengan BUILTOP Puchong. Lihat alamat Jalan TPK 2/8, khidmat reka bentuk dan bina, telefon serta arah perjalanan.",
    lead: "BUILTOP menyediakan perkhidmatan reka bentuk dan pembinaan untuk kediaman serta premis komersial. Berpusat di Jalan TPK 2/8, Taman Perindustrian Kinrara, firma ini melengkapkan kluster Home & Living TPK Park dengan perancangan projek dan khidmat pembinaan.",
    image,
    heroImage: image,
    heroAlt: "Rak kayu terbina dalam dan meja dalam projek rumah bandar Sunway Geo oleh BUILTOP",
    business: builtopBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "Rancang reka bentuk dan pelaksanaan bersama.", text: "Perkhidmatan BUILTOP merangkumi reka bentuk dalaman, reka bentuk dan bina, pengubahsuaian, pembinaan serta konsultasi pengurusan projek. Sama ada anda mengubah suai rumah sedia ada atau menyiapkan ruang perniagaan, mulakan dengan menerangkan ruang, kegunaan yang dirancang dan perubahan yang diperlukan. Maklumat ini membantu pasukan membincangkan skop, bahan dan urutan kerja.", image, alt: "Rak kayu terbina dalam dan meja dalam projek rumah bandar Sunway Geo oleh BUILTOP", caption: "Ruang belajar dalam projek rumah bandar Sunway Geo oleh BUILTOP. Foto:", captionSource: imageSource, route: "homeLiving", linkLabel: "Terokai Home & Living" },
      { type: "cards", alignHeadings: true, kicker: "Sebelum pertemuan pertama", title: "Tetapkan asas projek dengan jelas.", items: [
        { number: "01", title: "Terangkan premis", text: "Bawa lukisan yang tersedia, ukuran dan foto terkini. Nyatakan sama ada ruang itu rumah, pejabat, kedai atau premis lain, keadaan sedia ada dan kegunaan yang dirancang. Catat bahagian yang perlu dikekalkan." },
        { number: "02", title: "Tentukan skop kerja", text: "Bezakan kerja yang diperlukan daripada tambahan pilihan dan kongsikan julat bajet anda. Tanya khidmat reka bentuk, pembinaan dan penyelarasan yang termasuk. Perjelas pihak yang menguruskan penyerahan dokumen jika diperlukan serta cara bahan dan perubahan akan direkodkan." },
        { number: "03", title: "Rancang urutan kerja", text: "Bincangkan akses tapak, urusan penghantaran dan sama ada premis masih akan digunakan semasa kerja berjalan. Tanya tentang jadual, kemas kini kemajuan, peringkat bayaran dan penyerahan. Persetujui keputusan yang perlu dibuat sebelum kerja bermula." }
      ] },
      { type: "businessVisit", kicker: "Rancang pertemuan", title: "Cari BUILTOP di Jalan TPK 2/8.", text: "Hubungi pasukan di 13-1 untuk mengatur perbincangan projek.", addressLabel: "Alamat pejabat", address, phoneLabel: "Pertanyaan BUILTOP", phoneDisplay: "+60 11 2683 8848", note: "Sahkan waktu pejabat dan masa pertemuan terus dengan BUILTOP sebelum berkunjung. Nyatakan jenis projek semasa menghubungi pasukan supaya mereka boleh mencadangkan persediaan yang sesuai.", links: [
        { label: "Arah melalui Google Maps", url: directions },
        { label: "Maklumat hubungan BUILTOP", url: contact },
        { label: "Terokai perkhidmatan BUILTOP", url: services }
      ] }
    ],
    cta: { title: "Bincangkan projek sebelum kerja bermula.", text: "Kongsi pelan, keutamaan dan jangka masa anda dengan BUILTOP untuk membincangkan langkah seterusnya bagi kediaman atau premis perniagaan anda.", button: "Laman web BUILTOP", url: website }
  },
  zh: {
    parentRoute: "homeLiving",
    eyebrow: "BUILTOP · 设计、装修与建筑工程",
    title: "TPK Park里的BUILTOP。",
    description: "向蒲种金銮工业园的BUILTOP咨询住宅与商业空间设计、装修及建筑工程。查看Jalan TPK 2/8办公地址、电话、导航路线与项目前期沟通建议。",
    lead: "BUILTOP为住宅与商业空间提供设计及建筑工程服务，办公室位于金銮工业园Jalan TPK 2/8，为TPK Park家居生活集群增添项目规划与施工服务。",
    image,
    heroImage: image,
    heroAlt: "BUILTOP的Sunway Geo联排住宅项目，展示木质内置书架与书桌",
    business: builtopBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "把设计与施工放在一起规划。", text: "BUILTOP的服务涵盖室内设计、设计与施工、装修、建筑工程及项目管理咨询。无论是改造现有住宅，还是装修商业场所，都可先说明空间现况、计划用途及需要改变的部分，让团队更具体地讨论工程范围、材料与施工顺序。", image, alt: "BUILTOP的Sunway Geo联排住宅项目，展示木质内置书架与书桌", caption: "BUILTOP的Sunway Geo联排住宅项目中的书房空间。图片来源：", captionSource: imageSource, route: "homeLiving", linkLabel: "查看家居生活品牌" },
      { type: "cards", alignHeadings: true, kicker: "首次会面之前", title: "先把项目的基本需求说清楚。", items: [
        { number: "01", title: "说明物业现况", text: "准备现有图纸、尺寸及近期照片，说明空间属于住宅、办公室、商铺或其他用途，目前状况如何，以及未来希望怎样使用。也请标明需要保留的部分。" },
        { number: "02", title: "界定工程范围", text: "区分必要工程与可选项目，并说明预算范围。了解报价包含哪些设计、施工及协调服务，厘清需要提交的文件由谁负责，以及材料规格和变更将如何记录。" },
        { number: "03", title: "安排施工顺序", text: "讨论现场通行、材料运送，以及施工期间是否仍需使用有关空间。了解工期、进度汇报、付款阶段与完工交付安排，并确认开工前需要作出的决定。" }
      ] },
      { type: "businessVisit", kicker: "安排会面", title: "在Jalan TPK 2/8找到BUILTOP。", text: "可联系位于13-1号的团队，安排项目沟通。", addressLabel: "办公地址", address, phoneLabel: "联系BUILTOP", phoneDisplay: "+60 11 2683 8848", note: "出发前请直接向BUILTOP确认办公时间与会面安排。联系时说明项目类型，让团队建议适合准备的资料。", links: [
        { label: "使用Google Maps导航", url: directions },
        { label: "BUILTOP联系资料", url: contact },
        { label: "查看BUILTOP服务", url: services }
      ] }
    ],
    cta: { title: "开工之前，先把项目谈清楚。", text: "向BUILTOP说明图纸、优先需求与期望时间，讨论住宅或商业空间的下一步安排。", button: "前往BUILTOP官网", url: website }
  }
};
