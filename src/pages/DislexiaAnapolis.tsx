import { AlertTriangle, Brain, CheckCircle2, MessageCircle } from 'lucide-react';
import AlertSigns from '../components/premium/AlertSigns';
import GoogleReviews from '../components/premium/GoogleReviews';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import Layout from '../components/Layout/index.jsx';
import TypewriterText from '../components/TypewriterText';
import SEO from '../components/SEO.jsx';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp.jsx';
import { trackButtonClick } from '../hooks/useAnalytics';
import { schemaBaseLocalBusiness } from '../schemas/clinicaSchemas.js';
import FAQSection from '../components/FAQSection';
import { faqDislexia } from '../data/faqPaginas';
import ClinicGallery from '../components/ClinicGallery';
import PageFooterInfo from '../components/premium/PageFooterInfo';
import DifferentialSection from '../components/premium/DifferentialSection';
import FixedWhatsAppBar from '../components/FixedWhatsAppBar.jsx';
import ProofBar from '../components/premium/ProofBar';

const WHATSAPP_MSG = "Oi! Meu filho tem dificuldade para ler e escrever e quero entender se pode ser dislexia. Pode me ajudar?";

const sinaisAlerta = [
  "Troca letras ao ler ou escrever (b/d, p/q)",
  "Leitura lenta, travada e sem fluência",
  "Dificuldade para memorizar palavras simples",
  "Evita ler em voz alta na escola",
  "Esforço muito maior que os colegas para aprender",
  "Desempenho escolar abaixo do esperado para a inteligência",
];

const steps = [
  { number: "1", title: "Você chama no WhatsApp", desc: "Fala o que está observando — orientamos os próximos passos", icon: MessageCircle },
  { number: "2", title: "Avaliação psicopedagógica", desc: "Identificamos o perfil de aprendizagem e possível dislexia", icon: Brain },
  { number: "3", title: "Acompanhamento especializado", desc: "Intervenção multissensorial para leitura e escrita em Anápolis", icon: CheckCircle2 },
];

const relacionados = [
  { href: '/avaliacao-neuropsicologica-dificuldade-escolar', label: 'Avaliação para Dificuldade Escolar' },
  { href: '/avaliacao-neuropsicologica-anapolis', label: 'Avaliação Neuropsicológica em Anápolis' },
  { href: '/psicopedagogia', label: 'Psicopedagogia em Anápolis' },
];


export default function DislexiaAnapolis() {
  useEffect(() => {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.setAttribute('type', 'image/png');
    link.setAttribute('rel', 'shortcut icon');
    link.setAttribute('href', '/images/icone-colorido.png');
    document.head.appendChild(link);
  }, []);

  return (
    <Layout>
      <SEO
        title="Dislexia Infantil em Anápolis | Avaliação e Tratamento — Fono Inova"
        description="Seu filho troca letras, tem dificuldade para ler ou escrever em Anápolis? Avaliação psicopedagógica completa para dislexia. Bairro Jundiaí. Agende: (62) 99201-3573."
        keywords="dislexia anapolis, dislexia infantil anapolis, tratamento dislexia anapolis, avaliação dislexia anapolis, criança troca letra anapolis, dificuldade leitura anapolis"
        url="https://www.clinicafonoinova.com.br/dislexia-anapolis"
        image="/images/og-image.jpg"
        type="website"
        schema={[schemaBaseLocalBusiness]}
      />

      <Breadcrumb items={[
        { label: 'Avaliação Escolar', href: '/avaliacao-neuropsicologica-anapolis' },
        { label: 'Dislexia em Anápolis' },
      ]} />

      {/* ========== HERO ========== */}
      <section className="relative min-h-[90vh] pt-24 pb-16 md:pt-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30" />
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-blue-200/30 to-indigo-200/20 rounded-full blur-3xl opacity-70" />

        <div className="relative container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid items-start gap-10 pt-8 lg:grid-cols-2 lg:gap-14">
          <div className="space-y-6 text-center lg:text-left">

            <span className="inline-flex items-center bg-blue-50 text-blue-700 border border-blue-200 px-4 py-1.5 text-sm font-semibold rounded-full">
              Dislexia Infantil em Anápolis
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-900 leading-tight">
              <TypewriterText text="Seu Filho Se Esforça Muito, mas Ainda Tem Dificuldade para Ler?" />
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed">
              Dislexia não é preguiça — é uma dificuldade de aprendizagem real que pode ser
              tratada. Com acompanhamento especializado em <strong>Anápolis</strong>,
              seu filho pode superar os desafios da leitura e escrita.
            </p>

            <AlertSigns title="Sinais que podem indicar dislexia" items={sinaisAlerta} className="mb-6" />

            <ButtonWhatsApp
              onClick={() => trackButtonClick('WA_Dislexia_Hero')}
              message={WHATSAPP_MSG}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg"
            >
              Quero Avaliar a Dislexia do Meu Filho
            </ButtonWhatsApp>
          </div>
          <div className="mx-auto w-full max-w-md lg:mt-[4.5rem] lg:max-w-none">
            <img
              src="/images/hero/dislexia-hero.webp"
              alt="Menina lendo um livro ilustrado com apoio de uma psicopedagoga em atendimento de dislexia infantil em Anápolis"
              width={1200}
              height={1500}
              fetchPriority="high"
              className="w-full rounded-3xl object-cover shadow-2xl shadow-slate-900/10"
            />
          </div>
          </div>
        </div>
      </section>

      <ProofBar className="py-6" />


      {/* ========== COMO FUNCIONA ========== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h2 className="text-3xl font-bold font-poppins text-slate-900 mb-10 text-center">
            Como Funciona o Tratamento em Anápolis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map(step => (
              <div key={step.number} className="text-center space-y-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <step.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-600">{step.number}</div>
                <h3 className="font-semibold text-slate-900">{step.title}</h3>
                <p className="text-sm text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== AUTORIDADE LOCAL ========== */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center space-y-6">
          <h2 className="text-3xl font-bold font-poppins text-slate-900">
            Fono Inova — Especialistas em Dislexia em Anápolis
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            No bairro <strong>Jundiaí</strong>, Anápolis, a Clínica Fono Inova tem
            psicopedagoga especializada em dificuldades de aprendizagem, incluindo
            dislexia, disgrafia e discalculia. Quando indicado, realizamos encaminhamento
            para <Link to="/neuropediatra-anapolis" className="text-primary font-semibold hover:underline">neuropediatra em Anápolis</Link> para investigação médica do neurodesenvolvimento.
            Avaliação completa e intervenção multissensorial para que seu filho aprenda com mais facilidade e confiança.
          </p>
          <ButtonWhatsApp
            onClick={() => trackButtonClick('WA_Dislexia_Sobre')}
            message={WHATSAPP_MSG}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-semibold"
          >
            Agendar Avaliação em Anápolis
          </ButtonWhatsApp>
        </div>
      </section>

      {/* ========== LINKS RELACIONADOS ========== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h2 className="text-2xl font-bold font-poppins text-slate-900 mb-8 text-center">
            Atendimentos Relacionados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relacionados.map(link => (
              <Link key={link.href} to={link.href}
                className="block p-4 border border-slate-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-colors text-center text-sm font-medium text-slate-700 hover:text-primary">
                {link.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-8 text-center text-2xl md:text-3xl font-bold font-poppins text-slate-900">O que as famílias dizem</h2>
          <GoogleReviews count={3} offset={18} title="" />
        </div>
      </section>

      <FAQSection faqs={faqDislexia} title="Perguntas frequentes sobre dislexia" subtitle="Tire suas dúvidas sobre leitura, avaliação e tratamento" />

      <PageFooterInfo related={['/psicopedagogia', '/fonoaudiologia-anapolis', '/avaliacao-neuropsicologica-dificuldade-escolar', '/avaliacao-neuropsicologica-anapolis']} whatsappMessage="Oi! Vi a página de dislexia da Fono Inova e gostaria de entender como funciona o atendimento." />

      <DifferentialSection photo="dislexiaLeitura" whatsappMessage="Oi! Vi a página de dislexia da Fono Inova e gostaria de entender como funciona o atendimento." />

      <ClinicGallery variant="carousel" />

      {/* ========== CTA FINAL ========== */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl text-center space-y-6">
          <h2 className="text-3xl font-bold font-poppins text-white">
            Leitura Pode Melhorar — Agende em Anápolis
          </h2>
          <p className="text-primary-foreground/90 text-lg">
            Com o acompanhamento certo, crianças com dislexia desenvolvem estratégias poderosas de aprendizagem.
          </p>
          <ButtonWhatsApp
            onClick={() => trackButtonClick('WA_Dislexia_Final')}
            message={WHATSAPP_MSG}
            className="bg-white text-primary hover:bg-white/90 px-8 py-4 rounded-xl font-semibold text-lg"
          >
            Chamar no WhatsApp Agora
          </ButtonWhatsApp>
        </div>
      </section>
      <FixedWhatsAppBar message="Oi! Vi a página de dislexia da Fono Inova e gostaria de entender como funciona o atendimento." />
    </Layout>
  );
}
