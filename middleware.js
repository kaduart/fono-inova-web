/**
 * Edge Middleware: devolve 404 real para URLs que não existem.
 *
 * O conteúdo para bots vem do prerender feito no build (scripts/prerender.mjs).
 */

import { VALID_PATHS } from './valid-paths.generated.js';

export const config = {
  matcher: '/:path*',
};

export default async function middleware(request) {
  const url = new URL(request.url);

  // Ignora arquivos estáticos e APIs
  if (
    url.pathname.startsWith('/assets') ||
    url.pathname.startsWith('/static') ||
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|xml|txt|json|webp|woff|woff2|ttf|pdf)$/i)
  ) {
    return;
  }

  // Qualquer arquivo com extensão, /.well-known e /_vercel passam direto
  if (
    /\.[a-z0-9]+$/i.test(url.pathname) ||
    url.pathname.startsWith('/.well-known') ||
    url.pathname.startsWith('/_vercel')
  ) {
    return;
  }

  // 404 real para URLs que não existem (evita soft 404 da SPA)
  if (request.method === 'GET' || request.method === 'HEAD') {
    const normalized = (url.pathname.replace(/\/+$/, '') || '/').toLowerCase();
    if (!VALID_PATHS.has(normalized)) {
      return notFoundResponse(url, request.method);
    }
  }
}

const FALLBACK_404_HTML = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex, follow"><title>Página não encontrada | Clínica Fono Inova</title></head><body><h1>Página não encontrada</h1><p><a href="/">Voltar ao início</a></p></body></html>`;

async function notFoundResponse(url, method) {
  const headers = {
    'Content-Type': 'text/html; charset=utf-8',
    'X-Robots-Tag': 'noindex',
    'Cache-Control': 'public, max-age=0, must-revalidate',
  };
  let body = FALLBACK_404_HTML;
  try {
    // Usa o shell da SPA para que o React mostre a página 404 amigável
    const shell = await fetch(new URL('/_shell.html', url.origin));
    if (shell.ok) body = await shell.text();
  } catch (error) {
    console.error('404 shell fetch error:', error);
  }
  return new Response(method === 'HEAD' ? null : body, { status: 404, headers });
}
