import { Baby, CheckCircle2, Gift, HeartHandshake, ListChecks, MessageCircle, ShieldCheck, Smartphone, Sparkles, Trophy } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import TypewriterText from '../components/TypewriterText';
import Layout from '../components/Layout/index.jsx';
import SEO from '../components/SEO.jsx';
import FixedWhatsAppBar from '../components/FixedWhatsAppBar.jsx';
import ProofBar from '../components/premium/ProofBar';
import Reveal from '../components/premium/Reveal';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp.jsx';
import { trackButtonClick } from '../hooks/useAnalytics';

// Landing page do app FonoInova Conecta (pré-cadastro / lista de espera).
// App gratuito de triagem do desenvolvimento infantil (0 a 6 anos) + missões diárias.
// Triagem NÃO é diagnóstico; o app apoia o desenvolvimento e não substitui avaliação profissional.
const WHATSAPP_MESSAGE = 'Olá! Quero entrar na lista de espera do app gratuito FonoInova Conecta 💚';

const beneficios = [
  {
    icon: ListChecks,
    title: 'Triagem por idade',
    text: 'Um checklist simples, baseado nos marcos do desenvolvimento, que ajuda a observar a fala, a audição, a interação e o brincar do seu filho. Não é diagnóstico: é um mapa para você saber como acompanhar.',
  },
  {
    icon: Sparkles,
    title: 'Missões diárias',
    text: 'Brincadeiras curtas, criadas por fonoaudiólogas, para estimular o desenvolvimento em casa no dia a dia. Cada missão explica o que fazer e quando parar.',
  },
  {
    icon: Trophy,
    title: 'Evolução e conquistas',
    text: 'A cada fase concluída, a criança ganha uma medalha e você acompanha a evolução ao longo do tempo. Simples de ver, fácil de manter a rotina.',
  },
];

const passos = [
  { title: 'Responda a triagem', text: 'Em poucos minutos, você responde um checklist por faixa de idade sobre os marcos do seu filho.' },
  { title: 'Veja o resultado', text: 'O app mostra, de forma acolhedora, se os marcos estão no esperado ou se vale observar com mais atenção.' },
  { title: 'Siga as missões', text: 'Receba brincadeiras diárias para estimular o desenvolvimento e acompanhe a evolução pela trilha.' },
  { title: 'Fale com a equipe quando precisar', text: 'Se algum ponto merecer atenção, a Clínica Fono Inova está por perto para orientar os próximos passos.' },
];

const telas = [
  { src: '/images/conecta/inicio.png', alt: 'Tela inicial do app FonoInova Conecta com o resumo do desenvolvimento da criança' },
  { src: '/images/conecta/resultado.png', alt: 'Tela de resultado da triagem do app, com os marcos por área' },
  { src: '/images/conecta/trilha.png', alt: 'Trilha de missões diárias do app FonoInova Conecta' },
  { src: '/images/conecta/medalha.png', alt: 'Medalha de conquista ao concluir uma fase no app' },
];

const faqs = [
  {
    q: 'O app é pago?',
    a: 'Não. O FonoInova Conecta é gratuito. Ele nasceu para apoiar as famílias no acompanhamento do desenvolvimento das crianças de 0 a 6 anos.',
  },
  {
    q: 'A triagem é um diagnóstico?',
    a: 'Não. É uma triagem simples por idade, que ajuda os pais a observar os marcos do desenvolvimento. Diagnóstico só é feito com avaliação presencial de um profissional habilitado.',
  },
  {
    q: 'Preciso ser paciente da clínica para usar?',
    a: 'Não. Qualquer família pode usar o app. Se quiser, a equipe da Fono Inova, em Anápolis, está por perto para ajudar nos próximos passos.',
  },
  {
    q: 'Quais dados vocês pedem?',
    a: 'O mínimo necessário. Para entrar na lista de espera, pedimos apenas o seu nome, o WhatsApp e a faixa de idade da criança. Não pedimos o nome da criança nem dados de saúde.',
  },
];

const ConectaApp = () => {
  const Cta = ({ where, label, className = '' }: { where: string; label: string; className?: string }) => (
    <ButtonWhatsApp
      onClick={() => trackButtonClick(`WhatsApp Conecta App - ${where}`)}
      message={WHATSAPP_MESSAGE}
      lpSlug="/app"
      lpCategory="app"
      className={`bg-green-700 hover:bg-green-800 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all justify-center ${className}`}
    >
      <MessageCircle className="w-5 h-5" />
      {label}
    </ButtonWhatsApp>
  );

  return (
    <Layout>
      <SEO
        title="App FonoInova Conecta: Triagem Gratuita do Desenvolvimento Infantil (0 a 6 anos)"
        description="Conheça o FonoInova Conecta: app gratuito da Clínica Fono Inova com triagem por idade e missões diárias criadas por fonoaudiólogas para acompanhar o desenvolvimento do seu filho de 0 a 6 anos. Entre na lista de espera."
        url="/app"
        image="/images/conecta/resultado.png"
      />

      <Breadcrumb items={[{ label: 'App FonoInova Conecta' }]} />

      {/* ==================== HERO ==================== */}
      <section className="relative pt-24 pb-12 md:pt-28 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-teal-50/40 to-emerald-50/30" />
        <div className="relative container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 space-y-6">
              <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full text-sm font-medium text-primary">
                <Gift className="w-4 h-4" />
                App gratuito · crianças de 0 a 6 anos
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-900 leading-tight">
                <TypewriterText text="Acompanhe cada conquista do seu filho." />
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
                O FonoInova Conecta é o app gratuito da Clínica Fono Inova: uma triagem simples por idade e brincadeiras diárias, criadas por fonoaudiólogas, para você acompanhar o desenvolvimento em casa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <Cta where="hero" label="Entrar na lista de espera" className="px-8 py-4 w-full sm:w-auto" />
                <a href="#como-funciona" className="font-semibold text-slate-800 underline underline-offset-4 hover:text-primary">
                  Ver como funciona
                </a>
              </div>
              <p className="flex items-start gap-2 text-sm text-slate-500 max-w-xl">
                <ShieldCheck className="w-5 h-5 shrink-0 text-primary" />
                A triagem ajuda a observar os marcos do desenvolvimento. Não é diagnóstico e não substitui a avaliação de um profissional.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="mx-auto w-full max-w-[320px] rounded-[2rem] bg-slate-100 p-3 shadow-xl">
                <img
                  src="/images/conecta/inicio.png"
                  alt="Tela inicial do app FonoInova Conecta"
                  className="w-full rounded-[1.5rem] object-contain"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProofBar className="-mt-8 md:-mt-10" />

      {/* ==================== O QUE É ==================== */}
      <Reveal><section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">O que o app faz</p>
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 mb-3">Desenvolvimento infantil no seu dia a dia.</h2>
          <p className="text-lg text-slate-600 max-w-3xl mb-10">
            Tudo em um só lugar, de forma leve e acolhedora: observar os marcos, estimular com brincadeiras e acompanhar a evolução do seu filho.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {beneficios.map((b) => (
              <div key={b.title} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <b.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{b.title}</h3>
                <p className="text-slate-600">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section></Reveal>

      {/* ==================== COMO FUNCIONA ==================== */}
      <Reveal><section id="como-funciona" className="py-14 md:py-20 bg-primary text-white scroll-mt-24">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70 mb-2">Como funciona</p>
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-10">Quatro passos simples.</h2>
          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {passos.map((p, i) => (
              <li key={p.title} className="rounded-2xl bg-white/10 p-6">
                <span className="w-9 h-9 mb-4 rounded-full border border-white/60 flex items-center justify-center font-semibold">{i + 1}</span>
                <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                <p className="text-white/80">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section></Reveal>

      {/* ==================== TELAS DO APP ==================== */}
      <Reveal><section className="py-14 md:py-20 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">Por dentro do app</p>
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 mb-10">Feito para ser simples de usar.</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {telas.map((t) => (
              <div key={t.src} className="rounded-3xl bg-white p-2 shadow-sm border border-slate-100">
                <img src={t.src} alt={t.alt} className="w-full rounded-2xl object-contain" loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>
      </section></Reveal>

      {/* ==================== SEGURANÇA / LGPD ==================== */}
      <Reveal><section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Cuidado e privacidade</p>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900">Conteúdo com responsável técnica e seus dados protegidos.</h2>
            <ul className="space-y-3">
              {[
                'Triagem e missões baseadas nos marcos do desenvolvimento, sob responsabilidade técnica de fonoaudióloga (CRFa 5-13633).',
                'A triagem orienta e acolhe: não é diagnóstico nem substitui a avaliação presencial de um profissional.',
                'Para a lista de espera, pedimos só o essencial (nome, WhatsApp e faixa de idade) — sem nome nem dados de saúde da criança (LGPD).',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="w-6 h-6 shrink-0 text-green-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm bg-emerald-50/50">
            <div className="flex items-center gap-3 mb-3">
              <HeartHandshake className="w-7 h-7 text-primary" />
              <h3 className="text-xl font-bold text-slate-900">Entre na lista de espera</h3>
            </div>
            <p className="text-slate-600 mb-5">
              O app está em pré-lançamento. Deixe seu contato e avisamos pelo WhatsApp assim que estiver disponível. É gratuito.
            </p>
            <Cta where="card-lista" label="Quero entrar na lista" className="px-6 py-3 w-full" />
            <p className="flex items-center gap-2 text-xs text-slate-500 mt-4">
              <Baby className="w-4 h-4 shrink-0" /> Para crianças de 0 a 6 anos · Anápolis-GO
            </p>
          </div>
        </div>
      </section></Reveal>

      {/* ==================== FAQ ==================== */}
      <Reveal><section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8 grid lg:grid-cols-3 gap-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">Dúvidas frequentes</p>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900">O que as famílias perguntam.</h2>
          </div>
          <div className="lg:col-span-2 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-slate-200 p-4 open:shadow-sm">
                <summary className="cursor-pointer font-semibold text-slate-900 list-none flex items-center justify-between gap-4">
                  {f.q}
                  <span className="text-primary text-xl group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section></Reveal>

      {/* ==================== CTA FINAL ==================== */}
      <Reveal><section className="pb-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="rounded-3xl bg-emerald-50 p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 mb-3">Quer acompanhar o desenvolvimento do seu filho de perto?</h2>
              <p className="text-slate-600">Entre na lista de espera do FonoInova Conecta e seja avisado em primeira mão quando o app for lançado. Gratuito, para famílias de crianças de 0 a 6 anos.</p>
            </div>
            <div className="flex flex-col items-start md:items-center gap-4">
              <Cta where="final" label="Entrar na lista de espera" className="px-8 py-4 w-full md:w-auto" />
              <p className="flex items-center gap-2 text-sm text-slate-500">
                <Smartphone className="w-4 h-4" /> Clínica Fono Inova · Anápolis, Goiás
              </p>
            </div>
          </div>
        </div>
      </section></Reveal>

      <FixedWhatsAppBar message={WHATSAPP_MESSAGE} />
    </Layout>
  );
};

export default ConectaApp;
