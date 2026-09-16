// Public details and image provenance: docs/total-tools-profile-sources.md.
const website = "https://www.totaltools.com.my/";
const products = "https://www.totaltools.com.my/products";
const branchListing = "https://biz.puchong.co/businesses/total-one-stop-tools-station-bestbuy-kinrara-bk4-bhk82/";
const directions = "https://maps.app.goo.gl/a5rv2mVYV5JwENgX6";
const image = "https://www.tpkpark.com/assets/images/total-tools-cordless-drill-1250.webp";
const imageSource = { label: "TOTAL Malaysia", url: website };
const address = "No. 6, Jalan TPK 2/2, Taman Perindustrian Kinrara, Seksyen 2, 47100 Puchong, Selangor";

export const totalToolsBusiness = {
  "@type": "HardwareStore",
  "@id": "https://www.tpkpark.com/home-living/total-tools/#store",
  name: "Total One Stop Tools Station BestBuy Kinrara BK4 (BHK82)",
  alternateName: "Total Tools",
  url: website,
  telephone: "+60102908007",
  hasMap: directions,
  address: {
    "@type": "PostalAddress",
    streetAddress: "6, Jalan TPK 2/2, Taman Perindustrian Kinrara, Seksyen 2",
    addressLocality: "Puchong",
    addressRegion: "Selangor",
    postalCode: "47100",
    addressCountry: "MY"
  },
  containedInPlace: { "@id": "https://www.tpkpark.com/#taman-perindustrian-kinrara" }
};

export const totalToolsProfiles = {
  en: {
    parentRoute: "homeLiving",
    eyebrow: "Total Tools · Tools & accessories",
    title: "Total Tools at TPK Park.",
    description: "Plan a visit to Total Tools BestBuy Kinrara at No. 6, Jalan TPK 2/2, Puchong. Find its branch phone, directions and advice on choosing tools for your next job.",
    lead: "Total Tools’ BestBuy Kinrara outlet on Jalan TPK 2/2 is a stop for tools and accessories within TPK Park’s Home & Living cluster. Visit when planning home improvements, assembling a toolkit or looking for equipment for regular maintenance work.",
    image,
    heroImage: image,
    heroAlt: "TOTAL cordless drill and a separate 20V battery on a teal background",
    business: totalToolsBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "Choose tools around the work you do.", text: "The TOTAL range includes cordless and corded power tools, hand tools, batteries and accessories. Start with the material and task: drilling a wall, assembling furniture or carrying out workshop repairs may call for different equipment. Browse the brand’s catalogue, then ask the Kinrara team which models, accessories and sets are available in store.", image, alt: "TOTAL brushless cordless drill with its fitted battery and an additional battery alongside it", caption: "A cordless drill and battery from TOTAL’s official product imagery. Image:", captionSource: imageSource, route: "homeLiving", linkLabel: "Explore Home & Living" },
      { type: "cards", alignHeadings: true, kicker: "Before you choose", title: "Build a toolkit that suits the job.", items: [
        { number: "01", title: "Describe the task", text: "Bring a short list of the jobs you have in mind, with photos or measurements where useful. Explain the material you will be working on and how often you expect to use the tool, so the team can help you compare suitable options." },
        { number: "02", title: "Check the battery system", text: "If you already own cordless tools, note the exact battery and charger models. Confirm compatibility for each new tool and whether the price covers the tool alone or a kit with a battery and charger. Compare what each set includes." },
        { number: "03", title: "Ask about the extras", text: "Check which bits, blades or other accessories suit the chosen tool and material. Ask about protective equipment, replacement parts and servicing. Before buying, confirm the warranty terms, proof of purchase needed and after-sales contact." }
      ] },
      { type: "businessVisit", kicker: "Plan your visit", title: "Find Total Tools on Jalan TPK 2/2.", text: "Look for the BestBuy Kinrara BK4 outlet at No. 6.", addressLabel: "Kinrara outlet address", address, phoneLabel: "Kinrara branch phone", phoneDisplay: "+60 10 290 8007", note: "Call ahead to confirm current opening hours, holiday arrangements and availability of the models or accessories you need.", links: [
        { label: "Directions on Google Maps", url: directions },
        { label: "Total Tools Malaysia website", url: website },
        { label: "Kinrara branch listing", url: branchListing }
      ] }
    ],
    cta: { title: "Plan your next project.", text: "Browse TOTAL’s tools and note the model numbers that interest you. Bring the list along to compare options and check what is available at Kinrara.", button: "Explore TOTAL tools", url: products }
  },
  ms: {
    parentRoute: "homeLiving",
    eyebrow: "Total Tools · Alat & aksesori",
    title: "Total Tools di TPK Park.",
    description: "Rancang lawatan ke Total Tools BestBuy Kinrara di No. 6, Jalan TPK 2/2, Puchong. Lihat telefon cawangan, arah perjalanan dan panduan memilih alat untuk projek anda.",
    lead: "Cawangan BestBuy Kinrara Total Tools di Jalan TPK 2/2 menawarkan pilihan alat dan aksesori dalam kluster Home & Living TPK Park. Singgah apabila merancang penambahbaikan rumah, melengkapkan set alat atau mencari peralatan untuk kerja penyelenggaraan harian.",
    image,
    heroImage: image,
    heroAlt: "Gerudi tanpa wayar TOTAL dan bateri 20V berasingan pada latar berwarna teal",
    business: totalToolsBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "Pilih alat mengikut kerja yang dirancang.", text: "Rangkaian TOTAL merangkumi alat kuasa tanpa wayar dan berkabel, alat tangan, bateri serta aksesori. Mulakan dengan bahan dan jenis kerja: menggerudi dinding, memasang perabot atau membuat pembaikan di bengkel mungkin memerlukan peralatan yang berbeza. Lihat katalog jenama, kemudian tanya pasukan Kinrara tentang model, aksesori dan set yang tersedia di kedai.", image, alt: "Gerudi tanpa wayar tanpa berus TOTAL dengan bateri terpasang serta bateri tambahan di sebelahnya", caption: "Gerudi tanpa wayar dan bateri daripada imej produk rasmi TOTAL. Imej:", captionSource: imageSource, route: "homeLiving", linkLabel: "Terokai Home & Living" },
      { type: "cards", alignHeadings: true, kicker: "Sebelum memilih", title: "Lengkapkan set alat mengikut keperluan.", items: [
        { number: "01", title: "Terangkan jenis kerja", text: "Bawa senarai ringkas kerja yang ingin dilakukan, berserta foto atau ukuran jika perlu. Terangkan bahan yang akan dikerjakan dan kekerapan penggunaan alat supaya pasukan boleh membantu anda membandingkan pilihan yang sesuai." },
        { number: "02", title: "Semak sistem bateri", text: "Jika anda sudah memiliki alat tanpa wayar, catat model bateri dan pengecas yang tepat. Sahkan keserasian bagi setiap alat baharu dan sama ada harga meliputi alat sahaja atau set bersama bateri dan pengecas. Bandingkan kandungan setiap set." },
        { number: "03", title: "Tanya tentang aksesori", text: "Semak mata gerudi, bilah atau aksesori lain yang sesuai dengan alat dan bahan pilihan. Tanya tentang peralatan perlindungan, alat ganti dan servis. Sebelum membeli, sahkan syarat jaminan, bukti pembelian yang diperlukan serta saluran selepas jualan." }
      ] },
      { type: "businessVisit", kicker: "Rancang lawatan", title: "Cari Total Tools di Jalan TPK 2/2.", text: "Cari cawangan BestBuy Kinrara BK4 di No. 6.", addressLabel: "Alamat cawangan Kinrara", address, phoneLabel: "Telefon cawangan Kinrara", phoneDisplay: "+60 10 290 8007", note: "Hubungi cawangan terlebih dahulu untuk mengesahkan waktu operasi semasa, aturan cuti umum serta ketersediaan model atau aksesori yang diperlukan.", links: [
        { label: "Arah melalui Google Maps", url: directions },
        { label: "Laman web Total Tools Malaysia", url: website },
        { label: "Penyenaraian cawangan Kinrara", url: branchListing }
      ] }
    ],
    cta: { title: "Rancang projek seterusnya.", text: "Lihat rangkaian alat TOTAL dan catat nombor model yang menarik minat anda. Bawa senarai itu untuk membandingkan pilihan dan menyemak ketersediaannya di Kinrara.", button: "Terokai alat TOTAL", url: products }
  },
  zh: {
    parentRoute: "homeLiving",
    eyebrow: "Total Tools · 工具与配件",
    title: "TPK Park里的Total Tools。",
    description: "Total Tools BestBuy Kinrara位于蒲种TPK Park的No. 6, Jalan TPK 2/2。查看分店电话、导航及选购电动工具、手工具与配件的到访建议。",
    lead: "Total Tools的BestBuy Kinrara门店位于Jalan TPK 2/2，是TPK Park家居生活集群中的工具与配件采购站。无论准备改善居家空间、添置工具，或为日常维修选购设备，都可以到店了解。",
    image,
    heroImage: image,
    heroAlt: "蓝绿色背景上的TOTAL充电式电钻与一块独立的20V电池",
    business: totalToolsBusiness,
    datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "从实际用途开始挑选工具。", text: "TOTAL的产品包括充电式与有线电动工具、手工具、电池及配件。先想清楚要处理的材料与工作：墙面钻孔、组装家具或车间维修，可能需要不同的设备。可先浏览品牌目录，再向Kinrara团队确认店内有哪些型号、配件及套装可供选择。", image, alt: "装有电池的TOTAL无刷充电式电钻，旁边另放一块电池", caption: "TOTAL官方产品图片中的充电式电钻与电池。图片来源：", captionSource: imageSource, route: "homeLiving", linkLabel: "查看家居生活品牌" },
      { type: "cards", alignHeadings: true, kicker: "选购之前", title: "按工作需要配齐工具。", items: [
        { number: "01", title: "说明要做的工作", text: "列出准备进行的工作，必要时带上照片或尺寸。说明需要处理的材料，以及预计使用工具的频率，方便团队协助比较适合的选择。" },
        { number: "02", title: "确认电池兼容性", text: "如果已有充电式工具，请记下电池与充电器的准确型号。逐一确认新工具是否兼容，并问清价格是单机，还是包含电池及充电器的套装。比较各套装实际包含的物品。" },
        { number: "03", title: "了解配件与售后", text: "确认钻头、刀片或其他配件是否适合所选工具与材料，并询问防护用品、替换零件及维修服务。购买前，了解保修条款、所需购买凭证，以及售后服务的联系渠道。" }
      ] },
      { type: "businessVisit", kicker: "到访安排", title: "在Jalan TPK 2/2找到Total Tools。", text: "BestBuy Kinrara BK4门店位于6号。", addressLabel: "Kinrara门店地址", address, phoneLabel: "Kinrara分店电话", phoneDisplay: "+60 10 290 8007", note: "出发前请致电确认当前营业时间、公共假期安排，以及所需型号或配件是否有货。", links: [
        { label: "使用Google Maps导航", url: directions },
        { label: "Total Tools马来西亚官网", url: website },
        { label: "Kinrara分店资料", url: branchListing }
      ] }
    ],
    cta: { title: "为下一项工程做好准备。", text: "先浏览TOTAL的工具，记下感兴趣的型号，再带着清单到Kinrara比较选择并确认供货情况。", button: "浏览TOTAL工具", url: products }
  }
};
