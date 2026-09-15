// Branch details and editorial boundaries: docs/lavino-profile-sources.md.
export const lavinoBusiness = {
  "@type": "FurnitureStore",
  "@id": "https://www.tpkpark.com/home-living/lavino/#store",
  name: "Lavino Puchong",
  url: "https://www.lavino.com.my/",
  telephone: "+60163391601",
  address: {
    "@type": "PostalAddress",
    streetAddress: "6, Jalan TPK 2/2, Taman Perindustrian Kinrara",
    addressLocality: "Puchong",
    addressRegion: "Selangor",
    postalCode: "47100",
    addressCountry: "MY"
  },
  containedInPlace: { "@id": "https://www.tpkpark.com/#taman-perindustrian-kinrara" }
};

const image = "https://i.imgur.com/EDf26sR.jpg";
const address = "6, Jalan TPK 2/2, Taman Perindustrian Kinrara, 47100 Puchong, Selangor";
const directions = "https://www.waze.com/live-map/directions/my/selangor/puchong/lavino-puchong-or-bandar-kinrara-furniture-showroom?to=place.ChIJ-UmXrFBLzDERLRSUYQXuCqA";
const website = "https://www.lavino.com.my/";

export const lavinoProfiles = {
  en: {
    parentRoute: "homeLiving",
    eyebrow: "Lavino · Furniture showroom",
    title: "Lavino Puchong at TPK Park.",
    description: "Plan a visit to Lavino Puchong on Jalan TPK 2/2 at TPK Park. Find the showroom address, direct phone number, directions and nearby Home & Living stops.",
    lead: "A furniture stop on Jalan TPK 2/2 in Taman Perindustrian Kinrara. Lavino’s range covers living, dining and bedroom furniture, from sofas and dining sets to bed frames and mattresses.",
    image,
    heroAlt: "Home & Living showroom frontage at TPK Park",
    business: lavinoBusiness,
    datePublished: "2026-09-15",
    blocks: [
      { type: "businessVisit", kicker: "Plan your visit", title: "Find the Puchong showroom.", text: "Use the Jalan TPK 2/2 address below for your journey. Call the showroom to confirm opening hours and ask whether the pieces you want to see are on display.", addressLabel: "Showroom address", address, phoneLabel: "Lavino Puchong enquiries", phoneDisplay: "+60 16 339 1601", note: "For current prices, stock, delivery and assembly arrangements, speak directly with the Lavino team. On arrival, follow local parking signs and keep entrances and loading areas clear.", links: [
        { label: "Directions on Waze", url: directions },
        { label: "Browse Lavino’s website", url: website }
      ] },
      { type: "cards", alignHeadings: true, kicker: "Before you choose", title: "Make the showroom visit useful.", items: [
        { number: "01", title: "Bring your measurements", text: "Note the room size, doorways and any lift or stair access. A simple floor plan and a few photos can help you explain where a sofa, dining set or bed will go." },
        { number: "02", title: "Compare in person", text: "Use the pieces on display to assess seat comfort, proportions, materials and finishes. Ask the showroom which sizes and colour options are available for the model you like." },
        { number: "03", title: "Plan the delivery", text: "Before ordering, confirm the full price, delivery area, expected lead time, assembly and warranty terms. Mention access restrictions at your home so the team can advise." }
      ] },
      { type: "split", presentation: "renewal", title: "Continue around Home & Living.", text: "Combine a furniture visit with other stops in TPK Park’s Home & Living cluster. The directory includes tiles and sanitary ware, kitchens, curtains and doors, making it useful when you are considering more than one part of a room. Allow time to compare materials and bring your notes from one showroom to the next.", image, alt: "Home & Living showroom frontage at TPK Park", caption: "The Home & Living frontage at TPK Park; Lavino’s showroom is on Jalan TPK 2/2.", route: "homeLiving", linkLabel: "Explore Home & Living" }
    ],
    cta: { title: "Browse first. Visit with a shortlist.", text: "Explore Lavino’s furniture online, then contact the Puchong showroom about the pieces you would like to see.", button: "Visit Lavino’s website", url: website }
  },
  ms: {
    parentRoute: "homeLiving",
    eyebrow: "Lavino · Bilik pameran perabot",
    title: "Lavino Puchong di TPK Park.",
    description: "Rancang lawatan ke Lavino Puchong di Jalan TPK 2/2, TPK Park. Lihat alamat bilik pameran, nombor telefon, arah perjalanan dan pilihan Home & Living berdekatan.",
    lead: "Persinggahan untuk mencari perabot di Jalan TPK 2/2, Taman Perindustrian Kinrara. Rangkaian Lavino merangkumi perabot ruang tamu, ruang makan dan bilik tidur, daripada sofa dan set meja makan hingga rangka katil dan tilam.",
    image,
    heroAlt: "Deretan bilik pameran Home & Living di TPK Park",
    business: lavinoBusiness,
    datePublished: "2026-09-15",
    blocks: [
      { type: "businessVisit", kicker: "Rancang lawatan", title: "Cari bilik pameran Puchong.", text: "Gunakan alamat Jalan TPK 2/2 di bawah untuk perjalanan anda. Hubungi bilik pameran untuk mengesahkan waktu operasi dan bertanya sama ada perabot yang ingin dilihat sedang dipamerkan.", addressLabel: "Alamat bilik pameran", address, phoneLabel: "Pertanyaan Lavino Puchong", phoneDisplay: "+60 16 339 1601", note: "Hubungi pasukan Lavino untuk harga, stok, penghantaran dan pemasangan terkini. Apabila tiba, patuhi papan tanda parkir dan pastikan pintu masuk serta kawasan pemunggahan tidak terhalang.", links: [
        { label: "Arah perjalanan melalui Waze", url: directions },
        { label: "Lihat laman web Lavino", url: website }
      ] },
      { type: "cards", alignHeadings: true, kicker: "Sebelum memilih", title: "Manfaatkan lawatan ke bilik pameran.", items: [
        { number: "01", title: "Bawa ukuran ruang", text: "Catat saiz bilik, lebar pintu serta akses lif atau tangga. Pelan ringkas dan beberapa foto membantu anda menerangkan tempat sofa, set meja makan atau katil akan diletakkan." },
        { number: "02", title: "Bandingkan sendiri", text: "Nilai keselesaan tempat duduk, saiz, bahan dan kemasan melalui perabot yang dipamerkan. Tanya kakitangan tentang pilihan ukuran dan warna bagi model yang anda minati." },
        { number: "03", title: "Rancang penghantaran", text: "Sebelum membuat pesanan, sahkan harga penuh, kawasan penghantaran, jangka masa menunggu, pemasangan dan syarat waranti. Maklumkan sebarang kekangan akses di rumah anda." }
      ] },
      { type: "split", presentation: "renewal", title: "Teruskan ke Home & Living.", text: "Gabungkan lawatan perabot dengan persinggahan lain dalam kluster Home & Living TPK Park. Direktori ini merangkumi jubin dan kelengkapan sanitari, dapur, langsir serta pintu, sesuai jika anda sedang merancang beberapa bahagian ruang. Luangkan masa untuk membandingkan bahan dan bawa catatan anda dari satu bilik pameran ke bilik pameran yang lain.", image, alt: "Deretan bilik pameran Home & Living di TPK Park", caption: "Deretan Home & Living di TPK Park; bilik pameran Lavino terletak di Jalan TPK 2/2.", route: "homeLiving", linkLabel: "Terokai Home & Living" }
    ],
    cta: { title: "Lihat dahulu. Datang dengan pilihan.", text: "Terokai perabot Lavino dalam talian, kemudian hubungi bilik pameran Puchong tentang pilihan yang ingin anda lihat.", button: "Laman web Lavino", url: website }
  },
  zh: {
    parentRoute: "homeLiving",
    eyebrow: "Lavino · 家具展厅",
    title: "TPK Park里的Lavino蒲种展厅。",
    description: "规划前往TPK Park金銮工业园Jalan TPK 2/2的Lavino蒲种家具展厅。查看地址、展厅电话、导航路线及周边家居生活品牌。",
    lead: "在金銮工业园Jalan TPK 2/2选看家具。Lavino的产品系列涵盖客厅、餐厅与卧室，包括沙发、餐桌椅组合、床架及床垫。",
    image,
    heroAlt: "TPK Park家居生活展厅沿街外观",
    business: lavinoBusiness,
    datePublished: "2026-09-15",
    blocks: [
      { type: "businessVisit", kicker: "到访安排", title: "找到Lavino蒲种展厅。", text: "出发时，请使用下方Jalan TPK 2/2地址导航。到访前可致电展厅，确认营业时间，以及想看的款式是否正在店内展示。", addressLabel: "展厅地址", address, phoneLabel: "联系Lavino蒲种展厅", phoneDisplay: "+60 16 339 1601", note: "最新价格、库存、送货与安装安排，请直接向Lavino团队查询。抵达后请遵循现场停车指示，并保持出入口及装卸区域畅通。", links: [
        { label: "使用Waze导航", url: directions },
        { label: "浏览Lavino官网", url: website }
      ] },
      { type: "cards", alignHeadings: true, kicker: "选购之前", title: "让到访更有收获。", items: [
        { number: "01", title: "带上尺寸与照片", text: "先记录房间尺寸、门口宽度，以及电梯或楼梯的通行空间。简单的平面图与几张照片，有助于说明沙发、餐桌或床架的摆放位置。" },
        { number: "02", title: "现场体验与比较", text: "通过展出的家具感受坐感，比较比例、材质与表面处理。遇到喜欢的款式，可以向展厅人员了解可选尺寸与颜色。" },
        { number: "03", title: "提前了解送货安排", text: "下单前确认总价、送货范围、预计等候时间、安装及保修条款。若住所有搬运或出入限制，也请事先告知，方便团队提供建议。" }
      ] },
      { type: "split", presentation: "renewal", title: "顺道看看家居生活集群。", text: "到Lavino看家具，也可以结合TPK Park内其他家居生活展厅的行程。目录涵盖瓷砖与卫浴、厨房、窗帘及门闸，适合同时考虑房间不同部分的访客。不妨留出比较材料的时间，并带着尺寸与选购笔记，逐站整理自己的想法。", image, alt: "TPK Park家居生活展厅沿街外观", caption: "图为TPK Park家居生活展厅沿街外观；Lavino展厅位于Jalan TPK 2/2。", route: "homeLiving", linkLabel: "查看家居生活品牌" }
    ],
    cta: { title: "先浏览，再带着清单到访。", text: "在Lavino官网了解家具系列，再联系蒲种展厅，询问想看的款式。", button: "前往Lavino官网", url: website }
  }
};
