import { AlertTriangle, Brain, CheckCircle2, MessageCircle } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import Layout from '../components/Layout/index.jsx';
import SEO from '../components/SEO.jsx';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp.jsx';
import { trackButtonClick } from '../hooks/useAnalytics';
import { schemaBaseLocalBusiness } from '../schemas/clinicaSchemas.js';

const WHATSAPP_MSG = "Oi! Meu filho tem seletividade alimentar e quero entender como tratar. Pode me ajudar?";

const sinaisAlerta = [
  "Aceita menos de 20 alimentos diferentes",
  "Rejeita alimentos por textura, cor ou cheiro",
  "Gagueja, chora ou vomita ao ver certos alimentos",
  "Não come na escola ou em locais diferentes de casa",
  "Perdeu peso ou não ganha peso adequado",
  "As refeições são motivo de estresse diário em família",
];

const steps = [
  { number: "1", title: "Você chama no WhatsApp", desc: "Conta como são as refeições do seu filho — nossa equipe já começa a orientar", icon: MessageCircle },
  { number: "2", title: "Avaliação fonoaudiológica e de TO", desc: "Identificamos a causa: oral, sensorial ou comportamental", icon: Brain },
  { number: "3", title: "Intervenção personalizada", desc: "Programa de expansão alimentar gradual e sem forçar", icon: CheckCircle2 },
];

const relacionados = [
  { href: '/fonoaudiologia-anapolis', label: 'Fonoaudiologia Infantil em Anápolis' },
  { href: '/terapia-ocupacional-anapolis', label: 'Terapia Ocupacional em Anápolis' },
  { href: '/avaliacao-autismo-infantil', label: 'Avaliação TEA — Seletividade e Autismo' },
];

const schemaFAQSeletividade = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O que é seletividade alimentar infantil?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Seletividade alimentar é quando a criança rejeita a maioria dos alimentos, geralmente por questões sensoriais, orais ou comportamentais. É diferente de 'frescura' — é uma condição que pode ser tratada com acompanhamento especializado.",
      },
    },
    {
      "@type": "Question",
      "name": "Seletividade alimentar pode ser autismo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A seletividade alimentar é comum em crianças com TEA (autismo), mas também ocorre em crianças sem diagnóstico. Nossa equipe avalia a criança de forma completa para identificar a causa específica.",
      },
    },
    {
      "@type": "Question",
      "name": "Qual profissional trata seletividade alimentar em Anápolis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O tratamento ideal envolve fonoaudióloga (que avalia a função oral e deglutição) e terapeuta ocupacional (que trabalha a integração sensorial). A Clínica Fono Inova, no bairro Jundiaí em Anápolis, tem equipe especializada para esse atendimento.",
      },
    },
  ],
};

export default function SeletividadeAlimentarAnapolis() {
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
        title="Seletividade Alimentar Infantil em Anápolis | Clínica Fono Inova"
        description="Seu filho não come e rejeita a maioria dos alimentos? Seletividade alimentar infantil em Anápolis. Fonoaudióloga e terapeuta ocupacional especializadas. Bairro Jundiaí. (62) 99201-3573."
        keywords="seletividade alimentar anapolis, meu filho não come, criança seletiva alimentar anapolis, criança rejeita comida anapolis, tratamento seletividade alimentar anapolis"
        url="https://www.clinicafonoinova.com.br/seletividade-alimentar-anapolis"
        image="/images/og-image.jpg"
        type="website"
        schema={[schemaBaseLocalBusiness, schemaFAQSeletividade]}
      />

      <Breadcrumb items={[
        { label: 'Fonoaudiologia', href: '/fonoaudiologia-anapolis' },
        { label: 'Seletividade Alimentar em Anápolis' },
      ]} />

      {/* ========== HERO ========== */}
      <section className="relative min-h-[90vh] pt-24 pb-16 md:pt-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-green-50/40 to-teal-50/30" />
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-green-200/30 to-teal-200/20 rounded-full blur-3xl opacity-70" />

        <div className="relative container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="space-y-6 text-center pt-8">

            <span className="inline-flex items-center bg-green-50 text-green-700 border border-green-200 px-4 py-1.5 text-sm font-semibold rounded-full">
              Seletividade Alimentar Infantil em Anápolis
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-900 leading-tight">
              Seu Filho Rejeita a Maioria dos Alimentos?
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed">
              Seletividade alimentar não é frescura — é uma condição real que pode ser
              tratada. Nossa equipe em <strong>Anápolis</strong> avalia a causa
              e trabalha a expansão alimentar de forma gradual e acolhedora. Em casos
              associados a condições do neurodesenvolvimento, indicamos avaliação com
              <Link to="/neuropediatra-anapolis" className="text-primary font-semibold hover:underline"> neuropediatra em Anápolis</Link>.
            </p>

            <div className="bg-green-50 border border-green-200 p-5 rounded-xl text-left">
              <p className="text-sm text-green-800 font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Sinais que indicam seletividade alimentar:
              </p>
              <ul className="space-y-1.5">
                {sinaisAlerta.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-green-700">
                    <span className="text-green-500 mt-0.5 shrink-0">•</span> {s}
                  </li>
                ))}
              </ul>
            </div>

            <ButtonWhatsApp
              onClick={() => trackButtonClick('WA_Seletividade_Hero')}
              message={WHATSAPP_MSG}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg"
            >
              Meu Filho Tem Seletividade — Quero Ajuda
            </ButtonWhatsApp>
          </div>
        </div>
      </section>

      {/* ========== COMO FUNCIONA ========== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h2 className="text-3xl font-bold font-poppins text-slate-900 mb-10 text-center">
            Como Tratamos a Seletividade em Anápolis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map(step => (
              <div key={step.number} className="text-center space-y-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <step.icon className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600">{step.number}</div>
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
            Fono Inova — Referência em Seletividade Alimentar em Anápolis
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            No bairro <strong>Jundiaí</strong>, Anápolis, nossa clínica atende crianças
            com seletividade alimentar através da integração entre fonoaudiologia
            (função oral e deglutição) e terapia ocupacional (processamento sensorial).
            Trabalhamos sem forçar, com respeito ao ritmo de cada criança.
          </p>
          <ButtonWhatsApp
            onClick={() => trackButtonClick('WA_Seletividade_Sobre')}
            message={WHATSAPP_MSG}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-semibold"
          >
            Agendar Avaliação em Anápolis
          </ButtonWhatsApp>
        </div>
      </section>

      {/* ========== CONTEÚDO SEO EXPANDIDO ========== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h2 className="text-3xl font-bold font-poppins text-slate-900 mb-8 text-center">
            Entendendo a Seletividade Alimentar Infantil
          </h2>
          <div className="space-y-6 text-slate-600 leading-relaxed">
            <p>
              A <strong>seletividade alimentar infantil</strong> vai muito além de uma criança que "não gosta de comer". 
              Trata-se de uma dificuldade persistente para aceitar novos alimentos, que pode afetar o crescimento, 
              o desenvolvimento e a qualidade de vida da família inteira. Em Anápolis, a Clínica Fono Inova oferece 
              atendimento especializado para identificar e tratar as causas da seletividade.
            </p>
            <p>
              As causas são multifatoriais. Pode haver componentes sensoriais (textura, cheiro, cor, temperatura), 
              orais (dificuldade para mastigar ou engolir), comportamentais (rotina rígida, negativismo) ou até 
              médicas (refluxo, constipação, alergias). Por isso, a avaliação deve ser feita por profissionais 
              capacitados em motricidade orofacial e integração sensorial.
            </p>
            <h3 className="text-xl font-bold text-slate-900 mt-6">Sinais de alerta que indicam necessidade de avaliação</h3>
            <ul className="space-y-2 list-disc pl-6">
              <li>Aceita menos de 20 alimentos diferentes</li>
              <li>Rejeita alimentos por textura, cor, cheiro ou temperatura</li>
              <li>Chora, grita ou vomita na hora das refeições</li>
              <li>Só come em casa ou em pratos específicos</li>
              <li>Perdeu peso ou apresenta dificuldade para ganhar peso</li>
              <li>Refeições são fonte constante de estresse familiar</li>
            </ul>
            <p>
              O tratamento na Fono Inova é gradual, lúdico e respeita o ritmo da criança. Trabalhamos em parceria 
              com os pais para transformar as refeições em momentos mais tranquilos e saudáveis. Agende uma avaliação 
              no bairro Jundiaí em Anápolis.
            </p>
          </div>
        </div>
      </section>

      {/* ========== FAQ VISÍVEL ========== */}
      <section className="py-16 bg-green-50/50">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h2 className="text-3xl font-bold font-poppins text-slate-900 mb-10 text-center">
            Perguntas Frequentes sobre Seletividade Alimentar
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100">
              <h3 className="text-lg font-bold text-slate-900 mb-3">O que é seletividade alimentar infantil?</h3>
              <p className="text-slate-600 leading-relaxed">
                Seletividade alimentar é quando a criança rejeita a maioria dos alimentos, geralmente por questões sensoriais, 
                orais ou comportamentais. É diferente de "frescura" — é uma condição que pode ser tratada com acompanhamento 
                especializado em Anápolis.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Seletividade alimentar pode ser autismo?</h3>
              <p className="text-slate-600 leading-relaxed">
                A seletividade alimentar é comum em crianças com TEA (autismo), mas também ocorre em crianças sem diagnóstico. 
                Nossa equipe avalia a criança de forma completa para identificar a causa específica e indicar o melhor tratamento.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Qual profissional trata seletividade alimentar em Anápolis?</h3>
              <p className="text-slate-600 leading-relaxed">
                O tratamento ideal envolve fonoaudióloga (que avalia a função oral e deglutição) e terapeuta ocupacional 
                (que trabalha a integração sensorial). A Clínica Fono Inova, no bairro Jundiaí em Anápolis, tem equipe 
                especializada para esse atendimento.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Como é o tratamento na Fono Inova?</h3>
              <p className="text-slate-600 leading-relaxed">
                O tratamento é gradual e respeita o ritmo da criança. Começamos com uma avaliação detalhada, identificamos 
                as causas da seletividade e montamos um plano personalizado com estratégias sensoriais, orais e comportamentais 
                para expandir a alimentação sem trauma.
              </p>
            </div>
          </div>
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

      {/* ========== CTA FINAL ========== */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl text-center space-y-6">
          <h2 className="text-3xl font-bold font-poppins text-white">
            Refeições Podem Ser Tranquilas — Agende em Anápolis
          </h2>
          <p className="text-primary-foreground/90 text-lg">
            Com o acompanhamento certo, a maioria das crianças expande a alimentação gradualmente.
          </p>
          <ButtonWhatsApp
            onClick={() => trackButtonClick('WA_Seletividade_Final')}
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
