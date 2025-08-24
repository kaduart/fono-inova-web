import { Phone } from 'lucide-react';

const ButtonWhatsApp = ({
    className = '',
    phoneNumber = '5562992013573',
    message = 'Olá! Gostaria de agendar uma consulta na Clínica Fono Inova.',
    children = 'Falar com Especialista',
    size = 'default',
    icon: IconComponent = Phone,
    ...props
}) => {
    const sizeClasses = {
        sm: 'px-3 py-2 text-sm',
        default: 'px-4 py-3 text-base',
        lg: 'px-6 py-4 text-lg',
        xl: 'px-8 py-6 text-xl'
    };

    const openWhatsApp = () => {
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    };

    return (
        <button
            onClick={openWhatsApp}
            className={`${sizeClasses[size]} ${className}`}
            {...props}
        >
            <IconComponent className="w-4 h-4 mr-2" />
            {children}
        </button>
    );
};

export default ButtonWhatsApp;