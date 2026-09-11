export const origin = "https://www.tpkpark.com";

export const routeSlugs = {
  home: "",
  about: "about",
  homeLiving: "home-living",
  automotive: "automotive",
  lifestyle: "lifestyle",
  leasing: "leasing",
  leasingShop: "leasing/shop-showroom",
  leasingDetached: "leasing/detached-building",
  leasingSemiDetached: "leasing/semi-detached",
  news: "news",
  milestones: "milestones",
  profile: "wong-shung-yen",
  publicRecord: "wong-shung-yen/public-record",
  contact: "contact"
};

export const routeIds = Object.keys(routeSlugs);

export const localeConfig = {
  en: { prefix: "", htmlLang: "en-MY", hreflang: "en-MY", ogLocale: "en_MY", short: "EN", label: "English" },
  ms: { prefix: "ms", htmlLang: "ms-MY", hreflang: "ms-MY", ogLocale: "ms_MY", short: "BM", label: "Bahasa Melayu" },
  zh: { prefix: "zh", htmlLang: "zh-Hans-MY", hreflang: "zh-Hans-MY", ogLocale: "zh_MY", short: "中文", label: "中文" }
};

export const seoTitles = {
  en: {
    home: "TPK Park | Kinrara Industrial Park, Puchong",
    about: "About TPK Park | Taman Perindustrian Kinrara, Puchong",
    homeLiving: "Home & Living Showrooms in Puchong | TPK Park",
    automotive: "Automotive Sales & Services in Puchong | TPK Park",
    lifestyle: "Dining, Fitness & Lifestyle in Puchong | TPK Park",
    leasing: "Shops, Showrooms & Buildings for Rent in Puchong | TPK Park",
    leasingShop: "Shop & Showroom for Rent in Kinrara, Puchong | TPK Park",
    leasingDetached: "Detached Showroom Building for Rent in Puchong | TPK Park",
    leasingSemiDetached: "Semi-Detached Premises in Puchong | TPK Park",
    news: "TPK Park News, Updates & Media Coverage | Puchong",
    milestones: "TPK Park | Malaysia Book of Records Recognition 2026",
    profile: "Wong Shung Yen 黄松延 | Managing Director, TPK Park",
    publicRecord: "Wong Shung Yen Media & Public Record | TPK Park",
    contact: "Contact TPK Park Puchong | Leasing & Enquiries"
  },
  ms: {
    home: "TPK Park | Taman Perindustrian Kinrara, Puchong",
    about: "Tentang TPK Park | Taman Perindustrian Kinrara, Puchong",
    homeLiving: "Bilik Pameran Home & Living di Puchong | TPK Park",
    automotive: "Jualan & Servis Automotif di Puchong | TPK Park",
    lifestyle: "Makan, Kecergasan & Lifestyle di Puchong | TPK Park",
    leasing: "Kedai & Bangunan untuk Disewa di Puchong | TPK Park",
    leasingShop: "Kedai untuk Disewa di Kinrara, Puchong | TPK Park",
    leasingDetached: "Bangunan Sesebuah untuk Disewa di Puchong | TPK Park",
    leasingSemiDetached: "Premis Berkembar di Puchong | TPK Park",
    news: "Berita, Kemas Kini & Liputan Media TPK Park | Puchong",
    milestones: "TPK Park | Pengiktirafan Malaysia Book of Records 2026",
    profile: "Wong Shung Yen 黄松延 | Pengarah Urusan TPK Park",
    publicRecord: "Media & Rekod Awam Wong Shung Yen | TPK Park",
    contact: "Hubungi TPK Park Puchong | Penyewaan & Pertanyaan"
  },
  zh: {
    home: "蒲种金銮工业园 TPK Park | 家居生活、汽车服务与生活品味",
    about: "关于TPK Park | 蒲种Taman Perindustrian Kinrara",
    homeLiving: "蒲种家居生活展厅与装修品牌 | TPK Park",
    automotive: "蒲种汽车销售、维修与美容服务 | TPK Park",
    lifestyle: "蒲种餐饮、运动与生活配套 | TPK Park",
    leasing: "蒲种金銮工业园商铺、展厅与整栋物业出租 | TPK Park",
    leasingShop: "蒲种金銮工业园商铺与展厅出租 | TPK Park",
    leasingDetached: "蒲种独立式商业建筑出租 | TPK Park",
    leasingSemiDetached: "蒲种半独立式厂房与展厅 | TPK Park",
    news: "TPK Park新闻、动态与媒体报道 | 蒲种",
    milestones: "TPK Park家居生活集群 | 2026马来西亚纪录大全认证",
    profile: "黄松延 Wong Shung Yen | TPK Park董事经理",
    publicRecord: "黄松延媒体报道与公开记录 | Wong Shung Yen",
    contact: "联系蒲种TPK Park | 租赁与一般咨询"
  }
};

const septemberSeoRoutes = new Set(["home", "homeLiving", "automotive", "lifestyle", "leasing", "leasingShop", "leasingDetached", "leasingSemiDetached", "news", "milestones"]);
const routeLastModifiedOverrides = {
  news: "2026-09-11",
  home: "2026-09-11",
  about: "2026-09-11",
  homeLiving: "2026-09-09",
  leasing: "2026-09-10",
  leasingShop: "2026-09-09",
  leasingDetached: "2026-09-09",
  contact: "2026-09-08",
  profile: "2026-09-04",
  publicRecord: "2026-09-04"
};
export const routeLastModified = Object.fromEntries(routeIds.map((routeId) => [routeId, routeLastModifiedOverrides[routeId] || (septemberSeoRoutes.has(routeId) ? "2026-09-07" : "2026-09-03")]));

export function routePath(locale, routeId) {
  const prefix = localeConfig[locale].prefix;
  const slug = routeSlugs[routeId];
  const parts = [prefix, slug].filter(Boolean);
  return parts.length ? `/${parts.join("/")}/` : "/";
}

export const images = {
  park: "https://i.imgur.com/an6ruYm.jpg",
  carnival: "https://i.imgur.com/syF6CHS.jpg",
  record: "https://i.imgur.com/yFCJC9P.png",
  portrait: "https://i.imgur.com/vM9ott4.jpg",
  homeLiving: "https://i.imgur.com/EDf26sR.jpg",
  automotive: "https://i.imgur.com/XsscuQz.jpg",
  lifestyle: "https://i.imgur.com/Z5h4hmH.jpg",
  leasing: "https://i.imgur.com/P4Lj1qX.jpg",
  leasingShop: "https://i.imgur.com/fpOMhvX.jpg",
  leasingDetached: "https://i.imgur.com/Ghs7Ubv.jpg",
  leasingSemiDetached: "https://i.imgur.com/I5lSjeF.jpg"
};

export const leasingInventory = {
  shopShowroom: {
    routeId: "leasingShop",
    queryValue: "shop-showroom",
    image: images.leasingShop,
    brochureUrls: {
      en: "/assets/leasing/tpk-park-section-2-shoplots-for-lease.pdf",
      ms: "/assets/leasing/tpk-park-section-2-shoplots-for-lease-ms.pdf",
      zh: "/assets/leasing/tpk-park-section-2-shoplots-for-lease-zh.pdf"
    },
    mapUrl: "https://www.google.com/maps/search/Jalan+TPK+2%2F8,+Taman+Perindustrian+Kinrara,+Puchong",
    values: {
      availability: { en: "Limited units — confirm current options", ms: "Unit terhad — sahkan pilihan semasa", zh: "少量单位 — 请确认当前选择" },
      address: { en: "Shoplots along Jalan TPK 2/8, Taman Perindustrian Kinrara, Puchong", ms: "Deretan kedai di sepanjang Jalan TPK 2/8, Taman Perindustrian Kinrara, Puchong", zh: "蒲种金銮工业园 Jalan TPK 2/8 沿线商铺" },
      builtUp: { en: "Approx. 3,520 sq ft across two floors for a standard intermediate unit", ms: "Kira-kira 3,520 kaki persegi merentasi dua tingkat bagi unit tengah standard", zh: "标准中间单位两层建筑面积合计约3,520平方英尺" },
      landArea: { en: "Standard lot: 22 ft × 80 ft (approx. 1,760 sq ft)", ms: "Lot standard: 22 kaki × 80 kaki (kira-kira 1,760 kaki persegi)", zh: "标准地段：22英尺 × 80英尺，约1,760平方英尺" },
      askingRent: { en: "Indicative standard unit: ground floor RM8,300/month; first floor RM3,600/month", ms: "Unit standard indikatif: tingkat bawah RM8,300/bulan; tingkat satu RM3,600/bulan", zh: "标准单位参考叫租：底层每月RM8,300；一楼每月RM3,600" },
      format: { en: "Two-storey shop and showroom; confirm floor or whole-unit availability", ms: "Kedai dan bilik pameran dua tingkat; sahkan ketersediaan mengikut tingkat atau seluruh unit", zh: "两层商铺与展厅；请确认个别楼层或整栋供应" }
    }
  },
  detached: {
    routeId: "leasingDetached",
    queryValue: "detached-building",
    image: images.leasingDetached,
    brochureUrls: {
      en: "/assets/leasing/tpk-park-detached-showroom-building-no-7-for-lease.pdf",
      ms: "/assets/leasing/tpk-park-detached-showroom-building-no-7-for-lease-ms.pdf",
      zh: "/assets/leasing/tpk-park-detached-showroom-building-no-7-for-lease-zh.pdf"
    },
    mapUrl: "https://www.google.com/maps/search/No.+7+Jalan+TPK+2%2F4,+Taman+Perindustrian+Kinrara,+Puchong",
    values: {
      availability: { en: "1 building — confirm current availability", ms: "1 bangunan — sahkan ketersediaan semasa", zh: "1栋 — 请确认当前供应" },
      address: { en: "No. 7, Jalan TPK 2/4, Taman Perindustrian Kinrara, Puchong", ms: "No. 7, Jalan TPK 2/4, Taman Perindustrian Kinrara, Puchong", zh: "蒲种金銮工业园 Jalan TPK 2/4 门牌7号" },
      builtUp: { en: "Approx. 10,965 sq ft", ms: "Kira-kira 10,965 kaki persegi", zh: "建筑面积约10,965平方英尺" },
      landArea: { en: "Approx. 21,316 sq ft", ms: "Kira-kira 21,316 kaki persegi", zh: "土地面积约21,316平方英尺" },
      askingRent: { en: "RM58,000 per month (indicative)", ms: "RM58,000 sebulan (indikatif)", zh: "每月RM58,000（参考叫租）" },
      format: { en: "Detached whole building with private compound", ms: "Bangunan sesebuah dengan kawasan persendirian", zh: "带独立范围的整栋建筑" }
    }
  },
  semiDetached: {
    status: "leased",
    routeId: "leasingSemiDetached",
    queryValue: "semi-detached",
    image: images.leasingSemiDetached,
    brochureUrls: {
      en: "/assets/leasing/tpk-park-semi-detached-showroom-industrial-unit-no-69-for-lease.pdf",
      ms: "/assets/leasing/tpk-park-semi-detached-showroom-industrial-unit-no-69-for-lease-ms.pdf",
      zh: "/assets/leasing/tpk-park-semi-detached-showroom-industrial-unit-no-69-for-lease-zh.pdf"
    },
    mapUrl: "https://www.google.com/maps/search/69+Jalan+TPK+2%2F8,+Taman+Perindustrian+Kinrara,+Puchong",
    values: {
      availability: { en: "Leased — enquire about other premises", ms: "Telah disewa — tanya tentang premis lain", zh: "已出租 — 欢迎查询其他物业" },
      address: { en: "69, Jalan TPK 2/8, Taman Perindustrian Kinrara, Puchong", ms: "69, Jalan TPK 2/8, Taman Perindustrian Kinrara, Puchong", zh: "蒲种金銮工业园 Jalan TPK 2/8 门牌69号" },
      builtUp: { en: "Approx. 6,446.88 sq ft", ms: "Kira-kira 6,446.88 kaki persegi", zh: "建筑面积约6,446.88平方英尺" },
      landArea: null,
      askingRent: null,
      format: { en: "Semi-detached whole-building format", ms: "Format keseluruhan bangunan berkembar", zh: "半独立式整栋单位" }
    }
  }
};

export const articles = [
  {
    source: "China Press",
    date: "2026-07-06",
    sourceLanguage: "zh",
    image: "https://i.imgur.com/onsprL0.jpg",
    url: "https://kl.chinapress.com.my/?p=1626674",
    title: {
      en: "TPK Park receives Malaysia Book of Records recognition",
      ms: "TPK Park raih pengiktirafan Malaysia Book of Records",
      zh: "TPK Park获《马来西亚纪录大全》认证"
    },
    summary: {
      en: "China Press reports on the formal recognition of TPK Park's focused Home & Living retail cluster.",
      ms: "China Press melaporkan pengiktirafan rasmi bagi kluster runcit Home & Living berfokus di TPK Park.",
      zh: "《中国报》报道TPK Park聚焦发展的家居生活零售集群获得正式认证。"
    }
  },
  {
    source: "Kwong Wah",
    date: "2026-07-05",
    sourceLanguage: "zh",
    image: "https://i.imgur.com/Phs3fKB.jpg",
    url: "https://www.kwongwah.com.my/20260705/%E9%BB%84%E6%80%9D%E6%B1%89%EF%BC%9A%E6%84%BF%E6%99%AF%E9%A1%BB%E4%BB%98%E8%AF%B8%E8%A1%8C%E5%8A%A8-%E9%87%91%E9%8A%AE%E5%B7%A5%E4%B8%9A%E5%9B%AD%E8%BD%AC%E5%9E%8B%E6%88%90%E8%92%B2%E7%A7%8D/",
    title: {
      en: "A 30-year industrial park transformation into a Home & Living destination",
      ms: "Transformasi 30 tahun daripada taman perindustrian kepada destinasi Home & Living",
      zh: "三十年工业园转型：愿景必须付诸行动"
    },
    summary: {
      en: "The report traces the long-term work behind the evolution of a mature industrial setting into a Home & Living destination.",
      ms: "Laporan ini menelusuri usaha jangka panjang di sebalik perubahan kawasan perindustrian matang menjadi destinasi Home & Living.",
      zh: "报道回顾成熟工业园经过长期经营，逐步发展为家居生活目的地的历程。"
    }
  },
  {
    source: "Oriental Daily",
    date: "2026-07-05",
    sourceLanguage: "zh",
    image: "https://i.imgur.com/o3dIfeA.jpg",
    url: "https://www.orientaldaily.com.my/news/central/2026/07/05/830619",
    title: {
      en: "Industrial park renewal creates a focused Puchong retail destination",
      ms: "Pembaharuan taman perindustrian membentuk destinasi runcit di Puchong",
      zh: "成熟工业园更新，打造蒲种家居生活目的地"
    },
    summary: {
      en: "A look at how property renewal and a clearer business mix are reshaping a mature industrial location in Puchong.",
      ms: "Laporan mengenai bagaimana pembaharuan hartanah dan campuran perniagaan yang lebih jelas membentuk semula lokasi perindustrian matang di Puchong.",
      zh: "报道探讨产业更新与更清晰的商业组合，如何重塑蒲种一处成熟工业区。"
    }
  },
  {
    source: "Harian Metro",
    date: "2026-07-04",
    sourceLanguage: "ms",
    image: "https://i.imgur.com/t1ZtWIk.jpg",
    url: "https://www.hmetro.com.my/taxonomy/term/2057/2026/07/1377876/tpk-park-kluster-home-living-terbesar-di-malaysia",
    title: {
      en: "TPK Park recognised for Malaysia's largest Home & Living cluster in an industrial park",
      ms: "TPK Park kluster Home & Living terbesar dalam taman perindustrian di Malaysia",
      zh: "TPK Park获认证为工业园内最大家居生活零售集群"
    },
    summary: {
      en: "Harian Metro covers the record assessment and the scale of the recognised Home & Living cluster.",
      ms: "Harian Metro melaporkan penilaian rekod dan skala kluster Home & Living yang diiktiraf.",
      zh: "《Harian Metro》报道纪录评估，以及获认证家居生活集群的规模。"
    }
  },
  {
    source: "Kwong Wah",
    date: "2026-07-04",
    sourceLanguage: "zh",
    image: "https://i.imgur.com/TVeuKhd.jpg",
    url: "https://www.kwongwah.com.my/?p=1801778",
    title: {
      en: "TPK Park brings leading home and living brands together in Kinrara",
      ms: "TPK Park menghimpunkan jenama Home & Living di Kinrara",
      zh: "TPK Park汇聚主要家居生活品牌"
    },
    summary: {
      en: "Coverage of the businesses and complementary categories that give the Home & Living cluster its breadth.",
      ms: "Liputan mengenai perniagaan dan kategori saling melengkapi yang membentuk keluasan kluster Home & Living.",
      zh: "报道介绍构成家居生活集群的商家，以及彼此互补的业态类别。"
    }
  },
  {
    source: "New Straits Times",
    date: "2026-06-30",
    sourceLanguage: "en",
    image: "https://i.imgur.com/cHWqFB9.jpg",
    url: "https://www.nst.com.my/business/corporate/2026/06/1475902/tpk-park-enters-record-books-largest-home-and-living-retail",
    title: {
      en: "TPK Park enters the record books for its Home & Living retail cluster",
      ms: "TPK Park catat rekod bagi kluster peruncitan Home & Living",
      zh: "TPK Park家居生活零售集群载入纪录"
    },
    summary: {
      en: "New Straits Times reports on the national record and the role of long-term clustering in reaching the milestone.",
      ms: "New Straits Times melaporkan rekod kebangsaan dan peranan pengelompokan jangka panjang dalam mencapai pencapaian tersebut.",
      zh: "《新海峡时报》报道该项国家纪录，以及长期商业集群发展对达成里程碑的作用。"
    }
  },
  {
    source: "Guang Ming Daily",
    date: "2026-06-30",
    sourceLanguage: "zh",
    image: "https://i.imgur.com/3N1S23N.jpg",
    url: "https://guangming.com.my/%e3%80%90%e5%b8%82%e5%9c%ba%e6%83%85%e6%8a%a5%e3%80%91%e5%b7%a5%e4%b8%9a%e5%9b%ad%e6%9c%80%e5%a4%a7%e5%ae%b6%e5%b1%85%e4%b8%8e%e7%94%9f%e6%b4%bb%e9%9b%b6%e5%94%ae%e9%9b%86%e7%be%a4",
    title: {
      en: "Industrial park is home to the largest Home & Living retail cluster",
      ms: "Taman perindustrian menempatkan kluster runcit Home & Living terbesar",
      zh: "工业园内最大家居与生活零售集群"
    },
    summary: {
      en: "Guang Ming Daily highlights the recognised cluster within its mature industrial-park setting.",
      ms: "Guang Ming Daily menonjolkan kluster yang diiktiraf dalam persekitaran taman perindustrian matang.",
      zh: "《光明日报》聚焦获认证集群与其成熟工业园环境。"
    }
  },
  {
    source: "Business News",
    date: "2026-06-28",
    sourceLanguage: "en",
    image: "https://i.imgur.com/PN8KtTZ.jpg",
    url: "https://businessnews.com.my/tpk-park-30-year-transformation-book-of-record/",
    title: {
      en: "TPK Park's 30-year transformation earns national recognition",
      ms: "Transformasi 30 tahun TPK Park menerima pengiktirafan kebangsaan",
      zh: "TPK Park三十年转型获国家纪录认证"
    },
    summary: {
      en: "The article connects three decades of gradual renewal with the cluster's 2026 national recognition.",
      ms: "Artikel ini mengaitkan pembaharuan beransur selama tiga dekad dengan pengiktirafan kebangsaan kluster pada 2026.",
      zh: "文章将三十年的渐进式更新，与集群在2026年获得国家认证联系起来。"
    }
  },
  {
    source: "Malaya Newsroom",
    date: "2026-06-26",
    sourceLanguage: "ms",
    image: "https://i.imgur.com/NRbC08K.jpg",
    url: "https://malayanewsroom.com/26/06/2026/tpk-park-raih-pengiktirafan-malaysia-book-of-records-hasil-transformasi-selama-30-tahun/",
    title: {
      en: "Three decades of renewal recognised by the Malaysia Book of Records",
      ms: "Transformasi selama 30 tahun diiktiraf Malaysia Book of Records",
      zh: "三十年更新历程获《马来西亚纪录大全》肯定"
    },
    summary: {
      en: "Malaya Newsroom reviews the long-term transformation leading to the Malaysia Book of Records milestone.",
      ms: "Malaya Newsroom meninjau transformasi jangka panjang yang membawa kepada pencapaian Malaysia Book of Records.",
      zh: "Malaya Newsroom回顾长期转型历程，以及其如何迈向《马来西亚纪录大全》里程碑。"
    }
  }
];

export const profileSources = [
  {
    year: "2026", date: "2026-07-07", source: "Kosmo!", sourceLanguage: "ms", category: "place",
    url: "https://www.kosmo.com.my/2026/07/07/kejayaan-tpk-park-diiktiraf-malaysia-book-of-records/",
    title: { en: "TPK Park's renewal receives national record recognition", ms: "Pembaharuan TPK Park menerima pengiktirafan rekod kebangsaan", zh: "TPK Park更新成果获国家纪录认证" },
    summary: { en: "Kosmo! reports on the Malaysia Book of Records recognition and the long-term work behind the Home & Living cluster.", ms: "Kosmo! melaporkan pengiktirafan Malaysia Book of Records serta usaha jangka panjang di sebalik kluster Home & Living.", zh: "《Kosmo!》报道TPK Park获《马来西亚纪录大全》认证，以及家居生活集群背后的长期工作。" }
  },
  {
    year: "2026", date: "2026-07-06", source: "Malaysian Business", sourceLanguage: "en", category: "place", featured: true,
    url: "https://malaysian-business.com/portal/2026/07/06/yb-ng-sze-han-tpk-parks-mbor-recognition-reflects-puchongs-evolution-as-a-home-living-hub/",
    title: { en: "Recognition reflects Puchong's evolution as a Home & Living hub", ms: "Pengiktirafan mencerminkan evolusi Puchong sebagai hab Home & Living", zh: "认证反映蒲种逐步发展为家居生活枢纽" },
    summary: { en: "The report connects TPK Park's record recognition with the wider evolution of Puchong's retail and property landscape.", ms: "Laporan ini mengaitkan pengiktirafan TPK Park dengan evolusi landskap runcit dan hartanah Puchong.", zh: "报道把TPK Park的纪录认证与蒲种零售及房地产格局的演变联系起来。" }
  },
  {
    year: "2026", date: "2026-07-05", source: "Oriental Daily", sourceLanguage: "zh", category: "place",
    url: "https://www.orientaldaily.com.my/news/central/2026/07/05/830619",
    title: { en: "A mature industrial area renewed as a focused retail destination", ms: "Kawasan industri matang diperbaharui sebagai destinasi runcit berfokus", zh: "成熟工业区更新为聚焦型零售目的地" },
    summary: { en: "Oriental Daily examines the property renewal, tenant mix and placemaking behind TPK Park's development.", ms: "Oriental Daily meneliti pembaharuan hartanah, campuran penyewa dan pembentukan tempat di sebalik pembangunan TPK Park.", zh: "《东方日报》探讨TPK Park发展过程中的产业更新、租户组合与地方营造。" }
  },
  {
    year: "2026", source: "Utusan Malaysia", sourceLanguage: "ms", category: "place",
    url: "https://www.utusan.com.my/nasional/2026/07/tpk-diiktiraf-mbor/",
    title: { en: "TPK Park recognised by the Malaysia Book of Records", ms: "TPK Park diiktiraf Malaysia Book of Records", zh: "TPK Park获《马来西亚纪录大全》认证" },
    summary: { en: "Utusan Malaysia records the formal recognition of the Home & Living retail cluster within an industrial-park setting.", ms: "Utusan Malaysia merekodkan pengiktirafan rasmi kluster runcit Home & Living dalam persekitaran taman perindustrian.", zh: "《Utusan Malaysia》报道工业园环境内的家居生活零售集群获得正式认证。" }
  },
  {
    year: "2026", date: "2026-06-30", source: "New Straits Times", sourceLanguage: "en", category: "place", featured: true,
    url: "https://www.nst.com.my/business/corporate/2026/06/1475902/tpk-park-enters-record-books-largest-home-and-living-retail",
    title: { en: "TPK Park enters the record books for its Home & Living cluster", ms: "TPK Park catat rekod bagi kluster Home & Living", zh: "TPK Park家居生活集群载入纪录" },
    summary: { en: "New Straits Times reports on the national record and the role of sustained retail clustering in reaching the milestone.", ms: "New Straits Times melaporkan rekod kebangsaan dan peranan pengelompokan runcit berterusan dalam mencapai pencapaian tersebut.", zh: "《新海峡时报》报道该项国家纪录，以及长期零售集群规划对达成里程碑的作用。" }
  },
  {
    year: "2026", date: "2026-02-02", source: "Sin Chew Daily", sourceLanguage: "zh", category: "community",
    url: "https://metro.sinchew.com.my/news/20260202/metro/7236636",
    title: { en: "Public voice on education at SJK(C) Shin Cheng", ms: "Pandangan awam mengenai pendidikan di SJK(C) Shin Cheng", zh: "深静（哈古乐）华小教育事务公共发言" },
    summary: { en: "Coverage documenting continuing participation in school and community matters at SJK(C) Shin Cheng.", ms: "Liputan yang merekodkan penglibatan berterusan dalam hal sekolah dan masyarakat di SJK(C) Shin Cheng.", zh: "报道记录黄松延持续参与深静（哈古乐）华小的校务与社区事务。" }
  },
  {
    year: "2025", source: "Institut Teknologi Nasional Malang", sourceLanguage: "id", category: "business",
    url: "https://itn.ac.id/headlines/kerjasama/itn-malang-utar-malaysia-gelar-international-real-estate-development-forum-bahas-inovasi-keberlanjutan/",
    title: { en: "International forum on sustainable real-estate development", ms: "Forum antarabangsa mengenai pembangunan hartanah mampan", zh: "可持续房地产发展国际论坛" },
    summary: { en: "ITN Malang records Wong Shung Yen's participation in an international real-estate forum involving UTAR and Rasmi Indah.", ms: "ITN Malang merekodkan penyertaan Wong Shung Yen dalam forum hartanah antarabangsa yang melibatkan UTAR dan Rasmi Indah.", zh: "玛琅国立理工学院记录黄松延参与由拉曼大学及Rasmi Indah等参与的国际房地产论坛。" }
  },
  {
    year: "2025", date: "2025-05-15", source: "The Star", sourceLanguage: "en", category: "philanthropy",
    url: "https://www.thestar.com.my/news/nation/2025/05/15/rm1mil-boost-to-student-loan-funds-of-tar-umt-utar-from-family-of-late-mca-leader",
    title: { en: "RM1 million support for TAR UMT and UTAR student-loan funds", ms: "Sokongan RM1 juta untuk dana pinjaman pelajar TAR UMT dan UTAR", zh: "向拉曼理工大学及拉曼大学学生贷款基金捐助100万令吉" },
    summary: { en: "The Star reports on education support established by the family in memory of the late Wong Seng Chow.", ms: "The Star melaporkan sokongan pendidikan yang diwujudkan oleh keluarga bagi mengenang mendiang Wong Seng Chow.", zh: "《星报》报道黄氏家族为纪念已故黄醒秋而设立的教育支持。" }
  },
  {
    year: "2025", source: "TAR UMT", sourceLanguage: "en", category: "philanthropy", featured: true,
    url: "https://www.tarumt.edu.my/news/highlights/highlights-news/a-legacy-lives-on-through-student-loan-funds/",
    title: { en: "A legacy lives on through student-loan funds", ms: "Legasi diteruskan melalui dana pinjaman pelajar", zh: "以学生贷款基金延续教育传承" },
    summary: { en: "TAR UMT's official account records the family's contribution to student-loan funds at TAR UMT and UTAR.", ms: "Catatan rasmi TAR UMT merekodkan sumbangan keluarga kepada dana pinjaman pelajar TAR UMT dan UTAR.", zh: "拉曼理工大学官方记录黄氏家族向该校及拉曼大学学生贷款基金作出的捐助。" }
  },
  {
    year: "2025", date: "2025-01-19", source: "Sin Chew Daily", sourceLanguage: "zh", category: "community", featured: true,
    url: "https://metro.sinchew.com.my/news/20250119/metro/6231855",
    title: { en: "Community participation in the Puchong Dream initiative", ms: "Penglibatan masyarakat dalam inisiatif Puchong Dream", zh: "参与“蒲种梦想”社区计划" },
    summary: { en: "Sin Chew Daily reports on local community work and Wong Shung Yen's participation in the Puchong Dream initiative.", ms: "Sin Chew Daily melaporkan kerja masyarakat setempat dan penyertaan Wong Shung Yen dalam inisiatif Puchong Dream.", zh: "《星洲日报》报道蒲种社区工作，以及黄松延参与“蒲种梦想”计划。" }
  },
  {
    year: "2024", date: "2024-11-25", source: "Dewan Budaya", sourceLanguage: "ms", category: "culture",
    url: "https://dewanbudaya.jendeladbp.my/2024/11/25/10670/",
    title: { en: "Jade exhibition presents cultural dialogue at the National Art Gallery", ms: "Pameran jed mengetengahkan dialog budaya di Balai Seni Negara", zh: "国家美术馆古玉展呈现文化对话" },
    summary: { en: "Dewan Budaya documents the exhibition, its cultural framing and the work of its co-curators.", ms: "Dewan Budaya mendokumentasikan pameran, kerangka budayanya dan usaha para kurator bersama.", zh: "《Dewan Budaya》记录展览的文化脉络及联合策展工作。" }
  },
  {
    year: "2024", date: "2024-11-25", source: "The Star", sourceLanguage: "en", category: "culture", featured: true,
    url: "https://www.thestar.com.my/metro/metro-news/2024/11/25/over-100-jade-carvings-showcased-at-national-art-gallery-exhibition",
    title: { en: "More than 100 jade carvings shown at the National Art Gallery", ms: "Lebih 100 ukiran jed dipamerkan di Balai Seni Negara", zh: "国家美术馆展出逾百件古玉雕刻" },
    summary: { en: "The Star reports on the 2024 exhibition and identifies Wong Shung Yen among its co-curators.", ms: "The Star melaporkan pameran 2024 dan menamakan Wong Shung Yen sebagai salah seorang kurator bersama.", zh: "《星报》报道2024年古玉展，并列黄松延为联合策展人之一。" }
  },
  {
    year: "2024", source: "Jabatan Penerangan Malaysia / MOTAC", sourceLanguage: "ms", category: "culture",
    url: "https://dmedia.penerangan.gov.my/upload/sm/23112024.1320861439.pdf",
    title: { en: "Official release for the National Art Gallery jade exhibition", ms: "Siaran rasmi pameran jed Balai Seni Negara", zh: "国家美术馆古玉展官方文告" },
    summary: { en: "A Malaysian government release records the exhibition and its role in cultural exchange.", ms: "Siaran kerajaan Malaysia merekodkan pameran tersebut serta peranannya dalam pertukaran budaya.", zh: "马来西亚政府文告记录该展览及其在文化交流中的作用。" }
  },
  {
    year: "2024", source: "National Art Gallery", sourceLanguage: "en", category: "culture", featured: true,
    url: "https://www.artgallery.gov.my/wp-content/uploads/2024/11/MEDIA-RELEASE-JADE-EXHIBITION.pdf",
    title: { en: "National Art Gallery media release: Jade exhibition", ms: "Siaran media Balai Seni Negara: Pameran jed", zh: "国家美术馆媒体文告：古玉展" },
    summary: { en: "The institution's official release records Wong Shung Yen's co-curatorial role in the 2024 exhibition.", ms: "Siaran rasmi institusi itu merekodkan peranan Wong Shung Yen sebagai kurator bersama pameran 2024.", zh: "国家美术馆官方文告记录黄松延担任2024年古玉展联合策展人。" }
  },
  {
    year: "2023", source: "REHDA Institute", sourceLanguage: "en", category: "business",
    url: "https://rehdainstitute.com/wp-content/uploads/2023/10/D_RI_In-Touch_June23-Issue-V5-Revised-on-Ads-arrangement.pdf",
    title: { en: "Property-development forum documented by REHDA Institute", ms: "Forum pembangunan hartanah didokumentasikan REHDA Institute", zh: "REHDA Institute记录房地产发展论坛" },
    summary: { en: "The institute's publication corroborates participation in a forum on real-estate development and industry practice.", ms: "Penerbitan institut itu mengesahkan penyertaan dalam forum mengenai pembangunan hartanah dan amalan industri.", zh: "该研究院刊物佐证黄松延参与房地产发展及行业实践论坛。" }
  },
  {
    year: "2022", date: "2022-12-06", source: "Universiti Tunku Abdul Rahman", sourceLanguage: "en", category: "business", featured: true,
    url: "https://news.utar.edu.my/news/2022/Dec/06/09/09.html",
    title: { en: "Industry perspectives at UTAR's property-development forum", ms: "Perspektif industri di forum pembangunan hartanah UTAR", zh: "拉曼大学房地产发展论坛的业界观点" },
    summary: { en: "UTAR records Wong Shung Yen's participation in a forum connecting property-development education with industry experience.", ms: "UTAR merekodkan penyertaan Wong Shung Yen dalam forum yang menghubungkan pendidikan pembangunan hartanah dengan pengalaman industri.", zh: "拉曼大学记录黄松延参与房地产发展论坛，分享业界经验。" }
  },
  {
    year: "2022", source: "Nanyang Siang Pau", sourceLanguage: "zh", category: "community",
    url: "https://www.enanyang.my/%E6%96%87%E6%95%99/%E7%BA%AA%E5%BF%B5%E4%B8%BA%E5%8D%8E%E5%B0%8F%E6%89%80%E4%BD%9C%E8%B4%A1%E7%8C%AE-%E6%9D%8E%E6%B7%B1%E9%9D%99%E9%93%9C%E5%83%8F%E6%8F%AD%E5%B9%95",
    title: { en: "Commemorating contributions to Chinese-language education", ms: "Memperingati sumbangan kepada pendidikan vernakular Cina", zh: "纪念对华文教育的贡献" },
    summary: { en: "Nanyang Siang Pau covers a school commemoration and continuing community participation at SJK(C) Shin Cheng.", ms: "Nanyang Siang Pau meliputi acara peringatan sekolah dan penglibatan masyarakat berterusan di SJK(C) Shin Cheng.", zh: "《南洋商报》报道深静（哈古乐）华小纪念活动及持续的社区参与。" }
  },
  {
    year: "2021", date: "2021-10-10", source: "Oriental Daily", sourceLanguage: "zh", category: "community",
    url: "https://www.orientaldaily.com.my/news/central/2021/10/10/443282",
    title: { en: "Community and school affairs at SJK(C) Shin Cheng", ms: "Hal masyarakat dan sekolah di SJK(C) Shin Cheng", zh: "深静（哈古乐）华小校务与社区事务" },
    summary: { en: "Coverage documenting Wong Shung Yen's involvement in the school's board and community work.", ms: "Liputan yang merekodkan penglibatan Wong Shung Yen dalam lembaga sekolah dan kerja masyarakat.", zh: "报道记录黄松延参与该校董事会及社区事务。" }
  },
  {
    year: "2020", date: "2020-07-11", source: "China Press", sourceLanguage: "zh", category: "community",
    url: "https://kl.chinapress.com.my/20200711/%E7%8C%AE%E8%BA%AB%E6%9D%8F%E5%9D%9B38%E8%BD%BD-%E6%B7%B1%E9%9D%99%E5%8D%8E%E5%B0%8F%E9%BB%84%E7%87%95%E8%BE%89%E6%A0%A1%E9%95%BF-%E8%8D%A3%E4%BC%91/",
    title: { en: "SJK(C) Shin Cheng marks a headmaster's retirement", ms: "SJK(C) Shin Cheng meraikan persaraan guru besar", zh: "深静（哈古乐）华小欢送校长荣休" },
    summary: { en: "China Press includes Wong Shung Yen's remarks in coverage of a significant school-community occasion.", ms: "China Press memuatkan pandangan Wong Shung Yen dalam liputan acara penting komuniti sekolah.", zh: "《中国报》在学校重要活动报道中引述黄松延发言。" }
  },
  {
    year: "2017", date: "2017-02-12", source: "Sin Chew Daily", sourceLanguage: "zh", category: "community",
    url: "https://www.sinchew.com.my/20170212/%E9%AD%8F%E5%AE%B6%E7%A5%A5%EF%BC%9A%E6%8B%A8%E6%AC%BE%E5%8D%8E%E5%B0%8F%E6%84%9F%E6%81%A9%E9%A9%AC%E4%BC%81%E4%B8%9A%E5%AE%B6%EF%BC%8E%E9%BB%84%E6%83%A0%E5%BA%B7%E6%8A%95%E6%A1%83%E6%8A%A5/",
    title: { en: "School fundraising and community organisation", ms: "Pengumpulan dana sekolah dan pengelolaan masyarakat", zh: "华小筹款与社区组织工作" },
    summary: { en: "Sin Chew Daily records Wong Shung Yen's participation in organising and fundraising for Chinese-language education.", ms: "Sin Chew Daily merekodkan penyertaan Wong Shung Yen dalam penganjuran dan pengumpulan dana untuk pendidikan vernakular Cina.", zh: "《星洲日报》记录黄松延参与华文教育活动的组织及筹款工作。" }
  },
  {
    year: "2015", date: "2015-01-19", source: "China Press", sourceLanguage: "zh", category: "community",
    url: "https://www.chinapress.com.my/20150119/%E8%AA%9E%E6%95%99%E5%AD%B8%E7%92%B0%E5%A2%83%E5%8F%97%E9%97%9C%E6%B3%A8%E6%97%A5%E6%9C%AC%E5%AD%B8%E7%94%9F%E8%A8%AA%E5%93%88%E5%B0%8F/",
    title: { en: "International student visit to SJK(C) Shin Cheng", ms: "Lawatan pelajar antarabangsa ke SJK(C) Shin Cheng", zh: "国际学生到访深静（哈古乐）华小" },
    summary: { en: "China Press covers a school exchange and documents Wong Shung Yen's participation in the programme.", ms: "China Press meliputi pertukaran sekolah dan merekodkan penyertaan Wong Shung Yen dalam program tersebut.", zh: "《中国报》报道学校交流活动，并记录黄松延参与有关项目。" }
  },
  {
    year: "2014", date: "2014-08-15", source: "Variety", sourceLanguage: "en", category: "culture", featured: true,
    url: "https://variety.com/2014/film/festivals/film-review-men-who-save-the-world-1201282850/",
    title: { en: "Film review and credits for Men Who Save the World", ms: "Ulasan filem dan kredit Lelaki Harapan Dunia", zh: "电影《Lelaki Harapan Dunia / Men Who Save the World》影评及制作名单" },
    summary: { en: "Variety's review carries production credits for the Malaysian feature; Wong Shung Yen is credited as an associate producer.", ms: "Ulasan Variety menyertakan kredit produksi filem cereka Malaysia itu; Wong Shung Yen dikreditkan sebagai Penerbit Bersekutu.", zh: "《Variety》影评列出这部马来西亚电影的制作名单；黄松延名列协同制片人。" }
  },
  {
    year: "2012", date: "2012-12-15", source: "Sin Chew Daily", sourceLanguage: "zh", category: "community",
    url: "https://www.sinchew.com.my/20121215/%E9%AB%98%E7%A5%A5%E5%A8%81%EF%BC%9A%E8%BF%8E%E6%8E%A5%E4%B8%AD%E5%AD%A6%E7%94%9F%E6%B6%AF%EF%BC%8E%E5%B0%8F%E5%85%AD%E7%94%9F%E8%A6%81%E5%8B%87%E6%95%A2%E9%9D%A2%E5%AF%B9%E4%B8%89%E5%8F%98/",
    title: { en: "Early record of school-community involvement", ms: "Rekod awal penglibatan dalam komuniti sekolah", zh: "早期学校社区参与记录" },
    summary: { en: "An early recovered report documenting Wong Shung Yen's involvement with SJK(C) Shin Cheng.", ms: "Laporan awal yang ditemui semula, merekodkan penglibatan Wong Shung Yen dengan SJK(C) Shin Cheng.", zh: "现存较早报道之一，记录黄松延参与深静（哈古乐）华小事务。" }
  },
  {
    year: "2012", source: "KLSCCCI", sourceLanguage: "zh", category: "business", featured: true,
    url: "https://www.chinesechamber.org.my/wp-content/uploads/2017/08/07-%E4%BB%8B%E7%BB%8D%E6%96%B0%E4%BC%9A%E5%91%98-1.pdf",
    title: { en: "Property-development member profile", ms: "Profil ahli pembangunan hartanah", zh: "房地产发展会员简介" },
    summary: { en: "The Kuala Lumpur and Selangor Chinese Chamber of Commerce and Industry bulletin records the bilingual identity and property-development role.", ms: "Buletin Dewan Perniagaan dan Perindustrian Cina Kuala Lumpur dan Selangor merekodkan identiti dwibahasa serta peranan dalam pembangunan hartanah.", zh: "吉隆坡暨雪兰莪中华总商会会讯记录黄松延的中英文姓名及房地产发展职务。" }
  }
];

const common = {
  en: {
    nav: { home: "Home", about: "About", homeLiving: "Home & Living", automotive: "Automotive", lifestyle: "Lifestyle", leasing: "Leasing", news: "News", milestones: "Milestones", profile: "Leadership", publicRecord: "Media & Public Record", contact: "Contact" },
    skip: "Skip to main content",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    language: "Language",
    discover: "Discover the park",
    enquiries: "Leasing enquiries",
    readMore: "Read more",
    viewAll: "View all news",
    external: "Opens on the publisher's website",
    breadcrumbHome: "Home",
    footerIntro: "TPK Park is a common reference to Taman Perindustrian Kinrara, where selected Home & Living, Automotive and Lifestyle businesses come together in Puchong.",
    explore: "Explore",
    connect: "Connect",
    rights: "TPK Park Sdn. Bhd. All rights reserved.",
    ctaTitle: "Bring your business into the mix.",
    ctaText: "Speak with the TPK Park management team about suitable commercial or industrial space.",
    ctaButton: "Enquire about space",
    noticeLabel: "Important notice",
    newsUi: { sourceLanguages: { en: "English", ms: "Malay", zh: "Chinese", id: "Indonesian" } },
    recordUi: {
      source: "View source",
      fullRecord: "View the media and public record",
      categories: { business: "Business & property", community: "Education & community", culture: "Culture & film", philanthropy: "Education support", place: "TPK Park & place renewal" }
    },
    leasingUi: {
      factsKicker: "Property facts",
      factsTitle: "Current leasing information",
      factsText: "Use these details as a starting point, then confirm the latest position with the leasing team.",
      labels: { availability: "Availability", address: "Address", builtUp: "Built-up area", landArea: "Land area", askingRent: "Asking rent", format: "Property format", lastUpdated: "Last updated" },
      lastUpdated: "3 September 2026",
      enquire: "Enquire about this space",
      enquireAlternatives: "Enquire about similar premises",
      leasedTitle: "Property reference — Unit 69 is leased",
      leasedText: "These details describe the property format. Contact the leasing team about other premises that may suit your business.",
      call: "Call leasing team",
      brochure: "Download leasing information pack (PDF)",
      brochureEnglish: null,
      location: "View location",
      disclaimer: "Availability, dimensions, asking rent and commercial terms are indicative and subject to verification, landlord approval and contract. This page is not an offer or reservation."
    },
    emailApp: "Submitting this form opens your email application. Nothing is stored on this website.",
    form: { name: "Name", company: "Company", email: "Email", phone: "Phone", interest: "Area of interest", spaceType: "Preferred space type", message: "Tell us what you need", send: "Prepare email", select: "Select one", spaceSelect: "Not sure / explore options", options: ["Leasing", "Event collaboration", "Media enquiry", "General enquiry"], spaceOptions: [{ value: "shop-showroom", label: "Shop / showroom" }, { value: "detached-building", label: "Detached building" }, { value: "semi-detached", label: "Semi-detached building" }, { value: "terrace-waitlist", label: "Terrace unit waitlist" }] }
  },
  ms: {
    nav: { home: "Utama", about: "Tentang Kami", homeLiving: "Home & Living", automotive: "Automotif", lifestyle: "Lifestyle", leasing: "Penyewaan", news: "Berita", milestones: "Pencapaian", profile: "Kepimpinan", publicRecord: "Media & Rekod Awam", contact: "Hubungi" },
    skip: "Langkau ke kandungan utama",
    menuOpen: "Buka menu",
    menuClose: "Tutup menu",
    language: "Bahasa",
    discover: "Terokai TPK Park",
    enquiries: "Pertanyaan penyewaan",
    readMore: "Baca lanjut",
    viewAll: "Lihat semua berita",
    external: "Dibuka di laman penerbit",
    breadcrumbHome: "Utama",
    footerIntro: "TPK Park ialah sebutan umum bagi Taman Perindustrian Kinrara, tempat perniagaan Home & Living, Automotif dan Lifestyle terpilih beroperasi di Puchong.",
    explore: "Terokai",
    connect: "Hubungi",
    rights: "TPK Park Sdn. Bhd. Hak cipta terpelihara.",
    ctaTitle: "Bawa perniagaan anda ke dalam ekosistem ini.",
    ctaText: "Berbincang dengan pasukan pengurusan TPK Park mengenai ruang komersial atau perindustrian yang bersesuaian.",
    ctaButton: "Tanya tentang ruang",
    noticeLabel: "Notis penting",
    newsUi: { sourceLanguages: { en: "Bahasa Inggeris", ms: "Bahasa Melayu", zh: "Bahasa Cina", id: "Bahasa Indonesia" } },
    recordUi: {
      source: "Lihat sumber",
      fullRecord: "Lihat media dan rekod awam",
      categories: { business: "Perniagaan & hartanah", community: "Pendidikan & masyarakat", culture: "Budaya & filem", philanthropy: "Sokongan pendidikan", place: "TPK Park & pembaharuan tempat" }
    },
    leasingUi: {
      factsKicker: "Fakta hartanah",
      factsTitle: "Maklumat penyewaan semasa",
      factsText: "Gunakan butiran ini sebagai titik mula, kemudian sahkan kedudukan terkini dengan pasukan penyewaan.",
      labels: { availability: "Ketersediaan", address: "Alamat", builtUp: "Keluasan binaan", landArea: "Keluasan tanah", askingRent: "Sewa diminta", format: "Format hartanah", lastUpdated: "Kemas kini terakhir" },
      lastUpdated: "3 September 2026",
      enquire: "Tanya tentang ruang ini",
      enquireAlternatives: "Tanya tentang premis seumpamanya",
      leasedTitle: "Rujukan hartanah — Unit 69 telah disewa",
      leasedText: "Butiran ini menerangkan format hartanah. Hubungi pasukan penyewaan tentang premis lain yang mungkin sesuai untuk perniagaan anda.",
      call: "Hubungi pasukan penyewaan",
      brochure: "Muat turun pek maklumat penyewaan (PDF)",
      brochureEnglish: "Muat turun versi Bahasa Inggeris (PDF)",
      location: "Lihat lokasi",
      disclaimer: "Ketersediaan, keluasan, sewa diminta dan terma komersial adalah indikatif serta tertakluk kepada pengesahan, kelulusan tuan tanah dan kontrak. Halaman ini bukan tawaran atau tempahan."
    },
    emailApp: "Borang ini akan membuka aplikasi e-mel anda. Tiada maklumat disimpan di laman ini.",
    form: { name: "Nama", company: "Syarikat", email: "E-mel", phone: "Telefon", interest: "Bidang pertanyaan", spaceType: "Jenis ruang pilihan", message: "Beritahu keperluan anda", send: "Sediakan e-mel", select: "Pilih satu", spaceSelect: "Belum pasti / terokai pilihan", options: ["Penyewaan", "Kerjasama acara", "Pertanyaan media", "Pertanyaan umum"], spaceOptions: [{ value: "shop-showroom", label: "Kedai / bilik pameran" }, { value: "detached-building", label: "Bangunan sesebuah" }, { value: "semi-detached", label: "Bangunan berkembar" }, { value: "terrace-waitlist", label: "Senarai menunggu unit teres" }] }
  },
  zh: {
    nav: { home: "首页", about: "关于我们", homeLiving: "家居生活", automotive: "汽车服务", lifestyle: "生活品味", leasing: "租赁", news: "新闻", milestones: "里程碑", profile: "管理团队", publicRecord: "媒体与公开记录", contact: "联系" },
    skip: "跳至主要内容",
    menuOpen: "打开菜单",
    menuClose: "关闭菜单",
    language: "语言",
    discover: "探索园区",
    enquiries: "租赁咨询",
    readMore: "了解更多",
    viewAll: "查看全部新闻",
    external: "将在媒体网站打开",
    breadcrumbHome: "首页",
    footerIntro: "TPK Park是Taman Perindustrian Kinrara（金銮工业园）的通称；这里汇聚精选家居生活、汽车服务及生活品味业态。",
    explore: "探索",
    connect: "联系",
    rights: "TPK Park Sdn. Bhd. 版权所有。",
    ctaTitle: "让您的业务加入这个商业生态。",
    ctaText: "欢迎联系TPK Park管理团队，了解合适的商业或工业空间。",
    ctaButton: "查询租赁空间",
    noticeLabel: "重要说明",
    newsUi: { sourceLanguages: { en: "英文", ms: "马来文", zh: "中文", id: "印尼文" } },
    recordUi: {
      source: "查看来源",
      fullRecord: "查看媒体与公开记录",
      categories: { business: "商业与房地产", community: "教育与社区", culture: "文化与电影", philanthropy: "教育支持", place: "TPK Park与地方更新" }
    },
    leasingUi: {
      factsKicker: "物业资料",
      factsTitle: "当前租赁信息",
      factsText: "请以这些资料为初步参考，并向租赁团队确认最新情况。",
      labels: { availability: "供应情况", address: "地址", builtUp: "建筑面积", landArea: "土地面积", askingRent: "参考叫租", format: "物业形式", lastUpdated: "最后更新" },
      lastUpdated: "2026年9月3日",
      enquire: "查询此单位",
      enquireAlternatives: "查询类似物业",
      leasedTitle: "物业参考资料 — 69号已出租",
      leasedText: "以下资料说明这类物业的特点。欢迎联系租赁团队，了解其他可能适合您业务的物业。",
      call: "致电租赁团队",
      brochure: "下载租赁资料包（PDF）",
      brochureEnglish: "下载英文版（PDF）",
      location: "查看位置",
      disclaimer: "单位供应、面积、叫租及商业条款均为参考资料，须经核实、业主批准并以合约为准。本页不构成正式报价或预留。"
    },
    emailApp: "提交表格后将打开您的电子邮件应用。本网站不会储存任何资料。",
    form: { name: "姓名", company: "公司", email: "电邮", phone: "电话", interest: "咨询类别", spaceType: "意向空间类型", message: "请说明您的需求", send: "准备电邮", select: "请选择", spaceSelect: "尚未确定 / 了解选择", options: ["租赁", "活动合作", "媒体咨询", "一般咨询"], spaceOptions: [{ value: "shop-showroom", label: "商铺 / 展厅" }, { value: "detached-building", label: "独立式建筑" }, { value: "semi-detached", label: "半独立式单位" }, { value: "terrace-waitlist", label: "排屋单位候补名单" }] }
  }
};

const enPages = {
  home: {
    cta: {"title": "Find a place for your business.", "text": "Compare shops, showrooms and whole buildings at Taman Perindustrian Kinrara, Puchong.", "button": "Explore premises for rent", "route": "leasing"},
    eyebrow: "Puchong · Selangor",
    title: "A mature industrial place, renewed for everyday life.",
    description: "Discover TPK Park at Kinrara Industrial Park, Puchong: Home & Living showrooms, automotive services, dining and commercial premises for rent.",
    lead: "TPK Park is the common name for Taman Perindustrian Kinrara (Kinrara Industrial Park) in Puchong, where Home & Living, Automotive and Lifestyle businesses come together.",
    image: images.park, // Preserve the existing social preview.
    heroImage: images.homeLiving,
    heroAlt: 'Shopfronts, greenery and roadside parking at TPK Park in Puchong',
    heroCaption: 'Taman Perindustrian Kinrara · Puchong',
    blocks: [
      { type: "cards", kicker: "Three connected clusters", title: "Plan one useful trip.", text: "Compare home ideas, arrange vehicle care, meet over a meal or discover a new activity—within one practical Puchong destination.", items: [
        { number: "01", title: "Home & Living", text: "Showrooms, renovation materials, kitchens, bathrooms, furniture and specialist trades.", route: "homeLiving" },
        { number: "02", title: "Automotive", text: "Sales, servicing, detailing, specialist workshops and technical learning.", route: "automotive" },
        { number: "03", title: "Lifestyle", text: "Food, fitness, family activities, daily essentials and professional services.", route: "lifestyle" }
      ] },
      { type: "split", presentation: "renewal", title: "Renewal that keeps the place practical.", text: "TPK Park's management work focuses on selected properties and shared visitor experience: tenant curation, landscaping, façade lighting, coordinated signage, parking management, events and destination positioning.", image: images.lifestyle, alt: 'Street-level view of TPK Park showrooms, shopfronts and parking', caption: 'Showrooms, shopfronts and everyday access.', route: "about" },
      { type: "stats", route: "milestones", linkLabel: "Explore the 2026 Home & Living recognition", items: [
        { value: "16", label: "businesses in the recognised Home & Living cluster" },
        { value: "96,728", label: "sq ft represented by the 2026 recognised cluster" },
        { value: "8", label: "Home & Living categories in the record assessment" }
      ] },
      { type: "news", kicker: "Selected coverage", title: "TPK Park in the news", text: "Independent coverage of the Home & Living milestone and the park's long-term renewal.", limit: 3 },
      { type: "faq", kicker: "Visitor essentials", title: "Before you visit", items: [
        { q: "What does TPK Park refer to?", a: "TPK Park is a common reference to Taman Perindustrian Kinrara in Puchong, Selangor, along the Puchong–Bukit Jalil corridor." },
        { q: "What can I find at TPK Park?", a: "The business mix includes Home & Living showrooms, automotive sales and services, dining, fitness, family activities, daily essentials and professional services." },
        { q: "Are all businesses open at the same time?", a: "No. Each tenant sets its own operating hours. Check with the business you plan to visit before travelling." },
        { q: "Does TPK Park offer space for lease?", a: "Yes. Commercial and industrial spaces may become available. Contact the management team for current options; published availability can change." },
        { q: "How do I contact management?", a: "Call +60 3 8076 5200 or email info@tpkpark.com during management-office hours." }
      ] }
    ]
  },

  about: {
    cta: {"title": "Plan your next business premises.", "text": "Browse the property formats managed by TPK Park Sdn. Bhd. and discuss your operating needs with our leasing team.", "button": "Compare leasing options", "route": "leasing"},
    eyebrow: "About TPK Park",
    title: "A long-term approach to an established place.",
    description: "Learn how TPK Park Sdn. Bhd. manages and repositions selected properties at Taman Perindustrian Kinrara through tenant curation, renewal and placemaking.",
    lead: "TPK Park is a common reference to Taman Perindustrian Kinrara in Puchong. This website highlights selected properties, businesses and place-renewal initiatives associated with the area, together with TPK Park Sdn. Bhd.'s work on the properties and projects under its management.",
    blocks: [
      { type: "split", title: "Useful first. Distinctive over time.", text: "The work starts with the practical strengths of a mature industrial setting: direct vehicle access, ground-level parking, loading convenience and strong road connections. Renewal then adds a clearer tenant mix and a more welcoming shared environment.", image: images.homeLiving, alt: "Taman Perindustrian Kinrara, commonly known as TPK Park" },
      { type: "cards", kicker: "How we work", title: "Stewardship, not spectacle.", text: "A grounded management approach built around the needs of tenants and visitors.", items: [
        { number: "01", title: "Property stewardship", text: "Long-term asset and tenancy management across selected premises." },
        { number: "02", title: "Business clustering", text: "A clearer mix around Home & Living, Automotive and Lifestyle uses." },
        { number: "03", title: "Place renewal", text: "Landscaping, lighting, signage coordination, parking and destination activity." }
      ] },
      { type: "timeline", kicker: "Evolution", title: "Built through consistent work", items: [
        { year: "1990s", title: "Industrial foundation", text: "Taman Perindustrian Kinrara develops as a practical industrial address in Puchong." },
        { year: "2010", title: "Focused management", text: "Long-term management and strategic repositioning of selected properties becomes a sustained priority." },
        { year: "2026", title: "A cluster recognised", text: "The Home & Living cluster receives Malaysia Book of Records recognition within the industrial-park category." },
        { year: "Next", title: "Continuous renewal", text: "The focus remains a useful, coherent business ecosystem rather than a one-off campaign." }
      ] }
    ]
  },
  homeLiving: {
    cta: {"title": "Looking for showroom space?", "text": "Explore shop and showroom options alongside the Home & Living businesses at TPK Park.", "button": "View shops and showrooms for rent", "route": "leasingShop"},
    eyebrow: "Home & Living",
    title: "Ideas, materials and specialists—closer together.",
    description: "Discover TPK Park's Home & Living cluster in Puchong, with showrooms and specialists across furniture, kitchens, bathrooms, surfaces, décor and renovation.",
    lead: "A customer can compare more of a project in one trip, while businesses benefit from being part of a focused destination.",
    cta: { title: "Bring your showroom to TPK Park.", text: "Explore shop and showroom formats for home, renovation and specialist retail businesses.", button: "View shops and showrooms", route: "leasingShop" },
    blocks: [
      { type: "stats", route: "milestones", linkLabel: "Explore the 2026 Home & Living recognition", items: [
        { value: "16", label: "businesses in the 2026 recognised cluster" },
        { value: "96,728", label: "sq ft across the recognised businesses" },
        { value: "8", label: "categories represented in the assessment" }
      ] },
      { type: "directory", kicker: "Business mix", title: "A practical renovation journey", text: "Tenant names and operating details may change; contact each business directly before visiting.", items: [
        ["Furniture", "Lavino"], ["Kitchen, Bath & Tiles", "Ga Hing"], ["Kitchen & Bath", "Kuche + BaTH"], ["Tiles & Surfaces", "Jubin BMS"],
        ["Kitchen & Home Solutions", "Signature"], ["Curtains", "MK Curtain"], ["Curtains", "Baagus"], ["Tools", "Total Tools"],
        ["Furniture", "V Haus Living"], ["Design & Build", "Balens Design"], ["Build Solutions", "BUILTOP"], ["Door & Gate", "Premio Door"],
        ["Interior Design", "Choose Interior"], ["Furniture", "KLOT"], ["Door & Gate", "DC Moto"], ["Door & Gate", "Fagolli"]
      ] },
      { type: "cards", kicker: "Plan a visit", title: "From first idea to final detail", text: "Use the cluster as a starting point, then confirm individual stock, appointments and hours directly with each business.", items: [
        { number: "01", title: "Compare", text: "See materials and finishes in person before making a decision." },
        { number: "02", title: "Coordinate", text: "Bring measurements, references and your project timeline." },
        { number: "03", title: "Confirm", text: "Check quotations, warranties, delivery and installation with the relevant retailer." }
      ] }
    ]
  },
  automotive: {
    eyebrow: "Automotive",
    title: "Vehicle care, capability and choice.",
    description: "Explore automotive sales, servicing, detailing, specialist workshops and technical training at TPK Park in Puchong.",
    lead: "A growing automotive mix serves motorists, technicians and learners across sales, maintenance, detailing and specialist work.",
    cta: { title: "Space for an automotive business.", text: "Explore the detached-building format for a showroom or customer-facing automotive operation. Confirm availability and suitability with the leasing team.", button: "View the detached building", route: "leasingDetached" },
    blocks: [
      { type: "directory", kicker: "Automotive mix", title: "Services for different stages of ownership", text: "Appointments, models and service availability are managed by each business.", items: [
        ["Sales & Service", "Perodua 3S Kinrara"], ["Sales & Service", "Mazda 3S"], ["Service", "Kia 4S Service"], ["Specialist Workshop", "Techtrics Auto"],
        ["Technical Education", "Techtra Automotive Academy"], ["Detailing", "Jon Detailing"], ["Service", "Jaecoo Service Centre"], ["Specialist Workshop", "Toyokar"]
      ] },
      { type: "cards", kicker: "One automotive address", title: "Built around practical access", text: "Industrial-format premises support vehicle movement, servicing, display and technical operations.", items: [
        { number: "01", title: "Sales", text: "Explore selected new and pre-owned vehicle options." },
        { number: "02", title: "Service", text: "Routine maintenance and specialist automotive work." },
        { number: "03", title: "Skills", text: "Technical training and industry-focused learning." }
      ] },
      { type: "split", title: "Call before you drive in.", text: "Each automotive tenant manages its own appointments, operating hours and service scope. Confirm directly with the business to make the most of your visit.", image: images.automotive, alt: "Automotive business premises at TPK Park" }
    ]
  },
  lifestyle: {
    eyebrow: "Lifestyle & Amenities",
    title: "Useful stops that make a place feel lived in.",
    description: "Find dining, fitness, swimming, gymnastics, optical services and daily essentials at TPK Park in Puchong.",
    lead: "Beyond showrooms and workshops, TPK Park supports the routines that bring colleagues, families and visitors back through the week.",
    cta: { title: "Find space for your next concept.", text: "Explore shop formats for dining, wellness, studios and complementary customer-facing services.", button: "View shop space", route: "leasingShop" },
    blocks: [
      { type: "directory", kicker: "Around the park", title: "Eat, move, learn and get things done", text: "Individual businesses manage their own programmes, bookings and opening hours.", items: [
        ["Dining", "m.o.t.d"], ["Dining", "Jazmina Bistro"], ["Dining", "Nasi Lemak Daun Pisang Nuarina"], ["Dining", "Yummy Nyonya Kitchen"],
        ["Swimming", "Optimum Swim School"], ["Gymnastics", "Aces Gymnastic Academy"], ["Optical", "Forsee Lens"], ["Convenience", "99 Speedmart"], ["Wellness", "Happivilles"]
      ] },
      { type: "cards", kicker: "Everyday rhythm", title: "More reasons to return", text: "A mixed destination works best when it supports both planned visits and ordinary daily needs.", items: [
        { number: "01", title: "Meet", text: "Casual dining and practical places to pause between appointments." },
        { number: "02", title: "Move", text: "Structured swimming, gymnastics and wellness activities." },
        { number: "03", title: "Manage", text: "Daily essentials and services alongside business visits." }
      ] },
      { type: "split", title: "Check the programme, then make a day of it.", text: "Classes and activities may require advance booking. Contact the relevant operator for current schedules, age groups and availability.", image: images.lifestyle, alt: "Lifestyle and amenity premises at TPK Park" }
    ]
  },
  leasing: {
    eyebrow: "Property Leasing · Puchong",
    title: "Commercial & Industrial Property for Rent in Puchong",
    description: "Compare shops, showrooms and whole buildings for rent at TPK Park, Kinrara, Puchong. View asking rents, sizes, floor plans and leasing contacts.",
    lead: "Compare shop and showroom floors along Jalan TPK 2/8 with a detached whole building at Jalan TPK 2/4. Both are at Taman Perindustrian Kinrara (Kinrara Industrial Park), Puchong. Confirm current availability with our leasing team.",
    image: images.leasing,
    blocks: [
      { type: "notice", text: "Published availability, dimensions, asking rents and commercial terms are indicative and must be confirmed with the TPK Park leasing team." },
      { type: "leasingOptions" },
      { type: "cards", kicker: "Available space formats", title: "Choose a property around how your business works", text: "Each permanent page provides the current reference details, location and a direct enquiry route.", items: [
        { number: "01", title: "Shop & showroom", text: "Customer-facing shoplots along Jalan TPK 2/8 for display, specialist retail, services and lifestyle uses.", route: "leasingShop", image: images.leasingShop, linkLabel: "View shops and showrooms" },
        { number: "02", title: "Detached building", text: "A standalone whole-building option for a flagship showroom, automotive centre or larger commercial operation.", route: "leasingDetached", image: images.leasingDetached, linkLabel: "View detached building" },
        { number: "03", title: "Semi-detached building", text: "No. 69 Jalan TPK 2/8 has been leased. Explore the property format and enquire about other premises.", route: "leasingSemiDetached", image: images.leasingSemiDetached, linkLabel: "View format and alternatives" }
      ] },
      { type: "split", title: "A visible address on the Puchong–Bukit Jalil corridor.", text: "At Taman Perindustrian Kinrara, commonly known as TPK Park, selected Home & Living, Automotive and Lifestyle businesses benefit from drive-up access, visitor parking and an established cluster.", image: images.leasing, alt: "Customer-facing commercial property at TPK Park in Puchong", route: "contact", linkLabel: "Discuss your space needs" },
      { type: "cards", kicker: "Preferred tenant fit", title: "Businesses that add to the destination", text: "The leasing strategy favours useful, customer-facing concepts that complement the existing business mix.", items: [
        { number: "A", title: "Home & Living", text: "Furniture, kitchens, wardrobes, tiles, sanitaryware, lighting, interiors and renovation services." },
        { number: "B", title: "Automotive", text: "Sales, accessories, detailing, EV-related services, specialist workshops and mobility uses." },
        { number: "C", title: "Lifestyle & services", text: "Cafés, wellness, education, clinics, family activities and specialist professional services." }
      ] },
      { type: "faq", kicker: "Leasing questions", title: "Before you enquire", items: [
        { q: "Where is TPK Park in Puchong?", a: "TPK Park is the common name for Taman Perindustrian Kinrara, or Kinrara Industrial Park, along the Puchong–Bukit Jalil corridor. The published leasing options are on Jalan TPK 2/8 and Jalan TPK 2/4. Use each property page for its location and viewing enquiry." },
        { q: "What types of property can I rent at TPK Park in Puchong?", a: "Options may include customer-facing shoplots and showrooms, detached whole buildings and semi-detached industrial-commercial premises. Availability changes, so confirm the current list with the leasing team." },
        { q: "Which premises are currently advertised for rent at TPK Park?", a: "Current public information covers limited ground-floor and first-floor shop or showroom options along Jalan TPK 2/8 and the detached building at No. 7 Jalan TPK 2/4. No. 69 Jalan TPK 2/8 has been leased. Confirm availability and terms before relying on any listing." },
        { q: "How is TPK Park connected to Bukit Jalil, KESAS and the LDP?", a: "TPK Park is on the Puchong–Bukit Jalil corridor, with access via Bukit Jalil Highway and connections towards KESAS and the LDP. Check the relevant property page for its exact Jalan TPK address and map link." },
        { q: "Is TPK Park suitable for a showroom or retail business?", a: "Yes. The precinct is curated around customer-facing Home & Living, Automotive and Lifestyle businesses that benefit from visibility, drive-up access, parking and neighbouring complementary brands." },
        { q: "Are asking rents and sizes final?", a: "No. Published figures are indicative reference information. Dimensions, availability, rent, permitted use and all commercial terms must be verified and agreed in contract." },
        { q: "How do I arrange a viewing?", a: "Use the enquiry link on the relevant property page, call +60 3 8076 5200 or email info@tpkpark.com with your preferred use, size and opening timeline." }
      ] }
    ]
  },
  leasingShop: {
    parentRoute: "leasing",
    unitKey: "shopShowroom",
    eyebrow: "Leasing · Shop & Showroom",
    title: "Shop & Showroom for Rent in Puchong",
    description: "Shop and showroom space for rent on Jalan TPK 2/8, Kinrara, Puchong. Compare ground and first floors, asking rents, plans and leasing information packs.",
    lead: "Shop and showroom premises along Jalan TPK 2/8 at Taman Perindustrian Kinrara, Puchong. Compare ground-floor and first-floor options for your business, then confirm the unit and proposed use with the leasing team.",
    image: images.leasingShop,
    blocks: [
      { type: "notice", text: "Limited shop and showroom options may be available. Confirm the exact unit, floor area, asking rent, permitted use and viewing arrangements before making a decision." },
      { type: "unitDetails", inventory: "shopShowroom" },
      { type: "leasingOptions", shopOnly: true },
      {
        "type": "plans",
        "kicker": "Layout & access",
        "title": "A practical two-storey shoplot",
        "text": "The standard intermediate format is 22 ft × 80 ft, with ground-floor showroom or retail space and a first floor for display, office or consultation. Exact configuration and availability depend on the unit.",
        "openLabel": "Open plan at full size",
        "note": "Drawings and interior photographs reproduced from the 3 September 2026 leasing pack. Plans, dimensions and condition are for reference and must be verified.",
        "items": [
          {
            "title": "Typical ground and first floor",
            "image": "/assets/leasing/plans/section-2-typical-shoplot.jpg",
            "width": 679,
            "height": 635,
            "alt": "Reference drawing of a typical two-storey shoplot on Jalan TPK 2/8"
          }
        ]
      },
      { type: "split", title: "Designed for businesses customers need to see.", text: "The shoplots along Jalan TPK 2/8 suit furniture, kitchen, wardrobe, tile, sanitaryware, lighting, interior, café, wellness and specialist service concepts. Ground-level access and neighbouring destination businesses support planned visits and comparison shopping.", image: images.leasing, alt: "Shop and showroom frontage at TPK Park in Puchong" },
      { type: "cards", kicker: "Practical strengths", title: "A customer-facing commercial format", text: "Assess the exact unit against your operating and fit-out requirements.", items: [
        { number: "01", title: "Visibility", text: "Street-facing presence within an active commercial and industrial precinct." },
        { number: "02", title: "Access", text: "Drive-up convenience and shared visitor parking for customer appointments." },
        { number: "03", title: "Cluster effect", text: "Neighbouring Home & Living, Automotive and Lifestyle businesses create useful trip reasons." }
      ] },
      { type: "faq", kicker: "Shop & showroom FAQ", title: "Planning your enquiry", items: [
        { q: "Can I enquire about one floor rather than the whole shop?", a: "Yes. Ground-floor and first-floor options are shown separately. Tell the team which floor you need and confirm current availability. The approximate 3,520 sq ft figure is the combined built-up area across two floors of a standard intermediate unit, not a verified area for either floor." },
        { q: "Where are the shop and showroom units?", a: "The referenced shoplots are along Jalan TPK 2/8 at Taman Perindustrian Kinrara, commonly known as TPK Park, in Puchong." },
        { q: "What businesses are a good fit?", a: "Customer-facing showrooms, specialist retail, renovation and home-improvement brands, cafés, wellness, education, clinics and complementary services are priority uses, subject to approval." },
        { q: "Can I download more information?", a: "Yes. Download the leasing information pack (PDF) on this page, then contact management to confirm the current unit, measurements, rent and viewing availability." }
      ] }
    ]
  },
  leasingDetached: {
    parentRoute: "leasing",
    unitKey: "detached",
    eyebrow: "Leasing · Detached Building",
    title: "Detached Commercial Building for Rent in Puchong",
    description: "Detached showroom building for rent at No. 7 Jalan TPK 2/4, Kinrara, Puchong. Approx. 10,965 sq ft built-up, a private compound, floor plans and leasing contacts.",
    lead: "No. 7 Jalan TPK 2/4 at Taman Perindustrian Kinrara, Puchong: a detached whole building with a private compound for a showroom or larger customer-facing operation, subject to approval.",
    image: images.leasingDetached,
    blocks: [
      { type: "notice", text: "The listed building, dimensions and RM58,000 monthly asking rent are indicative. Confirm current availability, permitted use, condition and all commercial terms with the leasing team." },
      { type: "unitDetails", inventory: "detached" },
      {
        "type": "plans",
        "kicker": "Layout & access",
        "title": "See how the detached building works",
        "text": "No. 7 has two floors and a private external compound. The information pack identifies customer parking, a driveway and space for light loading or unloading. Confirm vehicle clearances, loading needs, utilities and permitted use during a viewing.",
        "openLabel": "Open plan at full size",
        "note": "Drawings and interior photographs reproduced from the 3 September 2026 leasing pack. Plans, dimensions and condition are for reference and must be verified.",
        "items": [
          {
            "title": "Ground floor and compound",
            "image": "/assets/leasing/plans/no-7-ground-floor.jpg",
            "width": 915,
            "height": 763,
            "alt": "No. 7 Jalan TPK 2/4 ground-floor plan showing the building, driveway and compound",
            "photo": "/assets/leasing/plans/no-7-ground-floor-interior.jpg",
            "photoAlt": "Ground-floor interior at No. 7 from the September 2026 leasing pack"
          },
          {
            "title": "First floor",
            "image": "/assets/leasing/plans/no-7-first-floor.jpg",
            "width": 915,
            "height": 762,
            "alt": "No. 7 Jalan TPK 2/4 first-floor plan showing office and meeting areas",
            "photo": "/assets/leasing/plans/no-7-first-floor-interior.jpg",
            "photoAlt": "First-floor interior at No. 7 from the September 2026 leasing pack"
          }
        ]
      },
      { type: "split", title: "Whole-building control for a stronger brand presence.", text: "The detached format provides scale, a recognisable standalone address and a private compound. It may suit a corporate showroom, automotive centre, large-format retailer, experience centre or headquarters-style operation with customer-facing needs.", image: images.leasingDetached, alt: "Detached commercial building at Jalan TPK 2/4 in Puchong" },
      { type: "cards", kicker: "Property fit", title: "Space for a larger operating brief", text: "Confirm access, loading, utilities, approvals and fit-out requirements during the viewing.", items: [
        { number: "01", title: "Standalone identity", text: "A detached building supports clearer signage, arrival and customer recognition." },
        { number: "02", title: "Private compound", text: "Dedicated surrounding space can support controlled access and operational planning." },
        { number: "03", title: "Flexible scale", text: "Approximate built-up and land areas support display, service, office and back-of-house functions." }
      ] },
      { type: "faq", kicker: "Detached building FAQ", title: "Key points to confirm", items: [
        { q: "What is the size of the detached building?", a: "The reference information lists approximately 10,965 sq ft of built-up area and approximately 21,316 sq ft of land. All measurements must be verified." },
        { q: "What is the asking rent?", a: "The indicative asking rent is RM58,000 per month, subject to current availability, negotiation, landlord approval and contract." },
        { q: "What uses may be suitable?", a: "Potential uses include a flagship showroom, automotive centre, large-format retail, experience centre or other customer-facing commercial operation, subject to planning, licensing and landlord approval." }
      ] }
    ]
  },
  leasingSemiDetached: {
    parentRoute: "leasing",
    unitKey: "semiDetached",
    eyebrow: "Leasing · Semi-Detached Building",
    title: "Semi-Detached Premises in Puchong",
    description: "No. 69 Jalan TPK 2/8 at TPK Park, Puchong has been leased. View the semi-detached property format and enquire about similar premises.",
    lead: "No. 69 Jalan TPK 2/8 has been leased. These reference details explain the format for businesses considering similar showroom, service and operational space.",
    image: images.leasingSemiDetached,
    blocks: [
      { type: "notice", text: "Unit 69 has been leased and is no longer offered as an available unit. Contact the leasing team about alternative premises or future opportunities." },
      { type: "unitDetails", inventory: "semiDetached" },
      { type: "split", title: "A practical balance of frontage and operating space.", text: "The semi-detached format can support furniture galleries, interior design centres, home-improvement brands, automotive services and specialist operators that combine customer display with back-of-house functions.", image: images.leasingSemiDetached, alt: "Semi-detached industrial-commercial building at Jalan TPK 2/8 in Puchong" },
      { type: "cards", kicker: "Property fit", title: "Flexible for display, service and operations", text: "Use these reference features to discuss similar space requirements with the leasing team.", items: [
        { number: "01", title: "Wider frontage", text: "A recognisable customer-facing presence for display-led businesses." },
        { number: "02", title: "Whole-building use", text: "Plan customer, office, service, storage and operational areas around one tenancy." },
        { number: "03", title: "TPK Park setting", text: "Operate near complementary Home & Living, Automotive and Lifestyle businesses." }
      ] },
      { type: "faq", kicker: "Semi-detached FAQ", title: "Key points to confirm", items: [
        { q: "What is the size of the semi-detached building?", a: "The reference information lists approximately 6,446.88 sq ft of built-up area. The exact measurement and configuration must be verified." },
        { q: "Is Unit 69 still available?", a: "No. Unit 69 has been leased. Contact management about other premises and future opportunities." },
        { q: "Can it be used as a showroom and operational space?", a: "That mixed format may be suitable, but the proposed use, fit-out, licensing, loading and other operational requirements must be reviewed before agreement." }
      ] }
    ]
  },
  news: {
    eyebrow: "News & Media",
    title: "Reporting on a place in transition.",
    description: "Read current TPK Park updates on leasing, business mix and industrial park renewal, alongside selected independent media coverage from Puchong.",
    lead: "Updates from TPK Park, alongside a selected archive of independent media coverage.",
    image: images.leasing,
    cta: { title: "Looking for space at TPK Park?", text: "Review current shop, showroom and industrial property information, then confirm the latest availability with the leasing team.", button: "View available properties", route: "leasing" },
    blocks: [
      { type: "newsFeature", kicker: "Latest update", category: "Leasing", date: "2026-09-07", title: "Updated leasing details and floor plans.", text: "Explore shop and showroom units and the detached building in English, Bahasa Melayu or Chinese, with floor plans from the leasing packs. No. 69 Jalan TPK 2/8 has been leased; the team can advise on alternatives. Confirm current availability and commercial terms.", image: images.leasing, alt: "Commercial and industrial properties available for lease at TPK Park in Puchong", route: "leasing", linkLabel: "Explore available properties" },
      { type: "newsUpdates", kicker: "From TPK Park", title: "Updates and useful context", text: "First-party information about the place, its business mix and ongoing management priorities.", items: [
        { category: "Park renewal", title: "Keeping a mature industrial address useful", text: "TPK Park's work across selected properties combines tenant curation with landscaping, façade lighting, signage coordination, parking management and destination activity.", image: images.homeLiving, alt: "Commercial and industrial surroundings at TPK Park in Puchong", route: "about", linkLabel: "How TPK Park approaches renewal" },
        { category: "Business mix", title: "Three complementary business pillars", text: "Home & Living, Automotive and Lifestyle businesses create a broader mix of showrooms, services, dining, fitness and everyday needs.", image: images.homeLiving, alt: "Home and Living businesses at TPK Park in Puchong", route: "home", linkLabel: "Explore the business mix" },
        { category: "2026 milestone", date: "2026-07-05", title: "Recognition for a focused Home & Living cluster", text: "The recognised cluster comprised 16 businesses, 96,728 sq ft and eight categories within an industrial-park setting.", image: images.record, alt: "Malaysia Book of Records recognition for the TPK Park Home and Living cluster", route: "milestones", linkLabel: "Explore the milestone" }
      ] },
      { type: "news", kicker: "Media archive", title: "Independent media coverage", text: "Selected reports are retained with the publisher and original publication language clearly identified. Links open on the publishers' websites.", limit: 20, detailed: true }
    ]
  },
  milestones: {
    eyebrow: "Milestones Archive",
    title: "A record that belongs to one focused cluster.",
    description: "Archive of TPK Park's 2026 Home Carnival and Malaysia Book of Records recognition for its Home & Living retail cluster.",
    lead: "On 5 July 2026, TPK Park’s Home & Living cluster received Malaysia Book of Records recognition as the “Largest Home & Living Retail Cluster in an Industrial Park”. The assessment covered 16 businesses across eight Home & Living categories.",
    blocks: [
      { type: "notice", text: "Archive: the 2026 Home Carnival has ended. This page preserves the milestone and does not advertise a current event." },
      { type: "stats", items: [
        { value: "16", label: "businesses included in the record assessment" },
        { value: "96,728", label: "sq ft across the recognised cluster" },
        { value: "8", label: "Home & Living categories represented" }
      ] },
      { type: "split", title: "Recognition built on a working business cluster.", text: "The record marked the result of sustained tenant curation and property renewal. It was celebrated alongside the 2026 Home Carnival, bringing businesses and visitors together around the cluster.", route: "homeLiving", linkLabel: "Explore the Home & Living cluster", image: images.carnival, alt: "TPK Park Home Carnival 2026 archive image" },
      { type: "timeline", kicker: "Archive", title: "From renewal to recognition", items: [
        { year: "Before", title: "A practical industrial base", text: "Mature premises and direct access provide the foundation for customer-facing businesses." },
        { year: "Over time", title: "A clearer tenant mix", text: "Home & Living businesses are curated into a more coherent destination." },
        { year: "2026", title: "Record recognition", text: "The cluster is assessed at 16 businesses, 96,728 sq ft and eight categories." },
        { year: "Ongoing", title: "The work continues", text: "The milestone supports—rather than completes—the longer renewal of the place." }
      ] }
    ]
  },
  profile: {
    eyebrow: "Leadership",
    title: "Wong Shung Yen 黄松延",
    displayNames: [{ text: "Wong Shung Yen", lang: "en" }, { text: "黄松延", lang: "zh-Hans" }],
    description: "Profile of Wong Shung Yen, Managing Director of TPK Park, and his work in property stewardship, retail clustering and industrial park renewal.",
    lead: "Managing Director, TPK Park",
    cta: { title: "Business and media enquiries.", text: "Contact TPK Park regarding property, community, cultural or media matters connected with this profile.", button: "Contact TPK Park", route: "contact" },
    blocks: [
      { type: "profile", descriptor: "Property Development · Industrial Park Renewal · Retail Clustering · Placemaking", introduction: "Wong Shung Yen is Managing Director of TPK Park Sdn. Bhd. He leads the long-term management and repositioning of selected properties within Taman Perindustrian Kinrara, with a focus on renewing mature industrial property through tenant curation, retail clustering and placemaking.", imageAlt: "Wong Shung Yen, Managing Director of TPK Park" },
      { type: "quote", text: "TPK Park's transformation from a traditional industrial park into a vibrant Home & Living, Automotive and Lifestyle destination has been a three-decade journey.", cite: "Wong Shung Yen" },
      { type: "cards", kicker: "Current focus", title: "A long-term approach to place", text: "Strengthening a mature industrial environment without losing the practical qualities that make it useful.", items: [
        { number: "01", title: "Property stewardship", text: "Long-term asset and tenancy management across selected industrial, commercial and retail premises." },
        { number: "02", title: "Business clustering", text: "Tenant-mix planning around Home & Living, Automotive and Lifestyle uses." },
        { number: "03", title: "Industrial park renewal", text: "Landscaping, façade lighting, coordinated signage, parking, events and destination positioning." }
      ] },
      { type: "timeline", kicker: "Professional background", title: "Property, law and community", items: [
        { year: "1996—Present", title: "Property development", text: "As a Director of Rasmi Indah Sdn. Bhd. and Dayamam Sdn. Bhd., contributed to the development of Sections 1 and 2 of Taman Perindustrian Kinrara respectively." },
        { year: "2010—Present", title: "TPK Park", text: "Leads long-term management and strategic repositioning of selected properties through asset management, tenant curation and environmental improvement." },
        { year: "Education", title: "Melbourne and UTAR", text: "B.Comm (1993) and LL.B (Honours) (1995), University of Melbourne; admitted in Victoria (1996) and Malaya (1997). Currently pursuing a Master of Real Estate Development at UTAR." },
        { year: "Community", title: "Education and culture", text: "Long-standing involvement with SJK(C) Shin Cheng's Board of Governors, including service as treasurer; co-curator of a 2024 National Art Gallery jade exhibition; Associate Producer of Lelaki Harapan Dunia / Men Who Save the World (2014)." }
      ] },
      { type: "profileSources", mode: "featured", kicker: "Independent sources", title: "Selected media and public record", text: "A concise selection of institutional records and established media documenting this work. Links open on the original publishers' websites.", moreRoute: "publicRecord" }
    ]
  },
  publicRecord: {
    eyebrow: "Wong Shung Yen · 黄松延",
    title: "Media & public record",
    description: "A curated public record of institutional sources and established media coverage relating to Wong Shung Yen's work in property, education, community and culture.",
    lead: "A source-led chronology of selected public work, with each record linked to its original publisher.",
    parentRoute: "profile",
    cta: { title: "Leadership at TPK Park.", text: "Return to the concise profile of Wong Shung Yen and his current work at TPK Park.", button: "View leadership profile", route: "profile" },
    blocks: [
      { type: "profileSources", mode: "all", kicker: "Public record", title: "Independent and institutional sources", text: "This curated chronology focuses on sources that materially document public work and roles. Descriptions summarise their relevance; the linked publisher pages remain the primary record." }
    ]
  },
  contact: {
    eyebrow: "Contact",
    title: "Start with a conversation.",
    description: "Contact TPK Park management in Puchong for leasing, event collaboration, media or general enquiries.",
    lead: "For leasing, media, events or general matters, contact the management office or tell us what you need using the form below.",
    blocks: [{ type: "contact", officeHours: "Monday–Friday, 9:00am–5:00pm; Saturday, 9:00am–12:00pm", address: "Taman Perindustrian Kinrara, 47180 Puchong, Selangor, Malaysia", labels: { phone: "Telephone", email: "Email", hours: "Management office", address: "Location", formTitle: "What would you like to discuss?" } }]
  }
};

const msPages = {
  home: {
    cta: {"title": "Cari ruang untuk perniagaan anda.", "text": "Bandingkan kedai, bilik pameran dan keseluruhan bangunan di Taman Perindustrian Kinrara, Puchong.", "button": "Terokai premis untuk disewa", "route": "leasing"},
    eyebrow: "Puchong · Selangor",
    title: "Kawasan perindustrian matang, diperbaharui untuk kehidupan seharian.",
    description: "Terokai Taman Perindustrian Kinrara, yang lazim dirujuk sebagai TPK Park, di Puchong: pameran Home & Living, perkhidmatan automotif, kemudahan gaya hidup dan peluang penyewaan.",
    lead: "TPK Park ialah sebutan lazim bagi Taman Perindustrian Kinrara di Puchong, yang menghimpunkan perniagaan Home & Living, Automotif dan Lifestyle.",
    image: images.park, // Preserve the existing social preview.
    heroImage: images.homeLiving,
    heroAlt: 'Deretan kedai, landskap dan parkir tepi jalan di TPK Park, Puchong',
    heroCaption: 'Taman Perindustrian Kinrara · Puchong',
    blocks: [
      { type: "cards", kicker: "Tiga kluster saling melengkapi", title: "Rancang satu perjalanan yang berguna.", text: "Bandingkan idea rumah, uruskan kenderaan, nikmati hidangan atau cuba aktiviti baharu—semuanya dalam satu destinasi praktikal di Puchong.", items: [
        { number: "01", title: "Home & Living", text: "Bilik pameran, bahan renovasi, dapur, bilik mandi, perabot dan kemahiran khusus.", route: "homeLiving" },
        { number: "02", title: "Automotif", text: "Jualan, servis, detailing, bengkel khusus dan pembelajaran teknikal.", route: "automotive" },
        { number: "03", title: "Lifestyle", text: "Makanan, kecergasan, aktiviti keluarga, keperluan harian dan perkhidmatan profesional.", route: "lifestyle" }
      ] },
      { type: "split", presentation: "renewal", title: "Pembaharuan yang mengekalkan nilai praktikal.", text: "Pengurusan TPK Park memberi tumpuan kepada hartanah terpilih dan pengalaman bersama pengunjung: pemilihan penyewa, landskap, pencahayaan fasad, penyelarasan papan tanda, pengurusan parkir, acara dan penjenamaan destinasi.", image: images.lifestyle, alt: 'Pemandangan aras jalan bilik pameran, kedai dan parkir di TPK Park', caption: 'Bilik pameran, deretan kedai dan akses harian.', route: "about" },
      { type: "stats", route: "milestones", linkLabel: "Terokai pengiktirafan Home & Living 2026", items: [
        { value: "16", label: "perniagaan dalam kluster Home & Living yang diiktiraf" },
        { value: "96,728", label: "kaki persegi dalam kluster yang diiktiraf pada 2026" },
        { value: "8", label: "kategori Home & Living dalam penilaian rekod" }
      ] },
      { type: "news", kicker: "Liputan pilihan", title: "TPK Park dalam berita", text: "Liputan bebas tentang pencapaian Home & Living dan pembaharuan jangka panjang taman ini.", limit: 3 },
      { type: "faq", kicker: "Maklumat pengunjung", title: "Sebelum anda berkunjung", items: [
        { q: "Apakah maksud TPK Park?", a: "TPK Park ialah sebutan umum bagi Taman Perindustrian Kinrara di Puchong, Selangor, di koridor Puchong–Bukit Jalil." },
        { q: "Apakah yang terdapat di TPK Park?", a: "Campuran perniagaan merangkumi bilik pameran Home & Living, jualan dan servis automotif, makanan, kecergasan, aktiviti keluarga, keperluan harian dan perkhidmatan profesional." },
        { q: "Adakah semua perniagaan dibuka pada waktu yang sama?", a: "Tidak. Setiap penyewa menetapkan waktu operasinya sendiri. Semak dengan perniagaan berkenaan sebelum berkunjung." },
        { q: "Adakah ruang untuk disewa?", a: "Ya. Ruang komersial dan perindustrian mungkin tersedia dari semasa ke semasa. Hubungi pengurusan untuk pilihan terkini." },
        { q: "Bagaimana menghubungi pengurusan?", a: "Hubungi +60 3 8076 5200 atau e-mel info@tpkpark.com pada waktu pejabat pengurusan." }
      ] }
    ]
  },

  about: {
    cta: {"title": "Rancang premis perniagaan anda.", "text": "Lihat format hartanah di bawah pengurusan TPK Park Sdn. Bhd. dan bincangkan keperluan operasi dengan pasukan penyewaan.", "button": "Bandingkan pilihan penyewaan", "route": "leasing"},
    eyebrow: "Tentang TPK Park",
    title: "Pendekatan jangka panjang terhadap tempat yang telah matang.",
    description: "Ketahui bagaimana TPK Park Sdn. Bhd. mengurus dan memperbaharui hartanah terpilih di Taman Perindustrian Kinrara melalui pemilihan penyewa dan pembentukan tempat.",
    lead: "TPK Park ialah sebutan lazim bagi Taman Perindustrian Kinrara di Puchong. Laman web ini mengetengahkan hartanah, perniagaan dan inisiatif pembaharuan terpilih yang berkaitan dengan kawasan tersebut, termasuk usaha TPK Park Sdn. Bhd. berkaitan hartanah dan projek di bawah pengurusannya.",
    blocks: [
      { type: "split", title: "Praktikal dahulu. Lebih tersusun dari semasa ke semasa.", text: "Asasnya ialah kekuatan persekitaran perindustrian matang: akses kenderaan terus, parkir aras tanah, pemunggahan mudah dan hubungan jalan raya yang baik. Pembaharuan menambah campuran penyewa yang lebih jelas dan persekitaran bersama yang lebih mesra.", image: images.homeLiving, alt: "Taman Perindustrian Kinrara yang lazim dirujuk sebagai TPK Park" },
      { type: "cards", kicker: "Cara kami bekerja", title: "Pengurusan yang konsisten.", text: "Pendekatan yang berpijak pada keperluan penyewa dan pengunjung.", items: [
        { number: "01", title: "Pengurusan hartanah", text: "Pengurusan aset dan penyewaan jangka panjang bagi premis terpilih." },
        { number: "02", title: "Pengelompokan perniagaan", text: "Campuran lebih jelas berasaskan Home & Living, Automotif dan Lifestyle." },
        { number: "03", title: "Pembaharuan tempat", text: "Landskap, pencahayaan, penyelarasan papan tanda, parkir dan aktiviti destinasi." }
      ] },
      { type: "timeline", kicker: "Evolusi", title: "Dibina melalui usaha berterusan", items: [
        { year: "1990-an", title: "Asas perindustrian", text: "Taman Perindustrian Kinrara berkembang sebagai alamat perindustrian praktikal di Puchong." },
        { year: "2010", title: "Pengurusan berfokus", text: "Pengurusan jangka panjang dan pembaharuan strategik hartanah terpilih menjadi keutamaan berterusan." },
        { year: "2026", title: "Kluster diiktiraf", text: "Kluster Home & Living menerima pengiktirafan Malaysia Book of Records dalam kategori taman perindustrian." },
        { year: "Seterusnya", title: "Pembaharuan berterusan", text: "Tumpuan kekal pada ekosistem perniagaan yang berguna, bukan kempen sementara." }
      ] }
    ]
  },
  homeLiving: {
    cta: {"title": "Mencari ruang bilik pameran?", "text": "Terokai pilihan kedai dan bilik pameran berdekatan perniagaan Home & Living di TPK Park.", "button": "Lihat kedai dan bilik pameran untuk disewa", "route": "leasingShop"},
    eyebrow: "Home & Living",
    title: "Idea, bahan dan pakar—lebih dekat antara satu sama lain.",
    description: "Terokai kluster Home & Living TPK Park di Puchong, merangkumi perabot, dapur, bilik mandi, permukaan, dekorasi dan renovasi.",
    lead: "Pelanggan boleh membandingkan lebih banyak pilihan dalam satu perjalanan, manakala perniagaan mendapat manfaat daripada destinasi yang berfokus.",
    cta: { title: "Bawa bilik pameran anda ke TPK Park.", text: "Terokai format kedai dan bilik pameran untuk perniagaan rumah, renovasi dan runcit khusus.", button: "Lihat kedai dan bilik pameran", route: "leasingShop" },
    blocks: [
      { type: "stats", route: "milestones", linkLabel: "Terokai pengiktirafan Home & Living 2026", items: [
        { value: "16", label: "perniagaan dalam kluster yang diiktiraf pada 2026" }, { value: "96,728", label: "kaki persegi keseluruhan perniagaan yang diiktiraf" }, { value: "8", label: "kategori dalam penilaian" }
      ] },
      { type: "directory", kicker: "Campuran perniagaan", title: "Perjalanan renovasi yang praktikal", text: "Nama penyewa dan waktu operasi boleh berubah; hubungi setiap perniagaan sebelum berkunjung.", items: [
        ["Perabot", "Lavino"], ["Dapur, Bilik Mandi & Jubin", "Ga Hing"], ["Dapur & Bilik Mandi", "Kuche + BaTH"], ["Jubin & Permukaan", "Jubin BMS"], ["Penyelesaian Dapur & Rumah", "Signature"], ["Langsir", "MK Curtain"], ["Langsir", "Baagus"], ["Peralatan", "Total Tools"], ["Perabot", "V Haus Living"], ["Reka Bentuk & Bina", "Balens Design"], ["Penyelesaian Binaan", "BUILTOP"], ["Pintu & Pagar", "Premio Door"], ["Reka Bentuk Dalaman", "Choose Interior"], ["Perabot", "KLOT"], ["Pintu & Pagar", "DC Moto"], ["Pintu & Pagar", "Fagolli"]
      ] },
      { type: "cards", kicker: "Rancang kunjungan", title: "Daripada idea awal hingga perincian akhir", text: "Gunakan kluster ini sebagai titik mula, kemudian sahkan stok, janji temu dan waktu secara terus.", items: [
        { number: "01", title: "Bandingkan", text: "Lihat bahan dan kemasan secara fizikal sebelum membuat keputusan." }, { number: "02", title: "Selaraskan", text: "Bawa ukuran, rujukan dan garis masa projek anda." }, { number: "03", title: "Sahkan", text: "Semak sebut harga, jaminan, penghantaran dan pemasangan dengan peruncit." }
      ] }
    ]
  },
  automotive: {
    eyebrow: "Automotif",
    title: "Penjagaan kenderaan, kepakaran dan pilihan.",
    description: "Terokai jualan, servis, detailing, bengkel khusus dan latihan teknikal automotif di TPK Park, Puchong.",
    lead: "Campuran automotif yang berkembang memenuhi keperluan pemandu, juruteknik dan pelajar dalam jualan, penyelenggaraan dan kerja khusus.",
    cta: { title: "Ruang untuk perniagaan automotif.", text: "Terokai format bangunan sesebuah untuk bilik pameran atau operasi automotif berhadapan pelanggan. Sahkan ketersediaan dan kesesuaian dengan pasukan penyewaan.", button: "Lihat bangunan sesebuah", route: "leasingDetached" },
    blocks: [
      { type: "directory", kicker: "Campuran automotif", title: "Perkhidmatan untuk pelbagai peringkat pemilikan", text: "Janji temu, model dan ketersediaan servis diurus oleh setiap perniagaan.", items: [
        ["Jualan & Servis", "Perodua 3S Kinrara"], ["Jualan & Servis", "Mazda 3S"], ["Servis", "Kia 4S Service"], ["Bengkel Khusus", "Techtrics Auto"], ["Pendidikan Teknikal", "Techtra Automotive Academy"], ["Detailing", "Jon Detailing"], ["Servis", "Jaecoo Service Centre"], ["Bengkel Khusus", "Toyokar"]
      ] },
      { type: "cards", kicker: "Satu alamat automotif", title: "Direka untuk akses praktikal", text: "Premis berformat industri menyokong pergerakan kenderaan, servis, pameran dan operasi teknikal.", items: [
        { number: "01", title: "Jualan", text: "Terokai pilihan kenderaan baharu dan terpakai terpilih." }, { number: "02", title: "Servis", text: "Penyelenggaraan berkala dan kerja automotif khusus." }, { number: "03", title: "Kemahiran", text: "Latihan teknikal dan pembelajaran berfokus industri." }
      ] },
      { type: "split", title: "Hubungi sebelum datang.", text: "Setiap penyewa automotif mengurus janji temu, waktu operasi dan skop servis sendiri. Sahkan secara terus untuk memanfaatkan kunjungan anda.", image: images.automotive, alt: "Premis perniagaan automotif di TPK Park" }
    ]
  },
  lifestyle: {
    eyebrow: "Lifestyle & Kemudahan",
    title: "Persinggahan berguna yang menghidupkan sesuatu tempat.",
    description: "Temui makanan, kecergasan, renang, gimnastik, optik dan keperluan harian di TPK Park, Puchong.",
    lead: "Di samping bilik pameran dan bengkel, TPK Park menyokong rutin yang membawa pekerja, keluarga dan pengunjung kembali sepanjang minggu.",
    cta: { title: "Cari ruang untuk konsep baharu anda.", text: "Terokai format kedai untuk makanan, kesejahteraan, studio dan perkhidmatan berhadapan pelanggan.", button: "Lihat ruang kedai", route: "leasingShop" },
    blocks: [
      { type: "directory", kicker: "Sekitar taman", title: "Makan, bergerak, belajar dan selesaikan urusan", text: "Setiap perniagaan mengurus program, tempahan dan waktu operasinya sendiri.", items: [["Makanan", "m.o.t.d"], ["Makanan", "Jazmina Bistro"], ["Makanan", "Nasi Lemak Daun Pisang Nuarina"], ["Makanan", "Yummy Nyonya Kitchen"], ["Renang", "Optimum Swim School"], ["Gimnastik", "Aces Gymnastic Academy"], ["Optik", "Forsee Lens"], ["Kedai Serbaneka", "99 Speedmart"], ["Kesejahteraan", "Happivilles"]] },
      { type: "cards", kicker: "Rentak harian", title: "Lebih banyak sebab untuk kembali", text: "Destinasi bercampur berfungsi baik apabila menyokong kunjungan terancang dan keperluan biasa.", items: [
        { number: "01", title: "Bertemu", text: "Tempat makan santai dan berhenti seketika antara janji temu." }, { number: "02", title: "Bergerak", text: "Aktiviti renang, gimnastik dan kesejahteraan berstruktur." }, { number: "03", title: "Mengurus", text: "Keperluan harian dan perkhidmatan bersama kunjungan perniagaan." }
      ] },
      { type: "split", title: "Semak jadual, kemudian rancang hari anda.", text: "Kelas dan aktiviti mungkin memerlukan tempahan awal. Hubungi pengendali berkaitan untuk jadual dan ketersediaan terkini.", image: images.lifestyle, alt: "Premis lifestyle dan kemudahan di TPK Park" }
    ]
  },
  leasing: {
    eyebrow: "Penyewaan Hartanah · Puchong",
    title: "Premis Komersial & Perindustrian untuk Disewa di Puchong",
    description: "Bandingkan kedai, bilik pameran dan bangunan untuk disewa di TPK Park, Kinrara, Puchong. Semak kadar sewa, keluasan, pelan lantai dan hubungi pasukan penyewaan.",
    lead: "Bandingkan pilihan tingkat kedai dan bilik pameran di Jalan TPK 2/8 dengan bangunan sesebuah di Jalan TPK 2/4. Kedua-duanya terletak di Taman Perindustrian Kinrara, Puchong. Sahkan ketersediaan semasa dengan pasukan penyewaan.",
    image: images.leasing,
    blocks: [
      { type: "notice", text: "Ketersediaan, keluasan, sewa diminta dan terma komersial yang diterbitkan adalah indikatif dan perlu disahkan dengan pasukan penyewaan TPK Park." },
      { type: "leasingOptions" },
      { type: "cards", kicker: "Format ruang tersedia", title: "Pilih hartanah mengikut cara perniagaan anda beroperasi", text: "Setiap halaman kekal menyediakan butiran rujukan semasa, lokasi dan laluan pertanyaan terus.", items: [
        { number: "01", title: "Kedai & bilik pameran", text: "Kedai berhadapan pelanggan di Jalan TPK 2/8 untuk pameran, runcit khusus, perkhidmatan dan kegunaan lifestyle.", route: "leasingShop", image: images.leasingShop, linkLabel: "Lihat kedai dan bilik pameran" },
        { number: "02", title: "Bangunan sesebuah", text: "Pilihan keseluruhan bangunan untuk bilik pameran utama, pusat automotif atau operasi komersial lebih besar.", route: "leasingDetached", image: images.leasingDetached, linkLabel: "Lihat bangunan sesebuah" },
        { number: "03", title: "Bangunan berkembar", text: "No. 69 Jalan TPK 2/8 telah disewa. Terokai format hartanah dan tanya tentang premis lain.", route: "leasingSemiDetached", image: images.leasingSemiDetached, linkLabel: "Lihat format dan pilihan lain" }
      ] },
      { type: "split", title: "Alamat mudah dilihat di koridor Puchong–Bukit Jalil.", text: "Di Taman Perindustrian Kinrara, yang lazim dirujuk sebagai TPK Park, perniagaan Home & Living, Automotif dan Lifestyle terpilih mendapat manfaat daripada akses terus, parkir pengunjung dan kluster yang mapan.", image: images.leasing, alt: "Hartanah komersial berhadapan pelanggan di TPK Park, Puchong", route: "contact", linkLabel: "Bincangkan keperluan ruang anda" },
      { type: "cards", kicker: "Kesesuaian penyewa", title: "Perniagaan yang melengkapi destinasi", text: "Strategi penyewaan mengutamakan konsep berguna dan berhadapan pelanggan yang melengkapi campuran perniagaan sedia ada.", items: [
        { number: "A", title: "Home & Living", text: "Perabot, dapur, almari, jubin, perkakasan sanitari, pencahayaan, dalaman dan renovasi." },
        { number: "B", title: "Automotif", text: "Jualan, aksesori, detailing, perkhidmatan EV, bengkel khusus dan kegunaan mobiliti." },
        { number: "C", title: "Lifestyle & perkhidmatan", text: "Kafe, kesejahteraan, pendidikan, klinik, aktiviti keluarga dan perkhidmatan profesional khusus." }
      ] },
      { type: "faq", kicker: "Soalan penyewaan", title: "Sebelum membuat pertanyaan", items: [
        { q: "Di manakah TPK Park di Puchong?", a: "TPK Park ialah nama lazim bagi Taman Perindustrian Kinrara di koridor Puchong–Bukit Jalil. Pilihan penyewaan yang dipaparkan terletak di Jalan TPK 2/8 dan Jalan TPK 2/4. Rujuk halaman hartanah berkenaan untuk lokasi dan pertanyaan lawatan." },
        { q: "Apakah jenis hartanah yang boleh disewa di TPK Park, Puchong?", a: "Pilihan mungkin merangkumi kedai dan bilik pameran berhadapan pelanggan, keseluruhan bangunan sesebuah serta premis industri-komersial berkembar. Ketersediaan berubah, jadi sahkan senarai semasa dengan pasukan penyewaan." },
        { q: "Premis manakah yang kini diiklankan untuk disewa di TPK Park?", a: "Maklumat awam semasa merangkumi pilihan terhad di tingkat bawah dan tingkat satu bagi kedai atau bilik pameran di Jalan TPK 2/8 serta bangunan sesebuah di No. 7 Jalan TPK 2/4. No. 69 Jalan TPK 2/8 telah disewa. Sahkan ketersediaan dan terma sebelum bergantung pada mana-mana iklan." },
        { q: "Bagaimanakah akses ke TPK Park dari Bukit Jalil, KESAS dan LDP?", a: "TPK Park terletak di koridor Puchong–Bukit Jalil, dengan akses melalui Lebuhraya Bukit Jalil serta sambungan ke arah KESAS dan LDP. Rujuk halaman hartanah berkaitan untuk alamat Jalan TPK dan pautan peta yang tepat." },
        { q: "Adakah TPK Park sesuai untuk bilik pameran atau perniagaan runcit?", a: "Ya. Kawasan ini dibentuk untuk perniagaan Home & Living, Automotif dan Lifestyle berhadapan pelanggan yang mendapat manfaat daripada keterlihatan, akses terus, parkir dan jenama berdekatan yang saling melengkapi." },
        { q: "Adakah sewa diminta dan keluasan yang diterbitkan adalah muktamad?", a: "Tidak. Angka yang diterbitkan ialah maklumat rujukan indikatif. Keluasan, ketersediaan, sewa, kegunaan dibenarkan dan semua terma komersial mesti disahkan dan dipersetujui dalam kontrak." },
        { q: "Bagaimana saya mengatur lawatan tapak?", a: "Gunakan pautan pertanyaan pada halaman hartanah berkaitan, hubungi +60 3 8076 5200 atau e-mel info@tpkpark.com dengan kegunaan, saiz dan garis masa pembukaan anda." }
      ] }
    ]
  },
  leasingShop: {
    parentRoute: "leasing",
    unitKey: "shopShowroom",
    eyebrow: "Penyewaan · Kedai & Bilik Pameran",
    title: "Kedai & Bilik Pameran untuk Disewa di Puchong",
    description: "Kedai dan bilik pameran untuk disewa di Jalan TPK 2/8, Kinrara, Puchong. Bandingkan tingkat bawah dan tingkat satu, kadar sewa serta pelan lantai.",
    lead: "Premis kedai dan bilik pameran di Jalan TPK 2/8, Taman Perindustrian Kinrara, Puchong. Bandingkan pilihan tingkat bawah dan tingkat satu untuk perniagaan anda, kemudian sahkan unit serta kegunaan dengan pasukan penyewaan.",
    image: images.leasingShop,
    blocks: [
      { type: "notice", text: "Pilihan kedai dan bilik pameran terhad mungkin tersedia. Sahkan unit, keluasan lantai, sewa diminta, kegunaan dibenarkan dan aturan lawatan sebelum membuat keputusan." },
      { type: "unitDetails", inventory: "shopShowroom" },
      { type: "leasingOptions", shopOnly: true },
      {
        "type": "plans",
        "kicker": "Susun atur & akses",
        "title": "Format kedai dua tingkat yang praktikal",
        "text": "Unit tengah standard berukuran 22 kaki × 80 kaki, dengan ruang pameran atau runcit di tingkat bawah dan ruang paparan, pejabat atau perundingan di tingkat satu. Susun atur dan ketersediaan sebenar bergantung pada unit.",
        "openLabel": "Buka pelan pada saiz penuh",
        "note": "Pelan dan foto dalaman diambil daripada pek penyewaan 3 September 2026. Pelan, ukuran dan keadaan adalah untuk rujukan serta perlu disahkan.",
        "items": [
          {
            "title": "Pelan tipikal tingkat bawah dan tingkat satu",
            "image": "/assets/leasing/plans/section-2-typical-shoplot.jpg",
            "width": 679,
            "height": 635,
            "alt": "Pelan rujukan kedai dua tingkat tipikal di Jalan TPK 2/8"
          }
        ]
      },
      { type: "split", title: "Untuk perniagaan yang perlu dilihat pelanggan.", text: "Kedai di Jalan TPK 2/8 sesuai untuk perabot, dapur, almari, jubin, perkakasan sanitari, pencahayaan, dalaman, kafe, kesejahteraan dan perkhidmatan khusus. Akses aras jalan dan perniagaan destinasi berdekatan menyokong lawatan terancang dan perbandingan pilihan.", image: images.leasing, alt: "Bahagian hadapan kedai dan bilik pameran di TPK Park, Puchong" },
      { type: "cards", kicker: "Kekuatan praktikal", title: "Format komersial berhadapan pelanggan", text: "Nilai unit sebenar berdasarkan keperluan operasi dan ubah suai anda.", items: [
        { number: "01", title: "Keterlihatan", text: "Kehadiran menghadap jalan dalam kawasan komersial dan perindustrian yang aktif." },
        { number: "02", title: "Akses", text: "Kemudahan akses terus dan parkir pengunjung bersama untuk janji temu pelanggan." },
        { number: "03", title: "Kesan kluster", text: "Perniagaan Home & Living, Automotif dan Lifestyle berdekatan mewujudkan sebab kunjungan yang berguna." }
      ] },
      { type: "faq", kicker: "Soalan kedai & bilik pameran", title: "Merancang pertanyaan anda", items: [
        { q: "Bolehkah saya bertanya tentang satu tingkat sahaja?", a: "Ya. Pilihan tingkat bawah dan tingkat satu dipaparkan secara berasingan. Nyatakan tingkat yang diperlukan dan sahkan ketersediaan semasa. Angka kira-kira 3,520 kaki persegi ialah jumlah keluasan binaan dua tingkat bagi unit tengah standard, bukan keluasan yang disahkan untuk setiap tingkat." },
        { q: "Di manakah unit kedai dan bilik pameran?", a: "Kedai rujukan terletak di sepanjang Jalan TPK 2/8, Taman Perindustrian Kinrara, yang lazim dirujuk sebagai TPK Park, di Puchong." },
        { q: "Perniagaan apakah yang sesuai?", a: "Bilik pameran berhadapan pelanggan, runcit khusus, jenama renovasi dan penambahbaikan rumah, kafe, kesejahteraan, pendidikan, klinik dan perkhidmatan pelengkap adalah antara kegunaan keutamaan, tertakluk kepada kelulusan." },
        { q: "Bolehkah saya memuat turun maklumat tambahan?", a: "Ya. Muat turun pek maklumat penyewaan (PDF) pada halaman ini, kemudian hubungi pengurusan untuk mengesahkan unit, ukuran, sewa dan ketersediaan lawatan semasa." }
      ] }
    ]
  },
  leasingDetached: {
    parentRoute: "leasing",
    unitKey: "detached",
    eyebrow: "Penyewaan · Bangunan Sesebuah",
    title: "Bangunan Komersial Sesebuah untuk Disewa di Puchong",
    description: "Bangunan sesebuah untuk disewa di No. 7 Jalan TPK 2/4, Kinrara, Puchong. Keluasan binaan kira-kira 10,965 kaki persegi, dengan kawasan persendirian dan pelan lantai.",
    lead: "No. 7 Jalan TPK 2/4 di Taman Perindustrian Kinrara, Puchong: keseluruhan bangunan sesebuah dengan kawasan persendirian untuk bilik pameran atau operasi berhadapan pelanggan yang lebih besar, tertakluk kepada kelulusan.",
    image: images.leasingDetached,
    blocks: [
      { type: "notice", text: "Bangunan, keluasan dan sewa diminta RM58,000 sebulan yang disenaraikan adalah indikatif. Sahkan ketersediaan, kegunaan dibenarkan, keadaan dan semua terma komersial semasa." },
      { type: "unitDetails", inventory: "detached" },
      {
        "type": "plans",
        "kicker": "Susun atur & akses",
        "title": "Lihat susun atur bangunan sesebuah",
        "text": "No. 7 mempunyai dua tingkat dan kawasan luar persendirian. Pek maklumat menunjukkan parkir pelanggan, laluan kenderaan serta ruang untuk pemunggahan ringan. Sahkan kelegaan kenderaan, keperluan pemunggahan, utiliti dan kegunaan yang dibenarkan semasa lawatan.",
        "openLabel": "Buka pelan pada saiz penuh",
        "note": "Pelan dan foto dalaman diambil daripada pek penyewaan 3 September 2026. Pelan, ukuran dan keadaan adalah untuk rujukan serta perlu disahkan.",
        "items": [
          {
            "title": "Tingkat bawah dan kawasan luar",
            "image": "/assets/leasing/plans/no-7-ground-floor.jpg",
            "width": 915,
            "height": 763,
            "alt": "Pelan tingkat bawah No. 7 Jalan TPK 2/4 menunjukkan bangunan, laluan kenderaan dan kawasan luar",
            "photo": "/assets/leasing/plans/no-7-ground-floor-interior.jpg",
            "photoAlt": "Ruang dalaman tingkat bawah No. 7 dalam pek penyewaan September 2026"
          },
          {
            "title": "Tingkat satu",
            "image": "/assets/leasing/plans/no-7-first-floor.jpg",
            "width": 915,
            "height": 762,
            "alt": "Pelan tingkat satu No. 7 Jalan TPK 2/4 menunjukkan ruang pejabat dan mesyuarat",
            "photo": "/assets/leasing/plans/no-7-first-floor-interior.jpg",
            "photoAlt": "Ruang dalaman tingkat satu No. 7 dalam pek penyewaan September 2026"
          }
        ]
      },
      { type: "split", title: "Kawalan keseluruhan bangunan untuk kehadiran jenama lebih kukuh.", text: "Format sesebuah menawarkan skala, alamat berdiri sendiri yang mudah dikenali dan kawasan persendirian. Ia mungkin sesuai untuk bilik pameran korporat, pusat automotif, runcit format besar, pusat pengalaman atau operasi seperti ibu pejabat yang berhadapan pelanggan.", image: images.leasingDetached, alt: "Bangunan komersial sesebuah di Jalan TPK 2/4, Puchong" },
      { type: "cards", kicker: "Kesesuaian hartanah", title: "Ruang untuk operasi berskala lebih besar", text: "Sahkan akses, pemunggahan, utiliti, kelulusan dan keperluan ubah suai semasa lawatan.", items: [
        { number: "01", title: "Identiti tersendiri", text: "Bangunan sesebuah menyokong papan tanda, ketibaan dan pengecaman pelanggan yang lebih jelas." },
        { number: "02", title: "Kawasan persendirian", text: "Ruang sekeliling khusus boleh menyokong akses terkawal dan perancangan operasi." },
        { number: "03", title: "Skala fleksibel", text: "Anggaran keluasan binaan dan tanah menyokong fungsi pameran, servis, pejabat dan sokongan operasi." }
      ] },
      { type: "faq", kicker: "Soalan bangunan sesebuah", title: "Perkara penting untuk disahkan", items: [
        { q: "Berapakah keluasan bangunan sesebuah ini?", a: "Maklumat rujukan menyenaraikan kira-kira 10,965 kaki persegi keluasan binaan dan kira-kira 21,316 kaki persegi keluasan tanah. Semua ukuran mesti disahkan." },
        { q: "Berapakah sewa yang diminta?", a: "Sewa diminta indikatif ialah RM58,000 sebulan, tertakluk kepada ketersediaan semasa, rundingan, kelulusan tuan tanah dan kontrak." },
        { q: "Apakah kegunaan yang mungkin sesuai?", a: "Kegunaan berpotensi termasuk bilik pameran utama, pusat automotif, runcit format besar, pusat pengalaman atau operasi komersial berhadapan pelanggan, tertakluk kepada perancangan, pelesenan dan kelulusan tuan tanah." }
      ] }
    ]
  },
  leasingSemiDetached: {
    parentRoute: "leasing",
    unitKey: "semiDetached",
    eyebrow: "Penyewaan · Bangunan Berkembar",
    title: "Premis Berkembar di Puchong",
    description: "No. 69 Jalan TPK 2/8 di TPK Park, Puchong telah disewa. Lihat format hartanah berkembar dan tanya tentang premis seumpamanya.",
    lead: "No. 69 Jalan TPK 2/8 telah disewa. Maklumat rujukan ini menerangkan format untuk perniagaan yang mencari ruang pameran, servis dan operasi seumpamanya.",
    image: images.leasingSemiDetached,
    blocks: [
      { type: "notice", text: "Unit 69 telah disewa dan tidak lagi ditawarkan sebagai unit tersedia. Hubungi pasukan penyewaan tentang premis alternatif atau peluang akan datang." },
      { type: "unitDetails", inventory: "semiDetached" },
      { type: "split", title: "Keseimbangan praktikal antara bahagian hadapan dan ruang operasi.", text: "Format berkembar boleh menyokong galeri perabot, pusat reka bentuk dalaman, jenama penambahbaikan rumah, perkhidmatan automotif dan pengendali khusus yang menggabungkan paparan pelanggan dengan fungsi sokongan.", image: images.leasingSemiDetached, alt: "Bangunan industri-komersial berkembar di Jalan TPK 2/8, Puchong" },
      { type: "cards", kicker: "Kesesuaian hartanah", title: "Fleksibel untuk paparan, servis dan operasi", text: "Gunakan ciri rujukan ini untuk membincangkan keperluan ruang seumpamanya dengan pasukan penyewaan.", items: [
        { number: "01", title: "Bahagian hadapan lebih luas", text: "Kehadiran berhadapan pelanggan yang mudah dikenali untuk perniagaan berasaskan paparan." },
        { number: "02", title: "Penggunaan keseluruhan bangunan", text: "Rancang kawasan pelanggan, pejabat, servis, penyimpanan dan operasi dalam satu penyewaan." },
        { number: "03", title: "Persekitaran TPK Park", text: "Beroperasi berhampiran perniagaan Home & Living, Automotif dan Lifestyle yang saling melengkapi." }
      ] },
      { type: "faq", kicker: "Soalan bangunan berkembar", title: "Perkara penting untuk disahkan", items: [
        { q: "Berapakah keluasan bangunan berkembar ini?", a: "Maklumat rujukan menyenaraikan kira-kira 6,446.88 kaki persegi keluasan binaan. Ukuran dan susun atur sebenar mesti disahkan." },
        { q: "Adakah Unit 69 masih tersedia?", a: "Tidak. Unit 69 telah disewa. Hubungi pengurusan tentang premis lain dan peluang akan datang." },
        { q: "Bolehkah ia digunakan sebagai bilik pameran dan ruang operasi?", a: "Format campuran itu mungkin sesuai, tetapi kegunaan, ubah suai, pelesenan, pemunggahan dan keperluan operasi lain mesti dikaji sebelum persetujuan." }
      ] }
    ]
  },
  news: {
    eyebrow: "Berita & Media",
    title: "Merakam perubahan sebuah kawasan.",
    description: "Ikuti kemas kini TPK Park mengenai penyewaan, campuran perniagaan dan pembaharuan taman perindustrian, bersama liputan media bebas dari Puchong.",
    lead: "Kemas kini daripada TPK Park, bersama arkib pilihan liputan media bebas.",
    image: images.leasing,
    cta: { title: "Mencari ruang di TPK Park?", text: "Semak maklumat semasa bagi kedai, bilik pameran dan hartanah industri, kemudian sahkan ketersediaan terkini dengan pasukan penyewaan.", button: "Lihat hartanah yang tersedia", route: "leasing" },
    blocks: [
      { type: "newsFeature", kicker: "Kemas kini terkini", category: "Penyewaan", date: "2026-09-07", title: "Maklumat penyewaan dan pelan lantai terkini.", text: "Terokai unit kedai dan bilik pameran serta bangunan sesebuah dalam Bahasa Inggeris, Bahasa Melayu atau Bahasa Cina, berserta pelan daripada pek penyewaan. No. 69 Jalan TPK 2/8 telah disewa; hubungi pasukan kami tentang pilihan lain. Sahkan ketersediaan dan terma komersial semasa.", image: images.leasing, alt: "Hartanah komersial dan industri untuk disewa di TPK Park, Puchong", route: "leasing", linkLabel: "Terokai hartanah yang tersedia" },
      { type: "newsUpdates", kicker: "Daripada TPK Park", title: "Kemas kini dan konteks berguna", text: "Maklumat langsung mengenai kawasan ini, campuran perniagaannya dan keutamaan pengurusan berterusan.", items: [
        { category: "Pembaharuan taman", title: "Mengekalkan nilai praktikal kawasan perindustrian matang", text: "Usaha TPK Park bagi hartanah terpilih menggabungkan pemilihan penyewa, landskap, pencahayaan fasad, penyelarasan papan tanda, pengurusan parkir dan aktiviti destinasi.", image: images.homeLiving, alt: "Persekitaran komersial dan perindustrian di TPK Park, Puchong", route: "about", linkLabel: "Pendekatan TPK Park terhadap pembaharuan" },
        { category: "Campuran perniagaan", title: "Tiga teras perniagaan yang saling melengkapi", text: "Perniagaan Home & Living, Automotif dan Lifestyle membentuk gabungan bilik pameran, perkhidmatan, makanan, kecergasan dan keperluan harian.", image: images.homeLiving, alt: "Perniagaan Home and Living di TPK Park, Puchong", route: "home", linkLabel: "Terokai campuran perniagaan" },
        { category: "Pencapaian 2026", date: "2026-07-05", title: "Pengiktirafan bagi kluster Home & Living yang berfokus", text: "Kluster yang diiktiraf merangkumi 16 perniagaan, 96,728 kaki persegi dan lapan kategori dalam persekitaran taman perindustrian.", image: images.record, alt: "Pengiktirafan Malaysia Book of Records bagi kluster Home and Living TPK Park", route: "milestones", linkLabel: "Terokai pencapaian" }
      ] },
      { type: "news", kicker: "Arkib media", title: "Liputan media bebas", text: "Laporan pilihan dikekalkan dengan nama penerbit dan bahasa penerbitan asal dikenal pasti dengan jelas. Pautan dibuka di laman penerbit.", limit: 20, detailed: true }
    ]
  },
  milestones: {
    eyebrow: "Arkib Pencapaian",
    title: "Rekod yang khusus untuk satu kluster berfokus.",
    description: "Arkib Home Carnival 2026 dan pengiktirafan Malaysia Book of Records bagi kluster runcit Home & Living TPK Park.",
    lead: "Pada 5 Julai 2026, kluster Home & Living TPK Park menerima pengiktirafan Malaysia Book of Records sebagai “Largest Home & Living Retail Cluster in an Industrial Park”. Penilaian meliputi 16 perniagaan dalam lapan kategori Home & Living.",
    blocks: [
      { type: "notice", text: "Arkib: Home Carnival 2026 telah berakhir. Halaman ini memelihara pencapaian tersebut dan bukan iklan acara semasa." },
      { type: "stats", items: [{ value: "16", label: "perniagaan dalam penilaian rekod" }, { value: "96,728", label: "kaki persegi dalam kluster yang diiktiraf" }, { value: "8", label: "kategori Home & Living" }] },
      { type: "split", title: "Pengiktirafan berasaskan kluster perniagaan yang berfungsi.", text: "Rekod itu menandakan hasil pemilihan penyewa dan pembaharuan hartanah yang berterusan. Ia diraikan bersama Home Carnival 2026.", route: "homeLiving", linkLabel: "Terokai kluster Home & Living", image: images.carnival, alt: "Imej arkib Home Carnival TPK Park 2026" },
      { type: "timeline", kicker: "Arkib", title: "Daripada pembaharuan kepada pengiktirafan", items: [
        { year: "Sebelum", title: "Asas industri praktikal", text: "Premis matang dan akses terus menjadi asas perniagaan berhadapan pelanggan." }, { year: "Beransur", title: "Campuran penyewa lebih jelas", text: "Perniagaan Home & Living dibentuk menjadi destinasi yang lebih tersusun." }, { year: "2026", title: "Pengiktirafan rekod", text: "Kluster dinilai merangkumi 16 perniagaan, 96,728 kaki persegi dan lapan kategori." }, { year: "Berterusan", title: "Usaha diteruskan", text: "Pencapaian ini menyokong—bukan menamatkan—pembaharuan jangka panjang." }
      ] }
    ]
  },
  profile: {
    eyebrow: "Kepimpinan",
    title: "Wong Shung Yen 黄松延",
    displayNames: [{ text: "Wong Shung Yen", lang: "en" }, { text: "黄松延", lang: "zh-Hans" }],
    description: "Profil Wong Shung Yen, Pengarah Urusan TPK Park, dan usaha beliau dalam pengurusan hartanah, pengelompokan runcit dan pembaharuan taman perindustrian.",
    lead: "Pengarah Urusan, TPK Park",
    cta: { title: "Pertanyaan perniagaan dan media.", text: "Hubungi TPK Park mengenai perkara hartanah, masyarakat, kebudayaan atau media berkaitan profil ini.", button: "Hubungi TPK Park", route: "contact" },
    blocks: [
      { type: "profile", descriptor: "Pembangunan Hartanah · Pembaharuan Taman Perindustrian · Pengelompokan Runcit · Pembentukan Tempat", introduction: "Wong Shung Yen ialah Pengarah Urusan TPK Park Sdn. Bhd. Beliau menerajui pengurusan jangka panjang dan pembaharuan strategik hartanah terpilih di Taman Perindustrian Kinrara, dengan tumpuan kepada pemilihan penyewa, pengelompokan peruncitan dan pembentukan tempat.", imageAlt: "Wong Shung Yen, Pengarah Urusan TPK Park" },
      { type: "quote", text: "Transformasi TPK Park daripada taman perindustrian tradisional kepada destinasi Home & Living, Automotif dan Lifestyle yang dinamik merupakan perjalanan selama tiga dekad.", cite: "Wong Shung Yen" },
      { type: "cards", kicker: "Tumpuan semasa", title: "Pendekatan jangka panjang terhadap sesuatu tempat", text: "Mengukuhkan persekitaran industri matang tanpa menghilangkan kelebihan praktikalnya.", items: [
        { number: "01", title: "Pengurusan hartanah", text: "Pengurusan aset dan penyewaan jangka panjang bagi premis terpilih." }, { number: "02", title: "Pengelompokan perniagaan", text: "Perancangan campuran penyewa Home & Living, Automotif dan Lifestyle." }, { number: "03", title: "Pembaharuan taman", text: "Landskap, pencahayaan fasad, papan tanda, parkir, acara dan penjenamaan destinasi." }
      ] },
      { type: "timeline", kicker: "Latar belakang profesional", title: "Hartanah, undang-undang dan masyarakat", items: [
        { year: "1996—Kini", title: "Pembangunan hartanah", text: "Sebagai Pengarah Rasmi Indah Sdn. Bhd. dan Dayamam Sdn. Bhd., menyumbang kepada pembangunan Seksyen 1 dan 2 Taman Perindustrian Kinrara." }, { year: "2010—Kini", title: "TPK Park", text: "Menerajui pengurusan jangka panjang dan pembaharuan strategik hartanah terpilih." }, { year: "Pendidikan", title: "Melbourne dan UTAR", text: "Sarjana Muda Perdagangan (1993) dan LL.B (Kepujian) (1995), University of Melbourne; diterima masuk di Victoria (1996) dan Malaya (1997). Kini mengikuti Sarjana Pembangunan Hartanah di UTAR." }, { year: "Masyarakat", title: "Pendidikan dan budaya", text: "Penglibatan berpanjangan dengan Lembaga Pengelola SJK(C) Shin Cheng, termasuk berkhidmat sebagai bendahari; kurator bersama pameran jed Balai Seni Negara 2024; Penerbit Bersekutu bagi Lelaki Harapan Dunia / Men Who Save the World (2014)." }
      ] },
      { type: "profileSources", mode: "featured", kicker: "Sumber bebas", title: "Pilihan media dan rekod awam", text: "Pilihan ringkas rekod institusi dan media arus perdana yang mendokumentasikan kerja ini. Pautan dibuka di laman penerbit asal.", moreRoute: "publicRecord" }
    ]
  },
  publicRecord: {
    eyebrow: "Wong Shung Yen · 黄松延",
    title: "Media & rekod awam",
    description: "Rekod awam terpilih daripada sumber institusi dan liputan media arus perdana mengenai kerja Wong Shung Yen dalam hartanah, pendidikan, masyarakat dan budaya.",
    lead: "Kronologi berasaskan sumber mengenai kerja awam terpilih, dengan setiap rekod dipautkan kepada penerbit asal.",
    parentRoute: "profile",
    cta: { title: "Kepimpinan di TPK Park.", text: "Kembali kepada profil ringkas Wong Shung Yen dan kerja semasa beliau di TPK Park.", button: "Lihat profil kepimpinan", route: "profile" },
    blocks: [
      { type: "profileSources", mode: "all", kicker: "Rekod awam", title: "Sumber bebas dan institusi", text: "Kronologi terpilih ini memberi tumpuan kepada sumber yang mendokumentasikan kerja dan peranan awam secara nyata. Huraian merumuskan kaitannya; halaman penerbit yang dipautkan kekal sebagai rekod utama." }
    ]
  },
  contact: {
    eyebrow: "Hubungi",
    title: "Mulakan dengan perbualan.",
    description: "Hubungi pengurusan TPK Park di Puchong untuk penyewaan, kerjasama acara, media atau pertanyaan umum.",
    lead: "Untuk penyewaan, media, acara atau perkara umum, hubungi pejabat pengurusan atau nyatakan keperluan anda melalui borang berikut.",
    blocks: [{ type: "contact", officeHours: "Isnin–Jumaat, 9:00 pagi–5:00 petang; Sabtu, 9:00 pagi–12:00 tengah hari", address: "Taman Perindustrian Kinrara, 47180 Puchong, Selangor, Malaysia", labels: { phone: "Telefon", email: "E-mel", hours: "Pejabat pengurusan", address: "Lokasi", formTitle: "Apakah yang ingin anda bincangkan?" } }]
  }
};

const zhPages = {
  home: {
    cta: {"title": "为您的业务寻找合适空间。", "text": "比较蒲种金銮工业园的商铺、展厅与整栋物业。", "button": "查看出租物业", "route": "leasing"},
    eyebrow: "蒲种 · 雪兰莪",
    title: "成熟工业空间，为日常生活持续更新。",
    description: "探索蒲种Taman Perindustrian Kinrara（金銮工业园，通称TPK Park）的家居生活展厅、汽车服务、生活配套及租赁机会。",
    lead: "TPK Park是蒲种Taman Perindustrian Kinrara（金銮工业园）的通称，汇聚家居生活、汽车服务及生活品味业态。",
    image: images.park, // Preserve the existing social preview.
    heroImage: images.homeLiving,
    heroAlt: '蒲种TPK Park的商铺、绿化与路边停车位',
    heroCaption: 'Taman Perindustrian Kinrara · 蒲种',
    blocks: [
      { type: "cards", kicker: "三大互补集群", title: "一趟完成更多实用安排。", text: "比较家居方案、安排汽车护理、用餐或体验新活动，都可在这个蒲种目的地进行。", items: [
        { number: "01", title: "家居生活", text: "展厅、装修材料、厨房、卫浴、家具及专业服务。", route: "homeLiving" },
        { number: "02", title: "汽车服务", text: "销售、维修、美容、专业车厂及技术教育。", route: "automotive" },
        { number: "03", title: "生活品味", text: "餐饮、运动、亲子活动、日常所需及专业服务。", route: "lifestyle" }
      ] },
      { type: "split", presentation: "renewal", title: "更新之余，保留实用本质。", text: "TPK Park的管理工作聚焦于特定产业及访客共享体验，包括租户组合、园林、建筑照明、招牌协调、停车管理、活动及目的地推广。", image: images.lifestyle, alt: '从街道观看TPK Park的展厅、商铺与停车空间', caption: '展厅、商铺与日常出入空间。', route: "about" },
      { type: "stats", route: "milestones", linkLabel: "了解2026家居生活集群认证", items: [{ value: "16", label: "获认证家居生活集群内的企业" }, { value: "96,728", label: "2026年获认证集群总平方英尺" }, { value: "8", label: "纪录评估涵盖的家居生活类别" }] },
      { type: "news", kicker: "精选报道", title: "媒体报道中的 TPK Park", text: "关于家居生活里程碑及园区长期更新的独立报道。", limit: 3 },
      { type: "faq", kicker: "访客须知", title: "出发前先了解", items: [
        { q: "TPK Park指的是哪里？", a: "TPK Park是雪兰莪州蒲种Taman Perindustrian Kinrara（金銮工业园）的通称，位于蒲种—武吉加里尔走廊。" },
        { q: "TPK Park有哪些商家？", a: "园内业态包括家居生活展厅、汽车销售与维修、餐饮、运动、亲子活动、日常所需及专业服务。" },
        { q: "所有商家的营业时间相同吗？", a: "不同。各租户自行决定营业时间，出发前请直接向相关商家确认。" },
        { q: "是否有单位出租？", a: "部分商业与工业空间会不定时开放租赁。请联系管理团队了解最新选择。" },
        { q: "如何联系管理处？", a: "请在管理处办公时间致电+60 3 8076 5200或电邮info@tpkpark.com。" }
      ] }
    ]
  },

  about: {
    cta: {"title": "规划您的下一处经营空间。", "text": "了解TPK Park Sdn. Bhd.所管理的物业类型，并向租赁团队说明您的运营需要。", "button": "比较租赁选择", "route": "leasing"},
    eyebrow: "关于TPK Park",
    title: "以长期视角经营成熟空间。",
    description: "了解TPK Park Sdn. Bhd.如何通过租户组合、产业更新及地方营造，管理Taman Perindustrian Kinrara（金銮工业园）的特定产业。",
    lead: "TPK Park是蒲种Taman Perindustrian Kinrara（金銮工业园）的通称。本网站介绍与该区相关的特定产业、商家及地方更新项目，也呈现TPK Park Sdn. Bhd.在其所管理产业与项目方面的工作。",
    blocks: [
      { type: "split", title: "实用为先，逐步形成特色。", text: "成熟工业环境的优势包括车辆直达、地面停车、装卸便利及良好道路连接。在此基础上，通过更清晰的租户组合及更友善的共享环境持续更新。", image: images.homeLiving, alt: "Taman Perindustrian Kinrara（金銮工业园，通称TPK Park）" },
      { type: "cards", kicker: "我们的方式", title: "持续管理，脚踏实地。", text: "以租户及访客的实际需要为基础。", items: [
        { number: "01", title: "产业管理", text: "对特定单位进行长期资产与租赁管理。" }, { number: "02", title: "商业集群", text: "围绕家居生活、汽车服务及生活品味规划业态。" }, { number: "03", title: "地方更新", text: "园林、照明、招牌协调、停车及目的地活动。" }
      ] },
      { type: "timeline", kicker: "发展历程", title: "由持续工作逐步形成", items: [
        { year: "1990年代", title: "工业基础", text: "金銮工业园发展为蒲种实用的工业地址。" }, { year: "2010", title: "聚焦管理", text: "特定产业的长期管理及策略性重新定位成为持续重点。" }, { year: "2026", title: "集群获认证", text: "家居生活集群获《马来西亚纪录大全》工业园类别认证。" }, { year: "未来", title: "持续更新", text: "重点始终是实用而协调的商业生态，而非一次性活动。" }
      ] }
    ]
  },
  homeLiving: {
    cta: {"title": "正在寻找展厅空间？", "text": "了解TPK Park家居生活商家周边的商铺与展厅选择。", "button": "查看商铺与展厅出租", "route": "leasingShop"},
    eyebrow: "家居生活",
    title: "灵感、材料与专家，距离更近。",
    description: "探索蒲种TPK Park家居生活集群，涵盖家具、厨房、卫浴、表面材料、装饰及装修服务。",
    lead: "顾客可在一趟行程中比较更多方案，商家也能从聚焦型目的地中产生协同效应。",
    cta: { title: "让您的展厅加入TPK Park。", text: "了解适合家居、装修及专业零售业务的商铺与展厅。", button: "查看商铺与展厅", route: "leasingShop" },
    blocks: [
      { type: "stats", route: "milestones", linkLabel: "了解2026家居生活集群认证", items: [{ value: "16", label: "2026年获认证集群内的企业" }, { value: "96,728", label: "获认证企业总平方英尺" }, { value: "8", label: "评估涵盖的类别" }] },
      { type: "directory", kicker: "业态组合", title: "实用的装修采购路线", text: "租户及营业信息可能变更，出发前请直接向商家确认。", items: [["家具", "Lavino"], ["厨房、卫浴与瓷砖", "Ga Hing"], ["厨卫", "Kuche + BaTH"], ["瓷砖与表面", "Jubin BMS"], ["厨房与家居方案", "Signature"], ["窗帘", "MK Curtain"], ["窗帘", "Baagus"], ["工具", "Total Tools"], ["家具", "V Haus Living"], ["设计与施工", "Balens Design"], ["建筑方案", "BUILTOP"], ["门与门闸", "Premio Door"], ["室内设计", "Choose Interior"], ["家具", "KLOT"], ["门与门闸", "DC Moto"], ["门与门闸", "Fagolli"]] },
      { type: "cards", kicker: "规划行程", title: "从第一步灵感到最后细节", text: "可先从集群寻找方向，再直接确认库存、预约及营业时间。", items: [
        { number: "01", title: "比较", text: "亲自查看材料与饰面后再作决定。" }, { number: "02", title: "协调", text: "带上尺寸、参考图片及项目时间表。" }, { number: "03", title: "确认", text: "向商家确认报价、保修、送货及安装安排。" }
      ] }
    ]
  },
  automotive: {
    eyebrow: "汽车服务",
    title: "汽车护理、专业能力与更多选择。",
    description: "探索蒲种TPK Park的汽车销售、维修、美容、专业车厂及技术培训。",
    lead: "持续扩展的汽车业态，为车主、技师及学员提供销售、保养、美容及专业服务。",
    cta: { title: "为汽车业务寻找合适空间。", text: "了解适合展厅或面客汽车业务的独立式建筑，并向租赁团队确认供应与用途。", button: "查看独立式建筑", route: "leasingDetached" },
    blocks: [
      { type: "directory", kicker: "汽车业态", title: "覆盖不同用车阶段的服务", text: "预约、车型及服务由各商家自行管理。", items: [["销售与维修", "Perodua 3S Kinrara"], ["销售与维修", "Mazda 3S"], ["维修", "Kia 4S Service"], ["专业车厂", "Techtrics Auto"], ["技术教育", "Techtra Automotive Academy"], ["汽车美容", "Jon Detailing"], ["维修", "Jaecoo Service Centre"], ["专业车厂", "Toyokar"]] },
      { type: "cards", kicker: "一站式汽车地址", title: "以实用通行为核心", text: "工业型单位适合车辆进出、维修、展示及技术操作。", items: [
        { number: "01", title: "销售", text: "探索精选新车及二手车选择。" }, { number: "02", title: "维修", text: "定期保养及专业汽车服务。" }, { number: "03", title: "技能", text: "技术培训及行业导向学习。" }
      ] },
      { type: "split", title: "到访前先联系。", text: "各汽车商家自行安排预约、营业时间及服务范围。请直接确认，让行程更顺利。", image: images.automotive, alt: "TPK Park汽车业务单位" }
    ]
  },
  lifestyle: {
    eyebrow: "生活品味与配套",
    title: "实用的日常停靠，让地方更有活力。",
    description: "在蒲种TPK Park寻找餐饮、健身、游泳、体操、眼镜服务及日常所需。",
    lead: "除了展厅与车厂，TPK Park也通过日常配套，让员工、家庭及访客在一周内有更多回访理由。",
    cta: { title: "为您的新业务寻找空间。", text: "了解适合餐饮、健康、工作室及配套服务的商铺形式。", button: "查看商铺空间", route: "leasingShop" },
    blocks: [
      { type: "directory", kicker: "园区周边", title: "用餐、运动、学习与处理日常事务", text: "各商家自行管理课程、预约及营业时间。", items: [["餐饮", "m.o.t.d"], ["餐饮", "Jazmina Bistro"], ["餐饮", "Nasi Lemak Daun Pisang Nuarina"], ["餐饮", "Yummy Nyonya Kitchen"], ["游泳", "Optimum Swim School"], ["体操", "Aces Gymnastic Academy"], ["眼镜", "Forsee Lens"], ["便利店", "99 Speedmart"], ["健康", "Happivilles"]] },
      { type: "cards", kicker: "日常节奏", title: "更多回访理由", text: "混合型目的地既支持计划行程，也照顾日常需要。", items: [
        { number: "01", title: "会面", text: "在预约之间用餐或短暂停留。" }, { number: "02", title: "活动", text: "游泳、体操及健康课程。" }, { number: "03", title: "办事", text: "配合商业行程处理日常所需。" }
      ] },
      { type: "split", title: "先查课程，再规划一天。", text: "部分课程及活动需提前预约。请向相关商家查询最新时间、年龄组及名额。", image: images.lifestyle, alt: "TPK Park生活配套单位" }
    ]
  },
  leasing: {
    eyebrow: "蒲种物业租赁",
    title: "蒲种商业与工业单位出租",
    description: "比较蒲种金銮工业园TPK Park的商铺、展厅与整栋物业出租选择。查看参考叫租、面积、楼层平面图及租赁资料，并联系团队确认当前供应。",
    lead: "比较Jalan TPK 2/8沿线商铺及展厅的楼层选择，与Jalan TPK 2/4的整栋独立式物业。两者均位于蒲种Taman Perindustrian Kinrara（金銮工业园）；当前供应须向租赁团队确认。",
    image: images.leasing,
    blocks: [
      { type: "notice", text: "网页所列的单位供应、面积、叫租及商业条款均为参考资料，须向TPK Park租赁团队确认。" },
      { type: "leasingOptions" },
      { type: "cards", kicker: "可租空间类型", title: "按业务运营方式选择物业", text: "每个长期保留的单位页面均提供当前参考资料、地点及直接查询方式。", items: [
        { number: "01", title: "商铺与展厅", text: "位于Jalan TPK 2/8的面客商铺，适合展示、专业零售、服务及生活业态。", route: "leasingShop", image: images.leasingShop, linkLabel: "查看商铺与展厅" },
        { number: "02", title: "独立式建筑", text: "整栋独立物业，适合旗舰展厅、汽车中心或较大型商业运营。", route: "leasingDetached", image: images.leasingDetached, linkLabel: "查看独立式建筑" },
        { number: "03", title: "半独立式单位", text: "Jalan TPK 2/8门牌69号已出租。了解这类物业，并查询其他选择。", route: "leasingSemiDetached", image: images.leasingSemiDetached, linkLabel: "查看物业特点与其他选择" }
      ] },
      { type: "split", title: "位于蒲种—武吉加里尔走廊的醒目商业地址。", text: "Taman Perindustrian Kinrara（金銮工业园，通称TPK Park）具备便利驶入及访客停车，并汇聚成熟的家居生活、汽车服务及生活业态。", image: images.leasing, alt: "蒲种TPK Park面客商业物业", route: "contact", linkLabel: "讨论您的空间需求" },
      { type: "cards", kicker: "优先租户类型", title: "为园区增加价值的业务", text: "租赁策略优先考虑实用、面向顾客，并能补充现有商业组合的业态。", items: [
        { number: "A", title: "家居生活", text: "家具、厨房、衣柜、瓷砖、卫浴、灯饰、室内设计及装修服务。" },
        { number: "B", title: "汽车服务", text: "销售、配件、美容、电动车相关服务、专业车厂及移动出行业务。" },
        { number: "C", title: "生活与服务", text: "咖啡馆、健康、教育、诊所、亲子活动及专业服务。" }
      ] },
      { type: "faq", kicker: "租赁常见问题", title: "查询前须知", items: [
        { q: "TPK Park位于蒲种哪里？", a: "TPK Park是Taman Perindustrian Kinrara（金銮工业园）的通称，位于蒲种—武吉加里尔走廊。网页所列出租选择位于Jalan TPK 2/8与Jalan TPK 2/4；请在相应物业页面查看位置并查询看单位安排。" },
        { q: "蒲种TPK Park有哪些物业可出租？", a: "选择可能包括面客商铺与展厅、整栋独立式建筑，以及半独立式工业商业单位。供应会变化，请向租赁团队确认当前名单。" },
        { q: "TPK Park目前有哪些物业公开招租？", a: "目前公开资料包括Jalan TPK 2/8沿线少量底层及一楼商铺或展厅选择，以及Jalan TPK 2/4门牌7号独立式建筑。Jalan TPK 2/8门牌69号已经出租。依赖任何广告前，请先确认供应与条款。" },
        { q: "从武吉加里尔、KESAS或LDP如何前往TPK Park？", a: "TPK Park位于蒲种—武吉加里尔走廊，可经武吉加里尔大道，并衔接KESAS与LDP前往。请在相应物业页面查看准确的Jalan TPK地址与地图链接。" },
        { q: "TPK Park适合展厅或零售业务吗？", a: "适合。园区围绕面客的家居生活、汽车服务及生活业态规划，商家可受益于醒目位置、直接驶入、停车及互补品牌集聚。" },
        { q: "网页所列叫租和面积是最终资料吗？", a: "不是。所列数字仅供参考。面积、供应、租金、准许用途及所有商业条款均须核实，并以合约为准。" },
        { q: "如何预约看单位？", a: "请使用相关物业页面的查询链接，致电+60 3 8076 5200，或电邮info@tpkpark.com，并注明用途、所需面积及预计开业时间。" }
      ] }
    ]
  },
  leasingShop: {
    parentRoute: "leasing",
    unitKey: "shopShowroom",
    eyebrow: "租赁 · 商铺与展厅",
    title: "蒲种商铺与展厅出租",
    description: "蒲种金銮工业园TPK Park Jalan TPK 2/8商铺及展厅出租。比较底层与一楼选择、参考叫租及平面图，下载租赁资料包，并联系团队确认单位与用途。",
    lead: "位于蒲种Taman Perindustrian Kinrara（金銮工业园）Jalan TPK 2/8沿线的商铺及展厅。按业务需要比较底层与一楼选择，再向租赁团队确认单位与拟定用途。",
    image: images.leasingShop,
    blocks: [
      { type: "notice", text: "目前可能仅有少量商铺与展厅选择。作决定前，请确认具体单位、楼面面积、叫租、准许用途及看房安排。" },
      { type: "unitDetails", inventory: "shopShowroom" },
      { type: "leasingOptions", shopOnly: true },
      {
        "type": "plans",
        "kicker": "布局与通行",
        "title": "实用的两层商铺格局",
        "text": "标准中间单位为22英尺 × 80英尺，底层可作展厅或零售，一楼可安排展示、办公室或咨询空间。实际布局与供应须按个别单位确认。",
        "openLabel": "打开完整尺寸平面图",
        "note": "图则及室内照片取自2026年9月3日租赁资料包。图则、尺寸及物业状况仅供参考，须进一步核实。",
        "items": [
          {
            "title": "典型底层与一楼平面图",
            "image": "/assets/leasing/plans/section-2-typical-shoplot.jpg",
            "width": 679,
            "height": 635,
            "alt": "Jalan TPK 2/8典型两层商铺参考平面图"
          }
        ]
      },
      { type: "split", title: "为需要被顾客看见的业务而设。", text: "Jalan TPK 2/8沿线商铺适合家具、厨房、衣柜、瓷砖、卫浴、灯饰、室内设计、咖啡馆、健康及专业服务。地面直接通行和邻近目的地型商家，有助计划性到访与比较选购。", image: images.leasing, alt: "蒲种TPK Park商铺与展厅门面" },
      { type: "cards", kicker: "实用优势", title: "面向顾客的商业空间", text: "请按实际运营及装修需求评估具体单位。", items: [
        { number: "01", title: "醒目位置", text: "位于活跃商业及工业区内，具面向街道的品牌展示机会。" },
        { number: "02", title: "便利通行", text: "顾客可直接驶入，并使用园区共用访客停车位。" },
        { number: "03", title: "集群效应", text: "邻近家居生活、汽车服务及生活业态，为顾客创造实用到访理由。" }
      ] },
      { type: "faq", kicker: "商铺与展厅常见问题", title: "规划您的查询", items: [
        { q: "可以只查询一个楼层，而不是整间商铺吗？", a: "可以。网页分别列出底层与一楼选择。请说明所需楼层，并确认当前供应。约3,520平方英尺指标准中间单位两层合计建筑面积，并非任何单独楼层的已核实面积。" },
        { q: "商铺与展厅位于哪里？", a: "本页所指商铺位于蒲种Taman Perindustrian Kinrara（金銮工业园，通称TPK Park）Jalan TPK 2/8沿线。" },
        { q: "哪些业务较适合？", a: "面客展厅、专业零售、装修与家居品牌、咖啡馆、健康、教育、诊所及互补服务均属优先考虑用途，但须经批准。" },
        { q: "可以下载更详细的租赁资料吗？", a: "可以。下载本页的租赁资料包（PDF），然后联系管理团队确认当前单位、尺寸、租金及看房时间。" }
      ] }
    ]
  },
  leasingDetached: {
    parentRoute: "leasing",
    unitKey: "detached",
    eyebrow: "租赁 · 独立式建筑",
    title: "蒲种独立式商业建筑出租",
    description: "蒲种金銮工业园Jalan TPK 2/4门牌7号整栋独立式展厅建筑出租。建筑面积约10,965平方英尺，设独立范围，可查看平面图及租赁资料，并确认当前供应。",
    lead: "位于蒲种Taman Perindustrian Kinrara（金銮工业园）Jalan TPK 2/4门牌7号：带独立范围的整栋独立式物业，可供展厅或较大型面客业务考虑，须获批准。",
    image: images.leasingDetached,
    blocks: [
      { type: "notice", text: "所列建筑、面积及每月RM58,000叫租均为参考资料。请确认当前供应、准许用途、物业状况及所有商业条款。" },
      { type: "unitDetails", inventory: "detached" },
      {
        "type": "plans",
        "kicker": "布局与通行",
        "title": "了解独立式建筑的布局",
        "text": "7号建筑共有两层，并设私人户外范围。资料包列明顾客停车、车道及轻型装卸空间。看房时请确认车辆通行净空、装卸要求、公共设施及准许用途。",
        "openLabel": "打开完整尺寸平面图",
        "note": "图则及室内照片取自2026年9月3日租赁资料包。图则、尺寸及物业状况仅供参考，须进一步核实。",
        "items": [
          {
            "title": "底层与户外范围",
            "image": "/assets/leasing/plans/no-7-ground-floor.jpg",
            "width": 915,
            "height": 763,
            "alt": "Jalan TPK 2/4门牌7号底层平面图，显示建筑、车道与户外范围",
            "photo": "/assets/leasing/plans/no-7-ground-floor-interior.jpg",
            "photoAlt": "2026年9月租赁资料包中的7号底层室内照片"
          },
          {
            "title": "一楼",
            "image": "/assets/leasing/plans/no-7-first-floor.jpg",
            "width": 915,
            "height": 762,
            "alt": "Jalan TPK 2/4门牌7号一楼平面图，显示办公室与会议空间",
            "photo": "/assets/leasing/plans/no-7-first-floor-interior.jpg",
            "photoAlt": "2026年9月租赁资料包中的7号一楼室内照片"
          }
        ]
      },
      { type: "split", title: "整栋自主使用，建立更鲜明的品牌形象。", text: "独立式建筑提供较大规模、清晰的独立地址及专属范围，可能适合企业展厅、汽车中心、大型零售、体验中心或具面客需求的总部式运营。", image: images.leasingDetached, alt: "蒲种Jalan TPK 2/4独立式商业建筑" },
      { type: "cards", kicker: "物业特点", title: "满足较大型运营需求的空间", text: "看房时请确认通行、装卸、水电、审批及装修要求。", items: [
        { number: "01", title: "独立品牌识别", text: "独立式建筑有利于清晰招牌、到达体验及顾客辨识。" },
        { number: "02", title: "专属范围", text: "建筑周边专属空间可支持出入管理及运营规划。" },
        { number: "03", title: "灵活规模", text: "参考建筑及土地面积可容纳展示、服务、办公室及后勤功能。" }
      ] },
      { type: "faq", kicker: "独立式建筑常见问题", title: "需要确认的重点", items: [
        { q: "独立式建筑面积是多少？", a: "参考资料列出建筑面积约10,965平方英尺，土地面积约21,316平方英尺。所有尺寸均须核实。" },
        { q: "参考叫租是多少？", a: "参考叫租为每月RM58,000，须视当前供应、协商、业主批准及合约而定。" },
        { q: "哪些用途可能适合？", a: "可能用途包括旗舰展厅、汽车中心、大型零售、体验中心或其他面客商业运营，但须符合规划、执照及业主批准。" }
      ] }
    ]
  },
  leasingSemiDetached: {
    parentRoute: "leasing",
    unitKey: "semiDetached",
    eyebrow: "租赁 · 半独立式单位",
    title: "蒲种半独立式厂房与展厅",
    description: "蒲种TPK Park Jalan TPK 2/8门牌69号现已出租。了解半独立式物业特点，并查询类似物业。",
    lead: "Jalan TPK 2/8门牌69号现已出租。以下参考资料介绍这类物业，供寻找类似展厅、服务及运营空间的商家了解。",
    image: images.leasingSemiDetached,
    blocks: [
      { type: "notice", text: "69号单位现已出租，不再作为可租单位提供。欢迎联系租赁团队，查询其他物业或未来机会。" },
      { type: "unitDetails", inventory: "semiDetached" },
      { type: "split", title: "兼顾门面展示与运营空间。", text: "半独立式单位可支持家具展厅、室内设计中心、家居改善品牌、汽车服务及专业运营商，把顾客展示与后勤功能结合在同一物业。", image: images.leasingSemiDetached, alt: "蒲种Jalan TPK 2/8半独立式工业商业建筑" },
      { type: "cards", kicker: "物业特点", title: "灵活用于展示、服务与运营", text: "欢迎参考这些物业特点，与租赁团队讨论类似空间需求。", items: [
        { number: "01", title: "较宽门面", text: "为以展示为主的业务提供容易辨识的面客形象。" },
        { number: "02", title: "整栋使用", text: "可在一个租约内规划顾客、办公室、服务、储存及运营区域。" },
        { number: "03", title: "TPK Park环境", text: "邻近互补的家居生活、汽车服务及生活业态。" }
      ] },
      { type: "faq", kicker: "半独立式单位常见问题", title: "需要确认的重点", items: [
        { q: "半独立式单位面积是多少？", a: "参考资料列出建筑面积约6,446.88平方英尺。实际尺寸与布局均须核实。" },
        { q: "69号单位仍可租用吗？", a: "69号单位已出租。欢迎联系管理团队，了解其他物业及未来机会。" },
        { q: "可以同时作为展厅与运营空间吗？", a: "这种混合用途可能适合，但拟议用途、装修、执照、装卸及其他运营要求必须在签约前审查。" }
      ] }
    ]
  },
  news: {
    eyebrow: "新闻与媒体",
    title: "记录一个地方的持续转变。",
    description: "掌握TPK Park租赁、商业组合及成熟工业园更新动态，并阅读来自蒲种的精选独立媒体报道。",
    lead: "TPK Park发布的最新动态，以及精选独立媒体报道。",
    image: images.leasing,
    cta: { title: "正在寻找TPK Park租赁空间？", text: "查看当前商铺、展厅及工业单位资料，再向租赁团队确认最新供应情况。", button: "查看出租单位", route: "leasing" },
    blocks: [
      { type: "newsFeature", kicker: "最新动态", category: "租赁", date: "2026-09-07", title: "最新租赁资料与平面图", text: "以英文、马来文或中文了解商铺与展厅及独立式建筑，并查看租赁资料包中的平面图。Jalan TPK 2/8的69号单位已出租；欢迎联系团队了解其他选择。最新供应与商业条款须另行确认。", image: images.leasing, alt: "蒲种TPK Park待租商业与工业单位", route: "leasing", linkLabel: "查看出租单位" },
      { type: "newsUpdates", kicker: "来自TPK Park", title: "最新动态与实用资讯", text: "由TPK Park发布，介绍这里的商业组合及持续管理重点。", items: [
        { category: "园区更新", title: "让成熟工业区持续保持实用价值", text: "TPK Park针对特定产业的工作，包括租户组合、园林、建筑照明、招牌协调、停车管理及目的地活动。", image: images.homeLiving, alt: "蒲种TPK Park商业与工业环境", route: "about", linkLabel: "了解TPK Park的更新方式" },
        { category: "商业组合", title: "三个相辅相成的业态支柱", text: "家居生活、汽车服务及生活品味业态，共同形成展厅、服务、餐饮、运动与日常所需的多元组合。", image: images.homeLiving, alt: "蒲种TPK Park家居生活商家", route: "home", linkLabel: "探索商业组合" },
        { category: "2026年里程碑", date: "2026-07-05", title: "聚焦发展的家居生活集群获得认证", text: "获认证集群涵盖16家企业、96,728平方英尺及八个类别，坐落于成熟工业园环境。", image: images.record, alt: "TPK Park家居生活集群获马来西亚纪录大全认证", route: "milestones", linkLabel: "了解这项里程碑" }
      ] },
      { type: "news", kicker: "媒体档案", title: "独立媒体报道", text: "精选报道清楚列明媒体名称及原文语言；链接将在媒体网站打开。", limit: 20, detailed: true }
    ]
  },
  milestones: {
    eyebrow: "里程碑档案",
    title: "属于一个聚焦集群的纪录。",
    description: "TPK Park 2026 Home Carnival及家居生活零售集群获《马来西亚纪录大全》认证的档案。",
    lead: "2026年7月5日，TPK Park家居生活集群获《马来西亚纪录大全》认证为“工业园内最大型家居生活零售集群”。评估涵盖16家企业及八个家居生活类别。",
    blocks: [
      { type: "notice", text: "档案说明：2026 Home Carnival已经结束。本页保存该里程碑，并非现行活动广告。" },
      { type: "stats", items: [{ value: "16", label: "纪录评估涵盖的企业" }, { value: "96,728", label: "获认证集群总平方英尺" }, { value: "8", label: "家居生活类别" }] },
      { type: "split", title: "认证源于真实运作的商业集群。", text: "该纪录反映长期租户组合及产业更新的成果，并配合2026 Home Carnival与商家及访客共同庆祝。", route: "homeLiving", linkLabel: "探索家居生活集群", image: images.carnival, alt: "TPK Park 2026 Home Carnival档案图片" },
      { type: "timeline", kicker: "档案", title: "从更新走向认证", items: [
        { year: "之前", title: "实用工业基础", text: "成熟单位与直接通行成为面向顾客业务的基础。" }, { year: "逐步", title: "更清晰的租户组合", text: "家居生活商家逐渐形成协调的目的地。" }, { year: "2026", title: "纪录认证", text: "集群经评估涵盖16家企业、96,728平方英尺及八个类别。" }, { year: "持续", title: "更新继续", text: "里程碑支持——而非完成——地方的长期更新。" }
      ] }
    ]
  },
  profile: {
    eyebrow: "管理团队",
    title: "Wong Shung Yen 黄松延",
    displayNames: [{ text: "黄松延", lang: "zh-Hans" }, { text: "Wong Shung Yen", lang: "en" }],
    description: "TPK Park董事经理黄松延的个人资料，以及他在产业管理、零售集群及成熟工业园更新方面的工作。",
    lead: "TPK Park（金銮工业园）董事经理",
    cta: { title: "商业与媒体咨询。", text: "如欲查询与本简介有关的房地产、社区、文化或媒体事项，请联系TPK Park。", button: "联系TPK Park", route: "contact" },
    blocks: [
      { type: "profile", descriptor: "房地产发展 · 工业园更新 · 零售集群 · 地方营造", introduction: "黄松延是TPK Park Sdn. Bhd.的董事经理，主导公司在金銮工业园内所持特定产业的长期管理与重新定位，重点通过租户组合规划、零售集群及地方营造推动成熟工业物业更新。", imageAlt: "TPK Park董事经理黄松延" },
      { type: "quote", text: "TPK Park从传统工业园逐步转型为汇聚家居生活、汽车服务及生活品味的多元目的地，是一段历时三十年的旅程。", cite: "黄松延" },
      { type: "cards", kicker: "目前重点", title: "以长期视角经营一片地方", text: "在保留成熟工业环境实用优势的同时，进一步提升其商业价值。", items: [
        { number: "01", title: "产业长期管理", text: "对特定工业、商业及零售产业进行长期资产与租赁管理。" }, { number: "02", title: "商业集群规划", text: "围绕家居生活、汽车服务及生活品味规划租户组合。" }, { number: "03", title: "成熟工业园更新", text: "园林、建筑照明、招牌协调、停车、活动及目的地推广。" }
      ] },
      { type: "timeline", kicker: "专业背景", title: "房地产、法律与社会贡献", items: [
        { year: "1996年至今", title: "房地产开发", text: "担任Rasmi Indah Sdn. Bhd.及Dayamam Sdn. Bhd.董事，分别参与金銮工业园第一区及第二区的发展。" }, { year: "2010年至今", title: "TPK Park", text: "主导特定产业的长期管理与策略性重新定位。" }, { year: "教育", title: "墨尔本大学与拉曼大学", text: "墨尔本大学商学学士（1993）及法学荣誉学士（1995）；1996年及1997年取得维多利亚州及马来亚律师资格。目前在拉曼大学攻读房地产发展硕士。" }, { year: "社会", title: "教育与文化", text: "长期参与深静（哈古乐）华小董事会事务，包括担任财政；联合策划2024年国家美术馆古玉展；担任电影《Lelaki Harapan Dunia / Men Who Save the World》（2014）协同制片人。" }
      ] },
      { type: "profileSources", mode: "featured", kicker: "独立来源", title: "精选媒体与公开记录", text: "精选机构记录及主流媒体报道，简要记录相关工作。链接将打开原发布机构的网站。", moreRoute: "publicRecord" }
    ]
  },
  publicRecord: {
    eyebrow: "黄松延 · Wong Shung Yen",
    title: "媒体与公开记录",
    description: "精选机构资料及主流媒体报道，记录黄松延在房地产、教育、社区及文化领域的公共工作。",
    lead: "以来源为依据的精选公共工作年表，每项记录均链接至原发布机构。",
    parentRoute: "profile",
    cta: { title: "TPK Park管理团队。", text: "返回黄松延简介，了解他目前在TPK Park的工作。", button: "查看管理团队简介", route: "profile" },
    blocks: [
      { type: "profileSources", mode: "all", kicker: "公开记录", title: "独立媒体与机构来源", text: "这份精选年表集中收录能够实质记录公共工作与职务的来源。说明文字概述其相关性；链接所指的原发布页面为主要记录。" }
    ]
  },
  contact: {
    eyebrow: "联系",
    title: "从一次对话开始。",
    description: "联系蒲种TPK Park管理团队，查询租赁、活动合作、媒体或一般事项。",
    lead: "如有租赁、媒体、活动或一般事项，请联系管理处，或使用以下表格说明您的需求。",
    blocks: [{ type: "contact", officeHours: "星期一至五，上午9时至下午5时；星期六，上午9时至中午12时", address: "Taman Perindustrian Kinrara, 47180 Puchong, Selangor, Malaysia", labels: { phone: "电话", email: "电邮", hours: "管理处办公时间", address: "地点", formTitle: "您希望讨论什么？" } }]
  }
};

export const site = {
  en: { ...common.en, pages: enPages },
  ms: { ...common.ms, pages: msPages },
  zh: { ...common.zh, pages: zhPages }
};

export const primaryNav = ["about", "homeLiving", "automotive", "lifestyle", "leasing", "news", "contact"];

export const socialLinks = [
  ["Facebook", "https://www.facebook.com/tpkpark.my/"],
  ["Instagram", "https://www.instagram.com/tpkpark/"],
  ["TikTok", "https://www.tiktok.com/@tpkpark"]
];
