import { ArrowRight, CheckCircle2, ClipboardList, FileText, MapPin, MessageCircle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import ClinicGallery from '../components/ClinicGallery';
import FixedWhatsAppBar from '../components/FixedWhatsAppBar.jsx';
import ProofBar from '../components/premium/ProofBar';
import Reveal from '../components/premium/Reveal';
import ScrollCarousel from '../components/premium/ScrollCarousel';
import Layout from '../components/Layout/index.jsx';
import SEO from '../components/SEO.jsx';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp.jsx';
import { trackButtonClick } from '../hooks/useAnalytics';

// Atendimento particular com recibo para pedido de reembolso ao plano de saúde.
// Não prometer reembolso nem credenciamento: a decisão e o valor dependem do contrato de cada plano.
const WHATSAPP_MESSAGE = 'Olá! Gostaria de informações sobre atendimento particular com recibo para reembolso do plano de saúde.';

const especialidades = [
  { nome: 'Fonoaudiologia', texto: 'Fala, linguagem e comunicação da criança.', to: '/fonoaudiologia-anapolis' },
  { nome: 'Psicologia infantil', texto: 'Comportamento, emoções e atenção.', to: '/psicologia-infantil-anapolis' },
  { nome: 'Terapia ocupacional', texto: 'Autonomia, coordenação e integração sensorial.', to: '/terapia-ocupacional-anapolis' },
  { nome: 'Fisioterapia infantil', texto: 'Desenvolvimento motor, postura e equilíbrio.', to: '/fisioterapia-infantil-anapolis' },
  { nome: 'Neuropediatria', texto: 'Consulta com neuropediatra para acompanhar o desenvolvimento.', to: '/neuropediatra-anapolis' },
  { nome: 'Avaliação neuropsicológica', texto: 'Atenção, memória e aprendizagem.', to: '/avaliacao-neuropsicologica-anapolis' },
];

const steps = [
  { title: 'Você escolhe a especialidade', text: 'Fonoaudiologia, psicologia, terapia ocupacional, fisioterapia e outras, conforme a necessidade da criança.' },
  { title: 'Atendimento na clínica', text: 'A avaliação e as sessões acontecem na Clínica Fono Inova, com a equipe multidisciplinar.' },
  { title: 'Recibo do atendimento', text: 'A clínica emite o recibo do atendimento para você apresentar ao plano de saúde.' },
  { title: 'Pedido de reembolso ao plano', text: 'Você faz a solicitação pelos canais do seu plano. A análise e o valor reembolsado dependem do contrato.' },
];

const ask = [
  'O contrato prevê reembolso para a especialidade que a criança precisa?',
  'Qual é o valor ou o percentual reembolsado por sessão, e existe limite mensal ou anual?',
  'É preciso pedido médico ou encaminhamento? Qual o prazo para apresentar o recibo?',
  'Quais documentos o plano exige junto com o recibo (relatório, laudo, formulário próprio)?',
];

const faqs = [
  {
    q: 'A Fono Inova atende pelo meu plano de saúde?',
    a: 'Hoje atendemos de forma particular e, por convênio, apenas a Base Aérea de Anápolis (BAAN). Para os demais planos, o atendimento é particular e você pode solicitar reembolso ao seu plano, conforme o contrato.',
  },
  {
    q: 'A clínica garante o reembolso?',
    a: 'Não. O reembolso é uma decisão do plano de saúde e depende do contrato, da especialidade e dos documentos apresentados. A clínica emite o recibo do atendimento.',
  },
  {
    q: 'Funciona com Unimed, IPASGO ou outros planos?',
    a: 'A possibilidade de reembolso é definida pelo seu plano. Consulte a operadora sobre as regras de reembolso de consultas e terapias do seu contrato. Se quiser, nossa equipe explica quais informações o recibo traz.',
  },
  {
    q: 'Quanto custa o atendimento particular?',
    a: 'Os valores e condições são enviados pelo WhatsApp, junto com a explicação de como funciona cada especialidade, para você decidir com clareza.',
  },
  {
    q: 'Preciso de pedido médico?',
    a: 'Alguns planos exigem pedido médico ou encaminhamento para liberar o reembolso. Confirme com a sua operadora antes de iniciar, para evitar surpresas.',
  },
];

const schemaFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const ReembolsoPlanoSaudeAnapolis = () => {
  const Cta = ({ where, label, className = '' }: { where: string; label: string; className?: string }) => (
    <ButtonWhatsApp
      onClick={() => trackButtonClick(`WhatsApp Reembolso - ${where}`)}
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
        title="Plano de Saúde e Reembolso: Fonoaudiologia e Terapias Infantis em Anápolis | Fono Inova"
        description="Atendimento particular com recibo para pedir reembolso ao plano de saúde: fonoaudiologia, psicologia, terapia ocupacional e fisioterapia infantil em Anápolis. Veja como funciona."
        keywords="reembolso plano de saúde fonoaudiologia anápolis, fonoaudiólogo plano de saúde anápolis, terapia infantil reembolso, fisioterapia infantil plano de saúde anápolis"
        url="/reembolso-plano-de-saude-anapolis"
        image="/images/clinica/ia/reembolso-plano-saude.webp"
        schema={[schemaFaq]}
      />

      <Breadcrumb items={[{ label: 'Plano de saúde e reembolso' }]} />

      <section className="relative pt-24 pb-12 md:pt-28 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-teal-50/40 to-emerald-50/30" />
        <div className="relative container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 space-y-6">
              <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full text-sm font-medium text-primary">
                <MapPin className="w-4 h-4" />
                Anápolis · Jundiaí
              </span>
              <h1 className="text-4xl md:text-5xl font-bold font-poppins text-slate-900 leading-tight">
                Terapias infantis com recibo para pedir reembolso ao seu plano de saúde.
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
                Quando a criança precisa de fonoaudiologia, psicologia, terapia ocupacional ou fisioterapia, o cuidado não precisa esperar. Atendemos de forma particular, com equipe multidisciplinar no mesmo lugar, e emitimos o recibo para você solicitar o reembolso ao seu plano.
              </p>
              <Cta where="hero" label="Tirar dúvidas pelo WhatsApp" className="px-8 py-4 w-full sm:w-auto" />
              <p className="flex items-start gap-2 text-sm text-slate-500 max-w-xl">
                <ShieldCheck className="w-5 h-5 shrink-0 text-primary" />
                O reembolso depende do contrato de cada plano e não é garantido pela clínica.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src="/images/clinica/ia/reembolso-plano-saude.webp"
                alt="Imagem ilustrativa: mãe organizando o recibo e o celular enquanto a filha brinca ao fundo"
                className="w-full h-72 sm:h-96 lg:h-[440px] object-cover rounded-3xl shadow-xl"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      <ProofBar className="-mt-8 md:-mt-10" />

      <Reveal><section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <h2 className="text-3xl font-bold font-poppins text-slate-900 mb-8">Como funciona</h2>
          <ol className="grid md:grid-cols-2 gap-5">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-2xl border border-slate-200 p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">{i + 1}</span>
                <div>
                  <h3 className="font-semibold text-slate-900">{s.title}</h3>
                  <p className="mt-1 text-slate-600">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section></Reveal>

      <Reveal><section className="py-14 md:py-20 bg-slate-50" aria-labelledby="esp-titulo">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 id="esp-titulo" className="text-3xl font-bold font-poppins text-slate-900 mb-3">Especialidades no mesmo lugar</h2>
          <p className="text-slate-600 max-w-2xl mb-8">Toda a equipe conversa sobre a criança. Veja como cada área funciona.</p>
          <ScrollCarousel ariaLabel="Especialidades da clínica" itemClassName="w-[78%] sm:w-[46%] lg:w-[31%]">
            {especialidades.map((e) => (
              <Link
                key={e.to}
                to={e.to}
                className="group flex h-full min-h-[11rem] flex-col justify-between rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
              >
                <span>
                  <span className="block text-xl font-bold font-poppins text-slate-900">{e.nome}</span>
                  <span className="mt-2 block text-slate-600">{e.texto}</span>
                </span>
                <span className="mt-5 inline-flex items-center gap-2 font-semibold text-primary">
                  Saiba mais <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </ScrollCarousel>
        </div>
      </section></Reveal>

      <Reveal><section className="bg-white pt-4 pb-14 md:pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <img
            src="/images/clinica/ia/familia-orientacao-documentos.webp"
            alt="Imagem ilustrativa: família conversando com a equipe e organizando documentos em uma sala de atendimento"
            className="w-full h-64 sm:h-80 object-cover rounded-3xl shadow-lg"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section></Reveal>

      <Reveal><section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold font-poppins text-slate-900 mb-5">
              <ClipboardList className="w-6 h-6 text-primary" />
              O que perguntar ao seu plano
            </h2>
            <ul className="space-y-3">
              {ask.map((item) => (
                <li key={item} className="flex gap-3 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-primary mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold font-poppins text-slate-900 mb-5">
              <FileText className="w-6 h-6 text-primary" />
              Por que a Fono Inova
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Fonoaudiologia, psicologia, terapia ocupacional, fisioterapia, neuropediatria e avaliação neuropsicológica na mesma clínica, com a equipe conversando sobre a criança. Menos deslocamento para a família e um plano terapêutico único.
            </p>
            <p className="mt-4 text-slate-700 leading-relaxed">Atendimento de segunda a sexta, das 8h às 18h, na Av. Minas Gerais, 405, Jundiaí, Anápolis.</p>
          </div>
        </div>
      </section></Reveal>

      <ClinicGallery variant="carousel" />

      <Reveal><section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h2 className="text-3xl font-bold font-poppins text-slate-900 mb-6">Perguntas frequentes</h2>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="cursor-pointer list-none font-semibold text-slate-900 flex justify-between gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded">
                  {f.q}
                  <span aria-hidden className="text-primary transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section></Reveal>

      <Reveal><section className="py-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-2xl space-y-5">
          <h2 className="text-3xl font-bold font-poppins text-slate-900">Vamos entender o melhor caminho para sua família?</h2>
          <p className="text-slate-600">Conte a necessidade da criança e explicamos como funciona o atendimento e o recibo.</p>
          <Cta where="final" label="Conversar com nossa equipe" className="px-8 py-4 w-full sm:w-auto" />
        </div>
      </section></Reveal>
      <FixedWhatsAppBar message={WHATSAPP_MESSAGE} />
    </Layout>
  );
};

export default ReembolsoPlanoSaudeAnapolis;
