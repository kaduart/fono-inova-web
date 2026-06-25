/**
 * 🚀 Prerender.io Edge Middleware
 * 
 * Serve HTML estático pré-renderizado para bots de busca,
 * enquanto usuários normais recebem a SPA React normalmente.
 * 
 * Configure o token no Vercel Dashboard ou substitua abaixo.
 */

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
