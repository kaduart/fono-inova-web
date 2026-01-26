// components/Header.jsx - Versão Corrigida
import { Button } from '@mui/material';
import { Calendar, ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoImgHeader from '../../assets/LOGO_FONO_INOVA_HORIZONTAL_NEGRITO.png';
import { trackButtonClick } from '../../hooks/useAnalytics';
import BookingModal from '../BookingModal';

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();


    const services = [
        {
            name: "Fonoaudiologia",
            path: "/fonoaudiologia",
            description: "Desenvolvimento da fala e linguagem"
        },
        {
            name: "Psicologia",
            path: "/psicologia",
            description: "Acompanhamento emocional"
        },
        {
            name: "Terapia Ocupacional",
            path: "/terapia-ocupacional",
            description: "Independência nas atividades"
        },
        {
            name: "Fisioterapia",
            path: "/fisioterapia",
            description: "Fortalecimento e reabilitação"
        },
        {
            name: "Psicopedagogia",
            path: "/psicopedagogia",
            description: "Dificuldades de aprendizagem"
        },
        {
            name: "Avaliação Neuropsicológica",
            path: "/avaliacao-neuropsicologica",
            description: "Avaliação cognitiva completa"
        },
        {
            name: "Freio Lingual",
            path: "/freio-lingual",
            description: "Avaliação e tratamento"
        },
    ];


    const isActiveLink = (path) => {
        return location.pathname === path;
    };

    // Função para rolar até uma seção específica
    const scrollToSection = (sectionId) => {
        // Se não estamos na home, navegar primeiro para home com hash
        if (location.pathname !== '/') {
            navigate(`/#${sectionId}`);
            return;
        }

        // Se já estamos na home, fazer o scroll
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    // Efeito para lidar com a rolagem quando a URL contém hash
    useEffect(() => {
        const handleHashScroll = () => {
            // Verificar se estamos na home e se há hash na URL
            if (location.pathname === '/' && location.hash) {
                const sectionId = location.hash.replace('#', '');

                // Pequeno delay para garantir que o DOM esteja completamente renderizado
                setTimeout(() => {
                    const element = document.getElementById(sectionId);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }
        };

        // Executar quando o componente montar ou quando location mudar
        handleHashScroll();
    }, [location]); // Executa sempre que a location mudar

    const handleAgendarConsulta = () => {
        try { trackButtonClick?.('Agendar Consulta'); } catch { }
        // GA4 (evento de UI, não é conversão):
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('event', 'open_booking_modal', {
                location: 'header_desktop',
                page_path: location.pathname,
            });
        }
        setIsModalOpen(true);
    };

    return (
        <>
            <header className="fixed top-0 left-0 w-full backdrop-blur-sm border-b border-border z-50">

                <div className="max-w-[1355px] mx-auto px-4 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <Link to="/">
                            <img src={logoImgHeader} alt="Clínica Fono Inova" className="h-[44px] sm:h-[52px] md:h-[56px] lg:h-[70px] w-auto" />
                        </Link>
                    </div>

                    {/* Navegação Desktop */}
                    <nav className="hidden md:flex items-center space-x-6">
                        {/* Dropdown de Serviços */}
                        <div className="relative group">
                            <button
                                className="flex items-center gap-1 text-gray-700 hover:text-primary transition-colors font-medium py-2"
                                onMouseEnter={() => setOpenDropdown('services')}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                Serviços
                                <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                            </button>

                            {/* Dropdown Menu */}
                            {openDropdown === 'services' && (
                                <div
                                    className="absolute top-full left-0 mt-0 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                                    onMouseEnter={() => setOpenDropdown('services')}
                                    onMouseLeave={() => setOpenDropdown(null)}
                                >
                                    {services.map((service) => (
                                        <Link
                                            key={service.path}
                                            to={service.path}
                                            className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors group"
                                        >
                                            <div className="flex-1">
                                                <div className="font-medium text-gray-900 group-hover:text-primary">
                                                    {service.name}
                                                </div>
                                                <div className="text-sm text-gray-600 mt-1">
                                                    {service.description}
                                                </div>
                                            </div>
                                            <div className={`w-2 h-2 rounded-full ${isActiveLink(service.path) ? 'bg-primary' : 'bg-gray-300'} group-hover:bg-primary`} />
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Links diretos */}
                        <button
                            onClick={() => scrollToSection('about')}
                            className="text-gray-700 hover:text-primary transition-colors font-medium"
                        >
                            Sobre Nós
                        </button>
                        <button
                            onClick={() => scrollToSection('testimonials')}
                            className="text-gray-700 hover:text-primary transition-colors font-medium"
                        >
                            Depoimentos
                        </button>
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="text-gray-700 hover:text-primary transition-colors font-medium"
                        >
                            Contato
                        </button>

                        <Link
                            to="/faq"
                            className="block w-full text-left py-2 px-4 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            FAQ
                        </Link>


                        {/* Botão de Agendamento */}
                        <button
                            type="button"
                            onClick={handleAgendarConsulta}
                            className="group relative w-full md:w-auto
    rounded-2xl px-7 py-4 font-extrabold
    text-white shadow-xl hover:shadow-2xl
    transition-all duration-300
    bg-gradient-to-r from-green-600 via-green-500 to-emerald-500
    hover:from-green-600 hover:via-emerald-500 hover:to-green-600
    ring-2 ring-green-300/40 hover:ring-green-200/60
    hover:-translate-y-0.5
  "
                            aria-label="Agendar consulta"
                        >
                            {/* Glow suave atrás */}
                            <span className="pointer-events-none absolute inset-0 rounded-2xl blur-md opacity-40 bg-green-500/40"></span>
                            {/* Ping delicado */}
                            <span className="pointer-events-none absolute -inset-1 rounded-3xl animate-pulse bg-emerald-500/10"></span>
                            {/* Conteúdo */}
                            <div className="relative z-10 flex items-center justify-center text-white">
                                <Calendar className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:rotate-12" />
                                <span>Agendar Consulta</span>
                            </div>
                        </button>

                    </nav>

                    {/* Menu Mobile */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Menu Mobile Expandido */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-200">
                        <nav className="max-w-[1355px] mx-auto px-4 py-4 space-y-4">
                            <div className="font-semibold text-gray-900 mb-2">Serviços</div>
                            {services.map((service) => (
                                <Link
                                    key={service.path}
                                    to={service.path}
                                    className="block py-2 px-4 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {service.name}
                                </Link>
                            ))}

                            <div className="border-t border-gray-200 pt-4 mt-4">
                                <button
                                    onClick={() => scrollToSection('about')}
                                    className="block w-full text-left py-2 px-4 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                    Sobre Nós
                                </button>
                                <button
                                    onClick={() => scrollToSection('testimonials')}
                                    className="block w-full text-left py-2 px-4 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                    Depoimentos
                                </button>
                                <button
                                    onClick={() => scrollToSection('contact')}
                                    className="block w-full text-left py-2 px-4 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                    Contato
                                </button>
                            </div>

                            <Button onClick={() => {
                                if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
                                    window.gtag('event', 'open_booking_modal', { location: 'header_mobile' });
                                }
                                setIsModalOpen(true);
                                setIsMenuOpen(false);
                            }}
                                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white mt-4"
                            >
                                <Calendar className="w-4 h-4 mr-2" />
                                Agendar Consulta
                            </Button>
                        </nav>
                    </div>
                )}
                {/* GA4 + Google Ads (forma segura em React) */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-N59X7PNQZZ"></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-N59X7PNQZZ');   /* GA4 */
      gtag('config', 'AW-17010705949'); /* Google Ads */
    `,
                    }}
                />

            </header >
            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default Header;