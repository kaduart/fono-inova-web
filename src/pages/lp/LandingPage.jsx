// Template único para Landing Pages
// Rota: /lp/:slug
import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Container, Box, Typography, Breadcrumbs } from '@mui/material';
import { Home, ChevronRight } from 'lucide-react';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import WhatsAppCTA from '../../components/lp/WhatsAppCTA';
import { getLandingPageBySlug } from '../../data/landing-pages';
import { schemaLandingPage, schemaLandingPageBreadcrumb } from '../../schemas/clinicaSchemas';
import { articlesData } from '../../data/articlesData';
import ArticleCard from '../../components/ArticleCard';
import { trackLandingPageView, trackLandingPageLead } from '../../services/landingPageAnalytics';

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
        <Breadcrumbs separator={<ChevronRight className="w-4 h-4" />} aria-label="breadcrumb">
          <Link to="/" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <Home className="w-4 h-4 mr-1" />
            Home
          </Link>
          <Typography color="textPrimary" className="text-gray-800">
            {lp.title}
          </Typography>
        </Breadcrumbs>
      </Container>

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 lg:py-24">
        <Container maxWidth="lg">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Typography 
                variant="h1" 
                className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
              >
                {lp.hero.headline}
              </Typography>
              <Typography 
                variant="h2" 
                className="text-xl text-gray-600 mb-8 leading-relaxed"
              >
                {lp.hero.subheadline}
              </Typography>
              <WhatsAppCTA
                text={lp.hero.ctaText}
                link={lp.hero.ctaLink}
                trackingLabel={`lp-${lp.slug}-hero`}
                variant="primary"
                size="large"
                lpSlug={lp.slug}
                lpCategory={lp.category}
              />
              <p className="mt-4 text-sm text-gray-500">
                Atendimento em {lp.localInfo.cidade} • Resposta em até 1 hora
              </p>
            </div>
            <div className="relative">
              <img
                src={lp.image}
                alt={lp.imageAlt}
                className="rounded-2xl shadow-2xl w-full object-cover"
                width="600"
                height="400"
                loading="eager"
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Atendimento Rápido</p>
                    <p className="text-sm text-gray-500">WhatsApp disponível</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* PROBLEMA */}
      <section className="py-16 bg-white">
        <Container maxWidth="lg">
          <div className="max-w-3xl mx-auto text-center">
            <Typography variant="h2" className="text-3xl font-bold text-gray-900 mb-6">
              {lp.problem.title}
            </Typography>
            <Typography variant="body1" className="text-lg text-gray-600 leading-relaxed">
              {lp.problem.content}
            </Typography>
          </div>
        </Container>
      </section>

      {/* SINAIS DE ALERTA */}
      <section className="py-16 bg-gray-50">
        <Container maxWidth="lg">
          <Typography variant="h2" className="text-3xl font-bold text-center text-gray-900 mb-12">
            {lp.signs.title}
          </Typography>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lp.signs.items.map((sign, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-red-600 font-bold">{index + 1}</span>
                </div>
                <Typography variant="h6" className="font-bold text-gray-900 mb-2">
                  {sign.title}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  {sign.description}
                </Typography>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA MEIO */}
      <section className="py-16 bg-blue-600">
        <Container maxWidth="lg" className="text-center">
          <Typography variant="h2" className="text-3xl font-bold text-white mb-4">
            Preocupado com o desenvolvimento do seu filho?
          </Typography>
          <Typography variant="body1" className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Na Clínica Fono Inova em {lp.localInfo.cidade}, nossa equipe especializada pode ajudar. 
            Agende uma avaliação e descubra como podemos apoiar seu filho.
          </Typography>
          <WhatsAppCTA
            text="Agendar Avaliação"
            link={lp.hero.ctaLink}
            lpSlug={lp.slug}
            lpCategory={lp.category}
            trackingLabel={`lp-${lp.slug}-mid`}
            variant="secondary"
            size="large"
            className="bg-white text-blue-600 hover:bg-gray-100"
          />
        </Container>
      </section>

      {/* SOLUÇÃO */}
      <section className="py-16 bg-white">
        <Container maxWidth="lg">
          <div className="max-w-3xl mx-auto">
            <Typography variant="h2" className="text-3xl font-bold text-center text-gray-900 mb-6">
              {lp.solution.title}
            </Typography>
            <Typography variant="body1" className="text-lg text-gray-600 leading-relaxed text-center mb-12">
              {lp.solution.content}
            </Typography>
            
            {/* PROCESSO */}
            {lp.process && (
              <div className="mt-12">
                <Typography variant="h3" className="text-2xl font-bold text-center text-gray-900 mb-8">
                  {lp.process.title}
                </Typography>
                <div className="grid md:grid-cols-2 gap-6">
                  {lp.process.steps.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <Typography variant="h6" className="font-bold text-gray-900 mb-1">
                          {step.title}
                        </Typography>
                        <Typography variant="body2" className="text-gray-600">
                          {step.description}
                        </Typography>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* FAQ SCHEMA */}
      {lp.faq && lp.faq.length > 0 && (
        <section className="py-16 bg-gray-50">
          <Container maxWidth="lg">
            <Typography variant="h2" className="text-3xl font-bold text-center text-gray-900 mb-12">
              Perguntas Frequentes
            </Typography>
            <div className="max-w-3xl mx-auto space-y-4">
              {lp.faq.map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                  <Typography variant="h6" className="font-bold text-gray-900 mb-2">
                    {item.question}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
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
        <section className="py-16 bg-white">
          <Container maxWidth="lg">
            <Typography variant="h2" className="text-3xl font-bold text-center text-gray-900 mb-12">
              Conteúdos Relacionados
            </Typography>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA FINAL */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700">
        <Container maxWidth="lg" className="text-center">
          <Typography variant="h2" className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Comece o Tratamento Agora
          </Typography>
          <Typography variant="body1" className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
            Não espere mais para ajudar seu filho. Entre em contato com a Clínica Fono Inova 
            em {lp.localInfo.cidade} e agende uma avaliação especializada.
          </Typography>
          <WhatsAppCTA
            text="Falar com Especialista"
            link={lp.hero.ctaLink}
            trackingLabel={`lp-${lp.slug}-final`}
            variant="primary"
            size="large"
          />
          <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6 text-blue-100">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{lp.localInfo.endereco}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>WhatsApp: (62) 99337-7726</span>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default LandingPage;
