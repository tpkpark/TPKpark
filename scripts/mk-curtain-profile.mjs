// Public details and image provenance: docs/mk-curtain-profile-sources.md.
const website = "https://www.mk.com.my/";
const showrooms = "https://www.mk.com.my/find-nearest-branch";
const services = "https://www.mk.com.my/our-services";
const directions = "https://www.google.com/maps/search/?api=1&query=MK+Curtain+TPK+Park+11+Jalan+TPK+2%2F8+47180+Puchong";
const image = "https://www.tpkpark.com/assets/images/mk-curtain-tpk-showroom-1440.webp";
const imageSource = { label: "MK Curtain", url: showrooms };
const address = "No. 11 (Ground Floor), Jalan TPK 2/8, Taman Perindustrian Kinrara, 47180 Puchong, Selangor";

export const mkCurtainBusiness = {
  "@type": "HomeGoodsStore",
  "@id": "https://www.tpkpark.com/home-living/mk-curtain/#store",
  name: "MK Curtain TPK Park Puchong",
  alternateName: "MK Curtain",
  url: website,
  telephone: "+60380747210",
  image,
  hasMap: directions,
  address: {
    "@type": "PostalAddress",
    streetAddress: "11 (Ground Floor), Jalan TPK 2/8, Taman Perindustrian Kinrara",
    addressLocality: "Puchong",
    addressRegion: "Selangor",
    postalCode: "47180",
    addressCountry: "MY"
  },
  containedInPlace: { "@id": "https://www.tpkpark.com/#taman-perindustrian-kinrara" }
};

export const mkCurtainProfiles = {
  en: {
    parentRoute: "homeLiving",
    eyebrow: "MK Curtain · Curtains, blinds & wallpaper",
    title: "MK Curtain at TPK Park.",
    description: "Visit MK Curtain TPK Park Puchong at No. 11, Jalan TPK 2/8. Find the branch phone, directions and advice on choosing curtains, blinds and wallpaper.",
    lead: "MK Curtain’s TPK Park showroom is on the ground floor of No. 11, Jalan TPK 2/8. Part of the Home & Living cluster, it is a place to discuss curtains, blinds and wallpaper when furnishing a new home or updating an existing room.",
    image,
    heroImage: image,
    heroAlt: "MK Curtain’s TPK Park shopfront with a red signboard, glass entrance and TPK Park awning",
    business: mkCurtainBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "See the fabric in your room’s context.", text: "MK Curtain’s range includes custom-made and ready-made curtains, sheers, roller and zebra blinds, wallpaper and curtain accessories. Bring a few photos of your room to compare colours, textures and how the fabrics hang. Ask the showroom team which samples are available and how to arrange an on-site measurement.", image, alt: "The MK Curtain TPK Park Puchong showroom, with its red MK Curtain sign above the glazed entrance", caption: "The TPK Park showroom on Jalan TPK 2/8. Photo:", captionSource: imageSource, route: "homeLiving", linkLabel: "Explore Home & Living" },
      { type: "cards", alignHeadings: true, kicker: "Before you choose", title: "Plan the details before placing an order.", items: [
        { number: "01", title: "Start with the room", text: "Photograph the windows, surrounding walls and ceiling. Note approximate sizes, existing tracks and any recesses. Explain how you use the room and whether you want more daylight, privacy or shade. Leave final measurements to the fitting team." },
        { number: "02", title: "Compare the finishes", text: "Bring a paint, flooring or upholstery reference to help narrow down colours. Compare the fabric’s texture, drape and transparency. If choosing wallpaper too, view the pattern beside the curtain fabric and ask about repeat sizes and wall preparation." },
        { number: "03", title: "Confirm the full scope", text: "Ask the quotation to separate fabric, tracks or rods, accessories and installation. Confirm what measurement and fitting services include, the expected lead time, care instructions and warranty terms before ordering. Keep the agreed specifications with your receipt." }
      ] },
      { type: "businessVisit", kicker: "Plan your visit", title: "Find MK Curtain on Jalan TPK 2/8.", text: "The TPK Park Puchong showroom is at No. 11, ground floor.", addressLabel: "TPK Park showroom address", address, phoneLabel: "MK Curtain TPK Park enquiries", phoneDisplay: "+60 3 8074 7210", note: "Call the branch to confirm opening hours, the samples you would like to see and arrangements for a measurement visit.", links: [
        { label: "Directions on Google Maps", url: directions },
        { label: "MK Curtain showroom directory", url: showrooms },
        { label: "MK Curtain services", url: services }
      ] }
    ],
    cta: { title: "Bring your ideas to the showroom.", text: "Explore MK Curtain’s range and save a few references to discuss with the showroom team.", button: "Visit MK Curtain’s website", url: website }
  },
  ms: {
    parentRoute: "homeLiving",
    eyebrow: "MK Curtain · Langsir, bidai & kertas dinding",
    title: "MK Curtain di TPK Park.",
    description: "Kunjungi MK Curtain TPK Park Puchong di No. 11, Jalan TPK 2/8. Lihat telefon cawangan, arah perjalanan dan panduan memilih langsir, bidai serta kertas dinding.",
    lead: "Bilik pameran MK Curtain TPK Park terletak di tingkat bawah No. 11, Jalan TPK 2/8. Sebagai sebahagian daripada kluster Home & Living, ia menawarkan tempat untuk membincangkan pilihan langsir, bidai dan kertas dinding ketika melengkapkan rumah baharu atau memperbaharui ruang sedia ada.",
    image,
    heroImage: image,
    heroAlt: "Bahagian hadapan MK Curtain TPK Park dengan papan tanda merah, pintu kaca dan awning TPK Park",
    business: mkCurtainBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "Padankan fabrik dengan ruang anda.", text: "Rangkaian MK Curtain merangkumi langsir tempahan khas dan siap pakai, langsir nipis, bidai gulung dan zebra, kertas dinding serta aksesori langsir. Bawa beberapa foto ruang untuk membandingkan warna, tekstur dan cara fabrik jatuh apabila digantung. Tanya pasukan bilik pameran tentang sampel yang tersedia serta cara mengatur pengukuran di rumah.", image, alt: "Bilik pameran MK Curtain TPK Park Puchong dengan papan tanda MK Curtain berwarna merah di atas pintu masuk kaca", caption: "Bilik pameran TPK Park di Jalan TPK 2/8. Foto:", captionSource: imageSource, route: "homeLiving", linkLabel: "Terokai Home & Living" },
      { type: "cards", alignHeadings: true, kicker: "Sebelum memilih", title: "Rancang butiran sebelum membuat tempahan.", items: [
        { number: "01", title: "Mulakan dengan ruang", text: "Ambil foto tingkap, dinding sekeliling dan siling. Catat anggaran saiz, rel sedia ada serta ruang lekuk. Terangkan kegunaan bilik dan sama ada anda memerlukan lebih cahaya siang, privasi atau teduhan. Serahkan ukuran akhir kepada pasukan pemasangan." },
        { number: "02", title: "Bandingkan kemasan", text: "Bawa rujukan warna cat, lantai atau fabrik perabot untuk mengecilkan pilihan warna. Bandingkan tekstur, cara fabrik tergantung dan ketelusannya. Jika memilih kertas dinding juga, padankan coraknya dengan fabrik langsir dan tanya tentang saiz ulangan corak serta persediaan dinding." },
        { number: "03", title: "Sahkan skop penuh", text: "Minta sebut harga yang mengasingkan kos fabrik, rel atau rod, aksesori dan pemasangan. Sebelum menempah, sahkan skop pengukuran serta pemasangan, anggaran tempoh siap, cara penjagaan dan syarat jaminan. Simpan spesifikasi yang dipersetujui bersama resit." }
      ] },
      { type: "businessVisit", kicker: "Rancang lawatan", title: "Cari MK Curtain di Jalan TPK 2/8.", text: "Bilik pameran TPK Park Puchong terletak di tingkat bawah No. 11.", addressLabel: "Alamat bilik pameran TPK Park", address, phoneLabel: "Pertanyaan MK Curtain TPK Park", phoneDisplay: "+60 3 8074 7210", note: "Hubungi cawangan untuk mengesahkan waktu operasi, sampel yang ingin dilihat serta aturan lawatan pengukuran.", links: [
        { label: "Arah melalui Google Maps", url: directions },
        { label: "Direktori bilik pameran MK Curtain", url: showrooms },
        { label: "Perkhidmatan MK Curtain", url: services }
      ] }
    ],
    cta: { title: "Bawa idea anda ke bilik pameran.", text: "Lihat rangkaian MK Curtain dan simpan beberapa rujukan untuk dibincangkan dengan pasukan bilik pameran.", button: "Laman web MK Curtain", url: website }
  },
  zh: {
    parentRoute: "homeLiving",
    eyebrow: "MK Curtain · 窗帘、卷帘与墙纸",
    title: "TPK Park里的MK Curtain。",
    description: "MK Curtain TPK Park蒲种展厅位于11, Jalan TPK 2/8底层。查看分店电话、导航，以及选购窗帘、卷帘与墙纸的到访建议。",
    lead: "MK Curtain的TPK Park展厅位于Jalan TPK 2/8的11号底层，是家居生活集群中的窗饰品牌。无论准备布置新家或更新现有房间，都可以到店讨论窗帘、卷帘与墙纸的搭配。",
    image,
    heroImage: image,
    heroAlt: "MK Curtain TPK Park店面的红色招牌、玻璃入口与TPK Park遮阳篷",
    business: mkCurtainBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "把面料放进空间里考虑。", text: "MK Curtain的产品系列包括定制与现成窗帘、纱帘、卷帘、斑马帘、墙纸及窗帘配件。带上房间照片，比较颜色、质感与面料的垂坠效果，再向TPK Park展厅团队询问现有样本，以及上门测量的安排。", image, alt: "MK Curtain TPK Park蒲种展厅的玻璃入口，上方是红底MK Curtain招牌", caption: "位于Jalan TPK 2/8的TPK Park展厅。图片来源：", captionSource: imageSource, route: "homeLiving", linkLabel: "查看家居生活品牌" },
      { type: "cards", alignHeadings: true, kicker: "选购之前", title: "先确认细节，再安排订制。", items: [
        { number: "01", title: "先了解房间需要", text: "拍下窗户、周围墙面与天花，记录大致尺寸、现有轨道及凹槽位置。说明房间的用途，以及希望增加采光、隐私或遮光的程度。正式制作前，请安装团队确认最终尺寸。" },
        { number: "02", title: "一起比较饰面", text: "带上油漆、地板或家具面料的参考样本，帮助缩小颜色选择。比较窗帘面料的纹理、垂坠感与透光程度。如同时选购墙纸，可把图案与窗帘面料放在一起看，并询问花纹重复尺寸及墙面的施工准备。" },
        { number: "03", title: "确认报价范围", text: "请对方分别列出面料、轨道或窗帘杆、配件与安装费用。订购前，确认测量和安装服务的范围、预计完成时间、清洁保养方法与保修条款，并把议定规格连同收据保存。" }
      ] },
      { type: "businessVisit", kicker: "到访安排", title: "在Jalan TPK 2/8找到MK Curtain。", text: "TPK Park蒲种展厅位于11号底层。", addressLabel: "TPK Park展厅地址", address, phoneLabel: "MK Curtain TPK Park咨询电话", phoneDisplay: "+60 3 8074 7210", note: "出发前，请致电分店确认营业时间、想看的样本，以及上门测量的安排。", links: [
        { label: "使用Google Maps导航", url: directions },
        { label: "MK Curtain展厅目录", url: showrooms },
        { label: "MK Curtain服务介绍", url: services }
      ] }
    ],
    cta: { title: "带着想法，到展厅聊聊。", text: "先浏览MK Curtain的产品系列，保存几款参考样式，再与TPK Park展厅团队讨论。", button: "前往MK Curtain官网", url: website }
  }
};
