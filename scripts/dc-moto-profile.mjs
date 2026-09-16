// Public details and image provenance: docs/dc-moto-profile-sources.md.
const website = "https://www.dcmoto.my/";
const contact = "https://www.dcmoto.my/contact-us/";
const support = "https://www.dcmoto.my/user-support-guide/";
const whatsapp = "https://wa.me/601156279623";
const directions = "https://maps.app.goo.gl/xxw6Q4EFmfjz3uVG6";
const image = "https://www.tpkpark.com/assets/images/dc-moto-autogate-1440.webp";
const imageSource = { label: "DCMOTO", url: website };
const address = "49G, Jalan TPK 2/8, Taman Perindustrian Kinrara, Seksyen 2, 47180 Puchong, Selangor";

export const dcMotoBusiness = {
  "@type": "LocalBusiness",
  "@id": "https://www.tpkpark.com/home-living/dc-moto/#business",
  name: "DCMOTO Experience & Service Center",
  alternateName: "DC Moto",
  legalName: "Intelligent Network Sdn Bhd",
  url: website,
  telephone: "+601156279623",
  contactPoint: { "@type": "ContactPoint", contactType: "WhatsApp enquiries", telephone: "+601156279623", url: whatsapp },
  address: {
    "@type": "PostalAddress",
    streetAddress: "49G, Jalan TPK 2/8, Taman Perindustrian Kinrara, Seksyen 2",
    addressLocality: "Puchong",
    addressRegion: "Selangor",
    postalCode: "47180",
    addressCountry: "MY"
  },
  containedInPlace: { "@id": "https://www.tpkpark.com/#taman-perindustrian-kinrara" }
};

export const dcMotoProfiles = {
  en: {
    parentRoute: "homeLiving",
    eyebrow: "DC Moto · Autogate systems",
    title: "DC Moto at TPK Park.",
    description: "Find the DCMOTO Experience & Service Center in Puchong at 49G, Jalan TPK 2/8. Explore autogate systems, WhatsApp contact, directions and dealer information.",
    lead: "DC Moto (DCMOTO) specialises in autogate motor systems for swing and folding gates. Its Experience & Service Center is on Jalan TPK 2/8, within TPK Park’s Home & Living cluster. The brand’s website also connects homeowners and installers with product guides, support and dealers.",
    image,
    heroImage: image,
    heroAlt: "DCMoto autogate motor installed beside a metal gate",
    business: dcMotoBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "Plan how your gate will work.", text: "DCMOTO’s range includes GFM975 and GFM925 gate driver systems, with remote controls and accessories such as infrared safety beams. Solar power and Digicraft Home connectivity are also available for compatible setups. Discuss your gate’s size, weight and opening space with the installer, then confirm the power supply and accessories needed for the chosen model.", image, alt: "DCMoto motor and operating arm fitted to a horizontal metal gate beside a white wall", caption: "An installed DCMoto gate motor pictured in the brand’s official gallery. Photo:", captionSource: imageSource, route: "homeLiving", linkLabel: "Explore Home & Living" },
      { type: "cards", alignHeadings: true, kicker: "Before you choose", title: "Start with the gate and the site.", items: [
        { number: "01", title: "Bring gate details", text: "Take photos of the gate, pillars and driveway, and note the opening width and gate type. If you are replacing a motor, bring its model number and a description of the problem. An installer can assess the gate’s condition and compatibility." },
        { number: "02", title: "Discuss daily use", text: "Consider who will use the gate and how they will open it. Ask about remote controls, optional app access, safety beams, backup power and manual release. Have the installer explain which features and accessories suit your chosen system." },
        { number: "03", title: "Confirm the scope", text: "Use DCMOTO’s dealer list for sales enquiries. Ask for a quotation that separates the motor, accessories, wiring and installation, and clarify any gate repairs required. Confirm warranty terms and who will handle servicing after installation." }
      ] },
      { type: "businessVisit", kicker: "Plan your visit", title: "Find DC Moto on Jalan TPK 2/8.", text: "The DCMOTO Experience & Service Center is at 49G. You can also include Premio Door for entrance doors or KLOT for cabinet hardware when planning a visit along the same street.", addressLabel: "Experience & Service Center", address, phoneLabel: "DCMOTO WhatsApp", phoneDisplay: "+60 11 5627 9623", phoneUrl: whatsapp, note: "Contact the centre via WhatsApp to confirm opening hours and the support or demonstrations available before visiting. DCMOTO directs sales and purchases to its dealers.", links: [
        { label: "Directions on Google Maps", url: directions },
        { label: "Centre details & official dealers", url: contact },
        { label: "DCMOTO user guides & support", url: support },
        { label: "Entrance doors: Premio Door", route: "premioDoor" },
        { label: "Cabinet hardware: KLOT", route: "klot" }
      ] }
    ],
    cta: { title: "Start with your gate details.", text: "Explore DCMOTO’s systems and note the features you need before speaking with a dealer about suitability, installation and pricing.", button: "Explore DCMOTO systems", url: website }
  },
  ms: {
    parentRoute: "homeLiving",
    eyebrow: "DC Moto · Sistem pagar automatik",
    title: "DC Moto di TPK Park.",
    description: "Cari DCMOTO Experience & Service Center di 49G, Jalan TPK 2/8, Puchong. Terokai sistem autogate, WhatsApp, arah perjalanan dan maklumat pengedar rasmi.",
    lead: "DC Moto (DCMOTO) mengkhusus dalam sistem motor pagar automatik untuk pagar ayun dan lipat. Pusat Pengalaman & Servisnya terletak di Jalan TPK 2/8, dalam kluster Home & Living TPK Park. Laman rasmi jenama ini turut menyediakan panduan produk, sokongan dan maklumat pengedar untuk pemilik rumah serta pemasang.",
    image,
    heroImage: image,
    heroAlt: "Motor pagar automatik DCMoto dipasang di sebelah pagar logam",
    business: dcMotoBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "Rancang cara pagar anda berfungsi.", text: "Rangkaian DCMOTO merangkumi sistem pemacu pagar GFM975 dan GFM925, alat kawalan jauh serta aksesori seperti sensor keselamatan inframerah. Pilihan kuasa solar dan sambungan Digicraft Home juga tersedia untuk konfigurasi yang serasi. Bincangkan saiz, berat dan ruang bukaan pagar dengan pemasang, kemudian sahkan bekalan kuasa serta aksesori yang diperlukan untuk model pilihan anda.", image, alt: "Motor dan lengan penggerak DCMoto dipasang pada pagar logam berjalur mendatar di sebelah dinding putih", caption: "Pemasangan motor pagar DCMoto yang dipaparkan dalam galeri rasmi jenama. Foto:", captionSource: imageSource, route: "homeLiving", linkLabel: "Terokai Home & Living" },
      { type: "cards", alignHeadings: true, kicker: "Sebelum memilih", title: "Mulakan dengan pagar dan tapak.", items: [
        { number: "01", title: "Bawa butiran pagar", text: "Ambil foto pagar, tiang dan laluan masuk, serta catat lebar bukaan dan jenis pagar. Jika menggantikan motor, bawa nombor model dan penerangan masalahnya. Pemasang boleh menilai keadaan pagar serta keserasian sistem." },
        { number: "02", title: "Bincangkan kegunaan harian", text: "Pertimbangkan siapa yang menggunakan pagar dan cara mereka membukanya. Tanya tentang alat kawalan jauh, akses aplikasi pilihan, sensor keselamatan, kuasa sandaran dan pelepas manual. Minta pemasang menerangkan ciri serta aksesori yang sesuai dengan sistem pilihan anda." },
        { number: "03", title: "Sahkan skop kerja", text: "Rujuk senarai pengedar DCMOTO untuk pertanyaan jualan. Minta sebut harga yang mengasingkan motor, aksesori, pendawaian dan pemasangan, serta jelaskan sebarang pembaikan pagar yang diperlukan. Sahkan syarat jaminan dan pihak yang mengurus servis selepas pemasangan." }
      ] },
      { type: "businessVisit", kicker: "Rancang lawatan", title: "Cari DC Moto di Jalan TPK 2/8.", text: "DCMOTO Experience & Service Center terletak di 49G. Anda juga boleh singgah di Premio Door untuk pintu masuk atau KLOT untuk kelengkapan kabinet semasa merancang lawatan di jalan yang sama.", addressLabel: "Pusat Pengalaman & Servis", address, phoneLabel: "WhatsApp DCMOTO", phoneDisplay: "+60 11 5627 9623", phoneUrl: whatsapp, note: "Hubungi pusat ini melalui WhatsApp untuk mengesahkan waktu operasi serta sokongan atau demonstrasi yang tersedia sebelum berkunjung. DCMOTO mengarahkan urusan jualan dan pembelian kepada pengedarnya.", links: [
        { label: "Arah melalui Google Maps", url: directions },
        { label: "Maklumat pusat & pengedar rasmi", url: contact },
        { label: "Panduan pengguna & sokongan DCMOTO", url: support },
        { label: "Pintu masuk: Premio Door", route: "premioDoor" },
        { label: "Kelengkapan kabinet: KLOT", route: "klot" }
      ] }
    ],
    cta: { title: "Mulakan dengan butiran pagar anda.", text: "Terokai sistem DCMOTO dan catat ciri yang anda perlukan sebelum berbincang dengan pengedar tentang kesesuaian, pemasangan dan harga.", button: "Terokai sistem DCMOTO", url: website }
  },
  zh: {
    parentRoute: "homeLiving",
    eyebrow: "DC Moto · 自动门闸系统",
    title: "TPK Park里的DC Moto。",
    description: "DCMOTO蒲种体验与服务中心位于TPK Park的49G, Jalan TPK 2/8。了解自动门闸系统、WhatsApp联系、导航路线、官方经销商及到访建议。",
    lead: "DC Moto（DCMOTO）专注于平开式与折叠式门闸的自动驱动系统。其体验与服务中心位于Jalan TPK 2/8，是TPK Park家居生活集群的一员。品牌官网也为屋主和安装人员提供产品指南、使用支持及经销商资料。",
    image,
    heroImage: image,
    heroAlt: "安装在金属门闸旁的DCMoto自动门闸电机",
    business: dcMotoBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "从门闸的使用方式开始规划。", text: "DCMOTO的产品包括GFM975与GFM925门闸驱动系统、遥控器，以及红外线安全感应器等配件。兼容的配置也可选择太阳能供电及Digicraft Home连接功能。选购时，可先与安装人员讨论门闸的尺寸、重量及开启空间，再确认所选型号需要的供电方式与配件。", image, alt: "DCMoto电机与驱动臂安装在白墙旁的横条金属门闸上", caption: "DCMoto自动门闸电机的安装照片，选自品牌官方图库。图片来源：", captionSource: imageSource, route: "homeLiving", linkLabel: "查看家居生活品牌" },
      { type: "cards", alignHeadings: true, kicker: "选购之前", title: "先了解门闸与现场条件。", items: [
        { number: "01", title: "带上门闸资料", text: "拍下门闸、门柱与车道的照片，记录开口宽度及门闸类型。如果准备更换电机，可带上现有型号，并说明遇到的问题，让安装人员评估门闸状况与系统是否适配。" },
        { number: "02", title: "讨论日常使用", text: "考虑家中有哪些人会使用门闸，以及需要怎样的开启方式。可询问遥控器、选配手机应用连接、安全感应器、备用电源与手动释放功能，请安装人员说明所选系统适用的功能和配件。" },
        { number: "03", title: "确认安装范围", text: "销售询价可参考DCMOTO的官方经销商名单。请对方在报价中分列电机、配件、布线与安装费用，并说明是否需要维修原有门闸。下单前，确认保修条款及安装后的维修服务由谁负责。" }
      ] },
      { type: "businessVisit", kicker: "到访安排", title: "在Jalan TPK 2/8找到DC Moto。", text: "DCMOTO体验与服务中心位于49G号。规划同一条街的到访行程时，也可到Premio Door了解入户门，或到KLOT选看橱柜五金。", addressLabel: "体验与服务中心", address, phoneLabel: "DCMOTO WhatsApp", phoneDisplay: "+60 11 5627 9623", phoneUrl: whatsapp, note: "出发前，请通过WhatsApp向中心确认营业时间，以及可提供的支持或产品演示。DCMOTO的销售与购买事宜请联系其经销商。", links: [
        { label: "使用Google Maps导航", url: directions },
        { label: "中心资料与官方经销商", url: contact },
        { label: "DCMOTO使用指南与支持", url: support },
        { label: "入户门：Premio Door", route: "premioDoor" },
        { label: "橱柜五金：KLOT", route: "klot" }
      ] }
    ],
    cta: { title: "带着门闸资料开始沟通。", text: "先浏览DCMOTO的系统并记下所需功能，再向经销商了解适配要求、安装安排与价格。", button: "了解DCMOTO系统", url: website }
  }
};
