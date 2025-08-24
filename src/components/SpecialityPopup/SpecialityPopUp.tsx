import { useEffect, useState } from 'react';
import BookingModal from '../BookingModal';

const SpecialistPopup = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [userInteracted, setUserInteracted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Se já foi fechado nesta sessão, não mostrar novamente
        if (sessionStorage.getItem("popupClosed") === "true") return;

        const popupTimer = setTimeout(() => {
            setShowPopup(true);

            // Som só toca se o usuário não tiver interagido
            if (!userInteracted) {
                playNotificationSound();
            }
        }, 8000); // 8 segundos em produção

        // Detectar interação do usuário
        const handleInteraction = () => {
            if (!userInteracted) {
                setUserInteracted(true);
            }
        };

        window.addEventListener('click', handleInteraction);
        window.addEventListener('scroll', handleInteraction);
        window.addEventListener('keydown', handleInteraction);

        return () => {
            clearTimeout(popupTimer);
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('scroll', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
        };
    }, [userInteracted]);

    const playNotificationSound = () => {
        try {
            const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3');
            audio.volume = 0.3;
            audio.play().catch(e => console.log("Reprodução de áudio bloqueada:", e));
        } catch (error) {
            console.log("Erro ao reproduzir áudio:", error);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        sessionStorage.setItem("popupClosed", "true"); // não mostra de novo na mesma sessão
    };

    const handleClosePopupAndOpenModalAppointment = () => {
        setShowPopup(false);
        setIsModalOpen(true);
        sessionStorage.setItem("popupClosed", "true");
    };

    const handleOpenPopup = () => {
        setShowPopup(true);
        if (!userInteracted) playNotificationSound();
    };

    const openWhatsApp = () => {
        window.open('https://wa.me/5562992013573?text=Olá! Gostaria de mais informações sobre as terapias na Clínica Fono Inova.', '_blank');
        setShowPopup(false);
        sessionStorage.setItem("popupClosed", "true");
    };

    return (
        <>
            {/* Botão fixo no footer */}
            <div style={styles.footerButton} onClick={handleOpenPopup}>
                <span style={styles.buttonIcon}>💬</span>
                <div style={styles.notificationBadge}>1</div>
            </div>

            {/* Popup */}
            {showPopup && (
                <div style={styles.overlay} onClick={handleClosePopup}>
                    <div style={styles.popup} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.header}>
                            <h3 style={styles.title}>Fale com nossos especialistas</h3>
                            <button onClick={handleClosePopup} style={styles.closeButton}>
                                ✕
                            </button>
                        </div>

                        <div style={styles.content}>
                            <div style={styles.iconContainer}>
                                <div style={styles.icon}>
                                    <span style={styles.iconText}>👥</span>
                                </div>
                            </div>

                            <p style={styles.text}>
                                Nossa equipe de <strong>12+ especialistas</strong> está disponível para ajudar no seu tratamento.
                            </p>

                            <div style={styles.buttonContainer}>
                                <button onClick={openWhatsApp} style={styles.primaryButton}>
                                    <span style={styles.buttonIcon}>💬</span>
                                    Conversar agora
                                </button>

                                <button
                                    onClick={handleClosePopupAndOpenModalAppointment}
                                    style={styles.secondaryButton}
                                >
                                    <span style={styles.buttonIcon}>📅</span>
                                    Agendar horário
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

// Paleta da clínica
const colors = {
    primary: '#2D6EE0',
    primaryLight: '#5A8DE4',
    secondary: '#4CAF50',
    accent: '#FF9800',
    light: '#F5F9FF',
    dark: '#2C3E50',
    white: '#FFFFFF',
};

// Estilos
const styles = {
    footerButton: {
        position: 'fixed',
        bottom: '80px', // antes era 20px
        right: '9px',
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
        color: colors.white,
        border: 'none',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(45, 110, 224, 0.3)',
        zIndex: 999,
        fontSize: '24px',
        transition: 'all 0.3s ease',
        animation: 'pulse 2s infinite',
    },
    notificationBadge: {
        position: 'absolute',
        top: '-5px',
        right: '-5px',
        background: colors.accent,
        color: colors.white,
        borderRadius: '50%',
        width: '20px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: 'bold',
        animation: 'pulse 1.5s infinite',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    },
    overlay: {
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        padding: '20px',
    },
    popup: {
        background: colors.white,
        borderRadius: '16px',
        width: '380px',
        maxWidth: '90vw',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
        overflow: 'hidden',
        animation: 'slideIn 0.4s ease-out',
    },
    header: {
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        color: colors.white,
        fontSize: '18px',
        fontWeight: '600',
        margin: 0,
    },
    closeButton: {
        background: 'rgba(255, 255, 255, 0.2)',
        color: colors.white,
        border: 'none',
        borderRadius: '50%',
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
    },
    content: {
        padding: '25px',
        textAlign: 'center',
        background: colors.light,
    },
    iconContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
    },
    icon: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${colors.secondary} 0%, #66BB6A 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconText: { fontSize: '36px' },
    text: {
        color: colors.dark,
        fontSize: '16px',
        lineHeight: '1.6',
        marginBottom: '25px',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    primaryButton: {
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
        color: colors.white,
        border: 'none',
        borderRadius: '8px',
        padding: '14px 20px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
    },
    secondaryButton: {
        background: colors.white,
        color: colors.primary,
        border: `2px solid ${colors.primary}`,
        borderRadius: '8px',
        padding: '14px 20px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
    },
    buttonIcon: { fontSize: '18px' },
};

export default SpecialistPopup;
