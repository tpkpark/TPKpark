// Public details and image provenance: docs/baagus-profile-sources.md.
const website = "https://baagus.com/";
const showroom = "https://baagus.com/site/branchdetails?id=34";
const curtains = "https://baagus.com/site/curtains";
const blinds = "https://baagus.com/site/blind";
const directions = "https://www.google.com/maps/search/?api=1&query=BAAGUS+Bandar+Kinrara+7+Jalan+TPK+2%2F8+47180+Puchong";
const waze = "https://waze.com/ul/hw2832g40q";
const image = "https://www.tpkpark.com/assets/images/baagus-kinrara-showroom-1440.webp";
const imageSource = { label: "BAAGUS", url: showroom };
const address = "7, Jalan TPK 2/8, Seksyen 2, Taman Perindustrian Kinrara, 47180 Puchong, Selangor";

export const baagusBusiness = {
  "@type": "HomeGoodsStore",
  "@id": "https://www.tpkpark.com/home-living/baagus/#store",
  name: "BAAGUS Bandar Kinrara",
  alternateName: "Baagus",
  url: website,
  telephone: "+60102133173",
  image,
  hasMap: waze,
  address: {
    "@type": "PostalAddress",
    streetAddress: "7, Jalan TPK 2/8, Seksyen 2, Taman Perindustrian Kinrara",
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

export const baagusProfiles = {
  en: {
    parentRoute: "homeLiving",
    eyebrow: "Baagus · Curtains & blinds",
    title: "Baagus at TPK Park.",
    description: "Visit BAAGUS Bandar Kinrara for curtains, sheers and blinds at TPK Park, Puchong. Find the Jalan TPK 2/8 showroom address, phone, opening hours and directions.",
    lead: "Baagus’ Bandar Kinrara showroom on Jalan TPK 2/8 brings curtains, sheers and blinds to TPK Park’s Home & Living cluster. It is a place to compare fabrics and discuss window treatments when furnishing a new home or refreshing an existing room.",
    image,
    heroImage: image,
    heroAlt: "BAAGUS Bandar Kinrara showroom with its black signboard and glass entrance",
    business: baagusBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "Consider light, privacy and fabric together.", text: "Baagus offers made-to-measure curtains and sheers, alongside blinds such as roller, zebra and wooden styles. Explore fabric textures, colours and heading styles, then discuss how they would work with each room’s daylight and privacy needs. The range also includes curtain tracks and motorised options; ask the showroom which samples and systems are available to compare.", image, alt: "The BAAGUS Bandar Kinrara shopfront on Jalan TPK 2/8, with signage for curtains, blinds and wallpaper", caption: "The Bandar Kinrara showroom on Jalan TPK 2/8. Photo:", captionSource: imageSource, route: "homeLiving", linkLabel: "Explore Home & Living" },
      { type: "cards", alignHeadings: true, kicker: "Before you choose", title: "Plan each window around the room.", items: [
        { number: "01", title: "Bring window details", text: "Take photos of the windows and surrounding walls, with approximate widths and heights for an initial discussion. Note existing tracks, ceiling recesses and nearby furniture. Ask the team to confirm final measurements before anything is made." },
        { number: "02", title: "Compare the fabrics", text: "Bring paint, flooring or upholstery samples if you have them. Compare colour, texture and how the fabric hangs. Explain where you want daylight, privacy or a darker room, and ask to see how different curtain and sheer combinations work together." },
        { number: "03", title: "Clarify the fitting", text: "Ask for a quotation that separates fabric, tracks, accessories and installation. If considering motorised curtains, confirm the controls and power requirements. Discuss the fitting schedule, care instructions, warranty terms and after-sales support." }
      ] },
      { type: "businessVisit", kicker: "Plan your visit", title: "Find Baagus on Jalan TPK 2/8.", text: "The Bandar Kinrara showroom is at No. 7. V Haus Living and Kuche + BaTH are also on Jalan TPK 2/8, making it possible to compare furniture, curtains and kitchen or bathroom products along the same street.", addressLabel: "Kinrara showroom address", address, phoneLabel: "Baagus Kinrara enquiries", phoneDisplay: "+60 10 213 3173", note: "Published hours are Monday–Saturday, 10am–7pm, and Sunday, 10am–6pm. Confirm public-holiday hours and any appointment arrangements before travelling.", links: [
        { label: "Directions on Google Maps", url: directions },
        { label: "Directions on Waze", url: waze },
        { label: "Baagus Kinrara showroom details", url: showroom },
        { label: "Explore Baagus blinds", url: blinds },
        { label: "Furniture: V Haus Living", route: "vHausLiving" },
        { label: "Kitchen & bathroom: Kuche + BaTH", route: "kucheBath" }
      ] }
    ],
    cta: { title: "Choose fabrics for your home.", text: "Browse Baagus’ curtains and sheers, save a few references and bring them with your room photos to start the conversation.", button: "Explore Baagus curtains", url: curtains }
  },
  ms: {
    parentRoute: "homeLiving",
    eyebrow: "Baagus · Langsir & bidai",
    title: "Baagus di TPK Park.",
    description: "Kunjungi BAAGUS Bandar Kinrara untuk langsir, langsir nipis dan bidai di TPK Park, Puchong. Lihat alamat Jalan TPK 2/8, telefon, waktu operasi dan arah perjalanan.",
    lead: "Bilik pameran Baagus Bandar Kinrara di Jalan TPK 2/8 menawarkan langsir, langsir nipis dan bidai dalam kluster Home & Living TPK Park. Singgah untuk membandingkan fabrik dan membincangkan pilihan langsir ketika melengkapkan rumah baharu atau memperbaharui ruang sedia ada.",
    image,
    heroImage: image,
    heroAlt: "Bilik pameran BAAGUS Bandar Kinrara dengan papan tanda hitam dan pintu masuk kaca",
    business: baagusBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "Padankan cahaya, privasi dan fabrik.", text: "Baagus menawarkan langsir dan langsir nipis tempahan khas, serta bidai seperti jenis gulung, zebra dan kayu. Lihat tekstur, warna dan gaya lipatan fabrik, kemudian bincangkan kesesuaiannya dengan cahaya siang dan keperluan privasi setiap bilik. Rangkaian ini turut merangkumi rel langsir dan pilihan bermotor; tanya tentang sampel serta sistem yang boleh dibandingkan di bilik pameran.", image, alt: "Bahagian hadapan kedai BAAGUS Bandar Kinrara di Jalan TPK 2/8, dengan papan tanda langsir, bidai dan kertas dinding", caption: "Bilik pameran Bandar Kinrara di Jalan TPK 2/8. Foto:", captionSource: imageSource, route: "homeLiving", linkLabel: "Terokai Home & Living" },
      { type: "cards", alignHeadings: true, kicker: "Sebelum memilih", title: "Rancang langsir mengikut ruang.", items: [
        { number: "01", title: "Bawa maklumat tingkap", text: "Ambil foto tingkap dan dinding sekeliling, bersama anggaran lebar dan tinggi untuk perbincangan awal. Catat kedudukan rel sedia ada, ruang siling dan perabot berdekatan. Minta pasukan mengesahkan ukuran akhir sebelum tempahan dibuat." },
        { number: "02", title: "Bandingkan fabrik", text: "Bawa sampel cat, lantai atau fabrik perabot jika ada. Bandingkan warna, tekstur dan cara fabrik jatuh apabila digantung. Terangkan ruang yang memerlukan cahaya siang, privasi atau suasana lebih gelap, dan lihat gabungan langsir dengan langsir nipis." },
        { number: "03", title: "Jelaskan pemasangan", text: "Minta sebut harga yang mengasingkan kos fabrik, rel, aksesori dan pemasangan. Jika mempertimbangkan langsir bermotor, sahkan kawalan serta keperluan bekalan kuasa. Bincangkan jadual pemasangan, cara penjagaan, syarat jaminan dan sokongan selepas jualan." }
      ] },
      { type: "businessVisit", kicker: "Rancang lawatan", title: "Cari Baagus di Jalan TPK 2/8.", text: "Bilik pameran Bandar Kinrara terletak di No. 7. V Haus Living dan Kuche + BaTH juga berada di Jalan TPK 2/8, membolehkan anda membandingkan perabot, langsir serta produk dapur atau bilik mandi di jalan yang sama.", addressLabel: "Alamat bilik pameran Kinrara", address, phoneLabel: "Pertanyaan Baagus Kinrara", phoneDisplay: "+60 10 213 3173", note: "Waktu operasi yang disenaraikan ialah Isnin–Sabtu, 10 pagi–7 petang, dan Ahad, 10 pagi–6 petang. Sahkan waktu cuti umum dan aturan janji temu sebelum berkunjung.", links: [
        { label: "Arah melalui Google Maps", url: directions },
        { label: "Arah melalui Waze", url: waze },
        { label: "Maklumat bilik pameran Baagus Kinrara", url: showroom },
        { label: "Terokai bidai Baagus", url: blinds },
        { label: "Perabot: V Haus Living", route: "vHausLiving" },
        { label: "Dapur & bilik mandi: Kuche + BaTH", route: "kucheBath" }
      ] }
    ],
    cta: { title: "Pilih fabrik untuk rumah anda.", text: "Lihat pilihan langsir dan langsir nipis Baagus, simpan beberapa contoh dan bawa bersama foto ruang rumah untuk memulakan perbincangan.", button: "Terokai langsir Baagus", url: curtains }
  },
  zh: {
    parentRoute: "homeLiving",
    eyebrow: "Baagus · 窗帘与百叶帘",
    title: "TPK Park里的Baagus。",
    description: "BAAGUS Bandar Kinrara展厅位于蒲种TPK Park的7, Jalan TPK 2/8，提供窗帘、纱帘与百叶帘选择。查看分店电话、营业时间、导航及到访建议。",
    lead: "Baagus的Bandar Kinrara展厅位于Jalan TPK 2/8，是TPK Park家居生活集群中的窗帘、纱帘与百叶帘品牌。无论准备布置新家或更新现有房间，都可以到店比较面料，并讨论适合各个空间的窗饰方案。",
    image,
    heroImage: image,
    heroAlt: "BAAGUS Bandar Kinrara展厅的黑色招牌与玻璃入口",
    business: baagusBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "把采光、隐私与面料一起考虑。", text: "Baagus提供定制窗帘与纱帘，以及卷帘、斑马帘和木百叶帘等选择。比较面料质感、颜色与帘头样式时，也可讨论各个房间的采光与隐私需要。品牌另有窗帘轨道和电动选项，到访前可询问展厅有哪些样本与系统可供比较。", image, alt: "位于Jalan TPK 2/8的BAAGUS Bandar Kinrara店面，招牌列有窗帘、百叶帘与墙纸", caption: "位于Jalan TPK 2/8的Bandar Kinrara展厅。图片来源：", captionSource: imageSource, route: "homeLiving", linkLabel: "查看家居生活品牌" },
      { type: "cards", alignHeadings: true, kicker: "选购之前", title: "按每个房间的需要规划窗饰。", items: [
        { number: "01", title: "带上窗户资料", text: "拍下窗户与周围墙面的照片，并记录大致宽度和高度，供初步讨论。留意现有轨道、天花凹槽及邻近家具的位置。正式制作前，请团队确认最终尺寸。" },
        { number: "02", title: "比较面料效果", text: "如有油漆、地板或家具面料样本，可一并带上，比较颜色、质感与垂坠效果。说明哪些空间希望保留日光、加强隐私或减少光线，并了解不同窗帘与纱帘的搭配方式。" },
        { number: "03", title: "确认安装细节", text: "请对方分别列出面料、轨道、配件与安装费用。若考虑电动窗帘，确认控制方式及供电要求，再讨论安装时间、清洁保养方法、保修条款与售后服务。" }
      ] },
      { type: "businessVisit", kicker: "到访安排", title: "在Jalan TPK 2/8找到Baagus。", text: "Bandar Kinrara展厅位于7号。V Haus Living和Kuche + BaTH也在Jalan TPK 2/8，可沿同一条街比较家具、窗帘及厨卫产品。", addressLabel: "Kinrara展厅地址", address, phoneLabel: "Baagus Kinrara咨询电话", phoneDisplay: "+60 10 213 3173", note: "公布的营业时间为星期一至星期六，上午10时至晚上7时；星期日为上午10时至下午6时。出发前请确认公共假期营业时间及预约安排。", links: [
        { label: "使用Google Maps导航", url: directions },
        { label: "使用Waze导航", url: waze },
        { label: "Baagus Kinrara展厅资料", url: showroom },
        { label: "浏览Baagus百叶帘", url: blinds },
        { label: "家具：V Haus Living", route: "vHausLiving" },
        { label: "厨房与卫浴：Kuche + BaTH", route: "kucheBath" }
      ] }
    ],
    cta: { title: "为家里挑选窗帘。", text: "先浏览Baagus的窗帘与纱帘，保存几款参考样式，再带上房间照片，到店讨论搭配选择。", button: "浏览Baagus窗帘", url: curtains }
  }
};
