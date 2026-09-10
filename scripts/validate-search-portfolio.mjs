import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import test from "node:test";
import { localeConfig, routePath, seoTitles } from "./site-data.mjs";

const root = process.cwd();

function outputFile(locale, routeId) {
  const path = routePath(locale, routeId);
  return path === "/" ? join(root, "index.html") : join(root, path.slice(1), "index.html");
}

async function generatedPage(locale, routeId) {
  return readFile(outputFile(locale, routeId), "utf8");
}

const expectations = {
  en: {
    brand: { title: ["TPK Park", "Kinrara Industrial Park"], body: ["Taman Perindustrian Kinrara", "Home &amp; Living", "Automotive", "Lifestyle"] },
    profile: { title: ["Wong Shung Yen", "TPK Park"], body: ["Managing Director, TPK Park", "Selected media and public record"] },
    leasing: { title: ["Rent", "Puchong", "TPK Park"], body: ["Commercial &amp; Industrial Property for Rent in Puchong", "Jalan TPK 2/8", "Jalan TPK 2/4"] }
  },
  ms: {
    brand: { title: ["TPK Park", "Taman Perindustrian Kinrara"], body: ["Taman Perindustrian Kinrara", "Home &amp; Living", "Automotif", "Lifestyle"] },
    profile: { title: ["Wong Shung Yen", "TPK Park"], body: ["Pengarah Urusan, TPK Park", "Pilihan media dan rekod awam"] },
    leasing: { title: ["Disewa", "Puchong", "TPK Park"], body: ["Komersial &amp; Perindustrian", "Jalan TPK 2/8", "Jalan TPK 2/4"] }
  },
  zh: {
    brand: { title: ["TPK Park", "蒲种金銮工业园"], body: ["Taman Perindustrian Kinrara", "家居生活", "汽车服务", "生活品味"] },
    profile: { title: ["黄松延", "Wong Shung Yen", "TPK Park"], body: ["TPK Park（金銮工业园）董事经理", "精选媒体与公开记录"] },
    leasing: { title: ["出租", "蒲种", "TPK Park"], body: ["蒲种商业与工业单位出租", "Jalan TPK 2/8", "Jalan TPK 2/4"] }
  }
};

test("brand pages retain brand and place ownership without becoming leasing landing pages", async () => {
  for (const locale of Object.keys(localeConfig)) {
    const expected = expectations[locale].brand;
    const html = await generatedPage(locale, "home");
    for (const term of expected.title) assert.ok(seoTitles[locale].home.includes(term), `${locale} home title lost ${term}`);
    for (const term of expected.body) assert.ok(html.includes(term), `${locale} home page lost ${term}`);
    assert.doesNotMatch(seoTitles[locale].home, /for rent|disewa|出租/i, `${locale} home title became leasing-led`);
    assert.ok(html.includes(`href="${routePath(locale, "leasing")}"`), `${locale} home page lost its additive leasing path`);
  }
});

test("personal-profile visibility remains a distinct, indexable search track", async () => {
  for (const locale of Object.keys(localeConfig)) {
    const expected = expectations[locale].profile;
    const html = await generatedPage(locale, "profile");
    for (const term of expected.title) assert.ok(seoTitles[locale].profile.includes(term), `${locale} profile title lost ${term}`);
    for (const term of expected.body) assert.ok(html.includes(term), `${locale} profile page lost ${term}`);
    assert.ok(html.includes(`href="${routePath(locale, "publicRecord")}"`), `${locale} profile page lost its public-record path`);
    assert.doesNotMatch(seoTitles[locale].profile, /for rent|disewa|出租/i, `${locale} profile title became leasing-led`);
  }
});

test("leasing pages add high-intent Puchong property visibility without replacing other tracks", async () => {
  for (const locale of Object.keys(localeConfig)) {
    const expected = expectations[locale].leasing;
    const html = await generatedPage(locale, "leasing");
    for (const term of expected.title) assert.ok(seoTitles[locale].leasing.includes(term), `${locale} leasing title lost ${term}`);
    for (const term of expected.body) assert.ok(html.includes(term), `${locale} leasing page lost ${term}`);
    for (const routeId of ["leasingShop", "leasingDetached", "leasingSemiDetached"]) {
      assert.ok(html.includes(`href="${routePath(locale, routeId)}"`), `${locale} leasing hub lost ${routeId}`);
    }
  }
});
