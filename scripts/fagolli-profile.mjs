// Public details and image provenance: docs/fagolli-profile-sources.md.
const website = "https://www.fagolli.com.my/";
const contact = "https://www.fagolli.com.my/contact-us/";
const gallery = "https://www.fagolli.com.my/gallery/";
const gates = "https://www.fagolli.com.my/fagolli_bifoldgate/";
const whatsapp = "https://wa.me/601154078187";
const directions = "https://www.google.com/maps/search/?api=1&query=Fagolli+Showroom+43-1+Jalan+TPK+2%2F8+47180+Puchong";
const image = "https://www.tpkpark.com/assets/images/fagolli-trackless-gate-1440.webp";
const imageSource = { label: "Fagolli", url: gallery };
const address = "43-1, Jalan TPK 2/8, Taman Perindustrian Kinrara, Seksyen 2, 47180 Puchong, Selangor";

export const fagolliBusiness = {
  "@type": "HomeGoodsStore",
  "@id": "https://www.tpkpark.com/home-living/fagolli/#store",
  name: "Fagolli Autogate Showroom",
  alternateName: "Fagolli",
  legalName: "Digicraft MSC Sdn. Bhd.",
  url: website,
  telephone: "+601154078187",
  contactPoint: { "@type": "ContactPoint", contactType: "WhatsApp enquiries", telephone: "+601154078187", url: whatsapp },
  address: {
    "@type": "PostalAddress",
    streetAddress: "43-1, Jalan TPK 2/8, Taman Perindustrian Kinrara, Seksyen 2",
    addressLocality: "Puchong",
    addressRegion: "Selangor",
    postalCode: "47180",
    addressCountry: "MY"
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "18:00" }
  ],
  containedInPlace: { "@id": "https://www.tpkpark.com/#taman-perindustrian-kinrara" }
};

export const fagolliProfiles = {
  en: {
    parentRoute: "homeLiving",
    eyebrow: "Fagolli · Trackless autogates",
    title: "Fagolli at TPK Park.",
    description: "Explore Fagolli’s Puchong showroom for aluminium gates and trackless autogate systems. Find its Jalan TPK 2/8 address, phone, WhatsApp and opening hours.",
    lead: "Fagolli’s showroom on Jalan TPK 2/8 introduces aluminium gates and autogate systems for the home. Part of TPK Park’s Home & Living cluster, it is a stop for homeowners considering a new entrance or planning a gate replacement.",
    image,
    heroImage: image,
    heroAlt: "Fagolli aluminium gate with white horizontal slats and a dark frame",
    business: fagolliBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "Consider the gate as part of your entrance.", text: "Fagolli’s range includes aluminium swing gates, trackless bifold gates and motor systems such as the F2552. Compare the panel design and finish alongside the space needed for opening and parking. Remote controls and accessories are also part of the range; ask the team which options suit your gate and what is included in the proposed installation.", image, alt: "A Fagolli gate with white louvred panels, a dark frame and solar panels on the entrance pillars", caption: "A trackless aluminium gate installation from Fagolli’s official gallery. Photo:", captionSource: imageSource, route: "homeLiving", linkLabel: "Explore Home & Living" },
      { type: "cards", alignHeadings: true, kicker: "Before you choose", title: "Plan around your driveway.", items: [
        { number: "01", title: "Measure the entrance", text: "Bring the opening width and intended gate height, along with photos of the pillars, driveway and existing gate. Note any slope, drain or nearby wall so the installer can assess the site and confirm the final measurements." },
        { number: "02", title: "Compare the layout", text: "Ask how swing and bifold layouts would work with your parking space. Discuss panel styles, colours and pedestrian access, and ask to see the available demonstrations. Confirm the controls and accessories offered for your chosen setup." },
        { number: "03", title: "Plan the site work", text: "Request a quotation covering the gate, motor, wiring and installation. Clarify whether removing the old gate or altering pillars is included. Agree on the lead time, warranty terms, maintenance needs and after-sales contact before ordering." }
      ] },
      { type: "businessVisit", kicker: "Plan your visit", title: "Find Fagolli on Jalan TPK 2/8.", text: "The showroom is at 43-1.", addressLabel: "Showroom address", address, phoneLabel: "Fagolli enquiries", phoneDisplay: "+60 11 5407 8187", note: "Published hours are Monday–Friday, 10am–6pm. Saturday and Sunday visits are by appointment only. Confirm holiday hours and the displays available before travelling.", links: [
        { label: "Directions on Google Maps", url: directions },
        { label: "WhatsApp Fagolli", url: whatsapp },
        { label: "Fagolli showroom details", url: contact }
      ] }
    ],
    cta: { title: "Picture your new entrance.", text: "Browse Fagolli’s gate designs and bring a few examples, together with your entrance photos, to discuss the options for your home.", button: "Explore Fagolli gates", url: gates }
  },
  ms: {
    parentRoute: "homeLiving",
    eyebrow: "Fagolli · Pagar automatik tanpa rel",
    title: "Fagolli di TPK Park.",
    description: "Terokai pagar aluminium dan sistem autogate di bilik pameran Fagolli Puchong. Lihat alamat Jalan TPK 2/8, telefon, WhatsApp dan waktu operasi.",
    lead: "Bilik pameran Fagolli di Jalan TPK 2/8 memperkenalkan pagar aluminium dan sistem pagar automatik untuk kediaman. Sebagai sebahagian daripada kluster Home & Living TPK Park, ia sesuai dikunjungi apabila merancang pintu masuk baharu atau penggantian pagar rumah.",
    image,
    heroImage: image,
    heroAlt: "Pagar aluminium Fagolli dengan bilah mendatar putih dan bingkai gelap",
    business: fagolliBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "Padankan pagar dengan ruang masuk rumah.", text: "Rangkaian Fagolli merangkumi pagar ayun aluminium, pagar lipat tanpa rel dan sistem motor seperti F2552. Bandingkan reka bentuk panel serta kemasan dengan ruang yang diperlukan untuk membuka pagar dan meletakkan kereta. Alat kawalan jauh dan aksesori turut ditawarkan; tanya pasukan tentang pilihan yang sesuai dan perkara yang termasuk dalam cadangan pemasangan.", image, alt: "Pagar Fagolli dengan panel berbilah putih, bingkai gelap dan panel solar di atas tiang pintu masuk", caption: "Pemasangan pagar aluminium tanpa rel daripada galeri rasmi Fagolli. Foto:", captionSource: imageSource, route: "homeLiving", linkLabel: "Terokai Home & Living" },
      { type: "cards", alignHeadings: true, kicker: "Sebelum memilih", title: "Rancang mengikut ruang laluan masuk.", items: [
        { number: "01", title: "Ukur bukaan pagar", text: "Bawa ukuran lebar bukaan dan ketinggian pagar yang diingini, berserta foto tiang, laluan masuk dan pagar sedia ada. Catat cerun, longkang atau dinding berdekatan supaya pemasang boleh menilai tapak dan mengesahkan ukuran akhir." },
        { number: "02", title: "Bandingkan susun atur", text: "Tanya bagaimana pagar ayun dan lipat boleh dipadankan dengan ruang parkir anda. Bincangkan gaya panel, warna dan laluan pejalan kaki, serta minta melihat demonstrasi yang tersedia. Sahkan alat kawalan dan aksesori yang ditawarkan untuk pilihan anda." },
        { number: "03", title: "Rancang kerja tapak", text: "Minta sebut harga yang merangkumi pagar, motor, pendawaian dan pemasangan. Jelaskan sama ada penanggalan pagar lama atau pengubahsuaian tiang termasuk dalam harga. Persetujui tempoh siap, syarat jaminan, penyelenggaraan dan hubungan selepas jualan sebelum membuat pesanan." }
      ] },
      { type: "businessVisit", kicker: "Rancang lawatan", title: "Cari Fagolli di Jalan TPK 2/8.", text: "Bilik pameran terletak di 43-1.", addressLabel: "Alamat bilik pameran", address, phoneLabel: "Pertanyaan Fagolli", phoneDisplay: "+60 11 5407 8187", note: "Waktu operasi yang disenaraikan ialah Isnin–Jumaat, 10 pagi–6 petang. Lawatan pada Sabtu dan Ahad adalah melalui janji temu sahaja. Sahkan waktu cuti umum dan model pameran yang tersedia sebelum berkunjung.", links: [
        { label: "Arah melalui Google Maps", url: directions },
        { label: "WhatsApp Fagolli", url: whatsapp },
        { label: "Maklumat bilik pameran Fagolli", url: contact }
      ] }
    ],
    cta: { title: "Bayangkan pintu masuk baharu anda.", text: "Lihat reka bentuk pagar Fagolli dan bawa beberapa contoh bersama foto pintu masuk untuk membincangkan pilihan bagi kediaman anda.", button: "Terokai pagar Fagolli", url: gates }
  },
  zh: {
    parentRoute: "homeLiving",
    eyebrow: "Fagolli · 无轨自动门闸",
    title: "TPK Park里的Fagolli。",
    description: "Fagolli蒲种展厅位于TPK Park的43-1, Jalan TPK 2/8，提供铝合金门闸与无轨自动门系统。查看电话、WhatsApp、营业时间及到访建议。",
    lead: "Fagolli位于Jalan TPK 2/8的展厅，展示住宅铝合金门闸与自动门系统。作为TPK Park家居生活集群的一员，适合准备规划住宅入口或更换现有门闸的屋主前来了解。",
    image,
    heroImage: image,
    heroAlt: "采用白色横向百叶与深色框架的Fagolli铝合金门闸",
    business: fagolliBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "把门闸与住宅入口一起规划。", text: "Fagolli的产品包括铝合金平开门闸、无轨折叠门闸，以及F2552等自动门驱动系统。比较门板设计与表面处理时，也要考虑开启所需的空间及停车位置。品牌另有遥控器与相关配件，可向团队了解哪些选项适合自家门闸，以及安装方案包含哪些项目。", image, alt: "Fagolli白色百叶门板配深色框架，入口门柱上装有太阳能板", caption: "Fagolli官方图库中的无轨铝合金门闸安装实例。图片来源：", captionSource: imageSource, route: "homeLiving", linkLabel: "查看家居生活品牌" },
      { type: "cards", alignHeadings: true, kicker: "选购之前", title: "从车道与入口空间开始。", items: [
        { number: "01", title: "记录入口尺寸", text: "带上开口宽度、希望采用的门闸高度，以及门柱、车道和现有门闸的照片。记录斜坡、排水沟及邻近墙面的位置，让安装人员评估现场条件并确认最终尺寸。" },
        { number: "02", title: "比较开启方式", text: "询问平开式与折叠式门闸如何配合家中的停车空间。讨论门板款式、颜色及行人通行安排，并了解现场有哪些演示可看。确认所选配置适用的控制方式与配件。" },
        { number: "03", title: "安排现场工程", text: "请对方列出门闸、电机、布线与安装的报价，并说明拆除旧门闸或改动门柱是否另计。下单前，确认交付时间、保修条款、保养要求，以及售后服务的联系渠道。" }
      ] },
      { type: "businessVisit", kicker: "到访安排", title: "在Jalan TPK 2/8找到Fagolli。", text: "展厅位于43-1号。", addressLabel: "展厅地址", address, phoneLabel: "Fagolli咨询电话", phoneDisplay: "+60 11 5407 8187", note: "公布的营业时间为星期一至星期五，上午10时至下午6时。星期六及星期日仅接受预约。出发前，请确认公共假期营业安排及当前可看的展示型号。", links: [
        { label: "使用Google Maps导航", url: directions },
        { label: "WhatsApp联系Fagolli", url: whatsapp },
        { label: "Fagolli展厅联系资料", url: contact }
      ] }
    ],
    cta: { title: "构思住宅入口的新面貌。", text: "先浏览Fagolli的门闸设计，选几款参考样式，再带上入口照片，与团队讨论适合自家的方案。", button: "浏览Fagolli门闸", url: gates }
  }
};
