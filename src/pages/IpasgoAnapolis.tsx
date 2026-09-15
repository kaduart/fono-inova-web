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
  MapPin,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccessibilityWizard from '../components/AccessibilityWizard.js';
import Layout from '../components/Layout/index.jsx';
import SEO from '../components/SEO.jsx';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp.jsx';
import {
  trackButtonClick,
  trackPhoneCall,
} from '../hooks/useAnalytics';
import { useFormTracking } from '../hooks/useFormTracking.js';
import { schemaBaseLocalBusiness, schemaIpasgoAnapolis, schemaFAQIpasgoAnapolis } from '../schemas/clinicaSchemas.js';
import Breadcrumb from '../components/Breadcrumb';

const WHATSAPP_MESSAGE =
  "Oi! Tenho o convênio IPASGO e gostaria de saber como agendar uma avaliação. Pode me orientar?";

// Como funciona - 3 passos
const steps = [
  {
    number: "1",
    title: "Você chama no WhatsApp",
    description: "Confirme com nossa equipe a cobertura do convênio IPASGO para o atendimento que precisa",
    icon: MessageCircle,
  },
  {
    number: "2",
    title: "Confirmamos o convênio",
    description: "Verificamos a documentação e a especialidade certa para o seu caso",
    icon: ShieldCheck,
  },
  {
    number: "3",
    title: "Agendamos a avaliação",
    description: "Escolha o melhor horário e inicie o acompanhamento pelo convênio",
    icon: CheckCircle2,
  },
];

// Depoimentos destacados
const featuredTestimonials = [
  {
    stars: 5,
    text: "Meu filho não falava quase nada... hoje já conversa! A orientação fez toda diferença.",
    author: "Mãe do Pedro, 4 anos",
  },
  {
    stars: 5,
    text: "Finalmente entendemos o que estava acontecendo. A explicação clara nos deu segurança.",
    author: "Pai da Sofia, 5 anos",
  },
  {
    stars: 5,
    text: "Atendimento acolhedor desde o primeiro contato. Nos sentimos compreendidos.",
    author: "Mãe do Lucas, 3 anos",
  },
];

// Benefícios do convênio
const beneficios = [
  "Credenciados ao convênio IPASGO",
  "Atendimento no bairro Jundiaí, em Anápolis",
  "Atendimento multidisciplinar infantil",
];

const IpasgoAnapolis = () => {
  const [accessibilityWizardOpen, setAccessibilityWizardOpen] = useState(false);
  const { trackFormSubmission } = useFormTracking('LP_Ipasgo_Anapolis');

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
        title="Convênio IPASGO em Anápolis | Fono Inova"
        description="Clínica Fono Inova credenciada ao convênio IPASGO. Fonoaudiologia, psicologia, terapia ocupacional e fisioterapia infantil no bairro Jundiaí. Agende pelo WhatsApp (62) 99201-3573."
        keywords="convenio ipasgo anapolis, clinica atende ipasgo anapolis, ipasgo anapolis, fonoaudiologia ipasgo anapolis, convenio ipasgo"
        image="/images/og-image.jpg"
        url="https://www.clinicafonoinova.com.br/convenio-ipasgo-anapolis"
        type="website"
        schema={[schemaBaseLocalBusiness, schemaIpasgoAnapolis, schemaFAQIpasgoAnapolis]}
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
          { label: 'Convênios', href: '/' },
          { label: 'IPASGO' }
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
              {/* Badge GEO */}
              <span className="mb-4 inline-flex items-center bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 text-sm font-semibold rounded-full">
                Convênio IPASGO
              </span>

              {/* H1 - PAIN DRIVEN */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-900 leading-tight">
                <TypewriterText text="Você Tem o Convênio IPASGO e Procura Atendimento para seu Filho?" />
              </h1>

              {/* H2 - REASSURANCE */}
              <h2 className="text-xl md:text-2xl font-medium text-slate-600">
                A Fono Inova é credenciada ao convênio IPASGO — atendimento no bairro Jundiaí, em Anápolis
              </h2>

              {/* Parágrafo */}
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                Somos credenciados ao <strong className="text-slate-900">convênio IPASGO</strong> e atendemos com <strong>fonoaudiologia</strong>, <strong>psicologia infantil</strong>, <strong>terapia ocupacional</strong> e <strong>fisioterapia</strong>. Atendimento acolhedor, explicação clara e orientação prática em cada etapa.
              </p>

              {/* Benefícios rápidos */}
              <div className="flex flex-col gap-3 text-sm text-slate-600">
                {beneficios.map((beneficio, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>{beneficio}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <ButtonWhatsApp
                  onClick={() => {
                    trackFormSubmission?.(true);
                    trackButtonClick?.("WhatsApp LP Ipasgo Anapolis");
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  message={WHATSAPP_MESSAGE}
                >
                  Quero agendar pelo convênio IPASGO
                </ButtonWhatsApp>

                <a
                  href="tel:6237063924"
                  onClick={() => trackPhoneCall('(62) 3706-3924')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all whitespace-nowrap"
                >
                  <PhoneCall className="w-5 h-5" />
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
                  <img loading="lazy" decoding="async"
                    src="/images/sala-TO-clareada.png"
                    alt="Sala de terapia ocupacional da Clínica Fono Inova, no bairro Jundiaí, em Anápolis"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "center 55%" }}
                  />
                </div>

                <div className="absolute -top-4 -left-4 bg-white rounded-xl p-4 shadow-xl z-10">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-bold text-slate-900 text-sm">4.9 no Google</span>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-xl z-10">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    <span className="font-bold text-slate-900 text-sm">Credenciados IPASGO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== COMO FUNCIONA ==================== */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 mb-4">
              Como funciona o atendimento pelo convênio IPASGO
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Em 3 passos simples, você agenda a avaliação do seu filho
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

      {/* ==================== FAQ ==================== */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 mb-4">
              Perguntas Frequentes sobre o Convênio IPASGO
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {schemaFAQIpasgoAnapolis.mainEntity.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-2">{item.name}</h3>
                <p className="text-slate-600 leading-relaxed">{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA FINAL ==================== */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto text-center border-2 border-primary/10">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 mb-4">
              Agende pelo convênio IPASGO
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Fale com nossa equipe e confirme a cobertura para o atendimento do seu filho.
              Uma conversa pode te dar a direção que você precisa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <ButtonWhatsApp
                onClick={() => trackButtonClick("WhatsApp - CTA Final Ipasgo")}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center justify-center gap-2"
                message={WHATSAPP_MESSAGE}
              >
                Quero agendar pelo convênio IPASGO
              </ButtonWhatsApp>

              <a
                href="tel:6237063924"
                onClick={() => trackPhoneCall('(62) 3706-3924')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-all"
              >
                <PhoneCall className="w-5 h-5" />
                Ligar Agora
              </a>
            </div>

            <div className="pt-8 border-t border-slate-200">
              <div className="flex items-center justify-center gap-2 text-slate-600 mb-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="font-medium">Clínica Fono Inova — bairro Jundiaí, Anápolis</span>
              </div>
              <p className="text-sm text-slate-500">
                Bairro Jundiaí, Anápolis - GO • Atendimento: Segunda a Sexta, 8h às 18h
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== INTERNAL LINKING ==================== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              Especialidades atendidas pelo convênio IPASGO
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                to="/fonoaudiologia-anapolis"
                className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-primary/30 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Fonoaudiologia</h4>
                    <p className="text-sm text-slate-500">Desenvolvimento da fala infantil</p>
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

              <Link
                to="/terapia-ocupacional-anapolis"
                className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-primary/30 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Baby className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Terapia Ocupacional</h4>
                    <p className="text-sm text-slate-500">Desenvolvimento motor</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>

              <Link
                to="/fisioterapia-infantil-anapolis"
                className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-primary/30 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Fisioterapia Infantil</h4>
                    <p className="text-sm text-slate-500">Reabilitação e estimulação motora</p>
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
    </Layout>
  );
};

export default IpasgoAnapolis;
