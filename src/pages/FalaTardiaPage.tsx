import { Calendar, CheckCircle, Clock, Heart, MessageCircle, MessageSquare } from 'lucide-react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp';

const FalaTardiaPage = () => {
    const sinaisAtraso = [
        'Com 2 anos: fala menos de 50 palavras',
        'Com 3 anos: não forma frases simples',
        'Família não entende o que ele quer dizer',
        'Usa mais gestos do que palavras',
        'Frustração ao tentar se comunicar',
        'Não imita sons ou palavras',
        'Vocabulário não aumenta com o tempo',
        'Dificuldade em seguir comandos simples'
    ];

    const beneficios = [
        {
            icon: <MessageSquare className="w-12 h-12 text-orange-600" />,
            title: 'Estímulo à Linguagem',
            description: 'Técnicas lúdicas para desenvolver vocabulário, formação de frases e compreensão'
        },
        {
            icon: <Clock className="w-12 h-12 text-orange-600" />,
            title: 'Intervenção Rápida',
            description: 'Quanto antes começar, mais rápido seu filho alcança o desenvolvimento esperado'
        },
        {
            icon: <Heart className="w-12 h-12 text-orange-600" />,
            title: 'Orientação aos Pais',
            description: 'Aprenda estratégias para estimular a fala em casa durante a rotina diária'
        }
    ];

    const marcosFala = [
        { idade: '12 meses', esperado: 'Primeiras palavras (mamãe, papai, água)' },
        { idade: '18 meses', esperado: '10-20 palavras, aponta para objetos' },
        { idade: '2 anos', esperado: '50+ palavras, frases de 2 palavras' },
        { idade: '3 anos', esperado: 'Frases completas, conta histórias simples' },
        { idade: '4 anos', esperado: 'Conversa fluente, faz perguntas' }
    ];

    const metodologia = [
        {
            icone: '🎮',
            titulo: 'Terapia Lúdica',
            descricao: 'Usamos brinquedos, jogos e atividades que a criança adora para estimular a fala de forma natural e divertida.'
        },
        {
            icone: '👨‍👩‍👧',
            titulo: 'Envolvimento Familiar',
            descricao: 'Ensinamos os pais a continuar a estimulação em casa, multiplicando os resultados das sessões semanais.'
        },
        {
            icone: '📊',
            titulo: 'Acompanhamento Contínuo',
            descricao: 'Monitoramos a evolução a cada sessão e ajustamos o plano conforme o progresso da criança.'
        },
        {
            icone: '🧩',
            titulo: 'Integração Multidisciplinar',
            descricao: 'Se necessário, trabalhamos junto com psicólogos e terapeutas ocupacionais para um desenvolvimento completo.'
        }
    ];

    const faq = [
        {
            pergunta: 'Com que idade devo procurar fonoaudiologia?',
            resposta: 'Se seu filho tem 2 anos e fala menos de 50 palavras, ou 3 anos e não forma frases, é hora de buscar ajuda. Mas pode procurar antes se tiver preocupações!'
        },
        {
            pergunta: 'Quanto tempo leva para ver resultados?',
            resposta: 'Muitas famílias relatam progresso já nas primeiras 6-8 semanas. Mas cada criança tem seu ritmo - o importante é manter a consistência.'
        },
        {
            pergunta: 'Posso esperar até os 4 anos?',
            resposta: 'Não é recomendado. Quanto antes iniciar, mais fácil e rápido o progresso. Entre 2-4 anos é a janela ideal de estimulação.'
        },
        {
            pergunta: 'Funciona mesmo?',
            resposta: 'Sim! A fonoterapia tem eficácia comprovada. Com acompanhamento regular e envolvimento da família, a maioria das crianças alcança a fala esperada.'
        }
    ];

    return (
        <Layout>
            <SEO
                title="Fala Tardia - Fonoaudiologia Infantil - Clínica Fono Inova"
                description="Fonoterapia especializada para crianças com atraso na fala. Avaliação e tratamento em Anápolis-GO."
                keywords="fala tardia, atraso fala, fonoaudiologia infantil, estimulação linguagem, Anápolis"
            />

            {/* Hero */}
            <section className="pt-32 pb-20 bg-gradient-to-br from-orange-50 via-white to-orange-50">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="animate-fade-in-up">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins mb-6 leading-tight">
                                Seu Filho Tem 3 Anos e Ainda{' '}
                                <span className="text-orange-600">Não Fala</span>?
                            </h1>
                            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                                Cada criança tem seu próprio ritmo, mas alguns sinais indicam que é hora de
                                buscar ajuda especializada. A fonoaudiologia pode desbloquear a comunicação
                                do seu filho e trazer tranquilidade para toda a família.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <ButtonWhatsApp
                                    message="Olá! Vim através do site e gostaria de agendar uma avaliação fonoaudiológica para fala tardia."
                                    className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                                >
                                    <Calendar className="w-5 h-5" />
                                    Agendar Avaliação
                                </ButtonWhatsApp>
                                <ButtonWhatsApp
                                    message="Olá! Tenho dúvidas sobre atraso na fala. Pode me ajudar?"
                                    className="border-2 border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-full text-lg font-semibold transition-all flex items-center justify-center gap-2"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Tirar Dúvidas
                                </ButtonWhatsApp>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="aspect-square bg-gradient-to-br from-orange-200 to-orange-400 rounded-3xl overflow-hidden">
                                <img
                                    src="/images/fala-tardia-hero.jpg"
                                    alt="Criança em fonoterapia"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800';
                                    }}
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                                <p className="text-4xl font-bold text-orange-600">85%</p>
                                <p className="text-sm text-gray-600">Melhora em 6 meses</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sinais */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
                            Seu Filho Apresenta <span className="text-orange-600">Esses Sinais</span>?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Reconhecer os sinais de atraso na fala é o primeiro passo para ajudar seu filho
                            a se comunicar melhor.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {sinaisAtraso.map((sinal, index) => (
                            <div key={index} className="bg-white border-l-4 border-orange-600 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                                    <p className="text-gray-800 font-medium">{sinal}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <p className="text-gray-600 italic">
                            <strong>Lembre-se:</strong> "Cada criança tem seu tempo" não significa esperar sem fazer nada.
                            A estimulação certa acelera o processo.
                        </p>
                    </div>
                </div>
            </section>

            {/* Marcos */}
            <section className="py-20 bg-orange-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
                            O Que Esperar em <span className="text-orange-600">Cada Idade</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Compare o desenvolvimento do seu filho com os marcos típicos da linguagem
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {marcosFala.map((marco, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                                <p className="text-2xl font-bold text-orange-600 mb-3">{marco.idade}</p>
                                <p className="text-gray-700">{marco.esperado}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <div className="bg-white p-6 rounded-xl shadow-md inline-block max-w-2xl border-l-4 border-orange-600">
                            <p className="font-semibold text-orange-600 mb-2">⚠️ Atenção</p>
                            <p className="text-gray-600">
                                Se seu filho está 6 meses ou mais atrasado em relação aos marcos esperados,
                                é importante fazer uma avaliação fonoaudiológica.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Por que acontece */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <img
                                src="/images/fala-tardia/crianca-fala-tardia-2.jpeg"
                                alt="Terapia fonoaudiológica infantil"
                                className="rounded-2xl shadow-xl w-full"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800';
                                }}
                            />
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">
                                Por Que Algumas Crianças <span className="text-orange-600">Demoram Mais</span> para Falar?
                            </h2>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                O atraso na fala pode ter diversas causas: desde questões estruturais (freio lingual curto)
                                até fatores ambientais (pouca estimulação, excesso de telas) ou condições como TEA e TDAH.
                            </p>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                <strong>A boa notícia:</strong> a maioria dos casos responde muito bem à fonoterapia.
                                Com as técnicas certas, crianças que falam pouco aos 3 anos podem ter vocabulário
                                completo aos 4 anos.
                            </p>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                O fonoaudiólogo identifica a causa raiz do atraso e cria um plano de estimulação
                                personalizado, usando brincadeiras e atividades que a criança adora.
                            </p>
                            <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-600">
                                <p className="font-semibold text-orange-600 mb-2">💡 Fato Importante</p>
                                <p className="text-sm text-gray-600">
                                    Crianças que iniciam fonoterapia antes dos 4 anos têm até 90% de chance de
                                    alcançar a linguagem esperada para a idade.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Como Ajudamos */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
                            Como a <span className="text-orange-600">Fonoaudiologia</span> Funciona
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Sessões lúdicas e eficazes para estimular a comunicação do seu filho
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {beneficios.map((beneficio, index) => (
                            <div key={index} className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                                <div className="flex justify-center mb-4">
                                    {beneficio.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{beneficio.title}</h3>
                                <p className="text-gray-600">{beneficio.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Metodologia */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h3 className="text-2xl md:text-3xl font-bold font-poppins mb-2">
                            Nossa <span className="text-orange-600">Metodologia</span>
                        </h3>
                        <p className="text-gray-600">Cada sessão é planejada especialmente para o nível e os interesses do seu filho</p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {metodologia.map((item, index) => (
                            <div key={index} className="bg-white border p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                                <p className="text-4xl mb-3">{item.icone}</p>
                                <h4 className="text-xl font-bold mb-2 text-orange-600">{item.titulo}</h4>
                                <p className="text-gray-600">{item.descricao}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-orange-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-12">
                        <h3 className="text-2xl md:text-3xl font-bold font-poppins mb-2">
                            Dúvidas <span className="text-orange-600">Frequentes</span>
                        </h3>
                    </div>
                    <div className="space-y-4">
                        {faq.map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                                <h4 className="font-bold text-orange-600 mb-2">{item.pergunta}</h4>
                                <p className="text-gray-600 text-sm">{item.resposta}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-20 bg-gradient-to-br from-orange-600 to-orange-800 text-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
                            Não Espere Mais. Seu Filho Merece se Expressar!
                        </h2>
                        <p className="text-lg mb-8 opacity-90">
                            Quanto antes começar a fonoterapia, mais rápido você verá seu filho falando,
                            interagindo e sendo compreendido por todos.
                        </p>
                        <div className="bg-white p-8 rounded-2xl shadow-2xl text-gray-900">
                            <h3 className="text-2xl font-bold mb-3 text-orange-600">
                                Avaliação Fonoaudiológica Infantil
                            </h3>
                            <p className="text-gray-600 mb-2">
                                Identificamos a causa do atraso e criamos um plano personalizado
                            </p>
                            <p className="text-lg font-bold text-orange-600 mb-6">
                                Primeira Avaliação: R$ 220
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <ButtonWhatsApp
                                    message="Olá! Gostaria de agendar uma avaliação fonoaudiológica para meu filho."
                                    className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg flex items-center justify-center gap-2"
                                >
                                    <Calendar className="w-5 h-5" />
                                    Agendar Agora
                                </ButtonWhatsApp>
                                <ButtonWhatsApp
                                    message="Olá! Tenho dúvidas sobre a fonoterapia infantil. Pode me ajudar?"
                                    className="border-2 border-orange-600 text-orange-600 hover:bg-orange-50 px-10 py-4 rounded-full text-lg font-semibold flex items-center justify-center gap-2"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Tirar Dúvidas
                                </ButtonWhatsApp>
                            </div>
                            <p className="text-sm text-gray-500 mt-4">
                                📍 Clínica Fono Inova - Anápolis, GO
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default FalaTardiaPage;