import { Mail, Phone, Star } from '@mui/icons-material';
import { Badge, Button } from '@mui/material';
import {
  Accessibility,
  Award,
  BookOpen,
  Brain,
  CheckCircle,
  ChevronRight,
  Clock,
  Facebook,
  Instagram,
  MapPin,
  MessageCircle,
  MessageSquare,
  Mic,
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
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp.jsx';
import { reportWhatsappConversion } from '../helper/analytics.js';
import {
  trackButtonClick,
  trackPhoneCall,
  trackSocialMediaClick,
  trackWhatsAppClick
} from '../hooks/useAnalytics';
import { useFormTracking } from '../hooks/useFormTracking.js';

const WHATSAPP_URL =
  "https://wa.me/5562993377726?text=Olá! Vi o site e gostaria de agendar uma avaliação.";


function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accessibilityWizardOpen, setAccessibilityWizardOpen] = useState(false);
  const { trackFieldInteraction, trackFormSubmission } = useFormTracking('Formulário_Contato_Home');

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);

    // Track scroll to section
    trackButtonClick(`Scroll to ${sectionId}`);
  };

  const openWhatsApp = () => {
    trackWhatsAppClick();
    window.open('https://wa.me/5562993377726?text=Olá! Gostaria de agendar uma consulta na Clínica Fono Inova.', '_blank');
  };

  useEffect(() => {
    // Adicionar o favicon dinamicamente
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = '/favicon.ico';
    document.head.appendChild(link);

    // Track page view for home
    trackButtonClick('Home Page Loaded');
  }, []);

  const handleConhecerServicos = () => {
    trackButtonClick('Conhecer Serviços');
    scrollToSection('services');
  };

  const handleOpenAccessibility = () => {
    trackButtonClick('Open Accessibility Wizard');
    setAccessibilityWizardOpen(true);
  };

  const handleVerTodosArtigos = () => {
    trackButtonClick('Ver Todos os Artigos');
  };

  const handleSocialMediaClick = (platform) => {
    trackSocialMediaClick(platform);
  };

  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "Clínica Fono Inova",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Avenida Minas Gerais, 405",
        "addressLocality": "Anápolis",
        "addressRegion": "GO",
        "postalCode": "75000-000",
        "addressCountry": "BR"
      },
      "telephone": "+556237063924",
      "url": "https://www.clinicafonoinova.com.br"
    })}
  </script>

  return (
    <Layout>
      {/* Botão de Acessibilidade */}
      <div className="fixed bottom-30 right-3 mt-0 z-50">
        <button
          onClick={handleOpenAccessibility}
          className="p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors flex items-center justify-center"
          aria-label="Configurações de acessibilidade"
        >
          <Accessibility className="h-6 w-6" />
        </button>
      </div>

      {/* Wizard de Acessibilidade */}
      <AccessibilityWizard
        open={accessibilityWizardOpen}
        onClose={() => {
          trackButtonClick('Close Accessibility Wizard');
          setAccessibilityWizardOpen(false);
        }}
      />

      <section className="pt-[96px] md:pt-[122px] pb-12 md:pb-16 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="order-2 lg:order-1 animate-fade-in-up">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                Apoio Multidisciplinar
              </Badge>
              <h1>
                Clínica Multidisciplinar Infantil em Anápolis
                <span className="text-primary"> Transformando Desafios </span>
                em <span className="text-secondary"> Conquistas</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 leading-relaxed">
                Na <b>Clínica Fono Inova</b>, convertemos desafios em conquistas por meio de terapias inovadoras,
                focadas no desenvolvimento e no sucesso das crianças.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {/* CTA Principal - WhatsApp com destaque */}
                <ButtonWhatsApp
                  onClick={() => {
                    // seus eventos locais (opcional)
                    trackFormSubmission?.(true);
                    trackButtonClick?.("WhatsApp CTA Principal");
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl font-bold text-base md:text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 animate-pulse hover:animate-none"
                  message="Olá! Vi o site da Clínica Fono Inova e gostaria de agendar uma avaliação. Pode me ajudar?"
                >
                  <MessageCircle className="w-5 h-5" />
                  Agendar Avaliação
                </ButtonWhatsApp>

                {/* CTA Secundário */}
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleConhecerServicos}
                  className="text-base md:text-lg px-6 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                >
                  Conhecer Serviços
                </Button>
              </div>

              {/* Badge de Urgência - NOVO */}
              <div className="flex items-center gap-2 mt-4 bg-orange-50 px-4 py-2 rounded-lg inline-flex">
                <Clock className="w-4 h-4 text-orange-600" />
                <span className="text-sm text-gray-800">
                  <strong className="text-orange-600">Apenas 5 vagas</strong> disponíveis esta semana
                </span>
              </div>

            </div>

            {/* Video/Image Section */}
            <div className="order-1 lg:order-2 relative w-full mb-8 lg:mb-0">
              <div className="w-full h-64 sm:h-80 md:h-96 bg-gradient-to-br from-primary to-secondary rounded-3xl overflow-hidden animate-float">
                <ImageCarousel
                  typeImages="nichos"
                  onImageClick={() => trackButtonClick('Hero Image Click')}
                />
              </div>
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-accent rounded-full flex items-center justify-center animate-pulse">
                <Star className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-r from-green-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 max-w-5xl mx-auto border-2 border-green-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                Por que <span className="text-green-600">centenas de famílias</span> nos escolhem?
              </h3>
              <p className="text-gray-600 text-lg">
                Agende agora e receba atendimento especializado em até 48 horas
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-green-600 mb-1">500+</div>
                <p className="text-sm text-gray-600 font-medium">Crianças Atendidas</p>
              </div>

              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-8 h-8 text-white fill-white" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-1">4.9/5</div>
                <p className="text-sm text-gray-600 font-medium">Avaliação Média</p>
              </div>

              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-1">12+</div>
                <p className="text-sm text-gray-600 font-medium">Especialistas</p>
              </div>

              <div className="text-center p-4 bg-orange-50 rounded-xl">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-orange-600 mb-1">48h</div>
                <p className="text-sm text-gray-600 font-medium">Resposta Rápida</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-center text-white">
              <p className="text-xl font-semibold mb-4">
                🎁 Primeira Avaliação com <span className="text-yellow-300">Desconto Especial</span> para novos pacientes
              </p>
              <ButtonWhatsApp
                onClick={() => {
                  trackButtonClick?.("WhatsApp CTA Desconto");
                  trackFormSubmission?.(true);
                }}
                className="bg-white hover:bg-gray-100 text-green-600 px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-2"
                message="Olá! Vi a oferta no site e gostaria de agendar minha avaliação com desconto especial."
                aria-label="Garantir desconto pelo WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
                Garantir Desconto Agora
              </ButtonWhatsApp>

              <p className="text-sm mt-3 text-green-100">
                ⏰ Oferta válida apenas para agendamentos feitos hoje
              </p>
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

          <ServiceCards
            onServiceClick={(serviceName) => trackButtonClick(`Service Click - ${serviceName}`)}
          />
        </div>
      </section>
      {/* Seção: Nossos Principais Atendimentos - ADICIONAR NA HOME */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
              Encontre o <span className="text-primary">Atendimento Ideal</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Selecione a situação que mais se encaixa com a sua necessidade
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card TEA */}
            <Link to="/avaliacao-autismo-infantil" className="group">
              <div className="bg-white border-2 border-purple-200 hover:border-purple-600 rounded-2xl p-6 transition-all hover:shadow-2xl h-full">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Brain className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-purple-600">
                  Suspeita de Autismo
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Avaliação multidisciplinar completa para crianças com sinais de TEA
                </p>
                <div className="flex items-center text-purple-600 font-semibold">
                  Saiba mais <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Card Fala Tardia */}
            <Link to="/fala-tardia" className="group">
              <div className="bg-white border-2 border-orange-200 hover:border-orange-600 rounded-2xl p-6 transition-all hover:shadow-2xl h-full">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-orange-600">
                  Fala Tardia (2-5 anos)
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Fonoterapia especializada para crianças com atraso na fala
                </p>
                <div className="flex items-center text-orange-600 font-semibold">
                  Saiba mais <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Card Dificuldade Escolar */}
            <Link to="/avaliacao-neuropsicologica-dificuldade-escolar" className="group">
              <div className="bg-white border-2 border-blue-200 hover:border-blue-600 rounded-2xl p-6 transition-all hover:shadow-2xl h-full">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-blue-600">
                  Dificuldade Escolar
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Avaliação neuropsicológica para TDAH, dislexia e outros
                </p>
                <div className="flex items-center text-blue-600 font-semibold">
                  Saiba mais <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Card Adulto */}
            <Link to="/fonoaudiologia-adulto" className="group">
              <div className="bg-white border-2 border-emerald-200 hover:border-emerald-600 rounded-2xl p-6 transition-all hover:shadow-2xl h-full">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Mic className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-emerald-600">
                  Fonoaudiologia Adulto
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Tratamento de voz profissional e disfagia (dificuldade para engolir)
                </p>
                <div className="flex items-center text-emerald-600 font-semibold">
                  Saiba mais <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
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
          <div className="order-1 lg:order-2 relative w-full mb-8 lg:mb-0">
            <div className="w-full h-64 sm:h-80 md:h-96 bg-gradient-to-br from-primary to-secondary rounded-3xl overflow-hidden animate-float">

              <ImageCarousel
                typeImages="clinica"
                onImageClick={() => trackButtonClick('Clinic Image Click')}
              />
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
              <ArticleCard
                key={article.id}
                article={article}
                onArticleClick={() => trackButtonClick(`Article Click - ${article.title}`)}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/artigos"
              onClick={handleVerTodosArtigos}
            >
              Ver Todos os Artigos
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Perguntas Frequentes sobre Desenvolvimento Infantil
          </h2>

          <p className="text-gray-600 mb-6">
            Tire suas dúvidas sobre atraso na fala, autismo, avaliações e terapias.
          </p>

          <Link
            to="/faq"
            className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition"
          >
            Acessar Perguntas Frequentes (FAQ)
          </Link>
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

          <TestimonialCards
            onTestimonialClick={(testimonialId) => trackButtonClick(`Testimonial Click - ${testimonialId}`)}
          />
        </div>
      </section>

      <section id="contact" className="py-16 bg-gradient-to-br from-green-600 via-blue-600 to-purple-700">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                Atendimento Rápido
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6 text-white">
                Agende Agora Mesmo pelo
                <span className="text-green-300"> WhatsApp</span>
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Atendimento imediato • Sem burocracia • Resposta em até 2 horas úteis
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Coluna 1: Informações de Contato */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Fale Conosco
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-white">
                      <h4 className="font-semibold text-lg mb-1">Endereço</h4>
                      <p className="text-white/80">
                        Avenida Minas Gerais, 405<br />
                        Bairro Jundiaí - Anápolis/GO
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-white">
                      <h4 className="font-semibold text-lg mb-1">Telefone</h4>
                      <a
                        href="tel:6237063924"
                        onClick={() => trackPhoneCall('(62) 3706-3924')}
                        className="hover:text-green-300 transition-colors text-white/80"
                      >
                        (62) 3706-3924
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-white">
                      <h4 className="font-semibold text-lg mb-1">E-mail</h4>
                      <p className="text-white/80">contato@clinicafonoinova.com.br</p>
                    </div>
                  </div>
                </div>

                {/* Redes Sociais */}
                <div className="mt-8 pt-8 border-t border-white/20">
                  <h4 className="font-semibold text-white text-lg mb-4">Siga-nos</h4>
                  <div className="flex space-x-3">
                    <a
                      href="https://www.instagram.com/clinicafonoinova"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleSocialMediaClick('Instagram')}
                      className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                    >
                      <Instagram className="w-6 h-6" />
                    </a>
                    <a
                      href="https://www.youtube.com/clinicafonoinova"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleSocialMediaClick('YouTube')}
                      className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                    >
                      <Youtube className="w-6 h-6" />
                    </a>
                    <a
                      href="https://www.facebook.com/clinicafonoinova"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleSocialMediaClick('Facebook')}
                      className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                    >
                      <Facebook className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Coluna 2: CTA WhatsApp */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Atendimento Imediato pelo WhatsApp
                  </h3>
                  <p className="text-gray-600">
                    Fale diretamente com nossa equipe e agende sua consulta agora
                  </p>
                </div>

                {/* Benefícios */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-800">Resposta em até 2 horas úteis</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-800">Escolha o melhor horário para você</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-800">Tire todas as suas dúvidas antes</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border-2 border-orange-200">
                    <Star className="w-5 h-5 text-orange-600 flex-shrink-0 fill-orange-600" />
                    <span className="text-sm text-gray-800 font-semibold">Desconto especial para novos pacientes</span>
                  </div>
                </div>

                {/* Botão Principal */}
                <ButtonWhatsApp
                  onClick={() => {
                    trackFormSubmission(true);
                    trackButtonClick('WhatsApp CTA Principal');
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-5 text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 mb-4"
                  message="Olá! Vi o site e gostaria de agendar uma avaliação na Clínica Fono Inova."
                >
                  Agendar Agora pelo WhatsApp
                </ButtonWhatsApp>


                {/* Prova Social */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    <strong>500+ famílias</strong> já agendaram pelo WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => {
          trackButtonClick('Close Booking Modal');
          setIsModalOpen(false);
        }}
        onBookingSuccess={() => {
          trackFormSubmission(true);
          trackButtonClick('Booking Success');
        }}
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
        title="Clínica Fono Inova em Anápolis | Desenvolvimento Infantil"
        description="Clínica multidisciplinar especializada em desenvolvimento infantil."
        image="/images/logo-seo.jpg"
        url="https://www.clinicafonoinova.com.br"
        type="website"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Clínica Fono Inova",
          "url": "https://www.clinicafonoinova.com.br",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.clinicafonoinova.com.br/?s={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }}
      />


      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Tooltip animado */}
        {/* Tooltip animado (abre modal, sem conversão) */}
        <button
          type="button"
          onClick={() => {
            trackButtonClick?.('Tooltip CTA - abrir modal');
            setIsModalOpen(true);
          }}
          className="bg-white px-4 py-3 rounded-xl shadow-2xl animate-bounce border-2 border-green-500 hidden md:block"
          aria-label="Abrir agendamento"
        >
          <p className="text-sm font-bold text-gray-800">💬 Agende sua consulta!</p>
          <p className="text-xs text-gray-600">Resposta em até 2h</p>
        </button>


        {/* Botão */}
        <button
          onClick={() => {
            // (opcional) seu analytics interno
            // trackWhatsAppClick?.();

            // Conversão Google Ads + abrir WhatsApp via callback
            reportWhatsappConversion(WHATSAPP_URL);
          }}
          className="relative bg-green-500 hover:bg-green-600 text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group animate-pulse hover:animate-none"
          aria-label="Agendar via WhatsApp"
        >
          <MessageCircle className="w-8 h-8" />

          {/* Badge de notificação */}
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center animate-pulse border-2 border-white">
            5
          </span>

          {/* Pulse effect */}
          <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
        </button>
      </div>

    </Layout >
  );
}

export default Home;