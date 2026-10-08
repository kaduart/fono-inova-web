// Atualiza <lastmod> do public/sitemap.xml pela data do último commit do arquivo-fonte de cada página.
// Rode localmente (precisa do histórico git completo): npm run sitemap:lastmod  e depois commite o sitemap.
// Só avança datas (nunca volta) e só mexe em páginas mapeadas a partir de <Route> do App.jsx.
// Artigos (/artigos/<slug>) ficam como estão: não há arquivo por artigo, e uma data genérica enganaria o Google.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const app = readFileSync('src/App.jsx', 'utf8');
const imports = {};
for (const m of app.matchAll(/import\s+(\w+)\s+from\s+'(\.\/[^']+)'/g)) imports[m[1]] = m[2];
for (const m of app.matchAll(/(\w+)\s*=\s*lazy\(\s*\(\)\s*=>\s*import\(\s*'(\.\/[^']+)'/g)) imports[m[1]] = m[2];

const resolve = (rel) => {
  const base = 'src/' + rel.replace('./', '');
  return ['', '.jsx', '.tsx', '.js', '.ts', '/index.jsx', '/index.tsx'].map((e) => base + e).find((p) => existsSync(p) && !p.endsWith('/'));
};
const routeFile = {};
for (const m of app.matchAll(/<Route\s+path="([^"]+)"\s+element=\{<(\w+)[\s/>]/g)) {
  if (m[2] === 'Navigate' || !imports[m[2]]) continue;
  const f = resolve(imports[m[2]]);
  if (f) routeFile[m[1].replace(/\/$/, '') || '/'] = f;
}

const lastCommitDate = (file) => {
  try { return execFileSync('git', ['log', '-1', '--format=%cs', '--', file], { encoding: 'utf8' }).trim(); } catch { return ''; }
};

let xml = readFileSync('public/sitemap.xml', 'utf8');
let changed = 0;
xml = xml.replace(/<url>[\s\S]*?<\/url>/g, (block) => {
  const loc = block.match(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/);
  if (!loc) return block;
  const path = loc[1].replace(/\/$/, '') || '/';
  const file = routeFile[path];
  const current = (block.match(/<lastmod>([^<]+)<\/lastmod>/) || [])[1];
  if (!file || !current) return block;
  const date = lastCommitDate(file);
  if (!date || date <= current) return block;
  changed++;
  console.log(`${path}: ${current} -> ${date} (${file})`);
  return block.replace(/<lastmod>[^<]+<\/lastmod>/, `<lastmod>${date}</lastmod>`);
});
writeFileSync('public/sitemap.xml', xml);
console.log(`[sitemap] ${changed} lastmod atualizado(s). Páginas mapeadas: ${Object.keys(routeFile).length}.`);
