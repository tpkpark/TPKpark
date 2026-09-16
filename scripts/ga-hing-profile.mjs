// Public branch sources and photography: docs/ga-hing-profile-sources.md.
const website = "https://gahing.com/";
const contact = "https://gahing.com/contact/";
const directions = "https://goo.gl/maps/2DQ9PTWTaCcj6JM38";
const image = "https://www.tpkpark.com/assets/images/ga-hing-puchong-1440.webp";
const imageSource = { label: "Niro Granite", url: "https://nirogranite.com/portino-dealers-showrooms/ga-hing-puchong" };
const address = "4, Jalan TPK 2/2, Taman Perindustrian Kinrara, 47100 Puchong, Selangor";

export const gaHingBusiness = {
  "@type": "HomeGoodsStore",
  "@id": "https://www.tpkpark.com/home-living/ga-hing/#store",
  name: "Ga Hing Puchong",
  url: website,
  telephone: "+60380809119",
  image,
  address: {
    "@type": "PostalAddress",
    streetAddress: "4, Jalan TPK 2/2, Taman Perindustrian Kinrara",
    addressLocality: "Puchong",
    addressRegion: "Selangor",
    postalCode: "47100",
    addressCountry: "MY"
  },
  containedInPlace: { "@id": "https://www.tpkpark.com/#taman-perindustrian-kinrara" }
};

export const gaHingProfiles = {
  en: {
    parentRoute: "homeLiving",
    eyebrow: "Ga Hing · Kitchen, bathroom & tiles",
    title: "Ga Hing Puchong at TPK Park.",
    description: "Visit Ga Hing Puchong at TPK Park for kitchen, bathroom and tile choices. Find the Jalan TPK 2/2 showroom, direct phone number, directions and visiting tips.",
    lead: "A kitchen, bathroom and tile showroom on Jalan TPK 2/2. Ga Hing brings renovation fittings and finishes into the Home & Living cluster at Taman Perindustrian Kinrara.",
    image,
    heroAlt: "Ga Hing Puchong showroom frontage on Jalan TPK 2/2",
    business: gaHingBusiness,
    datePublished: "2026-09-15",
    blocks: [
      { type: "split", title: "Consider the room as a whole.", text: "Ga Hing’s catalogue spans kitchen sinks, hobs and hoods, bathroom basins, taps and showers, alongside tiles. A showroom visit can help you compare finishes and discuss how individual choices fit your room. Bring a floor plan, reference photos and a shortlist, then ask the branch which products are available to view.", image, alt: "Ga Hing Puchong showroom and entrance on Jalan TPK 2/2", route: "homeLiving", linkLabel: "Explore Home & Living" },
      { type: "cards", alignHeadings: true, kicker: "Before you choose", title: "Bring the details that matter.", items: [
        { number: "01", title: "Plan your kitchen", text: "Bring cabinet dimensions and the model details of any appliances you are keeping. Discuss sink and hob sizes, worktop openings and hood placement with the showroom team and your installer before ordering." },
        { number: "02", title: "Compare bathroom fittings", text: "Note the available space and photograph existing fittings if you are replacing them. Compare basin, tap and shower finishes together, and ask your installer to confirm the plumbing and mounting requirements." },
        { number: "03", title: "Choose tiles in context", text: "Bring room measurements and reference colours. Compare tile sizes, textures and finishes, then confirm the intended floor or wall use, quantities and delivery timing before placing an order." }
      ] },
      { type: "businessVisit", kicker: "Plan your visit", title: "Find Ga Hing on Jalan TPK 2/2.", text: "The Puchong showroom is at No. 4, Jalan TPK 2/2.", addressLabel: "Showroom address", address, phoneLabel: "Ga Hing Puchong enquiries", phoneDisplay: "+60 3 8080 9119", note: "Confirm opening hours, current displays, quotations and delivery arrangements directly with Ga Hing. Follow on-site parking signs and keep entrances and loading areas clear.", links: [
        { label: "Directions on Google Maps", url: directions },
        { label: "Ga Hing contact details", url: contact }
      ] }
    ],
    cta: { title: "Start with your room plan.", text: "Browse Ga Hing’s range, make a shortlist and contact the Puchong showroom about the products you would like to see.", button: "Visit Ga Hing’s website", url: website }
  },
  ms: {
    parentRoute: "homeLiving",
    eyebrow: "Ga Hing · Dapur, bilik mandi & jubin",
    title: "Ga Hing Puchong di TPK Park.",
    description: "Kunjungi Ga Hing Puchong di TPK Park untuk pilihan dapur, bilik mandi dan jubin. Lihat alamat Jalan TPK 2/2, telefon bilik pameran, arah perjalanan dan panduan lawatan.",
    lead: "Bilik pameran dapur, bilik mandi dan jubin di Jalan TPK 2/2. Ga Hing melengkapkan kluster Home & Living di Taman Perindustrian Kinrara dengan kelengkapan dan kemasan untuk pengubahsuaian rumah.",
    image,
    heroAlt: "Bahagian hadapan bilik pameran Ga Hing Puchong di Jalan TPK 2/2",
    business: gaHingBusiness,
    datePublished: "2026-09-15",
    blocks: [
      { type: "split", title: "Lihat ruang secara menyeluruh.", text: "Katalog Ga Hing merangkumi sinki, dapur memasak dan hud dapur, besen, pili serta pancuran bilik mandi, selain jubin. Lawatan ke bilik pameran membantu anda membandingkan kemasan dan membincangkan kesesuaian setiap pilihan dengan ruang anda. Bawa pelan lantai, foto rujukan dan senarai pilihan, kemudian tanya cawangan tentang produk yang boleh dilihat.", image, alt: "Bilik pameran dan pintu masuk Ga Hing Puchong di Jalan TPK 2/2", route: "homeLiving", linkLabel: "Terokai Home & Living" },
      { type: "cards", alignHeadings: true, kicker: "Sebelum memilih", title: "Bawa maklumat yang diperlukan.", items: [
        { number: "01", title: "Rancang dapur anda", text: "Bawa ukuran kabinet dan butiran model perkakas yang masih digunakan. Bincangkan saiz sinki dan dapur memasak, bukaan permukaan kerja serta kedudukan hud dengan kakitangan bilik pameran dan pemasang sebelum membuat pesanan." },
        { number: "02", title: "Bandingkan kelengkapan bilik mandi", text: "Catat ruang yang tersedia dan ambil foto kelengkapan sedia ada jika ingin menggantikannya. Bandingkan kemasan besen, pili dan pancuran bersama-sama, serta minta pemasang mengesahkan keperluan paip dan pemasangan." },
        { number: "03", title: "Pilih jubin mengikut ruang", text: "Bawa ukuran bilik dan rujukan warna. Bandingkan saiz, tekstur dan kemasan jubin, kemudian sahkan kesesuaian untuk lantai atau dinding, kuantiti serta jangka masa penghantaran sebelum membuat pesanan." }
      ] },
      { type: "businessVisit", kicker: "Rancang lawatan", title: "Cari Ga Hing di Jalan TPK 2/2.", text: "Bilik pameran Puchong terletak di No. 4, Jalan TPK 2/2.", addressLabel: "Alamat bilik pameran", address, phoneLabel: "Pertanyaan Ga Hing Puchong", phoneDisplay: "+60 3 8080 9119", note: "Sahkan waktu operasi, pameran semasa, sebut harga dan urusan penghantaran terus dengan Ga Hing. Patuhi papan tanda parkir dan pastikan pintu masuk serta kawasan pemunggahan tidak terhalang.", links: [
        { label: "Arah melalui Google Maps", url: directions },
        { label: "Maklumat hubungan Ga Hing", url: contact }
      ] }
    ],
    cta: { title: "Mulakan dengan pelan ruang anda.", text: "Lihat rangkaian Ga Hing, senaraikan pilihan dan hubungi bilik pameran Puchong tentang produk yang ingin anda lihat.", button: "Laman web Ga Hing", url: website }
  },
  zh: {
    parentRoute: "homeLiving",
    eyebrow: "Ga Hing · 厨房、卫浴与瓷砖",
    title: "TPK Park里的Ga Hing蒲种展厅。",
    description: "到TPK Park的Ga Hing蒲种展厅选看厨房设备、卫浴洁具与瓷砖。查看Jalan TPK 2/2地址、展厅电话、导航路线及到访建议。",
    lead: "位于金銮工业园Jalan TPK 2/2的厨房、卫浴与瓷砖展厅。Ga Hing为TPK Park家居生活集群带来装修设备、洁具及饰面材料的选择。",
    image,
    heroAlt: "Jalan TPK 2/2的Ga Hing蒲种展厅外观",
    business: gaHingBusiness,
    datePublished: "2026-09-15",
    blocks: [
      { type: "split", title: "从整个空间出发。", text: "Ga Hing的产品目录涵盖厨房水槽、炉灶与抽油烟机、浴室面盆、水龙头及淋浴设备，也包括瓷砖。到展厅可以比较不同饰面，讨论各项选择如何配合房间。带上平面图、参考照片与初步清单，再向门店确认想看的产品是否正在展示。", image, alt: "Ga Hing蒲种展厅在Jalan TPK 2/2的外观与入口", route: "homeLiving", linkLabel: "查看家居生活品牌" },
      { type: "cards", alignHeadings: true, kicker: "选购之前", title: "带上影响选择的细节。", items: [
        { number: "01", title: "规划厨房配置", text: "带上橱柜尺寸，以及准备继续使用的电器型号。下单前，与展厅人员及安装师傅确认水槽和炉灶尺寸、台面开孔与抽油烟机位置，让选购配合实际空间。" },
        { number: "02", title: "比较卫浴搭配", text: "记录可用空间；如需更换现有洁具，也可先拍照。把面盆、水龙头与淋浴设备的饰面放在一起比较，再请安装师傅确认水管连接与安装要求。" },
        { number: "03", title: "按空间选择瓷砖", text: "带上房间尺寸及参考色板，比较瓷砖大小、纹理与表面质感。订购前，确认产品适合铺设的地面或墙面、所需数量，以及送货时间。" }
      ] },
      { type: "businessVisit", kicker: "到访安排", title: "在Jalan TPK 2/2找到Ga Hing。", text: "蒲种展厅位于4, Jalan TPK 2/2。", addressLabel: "展厅地址", address, phoneLabel: "联系Ga Hing蒲种展厅", phoneDisplay: "+60 3 8080 9119", note: "营业时间、现有展品、报价与送货安排，请直接向Ga Hing确认。抵达后请遵循现场停车指示，并保持出入口及装卸区域畅通。", links: [
        { label: "使用Google Maps导航", url: directions },
        { label: "Ga Hing联系资料", url: contact }
      ] }
    ],
    cta: { title: "带着空间规划，开始选购。", text: "先浏览Ga Hing的产品系列，整理初步清单，再联系蒲种展厅询问想看的产品。", button: "前往Ga Hing官网", url: website }
  }
};
