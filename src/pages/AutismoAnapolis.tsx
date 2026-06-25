import { AlertTriangle, Brain, CheckCircle2, Heart, MessageCircle } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import Layout from '../components/Layout/index.jsx';
import SEO from '../components/SEO.jsx';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp.jsx';
import { trackButtonClick } from '../hooks/useAnalytics';
import { schemaBaseLocalBusiness, schemaFAQTea } from '../schemas/clinicaSchemas.js';

const WHATSAPP_MSG = "Oi! Tenho dúvidas sobre autismo e quero entender melhor o desenvolvimento do meu filho. Pode me ajudar?";

const sinaisAlerta = [
  "Não mantém contato visual ou sorri pouco",
  "Não responde ao próprio nome aos 12 meses",
  "Não aponta para objetos para mostrar interesse",
  "Não brinca de faz-de-conta",
  "Movimentos repetitivos (balançar, girar, bater palmas)",
  "Perda de habilidades que já tinha",
];

const steps = [
  { number: "1", title: "Você chama no WhatsApp", desc: "Conta o que está observando no desenvolvimento do seu filho — sem julgamento", icon: MessageCircle },
  { number: "2", title: "Orientação inicial", desc: "Nossa equipe explica os próximos passos e como a avaliação funciona", icon: Brain },
  { number: "3", title: "Avaliação multidisciplinar", desc: "Fono, TO e psicologia avaliam juntas para um diagnóstico mais completo", icon: CheckCircle2 },
];

const relacionados = [
  { href: '/avaliacao-autismo-infantil', label: 'Avaliação TEA — Como Funciona' },
  { href: '/terapia-ocupacional-anapolis', label: 'Terapia Ocupacional em Anápolis' },
  { href: '/fonoaudiologia-anapolis', label: 'Fonoaudiologia Infantil em Anápolis' },
];

export default function AutismoAnapolis() {
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
        title="Suporte para Autismo (TEA) em Anápolis | Clínica Fono Inova"
        description="Suspeita de autismo em Anápolis? Equipe multidisciplinar especializada em TEA: fonoaudiologia, terapia ocupacional e psicologia. Bairro Jundiaí. Agende: (62) 99201-3573."
        keywords="autismo anapolis, tea anapolis, suspeita autismo anapolis, avaliação autismo anapolis, criança autista anapolis, suporte tea anapolis"
        url="https://www.clinicafonoinova.com.br/autismo-anapolis"
        image="/images/og-image.jpg"
        type="website"
        schema={[schemaBaseLocalBusiness, schemaFAQTea]}
      />

      <Breadcrumb items={[
        { label: 'Avaliação TEA', href: '/avaliacao-autismo-infantil' },
        { label: 'Autismo em Anápolis' },
      ]} />

      {/* ========== HERO ========== */}
      <section className="relative min-h-[90vh] pt-24 pb-16 md:pt-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-purple-50/40 to-indigo-50/30" />
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-purple-200/30 to-indigo-200/20 rounded-full blur-3xl opacity-70" />

        <div className="relative container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="space-y-6 text-center pt-8">

            <h1 className="inline-flex items-center bg-purple-50 text-purple-700 border border-purple-200 px-4 py-1.5 text-sm font-semibold rounded-full">
              Suporte para Autismo (TEA) em Anápolis
            </h1>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-900 leading-tight">
              Você Suspeita que Seu Filho Pode Ter Autismo?
            </h2>

            <p className="text-xl text-slate-600 leading-relaxed">
              A identificação precoce faz toda a diferença. Nossa equipe multidisciplinar
              em <strong>Anápolis</strong> oferece avaliação acolhedora, sem julgamentos,
              para entender o desenvolvimento único do seu filho. Contamos com
              <Link to="/neuropediatra-anapolis" className="text-primary font-semibold hover:underline"> neuropediatra em Anápolis</Link> para avaliação médica especializada no diagnóstico e acompanhamento.
            </p>

            <div className="bg-purple-50 border border-purple-200 p-5 rounded-xl text-left">
              <p className="text-sm text-purple-800 font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Sinais que merecem atenção:
              </p>
              <ul className="space-y-1.5">
                {sinaisAlerta.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-purple-700">
                    <span className="text-purple-400 mt-0.5 shrink-0">•</span> {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
              <div className="flex items-center gap-2 text-green-800 font-semibold text-sm">
                <Heart className="w-4 h-4" />
                Você não está sozinha. A maioria dos pais chega com dúvida — e isso é normal.
              </div>
            </div>

            <ButtonWhatsApp
              onClick={() => trackButtonClick('WA_Autismo_Hero')}
              message={WHATSAPP_MSG}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg"
            >
              Quero Entender Melhor o Desenvolvimento do Meu Filho
            </ButtonWhatsApp>
          </div>
        </div>
      </section>

      {/* ========== COMO FUNCIONA ========== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h2 className="text-3xl font-bold font-poppins text-slate-900 mb-10 text-center">
            Como Funciona o Suporte em Anápolis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map(step => (
              <div key={step.number} className="text-center space-y-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <step.icon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-purple-600">{step.number}</div>
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
            Fono Inova — Equipe Multidisciplinar para TEA em Anápolis
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            No bairro <strong>Jundiaí</strong>, Anápolis, a Clínica Fono Inova reúne
            fonoaudióloga, terapeuta ocupacional e psicóloga que trabalham juntas no
            suporte a crianças com suspeita ou diagnóstico de TEA. Atendimento
            humanizado, individualizado e baseado em evidências — sem julgamentos.
          </p>
          <ButtonWhatsApp
            onClick={() => trackButtonClick('WA_Autismo_Sobre')}
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
            Saiba Mais Sobre o Suporte para TEA
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
            Dê o Primeiro Passo — Estamos em Anápolis
          </h2>
          <p className="text-primary-foreground/90 text-lg">
            Quanto mais cedo o suporte, maior o potencial de desenvolvimento do seu filho.
          </p>
          <ButtonWhatsApp
            onClick={() => trackButtonClick('WA_Autismo_Final')}
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
