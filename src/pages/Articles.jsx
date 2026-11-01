// pages/Articles.jsx
import { useMemo, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Search } from 'lucide-react';
import Layout from '../components/Layout';
import ArticleCard from '../components/ArticleCard';
import SEO from '../components/SEO';
import { articlesData } from '../data/articlesData';

// Tira acento e caixa para a busca achar "fala" em "Fala" e "autismo" em "Autismo"
const norm = (t = '') => t.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

const Articles = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todos');
  const [gridRef] = useAutoAnimate({ duration: 250 });

  // Temas com contagem, do maior para o menor
  const categories = useMemo(() => {
    const counts = articlesData.reduce((acc, a) => ({ ...acc, [a.category]: (acc[a.category] || 0) + 1 }), {});
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, []);

  const visible = useMemo(() => {
    const q = norm(query.trim());
    return articlesData.filter((a) =>
      (category === 'Todos' || a.category === category) &&
      (!q || norm(`${a.title} ${a.excerpt} ${a.category}`).includes(q)),
    );
  }, [query, category]);

  const chip = (active) =>
    `min-h-10 rounded-full px-4 text-sm font-semibold transition-colors ${active ? 'bg-[#0f5c4b] text-white' : 'bg-white text-slate-800 ring-1 ring-slate-300 hover:ring-primary'}`;

  return (
    <Layout>
      <SEO
        title="Artigos sobre Desenvolvimento Infantil"
        description="Confira nossos conteúdos exclusivos sobre fonoaudiologia, psicologia e terapias infantis em Anápolis."
        keywords="artigos fonoaudiologia, desenvolvimento infantil, blog clinica fono inova, dicas pais anapolis"
        url="/artigos"
      />
      <section className="border-b border-slate-200 bg-white pt-20 lg:pt-[72px]">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 pb-8 pt-10">
          <h1 className="text-[2.1rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-slate-900 sm:text-5xl">
            Artigos sobre Desenvolvimento Infantil
          </h1>
          <p className="fi-rise max-w-2xl text-lg text-slate-600">
            Confira nossos conteúdos exclusivos sobre terapias e desenvolvimento infantil.
          </p>
          <label className="fi-rise fi-rise-1 flex min-h-12 max-w-xl items-center gap-3 rounded-2xl bg-[#f6f9f8] px-4 ring-1 ring-slate-300 focus-within:ring-2 focus-within:ring-primary">
            <Search className="h-5 w-5 text-slate-500" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar: fala tardia, autismo, TDAH…"
              aria-label="Buscar artigos"
              className="w-full bg-transparent py-3 text-slate-900 outline-none"
            />
          </label>
          <div className="fi-rise fi-rise-2 flex flex-wrap gap-2" role="group" aria-label="Filtrar por tema">
            <button type="button" aria-pressed={category === 'Todos'} className={chip(category === 'Todos')} onClick={() => setCategory('Todos')}>
              Todos · {articlesData.length}
            </button>
            {categories.map(([name, count]) => (
              <button key={name} type="button" aria-pressed={category === name} className={chip(category === name)} onClick={() => setCategory(name)}>
                {name} · {count}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6f9f8] py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-4">
          <p className="mb-5 text-sm text-slate-600" aria-live="polite">
            {visible.length === articlesData.length ? `${visible.length} artigos` : `${visible.length} de ${articlesData.length} artigos`}
          </p>
          <div ref={gridRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((article) => (
              <div key={article.id} className="h-full">
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
          {visible.length === 0 && (
            <div className="rounded-2xl bg-white p-8 text-center ring-1 ring-slate-200">
              <p className="font-semibold text-slate-900">Nenhum artigo com esse termo.</p>
              <button type="button" className="mt-3 font-semibold text-primary hover:underline" onClick={() => { setQuery(''); setCategory('Todos'); }}>
                Limpar busca
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Articles;
