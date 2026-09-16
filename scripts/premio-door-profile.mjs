// Public branch details and image provenance: docs/premio-door-profile-sources.md.
const website = "https://premiodoor.com.my/";
const locations = "https://premiodoor.com.my/location.php";
const collections = "https://premiodoor.com.my/productSeries.php";
const directions = "https://www.google.com/maps/dir/?api=1&destination=Premio+Safety+Door+Puchong%2C+25-G%2C+Jalan+TPK+2%2F8%2C+47180+Puchong%2C+Selangor";
const image = "https://www.tpkpark.com/assets/images/premio-door-puchong-1000.webp";
const imageSource = { label: "Premio Safety Door", url: locations };
const address = "25-G, Jalan TPK 2/8, Seksyen 2, Taman Perindustrian Kinrara, 47180 Puchong, Selangor";

export const premioDoorBusiness = {
  "@type": "HomeGoodsStore",
  "@id": "https://www.tpkpark.com/home-living/premio-door/#store",
  name: "Premio Safety Door Puchong",
  alternateName: "Premio Door",
  url: website,
  telephone: "+60165255100",
  image,
  address: {
    "@type": "PostalAddress",
    streetAddress: "25-G, Jalan TPK 2/8, Seksyen 2, Taman Perindustrian Kinrara",
    addressLocality: "Puchong",
    addressRegion: "Selangor",
    postalCode: "47180",
    addressCountry: "MY"
  },
  containedInPlace: { "@id": "https://www.tpkpark.com/#taman-perindustrian-kinrara" }
};

export const premioDoorProfiles = {
  en: {
    parentRoute: "homeLiving",
    eyebrow: "Premio Door · Safety doors & entrance design",
    title: "Premio Door at TPK Park.",
    description: "Visit Premio Safety Door Puchong at TPK Park. Explore door styles, prepare for a showroom visit and find the Jalan TPK 2/8 address, branch phone and directions.",
    lead: "Premio Safety Door’s Puchong showroom is at 25-G, Jalan TPK 2/8 in Taman Perindustrian Kinrara. Part of TPK Park’s Home & Living cluster, it offers a place to discuss entrance doors, finishes and installation for your home.",
    image,
    heroAlt: "The blue Premio Safety Door showroom frontage in Puchong",
    business: premioDoorBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "Consider how your entrance looks and works.", text: "Premio’s collections include pivot, full-aluminium sliding, timber, aluminium and aluminium-timber door series. Use the showroom visit to discuss the opening style, panel finish and lock options that suit your entrance. Ask the Puchong team which models are on display and what can be customised for your project.", image, alt: "Premio’s blue showroom façade and glazed entrance at 25-G, Jalan TPK 2/8", route: "homeLiving", linkLabel: "Explore Home & Living" },
      { type: "cards", alignHeadings: true, kicker: "Before you choose", title: "Plan the entrance, then choose the door.", items: [
        { number: "01", title: "Record the opening", text: "Bring photos and approximate width and height measurements, including the existing frame, floor level and space around the entrance. Note the direction the door opens. Ask the supplier to confirm the final site measurements before ordering." },
        { number: "02", title: "Compare the details", text: "Look at finishes and handles, and try the opening and locking mechanisms on the models available. Explain whether ventilation or privacy matters to you. Ask what is included, which features are optional and how the door should be maintained." },
        { number: "03", title: "Confirm installation", text: "Check the written quotation, production time and installation arrangements. Clarify whether removing the old door and frame, disposal and making good the surrounding wall are included. Confirm the warranty terms and who to contact for after-sales support." }
      ] },
      { type: "businessVisit", kicker: "Plan your visit", title: "Find Premio Door on Jalan TPK 2/8.", text: "The Puchong showroom is at 25-G.", addressLabel: "Showroom address", address, phoneLabel: "Premio Puchong enquiries", phoneDisplay: "+60 16 525 5100", note: "Confirm opening hours and current displays directly with the Puchong showroom before visiting. Share the type of door and entrance you are considering so the team can help you prepare.", links: [
        { label: "Directions on Google Maps", url: directions },
        { label: "Premio’s showroom directory", url: locations },
        { label: "Explore Premio’s door series", url: collections }
      ] }
    ],
    cta: { title: "Bring your entrance into the plan.", text: "Browse Premio’s door collections, save the styles you like and contact the Puchong showroom to discuss your requirements.", button: "Visit Premio’s website", url: website }
  },
  ms: {
    parentRoute: "homeLiving",
    eyebrow: "Premio Door · Pintu keselamatan & reka bentuk pintu masuk",
    title: "Premio Door di TPK Park.",
    description: "Kunjungi Premio Safety Door Puchong di TPK Park. Lihat pilihan pintu, panduan lawatan, alamat Jalan TPK 2/8, telefon cawangan dan arah perjalanan.",
    lead: "Bilik pameran Premio Safety Door Puchong terletak di 25-G, Jalan TPK 2/8, Taman Perindustrian Kinrara. Sebagai sebahagian daripada kluster Home & Living TPK Park, ia menyediakan ruang untuk membincangkan pintu masuk, kemasan dan pemasangan bagi kediaman anda.",
    image,
    heroAlt: "Bahagian hadapan bilik pameran Premio Safety Door berwarna biru di Puchong",
    business: premioDoorBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "Pertimbangkan rupa dan fungsi pintu masuk.", text: "Koleksi Premio merangkumi siri pintu pivot, gelangsar aluminium penuh, kayu, aluminium serta gabungan aluminium dan kayu. Gunakan lawatan ke bilik pameran untuk membincangkan cara bukaan, kemasan panel dan pilihan kunci yang sesuai dengan pintu masuk anda. Tanya pasukan Puchong tentang model yang dipamerkan serta pilihan yang boleh disesuaikan untuk projek anda.", image, alt: "Fasad biru dan pintu masuk kaca Premio di 25-G, Jalan TPK 2/8", route: "homeLiving", linkLabel: "Terokai Home & Living" },
      { type: "cards", alignHeadings: true, kicker: "Sebelum memilih", title: "Rancang ruang masuk, kemudian pilih pintu.", items: [
        { number: "01", title: "Catat ukuran bukaan", text: "Bawa foto serta anggaran lebar dan tinggi, termasuk bingkai sedia ada, aras lantai dan ruang di sekeliling pintu masuk. Catat arah bukaan pintu. Minta pembekal mengesahkan ukuran akhir di tapak sebelum membuat pesanan." },
        { number: "02", title: "Bandingkan butiran", text: "Lihat kemasan dan pemegang, serta cuba mekanisme bukaan dan kunci pada model yang tersedia. Terangkan keperluan pengudaraan atau privasi anda. Tanya perkara yang termasuk, ciri pilihan dan cara penjagaan pintu." },
        { number: "03", title: "Sahkan pemasangan", text: "Semak sebut harga bertulis, tempoh pengeluaran dan urusan pemasangan. Perjelas sama ada penanggalan pintu serta bingkai lama, pelupusan dan pembaikan dinding sekeliling termasuk. Sahkan syarat waranti dan pihak untuk dihubungi bagi sokongan selepas jualan." }
      ] },
      { type: "businessVisit", kicker: "Rancang lawatan", title: "Cari Premio Door di Jalan TPK 2/8.", text: "Bilik pameran Puchong terletak di 25-G.", addressLabel: "Alamat bilik pameran", address, phoneLabel: "Pertanyaan Premio Puchong", phoneDisplay: "+60 16 525 5100", note: "Sahkan waktu operasi dan model pameran semasa terus dengan bilik pameran Puchong sebelum berkunjung. Kongsikan jenis pintu dan ruang masuk yang anda pertimbangkan supaya pasukan dapat membantu anda membuat persediaan.", links: [
        { label: "Arah melalui Google Maps", url: directions },
        { label: "Direktori bilik pameran Premio", url: locations },
        { label: "Terokai siri pintu Premio", url: collections }
      ] }
    ],
    cta: { title: "Masukkan pintu masuk dalam perancangan anda.", text: "Lihat koleksi pintu Premio, simpan reka bentuk yang anda minati dan hubungi bilik pameran Puchong untuk membincangkan keperluan anda.", button: "Laman web Premio", url: website }
  },
  zh: {
    parentRoute: "homeLiving",
    eyebrow: "Premio Door · 安全门与入户门设计",
    title: "TPK Park里的Premio Door。",
    description: "到TPK Park内的Premio Safety Door蒲种展厅选看安全门与入户门。查看Jalan TPK 2/8门店地址、电话、导航路线，以及量尺、选门与安装前的准备建议。",
    lead: "Premio Safety Door蒲种展厅位于金銮工业园Jalan TPK 2/8的25-G号，是TPK Park家居生活集群的一员，可到店讨论住宅入户门的款式、饰面与安装安排。",
    image,
    heroAlt: "Premio Safety Door蒲种展厅的蓝色门面",
    business: premioDoorBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", title: "把外观与日常使用一起考虑。", text: "Premio的产品涵盖枢轴门、全铝推拉门、木门、铝门及铝木结合门系列。到展厅时，可以讨论适合自家入口的开门方式、门板饰面与门锁选项，并向蒲种团队了解当前展示的型号，以及哪些部分可以按项目需求定制。", image, alt: "Jalan TPK 2/8的25-G号Premio展厅，设有蓝色招牌与玻璃入口", route: "homeLiving", linkLabel: "查看家居生活品牌" },
      { type: "cards", alignHeadings: true, kicker: "选门之前", title: "先了解入口，再选择门款。", items: [
        { number: "01", title: "记录门洞与空间", text: "准备照片及大致宽高尺寸，拍下现有门框、地面高度与入口周围的空间，并注明开门方向。下单前，请供应商到现场确认最终尺寸。" },
        { number: "02", title: "比较使用细节", text: "现场查看饰面与把手，试用可供体验的开门和上锁机构，并说明通风或隐私方面的需要。了解标准配置、可选配件，以及日常清洁与保养方法。" },
        { number: "03", title: "确认安装安排", text: "查看书面报价、生产时间与安装安排，厘清拆除旧门和门框、清运及周围墙面修复是否包含在内。同时确认保修条款与售后服务的联系渠道。" }
      ] },
      { type: "businessVisit", kicker: "到访安排", title: "在Jalan TPK 2/8找到Premio Door。", text: "蒲种展厅位于25-G号。", addressLabel: "展厅地址", address, phoneLabel: "联系Premio蒲种展厅", phoneDisplay: "+60 16 525 5100", note: "到访前请直接向蒲种展厅确认营业时间及当前展示的型号。联系时说明所考虑的门款与入口情况，让团队协助您做好准备。", links: [
        { label: "使用Google Maps导航", url: directions },
        { label: "Premio展厅目录", url: locations },
        { label: "查看Premio门款系列", url: collections }
      ] }
    ],
    cta: { title: "把入户门纳入整体规划。", text: "先浏览Premio的产品系列，保存喜欢的款式，再联系蒲种展厅讨论实际需求。", button: "前往Premio官网", url: website }
  }
};
