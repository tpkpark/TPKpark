// Business details and image provenance: docs/choose-interior-profile-sources.md.
const instagram = "https://www.instagram.com/chooseinterior.cid/";
const project = "https://www.instagram.com/chooseinterior.cid/p/CnQv4oOP5gF/";
const directions = "https://www.google.com/maps/search/?api=1&query=21-1+Jalan+TPK+2%2F8+Taman+Perindustrian+Kinrara+47180+Puchong";
const image = "https://www.tpkpark.com/assets/images/choose-interior-retail-project-768.webp";
const imageSource = { label: "Choose Interior", url: project };
const address = "21-1, Jalan TPK 2/8, Taman Perindustrian Kinrara, Seksyen 2, 47180 Puchong, Selangor";

export const chooseInteriorBusiness = {
  "@type": "LocalBusiness",
  "@id": "https://www.tpkpark.com/home-living/choose-interior/#business",
  name: "Choose Interior",
  alternateName: "CHOOSE ID 選",
  url: instagram,
  contactPoint: { "@type": "ContactPoint", contactType: "Customer enquiries", url: instagram },
  hasMap: directions,
  address: {
    "@type": "PostalAddress",
    streetAddress: "21-1, Jalan TPK 2/8, Taman Perindustrian Kinrara, Seksyen 2",
    addressLocality: "Puchong",
    addressRegion: "Selangor",
    postalCode: "47180",
    addressCountry: "MY"
  },
  containedInPlace: { "@id": "https://www.tpkpark.com/#taman-perindustrian-kinrara" }
};

export const chooseInteriorProfiles = {
  en: {
    parentRoute: "homeLiving",
    eyebrow: "Choose Interior · Interior design & renovation",
    title: "Choose Interior at TPK Park.",
    description: "Find Choose Interior at No. 21-1, Jalan TPK 2/8, Puchong. Explore interior design and renovation, view project work and prepare for a design consultation.",
    lead: "Choose Interior adds interior design and renovation services to TPK Park’s Home & Living cluster. Its premises are at No. 21-1, Jalan TPK 2/8. Contact the team to discuss space planning, cabinetry, finishes and the practical details of a home or commercial interior.",
    image,
    heroImage: image,
    heroAlt: "A completed retail interior at KL East Mall from Choose Interior’s project portfolio",
    business: chooseInteriorBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "Connect the design with how the space works.", text: "Choose Interior’s published work includes commercial interiors, with services spanning design consultation, visualisation, detailing and project coordination. Its social portfolio also features kitchen and cabinetry ideas. Start by explaining how the space will be used, then discuss the layout, materials and work involved in bringing the design together.", image, alt: "A retail project by Choose Interior at KL East Mall, with framed shopfront panels, display lighting and carpet displays", route: "homeLiving", linkLabel: "Explore Home & Living" },
      { type: "cards", alignHeadings: true, kicker: "Before your consultation", title: "Give the design discussion a clear starting point.", items: [
        { number: "01", title: "Describe the space", text: "Bring a floor plan, approximate dimensions and photos of the existing interior. Explain who uses it, what needs to change and which furniture or fittings you want to keep. For a business, describe how customers and staff move through the space." },
        { number: "02", title: "Set the priorities", text: "Choose a few references and explain what you like about them: the layout, lighting, colours or materials. Share your budget range, storage needs and preferred completion date. Separate the essentials from the details that can be considered later." },
        { number: "03", title: "Confirm the scope", text: "Ask which drawings, material specifications and site services are included in the proposal. Clarify the quotation, payment stages, responsibility for approvals and how changes are agreed. Discuss installation, site coordination and handover before committing to the work." }
      ] },
      { type: "businessVisit", kicker: "Plan your consultation", title: "Find Choose Interior on Jalan TPK 2/8.", text: "The TPK Park premises are at No. 21-1. Arrange a meeting with the team before visiting.", addressLabel: "TPK Park address", address, phoneLabel: "Instagram enquiries", phoneDisplay: "@chooseinterior.cid", phoneUrl: instagram, note: "Message Choose Interior through its Instagram profile to confirm your meeting time, location and the materials or plans to bring.", links: [
        { label: "Find the address on Google Maps", url: directions },
        { label: "View Choose Interior’s project work", url: project }
      ] }
    ],
    cta: { title: "Start with your space and priorities.", text: "Share a short project brief with Choose Interior and arrange a conversation about the design and scope of work.", button: "Choose Interior on Instagram", url: instagram }
  },
  ms: {
    parentRoute: "homeLiving",
    eyebrow: "Choose Interior · Reka bentuk dalaman & pengubahsuaian",
    title: "Choose Interior di TPK Park.",
    description: "Cari Choose Interior di No. 21-1, Jalan TPK 2/8, Puchong. Terokai reka bentuk dalaman dan pengubahsuaian, lihat hasil projek dan sediakan maklumat konsultasi.",
    lead: "Choose Interior melengkapkan kluster Home & Living TPK Park dengan perkhidmatan reka bentuk dalaman dan pengubahsuaian. Premisnya terletak di No. 21-1, Jalan TPK 2/8. Hubungi pasukan untuk membincangkan perancangan ruang, kabinet, kemasan serta keperluan dalaman kediaman atau premis komersial.",
    image,
    heroImage: image,
    heroAlt: "Ruang dalaman kedai yang telah siap di KL East Mall daripada portfolio projek Choose Interior",
    business: chooseInteriorBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "Padankan reka bentuk dengan kegunaan ruang.", text: "Hasil kerja yang dikongsi oleh Choose Interior merangkumi ruang komersial, dengan perkhidmatan konsultasi reka bentuk, visualisasi, perincian dan penyelarasan projek. Portfolio media sosialnya turut menampilkan idea dapur dan kabinet. Mulakan dengan menerangkan kegunaan ruang, kemudian bincangkan susun atur, bahan dan kerja yang diperlukan untuk melaksanakan reka bentuk tersebut.", image, alt: "Projek kedai oleh Choose Interior di KL East Mall dengan panel hadapan berbingkai, lampu pameran dan paparan permaidani", route: "homeLiving", linkLabel: "Terokai Home & Living" },
      { type: "cards", alignHeadings: true, kicker: "Sebelum konsultasi", title: "Sediakan asas yang jelas untuk perbincangan.", items: [
        { number: "01", title: "Terangkan ruang anda", text: "Bawa pelan lantai, anggaran ukuran dan foto ruang dalaman sedia ada. Terangkan siapa yang menggunakannya, perkara yang perlu diubah serta perabot atau kelengkapan yang mahu dikekalkan. Untuk premis perniagaan, jelaskan laluan pergerakan pelanggan dan kakitangan." },
        { number: "02", title: "Tetapkan keutamaan", text: "Pilih beberapa rujukan dan terangkan ciri yang anda sukai, sama ada susun atur, pencahayaan, warna atau bahan. Kongsi julat bajet, keperluan penyimpanan dan tarikh siap yang diharapkan. Bezakan keperluan utama daripada butiran yang boleh dipertimbangkan kemudian." },
        { number: "03", title: "Sahkan skop kerja", text: "Tanya tentang lukisan, spesifikasi bahan dan perkhidmatan tapak yang termasuk dalam cadangan. Jelaskan sebut harga, peringkat bayaran, tanggungjawab mendapatkan kelulusan serta cara perubahan dipersetujui. Bincangkan pemasangan, penyelarasan tapak dan penyerahan sebelum meneruskan kerja." }
      ] },
      { type: "businessVisit", kicker: "Rancang konsultasi", title: "Cari Choose Interior di Jalan TPK 2/8.", text: "Premis TPK Park terletak di No. 21-1. Atur pertemuan dengan pasukan sebelum berkunjung.", addressLabel: "Alamat TPK Park", address, phoneLabel: "Pertanyaan melalui Instagram", phoneDisplay: "@chooseinterior.cid", phoneUrl: instagram, note: "Hantar mesej kepada Choose Interior melalui profil Instagram untuk mengesahkan masa pertemuan, lokasi serta bahan atau pelan yang perlu dibawa.", links: [
        { label: "Cari alamat di Google Maps", url: directions },
        { label: "Lihat hasil projek Choose Interior", url: project }
      ] }
    ],
    cta: { title: "Mulakan dengan ruang dan keutamaan anda.", text: "Kongsi ringkasan keperluan projek dengan Choose Interior dan atur perbincangan tentang reka bentuk serta skop kerja.", button: "Choose Interior di Instagram", url: instagram }
  },
  zh: {
    parentRoute: "homeLiving",
    eyebrow: "Choose Interior · 室内设计与装修",
    title: "TPK Park里的Choose Interior。",
    description: "Choose Interior位于蒲种TPK Park的21-1, Jalan TPK 2/8。了解室内设计与装修服务、查看项目作品，并准备设计咨询所需资料。",
    lead: "Choose Interior为TPK Park家居生活集群增添室内设计与装修服务，地址位于Jalan TPK 2/8的21-1号。可联系团队，讨论住宅或商业空间的布局、柜体、饰面及施工安排。",
    image,
    heroImage: image,
    heroAlt: "Choose Interior项目作品中的KL East Mall已完成零售店铺空间",
    business: chooseInteriorBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "让设计配合空间的实际用途。", text: "Choose Interior公开的作品包括商业空间，所列服务涵盖设计咨询、效果图、细节设计与项目协调。其社交平台也分享厨房和柜体设计。初次讨论时，可先说明空间的使用方式，再一起考虑布局、材料，以及落实设计所涉及的工程。", image, alt: "Choose Interior在KL East Mall的零售项目，展示带框饰面的店面、陈列灯光及地毯展示区", route: "homeLiving", linkLabel: "查看家居生活品牌" },
      { type: "cards", alignHeadings: true, kicker: "咨询之前", title: "先整理需求，让讨论更具体。", items: [
        { number: "01", title: "说明空间用途", text: "带上平面图、大致尺寸和现有室内照片。说明由谁使用空间、哪些地方需要改变，以及希望保留的家具或装置。如属商业项目，也可介绍顾客与员工的日常动线。" },
        { number: "02", title: "列出优先事项", text: "挑选几张参考图，并说明喜欢其中的布局、灯光、颜色或材料。分享预算范围、收纳需要和期望完成日期，再把必要项目与可稍后考虑的细节分开。" },
        { number: "03", title: "确认工作范围", text: "询问方案包含哪些图纸、材料规格及现场服务，并厘清报价、付款阶段、申请批准的责任和变更确认方式。决定施工前，先讨论安装、现场协调及完工交付安排。" }
      ] },
      { type: "businessVisit", kicker: "咨询安排", title: "在Jalan TPK 2/8找到Choose Interior。", text: "TPK Park地址为21-1号。到访前，请先与团队安排会面。", addressLabel: "TPK Park地址", address, phoneLabel: "Instagram咨询", phoneDisplay: "@chooseinterior.cid", phoneUrl: instagram, note: "可通过Choose Interior的Instagram主页发讯息，确认会面时间、地点，以及需要带上的材料或图纸。", links: [
        { label: "在Google Maps查看地址", url: directions },
        { label: "查看Choose Interior项目作品", url: project }
      ] }
    ],
    cta: { title: "从空间与需求开始。", text: "向Choose Interior提供简短的项目需求，再安排时间讨论设计方向与工作范围。", button: "前往Choose Interior的Instagram", url: instagram }
  }
};
