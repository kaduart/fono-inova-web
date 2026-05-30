import { AlertTriangle, Brain, CheckCircle2, MessageCircle } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import Layout from '../components/Layout/index.jsx';
import SEO from '../components/SEO.jsx';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp.jsx';
import { trackButtonClick } from '../hooks/useAnalytics';
import { schemaBaseLocalBusiness } from '../schemas/clinicaSchemas.js';

const WHATSAPP_MSG = "Oi! Meu filho tem dificuldade de atenção e quero entender se pode ser TDAH. Pode me ajudar?";

const sinaisAlerta = [
  "Dificuldade para se concentrar em tarefas ou atividades",
  "Age sem pensar nas consequências (impulsividade)",
  "Não para quieto, sempre agitado ou inquieto",
  "Esquece o que acabou de aprender ou de fazer",
  "Professores reclamam de falta de atenção na escola",
  "Dificuldade para seguir instruções em sequência",
];

const steps = [
  { number: "1", title: "Você chama no WhatsApp", desc: "Conte o que está observando — nossa equipe orienta os próximos passos", icon: MessageCircle },
  { number: "2", title: "Avaliação neuropsicológica", desc: "Investigação completa das funções cognitivas e atencionais", icon: Brain },
  { number: "3", title: "Plano de intervenção", desc: "Acompanhamento psicológico e orientação escolar em Anápolis", icon: CheckCircle2 },
];

const relacionados = [
  { href: '/avaliacao-tdah-anapolis', label: 'Avaliação TDAH em Anápolis' },
  { href: '/avaliacao-neuropsicologica-anapolis', label: 'Avaliação Neuropsicológica em Anápolis' },
  { href: '/psicologia-infantil-anapolis', label: 'Psicologia Infantil em Anápolis' },
];

const schemaFAQTdah = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Como identificar TDAH em crianças?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Os principais sinais de TDAH incluem dificuldade de concentração, impulsividade, agitação excessiva e dificuldade para seguir instruções. A avaliação neuropsicológica é essencial para um diagnóstico correto.",
      },
    },
    {
      "@type": "Question",
      "name": "Qual profissional avalia TDAH em Anápolis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A avaliação neuropsicológica para TDAH é realizada por neuropsicólogo. A Clínica Fono Inova, no bairro Jundiaí em Anápolis, oferece avaliação neuropsicológica completa para crianças com suspeita de TDAH.",
      },
    },
    {
      "@type": "Question",
      "name": "TDAH tem tratamento?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. O TDAH tem tratamento eficaz que combina acompanhamento psicológico, orientação escolar, suporte aos pais e, quando indicado, tratamento médico. Quanto mais cedo iniciado, melhores os resultados.",
      },
    },
    {
      "@type": "Question",
      "name": "Com que idade fazer avaliação de TDAH?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A avaliação pode ser feita a partir dos 6 anos, quando os comportamentos escolares ficam mais evidentes. Mas sinais em crianças mais novas também merecem atenção e acompanhamento especializado.",
      },
    },
  ],
};

export default function TdahAnapolis() {
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
        title="TDAH Infantil em Anápolis | Avaliação e Tratamento — Fono Inova"
        description="Seu filho tem dificuldade de atenção, hiperatividade ou impulsividade em Anápolis? Avaliação neuropsicológica completa para TDAH. Bairro Jundiaí. Agende: (62) 99201-3573."
        keywords="tdah anapolis, tdah infantil anapolis, avaliação tdah anapolis, psicóloga tdah anapolis, criança hiperativa anapolis, dificuldade atenção anapolis"
        url="https://www.clinicafonoinova.com.br/tdah-anapolis"
        image="/images/og-image.jpg"
        type="website"
        schema={[schemaBaseLocalBusiness, schemaFAQTdah]}
      />

      <Breadcrumb items={[
        { label: 'Psicologia Infantil', href: '/psicologia-infantil-anapolis' },
        { label: 'TDAH em Anápolis' },
      ]} />

      {/* ========== HERO ========== */}
      <section className="relative min-h-[90vh] pt-24 pb-16 md:pt-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-amber-50/40 to-yellow-50/30" />
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-amber-200/30 to-yellow-200/20 rounded-full blur-3xl opacity-70" />

        <div className="relative container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="space-y-6 text-center pt-8">

            <h1 className="inline-flex items-center bg-amber-50 text-amber-700 border border-amber-200 px-4 py-1.5 text-sm font-semibold rounded-full">
              TDAH Infantil em Anápolis
            </h1>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-900 leading-tight">
              Seu Filho É Inquieto, Desatento ou Age Sem Pensar?
            </h2>

            <p className="text-xl text-slate-600 leading-relaxed">
              O TDAH é mais comum do que se imagina e tem tratamento eficaz. Nossa equipe
              em <strong>Anápolis</strong> realiza avaliação completa e acompanhamento
              para que seu filho possa desenvolver todo o seu potencial.
            </p>

            <div className="bg-amber-50 border border-amber-200 p-5 rounded-xl text-left">
              <p className="text-sm text-amber-800 font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Sinais que merecem avaliação:
              </p>
              <ul className="space-y-1.5">
                {sinaisAlerta.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-amber-700">
                    <span className="text-amber-500 mt-0.5 shrink-0">•</span> {s}
                  </li>
                ))}
              </ul>
            </div>

            <ButtonWhatsApp
              onClick={() => trackButtonClick('WA_Tdah_Hero')}
              message={WHATSAPP_MSG}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg"
            >
              Quero Avaliar o TDAH do Meu Filho
            </ButtonWhatsApp>
          </div>
        </div>
      </section>

      {/* ========== COMO FUNCIONA ========== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h2 className="text-3xl font-bold font-poppins text-slate-900 mb-10 text-center">
            Como Funciona a Avaliação de TDAH em Anápolis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map(step => (
              <div key={step.number} className="text-center space-y-3">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
                  <step.icon className="w-6 h-6 text-amber-600" />
                </div>
                <div className="text-2xl font-bold text-amber-600">{step.number}</div>
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
            Fono Inova — Avaliação de TDAH em Anápolis
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            No bairro <strong>Jundiaí</strong>, Anápolis, nossa equipe realiza avaliação
            neuropsicológica completa para identificar TDAH, dificuldades de aprendizagem
            e outros desafios cognitivos. Atendemos com acolhimento, sem rótulos —
            para que cada criança seja compreendida em sua singularidade.
          </p>
          <ButtonWhatsApp
            onClick={() => trackButtonClick('WA_Tdah_Sobre')}
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
            Outros Atendimentos na Fono Inova
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

      {/* ========== CTA FINAL ========== */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl text-center space-y-6">
          <h2 className="text-3xl font-bold font-poppins text-white">
            Diagnóstico Correto Muda Tudo — Agende em Anápolis
          </h2>
          <p className="text-primary-foreground/90 text-lg">
            Com a avaliação certa, seu filho pode ter o suporte adequado para se desenvolver plenamente.
          </p>
          <ButtonWhatsApp
            onClick={() => trackButtonClick('WA_Tdah_Final')}
            message={WHATSAPP_MSG}
            className="bg-white text-primary hover:bg-white/90 px-8 py-4 rounded-xl font-semibold text-lg"
          >
            Chamar no WhatsApp Agora
          </ButtonWhatsApp>
        </div>
      </section>
    </Layout>
  );
}
