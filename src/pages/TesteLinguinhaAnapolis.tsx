import { Mail, Phone, Star } from '@mui/icons-material';
import { Badge, Button } from '@mui/material';
import {
  Accessibility,
  ArrowRight,
  Award,
  Baby,
  Brain,
  CheckCircle2,
  ChevronRight,
  Clock,
  Facebook,
  GraduationCap,
  Instagram,
  MapPin,
  PhoneCall,
  Scissors,
  Sparkles,
  Youtube,
  Heart,
  MessageCircle
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccessibilityWizard from '../components/AccessibilityWizard.js';
import BookingModal from '../components/BookingModal.jsx';
import ImageCarousel from '../components/ImageCarousel.jsx';
import Layout from '../components/Layout/index.jsx';
import SEO from '../components/SEO.jsx';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp.jsx';
import { reportWhatsappConversion } from '../helper/analytics.js';
import {
  trackButtonClick,
  trackPhoneCall,
  trackSocialMediaClick,
  trackWhatsAppClick
} from '../hooks/useAnalytics';
import { useFormTracking } from '../hooks/useFormTracking.js';
import { schemaBaseLocalBusiness, schemaTesteLinguinhaAnapolis, schemaFAQTesteLinguinha } from '../schemas/clinicaSchemas.js';
import Breadcrumb from '../components/Breadcrumb';
import { testeLinguinhaSEO } from '../data/seoStructures.js';
import SEOStructuredContent from '../components/SEOStructuredContent.js';

const WHATSAPP_URL =
  "https://wa.me/5562992013573?text=Olá! Vi o site da Clínica Fono Inova e gostaria de agendar o teste da linguinha.";

// Dados das dores/situações para identificação
const painPoints = [
  {
    icon: Baby,
    title: "Dificuldade para sugar/mamar",
    description: "Bebê não consegue fazer a pega correta, cansa rápido na mamada ou perde peso",
    color: "orange",
    link: "/teste-da-linguinha-anapolis",
    whatsappMsg: "Oi! Vi o site da Clínica Fono Inova 💚\nMeu bebê tem dificuldade para mamar. Pode me orientar?",
  },
  {
    icon: MessageCircle,
    title: "Dificuldade para falar",
    description: "Criança troca letras, não pronuncia bem o 'L' e 'R', ou fala 'arrastado'",
    color: "blue",
    link: "/teste-da-linguinha-anapolis",
    whatsappMsg: "Oi! Vi o site da Clínica Fono Inova 💚\nMeu filho tem dificuldade para falar. Pode me orientar?",
  },
  {
    icon: Heart,
    title: "Suspeita de freio curto (ankyloglossia)",
    description: "A língua parece presa, não sobe no céu da boca ou tem formato de coração na ponta",
    color: "purple",
    link: "/teste-da-linguinha-anapolis",
    whatsappMsg: "Oi! Vi o site da Clínica Fono Inova 💚\nSuspeito que meu filho tem freio lingual curto. Pode me orientar?",
  },
  {
    icon: Scissors,
    title: "Já foi indicada frenectomia",
    description: "Médico ou dentista sugeriu o procedimento e você quer uma segunda opinião especializada",
    color: "emerald",
    link: "/teste-da-linguinha-anapolis",
    whatsappMsg: "Oi! Vi o site da Clínica Fono Inova 💚\nIndicaram frenectomia para meu filho. Pode me orientar?",
  },
  {
    icon: Brain,
    title: "Dificuldade de mobilidade lingual",
    description: "Não consegue lamber os lábios, movimentar a língua para os lados ou 'clicar'",
    color: "pink",
    link: "/teste-da-linguinha-anapolis",
    whatsappMsg: "Oi! Vi o site da Clínica Fono Inova 💚\nMeu filho tem dificuldade de mexer a língua. Pode me orientar?",
  },
  {
    icon: Clock,
    title: "Quero diagnóstico precoce",
    description: "Meu bebê é recém-nascido e quero fazer a avaliação preventiva do freio lingual",
    color: "teal",
    link: "/teste-da-linguinha-anapolis",
    whatsappMsg: "Oi! Vi o site da Clínica Fono Inova 💚\nQuero fazer o teste da linguinha do meu bebê. Pode me orientar?",
  },
];

// Como funciona - 3 passos
const steps = [
  {
    number: "1",
    title: "Agende o Teste da Linguinha",
    description: "Marque uma avaliação especializada em freio lingual em Anápolis",
    icon: MessageCircle,
  },
  {
    number: "2",
    title: "Avaliação completa",
    description: "Avaliamos a mobilidade, função e impacto do freio lingual na alimentação e fala",
    icon: Brain,
  },
  {
    number: "3",
    title: "Orientação e tratamento",
    description: "Receba o diagnóstico e indicação do melhor tratamento para seu filho",
    icon: CheckCircle2,
  },
];

// Depoimentos destacados
const featuredTestimonials = [
  {
    stars: 5,
    text: "Descobrimos o freio curto do bebê com apenas 5 dias de vida. A orientação foi fundamental para a amamentação!",
    author: "Mãe do Rafael, 3 meses",
  },
  {
    stars: 5,
    text: "Minha filha troca o R e o L. Depois do teste, entendemos que não era só fonoaudiologia, mas também o freio.",
    author: "Mãe da Laura, 6 anos",
  },
  {
    stars: 5,
    text: "Atendimento excelente! Fizemos a avaliação completa e tivemos toda orientação necessária.",
    author: "Pai do Gabriel, 2 anos",
  },
];

const TesteLinguinhaAnapolis = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accessibilityWizardOpen, setAccessibilityWizardOpen] = useState(false);
  const [selectedPain, setSelectedPain] = useState<number | null>(null);
  const { trackFieldInteraction, trackFormSubmission } = useFormTracking('LP_Teste_Linguinha_Anapolis');

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
    trackButtonClick(`Scroll to ${sectionId}`);
  };

  const handlePainClick = (index: number) => {
    setSelectedPain(index);
    trackButtonClick(`Pain Point Click - ${painPoints[index].title}`);
  };

  const handleOpenAccessibility = () => {
    trackButtonClick('Open Accessibility Wizard');
    setAccessibilityWizardOpen(true);
  };

  useEffect(() => {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.setAttribute('type', 'image/png');
    link.setAttribute('rel', 'shortcut icon');
    link.setAttribute('href', '/images/icone-colorido.png');
    document.head.appendChild(link);
  }, []);

  return (
    <Layout>
      {/* SEO otimizado para LP de conversão */}
      <SEO
        title="Teste da Linguinha em Anápolis | Diagnóstico de Freio Lingual | Clínica Fono Inova"
        description="Teste da linguinha em Anápolis. Diagnóstico precoce de freio lingual (ankyloglossia) para bebês e crianças. Avaliação especializada de sucção, fala e mobilidade. Agende na Clínica Fono Inova."
        keywords="teste da linguinha anápolis, freio lingual anápolis, frenectomia anápolis, ankyloglossia anápolis, dificuldade para mamar anápolis, avaliação freio lingual anápolis"
        image="/images/og-image.jpg"
        url="https://www.clinicafonoinova.com.br/teste-da-linguinha-anapolis"
        type="website"
        schema={[schemaBaseLocalBusiness, schemaTesteLinguinhaAnapolis, schemaFAQTesteLinguinha]}
      />

      {/* Botão de Acessibilidade */}
      <div className="fixed bottom-32 right-4 z-50">
        <button
          onClick={handleOpenAccessibility}
          className="p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-110 flex items-center justify-center"
          aria-label="Configurações de acessibilidade"
        >
          <Accessibility className="h-6 w-6" />
        </button>
      </div>

      <AccessibilityWizard
        open={accessibilityWizardOpen}
        onClose={() => {
          trackButtonClick('Close Accessibility Wizard');
          setAccessibilityWizardOpen(false);
        }}
      />

      {/* ==================== BREADCRUMB ==================== */}
      <Breadcrumb 
        items={[
          { label: 'Freio Lingual', href: '/freio-lingual' },
          { label: 'Teste da Linguinha em Anápolis' }
        ]} 
      />

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-screen pt-24 pb-12 md:pt-28 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-teal-50/40 to-cyan-50/30" />
        <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-gradient-to-br from-teal-200/30 to-cyan-200/20 rounded-full blur-3xl opacity-70" />
        <div className="absolute top-40 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-amber-200/30 to-orange-200/20 rounded-full blur-3xl opacity-60" />

        <div className="relative container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
            {/* Text Content */}
            <div className="order-2 lg:order-1 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full shadow-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Clínica Multidisciplinar em Anápolis
                </span>
              </div>

              {/* H1 */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-900 leading-tight">
                Teste da Linguinha em{" "}
                <span className="text-primary relative inline-block after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-full after:h-2 after:bg-primary/20 after:rounded-full">Anápolis</span>
              </h1>

              {/* H2 Especialidade */}
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-700">
                Diagnóstico precoce de frenectomia
              </h2>

              {/* H2 Dor */}
              <p className="text-xl md:text-2xl text-slate-700 leading-relaxed max-w-xl font-medium">
                Seu filho apresenta dificuldade para sugar, mamar ou falar?
              </p>

              {/* Parágrafo */}
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                O <strong className="text-slate-900">Teste da Linguinha</strong> na{" "}
                <strong className="text-slate-900">Clínica Fono Inova</strong> em Anápolis identifica precocemente
                problemas no freio lingual (ankyloglossia) que podem prejudicar a amamentação, alimentação e fala.
                Diagnóstico rápido e orientação especializada para bebês e crianças.
              </p>

              {/* Benefícios rápidos */}
              <div className="flex flex-col sm:flex-row gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Diagnóstico precoce</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Avaliação especializada</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Para bebês e crianças</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <ButtonWhatsApp
                  onClick={() => {
                    trackFormSubmission?.(true);
                    trackButtonClick?.("WhatsApp LP Teste Linguinha");
                  }}
                  
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  message="Oi! Vi o site sobre o Teste da Linguinha em Anápolis 💚\nQuero agendar uma avaliação para meu filho."
                >
                  Agendar Teste da Linguinha
                </ButtonWhatsApp>
                
                <a
                  href="tel:6237063924"
                  onClick={() => trackPhoneCall('(62) 3706-3924')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all whitespace-nowrap"
                >
                  Ligar (62) 3706-3924
                </a>
              </div>

              {/* Prova social */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-slate-600">4.9 no Google • +500 famílias atendidas</span>
              </div>
            </div>

            {/* Image Section */}
            <div className="order-1 lg:order-2 relative w-full">
              <div className="relative">
                <div className="w-full h-72 sm:h-96 md:h-[450px] rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="/images/freio-lingual/mae-bb.jpeg" 
                    alt="Teste da Linguinha em Anápolis - Diagnóstico precoce"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-xl z-10">
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="font-bold text-slate-900">4.9</span>
                    <span className="text-xs text-slate-500">Google</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SEÇÃO DE IDENTIFICAÇÃO - DORES ==================== */}
      <section id="identificacao" className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-50 text-purple-600 border-purple-200 px-4 py-1.5 text-sm font-semibold">
              Quando fazer o Teste?
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-poppins text-slate-900 mb-4">
              Você se identifica com{" "}
              <span className="text-primary relative inline-block after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-full after:h-2 after:bg-primary/20 after:rounded-full">alguma dessas situações?</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Selecione abaixo o que mais se encaixa com a necessidade do seu filho
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {painPoints.map((pain, index) => {
              const Icon = pain.icon;
              const isSelected = selectedPain === index;
              const colorClasses: Record<string, { bg: string; border: string; text: string; hover: string }> = {
                orange: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-600", hover: "hover:border-orange-400" },
                blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-600", hover: "hover:border-blue-400" },
                purple: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-600", hover: "hover:border-purple-400" },
                emerald: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-600", hover: "hover:border-emerald-400" },
                pink: { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-600", hover: "hover:border-pink-400" },
                teal: { bg: "bg-teal-50", border: "border-teal-200", text: "text-teal-600", hover: "hover:border-teal-400" },
              };
              const colors = colorClasses[pain.color];

              return (
                <button
                  key={index}
                  onClick={() => handlePainClick(index)}
                  className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
                    isSelected
                      ? `${colors.bg} ${colors.border} shadow-xl scale-[1.02]`
                      : `bg-white border-slate-100 ${colors.hover} hover:shadow-lg hover:-translate-y-1`
                  }`}
                >
                  <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-7 h-7 ${colors.text}`} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{pain.title}</h3>
                  <p className="text-sm text-slate-600">{pain.description}</p>
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-slate-600 mb-4">
              Não sabe se precisa do teste?{" "}
              <span className="font-semibold text-primary">Nós te ajudamos a descobrir</span>
            </p>
            <ButtonWhatsApp
              onClick={() => trackButtonClick("WhatsApp - Identificação")}
              
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
              message={selectedPain !== null ? painPoints[selectedPain].whatsappMsg : "Oi! Vi o site sobre Teste da Linguinha 💚\nQuero saber se meu filho precisa fazer o teste."}
            >
              Falar com especialista no WhatsApp
            </ButtonWhatsApp>
          </div>
        </div>
      </section>

      {/* ==================== COMO FUNCIONA ==================== */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 mb-4">
              Como funciona o Teste da Linguinha
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Em 3 passos simples, descubra se seu filho precisa de intervenção no freio lingual
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-primary/20 mb-2">{step.number}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== PROVA SOCIAL ==================== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
            {[
              { value: "500+", label: "Famílias Atendidas", icon: Award },
              { value: "4.9/5", label: "Avaliação Google", icon: Star },
              { value: "12+", label: "Especialistas", icon: GraduationCap },
              { value: "10+", label: "Anos de Experiência", icon: Clock },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg border border-slate-100">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Depoimentos */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 mb-4">
              O que as famílias dizem
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {featuredTestimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl shadow-lg border border-slate-100">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 mb-4 italic">"{testimonial.text}"</p>
                <p className="text-sm text-slate-500 font-medium">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CONTEÚDO SEO ESTRUTURADO ==================== */}
      <SEOStructuredContent 
        seoData={testeLinguinhaSEO} 
        showFAQ={true}
        customFAQTitle="Perguntas Frequentes sobre o Teste da Linguinha"
      />

      {/* ==================== INTERNAL LINKING ==================== */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-poppins text-slate-900 mb-6">
              Outras especialidades que podem ajudar seu filho
            </h2>
            <p className="text-slate-600 mb-8">
              Na Clínica Fono Inova oferecemos atendimento multidisciplinar completo para o desenvolvimento infantil
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/fonoaudiologia-anapolis"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-primary/20 rounded-xl font-semibold text-primary hover:bg-primary hover:text-white transition-all"
              >
                Fonoaudiologia em Anápolis
              </Link>
              <Link
                to="/psicomotricidade-anapolis"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-primary/20 rounded-xl font-semibold text-primary hover:bg-primary hover:text-white transition-all"
              >
                Psicomotricidade em Anápolis
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA FINAL ==================== */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto text-center border-2 border-primary/10">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 mb-4">
              Não espere mais para fazer o Teste da Linguinha
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              O diagnóstico precoce do freio lingual pode fazer toda diferença na alimentação e fala do seu filho.
              Agende uma avaliação na Clínica Fono Inova.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <ButtonWhatsApp
                onClick={() => trackButtonClick("WhatsApp - CTA Final")}
                
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center justify-center gap-2"
                message="Oi! Vi o site sobre Teste da Linguinha 💚\nQuero agendar uma avaliação para meu filho."
              >
                Agendar Teste pelo WhatsApp
              </ButtonWhatsApp>
              
              <a
                href="tel:6237063924"
                onClick={() => trackPhoneCall('(62) 3706-3924')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-all"
              >
                Ligar Agora
              </a>
            </div>

            <div className="pt-8 border-t border-slate-200">
              <div className="flex items-center justify-center gap-2 text-slate-600 mb-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="font-medium">Clínica Fono Inova</span>
              </div>
              <p className="text-sm text-slate-500">
                Anápolis - GO • Atendimento: Segunda a Sexta, 8h às 18h
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Link para Home institucional */}
      <div className="bg-slate-100 py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-slate-600">
            Conheça mais sobre a{" "}
            <Link to="/" className="text-primary font-semibold hover:underline">
              Clínica Fono Inova
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default TesteLinguinhaAnapolis;
