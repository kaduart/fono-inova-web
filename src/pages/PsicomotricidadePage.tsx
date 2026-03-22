import { useEffect } from 'react';
import {
  Brain,
  Baby,
  Heart,
  Star,
  ChevronRight,
  Calendar,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  Users,
  Target,
  Shield,
  Activity,
  HandMetal,
  Eye,
  Footprints,
} from 'lucide-react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { Badge } from '../components/ui/badge';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp';
import OptimizedImage from '../components/OptimizedImage';
import { schemaPsicomotricidade, schemaFAQPsicomotricidade } from '../schemas/clinicaSchemas.js';

const PsicomotricidadePage = () => {
  useEffect(() => {
    document.title = 'Psicomotricidade Infantil | TEA, Síndrome de Down e Síndromes | Clínica Fono Inova';
    window.scrollTo(0, 0);
  }, []);

  const sinaisAlerta = [
    {
      icon: <Footprints className="w-6 h-6" />,
      titulo: 'Atraso motor',
      descricao: 'Demora para sentar, engatinhar, andar ou correr comparado a crianças da mesma idade',
    },
    {
      icon: <HandMetal className="w-6 h-6" />,
      titulo: 'Coordenação prejudicada',
      descricao: 'Dificuldade para segurar objetos, desenhar, recortar ou abotoar roupas',
    },
    {
      icon: <Eye className="w-6 h-6" />,
      titulo: 'Dificuldade de percepção corporal',
      descricao: 'Não reconhece partes do corpo, esbarra em móveis, tem pouca noção de espaço',
    },
    {
      icon: <Activity className="w-6 h-6" />,
      titulo: 'Equilíbrio instável',
      descricao: 'Cai com frequência, dificuldade para subir escadas, pular ou ficar em um pé só',
    },
    {
      icon: <Brain className="w-6 h-6" />,
      titulo: 'Comportamentos repetitivos',
      descricao: 'Movimentos estereotipados, dificuldade de planejar sequências de ações',
    },
    {
      icon: <Users className="w-6 h-6" />,
      titulo: 'Isolamento social',
      descricao: 'Evita brincadeiras em grupo, não imita outras crianças, dificuldade de interação',
    },
  ];

  const beneficios = [
    {
      icon: <Target className="w-8 h-8 text-pink-600" />,
      titulo: 'Coordenação motora fina e grossa',
      descricao:
        'Melhora na precisão dos movimentos para atividades do dia a dia como comer, vestir-se, escrever e brincar com autonomia.',
    },
    {
      icon: <Brain className="w-8 h-8 text-pink-600" />,
      titulo: 'Integração sensorial',
      descricao:
        'Ajuda a criança a processar informações dos sentidos de forma organizada, reduzindo hipersensibilidades e comportamentos reativos.',
    },
    {
      icon: <Heart className="w-8 h-8 text-pink-600" />,
      titulo: 'Regulação emocional',
      descricao:
        'Através do movimento e do brincar, a criança aprende a expressar e gerenciar emoções de forma saudável.',
    },
    {
      icon: <Users className="w-8 h-8 text-pink-600" />,
      titulo: 'Habilidades sociais',
      descricao:
        'Estimula a interação com outras crianças e adultos, desenvolvendo comunicação não verbal, imitação e troca de turnos.',
    },
    {
      icon: <Sparkles className="w-8 h-8 text-pink-600" />,
      titulo: 'Consciência corporal',
      descricao:
        'A criança aprende a reconhecer seu corpo, sua posição no espaço e a se movimentar com mais segurança e confiança.',
    },
    {
      icon: <Shield className="w-8 h-8 text-pink-600" />,
      titulo: 'Autonomia e independência',
      descricao:
        'Progressivamente, a criança ganha capacidade de realizar tarefas cotidianas sozinha — escovar os dentes, calçar sapatos, se alimentar.',
    },
  ];

  const condicoes = [
    {
      nome: 'TEA (Autismo)',
      descricao:
        'Trabalha déficits motores, sensoriais e de interação social frequentes no espectro. A psicomotricidade ajuda a criança com TEA a se apropriar de seu corpo e se relacionar com o meio.',
      cor: 'bg-purple-50 border-purple-200',
      corTexto: 'text-purple-700',
    },
    {
      nome: 'Síndrome de Down',
      descricao:
        'Foca no tônus muscular (hipotonia), equilíbrio e coordenação motora, comuns na trissomia 21. Atividades lúdicas estimulam o desenvolvimento motor e cognitivo de forma prazerosa.',
      cor: 'bg-yellow-50 border-yellow-200',
      corTexto: 'text-yellow-700',
    },
    {
      nome: 'Paralisia Cerebral',
      descricao:
        'Auxilia na melhora do controle motor, postura e movimentos funcionais, promovendo maior independência nas atividades do dia a dia.',
      cor: 'bg-blue-50 border-blue-200',
      corTexto: 'text-blue-700',
    },
    {
      nome: 'Atrasos globais do desenvolvimento',
      descricao:
        'Para crianças com atrasos em múltiplas áreas (motor, cognitivo, linguagem), a psicomotricidade integra corpo e mente de forma holística.',
      cor: 'bg-green-50 border-green-200',
      corTexto: 'text-green-700',
    },
    {
      nome: 'Síndromes genéticas diversas',
      descricao:
        'Síndrome de Williams, X-Frágil, Prader-Willi e outras condições que afetam o desenvolvimento neuropsicomotor se beneficiam dessa abordagem.',
      cor: 'bg-pink-50 border-pink-200',
      corTexto: 'text-pink-700',
    },
  ];

  const comoFunciona = [
    {
      passo: '01',
      titulo: 'Avaliação psicomotora',
      descricao:
        'Avaliamos tônus muscular, equilíbrio, lateralidade, noção corporal, orientação espacial e temporal, e coordenação motora fina e grossa.',
    },
    {
      passo: '02',
      titulo: 'Plano terapêutico individualizado',
      descricao:
        'Com base na avaliação, montamos um plano com atividades lúdicas e prazerosas, respeitando o ritmo e as necessidades de cada criança.',
    },
    {
      passo: '03',
      titulo: 'Sessões com atividades lúdicas',
      descricao:
        'Circuitos motores, brincadeiras sensoriais, jogos de imitação, exercícios de equilíbrio e coordenação — tudo adaptado e divertido.',
    },
    {
      passo: '04',
      titulo: 'Reavaliação e orientação familiar',
      descricao:
        'Acompanhamos a evolução constantemente e orientamos os pais com atividades para fazer em casa, potencializando os resultados.',
    },
  ];

  return (
    <Layout>
      <SEO
        title="Psicomotricidade Infantil em Anápolis | Clínica Fono Inova"
        description="Terapia de psicomotricidade para crianças com TEA, Síndrome de Down e atrasos motores em Anápolis. Agende uma avaliação no bairro Jundiaí."
        keywords="psicomotricidade infantil anapolis, tea anapolis, sindrome de down anapolis, atraso motor infantil"
        image="/images/psicomotricidade-hero.png"
        url="https://www.clinicafonoinova.com.br/psicomotricidade"
        type="article"
        schema={[schemaPsicomotricidade, schemaFAQPsicomotricidade]}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-50 via-pink-50/30 to-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
            {/* Texto */}
            <div className="animate-fade-in-up order-2 lg:order-1">
              <Badge variant="secondary" className="mb-4 bg-pink-50 text-pink-700 border-pink-100 px-3 py-1 text-xs uppercase tracking-wider font-semibold">
                Psicomotricidade Infantil
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-900 leading-tight mb-6">
                Desenvolvimento <span className="text-pink-600">Motor e Cognitivo</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
                Terapia integrada para crianças com TEA, Síndrome de Down e atrasos motores no bairro <strong>Jundiaí</strong>, Anápolis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <ButtonWhatsApp
                  onClick={() => { }}
                  message="Oi! Vi no site sobre psicomotricidade e queria entender melhor.\n\nPode me explicar como funciona a avaliação?"
                  icon={Calendar}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-10 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Agendar Avaliação
                </ButtonWhatsApp>
              </div>
            </div>

            {/* Imagem */}
            <div className="relative order-1 lg:order-2">
              <div className="aspect-square bg-gradient-to-br from-pink-200 to-pink-400 rounded-3xl overflow-hidden shadow-2xl">
                <OptimizedImage
                  src="/images/psicomotricidade-hero.png"
                  alt="Criança em atividade de psicomotricidade"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-pink-50">
                <p className="text-4xl font-bold text-pink-600">100%</p>
                <p className="text-sm text-gray-600">Foco no Brincar</p>
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
              O que é Psicomotricidade?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              A psicomotricidade é uma ciência nascida da neurologia que integra três dimensões essenciais
              do ser humano: a <strong>emocional</strong> (como sentimos), a <strong>cognitiva</strong> (como
              processamos informações) e a <strong>motora</strong> (como nos movimentamos). Para crianças
              com condições do neurodesenvolvimento, essa abordagem é fundamental porque trabalha o corpo
              como porta de entrada para o desenvolvimento global.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-pink-50">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Emocional</h3>
              <p className="text-gray-600 text-sm">
                Como a criança experimenta sentimentos, se autorregula e expressa emoções através do corpo e do brincar.
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-fuchsia-50">
              <div className="bg-fuchsia-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-fuchsia-600" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Cognitivo</h3>
              <p className="text-gray-600 text-sm">
                Atenção, concentração, memória e planejamento motor — o processamento cerebral que organiza cada ação.
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-purple-50">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Motor</h3>
              <p className="text-gray-600 text-sm">
                Coordenação, equilíbrio, tônus muscular, lateralidade e consciência corporal — como o corpo executa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CONDIÇÕES ATENDIDAS ═══════════════ */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Para quem é indicada?
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            A psicomotricidade beneficia crianças com diversas condições do neurodesenvolvimento.
            Na Fono Inova, atendemos especialmente:
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {condicoes.map((condicao, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl border-2 ${condicao.cor} transition-all hover:shadow-lg`}
              >
                <h3 className={`font-bold text-lg mb-3 ${condicao.corTexto}`}>
                  {condicao.nome}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {condicao.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SINAIS DE ALERTA ═══════════════ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Sinais de que seu filho pode precisar de psicomotricidade
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Fique atento a esses sinais. Se seu filho apresenta dois ou mais, vale uma avaliação com nosso especialista.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sinaisAlerta.map((sinal, index) => (
              <div
                key={index}
                className="flex gap-4 p-5 rounded-xl bg-pink-50 border border-pink-100 hover:shadow-md transition-all"
              >
                <div className="flex-shrink-0 bg-pink-200 w-12 h-12 rounded-full flex items-center justify-center text-pink-700">
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

      {/* ═══════════════ BENEFÍCIOS ═══════════════ */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-pink-50 to-fuchsia-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Benefícios da Psicomotricidade
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Resultados reais no dia a dia do seu filho — da sala de aula às brincadeiras do parquinho.
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
              <div key={index} className="relative">
                <div className="text-5xl font-black text-pink-100 mb-3">{item.passo}</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{item.titulo}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.descricao}</p>
                {index < comoFunciona.length - 1 && (
                  <ChevronRight className="hidden lg:block absolute top-8 -right-4 w-8 h-8 text-pink-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ ABORDAGEM MULTIDISCIPLINAR ═══════════════ */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
              Abordagem integrada e multidisciplinar
            </h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8 leading-relaxed">
              Na Fono Inova, a psicomotricidade não trabalha isolada. Nosso diferencial é a integração
              com as demais especialidades da clínica, criando um plano terapêutico completo para seu filho.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'Fonoaudiologia — linguagem e comunicação',
                'Psicologia — regulação emocional e comportamento',
                'Terapia Ocupacional — atividades do dia a dia',
                'Fisioterapia — fortalecimento e postura',
                'Musicoterapia — expressão e interação social',
                'Psicopedagogia — aprendizagem e cognição',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-pink-50">
                  <CheckCircle2 className="w-5 h-5 text-pink-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ RÁPIDO ═══════════════ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Perguntas frequentes
          </h2>

          <div className="space-y-6">
            {[
              {
                pergunta: 'A partir de que idade meu filho pode fazer psicomotricidade?',
                resposta:
                  'A psicomotricidade pode ser iniciada nos primeiros anos de vida, inclusive antes dos 2 anos, especialmente para crianças com diagnóstico precoce de TEA, Síndrome de Down ou atrasos motores. Quanto mais cedo, melhores os resultados.',
              },
              {
                pergunta: 'Qual a diferença entre psicomotricidade e fisioterapia?',
                resposta:
                  'A fisioterapia foca na reabilitação física e funcional. A psicomotricidade vai além: integra aspectos motores, emocionais e cognitivos, trabalhando o corpo como caminho para o desenvolvimento global da criança — incluindo socialização, atenção e autorregulação.',
              },
              {
                pergunta: 'Quantas sessões por semana são necessárias?',
                resposta:
                  'A frequência é definida na avaliação inicial, mas geralmente recomendamos de 1 a 2 sessões semanais. Em casos com maior comprometimento, pode ser indicada maior frequência, sempre respeitando o ritmo da criança.',
              },
              {
                pergunta: 'O plano de saúde cobre psicomotricidade?',
                resposta:
                  'Sim! Desde a Resolução Normativa ANS nº 539, os planos de saúde são obrigados a cobrir psicomotricidade quando prescrita pelo médico assistente, especialmente para crianças com TEA e outras condições do neurodesenvolvimento.',
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
      <section className="py-16 md:py-20 bg-gradient-to-br from-pink-600 to-fuchsia-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Star className="w-12 h-12 mx-auto mb-6 text-pink-200" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cada conquista do seu filho importa
          </h2>
          <p className="text-pink-100 text-lg mb-8 max-w-2xl mx-auto">
            Na Fono Inova, celebramos cada passo — do primeiro equilíbrio ao primeiro
            laço no cadarço. Agende uma avaliação e descubra como a psicomotricidade
            pode transformar o dia a dia do seu filho.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonWhatsApp
              onClick={() => { }}
              message="Oi! Vi no site sobre psicomotricidade e queria entender melhor.\n\nPode me explicar como funciona a avaliação?"
              icon={Calendar}
              className="bg-white text-pink-700 hover:bg-pink-50 px-10 py-4 rounded-full text-lg font-semibold shadow-lg flex items-center justify-center gap-2"
            >
              Agendar Avaliação
            </ButtonWhatsApp>
            <ButtonWhatsApp
              onClick={() => { }}
              message="Oi! Vi no site sobre psicomotricidade e queria entender melhor.\n\nPode me explicar como funciona?"
              icon={MessageCircle}
              className="border-2 border-white/60 text-white hover:bg-white/10 px-10 py-4 rounded-full text-lg font-semibold flex items-center justify-center gap-2"
            >
              Tirar Dúvidas
            </ButtonWhatsApp>
          </div>
          <p className="text-sm text-pink-200 mt-6">
            📍 Clínica Fono Inova — Anápolis, GO
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default PsicomotricidadePage;
