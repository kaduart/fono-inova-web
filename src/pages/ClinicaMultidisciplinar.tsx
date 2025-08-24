import React, { useState } from 'react';
import Layout from '../components/Layout';
import { 
  Calendar, 
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

const ClinicaMultidisciplinar = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

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
      {/* Hero Section Elegante */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-pink-50 to-rose-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-pink-200/20 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-pink-100 text-pink-800 rounded-full text-sm font-medium mb-6">
                <Award className="w-4 h-4 mr-2" />
                Abordagem Integrada
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                5 Vantagens de uma Clínica <span className="text-pink-600">Multidisciplinar</span> para Seu Filho
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Descubra por que a abordagem integrada oferece os melhores resultados para o desenvolvimento infantil, 
                com equipe especializada trabalhando de forma coordenada para potencializar a evolução da criança.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center transition-all duration-300 hover:shadow-xl">
                  <Calendar className="w-5 h-5 mr-2" />
                  Agendar Avaliação
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <button className="border border-pink-600 text-pink-600 hover:bg-pink-50 px-8 py-4 rounded-lg font-semibold flex items-center justify-center transition-all duration-300">
                  <Phone className="w-5 h-5 mr-2" />
                  Falar com Especialista
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl overflow-hidden">
                  <img 
                    src="/api/placeholder/600/400" 
                    alt="Equipe multidisciplinar em reunião" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">12+</div>
                      <div className="text-sm text-gray-600">Especialistas Integrados</div>
                    </div>
                  </div>
                </div>
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
                      className={`w-5 h-5 ${
                        i < testimonial.rating
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
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${
                    openAccordion === index ? 'transform rotate-180' : ''
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
            Agende uma avaliação com nossa equipe integrada e descubra como podemos juntos 
            potencializar o desenvolvimento do seu filho.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-pink-600 px-8 py-4 rounded-lg font-semibold flex items-center justify-center transition-all duration-300 hover:shadow-xl">
              <Calendar className="w-5 h-5 mr-2" />
              Agendar Avaliação
            </button>
            <button className="border border-white text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center transition-all duration-300 hover:bg-white hover:text-pink-600">
              <Phone className="w-5 h-5 mr-2" />
              Falar com Especialista
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ClinicaMultidisciplinar;