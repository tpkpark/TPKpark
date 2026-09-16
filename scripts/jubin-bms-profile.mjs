// Public branch details and image provenance: docs/jubin-bms-profile-sources.md.
const website = "https://www.jubinbms.com.my/";
const locations = "https://www.jubinbms.com.my/locate-us";
const directions = "https://www.google.com/maps/dir/?api=1&destination=Jubin+BMS+Puchong+Kinrara%2C+7+Jalan+TPK+2%2F3%2C+47100+Puchong%2C+Selangor";
const image = "https://www.tpkpark.com/assets/images/jubin-bms-puchong-960.webp";
const imageSource = { label: "Jubin BMS", url: "https://www.jubinbms.com.my/event/jubin-bms-puchong-kinrara-soft-opening-tiles-sanitary-wares-malaysia" };
const address = "7, Jalan TPK 2/3, Taman Perindustrian Kinrara, 47100 Puchong, Selangor";

export const jubinBmsBusiness = {
  "@type": "HomeGoodsStore",
  "@id": "https://www.tpkpark.com/home-living/jubin-bms/#store",
  name: "Jubin BMS Puchong Kinrara",
  url: website,
  telephone: "+60380748300",
  image,
  address: {
    "@type": "PostalAddress",
    streetAddress: "7, Jalan TPK 2/3, Taman Perindustrian Kinrara",
    addressLocality: "Puchong",
    addressRegion: "Selangor",
    postalCode: "47100",
    addressCountry: "MY"
  },
  containedInPlace: { "@id": "https://www.tpkpark.com/#taman-perindustrian-kinrara" }
};

export const jubinBmsProfiles = {
  en: {
    parentRoute: "homeLiving",
    eyebrow: "Jubin BMS · Tiles & surfaces",
    title: "Jubin BMS at TPK Park.",
    description: "Visit Jubin BMS Puchong Kinrara for tiles, surfaces and sanitary ware. Find the Jalan TPK 2/3 showroom, branch phone, directions and tile-selection tips.",
    lead: "Jubin BMS Puchong Kinrara is a tiles and sanitary ware showroom on Jalan TPK 2/3 in Taman Perindustrian Kinrara. It is part of TPK Park’s Home & Living cluster, with options for floors, walls, kitchens and bathrooms.",
    image,
    heroAlt: "Tile displays in the Jubin BMS Puchong Kinrara showroom",
    business: jubinBmsBusiness,
    datePublished: "2026-09-15",
    blocks: [
      { type: "split", title: "Start with the surfaces you live with.", text: "Jubin BMS’s range includes floor and wall tiles, mosaics, stone surfaces and bathroom fittings. At the showroom, compare the colours, textures and sizes of the samples on display. Bring a cabinet finish, paint swatch or room photo to see how your choices work together, and ask the Kinrara team about the products on your shortlist.", image, alt: "Large tile samples in different patterns at Jubin BMS Puchong Kinrara", route: "homeLiving", linkLabel: "Explore Home & Living" },
      { type: "cards", alignHeadings: true, kicker: "Before you choose", title: "Plan the room, then choose the tile.", items: [
        { number: "01", title: "Bring a room plan", text: "Note the floor and wall measurements, doorways and fixed fittings. Mark where each finish will go. Ask your tiler to confirm quantities and the allowance for cuts and spare tiles before ordering." },
        { number: "02", title: "Match the finish to its use", text: "Explain whether you are choosing for a wall, a living-room floor or a wet area. Ask about suitability, cleaning and upkeep. Compare colour and texture in person, and check your choices with your installer." },
        { number: "03", title: "Keep the order clear", text: "Record product codes, sizes, finishes and quantities. Confirm batch consistency, stock and delivery timing with the showroom, and ask what grout, trims and installation materials your tiler will need." }
      ] },
      { type: "businessVisit", kicker: "Plan your visit", title: "Find Jubin BMS on Jalan TPK 2/3.", text: "The Kinrara showroom is at No. 7.", addressLabel: "Showroom address", address, phoneLabel: "Jubin BMS Kinrara enquiries", phoneDisplay: "+60 3 8074 8300", note: "Confirm opening hours and current displays directly with the branch. Follow local parking signs and keep entrances and loading areas clear.", links: [
        { label: "Directions on Google Maps", url: directions },
        { label: "Jubin BMS branch directory", url: locations }
      ] }
    ],
    cta: { title: "Bring your palette and your plans.", text: "Browse the Jubin BMS range, note the finishes you like and contact the Kinrara showroom before your visit.", button: "Visit Jubin BMS’s website", url: website }
  },
  ms: {
    parentRoute: "homeLiving",
    eyebrow: "Jubin BMS · Jubin & kemasan permukaan",
    title: "Jubin BMS di TPK Park.",
    description: "Kunjungi Jubin BMS Puchong Kinrara untuk jubin dan kelengkapan sanitari. Lihat alamat Jalan TPK 2/3, telefon cawangan, arah perjalanan dan panduan memilih jubin.",
    lead: "Jubin BMS Puchong Kinrara ialah bilik pameran jubin dan kelengkapan sanitari di Jalan TPK 2/3, Taman Perindustrian Kinrara. Sebagai sebahagian daripada kluster Home & Living TPK Park, ia menawarkan pilihan untuk lantai, dinding, dapur dan bilik mandi.",
    image,
    heroAlt: "Pameran jubin di bilik pameran Jubin BMS Puchong Kinrara",
    business: jubinBmsBusiness,
    datePublished: "2026-09-15",
    blocks: [
      { type: "split", title: "Mulakan dengan kemasan ruang anda.", text: "Rangkaian Jubin BMS merangkumi jubin lantai dan dinding, mozek, permukaan batu serta kelengkapan bilik mandi. Di bilik pameran, bandingkan warna, tekstur dan saiz sampel yang dipamerkan. Bawa sampel kemasan kabinet, kad warna cat atau foto ruang untuk melihat padanannya, dan tanyakan pasukan Kinrara tentang produk dalam senarai pilihan anda.", image, alt: "Sampel jubin besar dengan pelbagai corak di Jubin BMS Puchong Kinrara", route: "homeLiving", linkLabel: "Terokai Home & Living" },
      { type: "cards", alignHeadings: true, kicker: "Sebelum memilih", title: "Rancang ruang, kemudian pilih jubin.", items: [
        { number: "01", title: "Bawa pelan ruang", text: "Catat ukuran lantai dan dinding, pintu serta kelengkapan tetap. Tandakan lokasi setiap kemasan. Minta tukang jubin mengesahkan kuantiti serta lebihan untuk potongan dan simpanan sebelum membuat pesanan." },
        { number: "02", title: "Pilih mengikut kegunaan", text: "Terangkan sama ada jubin untuk dinding, lantai ruang tamu atau kawasan basah. Tanya tentang kesesuaian, pembersihan dan penjagaan. Bandingkan warna serta tekstur sendiri, kemudian semak pilihan dengan pemasang anda." },
        { number: "03", title: "Sahkan butiran pesanan", text: "Catat kod produk, saiz, kemasan dan kuantiti. Sahkan keseragaman kelompok pengeluaran, stok dan masa penghantaran dengan bilik pameran. Tanya tukang jubin tentang grout, kemasan tepi dan bahan pemasangan yang diperlukan." }
      ] },
      { type: "businessVisit", kicker: "Rancang lawatan", title: "Cari Jubin BMS di Jalan TPK 2/3.", text: "Bilik pameran Kinrara terletak di No. 7.", addressLabel: "Alamat bilik pameran", address, phoneLabel: "Pertanyaan Jubin BMS Kinrara", phoneDisplay: "+60 3 8074 8300", note: "Sahkan waktu operasi dan pameran semasa terus dengan cawangan. Patuhi papan tanda parkir dan pastikan pintu masuk serta kawasan pemunggahan tidak terhalang.", links: [
        { label: "Arah melalui Google Maps", url: directions },
        { label: "Direktori cawangan Jubin BMS", url: locations }
      ] }
    ],
    cta: { title: "Bawa pilihan warna dan pelan anda.", text: "Lihat rangkaian Jubin BMS, catat kemasan yang anda minati dan hubungi bilik pameran Kinrara sebelum berkunjung.", button: "Laman web Jubin BMS", url: website }
  },
  zh: {
    parentRoute: "homeLiving",
    eyebrow: "Jubin BMS · 瓷砖与饰面",
    title: "TPK Park里的Jubin BMS。",
    description: "到Jubin BMS蒲种金銮展厅选看瓷砖、饰面与卫浴设备。查看TPK Park内Jalan TPK 2/3门店地址、电话、导航路线及选砖准备建议。",
    lead: "Jubin BMS Puchong Kinrara是位于金銮工业园Jalan TPK 2/3的瓷砖与卫浴展厅，也是TPK Park家居生活集群的一员，提供地面、墙面、厨房及浴室的选材选择。",
    image,
    heroAlt: "Jubin BMS蒲种金銮展厅内的瓷砖展示",
    business: jubinBmsBusiness,
    datePublished: "2026-09-15",
    blocks: [
      { type: "split", title: "从每天相伴的空间饰面开始。", text: "Jubin BMS的产品系列涵盖地砖、墙砖、马赛克、石材饰面及卫浴设备。到展厅后，可以比较样品的颜色、纹理与尺寸。带上橱柜饰面样板、油漆色卡或房间照片，看看不同材料如何搭配，再向金銮门店了解清单中的产品。", image, alt: "Jubin BMS蒲种金銮展厅内不同花纹的大尺寸瓷砖样品", route: "homeLiving", linkLabel: "查看家居生活品牌" },
      { type: "cards", alignHeadings: true, kicker: "选砖之前", title: "先规划空间，再挑选瓷砖。", items: [
        { number: "01", title: "带上空间平面图", text: "记录地面与墙面的尺寸、门口及固定设备的位置，并标明各处想用的饰面。下单前，请铺砖师傅核算用量，以及切割损耗和备用砖所需的额外数量。" },
        { number: "02", title: "按使用位置选材", text: "说明瓷砖将用于墙面、客厅地面还是湿区，了解适用范围、清洁方法与日常保养。现场比较颜色和触感后，再请安装师傅确认是否符合实际需要。" },
        { number: "03", title: "记录完整订单", text: "记下产品编号、尺寸、饰面与数量，向展厅确认批次一致性、库存和送货时间。也请铺砖师傅列明所需的填缝剂、收边条及其他安装材料。" }
      ] },
      { type: "businessVisit", kicker: "到访安排", title: "在Jalan TPK 2/3找到Jubin BMS。", text: "金銮展厅位于7号。", addressLabel: "展厅地址", address, phoneLabel: "联系Jubin BMS金銮展厅", phoneDisplay: "+60 3 8074 8300", note: "营业时间及当前展示的产品，请直接向门店确认。抵达后请遵循现场停车指示，并保持出入口及装卸区域畅通。", links: [
        { label: "使用Google Maps导航", url: directions },
        { label: "Jubin BMS门店目录", url: locations }
      ] }
    ],
    cta: { title: "带着配色想法与平面图到访。", text: "先浏览Jubin BMS的产品系列，记下喜欢的饰面，再联系金銮展厅安排选看。", button: "前往Jubin BMS官网", url: website }
  }
};
