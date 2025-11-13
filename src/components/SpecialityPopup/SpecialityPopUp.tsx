import {
    Calendar,
    Clock,
    MessageCircle,
    MessageSquare,
    Users,
    X
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { trackBookingInitiated, trackPopupClosed, trackPopupOpened, trackWhatsAppClick } from '../../hooks/useAnalytics';
import BookingModal from '../BookingModal';

const SpecialistPopup = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [userInteracted, setUserInteracted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem("popupClosed") === "true") return;

        const popupTimer = setTimeout(() => {
            setIsVisible(true);
            setShowPopup(true);

            trackPopupOpened('auto_timer');

            if (!userInteracted) {
                playNotificationSound();
            }
        }, 8000);

        const handleInteraction = () => {
            if (!userInteracted) {
                setUserInteracted(true);
            }
        };

        window.addEventListener('click', handleInteraction);
        window.addEventListener('scroll', handleInteraction);
        window.addEventListener('keydown', handleInteraction);
        window.addEventListener('touchstart', handleInteraction);

        return () => {
            clearTimeout(popupTimer);
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('scroll', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
        };
    }, [userInteracted]);

    const playNotificationSound = () => {
        try {
            const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3');
            audio.volume = 0.2;
            audio.play().catch(e => console.log("Reprodução de áudio bloqueada:", e));
        } catch (error) {
            console.log("Erro ao reproduzir áudio:", error);
        }
    };

    const handleClosePopup = () => {
        setIsExiting(true);
        setTimeout(() => {
            setShowPopup(false);
            setIsVisible(false);
            setIsExiting(false);
            sessionStorage.setItem("popupClosed", "true");

            trackPopupClosed();
        }, 300);
    };

    const handleClosePopupAndOpenModal = () => {
        setIsExiting(true);
        setTimeout(() => {
            setShowPopup(false);
            setIsVisible(false);
            setIsExiting(false);
            setIsModalOpen(true);
            sessionStorage.setItem("popupClosed", "true");

            // Track agendamento iniciado
            trackBookingInitiated('popup');
        }, 300);
    };

    const handleOpenPopup = () => {
        setIsVisible(true);
        setShowPopup(true);

        // Track popup aberto manualmente
        trackPopupOpened('manual_click');

        if (!userInteracted) playNotificationSound();

    };

    const openWhatsApp = () => {
        trackWhatsAppClick();

        window.open('https://wa.me/5562992013573?text=Olá! Gostaria de mais informações sobre as terapias na Clínica Fono Inova.', '_blank');
        handleClosePopup();
    };

    return (
        <>
            {/* Botão flutuante moderno NO RODAPÉ DIREITO */}
            <div
                className={`
                    fixed bottom-6 right-1 z-40
                    w-16 h-16 bg-gradient-to-br from-primary to-primary-dark
                    rounded-full shadow-2xl cursor-pointer
                    flex items-center justify-center
                    transition-all duration-300
                    hover:scale-110 hover:shadow-3xl
                    animate-pulse
                    border-2 border-white
                `}
                onClick={handleOpenPopup}
            >
                <MessageCircle className="w-7 h-7 text-white" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">1</span>
                </div>
            </div>

            {/* Popup que aparece automaticamente */}
            {showPopup && (
                <div
                    className={`
                        fixed inset-0 bg-green bg-opacity-60 z-50
                        flex items-center justify-center p-4
                        transition-opacity duration-300
                        ${isVisible ? 'opacity-100' : 'opacity-0'}
                        ${isExiting ? 'opacity-0' : ''}
                    `}
                    onClick={handleClosePopup}
                >
                    <div
                        className={`
                            bg-white rounded-2xl shadow-2xl max-w-md w-full
                            transform transition-all duration-300
                            ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
                            ${isExiting ? 'scale-95 opacity-0' : ''}
                        `}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-primary to-primary-light rounded-t-2xl p-6 relative">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-white bg-opacity-20 rounded-full">
                                        <Users className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-white text-xl font-semibold">
                                        Fale com nossos especialistas
                                    </h3>
                                </div>
                                <button
                                    onClick={handleClosePopup}
                                    className="text-white hover:text-gray-200 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 bg-gray-50">
                            <div className="text-center mb-6">
                                <div className="w-20 h-20 bg-gradient-to-br from-secondary to-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <MessageSquare className="w-10 h-10 text-white" />
                                </div>

                                <p className="text-gray-700 text-lg mb-4">
                                    Nossa equipe de <span className="font-semibold text-primary">12+ especialistas</span>
                                    está pronta para ajudar no desenvolvimento do seu filho.
                                </p>

                                <div className="flex items-center justify-center text-sm text-gray-500 mb-6">
                                    <Clock className="w-4 h-4 mr-2" />
                                    <span>Disponíveis de segunda a sábado</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={openWhatsApp}
                                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    <span>Conversar agora pelo WhatsApp</span>
                                </button>

                                <button
                                    onClick={handleClosePopupAndOpenModal}
                                    className="w-full bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white py-4 px-6 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center space-x-3"
                                >
                                    <Calendar className="w-5 h-5" />
                                    <span>Agendar avaliação</span>
                                </button>
                            </div>

                            <div className="mt-4 text-center">
                                <p className="text-xs text-gray-500">
                                    Respondemos em até 5 minutos durante o horário comercial
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            {/* Estilos de animação */}
            <style >{`
                @keyframes slideIn {
                    from {
                        transform: translateY(20px) scale(0.95);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0) scale(1);
                        opacity: 1;
                    }
                }
                
                .animate-pulse {
                    animation: pulse 2s infinite;
                }
                
                @keyframes pulse {
                    0% {
                        box-shadow: 0 0 0 0 rgba(66, 153, 225, 0.5);
                    }
                    70% {
                        box-shadow: 0 0 0 10px rgba(66, 153, 225, 0);
                    }
                    100% {
                        box-shadow: 0 0 0 0 rgba(66, 153, 225, 0);
                    }
                }
            `}</style>
        </>
    );
};

export default SpecialistPopup;