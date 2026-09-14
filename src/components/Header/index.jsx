// components/Header.jsx
import { Button } from '@mui/material';
import { Calendar, ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoIconMobile from '../../assets/Icone-logo-cabeca-Fono-Inova-3D.png';
import { trackButtonClick } from '../../hooks/useAnalytics';
import BookingModal from '../BookingModal';

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [mounted, setMounted] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setMounted(true);
    }, []);

    const services = [
        { name: "Fonoaudiologia", path: "/fonoaudiologia-anapolis", description: "Desenvolvimento da fala" },
        { name: "Psicologia", path: "/psicologia-infantil-anapolis", description: "Acompanhamento emocional" },
        { name: "Terapia Ocupacional", path: "/terapia-ocupacional-anapolis", description: "Independência" },
        { name: "Fisioterapia", path: "/fisioterapia-infantil-anapolis", description: "Reabilitação" },
        { name: "Psicopedagogia", path: "/psicopedagogia", description: "Aprendizagem" },
        { name: "Avaliação Neuropsicológica", path: "/avaliacao-neuropsicologica-anapolis", description: "Avaliação cognitiva" },
        { name: "Freio Lingual", path: "/teste-da-linguinha-anapolis", description: "Avaliação" },
    ];

    const scrollToSection = (sectionId) => {
        if (location.pathname !== '/') {
            navigate(`/#${sectionId}`);
            return;
        }
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
    };

    const handleAgendar = () => {
        try { trackButtonClick?.('Agendar'); } catch { }
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'open_booking_modal', { location: 'header' });
        }
        setIsModalOpen(true);
        setIsMenuOpen(false);
    };

    return (
        <>
            <header className="fixed top-0 left-0 w-full bg-white border-b border-slate-200/80 z-50">
                <div className="max-w-[1355px] mx-auto px-4 lg:px-8 h-16 lg:h-[72px] flex items-center justify-between">

                    {/* Logo */}
                    <Link to="/" onClick={() => window.scrollTo({ top: 0 })} className="brand-logo-link flex-shrink-0 flex items-center gap-2.5" aria-label="Fono Inova — página inicial">
                        <span className="relative h-10 w-10 lg:h-12 lg:w-12 flex-shrink-0">
                            <img loading="eager" decoding="async" 
                                src={logoIconMobile} 
                                alt="" 
                                aria-hidden="true"
                                className="brand-logo-motion h-full w-full object-contain" 
                            />
                            <span className="brand-symbol-signal" aria-hidden="true">
                                <span className="brand-symbol-wave brand-symbol-wave-1" />
                                <span className="brand-symbol-wave brand-symbol-wave-2" />
                                <span className="brand-symbol-wave brand-symbol-wave-3" />
                            </span>
                        </span>
                        <span className="flex flex-col leading-none">
                            <span className="font-poppins text-[15px] sm:text-base lg:text-xl font-bold tracking-[-0.025em] text-brand-primary-dark whitespace-nowrap">
                                FONO INOVA
                            </span>
                            <span className="hidden sm:block mt-1 text-[9px] lg:text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-primary-dark/70 whitespace-nowrap">
                                Integrar e transformar
                            </span>
                        </span>
                    </Link>

                    {/* Desktop Navigation - sempre hidden até montar */}
                    <nav className="hidden xl:flex items-center gap-7">
                        <div className="relative">
                            <button
                                className="flex items-center gap-1 py-3 text-slate-700 hover:text-brand-primary-dark font-semibold transition-colors"
                                onClick={() => setOpenDropdown(openDropdown === 'services' ? null : 'services')}
                            >
                                Serviços <ChevronDown className="w-4 h-4" />
                            </button>
                            {openDropdown === 'services' && (
                                <div className="absolute top-full left-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                                    {services.map((s) => (
                                        <Link key={s.path} to={s.path} className="block px-4 py-3 hover:bg-surface-mist text-slate-700" onClick={() => setOpenDropdown(null)}>
                                            {s.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button onClick={() => scrollToSection('about')} className="py-3 text-slate-700 hover:text-brand-primary-dark font-semibold transition-colors">Sobre</button>
                        <button onClick={() => scrollToSection('testimonials')} className="py-3 text-slate-700 hover:text-brand-primary-dark font-semibold transition-colors">Depoimentos</button>
                        <Link to="/faq" className="py-3 text-slate-700 hover:text-brand-primary-dark font-semibold transition-colors">FAQ</Link>
                        <button onClick={handleAgendar} className="pilot-action min-h-10 bg-brand-primary-dark hover:bg-slate-800 text-white px-5 py-2 text-sm shadow-sm hover:shadow-md">
                            Agendar
                        </button>
                    </nav>

                    {/* Mobile Menu Button - só aparece depois de montado */}
                    {mounted && (
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex xl:hidden items-center justify-center w-11 h-11 bg-brand-primary-dark text-white rounded-xl shadow-sm flex-shrink-0"
                            aria-label="Menu"
                        >
                            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    )}
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && mounted && (
                    <div className="xl:hidden bg-white border-t border-slate-200 absolute top-16 left-0 w-full max-h-[calc(100vh-64px)] overflow-y-auto shadow-lg">
                        <nav className="px-4 py-3">
                            <div className="font-semibold text-gray-900 py-2">Serviços</div>
                            {services.map((s) => (
                                <Link key={s.path} to={s.path} className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded" onClick={() => setIsMenuOpen(false)}>
                                    {s.name}
                                </Link>
                            ))}
                            <div className="border-t border-gray-200 my-3 pt-3 space-y-1">
                                <button onClick={() => { scrollToSection('about'); setIsMenuOpen(false); }} className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-100 rounded">Sobre Nós</button>
                                <button onClick={() => { scrollToSection('testimonials'); setIsMenuOpen(false); }} className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-100 rounded">Depoimentos</button>
                                <button onClick={() => { scrollToSection('contact'); setIsMenuOpen(false); }} className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-100 rounded">Contato</button>
                                <Link to="/faq" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded" onClick={() => setIsMenuOpen(false)}>FAQ</Link>
                            </div>
                            <Button onClick={handleAgendar} className="w-full bg-brand-primary-dark hover:bg-slate-800 text-white mt-3 min-h-12 rounded-xl">
                                <Calendar className="w-4 h-4 mr-2" /> Agendar Consulta
                            </Button>
                        </nav>
                    </div>
                )}
            </header>

            <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default Header;
