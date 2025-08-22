import { Mail, MessageCircle, Phone } from 'lucide-react'
import logoImgFooter from '../../assets/LOGO_CLÍNICA_FONO_INOVA_WHITE.png'

const Footer = ({ scrollToSection }) => {
    return (
        <footer style={{ backgroundColor: 'oklch(0.55 0.13 174.92)' }} className="text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <img src={logoImgFooter} alt="Clínica Fono Inova" className="h-12 mb-4 brightness-0 invert" />
                        <p className="text-background/80 leading-relaxed">
                            Construir um novo padrão de cuidado infantil, onde diferentes saberes se unem para transformar vidas.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Links Rápidos</h3>
                        <div className="space-y-2">
                            <button onClick={() => scrollToSection('services')} className="block text-background/80 hover:text-background transition-colors">
                                Serviços
                            </button>
                            <button onClick={() => scrollToSection('about')} className="block text-background/80 hover:text-background transition-colors">
                                Sobre Nós
                            </button>
                            <button onClick={() => scrollToSection('testimonials')} className="block text-background/80 hover:text-background transition-colors">
                                Depoimentos
                            </button>
                            <button onClick={() => scrollToSection('contact')} className="block text-background/80 hover:text-background transition-colors">
                                Contato
                            </button>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Contato</h3>
                        <div className="space-y-2 text-background/80">
                            <p>Avenida Minas Gerais, 405</p>
                            <p>Bairro Jundiaí, Anápolis – GO</p>
                            <div className="flex gap-2">
                                <Phone className="w-4 h-6 text-green-500" />
                                <span>(62) 3706-3924</span>
                            </div>
                            <div className="flex gap-2">
                                <MessageCircle className="w-4 h-6 text-green-500" />
                                <p>(62) 99201-3573</p>
                            </div>
                            <div className="flex gap-2">
                                <Mail className="w-4 h-6 text-green-500" />
                                <span>contato@fonoinova.com.br</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
                    <p>&copy; 2025 Clínica Fono Inova. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer