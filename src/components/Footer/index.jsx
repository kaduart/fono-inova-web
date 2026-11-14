import { Mail, MessageCircle, Phone } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logoImgFooter from '../../assets/logo-fono-inova-white.webp'

const especialidades = [
    { label: 'Fonoaudiologia em Anápolis', href: '/fonoaudiologia-anapolis' },
    { label: 'Terapia Ocupacional em Anápolis', href: '/terapia-ocupacional-anapolis' },
    { label: 'Psicologia Infantil em Anápolis', href: '/psicologia-infantil-anapolis' },
    { label: 'Fala Tardia em Anápolis', href: '/fala-tardia-anapolis' },
    { label: 'Autismo em Anápolis', href: '/autismo-anapolis' },
    { label: 'TDAH em Anápolis', href: '/tdah-anapolis' },
    { label: 'Dislexia em Anápolis', href: '/dislexia-anapolis' },
    { label: 'Seletividade Alimentar', href: '/seletividade-alimentar-anapolis' },
];

// Links reais (<a href>) para o Google descobrir as páginas institucionais.
const institucional = [
    { label: 'Nossa clínica', href: '/nossa-clinica' },
    { label: 'Equipe', href: '/equipe' },
    { label: 'Avaliação infantil', href: '/avaliacao-infantil' },
    { label: 'Artigos para pais', href: '/artigos' },
    { label: 'Perguntas frequentes', href: '/faq' },
    { label: 'Apoio às famílias', href: '/apoio-as-familias' },
    { label: 'App de triagem infantil', href: '/app' },
    { label: 'Política de privacidade', href: '/privacidade' },
];

// Páginas indexáveis que não recebiam nenhum link interno (auditoria SEO 10/11/2026).
const outrosTemas = [
    { label: 'Gagueira infantil', href: '/lp/gagueira-infantil' },
    { label: 'Processamento auditivo', href: '/lp/processamento-auditivo' },
    { label: 'Criança agitada e desatenta', href: '/lp/tdah-crianca' },
    { label: 'Dificuldade de concentração', href: '/lp/dificuldade-concentracao' },
    { label: 'Criança agressiva', href: '/lp/crianca-agressiva' },
    { label: 'Discalculia', href: '/lp/discalculia-matematica' },
    { label: 'Disgrafia', href: '/lp/disgrafia-escrita' },
    { label: 'Psicopedagogia em Anápolis', href: '/lp/psicopedagogia-anapolis' },
    { label: 'Convênio Base Aérea', href: '/convenio-base-aerea-anapolis' },
    { label: 'IPASGO (lista de interesse)', href: '/convenio-ipasgo-anapolis' },
    { label: 'Convênio GEAP', href: '/convenio-geap-anapolis' },
    { label: 'Bradesco Saúde (lista de interesse)', href: '/convenio-bradesco-saude-anapolis' },
];

const Footer = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const scrollToSection = (sectionId) => {
        if (location.pathname !== '/') {
            navigate(`/#${sectionId}`);
            return;
        }
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer style={{ backgroundColor: 'oklch(0.55 0.13 174.92)' }} className="text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <img loading="lazy" decoding="async" src={logoImgFooter} alt="Clínica Fono Inova" className="h-12 mb-4 brightness-0 invert" />
                        <p className="text-background/80 leading-relaxed">
                            Construir um novo padrão de cuidado infantil, onde diferentes saberes se unem para transformar vidas.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Especialidades</h3>
                        <div className="space-y-2">
                            {especialidades.map(e => (
                                <Link key={e.href} to={e.href} className="block text-background/80 hover:text-background transition-colors text-sm">
                                    {e.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Links Rápidos</h3>
                        <div className="space-y-2">
                            {institucional.map(e => (
                                <Link key={e.href} to={e.href} className="block text-background/80 hover:text-background transition-colors text-sm">
                                    {e.label}
                                </Link>
                            ))}
                            <button onClick={() => scrollToSection('contact')} className="block text-background/80 hover:text-background transition-colors text-sm">
                                Contato
                            </button>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Contato</h3>
                        <div className="space-y-2 text-background/80">
                            <p>Av. Minas Gerais, 405 - Jundiaí</p>
                            <p>Anápolis - GO, 75110-770</p>
                            <div className="flex gap-2">
                                <Phone className="w-4 h-6 text-green-500" />
                                <span>(62) 99201-3573</span>
                            </div>
                            <div className="flex gap-2">
                                <MessageCircle className="w-4 h-6 text-green-500" />
                                <p>(62) 99201-3573</p>
                            </div>
                            <div className="flex gap-2">
                                <Mail className="w-4 h-6 text-green-500" />
                                <span>contato@clinicafonoinova.com.br</span>
                            </div>
                            <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1 text-sm">
                                <a href="https://www.instagram.com/clinicafonoinova/" target="_blank" rel="noopener noreferrer" className="hover:text-background transition-colors">Instagram</a>
                                <a href="https://www.facebook.com/profile.php?id=61575031024483" target="_blank" rel="noopener noreferrer" className="hover:text-background transition-colors">Facebook</a>
                                <a href="https://www.tiktok.com/@clinica.fono.inova" target="_blank" rel="noopener noreferrer" className="hover:text-background transition-colors">TikTok</a>
                            </div>
                        </div>
                    </div>
                </div>
                <nav aria-label="Outros temas" className="border-t border-background/20 mt-8 pt-6">
                    <h3 className="font-semibold text-sm mb-3">Outros temas</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                        {outrosTemas.map(e => (
                            <Link key={e.href} to={e.href} className="text-background/70 hover:text-background transition-colors text-sm">
                                {e.label}
                            </Link>
                        ))}
                    </div>
                </nav>
                <div className="border-t border-background/20 mt-6 pt-8 text-center text-background/60">
                    <p>&copy; 2025 Clínica Fono Inova. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer