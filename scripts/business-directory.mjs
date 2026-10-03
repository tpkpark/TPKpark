export const directoryClusters = ["homeLiving", "automotive", "lifestyle"];

export const directoryCopy = {
  en: {
    nav: "Find a business", title: "Find your next stop.", eyebrow: "Business directory",
    description: "Find Home & Living showrooms, automotive businesses, dining and lifestyle services at TPK Park, Taman Perindustrian Kinrara, Puchong.",
    lead: "Explore businesses across TPK Park’s three clusters. Search by name or service, then open a business guide to plan your visit.",
    search: "Search businesses", placeholder: "Business name, service or street", cluster: "Choose a cluster", all: "All clusters",
    results: "businesses shown", empty: "No matching businesses. Try another name or service, or choose all clusters.", reset: "Reset filters", guide: "Business guide", map: "Open map",
    note: "This directory brings together the businesses featured on this website. Each business manages its own opening hours, appointments and contact details. Check its guide or official channels before travelling.",
    cta: { title: "Make more of your visit.", text: "Explore the clusters and plan a few stops around Taman Perindustrian Kinrara.", button: "Explore Home & Living", route: "homeLiving" }
  },
  ms: {
    nav: "Cari perniagaan", title: "Cari persinggahan seterusnya.", eyebrow: "Direktori perniagaan",
    description: "Cari bilik pameran Home & Living, perniagaan automotif, tempat makan dan perkhidmatan gaya hidup di TPK Park, Taman Perindustrian Kinrara, Puchong.",
    lead: "Terokai perniagaan dalam tiga kluster TPK Park. Cari mengikut nama atau perkhidmatan, kemudian buka panduan perniagaan untuk merancang lawatan.",
    search: "Cari perniagaan", placeholder: "Nama perniagaan, perkhidmatan atau jalan", cluster: "Pilih kluster", all: "Semua kluster",
    results: "perniagaan dipaparkan", empty: "Tiada perniagaan sepadan. Cuba nama atau perkhidmatan lain, atau pilih semua kluster.", reset: "Tetapkan semula", guide: "Panduan perniagaan", map: "Buka peta",
    note: "Direktori ini menghimpunkan perniagaan yang dipaparkan di laman web ini. Setiap perniagaan mengurus waktu operasi, janji temu dan butiran hubungannya sendiri. Semak panduan atau saluran rasminya sebelum berkunjung.",
    cta: { title: "Lengkapkan lawatan anda.", text: "Terokai kluster dan rancang beberapa persinggahan di Taman Perindustrian Kinrara.", button: "Terokai Home & Living", route: "homeLiving" }
  },
  zh: {
    nav: "查找商家", title: "找到下一站。", eyebrow: "商家目录",
    description: "查找蒲种TPK Park金銮工业园的家居展厅、汽车服务、餐饮与生活品味商家，查看商家指南并规划到访行程。",
    lead: "浏览TPK Park三大业态的商家。按名称或服务搜索，再打开商家指南，安排您的到访行程。",
    search: "搜索商家", placeholder: "商家名称、服务或街道", cluster: "选择业态", all: "所有业态",
    results: "家商家", empty: "没有符合条件的商家。请尝试其他名称或服务，或选择所有业态。", reset: "重置筛选", guide: "商家指南", map: "打开地图",
    note: "本目录汇集本网站介绍的商家。各商家的营业时间、预约与联系方式由商家自行管理；出发前请查看商家指南或官方渠道。",
    cta: { title: "让行程更丰富。", text: "探索金銮工业园的三大业态，串联几处到访地点。", button: "探索家居生活", route: "homeLiving" }
  }
};

// Use the existing cluster lists and business profiles as the source of truth.
export function directoryEntries(data) {
  return directoryClusters.flatMap(cluster => {
    const directory = data.pages[cluster].blocks.find(block => block.type === "directory");
    return directory.items.map(([category, name, route]) => {
      const page = data.pages[route];
      const visit = page.blocks.find(block => block.type === "businessVisit");
      return { cluster, category, name, route, address: visit?.address || page.business?.address?.streetAddress || "", map: page.business?.hasMap || "" };
    });
  });
}

export function installDirectory(site, seoTitles) {
  for (const [locale, data] of Object.entries(site)) {
    const copy = directoryCopy[locale];
    data.nav.businessDirectory = copy.nav;
    seoTitles[locale].businessDirectory = `${copy.eyebrow} | TPK Park`;
    data.pages.businessDirectory = {
      eyebrow: copy.eyebrow, title: copy.title, description: copy.description, lead: copy.lead,
      image: data.pages.home.image, datePublished: "2026-10-03",
      blocks: [{ type: "businessDirectory" }], cta: copy.cta
    };
  }
}
