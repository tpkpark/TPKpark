// Public details and image provenance: docs/klot-profile-sources.md.
const website = "https://www.klot.com.my/";
const contact = "https://www.klot.com.my/pages/contact-us";
const catalogue = "https://www.klot.com.my/pages/catalog-1";
const directions = "https://maps.app.goo.gl/RaAZZQ97MP8wj574A";
const image = "https://www.tpkpark.com/assets/images/klot-kitchen-storage-1440.webp";
const imageSource = { label: "KLOT", url: website };
const address = "23-1, Jalan TPK 2/8, Taman Perindustrian Kinrara, Seksyen 2, 47180 Puchong, Selangor";

export const klotBusiness = {
  "@type": "HomeGoodsStore",
  "@id": "https://www.tpkpark.com/home-living/klot/#store",
  name: "KLOT",
  legalName: "KLOT Resources (M) Sdn. Bhd.",
  url: website,
  telephone: "+60183403828",
  address: {
    "@type": "PostalAddress",
    streetAddress: "23-1, Jalan TPK 2/8, Taman Perindustrian Kinrara, Seksyen 2",
    addressLocality: "Puchong",
    addressRegion: "Selangor",
    postalCode: "47180",
    addressCountry: "MY"
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:30", closes: "17:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "08:30", closes: "14:00" }
  ],
  containedInPlace: { "@id": "https://www.tpkpark.com/#taman-perindustrian-kinrara" }
};

export const klotProfiles = {
  en: {
    parentRoute: "homeLiving",
    eyebrow: "KLOT · Cabinet hardware & storage fittings",
    title: "KLOT at TPK Park.",
    description: "Explore KLOT Puchong for cabinet hardware, kitchen storage and wardrobe fittings. Find its Jalan TPK 2/8 showroom, contact, hours and directions.",
    lead: "KLOT’s showroom on Jalan TPK 2/8 focuses on furniture hardware and storage fittings for kitchens and wardrobes. Within TPK Park’s Home & Living cluster, it offers a place to consider the details inside cabinetry, from drawers and baskets to integrated lighting.",
    image,
    heroImage: image,
    heroAlt: "KLOT kitchen storage drawers holding tableware and cookware",
    business: klotBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "Plan the fittings around daily use.", text: "KLOT’s range includes Slim Box drawer systems, Aluline kitchen storage, wardrobe organisers and furniture LED lighting. Start with what you need to store and how you want to reach it. Comparing the fittings alongside your cabinet plans can help you discuss usable space, opening clearances and installation requirements with your cabinet maker.", image, alt: "Open KLOT kitchen storage drawers with separate spaces for utensils, dishes and pots", route: "homeLiving", linkLabel: "Explore Home & Living" },
      { type: "cards", alignHeadings: true, kicker: "Before you choose", title: "Match the fittings to the cabinet.", items: [
        { number: "01", title: "Measure the inside", text: "Bring the cabinet’s internal width, depth and height, with photos or drawings showing hinges, shelves and pipework. For new cabinetry, share the proposed layout so the fitting dimensions can be checked before fabrication." },
        { number: "02", title: "Try the movement", text: "Ask to see the mechanisms available on display. Consider how far a drawer opens, how easily you can reach a basket and what you plan to store. Check the model’s load limits, finishes and care requirements with the team." },
        { number: "03", title: "Agree the installation", text: "Confirm product codes, dimensions and required clearances with your cabinet maker. Ask who will supply and install the fittings, and clarify delivery, adjustment, replacement parts and warranty terms before ordering." }
      ] },
      { type: "businessVisit", kicker: "Plan your visit", title: "Find KLOT on Jalan TPK 2/8.", text: "KLOT is at 23-1.", addressLabel: "Showroom address", address, phoneLabel: "KLOT enquiries", phoneDisplay: "+60 18 340 3828", note: "Published hours are Monday–Friday, 8:30am–5:30pm, and Saturday, 8:30am–2pm. Closed on Sunday. Confirm holiday hours and the fittings available to view before visiting.", links: [
        { label: "Directions on Google Maps", url: directions },
        { label: "KLOT contact details", url: contact }
      ] }
    ],
    cta: { title: "Bring your cabinet plans.", text: "Browse KLOT’s catalogue, note the fittings you are considering and contact the team to prepare for your visit.", button: "Browse KLOT’s catalogue", url: catalogue }
  },
  ms: {
    parentRoute: "homeLiving",
    eyebrow: "KLOT · Kelengkapan kabinet & sistem penyimpanan",
    title: "KLOT di TPK Park.",
    description: "Terokai kelengkapan kabinet, sistem penyimpanan dapur dan almari di KLOT Puchong. Lihat alamat Jalan TPK 2/8, telefon, waktu operasi dan arah perjalanan.",
    lead: "Bilik pameran KLOT di Jalan TPK 2/8 menumpukan kelengkapan perabot dan sistem penyimpanan untuk dapur serta almari pakaian. Sebagai sebahagian daripada kluster Home & Living TPK Park, ia menawarkan pilihan untuk melengkapkan bahagian dalam kabinet, daripada laci dan bakul hingga pencahayaan bersepadu.",
    image,
    heroImage: image,
    heroAlt: "Laci penyimpanan dapur KLOT dengan pinggan mangkuk dan peralatan memasak",
    business: klotBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "Rancang kelengkapan mengikut kegunaan harian.", text: "Rangkaian KLOT merangkumi sistem laci Slim Box, penyimpanan dapur Aluline, penyusun almari pakaian dan pencahayaan LED perabot. Mulakan dengan barang yang perlu disimpan dan cara anda mahu mencapainya. Bandingkan kelengkapan dengan pelan kabinet untuk membincangkan ruang yang boleh digunakan, ruang bukaan serta keperluan pemasangan bersama pembuat kabinet.", image, alt: "Laci dapur KLOT yang terbuka dengan ruang berasingan untuk kutleri, pinggan dan periuk", route: "homeLiving", linkLabel: "Terokai Home & Living" },
      { type: "cards", alignHeadings: true, kicker: "Sebelum memilih", title: "Padankan kelengkapan dengan kabinet.", items: [
        { number: "01", title: "Ukur ruang dalaman", text: "Bawa ukuran lebar, kedalaman dan tinggi bahagian dalam kabinet, berserta foto atau lukisan yang menunjukkan engsel, rak dan paip. Untuk kabinet baharu, kongsikan pelan cadangan supaya saiz kelengkapan dapat disemak sebelum kabinet dibuat." },
        { number: "02", title: "Cuba mekanismenya", text: "Tanya tentang mekanisme yang tersedia untuk dilihat. Pertimbangkan sejauh mana laci terbuka, kemudahan mencapai bakul dan barang yang ingin disimpan. Semak had beban model, kemasan dan keperluan penjagaan dengan pasukan KLOT." },
        { number: "03", title: "Tetapkan urusan pemasangan", text: "Sahkan kod produk, ukuran dan ruang kelegaan yang diperlukan bersama pembuat kabinet. Tanya siapa yang membekal dan memasang kelengkapan, serta jelaskan urusan penghantaran, pelarasan, alat ganti dan syarat jaminan sebelum membuat pesanan." }
      ] },
      { type: "businessVisit", kicker: "Rancang lawatan", title: "Cari KLOT di Jalan TPK 2/8.", text: "KLOT terletak di 23-1.", addressLabel: "Alamat bilik pameran", address, phoneLabel: "Pertanyaan KLOT", phoneDisplay: "+60 18 340 3828", note: "Waktu operasi yang disenaraikan ialah Isnin–Jumaat, 8:30 pagi–5:30 petang, dan Sabtu, 8:30 pagi–2 petang. Tutup pada hari Ahad. Sahkan waktu cuti umum dan kelengkapan yang tersedia untuk dilihat sebelum berkunjung.", links: [
        { label: "Arah melalui Google Maps", url: directions },
        { label: "Maklumat hubungan KLOT", url: contact }
      ] }
    ],
    cta: { title: "Bawa pelan kabinet anda.", text: "Lihat katalog KLOT, catat kelengkapan yang anda pertimbangkan dan hubungi pasukan untuk membuat persediaan lawatan.", button: "Lihat katalog KLOT", url: catalogue }
  },
  zh: {
    parentRoute: "homeLiving",
    eyebrow: "KLOT · 橱柜五金与收纳配件",
    title: "TPK Park里的KLOT。",
    description: "到TPK Park的KLOT蒲种展厅了解橱柜五金、厨房收纳及衣柜配件。查看Jalan TPK 2/8地址、电话、营业时间、导航路线与选购建议。",
    lead: "KLOT展厅位于金銮工业园Jalan TPK 2/8，专注于家具五金、厨房与衣柜收纳配件。从抽屉、拉篮到柜内照明，这里为TPK Park家居生活集群增添了橱柜内部配置的选购方向。",
    image,
    heroImage: image,
    heroAlt: "KLOT厨房收纳抽屉，分别摆放餐具与锅具",
    business: klotBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "从日常使用习惯规划柜内配置。", text: "KLOT的产品包括Slim Box抽屉系统、Aluline厨房收纳、衣柜整理配件及家具LED照明。可以先列出需要收纳的物品，再考虑拿取方式。把配件与橱柜图纸一起比较，有助于与橱柜师傅讨论可用空间、开合余量及安装要求。", image, alt: "打开的KLOT厨房抽屉，设有摆放刀叉、碗盘与锅具的独立空间", route: "homeLiving", linkLabel: "查看家居生活品牌" },
      { type: "cards", alignHeadings: true, kicker: "选购之前", title: "让配件与柜体相配合。", items: [
        { number: "01", title: "量好柜内尺寸", text: "带上柜体内部的宽度、深度及高度，并用照片或图纸标出铰链、层板和水管的位置。如果准备制作新柜体，可先提供设计图，在制作前核对配件所需尺寸。" },
        { number: "02", title: "试试开合与拿取", text: "询问现场有哪些机构可以查看，比较抽屉能拉出多远、拉篮是否容易拿取，以及是否适合准备收纳的物品。向团队确认型号的承重限制、饰面与保养要求。" },
        { number: "03", title: "确认安装安排", text: "与橱柜师傅核对产品编号、尺寸和所需的安装余量。下单前，确认由谁供应及安装，并了解送货、调校、替换零件与保修条款。" }
      ] },
      { type: "businessVisit", kicker: "到访安排", title: "在Jalan TPK 2/8找到KLOT。", text: "KLOT位于23-1号。", addressLabel: "展厅地址", address, phoneLabel: "联系KLOT", phoneDisplay: "+60 18 340 3828", note: "公布的营业时间为星期一至五上午8:30至下午5:30，星期六上午8:30至下午2时，星期日休息。公共假期时间及现场可查看的配件，请在出发前确认。", links: [
        { label: "使用Google Maps导航", url: directions },
        { label: "KLOT联系方式", url: contact }
      ] }
    ],
    cta: { title: "带着橱柜图纸到访。", text: "先浏览KLOT产品目录，记下正在考虑的配件，再联系团队做好到访准备。", button: "浏览KLOT产品目录", url: catalogue }
  }
};
