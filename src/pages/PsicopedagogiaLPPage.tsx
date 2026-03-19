import { useEffect } from 'react';
import {
  BookOpen,
  Brain,
  PenTool,
  Calendar,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  Users,
  Target,
  Lightbulb,
  GraduationCap,
  Puzzle,
  Eye,
  Calculator,
  FileText,
  Star,
  AlertTriangle,
} from 'lucide-react';
import Layout from '../components/Layout';
import OptimizedImage from '../components/OptimizedImage';
import SEO from '../components/SEO';
import { Badge } from '../components/ui/badge';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp';

const PsicopedagogiaLPPage = () => {
  useEffect(() => {
    document.title = 'Psicopedagogia Infantil | Dificuldades de Aprendizagem | Clínica Fono Inova';
    window.scrollTo(0, 0);
  }, []);

  const sinaisAlerta = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      titulo: 'Dificuldade na leitura',
      descricao: 'Troca letras, lê muito devagar, não compreende o que leu ou evita ler em voz alta',
    },
    {
      icon: <PenTool className="w-6 h-6" />,
      titulo: 'Problemas na escrita',
      descricao: 'Letra ilegível, erros ortográficos persistentes, dificuldade para copiar do quadro',
    },
    {
      icon: <Calculator className="w-6 h-6" />,
      titulo: 'Dificuldade em matemática',
      descricao: 'Não entende operações básicas, confunde números, dificuldade com raciocínio lógico',
    },
    {
      icon: <Brain className="w-6 h-6" />,
      titulo: 'Atenção e concentração',
      descricao: 'Não consegue focar nas tarefas, se distrai facilmente, esquece o que acabou de aprender',
    },
    {
      icon: <FileText className="w-6 h-6" />,
      titulo: 'Notas baixas persistentes',
      descricao: 'Mesmo estudando, o desempenho não melhora. Esforço alto, resultado baixo.',
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      titulo: 'Recusa escolar',
      descricao: 'Não quer ir à escola, chora, reclama de dor de barriga ou cabeça antes das aulas',
    },
  ];

  const condicoesTratadas = [
    {
      nome: 'Dislexia',
      descricao: 'Dificuldade específica na leitura e interpretação de textos, mesmo com inteligência preservada.',
      icon: <BookOpen className="w-6 h-6" />,
    },
    {
      nome: 'Discalculia',
      descricao: 'Dificuldade em compreender números, operações matemáticas e raciocínio quantitativo.',
      icon: <Calculator className="w-6 h-6" />,
    },
    {
      nome: 'Disgrafia',
      descricao: 'Dificuldade na escrita, com letra ilegível, lentidão e dificuldade na organização espacial.',
      icon: <PenTool className="w-6 h-6" />,
    },
    {
      nome: 'TDAH',
      descricao: 'Déficit de atenção e hiperatividade que impactam diretamente o desempenho escolar.',
      icon: <Brain className="w-6 h-6" />,
    },
    {
      nome: 'TEA (Autismo)',
      descricao: 'Dificuldades de aprendizagem relacionadas à comunicação, interação e flexibilidade cognitiva.',
      icon: <Puzzle className="w-6 h-6" />,
    },
    {
      nome: 'Dificuldades emocionais',
      descricao: 'Ansiedade, baixa autoestima e bloqueios emocionais que interferem no aprender.',
      icon: <Eye className="w-6 h-6" />,
    },
  ];

  const beneficios = [
    {
      icon: <Target className="w-8 h-8 text-amber-600" />,
      titulo: 'Identificação precoce',
      descricao:
        'Quanto antes o problema é identificado, mais eficaz a intervenção. O psicopedagogo avalia as raízes da dificuldade — não apenas os sintomas.',
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-amber-600" />,
      titulo: 'Estratégias personalizadas',
      descricao:
        'Cada criança aprende de um jeito. Criamos planos sob medida com técnicas lúdicas, jogos e atividades que respeitam o ritmo do seu filho.',
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-amber-600" />,
      titulo: 'Melhora no desempenho escolar',
      descricao:
        'Leitura, escrita e matemática se desenvolvem quando trabalhamos as habilidades cognitivas de base — atenção, memória e percepção.',
    },
    {
      icon: <Sparkles className="w-8 h-8 text-amber-600" />,
      titulo: 'Autoestima e confiança',
      descricao:
        'A criança que aprende a aprender se sente capaz. O psicopedagogo resgata o prazer pelo conhecimento e a confiança do seu filho.',
    },
    {
      icon: <Users className="w-8 h-8 text-amber-600" />,
      titulo: 'Orientação para família e escola',
      descricao:
        'Trabalhamos junto com pais e professores, oferecendo relatórios e estratégias para apoiar a criança em todos os ambientes.',
    },
    {
      icon: <Puzzle className="w-8 h-8 text-amber-600" />,
      titulo: 'Desenvolvimento socioemocional',
      descricao:
        'Além do acadêmico, trabalhamos habilidades emocionais e sociais — fundamentais para a vida escolar e pessoal da criança.',
    },
  ];

  const comoFunciona = [
    {
      passo: '01',
      titulo: 'Anamnese e entrevista familiar',
      descricao:
        'Conhecemos a história da criança, o contexto familiar e escolar, e as queixas dos pais e professores.',
    },
    {
      passo: '02',
      titulo: 'Avaliação psicopedagógica',
      descricao:
        'Através de atividades lúdicas, jogos, provas e testes, identificamos como a criança aprende e onde estão os obstáculos.',
    },
    {
      passo: '03',
      titulo: 'Devolutiva e plano de intervenção',
      descricao:
        'Apresentamos os resultados aos pais e escola, com relatório detalhado e plano terapêutico individualizado.',
    },
    {
      passo: '04',
      titulo: 'Sessões semanais + acompanhamento',
      descricao:
        'Sessões lúdicas focadas nas dificuldades específicas, com reavaliações periódicas e orientação contínua à família.',
    },
  ];

  return (
    <Layout>
      <SEO
        title="Psicopedagogia Clínica em Anápolis | Dificuldades Escolares | Clínica Fono Inova"
        description="Avaliação e intervenção psicopedagógica para dificuldades de aprendizagem, dislexia e TDAH em Anápolis. Agende uma avaliação no bairro Jundiaí."
        keywords="psicopedagogia anapolis, dificuldade aprendizagem anapolis, dislexia anapolis, tdah escolar"
        image="/images/psicopedagogia-hero.png"
        url="https://www.clinicafonoinova.com.br/psicopedagogia-clinica"
        type="article"
        schema={[]}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-50 via-amber-50/30 to-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
            {/* Texto */}
            <div className="animate-fade-in-up order-2 lg:order-1">
              <Badge variant="secondary" className="mb-4 bg-amber-50 text-amber-700 border-amber-100 px-3 py-1 text-xs uppercase tracking-wider font-semibold">
                Psicopedagogia Clínica
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-900 leading-tight mb-6">
                Apoio na <span className="text-amber-600">Aprendizagem</span> do seu Filho
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
                Intervenção especializada para dificuldades escolares, dislexia e TDAH no bairro <strong>Jundiaí</strong>, Anápolis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <ButtonWhatsApp
                  onClick={() => { }}
                  message="Oi! Vi no site sobre psicopedagogia e me identifiquei.\n\nMeu filho(a) está com dificuldade de aprendizagem. Pode me explicar como funciona?"
                  icon={Calendar}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Agendar Avaliação
                </ButtonWhatsApp>
              </div>
            </div>

            {/* Imagem */}
            <div className="relative order-1 lg:order-2">
              <div className="aspect-square bg-gradient-to-br from-amber-200 to-amber-400 rounded-3xl overflow-hidden shadow-2xl">
                <OptimizedImage
                  src="/images/psicopedagogia-hero.png"
                  alt="Criança em atividade psicopedagógica"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-amber-50">
                <p className="text-4xl font-bold text-amber-600">A+</p>
                <p className="text-sm text-gray-600">Sucesso Escolar</p>
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
              O que é Psicopedagogia?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              A psicopedagogia é a área que une <strong>psicologia</strong> e <strong>pedagogia</strong> para
              compreender como cada pessoa aprende. O psicopedagogo clínico investiga as causas
              das dificuldades de aprendizagem — que podem ser cognitivas, emocionais, sociais ou
              pedagógicas — e cria intervenções específicas para superar cada uma delas.
            </p>
            <p className="text-gray-500 mt-4 leading-relaxed">
              Não é reforço escolar. É um trabalho terapêutico que desenvolve as habilidades de base
              para que a criança consiga aprender com autonomia e prazer.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ SINAIS DE ALERTA ═══════════════ */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Sinais de que seu filho precisa de um psicopedagogo
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Esses sinais não significam "preguiça" ou falta de esforço. São indicadores de que algo
            precisa ser investigado e tratado.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sinaisAlerta.map((sinal, index) => (
              <div
                key={index}
                className="flex gap-4 p-5 rounded-xl bg-white border border-amber-200 hover:shadow-md transition-all"
              >
                <div className="flex-shrink-0 bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center text-amber-700">
                  {sinal.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{sinal.titulo}</h3>
                  <p className="text-gray-600 text-sm">{sinal.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CONDIÇÕES TRATADAS ═══════════════ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Condições que tratamos
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            O psicopedagogo atua em diversas condições que impactam a aprendizagem.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {condicoesTratadas.map((condicao, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 p-6 rounded-2xl hover:shadow-lg transition-all"
              >
                <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center text-amber-700 mb-4">
                  {condicao.icon}
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{condicao.nome}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{condicao.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ BENEFÍCIOS ═══════════════ */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Benefícios da Psicopedagogia
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Não se trata apenas de notas melhores — é sobre resgatar a vontade de aprender.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beneficios.map((beneficio, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all"
              >
                <div className="mb-4">{beneficio.icon}</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{beneficio.titulo}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{beneficio.descricao}</p>
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
                <div className="text-5xl font-black text-amber-100 mb-3">{item.passo}</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{item.titulo}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ DIFERENCIAL ═══════════════ */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
              Psicopedagogia + equipe multidisciplinar = resultado
            </h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8 leading-relaxed">
              Na Fono Inova, o psicopedagogo trabalha em parceria com toda a equipe.
              Se o seu filho precisa de suporte em outras áreas, já estamos prontos.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'Fonoaudiologia — quando a dificuldade é na linguagem',
                'Neuropsicologia — avaliação aprofundada do funcionamento cerebral',
                'Psicologia — questões emocionais que bloqueiam o aprender',
                'Terapia Ocupacional — coordenação motora para escrita',
                'Psicomotricidade — habilidades de base para a aprendizagem',
                'Orientação escolar — relatórios e estratégias para a escola',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-amber-50">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0" />
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
                pergunta: 'Psicopedagogia é o mesmo que reforço escolar?',
                resposta:
                  'Não. O reforço escolar revisita conteúdos que o aluno perdeu. A psicopedagogia investiga e trata as causas da dificuldade de aprendizagem — trabalhando habilidades cognitivas, emocionais e perceptivas para que a criança aprenda com autonomia.',
              },
              {
                pergunta: 'A partir de que idade meu filho pode ser avaliado?',
                resposta:
                  'A avaliação psicopedagógica pode ser feita a partir dos 4-5 anos, quando a criança já está em fase de alfabetização. Porém, sinais de alerta podem ser identificados mais cedo, e o acompanhamento preventivo é sempre bem-vindo.',
              },
              {
                pergunta: 'Quanto tempo dura o tratamento?',
                resposta:
                  'Depende de cada caso. Em geral, as sessões são semanais e o acompanhamento pode durar de 6 meses a 1 ano. O psicopedagogo faz reavaliações periódicas e trabalha junto com a família para definir metas claras.',
              },
              {
                pergunta: 'O psicopedagogo faz diagnóstico de dislexia ou TDAH?',
                resposta:
                  'O psicopedagogo identifica os sinais e avalia o impacto na aprendizagem. O diagnóstico formal geralmente é multidisciplinar, envolvendo também neuropsicólogo e/ou neuropediatra — profissionais que temos na clínica.',
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
      <section className="py-16 md:py-20 bg-gradient-to-br from-amber-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Lightbulb className="w-12 h-12 mx-auto mb-6 text-amber-200" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Toda criança pode aprender. Cada uma do seu jeito.
          </h2>
          <p className="text-amber-100 text-lg mb-8 max-w-2xl mx-auto">
            Se seu filho está com dificuldade na escola, não espere mais. Quanto antes
            a intervenção, maiores as chances de desenvolvimento pleno.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonWhatsApp
              onClick={() => { }}
              message="Oi! Vi no site sobre psicopedagogia e me identifiquei.\n\nMeu filho(a) está com dificuldade de aprendizagem. Pode me explicar como funciona?"
              icon={Calendar}
              className="bg-white text-amber-700 hover:bg-amber-50 px-10 py-4 rounded-full text-lg font-semibold shadow-lg flex items-center justify-center gap-2"
            >
              Agendar Avaliação
            </ButtonWhatsApp>
            <ButtonWhatsApp
              onClick={() => { }}
              message="Oi! Vi no site sobre psicopedagogia e me identifiquei.\n\nQueria entender melhor como funciona. Pode me explicar?"
              icon={MessageCircle}
              className="border-2 border-white/60 text-white hover:bg-white/10 px-10 py-4 rounded-full text-lg font-semibold flex items-center justify-center gap-2"
            >
              Falar com a Equipe
            </ButtonWhatsApp>
          </div>
          <p className="text-sm text-amber-200 mt-6">
            📍 Clínica Fono Inova — Anápolis, GO
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default PsicopedagogiaLPPage;
