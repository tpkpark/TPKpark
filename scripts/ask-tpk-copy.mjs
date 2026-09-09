export const askTpkCopy = {
  en: {
    label: "Ask TPK Park", close: "Close Ask TPK Park", intro: "How can we help?",
    leasing: "Find premises", leasingText: "Explore shops, showrooms and leasing information.",
    businesses: "Find a business", businessesText: "Browse the businesses at TPK Park.",
    visit: "Plan a visit", visitText: "Find our location, office hours and contact details.",
    contact: "Email the TPK Park team",
    aiLabel: "AI assistant", aiIntro: "Tell me what you’re looking for. I can help with premises, businesses and visits.",
    input: "Your question", placeholder: "Ask about TPK Park…", send: "Send", clear: "New chat",
    you: "You", thinking: "Looking at TPK Park’s information…", sources: "Related pages",
    error: "I couldn’t answer just now. Please try again or contact the team below.",
    busy: "The assistant is busy. Please try again in a minute or contact the team.",
    disclaimer: "AI answers may be inaccurate. Confirm availability and leasing details with our team.",
    privacyTitle: "About this assistant",
    privacy: "Sending a question shares this conversation with OpenAI through Vercel to generate an answer. Please leave out personal or confidential details. The site keeps the chat only while this page is open and does not send its text to analytics. Providers may retain service data under their policies. This chat does not send an enquiry or book a viewing.",
    team: "Contact the team", browse: "Browse leasing",
    starters: ["What can I rent here?", "Help me find a business", "How do I arrange a viewing?"]
  },
  ms: {
    label: "Tanya TPK Park", close: "Tutup Tanya TPK Park", intro: "Bagaimanakah kami boleh membantu?",
    leasing: "Cari premis", leasingText: "Terokai kedai, bilik pameran dan maklumat penyewaan.",
    businesses: "Cari perniagaan", businessesText: "Lihat perniagaan di TPK Park.",
    visit: "Rancang kunjungan", visitText: "Dapatkan lokasi, waktu pejabat dan maklumat hubungan kami.",
    contact: "E-mel pasukan TPK Park",
    aiLabel: "Pembantu AI", aiIntro: "Beritahu apa yang anda cari. Saya boleh membantu dengan premis, perniagaan dan kunjungan.",
    input: "Soalan anda", placeholder: "Tanya tentang TPK Park…", send: "Hantar", clear: "Sembang baharu",
    you: "Anda", thinking: "Menyemak maklumat TPK Park…", sources: "Halaman berkaitan",
    error: "Saya tidak dapat menjawab sekarang. Cuba lagi atau hubungi pasukan di bawah.",
    busy: "Pembantu sedang sibuk. Cuba lagi sebentar nanti atau hubungi pasukan kami.",
    disclaimer: "Jawapan AI mungkin tidak tepat. Sahkan ketersediaan dan butiran penyewaan dengan pasukan kami.",
    privacyTitle: "Tentang pembantu ini",
    privacy: "Menghantar soalan berkongsi perbualan ini dengan OpenAI melalui Vercel untuk menghasilkan jawapan. Elakkan maklumat peribadi atau sulit. Laman ini menyimpan sembang hanya selagi halaman ini dibuka dan tidak menghantar teksnya kepada analitik. Penyedia mungkin menyimpan data perkhidmatan mengikut dasar mereka. Sembang ini tidak menghantar pertanyaan atau menempah lawatan.",
    team: "Hubungi pasukan", browse: "Lihat penyewaan",
    starters: ["Apakah premis yang boleh disewa?", "Bantu saya mencari perniagaan", "Bagaimana mengatur lawatan tapak?"]
  },
  zh: {
    label: "咨询 TPK Park", close: "关闭咨询 TPK Park", intro: "您想了解什么？",
    leasing: "寻找商用空间", leasingText: "了解商铺、展厅及租赁资料。",
    businesses: "寻找商家", businessesText: "浏览TPK Park的商家与服务。",
    visit: "计划到访", visitText: "查看地点、办公时间及联系方式。",
    contact: "电邮联系TPK Park团队",
    aiLabel: "AI助手", aiIntro: "告诉我您在寻找什么。我可以协助您了解商用空间、商家及到访安排。",
    input: "您的问题", placeholder: "询问有关TPK Park的问题…", send: "发送", clear: "新对话",
    you: "您", thinking: "正在查阅TPK Park的资料…", sources: "相关页面",
    error: "暂时无法回答。请重试，或通过下方链接联系团队。",
    busy: "助手目前较忙。请稍后重试，或联系我们的团队。",
    disclaimer: "AI回答可能不准确。请向团队确认当前供应及租赁详情。",
    privacyTitle: "关于此助手",
    privacy: "发送问题会通过Vercel将本次对话分享给OpenAI以生成回答。请勿提供个人或机密资料。网站仅在此页面打开期间保留对话，不会将对话内容发送至分析工具。服务提供商可能按其政策保留服务数据。此对话不会发送咨询邮件或确认看房预约。",
    team: "联系团队", browse: "浏览租赁信息",
    starters: ["这里有什么商用空间可以租？", "帮我寻找商家", "如何安排看单位？"]
  }
};

const upgradeCopy = {
  en: {
    language: "Answer language", auto: "Auto", call: "Call the office", email: "Email the team", brochure: "Brochure (PDF)", details: "Property details", rentLabel: "Indicative asking rent", areaLabel: "Published area", builtUpLabel: "Built-up area", landAreaLabel: "Land / lot area",
    memory: "Keeps the last few replies in this tab for up to 90 minutes. New chat clears them.",
    retry: "Please try again after {time}. You can still browse properties, call or email below.",
    draftPrompt: "Help me draft an email enquiry using the requirements I have shared.", draftButton: "Draft an enquiry", draftTitle: "Review your email draft", draftLabel: "Email draft — edit before opening your email app", draftNote: "Check and edit this draft. You send it from your email app; no enquiry or viewing is confirmed here.", openEmail: "Open in email app", emailSubject: "TPK Park leasing enquiry", emailGreeting: "Hello TPK Park team,", emailIntro: "I would like to enquire about suitable premises at TPK Park.", emailConfirm: "Please confirm suitable options, current availability, the exact floor area, indicative rent and any requirements for my proposed use. Any viewing time is a request for your confirmation.", emailThanks: "Thank you.",
    fields: { businessType: "Business type", budget: "Budget", size: "Preferred size", floor: "Floor preference", timing: "Timing / viewing request" },
    privacy: "Sending a question shares this conversation with OpenAI through Vercel to generate an answer. Please leave out personal or confidential details. The site keeps up to three completed exchanges in this tab’s session storage for up to 90 minutes, across pages. New chat clears them; closing the tab normally clears session storage. The site does not retain transcripts on its server or send chat text or draft contents to analytics. Usage protection stores temporary counters and a rotating network hash. Providers may retain service data under their policies. Email drafts are for you to review and send; this chat cannot send an enquiry or confirm a viewing."
  },
  ms: {
    language: "Bahasa jawapan", auto: "Auto", call: "Telefon pejabat", email: "E-mel pasukan", brochure: "Risalah (PDF)", details: "Butiran hartanah", rentLabel: "Sewa diminta indikatif", areaLabel: "Keluasan yang diterbitkan", builtUpLabel: "Keluasan binaan", landAreaLabel: "Keluasan tanah / lot",
    memory: "Beberapa balasan terakhir disimpan dalam tab ini sehingga 90 minit. Sembang baharu memadamkannya.",
    retry: "Cuba lagi selepas {time}. Anda masih boleh melihat hartanah, menelefon atau menghantar e-mel di bawah.",
    draftPrompt: "Bantu saya menyediakan draf e-mel pertanyaan berdasarkan keperluan yang telah saya kongsikan.", draftButton: "Draf pertanyaan", draftTitle: "Semak draf e-mel anda", draftLabel: "Draf e-mel — sunting sebelum membuka aplikasi e-mel", draftNote: "Semak dan sunting draf ini. Anda menghantarnya melalui aplikasi e-mel; tiada pertanyaan atau lawatan disahkan di sini.", openEmail: "Buka dalam aplikasi e-mel", emailSubject: "Pertanyaan penyewaan TPK Park", emailGreeting: "Salam pasukan TPK Park,", emailIntro: "Saya ingin bertanya tentang premis yang sesuai di TPK Park.", emailConfirm: "Sila sahkan pilihan yang sesuai, ketersediaan semasa, keluasan tingkat sebenar, sewa indikatif dan syarat bagi kegunaan yang dicadangkan. Masa lawatan hanyalah permintaan untuk pengesahan anda.", emailThanks: "Terima kasih.",
    fields: { businessType: "Jenis perniagaan", budget: "Bajet", size: "Keluasan pilihan", floor: "Tingkat pilihan", timing: "Masa / permintaan lawatan" },
    privacy: "Menghantar soalan berkongsi perbualan ini dengan OpenAI melalui Vercel untuk menghasilkan jawapan. Elakkan maklumat peribadi atau sulit. Laman menyimpan sehingga tiga pertukaran lengkap dalam storan sesi tab ini sehingga 90 minit, merentasi halaman. Sembang baharu memadamkannya; menutup tab biasanya mengosongkan storan sesi. Laman tidak menyimpan transkrip pada pelayannya atau menghantar teks sembang atau draf kepada analitik. Perlindungan penggunaan menyimpan kiraan sementara dan hash rangkaian yang berputar. Penyedia mungkin menyimpan data perkhidmatan mengikut dasar mereka. Anda perlu menyemak dan menghantar draf e-mel sendiri; sembang ini tidak menghantar pertanyaan atau mengesahkan lawatan."
  },
  zh: {
    language: "回答语言", auto: "自动", call: "致电办公室", email: "电邮团队", brochure: "资料包（PDF）", details: "物业详情", rentLabel: "参考叫租", areaLabel: "已公布面积", builtUpLabel: "建筑面积", landAreaLabel: "土地／地段面积",
    memory: "本标签页保留最近几次对话，最长90分钟。点击“新对话”即可清除。",
    retry: "请在{time}之后重试。您仍可浏览物业，或通过下方电话及电邮联系团队。",
    draftPrompt: "请根据我已提供的需求，帮我准备一封电邮咨询草稿。", draftButton: "准备咨询草稿", draftTitle: "检查您的电邮草稿", draftLabel: "电邮草稿 — 打开电邮应用前可修改", draftNote: "请检查并修改此草稿。您须在电邮应用中自行发送；此处不会发送咨询或确认看房。", openEmail: "在电邮应用中打开", emailSubject: "TPK Park租赁咨询", emailGreeting: "TPK Park团队，您好：", emailIntro: "我想咨询TPK Park合适的商用空间。", emailConfirm: "请确认合适的选择、当前供应、实际楼层面积、参考租金及建议用途的相关要求。任何看房时间均为待您确认的请求。", emailThanks: "谢谢。",
    fields: { businessType: "业务类型", budget: "预算", size: "所需面积", floor: "楼层偏好", timing: "时间／看房请求" },
    privacy: "发送问题会通过Vercel将本次对话分享给OpenAI以生成回答。请勿提供个人或机密资料。网站在本标签页的会话存储中保留最多三轮完整对话，跨页面有效，最长90分钟。点击“新对话”可清除；关闭标签页通常会清除会话存储。网站服务器不保留对话记录，也不会将对话或草稿内容发送至分析工具。使用保护仅保存临时计数和定期更换的网络哈希。服务提供商可能按其政策保留服务数据。您须自行检查并发送电邮草稿；此对话不会发送咨询或确认看房预约。"
  }
};
for (const locale of Object.keys(askTpkCopy)) Object.assign(askTpkCopy[locale], upgradeCopy[locale]);

const contextualStarters = {
  en: {
    leasing: ["Which premises fit my business and budget?", "Compare ground-floor and first-floor shops", "Show me the current leasing brochures"],
    leasingShop: ["How much is each shop floor?", "What area does the 3,520 sq ft cover?", "Show me the shop brochure"],
    leasingDetached: ["What are the rent and dimensions of this building?", "Show me the No. 7 brochure", "What should I check before arranging a viewing?"],
    leasingSemiDetached: ["Is Unit 69 available?", "What other premises can I consider?", "How do I enquire about alternatives?"],
    businesses: ["Which businesses are in this category?", "How do I find this part of the park?", "Tell me about the Home & Living recognition"],
    profile: ["Tell me about Wong Shung Yen", "What is his property and legal background?", "Tell me about his jade exhibition and film work"],
    contact: ["What are the management office hours?", "What should I prepare for a leasing enquiry?", "Help me draft an email enquiry"],
    history: ["How has TPK Park developed?", "What does the Malaysia Book of Records recognition cover?", "Where can I read the published news?"]
  },
  ms: {
    leasing: ["Premis manakah sesuai dengan perniagaan dan bajet saya?", "Bandingkan kedai tingkat bawah dan tingkat satu", "Tunjukkan risalah penyewaan semasa"],
    leasingShop: ["Berapakah sewa setiap tingkat kedai?", "Apakah yang termasuk dalam 3,520 kaki persegi?", "Tunjukkan risalah kedai"],
    leasingDetached: ["Berapakah sewa dan keluasan bangunan ini?", "Tunjukkan risalah No. 7", "Apakah yang perlu disemak sebelum lawatan?"],
    leasingSemiDetached: ["Adakah Unit 69 tersedia?", "Apakah premis lain yang boleh dipertimbangkan?", "Bagaimana bertanya tentang pilihan lain?"],
    businesses: ["Apakah perniagaan dalam kategori ini?", "Bagaimana mencari bahagian taman ini?", "Ceritakan pengiktirafan Home & Living"],
    profile: ["Ceritakan tentang Wong Shung Yen", "Apakah latar belakang hartanah dan undang-undangnya?", "Ceritakan pameran jed dan penglibatan filemnya"],
    contact: ["Apakah waktu pejabat pengurusan?", "Apakah persediaan untuk pertanyaan penyewaan?", "Bantu saya menyediakan draf e-mel pertanyaan"],
    history: ["Bagaimana TPK Park berkembang?", "Apakah skop pengiktirafan Malaysia Book of Records?", "Di manakah berita yang diterbitkan?"]
  },
  zh: {
    leasing: ["哪些空间符合我的业务需求及预算？", "比较底层和一楼商铺", "查看当前租赁资料包"],
    leasingShop: ["商铺各楼层租金是多少？", "3,520平方英尺包括哪些楼层？", "查看商铺资料包"],
    leasingDetached: ["这栋建筑的租金和面积是多少？", "查看7号建筑资料包", "安排看房前需要确认什么？"],
    leasingSemiDetached: ["69号单位现在可租吗？", "还有哪些物业可以考虑？", "如何查询其他选择？"],
    businesses: ["这个类别有哪些商家？", "如何找到园区的这个部分？", "介绍家居生活集群的纪录认证"],
    profile: ["介绍一下黄松延 Wong Shung Yen", "他的房地产及法律背景是什么？", "介绍他的玉文化展览及电影工作"],
    contact: ["管理办公室的办公时间是什么？", "租赁咨询前要准备哪些资料？", "帮我准备一封电邮咨询草稿"],
    history: ["TPK Park如何发展至今？", "马来西亚纪录大全认证涵盖什么？", "在哪里查看已发布的新闻？"]
  }
};
export function starterQuestions(locale, routeId) {
  const group = ["homeLiving", "automotive", "lifestyle"].includes(routeId) ? "businesses" : ["profile", "publicRecord"].includes(routeId) ? "profile" : ["about", "news", "milestones"].includes(routeId) ? "history" : routeId;
  return contextualStarters[locale][group] || askTpkCopy[locale].starters;
}
