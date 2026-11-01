import { Clock, MapPin, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import ButtonWhatsApp from '../ui/ButtonWhatsapp.jsx';
import Reveal from './Reveal';
import { RELATED } from './relatedCatalog';

const MAPS_URL = 'https://www.google.com/maps/dir/?api=1&destination=Cl%C3%ADnica+Fono+Inova+Av.+Minas+Gerais+405+Jundia%C3%AD+An%C3%A1polis+GO';

// "Veja também" (links internos) + "Onde estamos". Só dados confirmados: endereço, horário e WhatsApp oficial.
export default function PageFooterInfo({
  related,
  whatsappMessage = 'Olá! Vi o site da Fono Inova e gostaria de entender como funciona o atendimento.',
  showLocation = true,
}: {
  related: string[];
  whatsappMessage?: string;
  showLocation?: boolean;
}) {
  const items = related.filter((r) => RELATED[r]);
  return (
    <>
      {items.length > 0 && (
        <Reveal>
          <section className="bg-white py-14 md:py-20" aria-labelledby="veja-tambem-titulo">
            <div className="container mx-auto max-w-5xl px-4 lg:px-8">
              <h2 id="veja-tambem-titulo" className="mb-8 text-3xl font-bold font-poppins text-slate-900">Veja também</h2>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((r) => (
                  <li key={r}>
                    <Link to={r} className="block h-full rounded-2xl border border-slate-200 p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
                      <span className="block font-semibold text-slate-900">{RELATED[r].title}</span>
                      <span className="mt-1 block text-sm text-slate-600">{RELATED[r].desc}</span>
                      <span className="mt-3 block text-sm font-semibold text-primary">Saiba mais →</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>
      )}
      {showLocation && (
      <Reveal>
        <section className="bg-slate-50 py-14 md:py-20" aria-labelledby="onde-estamos-titulo">
          <div className="container mx-auto max-w-5xl px-4 lg:px-8">
            <h2 id="onde-estamos-titulo" className="mb-8 text-3xl font-bold font-poppins text-slate-900">Onde estamos</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex gap-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <MapPin className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-slate-900">Clínica Fono Inova</p>
                  <p className="text-slate-600">Av. Minas Gerais, 405, Jundiaí, Anápolis-GO</p>
                  <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-primary hover:underline">Como chegar →</a>
                </div>
              </div>
              <div className="flex gap-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <Clock className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-slate-900">Horário de atendimento</p>
                  <p className="text-slate-600">Segunda a sexta, das 8h às 18h</p>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <p className="text-slate-700">Quer conversar antes de agendar? Nossa equipe responde pelo WhatsApp.</p>
                <ButtonWhatsApp
                  message={whatsappMessage}
                  className="w-full justify-center rounded-xl bg-green-600 px-6 py-3 font-bold text-white shadow-lg transition-all hover:bg-green-700"
                >
                  <MessageCircle className="h-5 w-5" />
                  Falar no WhatsApp
                </ButtonWhatsApp>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
      )}
    </>
  );
}
