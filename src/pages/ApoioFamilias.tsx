import { CheckCircle2, ClipboardList, Copy, ExternalLink, FileText, MapPin, MessageCircle, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import ClinicGallery from '../components/ClinicGallery';
import Layout from '../components/Layout/index.jsx';
import SEO from '../components/SEO.jsx';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp.jsx';
import { trackButtonClick, trackPhoneCall } from '../hooks/useAnalytics';

// Página de apoio às famílias (acesso às terapias, documentação clínica, informações oficiais).
// Indexável (noindex removido a pedido do titular). Trechos marcados "REVISAR" devem passar pelo advogado e pelo conselho de classe.
const WHATSAPP_MESSAGE = 'Olá! Gostaria de informações sobre apoio às famílias e acesso às terapias.';
const PHONE_LABEL = '(62) 99201-3573';

const situations = [
  'Negativa ou dificuldade de autorização de terapias',
  'Dúvidas sobre a documentação para continuidade do tratamento',
  'Busca por informações sobre direitos e benefícios',
  'Já tenho autorização ou decisão judicial e preciso organizar o atendimento',
];

const supports = [
  {
    n: '01',
    title: 'Documentos sobre o tratamento',
    text: 'Informações sobre avaliação, plano terapêutico, relatórios de acompanhamento e orçamento, conforme o caso e as atribuições de cada profissional.',
  },
  {
    n: '02',
    title: 'Dificuldade de acesso às terapias',
    text: 'A equipe esclarece as possibilidades de atendimento na clínica e ajuda a identificar quais informações clínicas estão disponíveis para apresentar à operadora ou ao profissional que acompanha sua família.',
  },
  {
    n: '03',
    title: 'Autorização ou decisão judicial existente',
    text: 'Se sua família já possui autorização ou decisão judicial referente ao tratamento, a equipe pode verificar a documentação, a disponibilidade dos profissionais e os próximos passos do atendimento.',
  },
];

const topics = [
  {
    key: 'terapias',
    label: 'Acesso às terapias',
    text: 'Nossa equipe pode esclarecer a disponibilidade de atendimento e os documentos clínicos relacionados ao tratamento. Tenha em mãos a solicitação e a resposta da operadora, se houver.',
  },
  {
    key: 'direitos',
    label: 'Direitos e benefícios',
    text: 'Para informações sobre direitos e benefícios, indicamos os canais oficiais mais abaixo nesta página. A clínica ajuda na parte clínica: relatórios e avaliações, conforme o caso.',
  },
  {
    key: 'decisao',
    label: 'Já tenho uma decisão',
    text: 'Se já existe autorização ou decisão, a equipe verifica a documentação, a disponibilidade dos profissionais e os próximos passos do atendimento.',
  },
];

const steps = [
  { title: 'Uma conversa com os responsáveis', text: 'Entendemos a dúvida e o tipo de informação que a família precisa sobre o atendimento.' },
  { title: 'Organização das informações clínicas', text: 'A equipe verifica quais documentos podem ser emitidos ou disponibilizados, respeitando a avaliação e o acompanhamento profissional.' },
  { title: 'Definição dos próximos passos', text: 'Alinhamos as possibilidades de atendimento. Questões jurídicas e decisões sobre medidas administrativas ou judiciais são avaliadas pelo profissional responsável por essa orientação.' },
];

const checklistItems = [
  'Solicitação ou encaminhamento para as terapias',
  'Relatórios clínicos e avaliações disponíveis',
  'Plano terapêutico e orçamento, quando houver',
  'Protocolos e respostas da operadora, quando houver',
  'Autorização ou decisão judicial já existente',
];

const sources = [
  {
    org: 'Agência Nacional de Saúde Suplementar',
    title: 'Dúvidas e reclamações sobre planos',
    text: 'Consulte os canais de atendimento ao consumidor da ANS e as informações sobre registro de reclamações.',
    href: 'https://www.gov.br/ans/pt-br/canais_atendimento/canais-de-atendimento-ao-consumidor-1',
  },
  {
    org: 'Ministério do Desenvolvimento Social',
    title: 'Informações sobre BPC/LOAS',
    text: 'Conheça as informações oficiais sobre o benefício e os critérios de acesso. Um diagnóstico, por si só, não garante a concessão.',
    href: 'https://www.gov.br/mds/pt-br/acoes-e-programas/SUAS/beneficios-assistenciais/beneficio-assistencial-ao-idoso-e-a-pessoa-com-deficiencia-bpc',
  },
];

// REVISAR (advogado/conselho): a 1ª e a 3ª respostas tratam de liminar e de contratação jurídica.
const faqs = [
  {
    q: 'A clínica consegue uma liminar para minha família?',
    a: 'A liminar é uma decisão judicial. A análise da possibilidade de um pedido e a condução do processo cabem ao advogado responsável. A clínica pode fornecer a documentação clínica pertinente, conforme avaliação profissional. Não há garantia de autorização, benefício ou decisão favorável.',
  },
  {
    q: 'Já tenho uma decisão judicial. Posso procurar a Fono Inova?',
    a: 'Sim. Entre em contato para verificar os documentos relacionados ao atendimento, as especialidades indicadas e a disponibilidade de agenda. O início depende da análise das condições de atendimento e de custeio aplicáveis ao caso.',
  },
  {
    q: 'Quem me orienta sobre benefícios e direitos?',
    a: 'Informações oficiais podem ser consultadas nos órgãos responsáveis, como ANS, INSS e CRAS. Para análise jurídica individual e eventual atuação administrativa ou judicial, procure um advogado de sua escolha. A contratação jurídica é independente do atendimento da clínica.',
  },
  {
    q: 'O apoio depende de eu contratar um advogado específico?',
    a: 'A família tem liberdade para escolher o profissional jurídico. A emissão de documentos clínicos segue as regras de cada profissão e a avaliação ou acompanhamento realizado, independentemente dessa escolha.',
  },
  {
    q: 'Quais documentos a equipe pode disponibilizar?',
    a: 'A disponibilidade depende do atendimento e do acompanhamento realizado. A equipe pode esclarecer os procedimentos para solicitar relatórios clínicos, informações sobre o plano terapêutico e orçamento. Documentos e conclusões são emitidos pelos profissionais responsáveis, dentro de suas atribuições.',
  },
];

const ApoioFamilias = () => {
  const [topic, setTopic] = useState(topics[0].key);
  const [checked, setChecked] = useState<boolean[]>(checklistItems.map(() => false));
  const [copied, setCopied] = useState(false);
  const current = topics.find((t) => t.key === topic) ?? topics[0];
  const done = checked.filter(Boolean).length;

  const toggle = (i: number) => setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  const copyList = async () => {
    trackButtonClick('Apoio Familias - Copiar lista');
    const text = ['Minha lista de organização', ...checklistItems.map((it, i) => `${checked[i] ? '[x]' : '[ ]'} ${it}`)].join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const Cta = ({ where, label, className = '' }: { where: string; label: string; className?: string }) => (
    <ButtonWhatsApp
      onClick={() => trackButtonClick(`WhatsApp Apoio Familias - ${where}`)}
      message={WHATSAPP_MESSAGE}
      className={`bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all justify-center ${className}`}
    >
      <MessageCircle className="w-5 h-5" />
      {label}
    </ButtonWhatsApp>
  );

  return (
    <Layout>
      <SEO
        title="Apoio às Famílias: Acesso às Terapias e Documentação Clínica | Clínica Fono Inova"
        description="Apoio às famílias no acesso às terapias: organização de documentos clínicos, informações oficiais sobre direitos e benefícios e próximos passos com a Clínica Fono Inova, em Anápolis-GO."
        url="/apoio-as-familias"
        image="/images/clinica/galeria/recepcao.webp"
      />

      <Breadcrumb items={[{ label: 'Apoio às famílias' }]} />

      {/* ==================== HERO ==================== */}
      <section className="relative pt-24 pb-12 md:pt-28 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-teal-50/40 to-emerald-50/30" />
        <div className="relative container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 space-y-6">
              <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full text-sm font-medium text-primary">
                <MapPin className="w-4 h-4" />
                Acolhimento e acesso às terapias
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-900 leading-tight">
                Apoio para sua família encontrar caminhos para o cuidado.
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
                Dúvidas sobre autorização de terapias, documentos e acesso ao tratamento podem trazer insegurança. A equipe da Fono Inova ajuda sua família a organizar as informações clínicas e compreender os próximos passos do atendimento.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <Cta where="hero" label="Conversar com nossa equipe" className="px-8 py-4 w-full sm:w-auto" />
                <a href="#apoio" className="font-semibold text-slate-800 underline underline-offset-4 hover:text-primary">
                  Entender como ajudamos
                </a>
              </div>
              <p className="flex items-start gap-2 text-sm text-slate-500 max-w-xl">
                <ShieldCheck className="w-5 h-5 shrink-0 text-primary" />
                Informações sobre acesso ao tratamento e recursos oficiais no Brasil. Cada situação exige uma avaliação individual.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src="/images/clinica/galeria/recepcao.webp"
                alt="Recepção da Clínica Fono Inova em Anápolis, com parede verde, escada colorida e sala de espera"
                className="w-full h-72 sm:h-96 lg:h-[480px] object-cover rounded-3xl shadow-xl"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>

          <div className="mt-10 border-y border-slate-200 py-4 flex flex-wrap gap-x-8 gap-y-2 justify-between text-sm text-slate-600">
            <span className="font-semibold text-slate-900">Clínica Fono Inova</span>
            <span>Anápolis · Goiás</span>
            <span>Desenvolvimento infantil</span>
            <span>Apoio aos responsáveis</span>
          </div>
        </div>
      </section>

      {/* ==================== SITUAÇÕES ==================== */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 mb-8">Quando sua família pode precisar de apoio</h2>
          <ul className="grid sm:grid-cols-2 gap-4">
            {situations.map((s) => (
              <li key={s} className="flex items-start gap-3 rounded-2xl border border-slate-200 p-5 text-slate-700">
                <CheckCircle2 className="w-6 h-6 shrink-0 text-green-500" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ==================== COMO PODEMOS AJUDAR ==================== */}
      <section id="apoio" className="py-14 md:py-20 bg-slate-50 scroll-mt-24">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">Como podemos ajudar</p>
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 mb-3">Mais clareza para a família. Mais organização para o cuidado.</h2>
          <p className="text-lg text-slate-600 max-w-3xl mb-10">
            Entendemos que dúvidas sobre autorização, documentos e continuidade das terapias podem trazer insegurança. Conheça o apoio da nossa equipe em cada etapa.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {supports.map((s) => (
              <div key={s.n} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="text-4xl font-bold text-primary/30 mb-2">{s.n}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-600">{s.text}</p>
              </div>
            ))}
          </div>
          {/* REVISAR (advogado/conselho): nota sobre questões jurídicas */}
          <div className="mt-8 rounded-2xl border-l-4 border-primary bg-white p-5 text-slate-700 max-w-3xl">
            <p className="font-semibold text-slate-900 mb-1">Quem esclarece questões jurídicas?</p>
            <p>
              A análise de direitos, benefícios e eventual pedido de liminar deve ser feita por advogado habilitado, escolhido pela família. A Fono Inova oferece o suporte clínico relacionado ao tratamento; o atendimento jurídico é independente.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== POR ONDE COMEÇAR ==================== */}
      <section className="py-14 md:py-20 bg-primary text-white">
        <div className="container mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-white/70 mb-2">Por onde começar</p>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-3">Conte o que está acontecendo.</h2>
            <p className="text-white/80 mb-5">Selecione o assunto que mais se aproxima da sua dúvida.</p>
            <div className="flex flex-wrap gap-3 mb-5" role="group" aria-label="Assunto da dúvida">
              {topics.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTopic(t.key)}
                  aria-pressed={topic === t.key}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                    topic === t.key ? 'bg-white text-primary border-white' : 'border-white/50 text-white hover:bg-white/10'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <p className="border-l-2 border-white/60 pl-4 text-white/90 mb-6" aria-live="polite">{current.text}</p>
            <Cta where="por onde comecar" label="Falar sobre o próximo passo" className="px-6 py-3 !bg-white !text-primary hover:!bg-slate-100" />
            <p className="text-xs text-white/70 mt-4 max-w-md">
              A escolha do assunto acontece apenas nesta página. Não envie documentos ou dados de saúde antes de combinar o canal adequado com a equipe.
            </p>
          </div>
          <ol className="space-y-6">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4 border-b border-white/20 pb-6 last:border-0">
                <span className="w-9 h-9 shrink-0 rounded-full border border-white/60 flex items-center justify-center font-semibold">{i + 1}</span>
                <div>
                  <h3 className="text-lg font-bold">{s.title}</h3>
                  <p className="text-white/80">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ==================== DOCUMENTOS ==================== */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Antes da conversa</p>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900">Organizar os documentos já é um primeiro passo.</h2>
            <p className="text-slate-600">
              Esta lista reúne exemplos de informações que podem ajudar a compreender sua situação. A equipe clínica e o profissional jurídico definem o que é necessário em cada caso.
            </p>
            <img
              src="/images/clinica/galeria/consultorio.webp"
              alt="Consultório infantil da Clínica Fono Inova com mesa de atendimento e mural lúdico"
              className="w-full h-56 sm:h-72 object-cover rounded-2xl shadow-md"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900"><ClipboardList className="w-5 h-5 text-primary" />Minha lista de organização</h3>
              <span className="text-sm text-slate-500">{done} de {checklistItems.length} itens</span>
            </div>
            <ul className="divide-y divide-slate-100">
              {checklistItems.map((item, i) => (
                <li key={item}>
                  <label className="flex items-center gap-3 py-3 cursor-pointer text-slate-700">
                    <input type="checkbox" checked={checked[i]} onChange={() => toggle(i)} className="w-5 h-5 accent-emerald-700" />
                    <span className={checked[i] ? 'line-through text-slate-400' : ''}>{item}</span>
                  </label>
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-500 mt-4">Marque o que você já possui. A lista é apenas um apoio para sua organização e não substitui uma orientação individual. Suas marcações não são enviadas.</p>
            <button type="button" onClick={copyList} className="mt-4 inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50">
              <Copy className="w-4 h-4" />
              {copied ? 'Lista copiada' : 'Copiar minha lista'}
            </button>
          </div>
        </div>
      </section>

      {/* ==================== INFORMAÇÃO CONFIÁVEL ==================== */}
      <section className="py-14 md:py-20 bg-emerald-50/60">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">Informação confiável</p>
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 mb-3">Direitos e benefícios: consulte os canais oficiais.</h2>
          <p className="text-slate-600 max-w-3xl mb-8">Use estas fontes para conhecer os serviços disponíveis no Brasil. Requisitos, cobertura e elegibilidade precisam ser analisados conforme sua situação.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {sources.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackButtonClick(`Apoio Familias - Fonte ${s.org}`)}
                className="group block bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">{s.org}</p>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-2 mb-1 flex items-center gap-2"><FileText className="w-5 h-5 text-primary" />{s.title}</h3>
                <p className="text-slate-600">{s.text}</p>
                <span className="sr-only">(abre em nova aba)</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== GALERIA ==================== */}
      <ClinicGallery />

      {/* ==================== FAQ ==================== */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8 grid lg:grid-cols-3 gap-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">Dúvidas frequentes</p>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900">Respostas para começar com clareza.</h2>
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
      </section>

      {/* ==================== CTA FINAL ==================== */}
      <section className="pb-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="rounded-3xl bg-emerald-50 p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 mb-3">Vamos entender qual é o próximo passo para sua família?</h2>
              <p className="text-slate-600">Fale com a equipe da Fono Inova para esclarecer sua dúvida sobre documentos clínicos, disponibilidade e acesso ao atendimento.</p>
            </div>
            <div className="flex flex-col items-start md:items-center gap-4">
              <Cta where="final" label="Conversar com nossa equipe" className="px-8 py-4 w-full md:w-auto" />
              <a
                href="tel:62992013573"
                onClick={() => trackPhoneCall(PHONE_LABEL)}
                className="font-semibold text-slate-800 underline underline-offset-4 hover:text-primary"
              >
                Ligar: {PHONE_LABEL}
              </a>
              <p className="text-sm text-slate-500">Anápolis · Goiás</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ApoioFamilias;
