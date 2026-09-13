import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();

const pages = {
  en: {
    jade: "/wong-shung-yen/jade-exhibition-2024/",
    profile: "/wong-shung-yen/",
    record: "/wong-shung-yen/public-record/",
    title: "Wong Shung Yen | 2024 National Art Gallery Jade Co-Curator",
    description: "Explore the 2024 National Art Gallery jade exhibition, co-curated by Wong Shung Yen, with exhibition details, media coverage and catalogue information.",
    replacements: [
      ["Dato’ Wong Shung Yen co-curated the National Art Gallery exhibition with Dr Low Cheong Sin for the Malaysian Chinese Cultural Society", "Dato’ Wong Shung Yen co-curated the National Art Gallery exhibition for the Malaysian Chinese Cultural Society"],
      ["Wong Shung Yen served as co-curator, together with Dr Low Cheong Sin, of a month-long National Art Gallery exhibition", "Wong Shung Yen served as co-curator of a month-long National Art Gallery exhibition"],
      ["The National Art Gallery/MOTAC names Wong as Curator and Special Advisor to the Malaysian Chinese Cultural Society; The Star describes Wong and Dr Low Cheong Sin as co-curators.", "The National Art Gallery/MOTAC names Wong as Curator and Special Advisor to the Malaysian Chinese Cultural Society; The Star independently identifies him as a co-curator."],
      ["The official release explicitly names Dato’ Wong Shung Yen as Curator and Special Advisor for the Malaysian Chinese Cultural Society, alongside Dr Low Cheong Sin as Curator.", "The official release explicitly names Dato’ Wong Shung Yen as Curator and Special Advisor for the Malaysian Chinese Cultural Society."],
      ["The organiser specifically thanks Wong and Dr Low Cheong Sin for their work participating in the exhibition’s curation.", "The organiser specifically thanks Wong for his work participating in the exhibition’s curation."],
      ["The Star explicitly describes the exhibition as co-curated by special advisor Datuk Wong Shung Yen and Dr Low Cheong Sin.", "The Star explicitly identifies special advisor Datuk Wong Shung Yen as a co-curator of the exhibition."],
      ["Oriental Daily states that curators Dato’ Wong Shung Yen and Dr Low Cheong Sin jointly planned the exhibition and reports 113 jade works.", "Oriental Daily identifies Dato’ Wong Shung Yen as a curator involved in jointly planning the exhibition and reports 113 jade works."],
      ["Kwong Wah states that Dato’ Wong Shung Yen and Dr Low Cheong Sin jointly curated/planned the exhibition and reports 113 works.", "Kwong Wah identifies Dato’ Wong Shung Yen as a curator involved in jointly planning the exhibition and reports 113 works."],
      ["MalaysiaGazette identifies Wong as curator and adviser to the Malaysian Chinese Cultural Society, alongside Dr Low as curator.", "MalaysiaGazette identifies Wong as curator and adviser to the Malaysian Chinese Cultural Society."],
    ],
  },
  ms: {
    jade: "/ms/wong-shung-yen/jade-exhibition-2024/",
    profile: "/ms/wong-shung-yen/",
    record: "/ms/wong-shung-yen/public-record/",
    title: "Wong Shung Yen | Kurator Bersama Pameran Jed 2024",
    description: "Kenali pameran jed Balai Seni Negara 2024 dengan Wong Shung Yen sebagai kurator bersama, termasuk butiran pameran, liputan media dan maklumat katalog.",
    replacements: [
      ["Dato’ Wong Shung Yen menjadi kurator bersama pameran Balai Seni Negara dengan Dr Low Cheong Sin bagi Pertubuhan Kebudayaan Cina Malaysia", "Dato’ Wong Shung Yen menjadi kurator bersama pameran Balai Seni Negara bagi Pertubuhan Kebudayaan Cina Malaysia"],
      ["Wong Shung Yen menjadi kurator bersama Dr Low Cheong Sin bagi pameran jed purba selama sebulan", "Wong Shung Yen menjadi kurator bersama bagi pameran jed purba selama sebulan"],
      ["Balai Seni Negara/MOTAC menamakan Wong sebagai Kurator dan Penasihat Pertubuhan Kebudayaan Cina Malaysia; The Star menyifatkan Wong dan Dr Low Cheong Sin sebagai kurator bersama.", "Balai Seni Negara/MOTAC menamakan Wong sebagai Kurator dan Penasihat Pertubuhan Kebudayaan Cina Malaysia; The Star secara bebas mengenal pasti beliau sebagai kurator bersama."],
      ["Siaran rasmi menamakan Dato’ Wong Shung Yen secara jelas sebagai Kurator dan Penasihat Pertubuhan Kebudayaan Cina Malaysia, bersama Dr Low Cheong Sin sebagai Kurator.", "Siaran rasmi menamakan Dato’ Wong Shung Yen secara jelas sebagai Kurator dan Penasihat Pertubuhan Kebudayaan Cina Malaysia."],
      ["Penganjur secara khusus berterima kasih kepada Wong dan Dr Low Cheong Sin atas usaha mereka dalam kerja kuratorial pameran.", "Penganjur secara khusus berterima kasih kepada Wong atas usaha beliau dalam kerja kuratorial pameran."],
      ["The Star secara jelas menyifatkan pameran ini sebagai dikurasi bersama oleh penasihat khas Datuk Wong Shung Yen dan Dr Low Cheong Sin.", "The Star secara jelas mengenal pasti penasihat khas Datuk Wong Shung Yen sebagai kurator bersama pameran."],
      ["Oriental Daily menyatakan kurator Dato’ Wong Shung Yen dan Dr Low Cheong Sin merancang pameran bersama serta melaporkan 113 karya jed.", "Oriental Daily mengenal pasti Dato’ Wong Shung Yen sebagai kurator yang terlibat dalam perancangan bersama pameran serta melaporkan 113 karya jed."],
      ["Kwong Wah menyatakan Dato’ Wong Shung Yen dan Dr Low Cheong Sin bersama-sama mengkurasi/merancang pameran serta melaporkan 113 karya.", "Kwong Wah mengenal pasti Dato’ Wong Shung Yen sebagai kurator yang terlibat dalam perancangan bersama pameran serta melaporkan 113 karya."],
      ["MalaysiaGazette mengenal pasti Wong sebagai kurator dan penasihat Pertubuhan Kebudayaan Cina Malaysia, bersama Dr Low sebagai kurator.", "MalaysiaGazette mengenal pasti Wong sebagai kurator dan penasihat Pertubuhan Kebudayaan Cina Malaysia."],
    ],
  },
  zh: {
    jade: "/zh/wong-shung-yen/jade-exhibition-2024/",
    profile: "/zh/wong-shung-yen/",
    record: "/zh/wong-shung-yen/public-record/",
    title: "黄松延｜2024国家美术馆《璀璨千年》古玉展联合策展人",
    description: "了解黄松延担任联合策展人的2024年国家美术馆《璀璨千年》古玉展，包括展览背景、媒体报道、学术支持及展览图录。",
    replacements: [
      ["拿督黄松延与刘创新博士共同策展，由马来西亚华人文化协会", "拿督黄松延担任联合策展人，由马来西亚华人文化协会"],
      ["2024年，黄松延与刘创新博士共同策划国家美术馆为期一个月的古玉展。", "2024年，黄松延担任联合策展人，参与策划国家美术馆为期一个月的古玉展。"],
      ["国家美术馆／旅游、艺术及文化部列黄松延为策展人及马来西亚华人文化协会特别顾问；《星报》则明确称黄松延与刘创新博士为联合策展人。", "国家美术馆／旅游、艺术及文化部列黄松延为策展人及马来西亚华人文化协会特别顾问；《星报》亦明确记录其联合策展人身份。"],
      ["官方文告明确列拿督黄松延为策展人及马来西亚华人文化协会特别顾问，并列刘创新博士为策展人。", "官方文告明确列拿督黄松延为策展人及马来西亚华人文化协会特别顾问。"],
      ["主办方马来西亚华人文化协会特别感谢黄松延及刘创新博士参与策展工作。", "主办方马来西亚华人文化协会特别感谢黄松延参与策展工作。"],
      ["《星报》明确报道展览由特别顾问拿督黄松延及刘创新博士共同策展。", "《星报》明确记录特别顾问拿督黄松延担任联合策展人。"],
      ["《东方日报》明确写道“展览由策展人拿督黄松延和刘创新博士共同策划”，并报道展出113件玉雕。", "《东方日报》明确记录拿督黄松延以策展人身份参与共同策划，并报道展出113件玉雕。"],
      ["《光华日报》报道展览由策展人拿督黄松延和刘创新博士共同策划，并记录113件玉雕。", "《光华日报》记录拿督黄松延以策展人身份参与共同策划，并记录113件玉雕。"],
      ["MalaysiaGazette马来文报道列黄松延为策展人及马来西亚华人文化协会顾问，并列刘创新博士为策展人。", "MalaysiaGazette马来文报道列黄松延为策展人及马来西亚华人文化协会顾问。"],
    ],
  },
};

function fileFor(pathname) {
  return join(root, pathname.slice(1), "index.html");
}

function refineMeta(html, config) {
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${config.title}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${config.description}">`);
  html = html.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${config.title}">`);
  html = html.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${config.description}">`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${config.title}">`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${config.description}">`);
  return html;
}

function removeVisibleCoCuratorName(html, config) {
  for (const [from, to] of config.replacements) html = html.replaceAll(from, to);
  return html;
}

function giveBrandLogosAltText(html) {
  return html.replace(/(<img class="brand-logo(?: brand-logo-reverse)?"[^>]*?)alt=""/g, '$1alt="TPK Park"');
}

for (const config of Object.values(pages)) {
  for (const pathname of [config.profile, config.record]) {
    const file = fileFor(pathname);
    let html = await readFile(file, "utf8");
    html = removeVisibleCoCuratorName(html, config);
    await writeFile(file, html, "utf8");
  }

  const jadeFile = fileFor(config.jade);
  let jade = await readFile(jadeFile, "utf8");
  jade = refineMeta(jade, config);
  jade = removeVisibleCoCuratorName(jade, config);
  jade = giveBrandLogosAltText(jade);
  await writeFile(jadeFile, jade, "utf8");
}

console.log("Refined jade exhibition visible copy, metadata and Chinese context.");
