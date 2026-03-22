import {
  Brain,
  Calendar,
  CheckCircle2,
  HandMetal,
  Headphones,
  Heart,
  MessageCircle,
  Mic,
  Music,
  Smile,
  Sparkles,
  Star,
  Users,
  Volume2,
  Zap
} from 'lucide-react';
import { useEffect } from 'react';
import Layout from '../components/Layout';
import OptimizedImage from '../components/OptimizedImage';
import SEO from '../components/SEO';
import { Badge } from '../components/ui/badge';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp';
import { schemaMusicoterapia, schemaFAQMusicoterapia } from '../schemas/clinicaSchemas.js';

const MusicoterapiaPage = () => {
  useEffect(() => {
    document.title = 'Musicoterapia Infantil | TEA e Desenvolvimento | Clínica Fono Inova';
    window.scrollTo(0, 0);
  }, []);

  const beneficios = [
    {
      icon: <Mic className="w-8 h-8 text-indigo-600" />,
      titulo: 'Comunicação e linguagem',
      descricao:
        'A música é um canal de comunicação não verbal poderoso. Com o canto, vocalizações e ritmo, estimulamos a emissão oral, vocabulário e produção de frases — mesmo em crianças que ainda não falam.',
    },
    {
      icon: <Users className="w-8 h-8 text-indigo-600" />,
      titulo: 'Interação social',
      descricao:
        'Contato visual, atenção compartilhada, imitação e troca de turnos — a interação musical estimula naturalmente habilidades sociais essenciais.',
    },
    {
      icon: <Heart className="w-8 h-8 text-indigo-600" />,
      titulo: 'Regulação emocional',
      descricao:
        'A música ajuda a expressar e gerenciar emoções. Reduz estresse, ansiedade e comportamentos desafiadores, promovendo calma e bem-estar.',
    },
    {
      icon: <Brain className="w-8 h-8 text-indigo-600" />,
      titulo: 'Foco e atenção',
      descricao:
        'Ritmo, melodia e dinâmica musical capturam a atenção da criança de forma natural, aumentando gradualmente o tempo de concentração.',
    },
    {
      icon: <HandMetal className="w-8 h-8 text-indigo-600" />,
      titulo: 'Coordenação motora',
      descricao:
        'Tocar instrumentos, bater palmas, dançar — a manipulação musical desenvolve coordenação motora fina e grossa de forma prazerosa.',
    },
    {
      icon: <Sparkles className="w-8 h-8 text-indigo-600" />,
      titulo: 'Consciência corporal',
      descricao:
        'Movimentar o corpo ao ritmo da música melhora a percepção corporal, o equilíbrio e a organização sensorial da criança.',
    },
  ];

  const paraQuem = [
    {
      nome: 'TEA (Autismo)',
      descricao:
        'Crianças com autismo têm uma relação especial com a música. Estudos mostram que a musicoterapia causa um efeito único no cérebro de pessoas com TEA, ativando neurônios espelho e facilitando a comunicação. Em apenas 4 meses de sessões semanais, já é possível verificar melhoras significativas.',
      cor: 'border-l-purple-500 bg-purple-50',
    },
    {
      nome: 'Síndrome de Down',
      descricao:
        'A música estimula linguagem, ritmo e interação de forma natural e prazerosa. Crianças com Síndrome de Down respondem muito bem à musicoterapia, desenvolvendo vocalizações e habilidades sociais.',
      cor: 'border-l-yellow-500 bg-yellow-50',
    },
    {
      nome: 'Atrasos na linguagem',
      descricao:
        'Para crianças que ainda não falam ou falam pouco, a música serve como ponte. O aspecto não verbal da música engaja a criança e gradualmente estimula vocalizações e palavras.',
      cor: 'border-l-blue-500 bg-blue-50',
    },
    {
      nome: 'TDAH e dificuldades de atenção',
      descricao:
        'O ritmo e a estrutura musical ajudam a organizar o comportamento e aumentar o tempo de concentração de forma natural e sem pressão.',
      cor: 'border-l-green-500 bg-green-50',
    },
    {
      nome: 'Dificuldades emocionais e comportamentais',
      descricao:
        'Ansiedade, agressividade, timidez excessiva — a música oferece um espaço seguro para a criança expressar sentimentos e desenvolver autorregulação.',
      cor: 'border-l-pink-500 bg-pink-50',
    },
  ];

  const oQueFazemos = [
    {
      icon: <Volume2 className="w-6 h-6 text-indigo-600" />,
      titulo: 'Improvisação musical',
      descricao: 'Criança e terapeuta criam música juntos, explorando sons, ritmos e melodias livremente.',
    },
    {
      icon: <Music className="w-6 h-6 text-indigo-600" />,
      titulo: 'Canção terapêutica',
      descricao: 'Canções personalizadas estimulam linguagem, memória e expressão emocional.',
    },
    {
      icon: <Headphones className="w-6 h-6 text-indigo-600" />,
      titulo: 'Audição musical ativa',
      descricao: 'Escutar e responder à música — com movimentos, gestos ou vocalizações.',
    },
    {
      icon: <HandMetal className="w-6 h-6 text-indigo-600" />,
      titulo: 'Instrumentos adaptados',
      descricao: 'Instrumentos musicais adaptados para cada criança explorar sons e ritmos com autonomia.',
    },
    {
      icon: <Smile className="w-6 h-6 text-indigo-600" />,
      titulo: 'Brincadeiras musicais',
      descricao: 'Jogos rítmicos, danças e brincadeiras que estimulam interação e prazer pelo movimento.',
    },
    {
      icon: <Zap className="w-6 h-6 text-indigo-600" />,
      titulo: 'Composição e criação',
      descricao: 'A criança participa da criação de letras e melodias, exercitando criatividade e expressão.',
    },
  ];

  const comoFunciona = [
    {
      passo: '01',
      titulo: 'Avaliação musicoterapêutica',
      descricao:
        'O musicoterapeuta observa como a criança responde aos sons, instrumentos e interações musicais, avaliando habilidades e necessidades.',
    },
    {
      passo: '02',
      titulo: 'Plano terapêutico personalizado',
      descricao:
        'Cada sessão é planejada com objetivos claros — comunicação, socialização, regulação emocional ou coordenação — de acordo com o perfil da criança.',
    },
    {
      passo: '03',
      titulo: 'Sessões individuais ou em grupo',
      descricao:
        'Sessões individuais para trabalho focado ou em pequenos grupos para estimular interação social — sempre com abordagem lúdica e acolhedora.',
    },
    {
      passo: '04',
      titulo: 'Orientação aos pais',
      descricao:
        'Convidamos pais para participar das sessões e ensinamos como usar a música em casa para potencializar os resultados do tratamento.',
    },
  ];

  return (
    <Layout>
      <SEO
        title="Musicoterapia Infantil em Anápolis | Clínica Fono Inova"
        description="Musicoterapia para TEA, atrasos de linguagem e desenvolvimento infantil em Anápolis. Agende uma avaliação no bairro Jundiaí."
        keywords="musicoterapia infantil anapolis, tea anapolis, atraso linguagem musica, terapia musical"
        image="/images/musicoterapia-hero.png"
        url="https://www.clinicafonoinova.com.br/musicoterapia"
        type="article"
        schema={[schemaMusicoterapia, schemaFAQMusicoterapia]}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
            {/* Texto */}
            <div className="animate-fade-in-up order-2 lg:order-1">
              <Badge variant="secondary" className="mb-4 bg-indigo-50 text-indigo-700 border-indigo-100 px-3 py-1 text-xs uppercase tracking-wider font-semibold">
                Musicoterapia Clínica
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-900 leading-tight mb-6">
                A Música como <span className="text-indigo-600">Caminho Terapêutico</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
                Terapia especializada para TEA, atrasos de linguagem e desenvolvimento no bairro <strong>Jundiaí</strong>, Anápolis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <ButtonWhatsApp
                  onClick={() => { }}
                  message="Oi! Vi no site sobre musicoterapia e achei interessante.\n\nQueria entender melhor como funciona para meu filho(a). Pode me explicar?"
                  icon={Calendar}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Agendar Avaliação
                </ButtonWhatsApp>
              </div>
            </div>

            {/* Imagem */}
            <div className="relative order-1 lg:order-2">
              <div className="aspect-square bg-gradient-to-br from-indigo-200 to-indigo-400 rounded-3xl overflow-hidden shadow-2xl">
                <OptimizedImage
                  src="/images/musicoterapia-hero.png"
                  alt="Criança em sessão de musicoterapia"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-indigo-50">
                <p className="text-4xl font-bold text-indigo-600">♪♫</p>
                <p className="text-sm text-gray-600">Linguagem Universal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ O QUE É ═══════════════ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              O que é Musicoterapia?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Musicoterapia é o uso profissional da música e seus elementos — ritmo, melodia,
              harmonia, timbre — como ferramenta terapêutica. Diferente da musicalização (que
              ensina música), a musicoterapia usa a música como <strong>veículo para alcançar
                objetivos clínicos</strong>: melhorar comunicação, desenvolver interação social,
              regular emoções e estimular o desenvolvimento cognitivo e motor.
            </p>
            <p className="text-gray-500 mt-4 leading-relaxed">
              A Associação Americana de Musicoterapia e a Federação Mundial de Musicoterapia
              recomendam essa abordagem para crianças com autismo e outros transtornos do
              neurodesenvolvimento, com resultados comprovados por estudos científicos.
            </p>
          </div>

          <div className="bg-indigo-50 rounded-3xl p-8 md:p-10 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Evidência científica</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Estudos de ressonância magnética funcional revelam que a música causa um efeito
                  único no cérebro de pessoas com autismo. Pesquisas mostram que, com apenas
                  <strong> 4 meses de sessões semanais</strong>, já é possível verificar
                  efeitos significativos na comunicação e interação social de crianças com TEA.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ PARA QUEM ═══════════════ */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Para quem é indicada?
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            A musicoterapia beneficia crianças com diferentes condições — e mesmo crianças com
            alto comprometimento cognitivo ou motor podem se beneficiar da música.
          </p>

          <div className="space-y-4 max-w-4xl mx-auto">
            {paraQuem.map((item, index) => (
              <div
                key={index}
                className={`border-l-4 ${item.cor} p-6 rounded-r-xl hover:shadow-md transition-all`}
              >
                <h3 className="font-bold text-lg text-gray-900 mb-2">{item.nome}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ BENEFÍCIOS ═══════════════ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Benefícios comprovados
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            A musicoterapia trabalha múltiplas áreas do desenvolvimento simultaneamente —
            tudo através de uma experiência prazerosa e acolhedora.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beneficios.map((beneficio, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-indigo-50 to-violet-50 p-6 rounded-2xl hover:shadow-lg transition-all"
              >
                <div className="mb-4">{beneficio.icon}</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{beneficio.titulo}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{beneficio.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ O QUE FAZEMOS NAS SESSÕES ═══════════════ */}
      <section className="py-16 md:py-20 bg-indigo-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            O que acontece nas sessões?
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Cada sessão é única e planejada de acordo com as necessidades da criança.
            O musicoterapeuta utiliza diferentes abordagens:
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {oQueFazemos.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all"
              >
                <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.titulo}</h3>
                <p className="text-gray-600 text-sm">{item.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ COMO FUNCIONA ═══════════════ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Como funciona na Fono Inova?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {comoFunciona.map((item, index) => (
              <div key={index} className="relative text-center md:text-left">
                <div className="text-5xl font-black text-indigo-100 mb-3">{item.passo}</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{item.titulo}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ INTEGRAÇÃO MULTIDISCIPLINAR ═══════════════ */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
              Musicoterapia integrada à equipe completa
            </h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8 leading-relaxed">
              Na Fono Inova, a musicoterapia potencializa o trabalho das demais especialidades.
              O musicoterapeuta trabalha em conjunto com toda a equipe, compartilhando objetivos
              e estratégias para o melhor resultado do seu filho.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'Fonoaudiologia — linguagem, fala e comunicação',
                'Psicologia — comportamento e emocional',
                'Terapia Ocupacional — integração sensorial',
                'Psicomotricidade — corpo e movimento',
                'Fisioterapia — coordenação e equilíbrio',
                'Psicopedagogia — aprendizagem e cognição',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-indigo-50">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Perguntas frequentes
          </h2>

          <div className="space-y-6">
            {[
              {
                pergunta: 'Meu filho precisa saber tocar algum instrumento?',
                resposta:
                  'Não! A musicoterapia não é aula de música. Não é necessário nenhum conhecimento musical prévio. O musicoterapeuta adapta toda a experiência ao nível e às necessidades da criança.',
              },
              {
                pergunta: 'A musicoterapia substitui a fonoaudiologia ou psicologia?',
                resposta:
                  'Não substitui — complementa. A musicoterapia é mais uma ferramenta no plano terapêutico da criança. Na Fono Inova, ela trabalha em conjunto com as demais especialidades para potencializar os resultados.',
              },
              {
                pergunta: 'A partir de que idade meu filho pode fazer musicoterapia?',
                resposta:
                  'A musicoterapia pode ser iniciada desde os primeiros meses de vida. Para bebês, trabalhamos com estímulos sonoros e interação musical com os pais. Para crianças maiores, as sessões são mais estruturadas e com objetivos específicos.',
              },
              {
                pergunta: 'Quantas sessões por semana são recomendadas?',
                resposta:
                  'Em geral, 1 a 2 sessões semanais. A frequência é definida na avaliação inicial, considerando o quadro clínico da criança e os objetivos terapêuticos.',
              },
            ].map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2">{faq.pergunta}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.resposta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA FINAL ═══════════════ */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-indigo-600 to-violet-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Music className="w-12 h-12 mx-auto mb-6 text-indigo-200" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            A música abre portas que outras terapias não alcançam
          </h2>
          <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
            Se seu filho tem dificuldade de comunicação, interação ou regulação emocional,
            a musicoterapia pode ser o complemento que faltava no tratamento.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonWhatsApp
              onClick={() => { }}
              message="Oi! Vi no site sobre musicoterapia e achei interessante.\n\nQueria entender melhor como funciona para meu filho(a). Pode me explicar?"
              icon={Calendar}
              className="bg-white text-indigo-700 hover:bg-indigo-50 px-10 py-4 rounded-full text-lg font-semibold shadow-lg flex items-center justify-center gap-2"
            >
              Agendar Avaliação
            </ButtonWhatsApp>
            <ButtonWhatsApp
              onClick={() => { }}
              message="Oi! Vi no site sobre musicoterapia e achei interessante.\n\nQueria entender melhor como funciona. Pode me explicar?"
              icon={MessageCircle}
              className="border-2 border-white/60 text-white hover:bg-white/10 px-10 py-4 rounded-full text-lg font-semibold flex items-center justify-center gap-2"
            >
              Tirar Dúvidas
            </ButtonWhatsApp>
          </div>
          <p className="text-sm text-indigo-200 mt-6">
            📍 Clínica Fono Inova — Anápolis, GO
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default MusicoterapiaPage;
