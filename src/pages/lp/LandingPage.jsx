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

  // Animação de fade-in nas seções ao entrar na viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.lp-fade-section').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [lp]);

  // Tracking de scroll depth e tempo na página
  useEffect(() => {
    if (!lp) return;
    const milestones = new Set();
    const handleScroll = () => {
      const pct = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      [50, 75, 100].forEach(m => {
        if (pct >= m && !milestones.has(m)) {
          milestones.add(m);
          trackLandingPageLead(lp.slug, lp.category, { source: 'scroll_depth', milestone: `${m}%` });
        }
      });
    };
    const t30 = setTimeout(() => trackLandingPageLead(lp.slug, lp.category, { source: 'time_on_page', seconds: 30 }), 30000);
    const t60 = setTimeout(() => trackLandingPageLead(lp.slug, lp.category, { source: 'time_on_page', seconds: 60 }), 60000);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(t30);
      clearTimeout(t60);
    };
  }, [lp]);

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
                sx={{ 
                  fontSize: { xs: '1.75rem', md: '2rem' }, 
                  fontWeight: 700, 
                  lineHeight: 1.3,
                  color: '#1e293b',
                  mb: 3 
                }}
              >
                {lp.hero.headline}
              </Typography>
              
              <Typography 
                variant="h2" 
                sx={{ 
                  fontSize: { xs: '1.125rem', md: '1.25rem' }, 
                  fontWeight: 400, 
                  lineHeight: 1.5,
                  color: '#64748b',
                  mb: 4 
                }}
              >
                {lp.hero.subheadline}
              </Typography>

              {/* CTA Principal */}
              <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
                <WhatsAppCTA
                  text="Falar com especialista no WhatsApp"
                  link={lp.hero.ctaLink}
                  trackingLabel={`lp-${lp.slug}-hero`}
                  variant="primary"
                  size="large"
                  lpSlug={lp.slug}
                  lpCategory={lp.category}
                  className="lp-btn-primary"
                />
              </div>

              {/* Frase de segurança */}
              <p className="text-sm text-gray-500 mb-5 italic">
                Atendimento humanizado, sem julgamentos e com orientação clara para os pais.
              </p>

              {/* Prova social */}
              <div className="flex items-center gap-3 mb-6 text-sm text-gray-600">
                <span className="text-amber-500 font-semibold">⭐⭐⭐⭐⭐ 4.9 no Google</span>
                <span className="text-gray-300">|</span>
                <span>+500 famílias atendidas</span>
              </div>

              {/* Benefícios rápidos */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Atendimento em {lp.localInfo.cidade}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-500" />
                  <span>Resposta rápida pelo WhatsApp</span>
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
                
                {/* Badge flutuante - Agora clicável */}
                <a 
                  href={lp.hero.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lp-hero-badge hidden md:flex cursor-pointer hover:shadow-xl transition-all"
                  onClick={() => {
                    trackLandingPageLead(lp.slug, lp.category, {
                      source: 'badge_whatsapp',
                      location: 'hero_image'
                    });
                  }}
                >
                  <div className="lp-hero-badge-icon">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-900">Atendimento Rápido</p>
                    <p className="text-sm text-gray-500">WhatsApp disponível</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* IDENTIFICAÇÃO - NOVO */}
      {lp.identification && (
        <section className="lp-fade-section py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
          <Container maxWidth="lg">
            <Typography 
              variant="h2" 
              sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' }, fontWeight: 700, textAlign: 'center', mb: 4 }}
            >
              {lp.identification.title}
            </Typography>
            <p className="text-center text-gray-500 mb-6 text-sm">
              Selecione o que mais se parece com o seu filho
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {lp.identification.items.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-start gap-3 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    trackLandingPageLead(lp.slug, lp.category, { source: 'identification_item', item });
                    const msg = `Oi! Vi no site e meu filho apresenta: "${item}". Pode me explicar como funciona a avaliação?`;
                    window.open(`https://wa.me/5562992013573?text=${encodeURIComponent(msg)}`, '_blank');
                  }}
                >
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <span className="text-gray-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <WhatsAppCTA
                text="Falar com especialista sobre meu filho"
                link={lp.hero.ctaLink}
                trackingLabel={`lp-${lp.slug}-identification`}
                variant="primary"
                size="large"
              />
            </div>
          </Container>
        </section>
      )}

      {/* PROBLEMA / INTRODUÇÃO */}
      <section className="lp-fade-section lp-section-light py-20">
        <Container maxWidth="lg">
          <div className="max-w-3xl mx-auto">
            <Typography variant="h2" className="lp-section-title text-center">
              {lp.problem.title}
            </Typography>
            <Typography variant="body1" className="text-lg text-gray-600 leading-relaxed text-left">
              {lp.problem.content}
            </Typography>
          </div>
        </Container>
      </section>

      {/* SINAIS DE ALERTA - CARDS PREMIUM */}
      <section className="lp-fade-section lp-section-muted py-20">
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
                className="lp-card cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => {
                  trackLandingPageLead(lp.slug, lp.category, { source: 'sign_card', sign: sign.title });
                  window.open(lp.hero.ctaLink, '_blank');
                }}
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

          {/* CTA abaixo dos sinais */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4 font-medium">Seu filho apresenta algum desses sinais?</p>
            <WhatsAppCTA
              text="Falar com especialista agora"
              link={lp.hero.ctaLink}
              trackingLabel={`lp-${lp.slug}-signs-cta`}
              lpSlug={lp.slug}
              lpCategory={lp.category}
              variant="primary"
              size="large"
            />
          </div>
        </Container>
      </section>

      {/* CTA MEIO PREMIUM - Usa ctaMid se existir */}
      <section className="lp-cta-section py-20">
        <Container maxWidth="lg" className="lp-cta-content text-center">
          <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' }, fontWeight: 700, mb: 2 }}>
            {lp.ctaMid?.text || "Quanto antes identificar, mais fácil é ajudar seu filho"}
          </Typography>
          <Typography variant="body1" className="lp-cta-text mb-8">
            Na Clínica Fono Inova em {lp.localInfo.cidade}, nossa equipe especializada pode ajudar. 
            Agende uma avaliação e descubra como podemos apoiar seu filho.
          </Typography>
          <WhatsAppCTA
            text={lp.ctaMid?.button || "Falar com especialista agora"}
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
      <section className="lp-fade-section lp-process-section py-20">
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

      {/* URGÊNCIA LEVE - NOVO */}
      {lp.urgency && (
        <section className="py-12 bg-amber-50 border-y border-amber-100">
          <Container maxWidth="lg" className="text-center">
            <Typography 
              variant="h3" 
              sx={{ fontSize: { xs: '1.125rem', md: '1.25rem' }, fontWeight: 600, color: '#92400e' }}
            >
              ⚡ {lp.urgency.text}
            </Typography>
          </Container>
        </section>
      )}

      {/* CTA FINAL PREMIUM */}
      <section className="lp-final-cta py-24">
        <Container maxWidth="lg" className="lp-final-cta-content text-center">
          <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, mb: 2 }}>
            Seu filho pode evoluir com o acompanhamento certo
          </Typography>
          <Typography variant="body1" className="lp-final-cta-text mb-10 max-w-2xl mx-auto">
            Não espere mais. Entre em contato com a Clínica Fono Inova
            em {lp.localInfo.cidade} e agende uma avaliação especializada.
          </Typography>

          <p className="text-white/80 text-sm mb-4 italic">
            Quanto antes começar, melhores são os resultados.
          </p>
          <WhatsAppCTA
            text="Quero falar com um especialista"
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
