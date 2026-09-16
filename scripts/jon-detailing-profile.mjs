// Verified contact details and photo provenance: docs/jon-detailing-profile-sources.md.
const facebook = "https://www.facebook.com/jondetailing/";
const directions = "https://www.google.com/maps/search/?api=1&query=Jon+Detailing+71+Jalan+TPK+2%2F8+Puchong";
const waze = "https://www.waze.com/live-map/directions/my/selangor/puchong/jon-detailing?to=place.ChIJxwp1ZmxKzDERodc0zzgPgF8";
const image = "https://www.tpkpark.com/assets/images/jon-detailing-car-care-1086.webp";
const imageSource = { label: "Jon Detailing", url: "https://www.facebook.com/photo/?fbid=1905956784132823&set=pcb.1905956880799480" };
const address = "71, Jalan TPK 2/8, Taman Perindustrian Kinrara, Puchong, Selangor";

export const jonDetailingBusiness = {
  "@type": "AutomotiveBusiness",
  "@id": "https://www.tpkpark.com/automotive/jon-detailing/#business",
  name: "Jon Detailing",
  url: facebook, telephone: "+60126844034", image, hasMap: waze,
  address: {
    "@type": "PostalAddress",
    streetAddress: "71, Jalan TPK 2/8, Taman Perindustrian Kinrara",
    addressLocality: "Puchong", addressRegion: "Selangor", addressCountry: "MY"
  },
  containedInPlace: { "@id": "https://www.tpkpark.com/#taman-perindustrian-kinrara" }
};

export const jonDetailingProfiles = {
  en: {
    parentRoute: "automotive",
    eyebrow: "Jon Detailing · Interior & exterior care",
    title: "Jon Detailing at TPK Park.",
    description: "Find Jon Detailing at 71, Jalan TPK 2/8, Puchong. Contact details, directions and visit guidance for interior and exterior car detailing at TPK Park.",
    lead: "Jon Detailing focuses on interior and exterior car care at No. 71, Jalan TPK 2/8. Contact the team to discuss your car’s condition and plan a detailing appointment within TPK Park’s Automotive cluster.",
    image, heroImage: image,
    heroAlt: "A red sports car being attended to at Jon Detailing, from the business’s official photo collection",
    business: jonDetailingBusiness, datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "Plan the finish, inside and out.", text: "A detailing visit starts with what you want to improve: the appearance of the paintwork, the condition of the cabin or the overall presentation of your car. Describe the areas that need attention and any previous surface treatments. Jon Detailing’s team can discuss your priorities and the work suited to the vehicle before you agree on a booking.", image, alt: "Two people attending to a red sports car with its door open at Jon Detailing", caption: "Car care in progress, from Jon Detailing’s official photo collection. Photo:", captionSource: imageSource, route: "automotive", linkLabel: "Explore Automotive" },
      { type: "cards", alignHeadings: true, kicker: "Before your visit", title: "Make your detailing appointment count.", items: [
        { number: "01", title: "Start with the exterior", text: "Point out dull areas, water marks or visible scratches, and mention any coating, film or recent paintwork. Ask the team to assess the finish and explain what can realistically be improved, which treatment it recommends and what the quotation covers." },
        { number: "02", title: "Discuss the interior", text: "Highlight stains, odours or surfaces that need attention, including seats, carpets and trim. Explain any previous treatments and ask which cleaning approach suits the materials. Confirm the scope of work and whether drying time affects when you can collect the car." },
        { number: "03", title: "Confirm the appointment", text: "Share your car’s model and the work you want to discuss. Confirm the quotation, drop-off time and expected collection arrangements before booking. Ask what to remove from the cabin and how to care for any treated surfaces after your visit." }
      ] },
      { type: "businessVisit", kicker: "Plan your visit", title: "Find Jon Detailing on Jalan TPK 2/8.", text: "The detailing business is at No. 71. Call Jon Detailing or visit its official Facebook page to discuss your car and arrange a suitable appointment.", addressLabel: "TPK Park address", address,
        contacts: [{ label: "Detailing enquiries", value: "+60 12 684 4034", url: "tel:+60126844034" }],
        note: "Confirm opening hours, appointment availability, the agreed work and the expected turnaround directly with Jon Detailing before travelling.", links: [
          { label: "Find Jon Detailing on Google Maps", url: directions },
          { label: "Directions to Jon Detailing on Waze", url: waze },
          { label: "Jon Detailing on Facebook", url: facebook }
        ]
      }
    ],
    cta: { title: "Talk through your car’s detailing needs.", text: "Call Jon Detailing with your vehicle details and the areas you would like the team to assess.", button: "Call Jon Detailing", url: "tel:+60126844034" }
  },
  ms: {
    parentRoute: "automotive",
    eyebrow: "Jon Detailing · Penjagaan dalaman & luaran",
    title: "Jon Detailing di TPK Park.",
    description: "Cari Jon Detailing di 71, Jalan TPK 2/8, Puchong. Maklumat hubungan, arah perjalanan dan panduan kunjungan untuk detailing dalaman serta luaran kereta.",
    lead: "Jon Detailing memberi tumpuan kepada penjagaan dalaman dan luaran kereta di No. 71, Jalan TPK 2/8. Hubungi pasukan untuk membincangkan keadaan kereta anda dan mengatur janji temu detailing dalam kluster Automotif TPK Park.",
    image, heroImage: image,
    heroAlt: "Kereta sport merah sedang diberi perhatian di Jon Detailing, daripada koleksi foto rasmi perniagaan",
    business: jonDetailingBusiness, datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "Rancang penjagaan dalaman dan luaran.", text: "Mulakan kunjungan detailing dengan perkara yang ingin anda perbaiki: penampilan cat, keadaan kabin atau kekemasan keseluruhan kereta. Terangkan bahagian yang memerlukan perhatian serta sebarang rawatan permukaan terdahulu. Pasukan Jon Detailing boleh membincangkan keutamaan anda dan kerja yang sesuai untuk kenderaan sebelum anda bersetuju dengan tempahan.", image, alt: "Dua orang memberi perhatian kepada sebuah kereta sport merah dengan pintu terbuka di Jon Detailing", caption: "Penjagaan kereta sedang dijalankan, daripada koleksi foto rasmi Jon Detailing. Foto:", captionSource: imageSource, route: "automotive", linkLabel: "Terokai Automotif" },
      { type: "cards", alignHeadings: true, kicker: "Sebelum berkunjung", title: "Bersedia untuk janji temu detailing.", items: [
        { number: "01", title: "Mulakan dengan luaran", text: "Tunjukkan bahagian yang kusam, kesan air atau calar yang kelihatan. Maklumkan sebarang salutan, filem pelindung atau kerja cat terkini. Minta pasukan menilai permukaan dan menerangkan hasil yang munasabah, rawatan yang dicadangkan serta perkara yang termasuk dalam sebut harga." },
        { number: "02", title: "Bincangkan bahagian dalaman", text: "Nyatakan kesan kotoran, bau atau permukaan yang memerlukan perhatian, termasuk tempat duduk, karpet dan kemasan kabin. Terangkan rawatan terdahulu dan tanya kaedah pembersihan yang sesuai dengan bahan tersebut. Sahkan skop kerja serta sama ada masa pengeringan mempengaruhi waktu pengambilan kereta." },
        { number: "03", title: "Sahkan janji temu", text: "Maklumkan model kereta dan kerja yang ingin dibincangkan. Sahkan sebut harga, masa penghantaran serta aturan pengambilan sebelum membuat tempahan. Tanya barang yang perlu dikeluarkan dari kabin dan cara menjaga permukaan yang telah dirawat selepas kunjungan anda." }
      ] },
      { type: "businessVisit", kicker: "Rancang kunjungan", title: "Cari Jon Detailing di Jalan TPK 2/8.", text: "Premis detailing terletak di No. 71. Telefon Jon Detailing atau layari halaman Facebook rasminya untuk membincangkan keperluan kereta dan mengatur janji temu yang sesuai.", addressLabel: "Alamat TPK Park", address,
        contacts: [{ label: "Pertanyaan detailing", value: "+60 12 684 4034", url: "tel:+60126844034" }],
        note: "Sahkan waktu operasi, ketersediaan janji temu, kerja yang dipersetujui dan anggaran masa siap secara terus dengan Jon Detailing sebelum bertolak.", links: [
          { label: "Cari Jon Detailing di Google Maps", url: directions },
          { label: "Arah ke Jon Detailing melalui Waze", url: waze },
          { label: "Jon Detailing di Facebook", url: facebook }
        ]
      }
    ],
    cta: { title: "Bincangkan keperluan detailing kereta anda.", text: "Telefon Jon Detailing dengan butiran kenderaan dan bahagian yang ingin dinilai oleh pasukan.", button: "Telefon Jon Detailing", url: "tel:+60126844034" }
  },
  zh: {
    parentRoute: "automotive",
    eyebrow: "Jon Detailing · 汽车内外美容护理",
    title: "TPK Park里的Jon Detailing。",
    description: "Jon Detailing位于蒲种Jalan TPK 2/8的71号。查看联系电话、导航与到访建议，咨询汽车内饰及外观美容护理。",
    lead: "Jon Detailing专注于汽车内饰与外观护理，位于Jalan TPK 2/8的71号。作为TPK Park汽车服务集群的一部分，可供车主咨询车辆状况并预约汽车美容护理。",
    image, heroImage: image,
    heroAlt: "Jon Detailing官方照片中的一辆红色跑车，现场人员正在进行车辆护理",
    business: jonDetailingBusiness, datePublished: "2026-09-16",
    blocks: [
      { type: "split", presentation: "renewal", title: "从车内到车外，规划合适的护理。", text: "预约汽车美容前，可先想想希望改善哪些地方：漆面外观、车厢状况，或整辆车的整洁程度。说明需要处理的部位，以及车辆之前做过哪些表面护理。Jon Detailing团队可与你讨论关注重点及适合车辆的处理方式，再确认预约安排。", image, alt: "Jon Detailing现场，两人正在照料一辆车门打开的红色跑车", caption: "Jon Detailing官方照片中的车辆护理现场。图片来源：", captionSource: imageSource, route: "automotive", linkLabel: "查看汽车服务" },
      { type: "cards", alignHeadings: true, kicker: "到访之前", title: "为汽车美容预约做好准备。", items: [
        { number: "01", title: "先检查车辆外观", text: "指出漆面暗哑、水渍或明显刮痕，并告知团队车辆是否做过镀膜、贴膜或近期喷漆。请团队评估表面状况，说明可以合理改善到什么程度、建议采用的处理方式，以及报价包含哪些项目。" },
        { number: "02", title: "说明内饰护理需求", text: "说明座椅、地毯及内饰饰板等部位的污渍、异味或其他需要处理的问题。告知以往做过的护理，并询问适合相关材质的清洁方式。确认具体工作范围，以及干燥时间是否会影响取车安排。" },
        { number: "03", title: "确认预约与交车", text: "提供车型及希望咨询的项目。预约前确认报价、送车时间与预计取车安排。询问需要提前取出哪些车内物品，以及完成护理后应如何清洁和保养经过处理的表面。" }
      ] },
      { type: "businessVisit", kicker: "到访安排", title: "在Jalan TPK 2/8找到Jon Detailing。", text: "汽车美容店位于71号。请致电Jon Detailing或浏览其官方Facebook页面，说明车辆需求并安排合适的预约。", addressLabel: "TPK Park店址", address,
        contacts: [{ label: "汽车美容咨询", value: "+60 12 684 4034", url: "tel:+60126844034" }],
        note: "出发前请直接向Jon Detailing确认营业时间、预约空档、已商定的项目及预计完工时间。", links: [
          { label: "在Google Maps查找Jon Detailing", url: directions },
          { label: "通过Waze导航至Jon Detailing", url: waze },
          { label: "Jon Detailing官方Facebook", url: facebook }
        ]
      }
    ],
    cta: { title: "咨询爱车的美容护理需求。", text: "致电Jon Detailing，提供车辆资料，并说明希望团队评估的部位。", button: "致电Jon Detailing", url: "tel:+60126844034" }
  }
};
