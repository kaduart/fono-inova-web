import { HeartHandshake, MessageCircle } from 'lucide-react';
import ButtonWhatsApp from '../ui/ButtonWhatsapp.jsx';
import Reveal from './Reveal';

// "Situações que você reconhece": ajuda a família a se identificar. Não é diagnóstico.
export default function SituationsSection({
  title = 'Você reconhece alguma dessas situações?',
  intro = 'Estas situações costumam levar as famílias a procurar orientação. Elas não fecham diagnóstico: só uma avaliação individual esclarece cada caso.',
  items,
  whatsappMessage = 'Olá! Reconheci algumas dessas situações e gostaria de orientação sobre o atendimento.',
}: {
  title?: string;
  intro?: string;
  items: string[];
  whatsappMessage?: string;
}) {
  return (
    <Reveal>
      <section className="bg-slate-50 py-14 md:py-20" aria-labelledby="situacoes-titulo">
        <div className="container mx-auto max-w-5xl px-4 lg:px-8">
          <h2 id="situacoes-titulo" className="mb-3 text-3xl font-bold font-poppins text-slate-900 md:text-4xl">{title}</h2>
          <p className="mb-8 max-w-2xl text-slate-600">{intro}</p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {items.map((item) => (
              <li key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <HeartHandshake className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="self-center text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col items-start gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-medium text-slate-800">Reconheceu alguma situação? Conte para a nossa equipe, sem compromisso.</p>
            <ButtonWhatsApp
              message={whatsappMessage}
              className="w-full shrink-0 justify-center rounded-xl bg-green-700 px-6 py-3 font-bold text-white shadow-lg transition-all hover:bg-green-800 sm:w-auto"
            >
              <MessageCircle className="h-5 w-5" />
              Falar no WhatsApp
            </ButtonWhatsApp>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
