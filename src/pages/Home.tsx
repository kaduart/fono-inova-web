import { Mail, Phone, Star } from '@mui/icons-material';
import { Badge, Button, Card, CardContent, CardHeader } from '@mui/material';
import {
  Accessibility,
  Instagram,
  MapPin,
  MessageCircle,
  Youtube
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccessibilityWizard from '../components/AccessibilityWizard.js';
import ArticleCard from '../components/ArticleCard.jsx';
import BookingModal from '../components/BookingModal.jsx';
import ImageCarousel from '../components/ImageCarousel.jsx';
import Layout from '../components/Layout/index.jsx';
import SEO from '../components/SEO.jsx';
import ServiceCards from '../components/ServiceCards.jsx';
import TestimonialCards from '../components/TestimonialCards.jsx';
import { articlesData } from '../data/articlesData.jsx';
// Adicione estes imports no topo do arquivo
import {
  Facebook
} from 'lucide-react';
import {
  trackButtonClick,
  trackPhoneCall,
  trackWhatsAppClick
} from '../hooks/useAnalytics';
import { useFormTracking } from '../hooks/useFormTracking.js';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accessibilityWizardOpen, setAccessibilityWizardOpen] = useState(false);
  const { trackFieldInteraction, trackFormSubmission } = useFormTracking('Formulário_Contato_Home');

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const openWhatsApp = () => {
    trackWhatsAppClick();
    window.open('https://wa.me/5562992013573?text=Olá! Gostaria de agendar uma consulta na Clínica Fono Inova.', '_blank');
  };

  useEffect(() => {
    // Adicionar o favicon dinamicamente
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = '/favicon.ico';
    document.head.appendChild(link);
  }, []);

  const handleConhecerServicos = () => {
    trackButtonClick('Conhecer Serviços');
    scrollToSection('services');
  };

  return (
    <Layout>
      {/* Botão de Acessibilidade */}
      <div className="fixed bottom-30 right-3 mt-0 z-50">
        <button
          onClick={() => setAccessibilityWizardOpen(true)}
          className="p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors flex items-center justify-center"
          aria-label="Configurações de acessibilidade"
        >
          <Accessibility className="h-6 w-6" />
        </button>
      </div>

      {/* Wizard de Acessibilidade */}
      <AccessibilityWizard
        open={accessibilityWizardOpen}
        onClose={() => setAccessibilityWizardOpen(false)}
      />

      <section className="pt-[96px] md:pt-[122px] pb-12 md:pb-16 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="order-2 lg:order-1 animate-fade-in-up">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                Apoio Multidisciplinar
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-poppins mb-4 md:mb-6 leading-tight">
                Transformando
                <span className="text-primary"> Desafios </span>
                em
                <span className="text-secondary"> Conquistas</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 leading-relaxed">
                Na <b>Clínica Fono Inova</b>, convertemos desafios em conquistas por meio de terapias inovadoras,
                focadas no desenvolvimento e no sucesso das crianças.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => handleConhecerServicos}
                  className="text-base md:text-lg px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6"
                >
                  Conhecer Serviços
                </Button>
              </div>
            </div>

            {/* Video/Image Section */}
            <div className="order-1 lg:order-2 relative w-full mb-8 lg:mb-0">
              <div className="w-full h-64 sm:h-80 md:h-96 bg-gradient-to-br from-primary to-secondary rounded-3xl overflow-hidden animate-float">
                <ImageCarousel typeImages="nichos" />

                {/* Substitua por um vídeo quando disponível */}
                {/*  <div className="relative w-full h-full">
                  <img
                    src="/images/hero-video-placeholder.jpg"
                    alt="Clínica Fono Inova"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent flex items-center justify-center">
                    <button className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div> */}
              </div>
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-accent rounded-full flex items-center justify-center animate-pulse">
                <Star className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
              Nossos Serviços
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6">
              Cuidado Multidisciplinar para Cada Fase do
              <span className="text-primary"> Desenvolvimento Infantil</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Oferecemos uma ampla gama de serviços especializados, priorizando excelência e satisfação no atendimento.
            </p>
          </div>

          <ServiceCards />
        </div>
      </section>
      <section className="pt-[96px] md:pt-[122px] pb-12 md:pb-16 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Coluna de texto */}
          <div className="flex flex-col justify-evenly h-full space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold font-poppins">
              Promovendo o Crescimento e
              <span className="text-secondary"> Bem-Estar Infantil</span>
            </h3>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Na Clínica Fono Inova, nossa missão é oferecer cuidado multidisciplinar de excelência para crianças,
              guiados por valores como empatia, inovação e compromisso com o desenvolvimento integral.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Oferecemos serviços especializados como fonoaudiologia, psicologia, terapia ocupacional e fisioterapia,
              sempre com foco no bem-estar e na evolução das crianças.
            </p>

            {/* Estatísticas */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Crianças Atendidas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">95%</div>
                <div className="text-muted-foreground">Taxa de Satisfação</div>
              </div>
            </div>
          </div>

          {/* Coluna da imagem */}
          <div className="relative w-full">
            <div className="w-full h-full rounded-3xl overflow-hidden">
              <ImageCarousel typeImages="clinica" />

              {/*  <img
                src="/images/clinica/fachada-clinica.jpg"
                alt="Exterior da Clínica Fono Inova"
                className="w-full h-full object-cover"
              /> */}
            </div>
          </div>
        </div>
      </section>


      {/* Seção Blog/Artigos */}
      <section id="blog" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              Conteúdos
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6">
              Artigos sobre <span className="text-accent">Desenvolvimento Infantil</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Confira nossos conteúdos exclusivos sobre terapias e desenvolvimento infantil.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articlesData.slice(0, 3).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/artigos"
            >
              Ver Todos os Artigos
            </Button>
          </div>
        </div>
      </section>
      <section id="testimonials" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              Depoimentos
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6">
              O que os
              <span className="text-accent"> Pais </span>
              dizem sobre nós
            </h2>
          </div>

          <TestimonialCards />
        </div>
      </section>

      <section id="contact" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Entre em Contato
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6">
              Apoio Integrado para o
              <span className="text-primary"> Crescimento Infantil</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Entre em contato para cuidar do futuro do seu pequeno.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Endereço</h3>
                  <p className="text-muted-foreground">
                    Avenida Minas Gerais, 405, Bairro Jundiaí<br />
                    Anápolis – GO
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Telefone</h3>
                  <a
                    href="tel:6237063924"
                    onClick={() => trackPhoneCall('(62) 3706-3924')}
                    className="hover:text-secondary transition-colors"
                  >
                    (62) 3706-3924
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">E-mail</h3>
                  <p className="text-muted-foreground">contato@clinicafonoinova.com.br</p>
                </div>
              </div>

              {/* Redes Sociais */}
              <div className="pt-4">
                <h3 className="font-semibold text-lg mb-4">Siga-nos nas redes sociais</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://www.instagram.com/clinicafonoinova"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110"
                    aria-label="Siga-nos no Instagram"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.youtube.com/clinicafonoinova"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110"
                    aria-label="Inscreva-se no nosso YouTube"
                  >
                    <Youtube className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.facebook.com/clinicafonoinova"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110"
                    aria-label="Curta nossa página no Facebook"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                </div>

                {/* Links diretos para facilitar o acesso */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <a
                    href="https://www.instagram.com/clinicafonoinova"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:text-secondary flex items-center gap-1"
                  >
                    <Instagram className="w-4 h-4" />
                    @clinicafonoinova
                  </a>
                  <a
                    href="https://www.youtube.com/clinicafonoinova"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:text-secondary flex items-center gap-1"
                  >
                    <Youtube className="w-4 h-4" />
                    Clínica Fono Inova
                  </a>
                </div>
              </div>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="text-2xl font-poppins">Agende sua Consulta</div>
                <div>
                  Preencha o formulário e entraremos em contato em breve.
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nome</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Seu nome"
                      onChange={(e) => trackFieldInteraction('nome', e.target.value)}
                      onFocus={() => trackFieldInteraction('nome_focus', 'focused')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Telefone</label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="(62) 99999-9999"
                      onChange={(e) => trackFieldInteraction('telefone', e.target.value)}
                      onFocus={() => trackFieldInteraction('telefone_focus', 'focused')}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">E-mail</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="seu@email.com"
                    onChange={(e) => trackFieldInteraction('email', e.target.value)}
                    onFocus={() => trackFieldInteraction('email_focus', 'focused')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Especialidade</label>
                  <select
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    onChange={(e) => trackFieldInteraction('especialidade', e.target.value)}
                    onFocus={() => trackFieldInteraction('especialidade_focus', 'focused')}
                  >
                    <option value="">Selecione uma especialidade</option>
                    <option value="fonoaudiologia">Fonoaudiologia</option>
                    <option value="psicologia">Psicologia</option>
                    <option value="terapia_ocupacional">Terapia Ocupacional</option>
                    <option value="fisioterapia">Fisioterapia</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Mensagem</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Conte-nos mais sobre suas necessidades..."
                    onChange={(e) => trackFieldInteraction('mensagem', e.target.value.length > 0 ? 'preenchido' : 'vazio')}
                    onFocus={() => trackFieldInteraction('mensagem_focus', 'focused')}
                  ></textarea>
                </div>
                <Button
                  onClick={() => {
                    trackFormSubmission(true); // Rastreia o envio do formulário
                    openWhatsApp();
                  }}
                  className="w-full bg-green-500 hover:bg-green-600"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Enviar via WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Adicionar CSS para modo acessibilidade */}
      <style jsx>{`
        .accessibility-mode {
          font-size: 110%;
        }
        .accessibility-mode .text-muted-foreground {
          color: #000 !important;
        }
      `}</style>
      <SEO
        title="Clínica Fono Inova - Especialistas em Desenvolvimento Infantil"
        description="Clínica multidisciplinar especializada em fonoaudiologia, psicologia, terapia ocupacional e fisioterapia infantil em Anápolis-GO."
        keywords="fonoaudiologia, psicologia infantil, terapia ocupacional, fisioterapia, desenvolvimento infantil, Anápolis"
        image="/images/logo-seo.jpg"
        url="https://www.clinicafonoinova.com.br"
      />
    </Layout >
  );
}

export default Home;