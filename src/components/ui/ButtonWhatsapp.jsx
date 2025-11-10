import { Phone } from 'lucide-react';
import { reportWhatsappConversion } from '../../helper/analytics';

const ButtonWhatsApp = ({
    className = '',
    phoneNumber = '5562992013573',
    message = 'Olá! Gostaria de agendar uma consulta na Clínica Fono Inova.',
    children = 'Falar com Especialista',
    size = 'default',
    icon: IconComponent = Phone,
    onClick,                 // permite tracking externo
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
            className={`${sizeClasses[size]} ${className}`}
            aria-label="Agendar via WhatsApp"
            {...props}
        >
            <IconComponent className="w-4 h-4 mr-2" />
            {children}
        </button>
    );
};

export default ButtonWhatsApp;
