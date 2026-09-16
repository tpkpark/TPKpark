// Source verification and editorial boundaries: docs/fadzil-enterprise-profile-sources.md.
const officialSite = "https://www.fadzilrecond.com/";
const whatsapp = "https://wa.me/60128533618";
const directions = "https://www.google.com/maps/search/?api=1&query=Fadzil+Enterprise+3+Jalan+TPK+1%2F3+Taman+Perindustrian+Kinrara+Puchong";
const waze = "https://www.waze.com/ul?q=Fadzil%20Enterprise%203%20Jalan%20TPK%201%2F3%20Taman%20Perindustrian%20Kinrara%20Puchong&navigate=yes";
const image = "https://www.fadzilrecond.com/management.file/img/202405307980311979.jpg";
const address = "3, Jalan TPK 1/3, Taman Perindustrian Kinrara, 47100 Puchong, Selangor";

export const fadzilEnterpriseBusiness = {
  "@type": "AutoDealer",
  "@id": "https://www.tpkpark.com/automotive/fadzil-enterprise/#business",
  name: "Fadzil Enterprise Sdn Bhd",
  alternateName: "Fadzil Recond",
  url: officialSite,
  sameAs: [officialSite],
  telephone: "+60192138444",
  hasMap: directions,
  address: {
    "@type": "PostalAddress",
    streetAddress: "3, Jalan TPK 1/3, Taman Perindustrian Kinrara",
    addressLocality: "Puchong",
    addressRegion: "Selangor",
    postalCode: "47100",
    addressCountry: "MY"
  },
  containedInPlace: { "@id": "https://www.tpkpark.com/#taman-perindustrian-kinrara" }
};

export const fadzilEnterpriseProfiles = {
  en: {
    parentRoute: "automotive",
    eyebrow: "Fadzil Enterprise · Reconditioned vehicle sales",
    title: "Fadzil Enterprise at TPK Park.",
    description: "Find Fadzil Enterprise Sdn Bhd at 3, Jalan TPK 1/3, TPK Park, Puchong. Explore its reconditioned vehicle sales focus, contact channels and directions.",
    lead: "Fadzil Enterprise Sdn Bhd, also presented publicly as Fadzil Recond, is a vehicle sales business and licensed Open AP company with a strong focus on Japan-imported reconditioned cars and MPVs. Its current TPK Park sales presence is listed at No. 3, Jalan TPK 1/3.",
    image,
    heroImage: image,
    heroAlt: "Fadzil Enterprise showroom image with imported MPVs, from the official Fadzil Recond website",
    business: fadzilEnterpriseBusiness,
    datePublished: "2026-09-17",
    blocks: [
      { type: "split", title: "A sales-focused stop for reconditioned vehicles.", text: "Fadzil Recond’s public material focuses on imported reconditioned vehicles, especially MPVs, while also referring to sedans, SUVs and selected premium models. Stock, model year, specification and pricing change frequently, so use the showroom visit to compare current vehicles rather than relying on an older online listing.", image, alt: "Official Fadzil Enterprise showroom image showing imported MPVs parked outside", route: "automotive", linkLabel: "Explore Automotive" },
      { type: "cards", alignHeadings: true, kicker: "Before you buy", title: "Compare the vehicle, documents and total deal.", items: [
        { number: "01", title: "Check the current vehicle", text: "Confirm the exact model, variant, year, mileage, specification and condition of the unit you are considering. Ask to see the available supporting records and make sure the car you inspect is the car described in the quotation." },
        { number: "02", title: "Understand the import background", text: "Fadzil Enterprise appears on MITI’s Open AP list for passenger cars, while Fadzil Recond describes itself as a direct importer of reconditioned vehicles. Ask the sales team to explain the individual vehicle’s import, auction and registration records where relevant." },
        { number: "03", title: "Review the full purchase package", text: "Before committing, confirm the final vehicle price, financing assumptions, registration, warranty terms, insurance and any optional items in writing. Current promotions and stock-specific terms should be checked directly with the sales team." }
      ] },
      { type: "businessVisit", kicker: "Plan your visit", title: "Find Fadzil Enterprise in TPK Park Seksyen 1.", text: "The current TPK Park listing places Fadzil Enterprise at No. 3, Jalan TPK 1/3. A recent third-party Puchong listing also records this Taman Perindustrian Kinrara address. Fadzil Recond’s own website still shows its earlier Puchong Jaya address, so confirm the destination directly while public listings are being updated.", addressLabel: "TPK Park sales address", address,
        contacts: [
          { label: "Puchong sales enquiries", value: "+60 19 213 8444", url: "tel:+60192138444" },
          { label: "Fadzil Recond WhatsApp", value: "+60 12 853 3618", url: whatsapp }
        ],
        hours: [
          { label: "Monday–Saturday", value: "9.30am–6.30pm — published by Fadzil Recond; confirm for the TPK Park location" },
          { label: "Sunday", value: "11am–5pm — published by Fadzil Recond; confirm for the TPK Park location" }
        ],
        note: "The brand website still carries an older Puchong address. Confirm the TPK Park location, opening hours, vehicle availability and sales appointment before a time-sensitive visit.",
        links: [
          { label: "Find Fadzil Enterprise on Google Maps", url: directions },
          { label: "Directions on Waze", url: waze },
          { label: "Visit Fadzil Recond", url: officialSite }
        ]
      }
    ],
    cta: { title: "Check the current vehicles before you go.", text: "Contact the Fadzil Enterprise sales team to confirm the TPK Park location, available vehicles and a suitable viewing time.", button: "WhatsApp Fadzil Recond", url: whatsapp }
  },
  ms: {
    parentRoute: "automotive",
    eyebrow: "Fadzil Enterprise · Jualan kenderaan recond",
    title: "Fadzil Enterprise di TPK Park.",
    description: "Cari Fadzil Enterprise Sdn Bhd di 3, Jalan TPK 1/3, TPK Park, Puchong. Lihat fokus jualan kenderaan recond, saluran hubungan dan arah perjalanan.",
    lead: "Fadzil Enterprise Sdn Bhd, yang turut dipaparkan secara awam sebagai Fadzil Recond, ialah perniagaan jualan kenderaan dan syarikat Open AP berlesen dengan tumpuan kuat pada kereta recond import Jepun dan MPV. Kehadiran jualan semasanya di TPK Park disenaraikan di No. 3, Jalan TPK 1/3.",
    image,
    heroImage: image,
    heroAlt: "Imej bilik pameran Fadzil Enterprise dengan MPV import, daripada laman rasmi Fadzil Recond",
    business: fadzilEnterpriseBusiness,
    datePublished: "2026-09-17",
    blocks: [
      { type: "split", title: "Destinasi jualan untuk kenderaan recond.", text: "Bahan awam Fadzil Recond memberi tumpuan kepada kenderaan recond import, khususnya MPV, di samping sedan, SUV dan model premium terpilih. Stok, tahun model, spesifikasi dan harga berubah dengan kerap, jadi gunakan lawatan bilik pameran untuk membandingkan kenderaan semasa dan bukannya bergantung pada iklan lama.", image, alt: "Imej rasmi bilik pameran Fadzil Enterprise dengan MPV import diparkir di hadapan", route: "automotive", linkLabel: "Terokai Automotif" },
      { type: "cards", alignHeadings: true, kicker: "Sebelum membeli", title: "Bandingkan kenderaan, dokumen dan keseluruhan tawaran.", items: [
        { number: "01", title: "Semak kenderaan sebenar", text: "Sahkan model, varian, tahun, perbatuan, spesifikasi dan keadaan unit yang sedang dipertimbangkan. Minta rekod sokongan yang tersedia dan pastikan kereta yang diperiksa ialah kereta yang dinyatakan dalam sebut harga." },
        { number: "02", title: "Fahami latar belakang import", text: "Fadzil Enterprise tersenarai dalam senarai Open AP MITI bagi kereta penumpang, manakala Fadzil Recond menyatakan dirinya sebagai pengimport terus kenderaan recond. Minta pasukan jualan menerangkan rekod import, lelongan dan pendaftaran bagi kenderaan berkenaan apabila relevan." },
        { number: "03", title: "Semak pakej pembelian penuh", text: "Sebelum membuat komitmen, sahkan harga akhir kenderaan, andaian pembiayaan, pendaftaran, terma waranti, insurans dan item pilihan secara bertulis. Promosi semasa dan terma khusus stok hendaklah disahkan terus dengan pasukan jualan." }
      ] },
      { type: "businessVisit", kicker: "Rancang kunjungan", title: "Cari Fadzil Enterprise di TPK Park Seksyen 1.", text: "Penyenaraian TPK Park semasa meletakkan Fadzil Enterprise di No. 3, Jalan TPK 1/3. Satu penyenaraian Puchong pihak ketiga yang terkini turut merekodkan alamat Taman Perindustrian Kinrara ini. Laman Fadzil Recond sendiri masih memaparkan alamat Puchong Jaya yang lebih lama, jadi sahkan destinasi terus sementara penyenaraian awam dikemas kini.", addressLabel: "Alamat jualan TPK Park", address,
        contacts: [
          { label: "Pertanyaan jualan Puchong", value: "+60 19 213 8444", url: "tel:+60192138444" },
          { label: "WhatsApp Fadzil Recond", value: "+60 12 853 3618", url: whatsapp }
        ],
        hours: [
          { label: "Isnin–Sabtu", value: "9.30 pagi–6.30 petang — diterbitkan oleh Fadzil Recond; sahkan untuk lokasi TPK Park" },
          { label: "Ahad", value: "11 pagi–5 petang — diterbitkan oleh Fadzil Recond; sahkan untuk lokasi TPK Park" }
        ],
        note: "Laman jenama masih memaparkan alamat lama di Puchong. Sahkan lokasi TPK Park, waktu operasi, ketersediaan kenderaan dan janji temu jualan sebelum kunjungan yang terikat masa.",
        links: [
          { label: "Cari Fadzil Enterprise di Google Maps", url: directions },
          { label: "Arah melalui Waze", url: waze },
          { label: "Lawati Fadzil Recond", url: officialSite }
        ]
      }
    ],
    cta: { title: "Semak kenderaan semasa sebelum berkunjung.", text: "Hubungi pasukan jualan Fadzil Enterprise untuk mengesahkan lokasi TPK Park, kenderaan yang tersedia dan masa lawatan yang sesuai.", button: "WhatsApp Fadzil Recond", url: whatsapp }
  },
  zh: {
    parentRoute: "automotive",
    eyebrow: "Fadzil Enterprise · 日本进口Recond汽车销售",
    title: "TPK Park里的Fadzil Enterprise。",
    description: "Fadzil Enterprise Sdn Bhd位于蒲种TPK Park的Jalan TPK 1/3门牌3号。查看Recond进口车销售定位、联系方式与导航。",
    lead: "Fadzil Enterprise Sdn Bhd亦以Fadzil Recond对外推广，是一家汽车销售公司及获批Open AP企业，主要经营日本进口Recond汽车与MPV。目前TPK Park销售地点列于Jalan TPK 1/3门牌3号。",
    image,
    heroImage: image,
    heroAlt: "Fadzil Recond官网刊载的Fadzil Enterprise展厅与进口MPV照片",
    business: fadzilEnterpriseBusiness,
    datePublished: "2026-09-17",
    blocks: [
      { type: "split", title: "以Recond进口车销售为主的汽车展厅。", text: "Fadzil Recond现有公开资料以进口Recond汽车为主，尤其强调MPV，也涵盖轿车、SUV及部分高端车型。库存、年份、规格与售价变化较快，到访时应以现场可售车辆为准，不宜依赖较旧的网络广告。", image, alt: "Fadzil Enterprise官方展厅照片，展示门前停放的进口MPV", route: "automotive", linkLabel: "查看汽车服务" },
      { type: "cards", alignHeadings: true, kicker: "购车之前", title: "比较车辆本身、文件与完整交易条件。", items: [
        { number: "01", title: "确认实际车辆", text: "确认准备购买车辆的车型、版本、年份、里程、规格与车况。要求查看可提供的支持文件，并确认现场检查的车辆与报价单所指的是同一辆车。" },
        { number: "02", title: "了解进口背景", text: "Fadzil Enterprise列于MITI的乘用车Open AP名单，而Fadzil Recond亦说明其经营直接进口Recond车辆。可按个别车辆向销售团队了解相关进口、拍卖及注册记录。" },
        { number: "03", title: "核对完整购车方案", text: "决定之前，把最终车价、融资假设、注册、保修、保险及任何选配项目以书面方式确认。促销及个别库存车辆的条件应直接向销售团队核实。" }
      ] },
      { type: "businessVisit", kicker: "到访安排", title: "在TPK Park第一区找到Fadzil Enterprise。", text: "现有TPK Park资料把Fadzil Enterprise列在Jalan TPK 1/3门牌3号。近期一个第三方蒲种商家页面也记录同一Taman Perindustrian Kinrara地址。Fadzil Recond官网目前仍显示较早的Puchong Jaya地址，因此在公开平台更新期间，建议出发前直接确认目的地。", addressLabel: "TPK Park销售地点", address,
        contacts: [
          { label: "蒲种销售咨询", value: "+60 19 213 8444", url: "tel:+60192138444" },
          { label: "Fadzil Recond WhatsApp", value: "+60 12 853 3618", url: whatsapp }
        ],
        hours: [
          { label: "星期一至六", value: "上午9时30分–下午6时30分 — Fadzil Recond公布；TPK Park地点请先确认" },
          { label: "星期日", value: "上午11时–下午5时 — Fadzil Recond公布；TPK Park地点请先确认" }
        ],
        note: "品牌官网仍显示较早的蒲种地址。出发前请确认TPK Park地点、营业时间、车辆供应及销售预约。",
        links: [
          { label: "在Google Maps查找Fadzil Enterprise", url: directions },
          { label: "使用Waze导航", url: waze },
          { label: "访问Fadzil Recond官网", url: officialSite }
        ]
      }
    ],
    cta: { title: "出发前先确认目前可看的车辆。", text: "联系Fadzil Enterprise销售团队，确认TPK Park地点、目前库存及合适的看车时间。", button: "WhatsApp联系Fadzil Recond", url: whatsapp }
  }
};
