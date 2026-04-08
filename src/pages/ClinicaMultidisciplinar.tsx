import React, { useState } from 'react';
import Layout from '../components/Layout';
import {
  Star,
  ArrowRight,
  Users,
  Target,
  Shield,
  CheckCircle,
  Award,
  FileText,
  ChevronDown,
  Quote,
  Phone,
  Brain,
  Heart,
  Activity,
  Sparkles,
  Lightbulb,
  Clock,
  TrendingUp,
  BarChart3,
  Eye
} from 'lucide-react';
import SEO from '../components/SEO';
import { Badge } from '../components/ui/badge';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp';
import { schemaFAQMultidisciplinar, schemaMultidisciplinar } from '../schemas/clinicaSchemas';

const ClinicaMultidisciplinar = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  // Vantagens da abordagem multidisciplinar
  const advantages = [
    {
      icon: <Brain className="w-10 h-10" />,
      title: "Diagnóstico Mais Preciso",
      description: "Visão integrada de vários especialistas para um entendimento completo do caso",
      details: "Nossa equipe multidisciplinar realiza avaliações conjuntas, permitindo um diagnóstico mais abrangente e preciso, considerando todos os aspectos do desenvolvimento infantil."
    },
    {
      icon: <Target className="w-10 h-10" />,
      title: "Tratamento Coordenado",
      description: "Terapeutas trabalham em conjunto com um plano terapêutico unificado",
      details: "Desenvolvemos planos de tratamento integrados onde cada profissional conhece e complementa o trabalho dos outros, evitando abordagens fragmentadas."
    },
    {
      icon: <Clock className="w-10 h-10" />,
      title: "Comodidade e Confiança",
      description: "Tudo em um só lugar, com uma equipe coesa e integrada",
      details: "Familiares e crianças não precisam se deslocar entre diferentes locais de tratamento. Toda a equipe trabalha de forma coordenada no mesmo ambiente."
    },
    {
      icon: <Heart className="w-10 h-10" />,
      title: "Visão Integral da Criança",
      description: "Não tratamos só a 'doença', mas a criança como um todo",
      details: "Nossa abordagem considera todos os aspectos do desenvolvimento: físico, cognitivo, emocional, social e comunicacional."
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      title: "Melhores Resultados",
      description: "Abordagem integrada proporciona evolução mais rápida e consistente",
      details: "Estudos demonstram que abordagens multidisciplinares resultam em melhorias mais significativas e duradouras no desenvolvimento infantil."
    }
  ];

  // Equipe multidisciplinar
  const team = [
    { specialty: "Fonoaudiólogos", count: 3, color: "bg-blue-100 text-blue-800" },
    { specialty: "Psicólogos", count: 4, color: "bg-green-100 text-green-800" },
    { specialty: "Terapeutas Ocupacionais", count: 2, color: "bg-amber-100 text-amber-800" },
    { specialty: "Fisioterapeutas", count: 2, color: "bg-purple-100 text-purple-800" },
    { specialty: "Neuropediatras", count: 1, color: "bg-cyan-100 text-cyan-800" },
    { specialty: "Pedagogos", count: 2, color: "bg-rose-100 text-rose-800" }
  ];

  // Processo de atendimento
  const processSteps = [
    { step: 1, title: "Avaliação Inicial Conjunta", description: "Primeiro contato com múltiplos especialistas", icon: <Eye className="w-8 h-8" /> },
    { step: 2, title: "Discussão do Caso", description: "Reunião da equipe para análise integrada", icon: <Users className="w-8 h-8" /> },
    { step: 3, title: "Plano de Tratamento", description: "Elaboração de estratégia terapêutica unificada", icon: <Target className="w-8 h-8" /> },
    { step: 4, title: "Intervenção Coordenada", description: "Aplicação do tratamento com acompanhamento integrado", icon: <Activity className="w-8 h-8" /> },
    { step: 5, title: "Reavaliação Contínua", description: "Ajustes periódicos baseados em evolução", icon: <BarChart3 className="w-8 h-8" /> }
  ];

  // Estatísticas baseadas em pesquisas
  const statistics = [
    { value: "72%", label: "mais eficaz que abordagens isoladas" },
    { value: "89%", label: "de satisfação das famílias" },
    { value: "3x", label: "mais rápida a evolução" },
    { value: "94%", label: "de casos com melhora significativa" }
  ];

  // Depoimentos
  const testimonials = [
    {
      name: "Ana Carvalho",
      role: "Mãe do Miguel, 5 anos",
      content: "A abordagem multidisciplinar fez toda a diferença no tratamento do meu filho. Em vez de visões fragmentadas, tivemos um plano coeso e integrado. A comunicação entre os profissionais é impressionante!",
      rating: 5
    },
    {
      name: "Carlos Mendonça",
      role: "Pai da Sofia, 7 anos",
      content: "Todos sabem exatamente o que cada um está trabalhando e como complementar o tratamento. Não precisamos mais correr entre vários profissionais em lugares diferentes. Tudo em um só lugar!",
      rating: 5
    },
    {
      name: "Patrícia Lima",
      role: "Mãe do Lucas, 6 anos (TEA)",
      content: "A evolução do Lucas foi muito mais rápida com a abordagem integrada. A equipe trabalha de forma sincronizada e nós, pais, somos incluídos em todo o processo. Recomendo demais!",
      rating: 5
    }
  ];

  // FAQs
  const faqs = [
    {
      question: "Como agendar uma avaliação multidisciplinar?",
      answer: "Entre em contato por telefone ou WhatsApp para agendar uma triagem inicial. Nossa equipe irá orientar sobre o processo e documentação necessária."
    },
    {
      question: "Quanto tempo dura uma avaliação multidisciplinar?",
      answer: "A avaliação inicial geralmente leva de 2-3 horas, dependendo da complexidade do caso. Inclui avaliação com diferentes especialistas e discussão preliminar da equipe."
    },
    {
      question: "Os convênios cobrem atendimento multidisciplinar?",
      answer: "Sim, a maioria dos planos de saúde cobre as diferentes especialidades. Verificamos a cobertura específica para cada caso durante o agendamento."
    },
    {
      question: "Com que frequência ocorrem as reuniões da equipe?",
      answer: "Nossa equipe se reúne semanalmente para discutir casos e ajustar planos terapêuticos. Os pais recebem feedback regular sobre a evolução e participam das decisões."
    }
  ];

  return (
    <Layout>
      <SEO
        title="Clínica Multidisciplinar Infantil em Anápolis | Jundiaí - Fono Inova"
        description="Clínica multidisciplinar no bairro Jundiaí, Anápolis. Fonoaudiologia, psicologia, fisioterapia e terapia ocupacional integradas no mesmo local."
        keywords="clinica multidisciplinar anapolis, clinica infantil jundiai, terapia infantil anapolis, desenvolvimento infantil"
        image="/images/servicos/multidisciplinar.jpg"
        url="https://www.clinicafonoinova.com.br/abordagem-multidisciplinar"
        type="article"
        schema={[schemaMultidisciplinar, schemaFAQMultidisciplinar]}
      />
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-50 via-rose-50/30 to-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
            {/* Texto */}
            <div className="animate-fade-in-up order-2 lg:order-1">
              <Badge variant="secondary" className="mb-4 bg-rose-50 text-rose-700 border-rose-100 px-3 py-1 text-xs uppercase tracking-wider font-semibold">
                Clínica Multidisciplinar
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-900 leading-tight mb-6">
                Cuidado <span className="text-rose-600">Completo e Integrado</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
                Todas as especialidades que seu filho precisa em um só lugar, no bairro <strong>Jundiaí</strong>, Anápolis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <ButtonWhatsApp
                  onClick={() => { }}
                  message="Oi! Vi no site de vocês e queria entender melhor como funciona a avaliação completa.\n\nÉ para meu filho(a). Pode me explicar?"
                  
                  className="bg-rose-600 hover:bg-rose-700 text-white px-10 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Agendar Triagem
                </ButtonWhatsApp>
              </div>
            </div>

            {/* Imagem */}
            <div className="relative order-1 lg:order-2">
              <div className="aspect-square bg-gradient-to-br from-rose-200 to-rose-400 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/logo-fono-inova.png"
                  alt="Clínica Fono Inova"
                  className="w-full h-full object-contain p-12"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-rose-50">
                <p className="text-4xl font-bold text-rose-600">12+</p>
                <p className="text-sm text-gray-600">Especialistas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas Importantes */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statistics.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-pink-50 rounded-2xl">
                <div className="text-3xl font-bold text-pink-600 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-700">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Localização */}
      <section className="py-8 bg-pink-50 border-y border-pink-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-pink-800 font-medium">
            📍 Clínica multidisciplinar no bairro Jundiaí, Anápolis/GO |
            Av. Minas Gerais, 405 | Todos os especialistas em um só lugar
          </p>
        </div>
      </section>

      {/* O que é uma Equipe Multidisciplinar */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                O que é uma <span className="text-pink-600">Equipe Multidisciplinar</span>?
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                É um grupo de profissionais de diferentes especialidades que trabalham de forma
                coordenada, compartilhando conhecimentos e experiências para oferecer um tratamento
                completo e integrado para cada criança.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                O desenvolvimento infantil é complexo e multifacetado. Dificuldades de aprendizagem,
                atrasos no desenvolvimento ou transtornos como TEA e TDAH raramente se resolvem com
                uma única abordagem.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-2xl">
                <div className="flex items-start">
                  <Lightbulb className="w-8 h-8 text-blue-600 mr-4 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Por que a Abordagem Multidisciplinar?</h3>
                    <p className="text-blue-700">
                      Crianças não se desenvolvem em compartimentos isolados. O que afeta a fala impacta a socialização,
                      que por sua vez influencia o desenvolvimento emocional e cognitivo. Por isso, a abordagem integrada é essencial.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <img
                  src="/api/placeholder/500/350"
                  alt="Equipe multidisciplinar trabalhando junta"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vantagens da Abordagem Multidisciplinar */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Vantagens da <span className="text-pink-600">Abordagem Multidisciplinar</span>
            </h2>
            <p className="text-xl text-gray-700">
              Descubra os benefícios de ter uma equipe integrada cuidando do desenvolvimento do seu filho.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-start mb-6">
                  <div className="bg-pink-600 p-3 rounded-2xl text-white mr-6 group-hover:scale-110 transition-transform duration-300">
                    {advantage.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{advantage.title}</h3>
                    <p className="text-gray-700 mb-3">{advantage.description}</p>
                    <p className="text-sm text-gray-600 bg-white p-3 rounded-lg">{advantage.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nossa Equipe Multidisciplinar */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Nossa <span className="text-pink-600">Equipe Multidisciplinar</span>
            </h2>
            <p className="text-xl text-gray-700">
              Profissionais especializados trabalhando de forma integrada para o desenvolvimento infantil.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${member.color} mb-4`}>
                  <span className="text-2xl font-bold">{member.count}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{member.specialty}</h3>
                <p className="text-sm text-gray-600">Especialistas dedicados</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processo de Atendimento */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Como Funciona Nosso <span className="text-pink-600">Processo</span>
            </h2>
            <p className="text-xl text-gray-700">
              Do primeiro contato ao acompanhamento contínuo, todo o processo é integrado e coordenado.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4 relative">
            <div className="absolute top-16 left-10 right-10 h-1 bg-pink-200 hidden md:block" />
            {processSteps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white relative z-10">
                  {step.icon}
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-pink-600 mb-2">{step.step}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Histórias de <span className="text-pink-600">Sucesso</span>
            </h2>
            <p className="text-xl text-gray-700">
              Depoimentos de famílias que experimentaram os benefícios da abordagem multidisciplinar.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-gray-300 text-gray-300'
                        }`}
                    />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-pink-200 mb-4" />
                <p className="text-gray-700 italic mb-6">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Perguntas <span className="text-pink-600">Frequentes</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden">
                <button
                  className="flex justify-between items-center w-full p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                >
                  <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openAccordion === index ? 'transform rotate-180' : ''
                    }`} />
                </button>
                {openAccordion === index && (
                  <div className="p-6 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-pink-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para Experimentar os Benefícios da Abordagem Multidisciplinar?
          </h2>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Agende uma avaliação com nossa equipe integrada no bairro Jundiaí e descubra
            como podemos juntos potencializar o desenvolvimento do seu filho em Anápolis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <ButtonWhatsApp
              onClick={() => { }}
              message="Oi! Vi no site de vocês e queria entender melhor como funciona a avaliação completa.\n\nPode me explicar?"
              
              className="bg-white text-rose-600 px-8 py-4 rounded-lg font-semibold flex items-center justify-center transition-all duration-300 hover:shadow-xl"
            >
              Agendar Avaliação
            </ButtonWhatsApp>
            <button className="border border-white text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center transition-all duration-300 hover:bg-white hover:text-pink-600">
              Falar com Especialista
            </button>
          </div>
          {/* Endereço completo */}
          <div className="mt-8 text-center">
            <p className="text-sm text-white/80">
              📍 Clínica Fono Inova • Av. Minas Gerais, 405 • Bairro Jundiaí • Anápolis/GO
            </p>
            <p className="text-xs text-white/60 mt-1">
              Atendimento de segunda a sábado • ESTACIONAMENTO GRATUITO
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ClinicaMultidisciplinar;