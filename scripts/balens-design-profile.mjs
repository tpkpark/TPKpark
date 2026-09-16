// Public details and editorial boundaries: docs/balens-design-profile-sources.md.
const website = "https://balensdesign.com/";
const contact = "https://balensdesign.com/contact-us";
const projects = "https://balensdesign.com/projects";
const directions = "https://www.google.com/maps/dir/?api=1&destination=Balens+Design%2C+25-1%2C+Jalan+TPK+2%2F8%2C+47180+Puchong%2C+Selangor";
// Project image from Balens Design’s official Sculpted Volume Residence portfolio.
const image = "https://www.tpkpark.com/assets/images/balens-sculpted-volume-1440.webp";
const imageSource = { label: "Balens Design", url: "https://balensdesign.com/project/sculpted-volume-residence" };
const address = "25-1, Jalan TPK 2/8, Taman Perindustrian Kinrara, 47180 Puchong, Selangor";

export const balensDesignBusiness = {
  "@type": "LocalBusiness",
  "@id": "https://www.tpkpark.com/home-living/balens-design/#business",
  name: "Balens Design",
  url: website,
  telephone: "+60173388535",
  address: {
    "@type": "PostalAddress",
    streetAddress: "25-1, Jalan TPK 2/8, Taman Perindustrian Kinrara",
    addressLocality: "Puchong",
    addressRegion: "Selangor",
    postalCode: "47180",
    addressCountry: "MY"
  },
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00"
  }],
  containedInPlace: { "@id": "https://www.tpkpark.com/#taman-perindustrian-kinrara" }
};

export const balensDesignProfiles = {
  en: {
    parentRoute: "homeLiving",
    eyebrow: "Balens Design · Interior design & renovation",
    title: "Balens Design at TPK Park.",
    description: "Plan an interior design consultation with Balens Design in Puchong. Find its Jalan TPK 2/8 office, contact, weekday hours and weekend appointment details.",
    lead: "Balens Design is an interior design and renovation practice on Jalan TPK 2/8 in Taman Perindustrian Kinrara. Its focus on landed homes adds design and project planning to TPK Park’s Home & Living cluster.",
    image,
    heroImage: image,
    heroAlt: "Double-height living and dining space in Balens Design’s Sculpted Volume Residence project in Kinrara",
    business: balensDesignBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "Start with how you use your home.", text: "Balens Design’s services cover interior design, house renovation, space planning and refurbishment. A useful first conversation starts with what you want to change: a cramped kitchen, limited storage, or rooms that no longer suit your daily routine. Browse the team’s completed projects, then bring a floor plan and a few references to discuss your priorities.", image, alt: "Double-height living and dining space in Balens Design’s Sculpted Volume Residence project in Kinrara", route: "homeLiving", linkLabel: "Explore Home & Living" },
      { type: "cards", alignHeadings: true, kicker: "Before your consultation", title: "Turn your ideas into a clear brief.", items: [
        { number: "01", title: "Bring the floor plan", text: "Bring the available plans, room measurements and photos of the existing space. Mark the furniture you want to keep and the parts of the home that need to work differently. A few useful references are enough to start the discussion." },
        { number: "02", title: "Set your priorities", text: "List what is essential, what can wait and the budget range you have in mind. Explain who uses each room, your storage needs and your preferred timing. Ask how the proposed layout responds to those needs." },
        { number: "03", title: "Clarify the scope", text: "Ask what the design and renovation quotation includes, which drawings and materials will be specified, and how changes are handled. Discuss the work sequence, payment stages, site coordination and handover before agreeing to proceed." }
      ] },
      { type: "businessVisit", kicker: "Plan your consultation", title: "Find Balens Design on Jalan TPK 2/8.", text: "The office is at 25-1. Contact the team to arrange a consultation.", addressLabel: "Office address", address, phoneLabel: "Balens Design enquiries", phoneDisplay: "+60 17 338 8535", note: "Published office hours are Monday–Friday, 9am–6pm. Saturdays, Sundays and public holidays are by appointment only. Confirm your meeting time before travelling.", links: [
        { label: "Directions on Google Maps", url: directions },
        { label: "Balens Design contact details", url: contact },
        { label: "Browse Balens Design’s projects", url: projects }
      ] }
    ],
    cta: { title: "Bring your plans into the conversation.", text: "Share your floor plan, priorities and proposed timing with Balens Design to arrange a discussion about your home.", button: "Contact Balens Design", url: contact }
  },
  ms: {
    parentRoute: "homeLiving",
    eyebrow: "Balens Design · Reka bentuk dalaman & pengubahsuaian",
    title: "Balens Design di TPK Park.",
    description: "Rancang konsultasi reka bentuk dalaman dengan Balens Design Puchong. Lihat alamat Jalan TPK 2/8, telefon, waktu pejabat dan janji temu hujung minggu.",
    lead: "Balens Design ialah firma reka bentuk dalaman dan pengubahsuaian di Jalan TPK 2/8, Taman Perindustrian Kinrara. Tumpuannya pada rumah bertanah melengkapkan kluster Home & Living TPK Park dengan khidmat reka bentuk dan perancangan projek.",
    image,
    heroImage: image,
    heroAlt: "Ruang tamu bersiling tinggi dan ruang makan dalam projek Sculpted Volume Residence oleh Balens Design di Kinrara",
    business: balensDesignBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "Mulakan dengan kegunaan ruang di rumah.", text: "Perkhidmatan Balens Design merangkumi reka bentuk dalaman, pengubahsuaian rumah, perancangan ruang dan kerja baik pulih. Mulakan perbincangan dengan perkara yang ingin diubah: dapur yang sempit, ruang simpanan terhad atau bilik yang tidak lagi sesuai dengan rutin harian. Lihat projek yang telah disiapkan, kemudian bawa pelan lantai dan beberapa rujukan untuk membincangkan keutamaan anda.", image, alt: "Ruang tamu bersiling tinggi dan ruang makan dalam projek Sculpted Volume Residence oleh Balens Design di Kinrara", route: "homeLiving", linkLabel: "Terokai Home & Living" },
      { type: "cards", alignHeadings: true, kicker: "Sebelum konsultasi", title: "Jelaskan idea dan keperluan anda.", items: [
        { number: "01", title: "Bawa pelan lantai", text: "Bawa pelan yang tersedia, ukuran bilik dan foto ruang sedia ada. Tandakan perabot yang ingin dikekalkan serta bahagian rumah yang perlu diubah. Beberapa contoh rujukan yang sesuai sudah memadai untuk memulakan perbincangan." },
        { number: "02", title: "Tetapkan keutamaan", text: "Senaraikan keperluan utama, perkara yang boleh ditangguhkan dan julat bajet anda. Terangkan siapa yang menggunakan setiap ruang, keperluan simpanan dan jangka masa pilihan. Tanya bagaimana susun atur yang dicadangkan memenuhi keperluan tersebut." },
        { number: "03", title: "Perjelas skop kerja", text: "Tanya apa yang termasuk dalam sebut harga reka bentuk dan pengubahsuaian, lukisan serta bahan yang akan diperincikan, dan cara perubahan diuruskan. Bincangkan urutan kerja, peringkat bayaran, penyelarasan tapak dan penyerahan sebelum bersetuju untuk meneruskan." }
      ] },
      { type: "businessVisit", kicker: "Rancang konsultasi", title: "Cari Balens Design di Jalan TPK 2/8.", text: "Pejabat terletak di 25-1. Hubungi pasukan untuk mengatur konsultasi.", addressLabel: "Alamat pejabat", address, phoneLabel: "Pertanyaan Balens Design", phoneDisplay: "+60 17 338 8535", note: "Waktu pejabat yang disenaraikan ialah Isnin–Jumaat, 9 pagi–6 petang. Sabtu, Ahad dan cuti umum adalah melalui janji temu sahaja. Sahkan waktu pertemuan sebelum berkunjung.", links: [
        { label: "Arah melalui Google Maps", url: directions },
        { label: "Maklumat hubungan Balens Design", url: contact },
        { label: "Lihat projek Balens Design", url: projects }
      ] }
    ],
    cta: { title: "Bawa pelan untuk dibincangkan.", text: "Kongsi pelan lantai, keutamaan dan jangka masa anda dengan Balens Design untuk mengatur perbincangan tentang rumah anda.", button: "Hubungi Balens Design", url: contact }
  },
  zh: {
    parentRoute: "homeLiving",
    eyebrow: "Balens Design · 室内设计与装修",
    title: "TPK Park里的Balens Design。",
    description: "到蒲种金銮工业园的Balens Design咨询室内设计与住宅装修。查看Jalan TPK 2/8办公地址、电话、平日办公时间及周末预约安排。",
    lead: "Balens Design是一家位于金銮工业园Jalan TPK 2/8的室内设计与装修公司，专注于有地住宅，为TPK Park家居生活集群增添设计与项目规划服务。",
    image,
    heroImage: image,
    heroAlt: "Balens Design位于金銮的Sculpted Volume Residence项目，展示挑高客厅与餐厅空间",
    business: balensDesignBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "先想清楚，家要怎样用。", text: "Balens Design的服务涵盖室内设计、住宅装修、空间规划与翻新。首次沟通可以从想改善的问题开始：厨房太挤、收纳不足，或房间已不适合现在的生活方式。先浏览团队已完成的项目，再带上平面图与几张参考图片，讨论自己的实际需求。", image, alt: "Balens Design位于金銮的Sculpted Volume Residence项目，展示挑高客厅与餐厅空间", route: "homeLiving", linkLabel: "查看家居生活品牌" },
      { type: "cards", alignHeadings: true, kicker: "咨询之前", title: "把想法整理成清楚的需求。", items: [
        { number: "01", title: "带上住宅平面图", text: "准备现有图纸、房间尺寸及空间照片，标出想保留的家具，以及希望改变使用方式的区域。挑选几张有参考价值的图片，就能帮助设计师理解你的想法。" },
        { number: "02", title: "确定需求与优先次序", text: "列出必须完成、可以延后的事项及预算范围，说明每个空间的使用者、收纳需求与期望时间。请设计师解释所建议的布局如何回应这些需求。" },
        { number: "03", title: "厘清设计与施工范围", text: "了解设计及装修报价包含哪些项目、会提供哪些图纸与材料规格，以及变更如何处理。在决定合作前，讨论施工顺序、付款阶段、现场协调与完工交付安排。" }
      ] },
      { type: "businessVisit", kicker: "预约咨询", title: "在Jalan TPK 2/8找到Balens Design。", text: "办公室位于25-1号，可直接联系团队安排咨询。", addressLabel: "办公地址", address, phoneLabel: "联系Balens Design", phoneDisplay: "+60 17 338 8535", note: "公布的办公时间为星期一至五，上午9时至下午6时。星期六、星期日及公共假期仅接受预约，请在出发前确认会面时间。", links: [
        { label: "使用Google Maps导航", url: directions },
        { label: "Balens Design联系资料", url: contact },
        { label: "浏览Balens Design项目", url: projects }
      ] }
    ],
    cta: { title: "带着平面图，开始讨论。", text: "向Balens Design说明平面布局、优先需求与期望时间，安排一次关于住宅设计的沟通。", button: "联系Balens Design", url: contact }
  }
};
