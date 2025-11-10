const getGtag = () =>
    (typeof window !== "undefined" && typeof window.gtag === "function")
        ? window.gtag
        : null;

/** GA4 event genérico (não-conversão) */
export function gaEvent(name, params = {}) {
    const gtag = getGtag();
    if (!gtag) return;
    try { gtag('event', name, params); } catch { }
}

/** Conversão Google Ads: WhatsApp (clique) */
export function reportWhatsappConversion(url) {
    const gtag = getGtag();
    if (gtag) {
        try {
            gtag("event", "conversion", {
                send_to: "AW-17010705949/PQinCJrDz70bEJ2Mq68_",
                value: 1.0,
                event_callback: () => {
                    window.open(url, "_blank", "noopener,noreferrer");
                },
            });
            return;
        } catch { }
    }
    // fallback se gtag indisponível
    window.open(url, "_blank", "noopener,noreferrer");
}

/** Conversão Google Ads: Enviar formulário de leads (dispare no submit OK) */
export function reportLeadConversion() {
    const gtag = getGtag();
    if (!gtag) return;
    try {
        gtag('event', 'conversion', {
            send_to: 'AW-17010705949/ceJrCLKfz70bEJ2Mq68_',
            value: 1.0,
            currency: 'BRL'
        });
    } catch { }
}
