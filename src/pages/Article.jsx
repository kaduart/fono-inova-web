import {
    ChevronRight,
    Clock,
    Facebook,
    Instagram,
    MessageCircle,
    Share2,
    User,
    Youtube
} from 'lucide-react';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp.jsx';
import Reveal from '../components/premium/Reveal';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { articlesData } from '../data/articlesData';
import { schemaArticle, schemaFAQArticle, schemaBreadcrumbList } from '../schemas/clinicaSchemas';
import { RelatedLandingPages, CTABox, articleInterlinks } from '../components/RelatedContent';

const ArticlePage = () => {
    const { slug } = useParams();
    const article = articlesData.find(article => article.slug === slug);

    if (!article) {
        return (
            <Layout>
                <div className="mx-auto max-w-3xl px-4 pb-16 pt-32 text-center">
                    <h1 className="text-3xl font-bold text-slate-900">Artigo não encontrado</h1>
                    <Link to="/artigos" className="mt-4 inline-block font-semibold text-primary hover:underline">Ver todos os artigos</Link>
                </div>
            </Layout>
        );
    }


    // Função para estilizar o conteúdo do artigo
    const waArticleMsg = `Oi! Li o artigo "${article.title}" no site da Fono Inova e queria tirar uma dúvida sobre o meu filho.`;
    let h2Count = 0;
    const midCta = (
        <aside key="cta-meio" className="my-10 flex flex-col gap-4 rounded-2xl bg-[#0f5c4b] p-6 text-white sm:flex-row sm:items-center sm:justify-between">
            <span className="leading-snug">
                <span className="block text-lg font-bold">Ficou com dúvida sobre o seu filho?</span>
                <span className="block text-emerald-50/90">A equipe da clínica responde pelo WhatsApp.</span>
            </span>
            <ButtonWhatsApp message={waArticleMsg} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 font-bold text-[#0f5c4b] transition-transform motion-safe:hover:-translate-y-0.5">
                <MessageCircle className="h-5 w-5" aria-hidden="true" /> Conversar no WhatsApp
            </ButtonWhatsApp>
        </aside>
    );

    const styledContent = (
        <div className="space-y-6">
            {React.Children.map(article.content.props.children, (child) => {
                if (!child) return null;

                // Estilizar parágrafos
                if (child.type === 'p') {
                    return <p className="text-lg leading-[1.75] text-slate-700">{child.props.children}</p>;
                }

                // Estilizar cabeçalhos
                if (child.type === 'h2') {
                    h2Count += 1;
                    const heading = <h2 key={`h2-${h2Count}`} className="!mt-12 text-[1.75rem] font-extrabold leading-tight text-slate-900">{child.props.children}</h2>;
                    // CTA no meio do texto, antes do 3º subtítulo
                    return h2Count === 3 ? <>{midCta}{heading}</> : heading;
                }

                // Estilizar listas
                if (child.type === 'ul') {
                    return (
                        <ul className="space-y-3 rounded-2xl bg-[#f6f9f8] p-6">
                            {React.Children.map(child.props.children, (li) => (
                                <li className="flex items-start">
                                    <span className="mt-2.5 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-primary"></span>
                                    <span className="text-lg text-slate-700">{li?.props?.children}</span>
                                </li>
                            ))}
                        </ul>
                    );
                }

                // Índice do cluster (h3 + lista longa de links): 6 temas à vista, o resto recolhido.
                // Todos os links continuam no HTML (Google segue normalmente).
                if (child.type === 'div') {
                    const kids = React.Children.toArray(child.props.children);
                    const h3 = kids.find((k) => k?.type === 'h3');
                    const ul = kids.find((k) => k?.type === 'ul');
                    const lis = ul ? React.Children.toArray(ul.props.children).filter(Boolean) : [];
                    if (h3 && lis.length > 8) {
                        const title = React.Children.toArray(h3.props.children).map((t) => (typeof t === 'string' ? t.replace(/^📚\s*/, '') : t));
                        const item = (li, i) => <li key={i} className="[&_a]:text-slate-800 [&_a]:no-underline hover:[&_a]:text-primary">{li.props.children}</li>;
                        return (
                            <nav aria-label={typeof title[0] === 'string' ? title.join('') : 'Neste guia'} className="rounded-2xl bg-[#f6f9f8] p-6">
                                <p className="mb-3 text-lg font-bold text-slate-900">{title}</p>
                                <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">{lis.slice(0, 6).map(item)}</ul>
                                <details className="group mt-3">
                                    <summary className="cursor-pointer list-none font-semibold text-primary [&::-webkit-details-marker]:hidden">
                                        <span className="group-open:hidden">Ver os {lis.length} temas</span>
                                        <span className="hidden group-open:inline">Mostrar menos</span>
                                    </summary>
                                    <ul className="mt-2 grid gap-x-8 gap-y-2 sm:grid-cols-2">{lis.slice(6).map(item)}</ul>
                                </details>
                            </nav>
                        );
                    }
                }

                // Manter outros elementos sem alteração
                return child;
            })}
        </div>
    );

    return (
        <Layout>
                <SEO
                    title={article.title}
                    description={article.excerpt}
                    keywords={`${article.category}, desenvolvimento infantil, ${article.title.toLowerCase()}`}
                    image={article.image}
                    url={`/artigos/${article.slug}`}
                    type="article"
                    schema={[
                        schemaArticle(
                            article.title,
                            article.excerpt,
                            article.image,
                            `https://www.clinicafonoinova.com.br/artigos/${article.slug}`,
                            article.dateISO || article.date,
                            article.author,
                            article.authorRole,
                            article.authorCredentials,
                            article.dateModifiedISO || article.dateISO || article.date
                        ),
                        ...(article.faq && article.faq.length > 0 ? [schemaFAQArticle(article.faq)] : []),
                        schemaBreadcrumbList([
                            { name: 'Home', url: 'https://www.clinicafonoinova.com.br/' },
                            { name: 'Artigos', url: 'https://www.clinicafonoinova.com.br/artigos' },
                            { name: article.title, url: `https://www.clinicafonoinova.com.br/artigos/${article.slug}` }
                        ])
                    ]}
                />

            <header className="bg-white pt-20 lg:pt-[72px]">
                <div className="mx-auto flex max-w-4xl flex-col gap-5 px-4 pt-6">
                    <nav aria-label="breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-slate-600">
                        <Link to="/" className="hover:text-primary">Início</Link>
                        <ChevronRight className="h-4 w-4 text-slate-400" aria-hidden="true" />
                        <Link to="/artigos" className="hover:text-primary">Artigos</Link>
                        <ChevronRight className="h-4 w-4 text-slate-400" aria-hidden="true" />
                        <span className="text-slate-900">{article.title}</span>
                    </nav>
                    <span className="fi-rise self-start rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">{article.category}</span>
                    <h1 className="text-[2.1rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-slate-900 sm:text-5xl">{article.title}</h1>
                    <p className="fi-rise fi-rise-1 text-xl leading-relaxed text-slate-700">{article.excerpt}</p>
                    <div className="fi-rise fi-rise-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600">
                        <span className="inline-flex items-center gap-1.5"><User className="h-4 w-4" aria-hidden="true" /><b className="text-slate-900">{article.author}</b>{article.authorRole ? ` · ${article.authorRole}` : ''}</span>
                        <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" aria-hidden="true" />{article.date}</span>
                        <span className="inline-flex items-center gap-1.5"><Share2 className="h-4 w-4" aria-hidden="true" />5 min de leitura</span>
                    </div>
                </div>
                <div className="mx-auto max-w-6xl px-4 pt-8">
                    <div className="overflow-hidden rounded-3xl">
                        <img
                            src={article.image}
                            alt={article.imageAlt || `${article.title} - Clínica Fono Inova em Anápolis`}
                            className="fi-zoom h-64 w-full object-cover sm:h-96 lg:h-[460px]"
                            width="1200"
                            height="700"
                            loading="eager"
                            fetchpriority="high"
                        />
                    </div>
                </div>
            </header>

            <div className="bg-white">
                <div className="mx-auto flex max-w-6xl flex-wrap items-start gap-12 px-4 pb-16 pt-10">
                    <article className="min-w-0 max-w-3xl flex-[999_1_560px]">
                        {styledContent}

                        {/* Destaque de citação */}
                        <blockquote className="my-10 rounded-2xl bg-[#f6f9f8] p-6 text-lg italic text-slate-800">
                            "Cada criança tem seu próprio ritmo de desenvolvimento. Com as estratégias certas, podemos potencializar seu crescimento."
                        </blockquote>

                        {/* INTERLINKING: Landing Pages relacionadas */}
                        {articleInterlinks[article.slug] && (
                            <>
                                <RelatedLandingPages links={articleInterlinks[article.slug].landingPages} />
                                <CTABox {...articleInterlinks[article.slug].cta} />
                            </>
                        )}

                        {/* Compartilhamento */}
                        <div className="mt-10 border-t border-slate-200 pt-8">
                            <h2 className="mb-5 text-lg font-bold text-slate-900">Compartilhe este artigo</h2>
                            <div className="flex gap-3">
                                <a href={`https://wa.me/?text=${encodeURIComponent(`${article.title} https://www.clinicafonoinova.com.br/artigos/${article.slug}`)}`} target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-green-700 text-white transition-transform motion-safe:hover:-translate-y-0.5" aria-label="Compartilhar no WhatsApp"><MessageCircle className="h-5 w-5" /></a>
                                <a href="https://www.instagram.com/clinicafonoinova" target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-600 text-white transition-transform motion-safe:hover:-translate-y-0.5" aria-label="Siga-nos no Instagram"><Instagram className="h-5 w-5" /></a>
                                <a href="https://www.facebook.com/people/Cl%C3%ADnica-Fono-Inova/61575031024483/" target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-700 text-white transition-transform motion-safe:hover:-translate-y-0.5" aria-label="Curta nossa página no Facebook"><Facebook className="h-5 w-5" /></a>
                                <a href="https://www.youtube.com/clinicafonoinova" target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-red-700 text-white transition-transform motion-safe:hover:-translate-y-0.5" aria-label="Inscreva-se no nosso YouTube"><Youtube className="h-5 w-5" /></a>
                            </div>
                        </div>
                    </article>

                    {/* Lateral: WhatsApp sempre à mão no computador */}
                    <aside className="min-w-0 flex-[1_1_280px] lg:sticky lg:top-28">
                        <div className="flex flex-col gap-3 rounded-2xl p-6 ring-1 ring-slate-200">
                            <p className="text-lg font-bold leading-snug text-slate-900">Avaliação na Clínica Fono Inova</p>
                            <p className="text-sm text-slate-600">Jundiaí, Anápolis · Seg a sex, 8h às 18h · <b className="text-slate-900">5,0</b> no Google</p>
                            <ButtonWhatsApp message={waArticleMsg} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-green-700 px-5 font-bold text-white transition-all hover:bg-green-800 motion-safe:hover:-translate-y-0.5">
                                <MessageCircle className="h-5 w-5" aria-hidden="true" /> Agendar pelo WhatsApp
                            </ButtonWhatsApp>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Artigos relacionados */}
            <section className="bg-[#f6f9f8] py-14">
                <div className="mx-auto max-w-6xl px-4">
                    <h2 className="mb-6 text-2xl font-extrabold text-slate-900">Artigos relacionados</h2>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        {articlesData
                            .filter(a => a.id !== article.id)
                            .slice(0, 2)
                            .map((relatedArticle, i) => (
                                <Reveal key={relatedArticle.id} delay={i * 80}>
                                    <Link
                                        to={`/artigos/${relatedArticle.slug}`}
                                        className="fi-lift block h-full rounded-2xl bg-white p-6 ring-1 ring-slate-200 hover:ring-primary"
                                    >
                                        <span className="text-xs font-bold text-primary">{relatedArticle.category}</span>
                                        <h3 className="mt-2 line-clamp-2 text-lg font-bold text-slate-900">{relatedArticle.title}</h3>
                                        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{relatedArticle.excerpt}</p>
                                        <p className="mt-4 text-xs text-slate-600">{relatedArticle.author.split(' ')[0]} · {relatedArticle.date}</p>
                                    </Link>
                                </Reveal>
                            ))}
                    </div>

                    {/* Newsletter */}
                    <div className="mt-10 rounded-2xl bg-white p-6 text-center ring-1 ring-slate-200">
                        <h2 className="mb-2 text-lg font-bold text-slate-900">Receba mais conteúdos como este</h2>
                        <p className="mx-auto mb-4 max-w-md text-sm text-slate-600">
                            Inscreva-se em nossa newsletter e receba artigos exclusivos sobre desenvolvimento infantil.
                        </p>
                        <div className="mx-auto flex max-w-md flex-col justify-center gap-2 sm:flex-row">
                            <input type="email" placeholder="Seu e-mail" aria-label="Seu e-mail" className="min-h-12 flex-grow rounded-xl border border-slate-300 px-4 focus:outline-none focus:ring-2 focus:ring-primary" />
                            <button type="button" className="min-h-12 rounded-xl bg-[#0f5c4b] px-6 font-semibold text-white hover:opacity-90">Inscrever</button>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default ArticlePage;