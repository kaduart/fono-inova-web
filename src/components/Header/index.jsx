// components/Header.jsx
import { Button } from '@mui/material';
import { Calendar, ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoImgHeader from '../../assets/Logo_Fono_Inova_Horizontal_3D.png';
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
        { name: "Fonoaudiologia", path: "/fonoaudiologia", description: "Desenvolvimento da fala" },
        { name: "Psicologia", path: "/psicologia", description: "Acompanhamento emocional" },
        { name: "Terapia Ocupacional", path: "/terapia-ocupacional", description: "Independência" },
        { name: "Fisioterapia", path: "/fisioterapia", description: "Reabilitação" },
        { name: "Psicopedagogia", path: "/psicopedagogia", description: "Aprendizagem" },
        { name: "Avaliação Neuropsicológica", path: "/avaliacao-neuropsicologica", description: "Avaliação cognitiva" },
        { name: "Freio Lingual", path: "/freio-lingual", description: "Avaliação" },
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
            <header className="fixed top-0 left-0 w-full bg-white shadow-lg border-b border-gray-100 z-50">
                <div className="max-w-[1355px] mx-auto px-4 h-16 lg:h-20 flex items-center justify-between">

                    {/* Logo */}
                    <Link to="/" onClick={() => window.scrollTo({ top: 0 })} className="flex-shrink-0 flex items-center">
                        <img 
                            src={logoIconMobile} 
                            alt="Fono Inova" 
                            className="block xl:hidden h-12 w-auto object-contain drop-shadow-md" 
                        />
                        <img 
                            src={logoImgHeader} 
                            alt="Fono Inova" 
                            className="hidden xl:block h-14 lg:h-16 w-auto object-contain drop-shadow-md" 
                        />
                    </Link>

                    {/* Desktop Navigation - sempre hidden até montar */}
                    <nav className="hidden xl:flex items-center gap-6">
                        <div className="relative">
                            <button
                                className="flex items-center gap-1 text-gray-800 hover:text-teal-600 font-semibold transition-colors"
                                onClick={() => setOpenDropdown(openDropdown === 'services' ? null : 'services')}
                            >
                                Serviços <ChevronDown className="w-4 h-4" />
                            </button>
                            {openDropdown === 'services' && (
                                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                    {services.map((s) => (
                                        <Link key={s.path} to={s.path} className="block px-4 py-2 hover:bg-gray-50 text-gray-700" onClick={() => setOpenDropdown(null)}>
                                            {s.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button onClick={() => scrollToSection('about')} className="text-gray-800 hover:text-teal-600 font-semibold transition-colors">Sobre</button>
                        <button onClick={() => scrollToSection('testimonials')} className="text-gray-800 hover:text-teal-600 font-semibold transition-colors">Depoimentos</button>
                        <Link to="/faq" className="text-gray-800 hover:text-teal-600 font-semibold transition-colors">FAQ</Link>
                        <button onClick={handleAgendar} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-bold text-sm shadow-md hover:shadow-lg transition-all">
                            Agendar
                        </button>
                    </nav>

                    {/* Mobile Menu Button - só aparece depois de montado */}
                    {mounted && (
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex xl:hidden items-center justify-center w-8 h-8 bg-teal-500 text-white rounded-md shadow-sm flex-shrink-0"
                            aria-label="Menu"
                        >
                            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    )}
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && mounted && (
                    <div className="xl:hidden bg-white border-t border-gray-200 absolute top-16 left-0 w-full max-h-[calc(100vh-64px)] overflow-y-auto shadow-lg">
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
                            <Button onClick={handleAgendar} className="w-full bg-green-500 text-white mt-3">
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
