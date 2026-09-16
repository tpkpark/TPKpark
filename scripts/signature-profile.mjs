// Public details and image provenance: docs/signature-profile-sources.md.
const website = "https://signature.my/";
const showrooms = "https://signature.my/locate-a-showroom/";
const kitchens = "https://signature.my/kitchens/";
const wardrobes = "https://signature.my/wardrobes/";
const directions = "https://maps.app.goo.gl/4SZVDi8fQY6deuf97";
const image = "https://www.tpkpark.com/assets/images/signature-kitchen-island-1000.webp";
const imageSource = { label: "Signature", url: kitchens };
const address = "9, Jalan TPK 2/8, Taman Perindustrian Kinrara, 47180 Puchong, Selangor";

export const signatureBusiness = {
  "@type": "HomeGoodsStore",
  "@id": "https://www.tpkpark.com/home-living/signature/#store",
  name: "Signature Bandar Kinrara",
  alternateName: "Signature",
  url: website,
  telephone: "+60168133182",
  hasMap: directions,
  address: {
    "@type": "PostalAddress",
    streetAddress: "9, Jalan TPK 2/8, Taman Perindustrian Kinrara",
    addressLocality: "Puchong",
    addressRegion: "Selangor",
    postalCode: "47180",
    addressCountry: "MY"
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:00", closes: "19:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday"], opens: "10:00", closes: "18:00" }
  ],
  containedInPlace: { "@id": "https://www.tpkpark.com/#taman-perindustrian-kinrara" }
};

export const signatureProfiles = {
  en: {
    parentRoute: "homeLiving",
    eyebrow: "Signature · Kitchens & wardrobes",
    title: "Signature at TPK Park.",
    description: "Visit Signature Bandar Kinrara at No. 9, Jalan TPK 2/8, Puchong. Find the showroom phone, opening hours and directions, with advice on planning kitchens and wardrobes.",
    lead: "Signature’s Bandar Kinrara showroom is at No. 9, Jalan TPK 2/8, within TPK Park’s Home & Living cluster. Visit to discuss kitchen cabinets, wardrobes and storage ideas for a new home or renovation.",
    image,
    heroImage: image,
    heroAlt: "Signature kitchen design with dark cabinetry, a white worktop and an island with two stools",
    business: signatureBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "Plan storage around everyday life.", text: "Signature’s range includes custom kitchen cabinets and wardrobes, with different layouts, door finishes and storage fittings. Think about how you cook, what you keep within reach and how much hanging or drawer space you need. Bring those priorities to the showroom, then ask which materials, cabinet systems and wardrobe options are available to compare.", image, alt: "An island kitchen design from Signature, with dark cabinet fronts and a bright worktop", caption: "Kitchen design from Signature’s official range. Image:", captionSource: imageSource, route: "homeLiving", linkLabel: "Explore Home & Living" },
      { type: "cards", alignHeadings: true, kicker: "Before you choose", title: "Turn your room plans into a clear brief.", items: [
        { number: "01", title: "Bring your floor plan", text: "Take room photos and a plan with approximate dimensions. Mark doors, windows, water points and sockets, and bring the dimensions of any appliances you intend to keep. Explain which parts of the existing layout work well and what you would like to change." },
        { number: "02", title: "Compare daily use", text: "Look at cabinet finishes beside your flooring or wall colours. Try the drawers and storage fittings on display, and discuss worktop space, door clearance and access to frequently used items. For wardrobes, consider the balance of hanging space, shelves and drawers." },
        { number: "03", title: "Agree the full scope", text: "Ask for an itemised quotation covering cabinets, worktops, fittings and installation. Clarify whether appliances, plumbing, wiring and removal of existing cabinets are included. Confirm site measurements, installation timing, care instructions and warranty terms before approving the order." }
      ] },
      { type: "businessVisit", kicker: "Plan your visit", title: "Find Signature on Jalan TPK 2/8.", text: "The Bandar Kinrara showroom is at No. 9.", addressLabel: "Bandar Kinrara showroom address", address, phoneLabel: "Signature Bandar Kinrara enquiries", phoneDisplay: "+60 16 813 3182", note: "Published hours are Monday–Saturday, 10am–7pm, and Sunday and public holidays, 10am–6pm. Call the branch to arrange a design discussion and confirm which displays you would like to see.", links: [
        { label: "Directions on Google Maps", url: directions },
        { label: "Signature showroom directory", url: showrooms },
        { label: "Explore Signature wardrobes", url: wardrobes }
      ] }
    ],
    cta: { title: "Start with a kitchen you can picture.", text: "Browse Signature’s kitchen layouts and save a few references to discuss alongside your floor plan.", button: "Explore Signature kitchens", url: kitchens }
  },
  ms: {
    parentRoute: "homeLiving",
    eyebrow: "Signature · Dapur & almari pakaian",
    title: "Signature di TPK Park.",
    description: "Kunjungi Signature Bandar Kinrara di No. 9, Jalan TPK 2/8, Puchong. Lihat telefon, waktu operasi, arah perjalanan dan panduan merancang dapur serta almari pakaian.",
    lead: "Bilik pameran Signature Bandar Kinrara terletak di No. 9, Jalan TPK 2/8, dalam kluster Home & Living TPK Park. Singgah untuk membincangkan kabinet dapur, almari pakaian dan idea penyimpanan bagi rumah baharu atau projek pengubahsuaian.",
    image,
    heroImage: image,
    heroAlt: "Reka bentuk dapur Signature dengan kabinet gelap, permukaan kerja putih dan pulau dapur bersama dua bangku",
    business: signatureBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "Rancang penyimpanan mengikut rutin harian.", text: "Rangkaian Signature merangkumi kabinet dapur dan almari pakaian tempahan khas, dengan pelbagai susun atur, kemasan pintu dan kelengkapan penyimpanan. Fikirkan cara anda memasak, barang yang perlu mudah dicapai serta ruang gantungan atau laci yang diperlukan. Bincangkan keutamaan ini di bilik pameran, kemudian tanya tentang bahan, sistem kabinet dan pilihan almari pakaian yang boleh dibandingkan.", image, alt: "Reka bentuk dapur berpulau daripada Signature, dengan muka kabinet gelap dan permukaan kerja cerah", caption: "Reka bentuk dapur daripada rangkaian rasmi Signature. Imej:", captionSource: imageSource, route: "homeLiving", linkLabel: "Terokai Home & Living" },
      { type: "cards", alignHeadings: true, kicker: "Sebelum memilih", title: "Sediakan maklumat ruang untuk perbincangan.", items: [
        { number: "01", title: "Bawa pelan lantai", text: "Bawa foto ruang dan pelan dengan anggaran ukuran. Tandakan pintu, tingkap, saluran air dan soket, serta catat dimensi peralatan elektrik yang mahu dikekalkan. Terangkan bahagian susun atur sedia ada yang sesuai dan perkara yang ingin diubah." },
        { number: "02", title: "Cuba kegunaan harian", text: "Bandingkan kemasan kabinet dengan warna lantai atau dinding. Cuba laci dan kelengkapan penyimpanan yang dipamerkan, kemudian bincangkan ruang kerja, ruang bukaan pintu dan akses kepada barang yang kerap digunakan. Untuk almari pakaian, pertimbangkan pembahagian ruang gantungan, rak dan laci." },
        { number: "03", title: "Persetujui skop penuh", text: "Minta sebut harga terperinci untuk kabinet, permukaan kerja, kelengkapan dan pemasangan. Sahkan sama ada peralatan elektrik, kerja paip, pendawaian dan penanggalan kabinet lama termasuk dalam harga. Persetujui ukuran tapak, jadual pemasangan, cara penjagaan dan syarat jaminan sebelum meluluskan tempahan." }
      ] },
      { type: "businessVisit", kicker: "Rancang lawatan", title: "Cari Signature di Jalan TPK 2/8.", text: "Bilik pameran Bandar Kinrara terletak di No. 9.", addressLabel: "Alamat bilik pameran Bandar Kinrara", address, phoneLabel: "Pertanyaan Signature Bandar Kinrara", phoneDisplay: "+60 16 813 3182", note: "Waktu operasi yang disenaraikan ialah Isnin–Sabtu, 10 pagi–7 petang, serta Ahad dan cuti umum, 10 pagi–6 petang. Hubungi cawangan untuk mengatur perbincangan reka bentuk dan mengesahkan pilihan yang ingin dilihat.", links: [
        { label: "Arah melalui Google Maps", url: directions },
        { label: "Direktori bilik pameran Signature", url: showrooms },
        { label: "Terokai almari pakaian Signature", url: wardrobes }
      ] }
    ],
    cta: { title: "Mulakan dengan idea dapur anda.", text: "Lihat susun atur dapur Signature dan simpan beberapa rujukan untuk dibincangkan bersama pelan lantai anda.", button: "Terokai dapur Signature", url: kitchens }
  },
  zh: {
    parentRoute: "homeLiving",
    eyebrow: "Signature · 厨房与衣柜",
    title: "TPK Park里的Signature。",
    description: "Signature Bandar Kinrara展厅位于蒲种TPK Park的9, Jalan TPK 2/8。查看分店电话、营业时间、导航，以及规划厨房橱柜与衣柜的到访建议。",
    lead: "Signature的Bandar Kinrara展厅位于Jalan TPK 2/8的9号，是TPK Park家居生活集群中的厨房与衣柜品牌。准备装修新家或更新现有空间时，可到店讨论橱柜、衣柜及收纳安排。",
    image,
    heroImage: image,
    heroAlt: "Signature厨房设计，采用深色橱柜、白色台面及配有两张吧椅的中岛",
    business: signatureBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "按日常习惯规划收纳。", text: "Signature的产品系列包括定制厨房橱柜与衣柜，提供不同布局、柜门饰面及收纳配件。先想想平时如何备餐、哪些物品需要随手拿取，以及需要多少挂衣或抽屉空间。带着这些重点到展厅讨论，再询问有哪些材料、橱柜系统与衣柜选项可供比较。", image, alt: "Signature的中岛厨房设计，深色柜门搭配浅色工作台面", caption: "Signature官方产品系列中的厨房设计。图片来源：", captionSource: imageSource, route: "homeLiving", linkLabel: "查看家居生活品牌" },
      { type: "cards", alignHeadings: true, kicker: "选购之前", title: "把空间资料变成清楚的设计需求。", items: [
        { number: "01", title: "带上平面图", text: "准备房间照片与标有大致尺寸的平面图，注明门窗、水管接口及插座位置。如打算保留现有电器，也带上各件电器的尺寸。说明目前布局中好用的地方，以及希望改善的部分。" },
        { number: "02", title: "试试日常使用", text: "把柜门饰面与地板或墙面颜色一起比较，试用展示中的抽屉及收纳配件。讨论台面空间、柜门开启范围，以及常用物品是否容易拿取。规划衣柜时，可按需要分配挂衣、层板与抽屉的比例。" },
        { number: "03", title: "确认完整范围", text: "请对方分别列出柜体、台面、配件与安装费用，并确认电器、水管、电线工程及旧柜拆除是否包含在内。批准订单前，核实现场尺寸、安装时间、清洁保养方法与保修条款。" }
      ] },
      { type: "businessVisit", kicker: "到访安排", title: "在Jalan TPK 2/8找到Signature。", text: "Bandar Kinrara展厅位于9号。", addressLabel: "Bandar Kinrara展厅地址", address, phoneLabel: "Signature Bandar Kinrara咨询电话", phoneDisplay: "+60 16 813 3182", note: "公布的营业时间为星期一至星期六，上午10时至晚上7时；星期日及公共假期为上午10时至下午6时。可先致电分店安排设计讨论，并确认想看的展示项目。", links: [
        { label: "使用Google Maps导航", url: directions },
        { label: "Signature展厅目录", url: showrooms },
        { label: "浏览Signature衣柜", url: wardrobes }
      ] }
    ],
    cta: { title: "从心中的厨房样式开始。", text: "先浏览Signature的厨房布局，保存几款参考设计，再带上平面图到店讨论。", button: "浏览Signature厨房", url: kitchens }
  }
};
