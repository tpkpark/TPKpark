// Branch details and editorial boundaries: docs/v-haus-living-profile-sources.md.
const website = "https://www.vhausliving.com/";
const contact = "https://www.vhausliving.com/contactus/branch/833211/";
const directions = "https://www.google.com/maps/dir/?api=1&destination=3.048802%2C101.637725";
// Existing TPK Park photography, served through the shared local image registry.
const image = "https://i.imgur.com/EDf26sR.jpg";
const address = "1, 3, 5, Jalan TPK 2/8, Bandar Kinrara 4, 47100 Puchong, Selangor";

export const vHausLivingBusiness = {
  "@type": "FurnitureStore",
  "@id": "https://www.tpkpark.com/home-living/v-haus-living/#store",
  name: "V Haus Living Puchong",
  alternateName: "V-Haus Living Puchong",
  url: website,
  telephone: "+60127086389",
  image: "https://www.tpkpark.com/assets/images/home-living-1120.webp",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1, 3, 5, Jalan TPK 2/8, Bandar Kinrara 4",
    addressLocality: "Puchong",
    addressRegion: "Selangor",
    postalCode: "47100",
    addressCountry: "MY"
  },
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "10:30",
    closes: "19:30"
  }],
  containedInPlace: { "@id": "https://www.tpkpark.com/#taman-perindustrian-kinrara" }
};

export const vHausLivingProfiles = {
  en: {
    parentRoute: "homeLiving",
    eyebrow: "V Haus Living · Furniture showroom",
    title: "V Haus Living at TPK Park.",
    description: "Visit V Haus Living Puchong for living, dining and bedroom furniture. Find the Jalan TPK 2/8 showroom, branch contact, opening hours and directions.",
    lead: "V Haus Living’s Puchong showroom is on Jalan TPK 2/8 in Taman Perindustrian Kinrara. Its range covers living, dining and bedroom furniture, making it a stop for furnishing a room within TPK Park’s Home & Living cluster.",
    image,
    heroAlt: "V Haus Living signage and the Jalan TPK 2/8 showroom frontage at TPK Park",
    business: vHausLivingBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "Think about the room as a whole.", text: "V Haus Living focuses on minimalist furniture, with a catalogue that includes sofas, dining tables and chairs, bed frames, wardrobes and storage cabinets. Start with the pieces you need most, then compare proportions and finishes across the room. Bring photos of furniture you are keeping and ask the Puchong team which items from your shortlist are available to view.", image, alt: "V Haus Living’s sign above the showroom frontage on Jalan TPK 2/8", caption: "V Haus Living on the Jalan TPK 2/8 frontage, alongside other TPK Park businesses.", route: "homeLiving", linkLabel: "Explore Home & Living" },
      { type: "cards", alignHeadings: true, kicker: "Before you choose", title: "Make the pieces work together.", items: [
        { number: "01", title: "Map out the room", text: "Bring a simple floor plan with doorways, windows and the furniture you are keeping. Note the space needed to walk around a table, open a wardrobe or use a drawer, then compare it with the dimensions of your chosen pieces." },
        { number: "02", title: "Try the everyday details", text: "Sit on the sofas and dining chairs available to try, compare table heights and look closely at finishes. Ask about materials, care and colour choices. Photos and samples from your home can help you decide what belongs together." },
        { number: "03", title: "Check delivery and fit", text: "Confirm model names, measurements, colours and quantities in the quotation. Ask about delivery, assembly and warranty terms, and check door, lift or stair access before placing the order." }
      ] },
      { type: "businessVisit", kicker: "Plan your visit", title: "Find V Haus Living on Jalan TPK 2/8.", text: "The Puchong showroom is listed at Nos. 1, 3 and 5. You can also visit Kuche + BaTH on the same street or compare furniture at Lavino on Jalan TPK 2/2.", addressLabel: "Showroom address", address, phoneLabel: "V Haus Living Puchong enquiries", phoneDisplay: "+60 12 708 6389", note: "The branch lists daily hours of 10:30am–7:30pm. Confirm holiday hours and current displays before travelling. Follow local parking signs and keep entrances clear.", links: [
        { label: "Directions on Google Maps", url: directions },
        { label: "V Haus Living Puchong details", url: contact },
        { label: "Kitchen & bathroom: Kuche + BaTH", route: "kucheBath" },
        { label: "Furniture: Lavino", route: "lavino" }
      ] }
    ],
    cta: { title: "Bring a plan and a few ideas.", text: "Browse V Haus Living’s collection, note the pieces you like and contact the Puchong showroom to plan your visit.", button: "Visit V Haus Living’s website", url: website }
  },
  ms: {
    parentRoute: "homeLiving",
    eyebrow: "V Haus Living · Bilik pameran perabot",
    title: "V Haus Living di TPK Park.",
    description: "Kunjungi V Haus Living Puchong untuk perabot ruang tamu, ruang makan dan bilik tidur. Lihat alamat Jalan TPK 2/8, telefon, waktu operasi dan arah perjalanan.",
    lead: "Bilik pameran V Haus Living Puchong terletak di Jalan TPK 2/8, Taman Perindustrian Kinrara. Rangkaiannya merangkumi perabot ruang tamu, ruang makan dan bilik tidur, sebagai salah satu persinggahan dalam kluster Home & Living TPK Park.",
    image,
    heroAlt: "Papan tanda V Haus Living dan deretan bilik pameran Jalan TPK 2/8 di TPK Park",
    business: vHausLivingBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "Lihat ruang secara menyeluruh.", text: "V Haus Living menumpukan perabot minimalis, dengan katalog yang merangkumi sofa, meja dan kerusi makan, rangka katil, almari pakaian serta kabinet simpanan. Mulakan dengan perabot yang paling diperlukan, kemudian bandingkan saiz dan kemasan untuk seluruh ruang. Bawa foto perabot yang ingin dikekalkan dan tanyakan pasukan Puchong tentang pilihan yang boleh dilihat di bilik pameran.", image, alt: "Papan tanda V Haus Living di atas bahagian hadapan bilik pameran Jalan TPK 2/8", caption: "V Haus Living di deretan Jalan TPK 2/8, bersama perniagaan lain di TPK Park.", route: "homeLiving", linkLabel: "Terokai Home & Living" },
      { type: "cards", alignHeadings: true, kicker: "Sebelum memilih", title: "Padankan perabot dengan ruang anda.", items: [
        { number: "01", title: "Lakar susun atur ruang", text: "Bawa pelan ringkas yang menunjukkan pintu, tingkap dan perabot yang ingin dikekalkan. Catat ruang untuk berjalan di sekeliling meja, membuka almari atau menarik laci, kemudian bandingkan dengan ukuran perabot pilihan anda." },
        { number: "02", title: "Cuba untuk kegunaan harian", text: "Cuba duduk pada sofa dan kerusi makan yang boleh diuji, bandingkan ketinggian meja dan teliti kemasan. Tanya tentang bahan, penjagaan serta pilihan warna. Foto dan sampel dari rumah membantu anda menentukan padanan yang sesuai." },
        { number: "03", title: "Semak penghantaran dan akses", text: "Sahkan nama model, ukuran, warna dan kuantiti dalam sebut harga. Tanya tentang penghantaran, pemasangan serta syarat jaminan. Semak akses pintu, lif atau tangga sebelum membuat pesanan." }
      ] },
      { type: "businessVisit", kicker: "Rancang lawatan", title: "Cari V Haus Living di Jalan TPK 2/8.", text: "Alamat bilik pameran Puchong disenaraikan sebagai No. 1, 3 dan 5. Anda juga boleh mengunjungi Kuche + BaTH di jalan yang sama atau membandingkan perabot di Lavino, Jalan TPK 2/2.", addressLabel: "Alamat bilik pameran", address, phoneLabel: "Pertanyaan V Haus Living Puchong", phoneDisplay: "+60 12 708 6389", note: "Waktu operasi yang disenaraikan ialah setiap hari, 10:30 pagi–7:30 malam. Sahkan waktu cuti umum dan pameran semasa sebelum berkunjung. Patuhi papan tanda parkir dan pastikan pintu masuk tidak terhalang.", links: [
        { label: "Arah melalui Google Maps", url: directions },
        { label: "Maklumat V Haus Living Puchong", url: contact },
        { label: "Dapur & bilik mandi: Kuche + BaTH", route: "kucheBath" },
        { label: "Perabot: Lavino", route: "lavino" }
      ] }
    ],
    cta: { title: "Bawa pelan dan beberapa idea.", text: "Lihat koleksi V Haus Living, catat perabot yang anda minati dan hubungi bilik pameran Puchong untuk merancang lawatan.", button: "Laman web V Haus Living", url: website }
  },
  zh: {
    parentRoute: "homeLiving",
    eyebrow: "V Haus Living · 家具展厅",
    title: "TPK Park里的V Haus Living。",
    description: "到TPK Park的V Haus Living蒲种展厅选看客厅、餐厅与卧室家具。查看Jalan TPK 2/8门店地址、电话、营业时间、导航路线及选购建议。",
    lead: "V Haus Living蒲种展厅位于金銮工业园Jalan TPK 2/8，产品系列涵盖客厅、餐厅与卧室家具，是TPK Park家居生活集群中的家具选购站点。",
    image,
    heroAlt: "TPK Park内V Haus Living的招牌与Jalan TPK 2/8展厅沿街外观",
    business: vHausLivingBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "从整个房间的搭配着手。", text: "V Haus Living主打简约风格家具，产品目录涵盖沙发、餐桌椅、床架、衣柜及储物柜。可以先列出最需要的家具，再比较各件家具的比例与饰面，让整体搭配更协调。带上准备保留的家具照片，并向蒲种门店确认清单中的款式是否正在展示。", image, alt: "Jalan TPK 2/8家具展厅外墙上的V Haus Living招牌", caption: "V Haus Living位于Jalan TPK 2/8沿街，与TPK Park内其他商家相邻。", route: "homeLiving", linkLabel: "查看家居生活品牌" },
      { type: "cards", alignHeadings: true, kicker: "选购之前", title: "让家具与空间彼此配合。", items: [
        { number: "01", title: "画好空间布局", text: "带上简单平面图，标出门窗及准备保留的家具。预留绕过餐桌、打开衣柜或拉出抽屉的空间，再与喜欢的家具尺寸逐一比较。" },
        { number: "02", title: "试试日常使用的细节", text: "试坐可体验的沙发与餐椅，比较桌面高度，并仔细看看饰面。向店员了解材质、保养方式与颜色选择；家中的照片和材料样板也有助于判断搭配。" },
        { number: "03", title: "核对送货与通行空间", text: "请在报价中列明型号、尺寸、颜色及数量，确认送货、组装与保修条款。下单前，也要核对门口、电梯或楼梯的搬运空间。" }
      ] },
      { type: "businessVisit", kicker: "到访安排", title: "在Jalan TPK 2/8找到V Haus Living。", text: "蒲种展厅公布的地址为1、3及5号。选购时，也可顺道到同一条街的Kuche + BaTH，或到Jalan TPK 2/2的Lavino比较家具。", addressLabel: "展厅地址", address, phoneLabel: "联系V Haus Living蒲种展厅", phoneDisplay: "+60 12 708 6389", note: "门店公布的营业时间为每天上午10:30至晚上7:30。公共假期时间及当前展品，请在出发前确认。抵达后请遵循现场停车指示，并保持出入口畅通。", links: [
        { label: "使用Google Maps导航", url: directions },
        { label: "V Haus Living蒲种门店资料", url: contact },
        { label: "厨房与卫浴：Kuche + BaTH", route: "kucheBath" },
        { label: "家具展厅：Lavino", route: "lavino" }
      ] }
    ],
    cta: { title: "带着平面图与想法到访。", text: "先浏览V Haus Living的家具系列，记下喜欢的款式，再联系蒲种展厅安排选看。", button: "前往V Haus Living官网", url: website }
  }
};
