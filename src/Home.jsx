// src/App.jsx (agora é a homepage)
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Activity,
  ArrowRight,
  Brain,
  Calendar,
  MapPin,
  MessageCircle,
  Users
} from 'lucide-react';
import { useState } from 'react';
import BookingModal from './components/BookingModal';
import ImageCarousel from './components/ImageCarousel.jsx';
import Layout from './components/Layout';
import { Mail, Phone, Star } from '@mui/icons-material';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const services = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Fonoaudiologia",
      description: "Ajuda a criança a desenvolver a fala, a linguagem, a comunicação e a alimentação de forma segura e eficaz.",
      color: "bg-primary",
      link: "/fonoaudiologia"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Psicologia",
      description: "Acompanha o desenvolvimento emocional, social e comportamental, ajudando a criança a lidar com sentimentos, medos e mudanças.",
      color: "bg-secondary",
      link: "/psicologia"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Terapia Ocupacional",
      description: "Ajuda a criança a conquistar sua independência nas atividades do dia a dia, garantindo autonomia e crescimento contínuo.",
      color: "bg-accent",
      link: "/terapia-ocupacional"
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Fisioterapia",
      description: "Atua no fortalecimento muscular, coordenação motora, postura e reabilitação física desde os primeiros meses de vida.",
      color: "bg-primary",
      link: "/fisioterapia"
    }
  ];

  const testimonials = [
    {
      name: "Ana Oliveira",
      role: "Mãe de Paciente",
      content: "Minha filha começou a falar muito melhor depois das sessões na Clínica Fono Inova. A equipe é incrível!",
      rating: 5
    },
    {
      name: "Carlos Silva",
      role: "Pai de Paciente",
      content: "Profissionais extremamente qualificados e um ambiente acolhedor. Recomendo para todas as famílias.",
      rating: 5
    },
    {
      name: "Maria Santos",
      role: "Mãe de Paciente",
      content: "O cuidado multidisciplinar fez toda a diferença no desenvolvimento do meu filho. Muito obrigada!",
      rating: 5
    }
  ];

  const openWhatsApp = () => {
    window.open('https://wa.me/5562992013573?text=Olá! Gostaria de agendar uma consulta na Clínica Fono Inova.', '_blank');
  };

  return (
    <Layout>
      <section className="pt-[96px] md:pt-[122px] pb-12 md:pb-16 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="order-2 lg:order-1 animate-fade-in-up">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                Apoio Multidisciplinar
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-poppins mb-4 md:mb-6 leading-tight">
                Transformando
                <span className="text-primary"> Desafios </span>
                em
                <span className="text-secondary"> Conquistas</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 leading-relaxed">
                Na <b>Clínica Fono Inova</b>, convertemos desafios em conquistas por meio de terapias inovadoras,
                focadas no desenvolvimento e no sucesso das crianças.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  size="lg"
                  onClick={() => setIsModalOpen(true)}
                  className="bg-accent hover:bg-accent/90 text-base md:text-lg px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6"
                >
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Agendar Consulta
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection('services')}
                  className="text-base md:text-lg px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6"
                >
                  Conhecer Serviços
                </Button>
              </div>
            </div>

            {/* Image Carousel */}
            <div className="order-1 lg:order-2 relative w-full mb-8 lg:mb-0">
              <div className="w-full h-64 sm:h-80 md:h-96 bg-gradient-to-br from-primary to-secondary rounded-3xl overflow-hidden animate-float">
                <ImageCarousel />
              </div>
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-accent rounded-full flex items-center justify-center animate-pulse">
                <Star className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
              Nossos Serviços
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6">
              Cuidado Multidisciplinar para Cada Fase do
              <span className="text-primary"> Desenvolvimento Infantil</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Oferecemos uma ampla gama de serviços especializados, priorizando excelência e satisfação no atendimento.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover-lift border-0 shadow-lg">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center text-white mx-auto mb-4`}>
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl font-poppins">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                Sobre Nós
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6">
                Promovendo o Crescimento e
                <span className="text-secondary"> Bem-Estar Infantil</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Na Clínica Fono Inova, nossa missão é oferecer cuidado multidisciplinar de excelência para crianças,
                guiados por valores como empatia, inovação e compromisso com o desenvolvimento integral.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Oferecemos serviços especializados como fonoaudiologia, psicologia, terapia ocupacional e fisioterapia,
                sempre com foco no bem-estar e na evolução das crianças.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-muted-foreground">Crianças Atendidas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">95%</div>
                  <div className="text-muted-foreground">Taxa de Satisfação</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-secondary to-accent rounded-3xl flex items-center justify-center">
                <img src="/images/psicologia/psico3.jpg" alt="Atendimento de Psicologia" className="w-full h-96 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              Depoimentos
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6">
              O que os
              <span className="text-accent"> Pais </span>
              dizem sobre nós
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover-lift border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-lg leading-relaxed">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-muted-foreground">{testimonial.role}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Entre em Contato
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold font-poppins mb-6">
              Apoio Integrado para o
              <span className="text-primary"> Crescimento Infantil</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Entre em contato para cuidar do futuro do seu pequeno.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Endereço</h3>
                  <p className="text-muted-foreground">
                    Avenida Minas Gerais, 405, Bairro Jundiaí<br />
                    Anápolis – GO
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Telefone</h3>
                  <p className="text-muted-foreground">(62) 3706-3924</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">E-mail</h3>
                  <p className="text-muted-foreground">contato@clinicafonoinova.com.br</p>
                </div>
              </div>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-poppins">Agende sua Consulta</CardTitle>
                <CardDescription>
                  Preencha o formulário e entraremos em contato em breve.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nome</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Telefone</label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="(62) 99999-9999"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">E-mail</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Especialidade</label>
                  <select className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Selecione uma especialidade</option>
                    <option>Fonoaudiologia</option>
                    <option>Psicologia</option>
                    <option>Terapia Ocupacional</option>
                    <option>Fisioterapia</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Mensagem</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Conte-nos mais sobre suas necessidades..."
                  ></textarea>
                </div>
                <Button onClick={openWhatsApp} className="w-full bg-green-500 hover:bg-green-600">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Enviar via WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Layout>
  );
}

export default Home;