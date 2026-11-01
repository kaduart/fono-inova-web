// Template Premium para Landing Pages
// Rota: /lp/:slug
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ChevronRight, MapPin, Phone, Clock, Star, Check, ChevronDown } from 'lucide-react';
import Reveal from '../../components/premium/Reveal';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import WhatsAppCTA from '../../components/lp/WhatsAppCTA';
import SignsChecklist from '../../components/lp/SignsChecklist';
import TeamStatus from '../../components/lp/TeamStatus';
import ClinicGallery from '../../components/ClinicGallery';
import DifferentialSection from '../../components/premium/DifferentialSection';
import FixedWhatsAppBar from '../../components/FixedWhatsAppBar.jsx';
import ProofBar from '../../components/premium/ProofBar';
import { getLandingPageBySlug } from '../../data/landing-pages';
import { schemaLandingPage, schemaLandingPageBreadcrumb } from '../../schemas/clinicaSchemas';
import { articlesData } from '../../data/articlesData';
import ArticleCard from '../../components/ArticleCard';
import { trackLandingPageView, trackLandingPageLead } from '../../services/landingPageAnalytics';
import '../../styles/landing-page-premium.css';

// LPs que duplicam uma página estática: canonical aponta para a estática (evita competir entre si)
const CANONICAL_OVERRIDES = {
  'avaliacao-neuropsicologica-anapolis': '/avaliacao-neuropsicologica-anapolis',
};

const LandingPage = () => {
  const { slug } = useParams();
  const lp = getLandingPageBySlug(slug);

  // Rastrear view da landing page
  useEffect(() => {
    if (lp) {
      trackLandingPageView(slug, lp.category);
    }
  }, [slug, lp]);

  // FAQ: uma pergunta aberta por vez, abrindo com animação (AutoAnimate)
  const [openFaq, setOpenFaq] = useState(0);
  const [faqRef] = useAutoAnimate({ duration: 220 });

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
        <div className="mx-auto max-w-3xl px-4 pb-16 pt-32 text-center">
          <h1 className="mb-4 text-3xl font-bold text-slate-900">Página não encontrada</h1>
          <p className="mb-8 text-slate-600">A landing page solicitada não existe.</p>
          <Link to="/" className="font-semibold text-primary hover:underline">Voltar para Home</Link>
        </div>
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
        url={CANONICAL_OVERRIDES[lp.slug] || `/lp/${lp.slug}`}
        type="website"
        schema={[pageSchema, breadcrumbSchema]}
      />

      {/* HERO: título e WhatsApp primeiro (também no celular), foto depois */}
      <section className="bg-white pt-20 lg:pt-[72px]">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <nav aria-label="breadcrumb" className="flex flex-wrap items-center gap-1 pt-5 text-sm text-slate-600">
            <Link to="/" className="hover:text-primary">Início</Link>
            <ChevronRight className="h-4 w-4 text-slate-400" aria-hidden="true" />
            <span className="text-slate-900">{lp.title}</span>
          </nav>
          <div className="grid items-center gap-10 pb-14 pt-8 lg:grid-cols-2 lg:gap-14 lg:pb-20">
            <div className="flex flex-col gap-5">
              <span className="fi-rise inline-flex items-center gap-2 text-sm font-semibold text-primary">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {lp.localInfo.bairro}, {lp.localInfo.cidade}
              </span>
              <h1 className="text-[2.15rem] font-extrabold leading-[1.06] tracking-[-0.03em] text-slate-900 sm:text-5xl lg:text-[3.4rem]">
                {lp.hero.headline}
              </h1>
              <p className="fi-rise fi-rise-1 text-lg leading-relaxed text-slate-700 md:text-xl">
                {lp.hero.subheadline}
              </p>
              <div className="fi-rise fi-rise-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                <WhatsAppCTA
                  text="Falar com especialista no WhatsApp"
                  link={lp.hero.ctaLink}
                  trackingLabel={`lp-${lp.slug}-hero`}
                  variant="primary"
                  size="large"
                  lpSlug={lp.slug}
                  lpCategory={lp.category}
                  className="lp-btn-primary w-full justify-center sm:w-auto"
                />
                <a href="tel:+5562992013573" className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[14px] px-5 font-semibold text-slate-800 ring-1 ring-slate-300 transition-colors hover:bg-slate-50">
                  <Phone className="h-4 w-4" aria-hidden="true" /> (62) 99201-3573
                </a>
              </div>
              <TeamStatus className="fi-rise fi-rise-3" />
              <p className="fi-rise fi-rise-3 text-sm text-slate-600">
                Atendimento humanizado, sem julgamentos e com orientação clara para os pais.
              </p>
              <div className="fi-rise fi-rise-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-700">
                <span className="inline-flex items-center gap-1.5"><Star className="h-4 w-4 fill-amber-400 text-amber-500" aria-hidden="true" /><b className="text-slate-900">5,0</b> no Google</span>
                <span><b className="text-slate-900">+500</b> famílias atendidas</span>
                <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-primary" aria-hidden="true" />Atendimento em {lp.localInfo.cidade}</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" aria-hidden="true" />Resposta rápida pelo WhatsApp</span>
                <span className="inline-flex items-center gap-1.5"><Star className="h-4 w-4 text-primary" aria-hidden="true" />Equipe especializada</span>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-3xl shadow-[0_30px_60px_-30px_rgba(15,64,55,0.45)]">
                <img
                  src={lp.image}
                  alt={lp.imageAlt || lp.title}
                  className="fi-zoom h-72 w-full object-cover sm:h-96 lg:h-[460px]"
                  loading="eager"
                  fetchpriority="high"
                  decoding="async"
                />
              </div>
              <a
                href={lp.hero.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="fi-float absolute -bottom-5 left-4 hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-slate-100 transition-shadow hover:shadow-2xl md:flex"
                onClick={() => trackLandingPageLead(lp.slug, lp.category, { source: 'badge_whatsapp', location: 'hero_image' })}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-700 text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Z"/></svg>
                </span>
                <span className="leading-tight">
                  <span className="block font-semibold text-slate-900">Atendimento rápido</span>
                  <span className="block text-sm text-slate-600">WhatsApp disponível</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <ProofBar className="-mt-2 bg-white pb-6" status={false} />

      {/* IDENTIFICAÇÃO: cada item abre o WhatsApp já com o assunto */}
      {lp.identification && (
        <section className="bg-[#f6f9f8] py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:px-6">
            <Reveal>
              <h2 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">{lp.identification.title}</h2>
              <p className="mt-3 text-slate-600">Marque o que acontece com o seu filho. A conversa no WhatsApp já começa com o que você marcou.</p>
              <div className="mt-6 hidden lg:block">
                <WhatsAppCTA
                  text="Falar com especialista sobre meu filho"
                  link={lp.hero.ctaLink}
                  trackingLabel={`lp-${lp.slug}-identification`}
                  variant="primary"
                  size="large"
                  className="lp-btn-primary"
                />
              </div>
            </Reveal>
            <SignsChecklist
              items={lp.identification.items}
              lpSlug={lp.slug}
              lpCategory={lp.category}
              topic={`"${(lp.title || '').split(' | ')[0]}"`}
            />
            <div className="lg:hidden">
              <WhatsAppCTA
                text="Falar com especialista sobre meu filho"
                link={lp.hero.ctaLink}
                trackingLabel={`lp-${lp.slug}-identification`}
                variant="primary"
                size="large"
                className="lp-btn-primary w-full justify-center"
              />
            </div>
          </div>
        </section>
      )}

      {/* PROBLEMA / INTRODUÇÃO */}
      <section className="bg-white py-16 md:py-20">
        <Reveal className="mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">{lp.problem.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-700">{lp.problem.content}</p>
        </Reveal>
      </section>

      {/* SINAIS DE ALERTA */}
      <section className="bg-[#f6f9f8] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <Reveal>
            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">{lp.signs.title}</h2>
            <p className="mt-3 max-w-2xl text-slate-600">Identifique os sinais que indicam a necessidade de acompanhamento especializado</p>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {lp.signs.items.map((sign, index) => (
              <Reveal key={index} delay={(index % 3) * 80}>
                <button
                  type="button"
                  className="fi-lift group flex h-full w-full flex-col gap-2 rounded-2xl bg-white p-6 text-left ring-1 ring-slate-200 hover:ring-primary"
                  onClick={() => {
                    trackLandingPageLead(lp.slug, lp.category, { source: 'sign_card', sign: sign.title });
                    window.open(lp.hero.ctaLink, '_blank');
                  }}
                >
                  <span className="text-sm font-bold text-primary">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-lg font-bold text-slate-900">{sign.title}</span>
                  <span className="text-slate-600">{sign.description}</span>
                </button>
              </Reveal>
            ))}
            <Reveal delay={(lp.signs.items.length % 3) * 80}>
              <div className="flex h-full flex-col justify-between gap-5 rounded-2xl bg-[#0f5c4b] p-6 text-white">
                <p className="text-xl font-bold leading-snug">Seu filho apresenta algum desses sinais?</p>
                <WhatsAppCTA
                  text="Falar com especialista agora"
                  link={lp.hero.ctaLink}
                  trackingLabel={`lp-${lp.slug}-signs-cta`}
                  lpSlug={lp.slug}
                  lpCategory={lp.category}
                  variant="secondary"
                  size="medium"
                  className="lp-btn-secondary self-start"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA MEIO */}
      <section className="bg-[#0f5c4b] py-16 text-white md:py-20">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-5 px-4 text-center">
          <h2 className="text-3xl font-extrabold leading-tight md:text-4xl">
            {lp.ctaMid?.text || "Quanto antes identificar, mais fácil é ajudar seu filho"}
          </h2>
          <p className="max-w-2xl text-lg text-emerald-50/90">
            Na Clínica Fono Inova em {lp.localInfo.cidade}, nossa equipe especializada pode ajudar.
            Agende uma avaliação e descubra como podemos apoiar seu filho.
          </p>
          <WhatsAppCTA
            text={lp.ctaMid?.button || "Falar com especialista agora"}
            link={lp.hero.ctaLink}
            lpSlug={lp.slug}
            lpCategory={lp.category}
            trackingLabel={`lp-${lp.slug}-mid`}
            variant="secondary"
            size="large"
            className="lp-btn-secondary"
          />
        </Reveal>
      </section>

      {/* SOLUÇÃO + PROCESSO */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 lg:grid-cols-2 lg:px-6">
          <Reveal>
            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">{lp.solution.title}</h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-700">{lp.solution.content}</p>
          </Reveal>
          {lp.process && (
            <Reveal delay={100}>
              <div className="rounded-3xl bg-[#f6f9f8] p-6 ring-1 ring-slate-200 md:p-8">
                <h3 className="text-2xl font-bold text-slate-900">{lp.process.title}</h3>
                <ol className="mt-6 flex flex-col gap-5">
                  {lp.process.steps.map((step, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">{index + 1}</span>
                      <span>
                        <span className="block font-bold text-slate-900">{step.title}</span>
                        <span className="block text-slate-600">{step.description}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* URGÊNCIA LEVE */}
      {lp.urgency && (
        <section className="border-y border-amber-100 bg-amber-50 py-12">
          <Reveal className="mx-auto flex max-w-4xl flex-col items-start gap-5 px-4 md:flex-row md:items-center md:justify-between">
            <p className="text-xl font-semibold leading-snug text-amber-950">{lp.urgency.text}</p>
            <WhatsAppCTA
              text="Agendar avaliação"
              link={lp.hero.ctaLink}
              trackingLabel={`lp-${lp.slug}-urgency`}
              lpSlug={lp.slug}
              lpCategory={lp.category}
              variant="primary"
              size="medium"
              className="lp-btn-primary shrink-0"
            />
          </Reveal>
        </section>
      )}

      <DifferentialSection photo={['terapia', 'ludico', 'jogos', 'kids', 'movimento', 'piscina'][(lp.slug || '').length % 6]} whatsappMessage={`Oi! Vi a página "${lp.title}" da Fono Inova e gostaria de entender como funciona o atendimento.`} />

      <ClinicGallery variant="carousel" />

      {/* FAQ */}
      {lp.faq && lp.faq.length > 0 && (
        <section className="bg-[#f6f9f8] py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:px-6">
            <Reveal>
              <h2 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">Perguntas frequentes</h2>
              <p className="mt-3 text-slate-600">Tire suas dúvidas sobre nossos serviços em {lp.localInfo.cidade}</p>
            </Reveal>
            <div ref={faqRef} className="divide-y divide-slate-200 rounded-2xl bg-white px-5 ring-1 ring-slate-200 md:px-7">
              {lp.faq.map((item, index) => {
                const open = openFaq === index;
                return (
                  <div key={index} className="py-1">
                    <h3>
                      <button
                        type="button"
                        aria-expanded={open}
                        onClick={() => setOpenFaq(open ? -1 : index)}
                        className="flex w-full items-center justify-between gap-4 py-4 text-left text-lg font-bold text-slate-900"
                      >
                        {item.question}
                        <ChevronDown className={`h-5 w-5 shrink-0 text-primary transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
                      </button>
                    </h3>
                    {/* Resposta sempre no HTML (SEO); fechada fica só oculta */}
                    <p className={open ? 'pb-5 text-slate-700' : 'hidden'}>{item.answer}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ARTIGOS RELACIONADOS */}
      {relatedArticles.length > 0 && (
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 lg:px-6">
            <Reveal>
              <h2 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">Conteúdos relacionados</h2>
              <p className="mt-3 text-slate-600">Artigos para ajudar no desenvolvimento do seu filho</p>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA FINAL */}
      <section className="bg-[#0f5c4b] py-20 text-white">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-5 px-4 text-center">
          <h2 className="text-3xl font-extrabold leading-tight md:text-[2.6rem]">Seu filho pode evoluir com o acompanhamento certo</h2>
          <p className="max-w-2xl text-lg text-emerald-50/90">
            Não espere mais. Entre em contato com a Clínica Fono Inova em {lp.localInfo.cidade} e agende uma avaliação especializada.
          </p>
          <p className="text-sm text-emerald-50/80">Quanto antes começar, melhores são os resultados.</p>
          <WhatsAppCTA
            text="Quero falar com um especialista"
            link={lp.hero.ctaLink}
            trackingLabel={`lp-${lp.slug}-final`}
            variant="secondary"
            size="large"
            className="lp-btn-secondary"
          />
          <ul className="mt-4 flex flex-col flex-wrap justify-center gap-x-8 gap-y-3 text-emerald-50/90 md:flex-row">
            <li className="inline-flex items-center gap-2"><MapPin className="h-5 w-5" aria-hidden="true" />{lp.localInfo.endereco}</li>
            <li className="inline-flex items-center gap-2"><Phone className="h-5 w-5" aria-hidden="true" />WhatsApp: (62) 99201-3573</li>
            <li className="inline-flex items-center gap-2"><Clock className="h-5 w-5" aria-hidden="true" />Atendimento: Seg-Sex 8h-18h</li>
          </ul>
        </Reveal>
      </section>
      <FixedWhatsAppBar message={`Oi! Vi a página "${lp.title}" da Fono Inova e gostaria de entender como funciona o atendimento.`} />
    </Layout>
  );
};

export default LandingPage;
