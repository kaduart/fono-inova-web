import {
    Calendar,
    Clock,
    MessageCircle,
    Send,
    User,
    X
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
    trackBookingInitiated,
    trackPopupClosed,
    trackPopupCTA,
    trackPopupDismissed,
    trackPopupOpened,
    trackWhatsAppClick
} from '../../hooks/useAnalytics';
import BookingModal from '../BookingModal';

type MessageType = {
    id: number;
    text: string;
    sender: 'them' | 'us';
    delayAfter?: number;
};

const SpecialistPopup = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [userInteracted, setUserInteracted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [showCTA, setShowCTA] = useState(false);
    const hasTriggeredRef = useRef(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const getUTMCampaign = () => {
        if (typeof window === 'undefined') return null;
        return new URLSearchParams(window.location.search).get('utm_campaign');
    };

    const utmCampaign = getUTMCampaign();

    const getChatFlow = (): MessageType[] => {
        if (utmCampaign?.includes('autismo')) {
            return [
                { id: 1, text: 'Oi! Tudo bem? 💚', sender: 'them', delayAfter: 800 },
                { id: 2, text: 'Vi que você chegou aqui pelo nosso conteúdo sobre autismo.', sender: 'them', delayAfter: 1200 },
                { id: 3, text: 'Se você percebeu algum comportamento diferente no seu filho, a gente pode te orientar sobre os próximos passos.', sender: 'them', delayAfter: 1500 },
                { id: 4, text: 'Quer conversar com a gente agora?', sender: 'them', delayAfter: 800 },
            ];
        }
        if (utmCampaign?.includes('fala') || utmCampaign?.includes('atraso')) {
            return [
                { id: 1, text: 'Oi! Tudo bem? 💚', sender: 'them', delayAfter: 800 },
                { id: 2, text: 'A gente ajuda muitas famílias que estão preocupadas com a fala do filho.', sender: 'them', delayAfter: 1200 },
                { id: 3, text: 'Cada criança tem o seu tempo, mas entender isso com um especialista traz muita tranquilidade.', sender: 'them', delayAfter: 1500 },
                { id: 4, text: 'Posso te ajudar a entender melhor?', sender: 'them', delayAfter: 800 },
            ];
        }
        return [
            { id: 1, text: 'Oi! Tudo bem? 💚', sender: 'them', delayAfter: 800 },
            { id: 2, text: 'Sou da equipe da Fono Inova.', sender: 'them', delayAfter: 1000 },
            { id: 3, text: 'Se você percebeu algo diferente no desenvolvimento do seu filho, posso te orientar agora mesmo.', sender: 'them', delayAfter: 1500 },
            { id: 4, text: 'Quer conversar com a gente?', sender: 'them', delayAfter: 800 },
        ];
    };

    const messages = getChatFlow();

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    const runChatSequence = () => {
        let accumulatedDelay = 400;

        messages.forEach((msg, index) => {
            const delay = accumulatedDelay;
            accumulatedDelay += msg.delayAfter || 1000;

            setTimeout(() => {
                setIsTyping(true);
                scrollToBottom();

                setTimeout(() => {
                    setIsTyping(false);
                    setVisibleMessages(prev => [...prev, msg.id]);
                    scrollToBottom();

                    // Mostra CTA depois da última mensagem
                    if (index === messages.length - 1) {
                        setTimeout(() => setShowCTA(true), 400);
                    }
                }, 1200);
            }, delay);
        });
    };

    const openPopup = (triggerType: 'scroll' | 'exit_intent' | 'timer') => {
        if (hasTriggeredRef.current) return;
        if (sessionStorage.getItem('popupClosed') === 'true') return;

        hasTriggeredRef.current = true;
        setIsVisible(true);
        setShowPopup(true);
        trackPopupOpened(triggerType);

        if (!userInteracted) {
            playNotificationSound();
        }

        runChatSequence();
    };

    useEffect(() => {
        if (sessionStorage.getItem('popupClosed') === 'true') return;

        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;

            if (scrollPercent > 40 && !hasTriggeredRef.current) {
                openPopup('scroll');
            }
        };

        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY < 10 && !hasTriggeredRef.current) {
                openPopup('exit_intent');
            }
        };

        const popupTimer = setTimeout(() => {
            openPopup('timer');
        }, 10000);

        const handleInteraction = () => {
            if (!userInteracted) {
                setUserInteracted(true);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('click', handleInteraction);
        window.addEventListener('keydown', handleInteraction);
        window.addEventListener('touchstart', handleInteraction);

        return () => {
            clearTimeout(popupTimer);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
        };
    }, [userInteracted]);

    useEffect(() => {
        scrollToBottom();
    }, [visibleMessages, isTyping]);

    const playNotificationSound = () => {
        try {
            const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3');
            audio.volume = 0.2;
            audio.play().catch(e => console.log('Reprodução de áudio bloqueada:', e));
        } catch (error) {
            console.log('Erro ao reproduzir áudio:', error);
        }
    };

    const handleClosePopup = (method: 'overlay_click' | 'x_button') => {
        setIsExiting(true);
        setTimeout(() => {
            setShowPopup(false);
            setIsVisible(false);
            setIsExiting(false);
            sessionStorage.setItem('popupClosed', 'true');
            trackPopupDismissed(method);
        }, 300);
    };

    const handleClosePopupAndOpenModal = () => {
        trackPopupCTA('agendar');
        setIsExiting(true);
        setTimeout(() => {
            setShowPopup(false);
            setIsVisible(false);
            setIsExiting(false);
            setIsModalOpen(true);
            sessionStorage.setItem('popupClosed', 'true');
            trackBookingInitiated('popup');
        }, 300);
    };

    const handleOpenPopup = () => {
        hasTriggeredRef.current = false;
        setVisibleMessages([]);
        setShowCTA(false);
        setIsVisible(true);
        setShowPopup(true);
        trackPopupOpened('manual_click');

        if (!userInteracted) playNotificationSound();
        runChatSequence();
    };

    const openWhatsApp = () => {
        trackWhatsAppClick();
        trackPopupCTA('whatsapp');

        const message = encodeURIComponent(
            'Oi! Estou no site e queria entender melhor sobre o desenvolvimento do meu filho. Pode me ajudar?'
        );
        window.open(`https://wa.me/5562992013573?text=${message}`, '_blank');
        handleClosePopup('overlay_click');
    };

    return (
        <>
            {/* Botão flutuante */}
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
                aria-label="Abrir conversa"
            >
                <MessageCircle className="w-7 h-7 text-white" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">1</span>
                </div>
            </div>

            {/* Popup Chat Estilo WhatsApp */}
            {showPopup && (
                <div
                    className={`
                        fixed inset-0 bg-black/50 z-50
                        flex items-end sm:items-center justify-center p-4
                        transition-opacity duration-300
                        ${isVisible ? 'opacity-100' : 'opacity-0'}
                        ${isExiting ? 'opacity-0' : ''}
                    `}
                    onClick={() => handleClosePopup('overlay_click')}
                >
                    <div
                        className={`
                            bg-white rounded-2xl shadow-2xl w-full max-w-sm
                            transform transition-all duration-300
                            overflow-hidden
                            ${isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'}
                            ${isExiting ? 'scale-95 opacity-0 translate-y-4' : ''}
                        `}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header estilo WhatsApp */}
                        <div className="bg-gradient-to-r from-[#075E54] to-[#128C7E] p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                    <User className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold text-sm leading-tight">
                                        Amanda — Fono Inova
                                    </h3>
                                    <div className="flex items-center space-x-1 text-green-200 text-xs">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        <span>Online agora</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleClosePopup('x_button')}
                                className="text-white/80 hover:text-white transition-colors"
                                aria-label="Fechar"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Área de mensagens */}
                        <div
                            ref={chatContainerRef}
                            className="bg-[#E5DDD5] p-4 h-80 overflow-y-auto space-y-3"
                            style={{
                                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23d1c7bb\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
                            }}
                        >
                            {messages.map((msg) => (
                                visibleMessages.includes(msg.id) && (
                                    <div
                                        key={msg.id}
                                        className={`
                                            flex ${msg.sender === 'them' ? 'justify-start' : 'justify-end'}
                                            animate-in fade-in slide-in-from-bottom-2 duration-300
                                        `}
                                    >
                                        <div
                                            className={`
                                                max-w-[85%] px-4 py-2 rounded-2xl text-sm shadow-sm
                                                ${msg.sender === 'them'
                                                    ? 'bg-white text-gray-800 rounded-tl-sm'
                                                    : 'bg-[#DCF8C6] text-gray-800 rounded-tr-sm'
                                                }
                                            `}
                                        >
                                            <p>{msg.text}</p>
                                            <span className="text-[10px] text-gray-400 flex justify-end mt-1">
                                                {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                )
                            ))}

                            {/* Digitando... */}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center space-x-1">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                    </div>
                                </div>
                            )}

                            {/* CTAs finais */}
                            {showCTA && (
                                <div className="space-y-2 pt-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <button
                                        onClick={openWhatsApp}
                                        className="w-full bg-[#25D366] hover:bg-[#1ebd5a] text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] shadow-lg flex items-center justify-center space-x-2"
                                    >
                                        <MessageCircle className="w-5 h-5" />
                                        <span>Quero entender o que está acontecendo</span>
                                    </button>
                                    <button
                                        onClick={handleClosePopupAndOpenModal}
                                        className="w-full bg-white/90 hover:bg-white text-gray-700 border border-gray-200 py-2 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2"
                                    >
                                        <Calendar className="w-4 h-4" />
                                        <span>Prefiro agendar direto</span>
                                    </button>
                                    <p className="text-center text-xs text-gray-500 pt-1">
                                        <Clock className="w-3 h-3 inline mr-1" />
                                        Respondemos em até 5 minutos
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Footer estilo input */}
                        <div className="bg-[#F0F0F0] p-3 flex items-center space-x-2">
                            <div className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-gray-400">
                                Digite uma mensagem...
                            </div>
                            <button
                                onClick={openWhatsApp}
                                className="w-10 h-10 bg-[#128C7E] rounded-full flex items-center justify-center text-white hover:bg-[#0e7266] transition-colors"
                                aria-label="Enviar mensagem no WhatsApp"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            {/* Estilos de animação */}
            <style>{`
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
