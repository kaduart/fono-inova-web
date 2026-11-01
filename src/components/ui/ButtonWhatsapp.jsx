import { reportWhatsappConversion } from '../../helper/analytics';
import { trackLandingPageLead } from '../../services/landingPageAnalytics';
import { buildWhatsAppRefSignature } from '../../hooks/useLeadTracking';

const ButtonWhatsApp = ({
    className = '',
    phoneNumber = '5562992013573',
    message = 'Oi! Vi no site de vocês e gostaria de entender melhor como funciona o atendimento.\n\nPode me explicar?',
    children = 'Falar com Especialista',
    size = 'default',
    onClick,                 // permite tracking externo
    // Props para tracking de Landing Page
    lpSlug = null,
    lpCategory = null,
    ...props
}) => {
    const sizeClasses = {
        sm: 'px-3 py-2 text-sm',
        default: 'px-4 py-3 text-base',
        lg: 'px-6 py-4 text-lg',
        xl: 'px-8 py-6 text-xl'
    };

    const handleClick = () => {
        // Seus próprios eventos (ex.: trackFormSubmission, trackButtonClick)
        if (typeof onClick === 'function') onClick();
        
        // Tracking de Landing Page (se aplicável)
        if (lpSlug && lpCategory) {
            trackLandingPageLead(lpSlug, lpCategory, {
                source: 'whatsapp_button',
                location: window.location.pathname
            });
        }

        // TikTok Pixel — Clique WhatsApp
        if (typeof window !== 'undefined' && window.ttq) {
            window.ttq.track('CONSULT', {
                content_name: 'Clique WhatsApp',
                event_id: `wa_btn_${Date.now()}`,
            });
        }

        // Monta URL e dispara conversão do Google Ads (com callback para abrir)
        const encodedMessage = encodeURIComponent(message + buildWhatsAppRefSignature());
        const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        if (typeof window !== 'undefined') {
            reportWhatsappConversion(url);
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className={`
    inline-flex items-center justify-center gap-2 min-h-12 font-semibold
    transition-[transform,background-color,box-shadow] duration-200 motion-safe:hover:-translate-y-0.5
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-700
    ${sizeClasses[size]}
    ${className}
  `}
            aria-label="Agendar via WhatsApp"
            {...props}
        >
            <span className="inline-flex items-center gap-2 whitespace-nowrap">{children}</span>
        </button>

    );
};

export default ButtonWhatsApp;
