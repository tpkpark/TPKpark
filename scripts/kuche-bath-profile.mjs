// Public branch details and image provenance: docs/kuche-bath-profile-sources.md.
const website = "https://kbomy.com/";
const contact = "https://kbomy.com/contact-us/";
const directions = "https://maps.app.goo.gl/GVQyy6omJkKiJu7VA";
const image = "https://www.tpkpark.com/assets/images/kuche-bath-puchong-1440.webp";
const imageSource = { label: "KBO", url: website };
const address = "39G, Jalan TPK 2/8, Taman Perindustrian Kinrara, 47180 Puchong, Selangor";

export const kucheBathBusiness = {
  "@type": "HomeGoodsStore",
  "@id": "https://www.tpkpark.com/home-living/kuche-bath/#store",
  name: "Kuche + BaTH (KBO Puchong)",
  alternateName: ["KBO Puchong", "Kuche Bath Outlet Puchong"],
  url: website,
  telephone: "+60380791268",
  image,
  address: {
    "@type": "PostalAddress",
    streetAddress: "39G, Jalan TPK 2/8, Taman Perindustrian Kinrara",
    addressLocality: "Puchong",
    addressRegion: "Selangor",
    postalCode: "47180",
    addressCountry: "MY"
  },
  containedInPlace: { "@id": "https://www.tpkpark.com/#taman-perindustrian-kinrara" }
};

export const kucheBathProfiles = {
  en: {
    parentRoute: "homeLiving",
    eyebrow: "KBO Puchong · Kitchen & bathroom",
    title: "Kuche + BaTH at TPK Park.",
    description: "Visit Kuche + BaTH (KBO) Puchong for kitchen appliances and bathroom fittings. Find the Jalan TPK 2/8 showroom, branch phone, directions and visiting tips.",
    lead: "Kuche + BaTH, also known as KBO or Kuche Bath Outlet, is a kitchen and bathroom showroom on Jalan TPK 2/8 in Taman Perindustrian Kinrara. It is part of TPK Park’s Home & Living cluster.",
    image,
    heroAlt: "Kuche + BaTH Outlet signage and Puchong showroom frontage",
    business: kucheBathBusiness,
    datePublished: "2026-09-15",
    blocks: [
      { type: "split", title: "Choose around everyday routines.", text: "KBO’s catalogue includes cooker hoods, hobs and ovens, kitchen sinks and taps, as well as bathroom basins, showers, toilets and vanity cabinets. Start with how you use the space: cooking, washing up or getting ready in the morning. A shortlist can help you compare the dimensions, controls and finishes that matter to you. Ask the Puchong team which models are available to view.", image, alt: "Kuche + BaTH Outlet storefront in Puchong, from KBO’s website banner", route: "homeLiving", linkLabel: "Explore Home & Living" },
      { type: "cards", alignHeadings: true, kicker: "Before you choose", title: "Match the products to your plans.", items: [
        { number: "01", title: "Check appliance sizes", text: "Bring your kitchen layout, cabinet dimensions and model numbers of appliances you are keeping. Before ordering, ask your installer to confirm the space, worktop openings, ventilation and connections required for your shortlist." },
        { number: "02", title: "Check bathroom fit", text: "Bring bathroom measurements and photos of the existing basin, shower or toilet if you are replacing them. Compare fittings and finishes, then have your installer check pipe positions and mounting requirements before you commit." },
        { number: "03", title: "Confirm the full order", text: "Ask for a quotation with model codes, quantities and included accessories. Confirm stock, delivery timing, installation scope and warranty terms, and keep these details with your renovation schedule." }
      ] },
      { type: "businessVisit", kicker: "Plan your visit", title: "Find KBO on Jalan TPK 2/8.", text: "Head to No. 39G for the Puchong showroom.", addressLabel: "Showroom address", address, phoneLabel: "KBO Puchong enquiries", phoneDisplay: "+60 3 8079 1268", note: "Confirm opening hours and the products you want to see directly with the branch. Follow local parking signs and keep entrances and loading areas clear.", links: [
        { label: "Directions on Google Maps", url: directions },
        { label: "KBO contact details", url: contact }
      ] }
    ],
    cta: { title: "Bring a shortlist and a plan.", text: "Browse KBO’s range, note the models that interest you and contact the Puchong showroom to plan your visit.", button: "Visit KBO’s website", url: website }
  },
  ms: {
    parentRoute: "homeLiving",
    eyebrow: "KBO Puchong · Dapur & bilik mandi",
    title: "Kuche + BaTH di TPK Park.",
    description: "Kunjungi Kuche + BaTH (KBO) Puchong untuk perkakas dapur dan kelengkapan bilik mandi. Lihat alamat Jalan TPK 2/8, telefon, arah perjalanan dan panduan lawatan.",
    lead: "Kuche + BaTH, turut dikenali sebagai KBO atau Kuche Bath Outlet, ialah bilik pameran dapur dan bilik mandi di Jalan TPK 2/8, Taman Perindustrian Kinrara. Ia sebahagian daripada kluster Home & Living TPK Park.",
    image,
    heroAlt: "Papan tanda Kuche + BaTH Outlet dan bahagian hadapan bilik pameran Puchong",
    business: kucheBathBusiness,
    datePublished: "2026-09-15",
    blocks: [
      { type: "split", title: "Pilih mengikut rutin harian.", text: "Katalog KBO merangkumi hud, dapur memasak dan ketuhar, sinki serta pili dapur, selain besen, pancuran, tandas dan kabinet bilik mandi. Mulakan dengan cara anda menggunakan ruang: memasak, mencuci pinggan atau bersiap pada waktu pagi. Senarai pilihan membantu anda membandingkan ukuran, kawalan dan kemasan yang sesuai. Tanya pasukan Puchong tentang model yang boleh dilihat di bilik pameran.", image, alt: "Bahagian hadapan Kuche + BaTH Outlet Puchong daripada sepanduk laman web KBO", route: "homeLiving", linkLabel: "Terokai Home & Living" },
      { type: "cards", alignHeadings: true, kicker: "Sebelum memilih", title: "Padankan produk dengan pelan anda.", items: [
        { number: "01", title: "Semak saiz perkakas", text: "Bawa pelan dapur, ukuran kabinet dan nombor model perkakas yang masih digunakan. Sebelum membuat pesanan, minta pemasang mengesahkan ruang, bukaan permukaan kerja, pengudaraan dan sambungan yang diperlukan untuk pilihan anda." },
        { number: "02", title: "Semak kesesuaian bilik mandi", text: "Bawa ukuran bilik mandi serta foto besen, pancuran atau tandas sedia ada jika ingin menggantikannya. Bandingkan kelengkapan dan kemasan, kemudian minta pemasang menyemak kedudukan paip serta keperluan pemasangan sebelum membeli." },
        { number: "03", title: "Sahkan butiran pesanan", text: "Minta sebut harga yang menyenaraikan kod model, kuantiti dan aksesori yang disertakan. Sahkan stok, jangka masa penghantaran, skop pemasangan serta syarat jaminan, dan simpan maklumat ini bersama jadual pengubahsuaian anda." }
      ] },
      { type: "businessVisit", kicker: "Rancang lawatan", title: "Cari KBO di Jalan TPK 2/8.", text: "Bilik pameran Puchong terletak di No. 39G.", addressLabel: "Alamat bilik pameran", address, phoneLabel: "Pertanyaan KBO Puchong", phoneDisplay: "+60 3 8079 1268", note: "Sahkan waktu operasi dan produk yang ingin dilihat terus dengan cawangan. Patuhi papan tanda parkir dan pastikan pintu masuk serta kawasan pemunggahan tidak terhalang.", links: [
        { label: "Arah melalui Google Maps", url: directions },
        { label: "Maklumat hubungan KBO", url: contact }
      ] }
    ],
    cta: { title: "Bawa senarai pilihan dan pelan.", text: "Lihat rangkaian KBO, catat model yang menarik perhatian anda dan hubungi bilik pameran Puchong untuk merancang lawatan.", button: "Laman web KBO", url: website }
  },
  zh: {
    parentRoute: "homeLiving",
    eyebrow: "KBO蒲种 · 厨房与卫浴",
    title: "TPK Park里的Kuche + BaTH。",
    description: "到TPK Park的Kuche + BaTH（KBO）蒲种展厅选看厨房电器与卫浴设备。查看Jalan TPK 2/8地址、门店电话、导航路线及选购准备建议。",
    lead: "Kuche + BaTH也称KBO或Kuche Bath Outlet，是位于金銮工业园Jalan TPK 2/8的厨卫展厅，也是TPK Park家居生活集群的一员。",
    image,
    heroAlt: "Kuche + BaTH Outlet蒲种展厅的招牌与门面",
    business: kucheBathBusiness,
    datePublished: "2026-09-15",
    blocks: [
      { type: "split", title: "从日常使用出发。", text: "KBO的产品目录涵盖抽油烟机、炉灶、烤箱、厨房水槽与水龙头，以及浴室面盆、淋浴设备、马桶和浴室柜。选购时，可以先想想烹饪、洗碗或早晨梳洗的使用习惯，再列出初步清单，比较合适的尺寸、操作方式与饰面。出发前，向蒲种门店确认想看的型号是否正在展示。", image, alt: "KBO官网横幅中的Kuche + BaTH Outlet蒲种门面", route: "homeLiving", linkLabel: "查看家居生活品牌" },
      { type: "cards", alignHeadings: true, kicker: "选购之前", title: "让产品配合空间规划。", items: [
        { number: "01", title: "核对电器尺寸", text: "带上厨房平面图、橱柜尺寸，以及准备继续使用的电器型号。下单前，请安装师傅核对所选产品需要的空间、台面开孔、通风与连接条件。" },
        { number: "02", title: "确认卫浴适配", text: "带上浴室尺寸；如需更换面盆、淋浴设备或马桶，也可先拍下现有配置。比较洁具与饰面后，请安装师傅检查水管位置及安装要求，再决定购买。" },
        { number: "03", title: "确认订单细节", text: "索取列明型号、数量及所含配件的报价，确认库存、送货时间、安装范围与保修条款。把这些资料与装修时间表一并保存，方便协调后续安排。" }
      ] },
      { type: "businessVisit", kicker: "到访安排", title: "在Jalan TPK 2/8找到KBO。", text: "蒲种展厅位于39G号。", addressLabel: "展厅地址", address, phoneLabel: "联系KBO蒲种展厅", phoneDisplay: "+60 3 8079 1268", note: "营业时间及想看的产品，请直接向门店确认。抵达后请遵循现场停车指示，并保持出入口及装卸区域畅通。", links: [
        { label: "使用Google Maps导航", url: directions },
        { label: "KBO联系资料", url: contact }
      ] }
    ],
    cta: { title: "带着清单与规划到访。", text: "先浏览KBO的产品系列，记下感兴趣的型号，再联系蒲种展厅安排选看。", button: "前往KBO官网", url: website }
  }
};
