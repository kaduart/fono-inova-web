// Meta Pixel + API de Conversões (CAPI)
// Cada evento sai pelo navegador (fbq) e pelo servidor (/api/meta-capi) com o
// mesmo event_id, e a Meta deduplica os dois.

const WHATSAPP_URL = /(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)/i;
const DEDUPE_MS = 1500;

let lastContactAt = 0;

const getCookie = (name) => {
    const match = document.cookie.split('; ').find((c) => c.startsWith(`${name}=`));
    return match ? decodeURIComponent(match.split('=')[1]) : undefined;
};

const newEventId = () =>
    (window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`);

// _fbc só existe se o pixel já gravou; senão monta a partir do fbclid da URL
const getFbc = () => {
    const fbc = getCookie('_fbc');
    if (fbc) return fbc;
    const fbclid = new URLSearchParams(window.location.search).get('fbclid');
    return fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined;
};

const sendToServer = (payload) => {
    try {
        const body = JSON.stringify(payload);
        if (navigator.sendBeacon) {
            navigator.sendBeacon('/api/meta-capi', new Blob([body], { type: 'application/json' }));
        } else {
            fetch('/api/meta-capi', { method: 'POST', body, keepalive: true, headers: { 'Content-Type': 'application/json' } });
        }
    } catch { /* tracking nunca quebra a página */ }
};

export function trackMetaEvent(eventName, customData = {}) {
    if (typeof window === 'undefined') return;
    const eventId = newEventId();

    if (typeof window.fbq === 'function') {
        try { window.fbq('track', eventName, customData, { eventID: eventId }); } catch { /* tracking nunca quebra a página */ }
    }

    sendToServer({
        eventName,
        eventId,
        eventSourceUrl: window.location.href,
        fbp: getCookie('_fbp'),
        fbc: getFbc(),
        customData,
    });
}

/** Clique que abre o WhatsApp. Ignora disparos repetidos do mesmo clique. */
export function trackWhatsAppContact(label = 'whatsapp') {
    const now = Date.now();
    if (now - lastContactAt < DEDUPE_MS) return;
    lastContactAt = now;
    trackMetaEvent('Contact', { content_name: label, content_category: 'whatsapp' });
}

/** PageView nas trocas de rota da SPA (o primeiro vem do index.html). */
export function trackMetaPageView() {
    if (typeof window.fbq === 'function') {
        try { window.fbq('track', 'PageView'); } catch { /* tracking nunca quebra a página */ }
    }
}

/**
 * Pega todo caminho para o WhatsApp num lugar só: links <a href="wa.me/..."> e
 * window.open('https://wa.me/...'), que hoje estão espalhados por vários componentes.
 */
export function installWhatsAppContactTracking() {
    if (typeof window === 'undefined' || window.__metaWhatsAppTracking) return;
    window.__metaWhatsAppTracking = true;

    document.addEventListener('click', (e) => {
        const link = e.target.closest?.('a[href]');
        if (link && WHATSAPP_URL.test(link.href)) {
            trackWhatsAppContact(link.dataset.trackingLabel || window.location.pathname);
        }
    }, true);

    const originalOpen = window.open;
    window.open = function (url, ...rest) {
        if (typeof url === 'string' && WHATSAPP_URL.test(url)) {
            trackWhatsAppContact(window.location.pathname);
        }
        return originalOpen.call(window, url, ...rest);
    };
}
