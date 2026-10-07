/**
 * 🚀 Prerender.io Edge Middleware
 * 
 * Serve HTML estático pré-renderizado para bots de busca,
 * enquanto usuários normais recebem a SPA React normalmente.
 * 
 * Configure o token no Vercel Dashboard ou substitua abaixo.
 */

import { VALID_PATHS } from './valid-paths.generated.js';

const PRERENDER_TOKEN = process.env.PRERENDER_TOKEN || 'SEU_TOKEN_PRERENDER_IO_AQUI';

const BOT_AGENTS = /googlebot|bingbot|yandex|baiduspider|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|slackbot|vkShare|W3C_Validator|duckduckbot|facebot|ia_archiver/i;

export const config = {
  matcher: '/:path*',
};

export default async function middleware(request) {
  const userAgent = request.headers.get('user-agent') || '';
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

  // Só aplica prerender para bots
  if (!BOT_AGENTS.test(userAgent)) {
    return;
  }

  const prerenderUrl = `https://service.prerender.io/${url.toString()}`;

  try {
    const response = await fetch(prerenderUrl, {
      headers: {
        'X-Prerender-Token': PRERENDER_TOKEN,
        'User-Agent': userAgent,
      },
    });

    if (!response.ok) {
      console.error(`Prerender error: ${response.status} for ${url.toString()}`);
      return;
    }

    return new Response(response.body, {
      status: response.status,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Prerendered': 'true',
      },
    });
  } catch (error) {
    console.error('Prerender middleware error:', error);
    return;
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
