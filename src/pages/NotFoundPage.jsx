// Página exibida para qualquer endereço que o site não serve (rota coringa "*").
// O status HTTP 404 vem do middleware.js; o prerender-status-code cobre o serviço de prerender.
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function NotFoundPage() {
  return (
    <Layout>
      <Helmet>
        <title>Página não encontrada | Clínica Fono Inova</title>
        <meta name="robots" content="noindex, follow" />
        <meta name="prerender-status-code" content="404" />
      </Helmet>
      <main className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Página não encontrada</h1>
        <p className="mb-8">O endereço que você abriu não existe ou mudou de lugar.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/" className="underline font-semibold">Voltar ao início</Link>
          <Link to="/artigos" className="underline font-semibold">Ver artigos</Link>
        </div>
      </main>
    </Layout>
  );
}
