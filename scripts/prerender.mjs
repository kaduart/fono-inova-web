// Pré-renderiza rotas de conteúdo depois do `vite build`.
// Abre cada rota num Chromium headless, espera o React montar e grava o HTML pronto em dist/<rota>/index.html.
// Qualquer falha encerra com código 1 e BARRA o build (ver package.json: "postbuild").
// Uso local sem Chrome: SKIP_PRERENDER=1 npm run build   (nunca definir isso na Vercel)
import { createServer } from 'node:http';
import { existsSync, readFileSync, mkdirSync, writeFileSync, statSync } from 'node:fs';
import { join, extname, resolve } from 'node:path';

const DIST = resolve('dist');
const cfg = JSON.parse(readFileSync(resolve('scripts/prerender-routes.json'), 'utf8'));

const IN_CI = Boolean(process.env.VERCEL || process.env.CI);

if (process.env.SKIP_PRERENDER === '1') {
  if (IN_CI) {
    console.error('[prerender] ERRO: SKIP_PRERENDER=1 não é permitido na Vercel/CI. Remova a variável de ambiente.');
    process.exit(1);
  }
  console.warn('[prerender] PULADO por SKIP_PRERENDER=1 — o HTML publicado continuará sem conteúdo pré-renderizado.');
  process.exit(0);
}

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.gif': 'image/gif', '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf',
  '.txt': 'text/plain', '.xml': 'application/xml',
};

// Servidor estático simples: arquivo existente ou, se não houver, o shell da SPA (index.html original).
const shell = readFileSync(join(DIST, 'index.html'));
const server = createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const file = join(DIST, path);
  if (file.startsWith(DIST) && existsSync(file) && statSync(file).isFile() && path !== '/') {
    res.writeHead(200, { 'Content-Type': TYPES[extname(file).toLowerCase()] || 'application/octet-stream' });
    res.end(readFileSync(file));
  } else {
    res.writeHead(200, { 'Content-Type': TYPES['.html'] });
    res.end(shell);
  }
});
await new Promise((ok) => server.listen(0, '127.0.0.1', ok));
const origin = `http://127.0.0.1:${server.address().port}`;

async function launchBrowser() {
  const puppeteer = (await import('puppeteer-core')).default;
  // Na Vercel/CI usa sempre o Chromium do @sparticuz/chromium (não depende de nenhum Chrome instalado).
  // Localmente usa o Chrome/Edge da máquina (ou CHROME_PATH).
  const local = IN_CI ? undefined : [
    process.env.CHROME_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ].filter(Boolean).find((p) => existsSync(p));
  if (local) return puppeteer.launch({ executablePath: local, headless: true, args: ['--no-sandbox'] });
  const chromium = (await import('@sparticuz/chromium')).default;
  return puppeteer.launch({
    executablePath: await chromium.executablePath(),
    args: chromium.args,
    headless: 'shell',
  });
}

const fail = (msg) => { console.error(`[prerender] ERRO: ${msg}`); throw new Error(msg); };
let browser;
const report = [];
try {
  browser = await launchBrowser();
  for (const route of cfg.routes) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });
    // Não dispara analytics (GA, Meta Pixel etc.) nem chamadas externas durante o build.
    await page.setRequestInterception(true);
    page.on('request', (r) => (r.url().startsWith(origin) || r.url().startsWith('data:') ? r.continue() : r.abort()));
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    // Diagnóstico: requisições locais ainda pendentes e falhas
    const pending = new Map();
    page.on('request', (r) => { if (r.url().startsWith(origin)) pending.set(r, r.url()); });
    page.on('requestfinished', (r) => pending.delete(r));
    page.on('requestfailed', (r) => pending.delete(r));
    console.log(`[prerender] abrindo ${route} ...`);
    try {
      await page.goto(origin + route, { waitUntil: 'domcontentloaded', timeout: 60000 });
    } catch (e) {
      fail(`${route}: navegação falhou (${e.message}). Pendentes: ${[...pending.values()].join(', ') || 'nenhum'}. Erros de página: ${errors.join(' | ') || 'nenhum'}`);
    }
    try {
      await page.waitForFunction(
        (generic) => document.querySelector('h1') && document.title && document.title !== generic &&
          document.querySelector('link[rel="canonical"]'),
        { timeout: 45000 },
        cfg.genericTitle,
      );
    } catch {
      fail(`${route}: a página não montou título/H1/canonical em 30s. Pendentes: ${[...pending.values()].join(', ') || 'nenhum'}. Erros de página: ${errors.join(' | ') || 'nenhum'}`);
    }
    const info = await page.evaluate(() => ({
      title: document.title,
      h1: document.querySelectorAll('h1').length,
      canonicals: [...document.querySelectorAll('link[rel="canonical"]')].map((l) => l.href),
      noindex: !!document.querySelector('meta[name="robots"][content*="noindex"]'),
      textLength: document.body.innerText.length,
    }));
    const expected = cfg.baseUrl + (route === '/' ? '' : route);
    if (info.canonicals.length !== 1) fail(`${route}: esperado 1 canonical, achei ${info.canonicals.length}`);
    if (info.canonicals[0].replace(/\/$/, '') !== expected) fail(`${route}: canonical ${info.canonicals[0]} != ${expected}`);
    if (info.noindex) fail(`${route}: página pré-renderizada está com noindex`);
    if (info.textLength < 500) fail(`${route}: pouco texto renderizado (${info.textLength})`);
    const html = '<!doctype html>\n' + (await page.evaluate(() => document.documentElement.outerHTML));
    const outFile = route === '/' ? join(DIST, 'index.html') : join(DIST, route, 'index.html');
    mkdirSync(join(outFile, '..'), { recursive: true });
    writeFileSync(outFile, html);
    report.push({ route, title: info.title, h1: info.h1, bytes: Buffer.byteLength(html) });
    await page.close();
  }
} finally {
  if (browser) await browser.close();
  server.close();
}
console.table(report);
console.log(`[prerender] ${report.length} rotas pré-renderizadas.`);
