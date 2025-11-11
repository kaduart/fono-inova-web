import {
  Activity,
  AlertTriangle,
  Award,
  Baby,
  BookOpen,
  Brain,
  CheckCircle,
  ChevronDown,
  Clock,
  Clock3,
  FileText,
  HeartPulse,
  MessageCircle,
  Phone,
  Quote,
  Shield,
  Speech,
  Star,
  Target
} from 'lucide-react';
import { useState } from 'react';
import Layout from '../components/Layout';
import OptimizedImage from '../components/OptimizedImage';
import ButtonAgendamento from '../components/ui/ButtonAgendamento';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp';
import SEO from '../components/SEO';

const FonoPage = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  // Serviços de fonoaudiologia
  const services = [
    {
      icon: <MessageCircle className="w-10 h-10" />,
      title: "Avaliação de Linguagem",
      description: "Avaliação completa do desenvolvimento da linguagem oral e escrita com testes específicos e observação clínica detalhada.",
      features: ["Teste de vocabulário expressivo e receptivo", "Avaliação articulatória", "Análise fonológica", "Relatório detalhado com plano de intervenção"]
    },
    {
      icon: <Brain className="w-10 h-10" />,
      title: "Terapia de Fala",
      description: "Intervenção personalizada para correção de distúrbios articulatórios e melhora da inteligibilidade da fala.",
      features: ["Exercícios articulatórios específicos", "Técnicas de respiração e apoio vocal", "Treino fonético contextualizado", "Acompanhamento progressivo com métricas"]
    },
    {
      icon: <BookOpen className="w-10 h-10" />,
      title: "Estimulação de Linguagem",
      description: "Programa de estimulação precoce para crianças com atraso no desenvolvimento da linguagem.",
      features: ["Atividades lúdicas baseadas em evidências", "Estimulação cognitiva e lexical", "Orientação familiar estruturada", "Materiais especializados e recursos visuais"]
    },
    {
      icon: <Activity className="w-10 h-10" />,
      title: "Motricidade Orofacial",
      description: "Avaliação e terapia das funções do sistema estomatognático (sucção, mastigação, deglutição e respiração).",
      features: ["Exercícios musculares orofaciais", "Reabilitação orofacial pós-cirúrgica", "Terapia miofuncional integrativa", "Avaliação postural global"]
    }
  ];

  // 8 Sinais de Alerta - Conteúdo enriquecido
  const warningSigns = [
    {
      title: "Pouca ou Nenhuma Fala aos 2 Anos",
      description: "Crianças devem ter um vocabulário de pelo menos 50 palavras e começar a combinar duas palavras ('mamãe água', 'papai carro') por volta dos 2 anos.",
      details: "Se seu filho não atinge esses marcos, pode ser um sinal de atraso no desenvolvimento de linguagem que requer avaliação profissional.",
      icon: <Speech className="w-8 h-8" />
    },
    {
      title: "Dificuldade de Compreensão",
      description: "Não responder ao próprio nome ou a comandos simples como 'venha aqui', 'pegue a bola' ou 'onde está o papai?'.",
      details: "Problemas de compreensão podem indicar dificuldades no processamento auditivo ou atraso no desenvolvimento receptivo.",
      icon: <Brain className="w-8 h-8" />
    },
    {
      title: "Uso Preferencial de Gestos",
      description: "Prefere apontar, gesticular ou usar a mão dos pais para conseguir o que quer em vez de tentar se comunicar verbalmente.",
      details: "Embora gestos sejam parte normal do desenvolvimento, a dependência excessiva pode sinalizar dificuldade com comunicação verbal.",
      icon: <Activity className="w-8 h-8" />
    },
    {
      title: "Dificuldade em Imitar Sons",
      description: "Não tenta imitar sons de animais, veículos ou palavras simples mesmo com estimulação adequada.",
      details: "A imitação é um passo crucial no desenvolvimento da fala. Dificuldades podem indicar problemas motores ou cognitivos.",
      icon: <MessageCircle className="w-8 h-8" />
    },
    {
      title: "Fala Muito Ininteligível",
      description: "Menos de 50% da fala é compreensível para pessoas fora do convívio familiar após os 3 anos de idade.",
      details: "Alguma uninteligibilidade é normal, mas persistência excessiva pode indicar distúrbios articulatórios ou fonológicos.",
      icon: <AlertTriangle className="w-8 h-8" />
    },
    {
      title: "Regressão ou Perda de Habilidades",
      description: "Criança que já falava algumas palavras e para de usá-las ou regride em suas habilidades de comunicação.",
      details: "A regressão sempre merece investigação, pois pode estar associada a condições como transtorno do espectro autista.",
      icon: <Clock3 className="w-8 h-8" />
    },
    {
      title: "Dificuldade com a Alimentação",
      description: "Problemas persistentes com mastigação, engasgos frequentes, recusa alimentar ou dificuldade com texturas específicas.",
      details: "As mesmas estruturas usadas para alimentação são usadas para fala. Dificuldades podem estar relacionadas.",
      icon: <HeartPulse className="w-8 h-8" />
    },
    {
      title: "Frustração ao Tentar se Comunicar",
      description: "Choro excessivo, birras ou comportamentos agressivos quando não é compreendido ou não consegue se expressar.",
      details: "A frustração comunicativa é um sinal importante de que a criança quer se expressar mas não consegue.",
      icon: <Baby className="w-8 h-8" />
    }
  ];

  // Sinais de alerta por idade
  const warningSignsByAge = [
    { age: "12 meses", signs: ["Não responde ao nome", "Não emite sons consonantais", "Não aponta para objetos"] },
    { age: "18 meses", signs: ["Vocabulário menor que 10 palavras", "Não segue comandos simples", "Não imita sons"] },
    { age: "2 anos", signs: ["Não forma frases de 2 palavras", "Fala menos de 50 palavras", "Fala incompreensível para familiares"] },
    { age: "3 anos", signs: ["Estrangeiros não entendem sua fala", "Não usa pronomes", "Não forma frases completas"] }
  ];

  // Processo de atendimento
  const processSteps = [
    { step: 1, title: "Contato Inicial", description: "Entendemos suas preocupações e agendamos a primeira avaliação", icon: <MessageCircle className="w-8 h-8" /> },
    { step: 2, title: "Avaliação Completa", description: "Realizamos avaliação detalhada com testes padronizados", icon: <FileText className="w-8 h-8" /> },
    { step: 3, title: "Plano de Terapia", description: "Criamos um plano personalizado com metas claras", icon: <Target className="w-8 h-8" /> },
    { step: 4, title: "Intervenção", description: "Sessões semanais com acompanhamento contínuo", icon: <Activity className="w-8 h-8" /> },
    { step: 5, title: "Reavaliação", description: "Avaliação periódica de progresso e ajustes no plano", icon: <CheckCircle className="w-8 h-8" /> }
  ];

  // Depoimentos
  const testimonials = [
    {
      name: "Carolina Mendes",
      role: "Mãe do Miguel, 4 anos",
      content: "O trabalho da clínica foi transformador para o Miguel. Em 6 meses, sua comunicação melhorou incrivelmente. Antes isolado, hoje conversa, brinca e expressa suas emoções. A equipe é maravilhosa!",
      rating: 5
    },
    {
      name: "Ricardo Oliveira",
      role: "Pai da Sofia, 5 anos",
      content: "Profissionais extremamente qualificados e com abordagem humanizada. A Sofia adora as sessões e nós vemos resultados concretos. O relatório detalhado nos ajuda a acompanhar cada avanço.",
      rating: 5
    },
    {
      name: "Patrícia Santos",
      role: "Mãe do Lucas, 3 anos",
      content: "A abordagem lúdica conquistou meu filho. Ele não via as sessões como terapia, mas como diversão. Em poucos meses, seu vocabulário triplicou e a frustração diminuiu significativamente.",
      rating: 5
    }
  ];

  // FAQs
  const faqs = [
    {
      question: "Com que idade devo me preocupar com atraso na fala?",
      answer: "Recomenda-se avaliação a partir dos 2 anos se a criança fala menos de 50 palavras ou não forma frases simples. Intervenção precoce é fundamental para melhores resultados."
    },
    {
      question: "Quanto tempo dura um tratamento fonoaudiológico?",
      answer: "O tempo varia conforme cada caso, mas geralmente entre 6 meses a 2 anos. Sessões semanais são recomendadas inicialmente, com reavaliações periódicas a cada 3 meses."
    },
    {
      question: "Os planos de saúde cobrem terapia fonoaudiológica?",
      answer: "Sim, a maioria dos planos de saúde cobre sessões de fonoaudiologia. Verifique com sua operadora o número de sessões autorizadas e se há coparticipação."
    },
    {
      question: "Como posso ajudar no desenvolvimento da fala do meu filho em casa?",
      answer: "Ler livros, cantar, conversar bastante e nomear objetos do cotidiano são excelentes estratégias. Evitar telas e estimular a comunicação verbal também são importantes."
    }
  ];

  // Estatísticas e dados de pesquisa
  const statistics = [
    { value: "5-8%", label: "das crianças em idade pré-escolar têm distúrbios de fala e linguagem" },
    { value: "70%", label: "de eficácia com intervenção precoce (antes dos 3 anos)" },
    { value: "4x", label: "mais chances de dificuldades de leitura sem intervenção" },
    { value: "90%", label: "dos pais notam melhora significativa nos primeiros 6 meses" }
  ];

  return (
    <Layout>
      <SEO
        title="Fonoaudiologia Infantil - Clínica Fono Inova"
        description="Especialistas em fonoaudiologia infantil: tratamento para atraso de fala, distúrbios de linguagem, comunicação e alimentação."
        keywords="fonoaudiologia infantil, atraso de fala, distúrbios linguagem, terapia fala, comunicação"
        image="/images/servicos/fonoaudiologia.jpg"
        url="https://www.clinicafonoinova.com.br/fonoaudiologia"
      />
      {/* Hero Section Elegante - MELHORADA */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-200/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-r from-purple-200/20 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full text-sm font-medium mb-6 shadow-sm">
                <Award className="w-4 h-4 mr-2" />
                Especialidade em Linguagem Infantil
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Atraso na Fala: <span className="text-blue-600">8 Sinais</span> que os Pais Não Devem Ignorar
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Um guia completo baseado em evidências científicas para entender o desenvolvimento da linguagem infantil
                e identificar quando buscar ajuda especializada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <ButtonAgendamento
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center transition-all duration-300 hover:shadow-2xl shadow-md">
                  Agendar Consulta
                </ButtonAgendamento>

                <ButtonWhatsApp
                  size="lg"
                  className="border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center transition-all duration-300 shadow-sm"
                  message="Olá! Preciso de informações sobre tratamento fonoaudiológico."
                >
                  Falar com Fonoaudiólogo
                </ButtonWhatsApp>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-3xl p-6 shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
                <div className="relative h-96 w-full rounded-2xl overflow-hidden">
                  <OptimizedImage
                    src="/images/fonoaudiologia/img-fono-atendimento-01.png"
                    alt="Criança em terapia fonoaudiológica"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
                </div>
              </div>
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-3 rounded-full mr-4 shadow-inner">
                    <CheckCircle className="w-7 h-7 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">500+</div>
                    <div className="text-sm text-gray-600 font-medium">Crianças Atendidas</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas Importantes - MELHORADA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statistics.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="text-3xl font-bold text-blue-600 mb-2 bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-inner">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-700 mt-3 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 Sinais de Alerta - MELHORADA */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Os <span className="text-blue-600">8 Sinais</span> de Alerta para o Atraso na Fala
            </h2>
            <p className="text-xl text-gray-700">
              Identifique os sinais que indicam quando buscar ajuda profissional pode fazer toda a diferença
              no desenvolvimento do seu filho.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {warningSigns.map((sign, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:border-blue-100">
                <div className="flex items-start mb-6">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-2xl text-blue-600 mr-6 group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300">
                    {sign.icon}
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600 mb-2 bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">{sign.title}</h3>
                    <p className="text-gray-700 mb-3 leading-relaxed">{sign.description}</p>
                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-300">
                      <p className="text-sm text-blue-800">{sign.details}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sinais de Alerta por Idade - MELHORADA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Sinais de <span className="text-blue-600">Alerta</span> por Idade
            </h2>
            <p className="text-xl text-gray-700">
              Cada criança se desenvolve no seu próprio ritmo, mas alguns sinais podem indicar a necessidade de avaliação especializada.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {warningSignsByAge.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                    <span className="text-xl font-bold text-blue-700">{item.age}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg">{item.age}</h3>
                </div>
                <ul className="space-y-3">
                  {item.signs.map((sign, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <span className="text-red-500 mr-2 mt-1">•</span>
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-400 p-6 rounded-2xl mt-12 shadow-sm">
            <div className="flex items-start">
              <AlertTriangle className="w-8 h-8 text-yellow-600 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Importante</h3>
                <p className="text-yellow-700">
                  Este conteúdo tem caráter informativo e não substitui uma avaliação profissional.
                  Cada criança tem seu próprio ritmo de desenvolvimento, mas conhecer os sinais de alerta
                  pode fazer toda a diferença para intervir no momento certo. Quando em dúvida, sempre consulte um fonoaudiólogo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços Premium - MELHORADA */}
      <section className="py-20 bg-gradient-to-br from-blue-50/70 to-indigo-50/70">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Nossas <span className="text-blue-600">Especialidades</span> em Fonoaudiologia
            </h2>
            <p className="text-xl text-gray-700">
              Oferecemos serviços especializados com metodologias baseadas em evidências científicas e
              abordagem centrada nas necessidades individuais de cada criança.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group border border-gray-100 hover:border-blue-100">
                <div className="flex items-start mb-6">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-2xl text-white mr-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">{service.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{service.description}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processo de Atendimento - MELHORADA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Nosso <span className="text-blue-600">Processo</span> de Atendimento
            </h2>
            <p className="text-xl text-gray-700">
              Da primeira consulta ao acompanhamento contínuo, oferecemos um caminho claro e estruturado para o desenvolvimento da comunicação.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6 relative">
            <div className="absolute top-16 left-10 right-10 h-1 bg-gradient-to-r from-blue-200 to-indigo-200 hidden md:block" />
            {processSteps.map((step, index) => (
              <div key={index} className="text-center relative group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 text-white relative z-10 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm group-hover:shadow-md group-hover:border-blue-100 transition-all duration-300">
                  <div className="text-2xl font-bold text-blue-600 mb-2">{step.step}</div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos - MELHORADA */}
      <section className="py-20 bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Histórias de <span className="text-blue-600">Sucesso</span>
            </h2>
            <p className="text-xl text-gray-700">
              A transformação na comunicação que impacta vidas inteiras.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-gray-200 text-gray-200'
                        }`}
                    />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-blue-200 mb-4" />
                <p className="text-gray-700 italic mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="border-t border-gray-100 pt-4">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - MELHORADA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Perguntas <span className="text-blue-600">Frequentes</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden hover:border-blue-200 transition-colors duration-300">
                <button
                  className="flex justify-between items-center w-full p-6 text-left bg-white hover:bg-blue-50 transition-colors duration-300"
                  onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                >
                  <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openAccordion === index ? 'transform rotate-180' : ''
                    }`} />
                </button>
                {openAccordion === index && (
                  <div className="p-6 bg-blue-50 border-t border-blue-100">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final Otimizado */}
      {/* CTA Final Otimizado */}
      <section
        className="
    relative isolate z-10
    py-20
    bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800
    text-white
    overflow-hidden
  "
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Urgência */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
              <Clock className="w-5 h-5 text-white" />
              <span className="font-semibold">Apenas 5 vagas disponíveis esta semana</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Pronto para Transformar a Comunicação do Seu Filho?
            </h2>

            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
              Não espere mais! Agende agora sua avaliação fonoaudiológica e dê o primeiro passo
              para o desenvolvimento da fala e linguagem.
            </p>

            {/* Benefícios Rápidos */}
            <div className="grid md:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-white" />
                <p className="font-semibold">Avaliação Completa</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-white" />
                <p className="font-semibold">Plano Individualizado</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-white" />
                <p className="font-semibold">Acompanhamento Próximo</p>
              </div>
            </div>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <ButtonWhatsApp
                sendConversion
                className="bg-white hover:bg-gray-100 text-blue-700 px-10 py-5 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all inline-flex items-center gap-3"
                message="Olá! Vi a página e gostaria de agendar uma avaliação para meu filho(a)."
                aria-label="Agendar avaliação pelo WhatsApp"
              >
                <MessageCircle className="w-6 h-6" />
                Agendar Avaliação Agora
              </ButtonWhatsApp>

              <a
                href="tel:6237063924"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-700 px-10 py-5 rounded-xl font-bold text-lg transition-all inline-flex items-center gap-3"
              >
                <Phone className="w-6 h-6" />
                Ligar Agora
              </a>
            </div>

            {/* Garantias */}
            <div className="mt-8 flex items-center justify-center gap-6 flex-wrap text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-white" />
                <span>Ambiente Seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-white" />
                <span>Equipe Certificada</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-white fill-white" />
                <span>4.9/5 Avaliação</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </Layout >
  );

};

export default FonoPage;