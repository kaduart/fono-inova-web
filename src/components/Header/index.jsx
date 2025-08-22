// components/Header.jsx
import { Button } from '@/components/ui/button'
import { Calendar, Menu, X } from 'lucide-react'
import { useState } from 'react'
import logoImgHeader from '../../assets/LOGO_FONO_INOVA_HORIZONTAL_NEGRITO.png'

const Header = ({ scrollToSection, setIsModalOpen }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="fixed top-0 left-0 w-full backdrop-blur-sm border-b border-border z-50 bg-white bg-opacity-90">
            <div className="max-w-[1355px] mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <img src={logoImgHeader} alt="Clínica Fono Inova" className="h-16" />
                </div>

                <nav className="hidden md:flex items-center space-x-8">
                    <button onClick={() => scrollToSection('services')} className="text-foreground hover:text-primary transition-colors font-medium">
                        Serviços
                    </button>
                    <button onClick={() => scrollToSection('about')} className="text-foreground hover:text-primary transition-colors font-medium">
                        Sobre Nós
                    </button>
                    <button onClick={() => scrollToSection('testimonials')} className="text-foreground hover:text-primary transition-colors font-medium">
                        Depoimentos
                    </button>
                    <button onClick={() => scrollToSection('contact')} className="text-foreground hover:text-primary transition-colors font-medium">
                        Contato
                    </button>
                    <Button onClick={() => setIsModalOpen(true)} className="bg-accent hover:bg-accent/90">
                        <Calendar className="w-4 h-4 mr-2" />
                        Agendar Consulta
                    </Button>
                </nav>

                <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-border">
                    <nav className="max-w-[1355px] mx-auto px-4 py-4 flex flex-col space-y-4">
                        <button onClick={() => scrollToSection('services')} className="text-left text-foreground hover:text-primary transition-colors font-medium">
                            Serviços
                        </button>
                        <button onClick={() => scrollToSection('about')} className="text-left text-foreground hover:text-primary transition-colors font-medium">
                            Sobre Nós
                        </button>
                        <button onClick={() => scrollToSection('testimonials')} className="text-left text-foreground hover:text-primary transition-colors font-medium">
                            Depoimentos
                        </button>
                        <button onClick={() => scrollToSection('contact')} className="text-left text-foreground hover:text-primary transition-colors font-medium">
                            Contato
                        </button>
                        <Button onClick={() => setIsModalOpen(true)} className="bg-accent hover:bg-accent/90 w-full">
                            <Calendar className="w-4 h-4 mr-2" />
                            Agendar Consulta
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    )
}

export default Header