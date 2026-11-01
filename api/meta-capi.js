/* global process */
// Vercel Function: espelha no servidor (API de Conversões da Meta) os eventos
// que o site dispara no navegador, com o mesmo event_id para deduplicar.
//
// Variáveis de ambiente (Vercel → Settings → Environment Variables):
//   META_CAPI_TOKEN       token gerado no Gerenciador de Eventos (obrigatório)
//   META_PIXEL_ID         padrão 4071257099804730 (SITE-FONO-INOVA)
//   META_GRAPH_VERSION    padrão v23.0
//   META_TEST_EVENT_CODE  só durante o teste no Gerenciador de Eventos

const PIXEL_ID = process.env.META_PIXEL_ID || '4071257099804730';
const GRAPH_VERSION = process.env.META_GRAPH_VERSION || 'v23.0';
const ALLOWED_EVENTS = new Set(['Contact', 'Lead', 'Schedule', 'ViewContent']);
const ALLOWED_HOSTS = /(^|\.)clinicafonoinova\.com\.br$|(^|\.)fonoinova\.com\.br$|\.vercel\.app$|^localhost$/;

const isAllowedOrigin = (req) => {
    const source = req.headers.origin || req.headers.referer;
    if (!source) return false;
    try { return ALLOWED_HOSTS.test(new URL(source).hostname); } catch { return false; }
};

const clientIp = (req) =>
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress;

const parseBody = (req) => {
    if (typeof req.body === 'string') {
        try { return JSON.parse(req.body); } catch { return null; }
    }
    return req.body;
};

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'method not allowed' });
    if (!isAllowedOrigin(req)) return res.status(403).json({ error: 'origin not allowed' });

    const body = parseBody(req);
    const { eventName, eventId, eventSourceUrl, fbp, fbc, customData } = body || {};
    if (!ALLOWED_EVENTS.has(eventName) || typeof eventId !== 'string' || !eventId) {
        return res.status(400).json({ error: 'invalid event' });
    }

    const token = process.env.META_CAPI_TOKEN;
    if (!token) {
        console.warn('[meta-capi] META_CAPI_TOKEN ausente, evento não enviado', eventName, eventId);
        return res.status(202).json({ queued: false, reason: 'token not configured' });
    }

    const event = {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: 'website',
        event_source_url: eventSourceUrl,
        user_data: {
            client_ip_address: clientIp(req),
            client_user_agent: req.headers['user-agent'],
            fbp,
            fbc,
        },
        custom_data: customData && typeof customData === 'object' ? customData : undefined,
    };

    const payload = { data: [event] };
    if (process.env.META_TEST_EVENT_CODE) payload.test_event_code = process.env.META_TEST_EVENT_CODE;

    // Até 3 tentativas para erro de rede, 429 ou 5xx; erro 4xx de validação não se repete
    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            const r = await fetch(
                `https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`,
                { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
            );
            const json = await r.json().catch(() => ({}));
            if (r.ok) {
                console.info('[meta-capi] ok', eventName, eventId, json.fbtrace_id);
                return res.status(200).json({ queued: true });
            }
            console.error('[meta-capi] erro', r.status, eventName, eventId, json?.error?.message);
            if (r.status !== 429 && r.status < 500) return res.status(502).json({ error: 'meta rejected event' });
        } catch (err) {
            console.error('[meta-capi] falha de rede', attempt, eventName, eventId, err.message);
        }
        await new Promise((resolve) => setTimeout(resolve, 300 * 2 ** attempt));
    }
    return res.status(502).json({ error: 'meta unavailable' });
}
