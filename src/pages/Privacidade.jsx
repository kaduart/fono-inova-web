import { Shield, Lock, FileText, Mail } from 'lucide-react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const PrivacidadePage = () => {
    const ultimaAtualizacao = '23 de março de 2026';

    return (
        <Layout>
            <SEO
                title="Política de Privacidade | Clínica Fono Inova"
                description="Conheça nossa política de privacidade e como protegemos seus dados pessoais."
                url="https://www.clinicafonoinova.com.br/privacidade"
            />

            {/* Hero */}
            <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 to-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                        <Shield className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Política de <span className="text-primary">Privacidade</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        A Clínica Fono Inova respeita sua privacidade. 
                        Saiba como coletamos, usamos e protegemos seus dados pessoais.
                    </p>
                    <p className="text-sm text-gray-400 mt-4">
                        Última atualização: {ultimaAtualizacao}
                    </p>
                </div>
            </section>

            {/* Conteúdo */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-3xl">
                    
                    {/* Introdução */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <FileText className="w-6 h-6 text-primary" />
                            Introdução
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            A Clínica Fono Inova está comprometida com a proteção da sua privacidade. 
                            Esta Política de Privacidade descreve como coletamos, usamos, armazenamos 
                            e protegemos suas informações pessoais ao utilizar nossos serviços, 
                            site e canais de comunicação.
                        </p>
                    </div>

                    {/* Dados Coletados */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Dados que Coletamos</h2>
                        <div className="bg-gray-50 p-6 rounded-xl">
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-start gap-3">
                                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                                    <span><strong>Dados de identificação:</strong> nome completo, CPF, data de nascimento e dados do responsável (quando paciente for menor de idade).</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                                    <span><strong>Contato:</strong> telefone, celular, e-mail e endereço.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                                    <span><strong>Dados de saúde:</strong> histórico médico, queixas, resultados de avaliações e evolução do tratamento.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                                    <span><strong>Dados de comunicação:</strong> conversas via WhatsApp, e-mails e outras interações com nossa equipe.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Uso dos Dados */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Como Usamos seus Dados</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-blue-50 p-5 rounded-xl">
                                <h3 className="font-semibold text-primary mb-2">Atendimento</h3>
                                <p className="text-sm text-gray-600">Agendamento de consultas, realização de avaliações e acompanhamento terapêutico.</p>
                            </div>
                            <div className="bg-blue-50 p-5 rounded-xl">
                                <h3 className="font-semibold text-primary mb-2">Comunicação</h3>
                                <p className="text-sm text-gray-600">Envio de lembretes de consulta, orientações e informações sobre tratamentos.</p>
                            </div>
                            <div className="bg-blue-50 p-5 rounded-xl">
                                <h3 className="font-semibold text-primary mb-2">Melhoria Contínua</h3>
                                <p className="text-sm text-gray-600">Aprimoramento de nossos serviços e experiência do paciente.</p>
                            </div>
                            <div className="bg-blue-50 p-5 rounded-xl">
                                <h3 className="font-semibold text-primary mb-2">Obrigações Legais</h3>
                                <p className="text-sm text-gray-600">Cumprimento de exigências legais e regulatórias da área de saúde.</p>
                            </div>
                        </div>
                    </div>

                    {/* Proteção */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Lock className="w-6 h-6 text-primary" />
                            Proteção dos seus Dados
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Implementamos medidas técnicas e organizacionais para proteger suas informações:
                        </p>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start gap-2">
                                <span className="text-primary">✓</span>
                                <span>Criptografia de dados sensíveis</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">✓</span>
                                <span>Acesso restrito apenas a profissionais autorizados</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">✓</span>
                                <span>Ambiente seguro e controlado para armazenamento de prontuários</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">✓</span>
                                <span>Treinamento constante da equipe sobre sigilo profissional</span>
                            </li>
                        </ul>
                    </div>

                    {/* Compartilhamento */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Compartilhamento de Dados</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Seus dados <strong>não são vendidos</strong> a terceiros. Compartilhamos informações apenas:
                        </p>
                        <ul className="mt-4 space-y-2 text-gray-600">
                            <li className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <span>Com profissionais da equipe multidisciplinar quando necessário para o tratamento</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <span>Quando exigido por lei ou ordem judicial</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <span>Com seu consentimento expresso</span>
                            </li>
                        </ul>
                    </div>

                    {/* Direitos */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Seus Direitos</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            De acordo com a LGPD (Lei Geral de Proteção de Dados), você tem direito a:
                        </p>
                        <div className="bg-gray-50 p-6 rounded-xl space-y-3">
                            <p className="text-gray-600">• Acessar seus dados pessoais</p>
                            <p className="text-gray-600">• Corrigir dados incompletos ou desatualizados</p>
                            <p className="text-gray-600">• Solicitar a exclusão de dados</p>
                            <p className="text-gray-600">• Revogar seu consentimento</p>
                            <p className="text-gray-600">• Solicitar portabilidade dos dados</p>
                        </div>
                    </div>

                    {/* Contato */}
                    <div className="bg-primary/5 p-8 rounded-2xl">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Mail className="w-6 h-6 text-primary" />
                            Entre em Contato
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Se tiver dúvidas sobre esta política ou quiser exercer seus direitos, 
                            entre em contato conosco:
                        </p>
                        <div className="space-y-2 text-gray-700">
                            <p><strong>E-mail:</strong> contato@clinicafonoinova.com.br</p>
                            <p><strong>WhatsApp:</strong> (62) 99331-5967</p>
                            <p><strong>Endereço:</strong> Anápolis - GO</p>
                        </div>
                    </div>

                </div>
            </section>
        </Layout>
    );
};

export default PrivacidadePage;
