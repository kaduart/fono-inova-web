// Gera valid-paths.generated.js: caminhos que o site realmente serve.
// O middleware.js usa essa lista para devolver 404 real a URLs inexistentes.
// Roda sozinho no "prebuild". Fontes: rotas do App.jsx, origens de redirect do
// vercel.json, sitemap.xml e os slugs dinâmicos de artigos e landing pages.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(path.join(root, p), 'utf8');
const norm = (p) => {
  const s = p.split('?')[0].split('#')[0].toLowerCase();
  return s.length > 1 ? s.replace(/\/+$/, '') : '/';
};

const valid = new Set(['/']);
// Caminhos usados por campanhas/anúncios que não têm rota própria no App.jsx; mantidos como estão hoje.
for (const extra of ['/obrigado', '/campanha']) valid.add(extra);
const stats = {};
const count = (key, before) => { stats[key] = valid.size - before; };

// 1) Rotas estáticas do React Router (ignora coringa e rotas com parâmetro)
let before = valid.size;
for (const m of read('src/App.jsx').matchAll(/<Route\s+path="([^"]+)"/g)) {
  if (m[1] === '*' || m[1].includes(':')) continue;
  valid.add(norm(m[1]));
}
count('rotas do App.jsx', before);

// 2) Origens dos redirecionamentos do vercel.json (só caminhos literais)
before = valid.size;
for (const r of JSON.parse(read('vercel.json')).redirects || []) {
  if (/[:(*]/.test(r.source)) continue;
  valid.add(norm(r.source));
}
count('origens de redirect', before);

// 3) Sitemap
before = valid.size;
for (const m of read('public/sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)) {
  try { valid.add(norm(new URL(m[1].trim()).pathname)); } catch { /* ignora loc inválido */ }
}
count('sitemap', before);

// 4) Slugs dinâmicos
const slugsOf = (files) => {
  const out = new Set();
  for (const f of files) {
    for (const m of read(f).matchAll(/slug:\s*['"]([^'"]+)['"]/g)) out.add(m[1]);
  }
  return out;
};
const articleSlugs = slugsOf(['src/data/articlesData.jsx', 'src/data/articles-satellite.jsx']);
const lpDir = 'src/data/landing-pages';
const lpSlugs = slugsOf(readdirSync(path.join(root, lpDir)).filter((f) => f.endsWith('.js')).map((f) => `${lpDir}/${f}`));

// Trava de segurança: sem slugs, a lista daria 404 em páginas legítimas. Falha o build.
if (articleSlugs.size === 0 || lpSlugs.size === 0) {
  throw new Error(`generate-valid-paths: slugs não encontrados (artigos=${articleSlugs.size}, LPs=${lpSlugs.size}). Build interrompido.`);
}
before = valid.size;
for (const s of articleSlugs) valid.add(norm(`/artigos/${s}`));
count('artigos', before);
before = valid.size;
for (const s of lpSlugs) valid.add(norm(`/lp/${s}`));
count('landing pages', before);

const list = [...valid].sort();
writeFileSync(
  path.join(root, 'valid-paths.generated.js'),
  `// ARQUIVO GERADO por scripts/generate-valid-paths.js (roda no prebuild). Não editar à mão.\nexport const VALID_PATHS = new Set(${JSON.stringify(list, null, 2)});\n`
);
console.log(`valid-paths.generated.js: ${list.length} caminhos`, stats);
