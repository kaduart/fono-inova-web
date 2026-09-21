import { ArrowRight, CheckCircle2, Info } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout/index.jsx';
import SEO from '../components/SEO.jsx';

const PLANOS_VALIDOS = ['GEAP', 'IPASGO', 'Bradesco Saúde'];

const InteresseConfirmado = () => {
  const [params] = useSearchParams();
  const plano = params.get('plano');
  const planoValido = plano && PLANOS_VALIDOS.includes(plano) ? plano : null;

  return (
    <Layout>
      <SEO
        title="Interesse registrado | Fono Inova"
        description="Seu interesse foi registrado. Entraremos em contato somente se o credenciamento for concluído e o seu produto estiver elegível."
        url="https://www.clinicafonoinova.com.br/lista-de-interesse-confirmada"
        type="website"
        noindex
      />

      <section className="relative overflow-hidden pt-28 pb-24 md:pt-36">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-teal-50/40 to-cyan-50/30" />
        <div className="absolute -top-20 -right-20 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-teal-200/30 to-cyan-200/20 blur-3xl opacity-70" />

        <div className="relative container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-slate-100 bg-white text-center shadow-xl">
            <img
              src="/images/convenios/interesse-confirmado-1600.webp"
              srcSet="/images/convenios/interesse-confirmado-800.webp 800w, /images/convenios/interesse-confirmado-1600.webp 1600w"
              sizes="(min-width: 768px) 672px, 100vw"
              alt="Mãe abraçando a filha sorridente em casa, em um ambiente acolhedor"
              width={1600}
              height={905}
              decoding="async"
              className="aspect-[16/9] w-full object-cover"
            />
            <div className="space-y-6 p-8 md:p-12">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-9 w-9 text-green-600" />
              </div>

              <h1 className="text-3xl font-bold leading-tight text-slate-900 font-poppins md:text-4xl">
                Seu interesse foi registrado!
              </h1>

              <p className="text-lg leading-relaxed text-slate-600">
                {planoValido ? (
                  <>
                    Registramos seu interesse no convênio <strong className="text-slate-900">{planoValido}</strong>.
                  </>
                ) : (
                  <>Registramos o seu interesse.</>
                )}{' '}
                O credenciamento ainda está em andamento: entraremos em contato somente se ele for concluído e o seu
                produto estiver elegível para atendimento na Fono Inova.
              </p>

              <p className="flex items-start justify-center gap-2 text-left text-sm text-slate-500 sm:text-center">
                <Info className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  O cadastro não garante cobertura, vaga ou atendimento pelo plano. Para corrigir ou excluir seus dados,
                  fale com a clínica pelo WhatsApp (62) 99201-3573.
                </span>
              </p>

              <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-all hover:bg-primary/90"
                >
                  Voltar ao site
                </Link>
                <Link
                  to="/#services"
                  className="inline-flex items-center justify-center gap-1 rounded-xl border-2 border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-all hover:bg-slate-50"
                >
                  Conheça nossas especialidades
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default InteresseConfirmado;
