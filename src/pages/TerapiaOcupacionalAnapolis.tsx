import { Badge } from '@mui/material';
import GoogleReviews from '../components/premium/GoogleReviews';
import AlertSigns from '../components/premium/AlertSigns';
import TypewriterText from '../components/TypewriterText';
import {
  Accessibility,
  ArrowRight,
  Award,
  Baby,
  Brain,
  CheckCircle2,
  Clock,
  GraduationCap,
  Hand,
  Heart,
  MapPin,
  MessageCircle,
  Mic,
  PhoneCall,
  School,
  Smile,
  Star,
  Target,
  AlertTriangle
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccessibilityWizard from '../components/AccessibilityWizard.js';
import Layout from '../components/Layout/index.jsx';
import SEO from '../components/SEO.jsx';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp.jsx';
import { reportWhatsappConversion } from '../helper/analytics.js';
import {
  trackButtonClick,
  trackPhoneCall,
} from '../hooks/useAnalytics';
import { useFormTracking } from '../hooks/useFormTracking.js';
import { schemaBaseLocalBusiness, schemaTerapiaOcupacionalAnapolis, schemaFAQTO } from '../schemas/clinicaSchemas.js';
import Breadcrumb from '../components/Breadcrumb';
import { terapiaOcupacionalSEO } from '../data/seoStructures.js';
import SEOStructuredContent from '../components/SEOStructuredContent.js';
import ClinicGallery from '../components/ClinicGallery';
import PageFooterInfo from '../components/premium/PageFooterInfo';
import DifferentialSection from '../components/premium/DifferentialSection';
import ProofBar from '../components/premium/ProofBar';
import FixedWhatsAppBar from '../components/FixedWhatsAppBar.jsx';

const WHATSAPP_URL =
  "https://wa.me/5562992013573?text=Oi! Meu filho é desastrado/tropeça muito, isso é normal?";

// Como funciona - 3 passos
const steps = [
  {
    number: "1",
    title: "Você chama no WhatsApp",
    description: "Tire suas dúvidas com nossa equipe em poucos minutos",
    icon: MessageCircle,
  },
  {
    number: "2",
    title: "Entendemos seu caso",
    description: "Avaliamos as necessidades do seu filho de forma personalizada",
    icon: Brain,
  },
  {
    number: "3",
    title: "Agendamos a conversa",
    description: "Escolha o melhor horário para iniciar a orientação",
    icon: CheckCircle2,
  },
];

// Depoimentos destacados
const featuredTestimonials = [
  {
    stars: 5,
    text: "Minha filha melhorou muito a coordenação. A orientação nos deu exercícios práticos para fazer em casa.",
    author: "Mãe da Valentina, 5 anos",
  },
  {
    stars: 5,
    text: "Finalmente entendemos por que nosso filho era tão desastrado. A explicação clara mudou nossa forma de ajudar.",
    author: "Pai do Matheus, 7 anos",
  },
  {
    stars: 5,
    text: "Profissionais dedicados que nos orientaram passo a passo. Hoje nossa filha é mais independente.",
    author: "Mãe da Laura, 4 anos",
  },
];

// Sinais de alerta
const sinaisAlerta = [
  "Tropeça muito ou é desastrado",
  "Dificuldade para se vestir sozinho",
  "Não consegue segurar lápis corretamente",
  "Evita brincadeiras motoras",
  "Problemas de equilíbrio e coordenação"
];

const TerapiaOcupacionalAnapolis = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accessibilityWizardOpen, setAccessibilityWizardOpen] = useState(false);
  const { trackFieldInteraction, trackFormSubmission } = useFormTracking('LP_Terapia_Ocupacional_Anapolis');

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
    trackButtonClick(`Scroll to ${sectionId}`);
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
        title="Terapia Ocupacional Infantil em Anápolis | Fono Inova"
        description="Terapia ocupacional infantil em Anápolis: coordenação, integração sensorial e autonomia no dia a dia. Avaliação e plano personalizado. Nota 5,0 no Google. Agende pelo WhatsApp."
        keywords="meu filho é desastrado, terapia ocupacional anápolis, coordenação motora anápolis, integração sensorial anápolis, to infantil anápolis"
        image="/images/og-image.jpg"
        url="https://www.clinicafonoinova.com.br/terapia-ocupacional-anapolis"
        type="website"
        schema={[schemaBaseLocalBusiness, schemaTerapiaOcupacionalAnapolis]}
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
          { label: 'Terapia Ocupacional em Anápolis' }
        ]} 
      />

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative pt-28 pb-12 md:pt-36 md:pb-20 overflow-clip">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-emerald-50/40 to-teal-50/30" />
        <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-gradient-to-br from-emerald-200/30 to-teal-200/20 rounded-full blur-3xl opacity-70" />
        <div className="absolute top-40 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-amber-200/30 to-orange-200/20 rounded-full blur-3xl opacity-60" />

        <div className="relative container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center lg:items-start">
            {/* Text Content */}
            <div className="order-2 lg:order-1 space-y-6">
              {/* Badge */}
              <span className="mb-4 inline-flex items-center bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 text-sm font-semibold rounded-full">
                Terapia Ocupacional Infantil em Anápolis
              </span>

              {/* H1 - PAIN DRIVEN */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-900 leading-tight">
                <TypewriterText text="Seu Filho é Desastrado, Tropeça Muito ou Tem Dificuldade de Coordenação?" />
              </h1>

              {/* H2 - REASSURANCE */}
              <h2 className="text-xl md:text-2xl font-medium text-slate-600">
                Entenda o que pode estar acontecendo com uma orientação inicial em Anápolis — sem compromisso
              </h2>

              {/* BLOCO DE SINAIS DE ALERTA */}
              <AlertSigns title="Sinais de alerta" items={sinaisAlerta} className="mb-6" />

              {/* Parágrafo */}
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                Na <strong className="text-slate-900">Clínica Fono Inova</strong>, em <strong>Anápolis</strong>, ajudamos pais a entenderem o desenvolvimento motor do filho. Oferecemos <strong>atendimento acolhedor</strong>, <strong>explicação clara</strong> do que está acontecendo e <strong>orientação prática</strong> para a família.
              </p>

              {/* Benefícios rápidos - ATUALIZADOS */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 [&_span]:whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Atendimento acolhedor</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Explicação clara do que está acontecendo</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Orientação prática para os pais</span>
                </div>
              </div>

              {/* CTAs - ATUALIZADOS */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <ButtonWhatsApp
                  onClick={() => {
                    trackFormSubmission?.(true);
                    trackButtonClick?.("WhatsApp LP Terapia Ocupacional");
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  message="Oi! Meu filho é desastrado/tropeça muito, isso é normal?"
                >
                  Quero tirar uma dúvida no WhatsApp
                </ButtonWhatsApp>
                
                <a
                  href="tel:62992013573"
                  onClick={() => trackPhoneCall('(62) 99201-3573')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all whitespace-nowrap"
                >
                  Ligar (62) 99201-3573
                </a>
              </div>

              {/* Prova social */}
            </div>

            {/* Image Section */}
            <div className="order-1 lg:order-2 relative w-full lg:mt-14 lg:sticky lg:top-28">
              <div className="relative">
                <div className="w-full h-72 sm:h-96 md:h-[450px] lg:h-[560px] rounded-3xl overflow-hidden shadow-2xl">
                  <img loading="lazy" decoding="async" 
                    src="/images/terapia-ocupacional/to1.jpg" 
                    alt="Terapia Ocupacional em Anápolis - Atendimento especializado"
                    className="w-full h-full object-cover"
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <ProofBar className="-mt-8 md:-mt-10" />

      {/* ==================== COMO FUNCIONA ==================== */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 mb-4">
              Como funciona na Clínica Fono Inova
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Em 3 passos simples, você entende melhor o desenvolvimento motor do seu filho
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
              { value: "5.0/5", label: "Avaliação Google", icon: Star },
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

      {/* ==================== CONTEÚDO SEO EXPANDIDO ==================== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h2 className="text-3xl font-bold font-poppins text-slate-900 mb-8 text-center">
            Terapia Ocupacional Infantil em Anápolis
          </h2>
          <div className="prose prose-lg max-w-none text-slate-600 space-y-6">
            <p>
              A <strong>terapia ocupacional infantil</strong> ajuda crianças a desenvolverem habilidades do dia a dia, como 
              coordenação motora, equilíbrio, organização e integração sensorial. Na Clínica Fono Inova, em Anápolis, 
              o atendimento é individualizado e lúdico, respeitando o ritmo de cada criança.
            </p>
            <p>
              Muitos pais procuram a terapia ocupacional quando o filho tropeça muito, tem dificuldade para se vestir, 
              apresenta hipersensibilidade a texturas ou sons, ou enfrenta desafios na escola relacionados à motricidade 
              e atenção. Esses sinais podem indicar atrasos no desenvolvimento neuropsicomotor que, quando tratados cedo, 
              têm resultados muito melhores.
            </p>
            <p>
              Nossa equipe, localizada no bairro Jundiaí em Anápolis, avalia cada caso de forma multidisciplinar. 
              Quando necessário, a terapia ocupacional atua junto com a fonoaudiologia, psicologia e neuropediatria 
              para garantir um cuidado completo ao desenvolvimento infantil.
            </p>
            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Quando procurar terapia ocupacional?</h3>
            <ul className="space-y-3 list-disc pl-6">
              <li>Criança muito desastrada ou que tropeça frequentemente</li>
              <li>Dificuldade para segurar lápis, tesoura ou objetos pequenos</li>
              <li>Rejeição intensa a texturas, cheiros ou sons</li>
              <li>Atraso na coordenação motora grossa ou fina</li>
              <li>Dificuldades de organização e planejamento de tarefas</li>
              <li>Problemas de autonomia nas atividades diárias</li>
            </ul>
            <p>
              Agende uma avaliação de terapia ocupacional infantil em Anápolis e descubra como podemos ajudar 
              seu filho a desenvolver todo o seu potencial.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== CONTEÚDO SEO ESTRUTURADO ==================== */}
      <SEOStructuredContent 
        seoData={terapiaOcupacionalSEO} 
        showFAQ={true}
        customFAQTitle="Perguntas Frequentes sobre Terapia Ocupacional"
      />

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-8 text-center text-2xl md:text-3xl font-bold font-poppins text-slate-900">O que as famílias dizem</h2>
          <GoogleReviews count={3} offset={15} title="" />
        </div>
      </section>

      <PageFooterInfo related={['/psicomotricidade-anapolis', '/autismo-anapolis', '/fisioterapia-infantil-anapolis', '/seletividade-alimentar-anapolis']} whatsappMessage="Oi! Vi a página de terapia ocupacional da Fono Inova e gostaria de entender como funciona o atendimento." />

      <DifferentialSection photo="toCoordenacao" whatsappMessage="Oi! Vi a página de terapia ocupacional da Fono Inova e gostaria de entender como funciona o atendimento." />

      <ClinicGallery variant="carousel" />

      {/* ==================== CTA FINAL ==================== */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto text-center border-2 border-primary/10">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 mb-4">
              Tire sua dúvida agora
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Entenda o que está acontecendo com o desenvolvimento motor do seu filho.
              Uma conversa pode te dar a direção que você precisa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <ButtonWhatsApp
                onClick={() => trackButtonClick("WhatsApp - CTA Final")}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center justify-center gap-2"
                message="Oi! Meu filho é desastrado/tropeça muito, isso é normal?"
              >
                Quero tirar uma dúvida no WhatsApp
              </ButtonWhatsApp>
              
              <a
                href="tel:62992013573"
                onClick={() => trackPhoneCall('(62) 99201-3573')}
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

      {/* ==================== INTERNAL LINKING ==================== */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              Outras especialidades em Anápolis
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                to="/fonoaudiologia-anapolis"
                className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-primary/30 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                    <Mic className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Fonoaudiologia</h4>
                    <p className="text-sm text-slate-500">Atraso de fala e linguagem</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>

              <Link
                to="/psicologia-infantil-anapolis"
                className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-primary/30 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Psicologia Infantil</h4>
                    <p className="text-sm text-slate-500">Comportamento e aprendizagem</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
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
      <FixedWhatsAppBar message="Oi! Vi a página de terapia ocupacional da Fono Inova e gostaria de entender como funciona o atendimento." />
    </Layout>
  );
};

export default TerapiaOcupacionalAnapolis;
