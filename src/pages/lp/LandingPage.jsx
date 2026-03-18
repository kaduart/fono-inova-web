// Template Premium para Landing Pages
// Rota: /lp/:slug
import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Container, Box, Typography, Breadcrumbs } from '@mui/material';
import { Home, ChevronRight, MapPin, Phone, Clock, Star, CheckCircle } from 'lucide-react';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import WhatsAppCTA from '../../components/lp/WhatsAppCTA';
import { getLandingPageBySlug } from '../../data/landing-pages';
import { schemaLandingPage, schemaLandingPageBreadcrumb } from '../../schemas/clinicaSchemas';
import { articlesData } from '../../data/articlesData';
import ArticleCard from '../../components/ArticleCard';
import { trackLandingPageView, trackLandingPageLead } from '../../services/landingPageAnalytics';
import '../../styles/landing-page-premium.css';

const LandingPage = () => {
  const { slug } = useParams();
  const lp = getLandingPageBySlug(slug);

  // Rastrear view da landing page
  useEffect(() => {
    if (lp) {
      trackLandingPageView(slug, lp.category);
    }
  }, [slug, lp]);

  // Se não encontrar a LP, mostrar 404
  if (!lp) {
    return (
      <Layout>
        <Container className="py-16 mt-16 text-center">
          <Typography variant="h4" className="mb-4">
            Página não encontrada
          </Typography>
          <Typography variant="body1" className="mb-8">
            A landing page solicitada não existe.
          </Typography>
          <Link to="/" className="text-blue-600 hover:underline">
            Voltar para Home
          </Link>
        </Container>
      </Layout>
    );
  }

  // Buscar artigos relacionados
  const relatedArticles = articlesData.filter(article => 
    lp.relatedArticles?.includes(article.slug)
  );

  // Gerar schema
  const pageSchema = schemaLandingPage(lp);
  const breadcrumbSchema = schemaLandingPageBreadcrumb(lp);

  // Array de ícones coloridos para os cards
  const cardIcons = ['red', 'blue', 'green', 'purple', 'orange'];

  return (
    <Layout>
      <SEO
        title={lp.title}
        description={lp.description}
        keywords={lp.keywords?.join(', ')}
        image={lp.image}
        url={`/lp/${lp.slug}`}
        type="website"
        schema={[pageSchema, breadcrumbSchema]}
      />

      {/* Breadcrumb */}
      <Container maxWidth="lg" className="pt-24 pb-4">
        <Breadcrumbs 
          separator={<ChevronRight className="w-4 h-4 text-gray-400" />} 
          aria-label="breadcrumb"
          className="lp-breadcrumb"
        >
          <Link to="/" className="lp-breadcrumb-link">
            <Home className="w-4 h-4" />
            Home
          </Link>
          <Typography className="lp-breadcrumb-current">
            {lp.title}
          </Typography>
        </Breadcrumbs>
      </Container>

      {/* HERO SECTION PREMIUM */}
      <section className="lp-hero">
        {/* Decorações de fundo */}
        <div className="lp-decoration-circle lp-decoration-circle-1"></div>
        <div className="lp-decoration-circle lp-decoration-circle-2"></div>
        
        <Container maxWidth="lg" className="lp-hero-content">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            {/* Coluna de Texto */}
            <div className="order-2 lg:order-1">
              {/* Badge de localização */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm mb-6 animate-fade-in-up">
                <MapPin className="w-4 h-4 text-indigo-500" />
                <span className="text-sm font-medium text-gray-700">
                  {lp.localInfo.bairro}, {lp.localInfo.cidade}
                </span>
              </div>

              <Typography 
                variant="h1" 
                className="lp-hero-title mb-6"
              >
                {lp.hero.headline}
              </Typography>
              
              <Typography 
                variant="h2" 
                className="lp-hero-subtitle mb-8"
              >
                {lp.hero.subheadline}
              </Typography>

              {/* CTA Principal */}
              <div className="flex flex-col sm:flex-row items-start gap-4 mb-8">
                <WhatsAppCTA
                  text={lp.hero.ctaText}
                  link={lp.hero.ctaLink}
                  trackingLabel={`lp-${lp.slug}-hero`}
                  variant="primary"
                  size="large"
                  lpSlug={lp.slug}
                  lpCategory={lp.category}
                  className="lp-btn-primary"
                />
              </div>

              {/* Benefícios rápidos */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Atendimento em {lp.localInfo.cidade}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-500" />
                  <span>Resposta em até 1 hora</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span>Equipe especializada</span>
                </div>
              </div>
            </div>

            {/* Coluna de Imagem */}
            <div className="order-1 lg:order-2 lp-hero-image-wrapper">
              <div className="relative">
                <img
                  src={lp.image}
                  alt={lp.imageAlt}
                  className="lp-hero-image w-full object-cover"
                  style={{ maxHeight: '500px' }}
                  loading="eager"
                />
                
                {/* Badge flutuante */}
                <div className="lp-hero-badge hidden md:flex">
                  <div className="lp-hero-badge-icon">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-900">Atendimento Rápido</p>
                    <p className="text-sm text-gray-500">WhatsApp disponível</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* PROBLEMA / INTRODUÇÃO */}
      <section className="lp-section-light py-20">
        <Container maxWidth="lg">
          <div className="max-w-3xl mx-auto text-center">
            <Typography variant="h2" className="lp-section-title">
              {lp.problem.title}
            </Typography>
            <Typography variant="body1" className="text-lg text-gray-600 leading-relaxed">
              {lp.problem.content}
            </Typography>
          </div>
        </Container>
      </section>

      {/* SINAIS DE ALERTA - CARDS PREMIUM */}
      <section className="lp-section-muted py-20">
        <Container maxWidth="lg">
          <Typography variant="h2" className="lp-section-title">
            {lp.signs.title}
          </Typography>
          <Typography className="lp-section-subtitle">
            Identifique os sinais que indicam a necessidade de acompanhamento especializado
          </Typography>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lp.signs.items.map((sign, index) => (
              <div 
                key={index}
                className="lp-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`lp-card-icon lp-card-icon-${cardIcons[index % cardIcons.length]}`}>
                  <span>{index + 1}</span>
                </div>
                <Typography variant="h6" className="lp-card-title">
                  {sign.title}
                </Typography>
                <Typography variant="body2" className="lp-card-text">
                  {sign.description}
                </Typography>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA MEIO PREMIUM */}
      <section className="lp-cta-section py-20">
        <Container maxWidth="lg" className="lp-cta-content text-center">
          <Typography variant="h2" className="lp-cta-title mb-4">
            Preocupado com o desenvolvimento do seu filho?
          </Typography>
          <Typography variant="body1" className="lp-cta-text mb-10">
            Na Clínica Fono Inova em {lp.localInfo.cidade}, nossa equipe especializada pode ajudar. 
            Agende uma avaliação e descubra como podemos apoiar seu filho.
          </Typography>
          <WhatsAppCTA
            text="Agendar Avaliação"
            link={lp.hero.ctaLink}
            lpSlug={lp.slug}
            lpCategory={lp.category}
            trackingLabel={`lp-${lp.slug}-mid`}
            variant="primary"
            size="large"
            className="lp-btn-secondary"
          />
        </Container>
      </section>

      {/* SOLUÇÃO + PROCESSO */}
      <section className="lp-process-section py-20">
        <Container maxWidth="lg">
          <div className="max-w-3xl mx-auto mb-16">
            <Typography variant="h2" className="lp-section-title">
              {lp.solution.title}
            </Typography>
            <Typography variant="body1" className="text-lg text-gray-600 leading-relaxed text-center">
              {lp.solution.content}
            </Typography>
          </div>
          
          {/* PROCESSO */}
          {lp.process && (
            <div className="max-w-4xl mx-auto">
              <Typography variant="h3" className="text-2xl font-bold text-center text-gray-900 mb-12">
                {lp.process.title}
              </Typography>
              <div className="grid md:grid-cols-2 gap-6">
                {lp.process.steps.map((step, index) => (
                  <div key={index} className="lp-step">
                    <div className="lp-step-number">{index + 1}</div>
                    <div>
                      <Typography variant="h6" className="lp-step-title">
                        {step.title}
                      </Typography>
                      <Typography variant="body2" className="lp-step-text">
                        {step.description}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* FAQ SCHEMA PREMIUM */}
      {lp.faq && lp.faq.length > 0 && (
        <section className="lp-faq-section py-20">
          <Container maxWidth="lg">
            <Typography variant="h2" className="lp-section-title">
              Perguntas Frequentes
            </Typography>
            <Typography className="lp-section-subtitle">
              Tire suas dúvidas sobre nossos serviços em {lp.localInfo.cidade}
            </Typography>
            
            <div className="max-w-3xl mx-auto space-y-4">
              {lp.faq.map((item, index) => (
                <div key={index} className="lp-faq-item">
                  <Typography variant="h6" className="lp-faq-question">
                    {item.question}
                  </Typography>
                  <Typography variant="body2" className="lp-faq-answer">
                    {item.answer}
                  </Typography>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ARTIGOS RELACIONADOS */}
      {relatedArticles.length > 0 && (
        <section className="lp-section-light py-20">
          <Container maxWidth="lg">
            <Typography variant="h2" className="lp-section-title">
              Conteúdos Relacionados
            </Typography>
            <Typography className="lp-section-subtitle">
              Artigos para ajudar no desenvolvimento do seu filho
            </Typography>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA FINAL PREMIUM */}
      <section className="lp-final-cta py-24">
        <Container maxWidth="lg" className="lp-final-cta-content text-center">
          <Typography variant="h2" className="lp-final-cta-title mb-4">
            Comece o Tratamento Agora
          </Typography>
          <Typography variant="body1" className="lp-final-cta-text mb-10 max-w-2xl mx-auto">
            Não espere mais para ajudar seu filho. Entre em contato com a Clínica Fono Inova 
            em {lp.localInfo.cidade} e agende uma avaliação especializada.
          </Typography>
          
          <WhatsAppCTA
            text="Falar com Especialista"
            link={lp.hero.ctaLink}
            trackingLabel={`lp-${lp.slug}-final`}
            variant="primary"
            size="large"
            className="lp-btn-primary"
          />
          
          <div className="lp-contact-info">
            <div className="lp-contact-item">
              <MapPin className="w-5 h-5" />
              <span>{lp.localInfo.endereco}</span>
            </div>
            <div className="lp-contact-item">
              <Phone className="w-5 h-5" />
              <span>WhatsApp: (62) 99337-7726</span>
            </div>
            <div className="lp-contact-item">
              <Clock className="w-5 h-5" />
              <span>Atendimento: Seg-Sex 8h-18h</span>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default LandingPage;
