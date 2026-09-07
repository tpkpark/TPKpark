// Direct delivery stays disabled until the owner approves FormSubmit, the inbox
// is activated, and a clearly labelled delivery test is verified in that inbox.
// The activated form action is a public endpoint, never an email/API secret.
export const formSubmitEndpoint = "";

export function deliveryConfig(endpoint = formSubmitEndpoint) {
  if (!endpoint) return { mode: "email", action: "mailto:info@tpkpark.com", ajax: "" };
  const url = new URL(endpoint);
  if (url.origin !== "https://formsubmit.co" || !/^\/[a-zA-Z0-9@._-]+$/.test(url.pathname) || url.search || url.hash || url.username || url.password) {
    throw new Error("Use the verified FormSubmit form action URL.");
  }
  return { mode: "formsubmit", action: url.href, ajax: `https://formsubmit.co/ajax${url.pathname}` };
}

export const enquiryCopy = {
  en: {
    viewing: "Arrange a viewing", purpose: "How can we help?", information: "Availability & information", viewingOption: "Arrange a viewing",
    floor: "Preferred shop floor", floorAny: "Open to options", ground: "Ground floor", first: "First floor", both: "Both floors, if available",
    hint: "Tell us your business type, preferred size, budget and intended start date. For a viewing, suggest a convenient day or time.",
    send: "Send enquiry", sending: "Sending…", success: "Thank you. Your enquiry has been submitted to the TPK Park team. A viewing is confirmed only when the team agrees a time with you.",
    error: "We could not confirm that your enquiry was sent. Your details are still here. Please try again, or call +60 3 8076 5200 / email info@tpkpark.com.",
    draftReady: "Your email draft is ready. Please send it from your email application to complete the enquiry.",
    privacy: "We use the details you provide to respond to your enquiry and arrange a viewing. FormSubmit processes the submission and retains a copy for up to 30 days.",
    privacyLink: "Form delivery privacy", honeypot: "Leave this field empty",
    overviewKicker: "Rental guide", overviewTitle: "Choose your floor or building", overviewText: "Reference asking rents from the September 2026 leasing packs. Tell us the floor or building you need so the team can confirm current availability.",
    groundTitle: "Ground-floor shop / showroom", groundText: "Street-level space along Jalan TPK 2/8 for customer-facing retail, showrooms and suitable services.",
    firstTitle: "First-floor shop space", firstText: "An upper-floor option for suitable office, display or appointment-based uses. Confirm access and the exact floor area.",
    detachedTitle: "No. 7 · Detached building", detachedText: "Approximately 10,965 sq ft built-up, with a private compound at Jalan TPK 2/4.",
    groundRent: "RM8,300 / month", firstRent: "RM3,600 / month", detachedRent: "RM58,000 / month", rentLabel: "Indicative asking rent",
    status: "Confirm current unit and availability", detachedStatus: "Availability by arrangement", details: "See property details", enquire: "Check availability",
    overviewNote: "Shop rents refer to a standard intermediate unit and are quoted separately by floor. Exact unit, floor area, availability and terms must be confirmed. No. 69 is already leased.",
    shopTitle: "Ground floor or first floor?", shopText: "Select the floor that suits your business. Combining both floors is subject to availability and a separate quotation."
  },
  ms: {
    viewing: "Atur lawatan", purpose: "Bagaimanakah kami boleh membantu?", information: "Ketersediaan & maklumat", viewingOption: "Atur lawatan",
    floor: "Tingkat kedai pilihan", floorAny: "Terbuka kepada pilihan", ground: "Tingkat bawah", first: "Tingkat satu", both: "Kedua-dua tingkat, jika tersedia",
    hint: "Nyatakan jenis perniagaan, keluasan pilihan, bajet dan tarikh mula yang dirancang. Untuk lawatan, cadangkan hari atau masa yang sesuai.",
    send: "Hantar pertanyaan", sending: "Sedang menghantar…", success: "Terima kasih. Pertanyaan anda telah dihantar kepada pasukan TPK Park. Lawatan hanya disahkan selepas pasukan bersetuju tentang masanya dengan anda.",
    error: "Kami tidak dapat mengesahkan penghantaran pertanyaan anda. Maklumat anda masih di sini. Cuba lagi, atau hubungi +60 3 8076 5200 / e-mel info@tpkpark.com.",
    draftReady: "Draf e-mel anda sudah tersedia. Sila hantarnya melalui aplikasi e-mel anda untuk melengkapkan pertanyaan.",
    privacy: "Kami menggunakan maklumat anda untuk menjawab pertanyaan dan mengatur lawatan. FormSubmit memproses penghantaran dan menyimpan salinan sehingga 30 hari.",
    privacyLink: "Privasi penghantaran borang", honeypot: "Biarkan ruangan ini kosong",
    overviewKicker: "Panduan sewa", overviewTitle: "Pilih tingkat atau bangunan anda", overviewText: "Sewa diminta sebagai rujukan daripada pek penyewaan September 2026. Nyatakan tingkat atau bangunan yang diperlukan supaya pasukan dapat mengesahkan ketersediaan semasa.",
    groundTitle: "Kedai / bilik pameran tingkat bawah", groundText: "Ruang aras jalan di Jalan TPK 2/8 untuk runcit, bilik pameran dan perkhidmatan berhadapan pelanggan yang sesuai.",
    firstTitle: "Ruang kedai tingkat satu", firstText: "Pilihan tingkat atas untuk pejabat, paparan atau kegunaan berasaskan janji temu yang sesuai. Sahkan akses dan keluasan sebenar tingkat.",
    detachedTitle: "No. 7 · Bangunan sesebuah", detachedText: "Keluasan binaan kira-kira 10,965 kaki persegi, dengan kawasan persendirian di Jalan TPK 2/4.",
    groundRent: "RM8,300 / bulan", firstRent: "RM3,600 / bulan", detachedRent: "RM58,000 / bulan", rentLabel: "Sewa diminta indikatif",
    status: "Sahkan unit dan ketersediaan semasa", detachedStatus: "Ketersediaan mengikut aturan", details: "Lihat butiran hartanah", enquire: "Semak ketersediaan",
    overviewNote: "Sewa kedai merujuk kepada unit tengah standard dan dinyatakan berasingan mengikut tingkat. Unit, keluasan tingkat, ketersediaan dan terma sebenar perlu disahkan. No. 69 telah disewa.",
    shopTitle: "Tingkat bawah atau tingkat satu?", shopText: "Pilih tingkat yang sesuai untuk perniagaan anda. Gabungan kedua-dua tingkat tertakluk kepada ketersediaan dan sebut harga berasingan."
  },
  zh: {
    viewing: "预约看单位", purpose: "您希望如何进一步了解？", information: "查询供应与资料", viewingOption: "预约看单位",
    floor: "商铺楼层偏好", floorAny: "可考虑不同选择", ground: "底层", first: "一楼", both: "两层，视供应而定",
    hint: "请说明业务类型、所需面积、预算及预计开始租用日期。如希望看单位，请提供方便的日期或时间。",
    send: "发送查询", sending: "发送中…", success: "谢谢，您的查询已提交给TPK Park团队。看单位的时间须待团队与您确认后方可落实。",
    error: "暂时无法确认查询是否已发送。您填写的资料仍保留在此页面。请重试，或致电+60 3 8076 5200／电邮info@tpkpark.com。",
    draftReady: "电邮草稿已准备好。请在您的电子邮件应用中发送，以完成查询。",
    privacy: "我们使用您提供的资料回复查询及安排看单位。FormSubmit处理提交内容，并保留副本最多30天。",
    privacyLink: "表格传送隐私说明", honeypot: "请将此栏留空",
    overviewKicker: "租金参考", overviewTitle: "选择合适的楼层或建筑", overviewText: "以下叫租取自2026年9月租赁资料包，仅供参考。请说明所需楼层或建筑，团队将为您确认当前供应。",
    groundTitle: "底层商铺／展厅", groundText: "位于Jalan TPK 2/8的临街空间，适合面向顾客的零售、展厅及相关服务。",
    firstTitle: "一楼商铺空间", firstText: "可供合适的办公室、展示或预约式业务考虑。请确认出入条件及实际楼层面积。",
    detachedTitle: "7号 · 独立式建筑", detachedText: "位于Jalan TPK 2/4，建筑面积约10,965平方英尺，并设独立范围。",
    groundRent: "每月RM8,300", firstRent: "每月RM3,600", detachedRent: "每月RM58,000", rentLabel: "参考叫租",
    status: "请确认具体单位及当前供应", detachedStatus: "供应须另行安排确认", details: "查看物业资料", enquire: "查询供应",
    overviewNote: "商铺叫租以标准中间单位为参考，并按楼层分别列出。具体单位、楼层面积、供应及条款均须确认。69号单位已出租。",
    shopTitle: "选择底层还是一楼？", shopText: "按业务需求选择楼层。如希望租用两层，须另行确认供应及报价。"
  }
};
