import { reportWhatsappConversion } from '../../helper/analytics';
import { trackLandingPageLead } from '../../services/landingPageAnalytics';

const ButtonWhatsApp = ({
    className = '',
    phoneNumber = '5562993377726',
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

        // Monta URL e dispara conversão do Google Ads (com callback para abrir)
        const encodedMessage = encodeURIComponent(message);
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
    inline-flex items-center gap-2
    ${sizeClasses[size]}
    ${className}
  `}
            aria-label="Agendar via WhatsApp"
            {...props}
        >
            <span className="whitespace-nowrap">{children}</span>
        </button>

    );
};

export default ButtonWhatsApp;
