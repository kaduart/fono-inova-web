import { ArrowRight, CheckCircle2, ClipboardList, FileText, HeartHandshake, MapPin, MessageCircle, School, ShieldCheck, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import ClinicGallery from '../components/ClinicGallery';
import FixedWhatsAppBar from '../components/FixedWhatsAppBar.jsx';
import ProofBar from '../components/premium/ProofBar';
import Reveal from '../components/premium/Reveal';
import Layout from '../components/Layout/index.jsx';
import SEO from '../components/SEO.jsx';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp.jsx';
import { trackButtonClick } from '../hooks/useAnalytics';

// Consulta com neuropediatra para laudo de TEA/TDAH.
// Regras (Kadu): primeiro o valor, depois o preço. Neuro é só particular: não citar convênio nem plano aqui.
// Sem nome de profissional, sem quantidade de profissionais, sem prometer diagnóstico ou laudo.
// Rótulos dos botões sem "agendar": botão com "agendar" vai para o /agendar, e a consulta neuro é marcada pelo WhatsApp.
const SLUG = 'laudo-autismo-tdah-neuropediatra-anapolis';
const WHATSAPP_MESSAGE = 'Oi! Vi no site a página do laudo de autismo (TEA) e TDAH e gostaria de saber como marcar a consulta particular com o neuropediatra.';

const sinais = [
  { titulo: 'Não fala ou fala pouco', texto: 'Fala menos palavras do que o esperado para a idade, ou parou de falar palavras que já dizia.' },
  { titulo: 'Não olha nos olhos', texto: 'Pouco contato visual, não atende quando é chamado pelo nome ou brinca mais sozinho.' },
  { titulo: 'Agitação', texto: 'Dificuldade de ficar parado, de manter a atenção ou de esperar a vez, em casa e na escola.' },
];

const valor = [
  { icon: Stethoscope, titulo: 'Olhar para o desenvolvimento como um todo', texto: 'O neuropediatra conversa com a família, revê a história e os marcos da criança, observa o comportamento e faz o exame neurológico.' },
  { icon: FileText, titulo: 'Laudo, quando indicado', texto: 'Se a avaliação indicar, o neuropediatra emite o laudo. Ele é um documento médico que descreve o quadro da criança.' },
  { icon: School, titulo: 'Direitos na escola', texto: 'O laudo ajuda a família a solicitar na escola os apoios previstos em lei, como adaptações e acompanhamento.' },
  { icon: ClipboardList, titulo: 'Direção para a terapia', texto: 'Com o quadro mais claro, fica mais fácil saber quais terapias a criança precisa e por onde começar.' },
];

const steps = [
  { title: 'Você chama no WhatsApp', text: 'Conte o que tem percebido na criança e tire suas dúvidas sobre a consulta.' },
  { title: 'Marcamos a consulta', text: 'A equipe combina o melhor dia e horário com a família.' },
  { title: 'Consulta com o neuropediatra', text: 'Avaliação do desenvolvimento da criança, com tempo para ouvir a família.' },
  { title: 'Orientação e próximos passos', text: 'Você sai sabendo o caminho. Quando indicado, o neuropediatra emite o laudo.' },
];

const faqs = [
  {
    q: 'A consulta garante o laudo de autismo ou TDAH?',
    a: 'Não. O laudo é emitido quando a avaliação do neuropediatra indicar. Em alguns casos ele pode pedir mais informações, exames ou avaliações complementares antes de concluir.',
  },
  {
    q: 'Quanto custa a consulta com o neuropediatra?',
    a: 'A consulta é particular, no valor de R$ 500. Pelo WhatsApp a equipe explica como funciona e combina o horário.',
  },
  {
    q: 'Meu filho já faz fono, psicologia ou terapia ocupacional na clínica. Posso marcar?',
    a: 'Pode. Famílias que já fazem terapia na Clínica Fono Inova também podem marcar a consulta com o neuropediatra. Basta chamar no WhatsApp.',
  },
  {
    q: 'O que levar na consulta?',
    a: 'Se tiver, leve relatórios da escola e das terapias, exames anteriores e a caderneta da criança. Anotar os comportamentos que você tem percebido também ajuda.',
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

const LaudoTeaTdahNeuropediatraAnapolis = () => {
  const Cta = ({ where, label, className = '' }: { where: string; label: string; className?: string }) => (
    <ButtonWhatsApp
      onClick={() => trackButtonClick(`WhatsApp Laudo TEA TDAH Neuro - ${where}`)}
      message={WHATSAPP_MESSAGE}
      lpSlug={SLUG}
      lpCategory="neuropediatria"
      className={`bg-green-700 hover:bg-green-800 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all justify-center ${className}`}
    >
      <MessageCircle className="w-5 h-5" />
      {label}
    </ButtonWhatsApp>
  );

  return (
    <Layout>
      <SEO
        title="Laudo de Autismo (TEA) e TDAH com Neuropediatra em Anápolis | Fono Inova"
        description="Consulta com neuropediatra em Anápolis para avaliar o desenvolvimento da criança e, quando indicado, emitir o laudo de TEA ou TDAH. Fale pelo WhatsApp."
        keywords="laudo autismo anápolis, laudo tea anápolis, laudo tdah anápolis, neuropediatra laudo autismo, neuropediatra anápolis tdah"
        url={`/${SLUG}`}
        image="/images/clinica/ia/neuropediatria.webp"
        schema={[schemaFaq]}
      />

      <Breadcrumb items={[{ label: 'Neuropediatra', href: '/neuropediatra-anapolis' }, { label: 'Laudo de TEA e TDAH' }]} />

      <section className="relative pt-24 pb-12 md:pt-28 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#f6f9f8]" />
        <div className="relative container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 space-y-6">
              <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full text-sm font-medium text-primary">
                <MapPin className="w-4 h-4" />
                Anápolis · Jundiaí
              </span>
              <h1 className="text-4xl md:text-5xl font-bold font-poppins text-slate-900 leading-tight">
                Laudo de autismo (TEA) e TDAH com neuropediatra em Anápolis
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
                O neuropediatra avalia o desenvolvimento da criança como um todo e, quando indicado, emite o laudo. Ele ajuda a garantir os direitos na escola e a direcionar a terapia.
              </p>
              <Cta where="hero" label="Falar sobre a consulta no WhatsApp" className="px-8 py-4 w-full sm:w-auto" />
              <p className="flex items-start gap-2 text-sm text-slate-500 max-w-xl">
                <ShieldCheck className="w-5 h-5 shrink-0 text-primary" />
                O laudo é emitido quando a avaliação indicar. A consulta não substitui o acompanhamento terapêutico.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src="/images/clinica/ia/neuropediatria.webp"
                alt="Imagem ilustrativa: profissional de saúde brincando com blocos junto de uma criança"
                className="w-full h-72 sm:h-96 lg:h-[440px] object-cover rounded-3xl shadow-xl"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      <ProofBar className="-mt-8 md:-mt-10" />

      <Reveal><section className="py-14 md:py-20 bg-white" aria-labelledby="sinais-titulo">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <h2 id="sinais-titulo" className="text-3xl font-bold font-poppins text-slate-900 mb-3">Sinais que costumam trazer as famílias</h2>
          <p className="text-slate-600 max-w-2xl mb-8">Perceber um desses sinais não quer dizer que a criança tem autismo ou TDAH. A consulta serve para entender o que está acontecendo.</p>
          <ul className="grid md:grid-cols-3 gap-5">
            {sinais.map((s) => (
              <li key={s.titulo} className="rounded-2xl border border-slate-200 p-5">
                <h3 className="flex items-center gap-2 font-semibold text-slate-900">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-primary" />
                  {s.titulo}
                </h3>
                <p className="mt-2 text-slate-600">{s.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section></Reveal>

      <Reveal><section className="py-14 md:py-20 bg-slate-50" aria-labelledby="valor-titulo">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <h2 id="valor-titulo" className="text-3xl font-bold font-poppins text-slate-900 mb-8">O que a consulta faz pela sua família</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {valor.map(({ icon: Icon, titulo, texto }) => (
              <div key={titulo} className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900">{titulo}</h3>
                  <p className="mt-1 text-slate-600">{texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section></Reveal>

      <Reveal><section className="py-14 md:py-20 bg-white" aria-labelledby="preco-titulo">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-primary/5 ring-1 ring-primary/20 p-6 md:p-8">
            <h2 id="preco-titulo" className="text-sm font-semibold uppercase tracking-wider text-primary">Consulta particular</h2>
            <p className="mt-2 text-4xl md:text-5xl font-bold font-poppins text-slate-900">R$ 500</p>
            <p className="mt-3 text-slate-600">Consulta com o neuropediatra na Clínica Fono Inova, em Anápolis.</p>
            <Cta where="preco" label="Falar sobre a consulta no WhatsApp" className="mt-6 px-6 py-4 w-full" />
          </div>
          <div className="rounded-3xl ring-1 ring-slate-200 p-6 md:p-8">
            <h2 className="flex items-center gap-2 text-2xl font-bold font-poppins text-slate-900">
              <HeartHandshake className="w-6 h-6 text-primary" />
              Já faz terapia aqui?
            </h2>
            <p className="mt-3 text-slate-700 leading-relaxed">
              Famílias que já fazem fono, psicologia ou terapia ocupacional na clínica também podem marcar a consulta com o neuropediatra. A equipe conversa sobre a criança e o cuidado fica no mesmo lugar.
            </p>
          </div>
        </div>
      </section></Reveal>

      <Reveal><section className="py-14 md:py-20 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <h2 className="text-3xl font-bold font-poppins text-slate-900 mb-8">Como funciona</h2>
          <ol className="grid md:grid-cols-2 gap-5">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">{i + 1}</span>
                <div>
                  <h3 className="font-semibold text-slate-900">{s.title}</h3>
                  <p className="mt-1 text-slate-600">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link
            to="/neuropediatra-anapolis"
            className="mt-8 inline-flex items-center gap-2 font-semibold text-primary hover:underline"
          >
            Saiba mais sobre a neuropediatria na clínica <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
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
          <h2 className="text-3xl font-bold font-poppins text-slate-900">Quer entender o desenvolvimento do seu filho?</h2>
          <p className="text-slate-600">Conte o que você tem percebido. A equipe da Clínica Fono Inova explica como funciona a consulta com o neuropediatra 💚</p>
          <Cta where="final" label="Conversar com a equipe no WhatsApp" className="px-8 py-4 w-full sm:w-auto" />
          <p className="text-sm text-slate-500">Av. Minas Gerais, 405, Jundiaí, Anápolis · WhatsApp (62) 99201-3573</p>
        </div>
      </section></Reveal>
      <FixedWhatsAppBar message={WHATSAPP_MESSAGE} />
    </Layout>
  );
};

export default LaudoTeaTdahNeuropediatraAnapolis;
