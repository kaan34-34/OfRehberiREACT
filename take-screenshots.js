const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const BASE = 'http://localhost:5173';
const OUT = path.join(__dirname, 'screenshots');

const pages = [
  { name: '01-anasayfa', url: '/', width: 1280, height: 900 },
  { name: '02-anasayfa-mobil', url: '/', width: 390, height: 844 },
  { name: '03-top10', url: '/top10', width: 1280, height: 900 },
  { name: '04-firma-detay', url: '/company/pide-house-of', width: 1280, height: 900 },
  { name: '05-firma-detay-mobil', url: '/company/karadeniz-kebap', width: 390, height: 844 },
  { name: '06-bize-ulasin', url: '/bize-ulasin', width: 1280, height: 900 },
];

(async () => {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

  const browser = await puppeteer.launch({ headless: 'new' });

  for (const pg of pages) {
    const page = await browser.newPage();
    await page.setViewport({ width: pg.width, height: pg.height });
    await page.goto(`${BASE}${pg.url}`, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({
      path: path.join(OUT, `${pg.name}.png`),
      fullPage: true,
    });
    console.log(`✓ ${pg.name}.png`);
    await page.close();
  }

  await browser.close();
  console.log('Tüm ekran görüntüleri alındı!');
})();
