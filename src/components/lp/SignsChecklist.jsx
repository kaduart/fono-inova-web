import { useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Check, MessageCircle } from 'lucide-react';
import { trackLandingPageLead } from '../../services/landingPageAnalytics';
import { buildWhatsAppRefSignature } from '../../hooks/useLeadTracking';

// A mãe marca o que reconhece no filho e a conversa no WhatsApp já chega com essa lista.
// Conversão por dor: a equipe responde sobre o caso, não sobre "quero saber mais".
export default function SignsChecklist({ items = [], lpSlug, lpCategory, topic }) {
  const [marked, setMarked] = useState([]);
  const [boxRef] = useAutoAnimate({ duration: 220 });

  const toggle = (item) => {
    setMarked((prev) => {
      const on = prev.includes(item);
      if (!on) trackLandingPageLead(lpSlug, lpCategory, { source: 'identification_item', item });
      return on ? prev.filter((x) => x !== item) : [...prev, item];
    });
  };

  const send = () => {
    trackLandingPageLead(lpSlug, lpCategory, { source: 'identification_send', count: marked.length });
    const lista = marked.map((m) => `• ${m}`).join('\n');
    const msg = marked.length
      ? `Oi! Vi a página sobre ${topic} no site da Fono Inova e marquei o que acontece com meu filho:\n${lista}\n\nPode me explicar como funciona a avaliação?`
      : `Oi! Vi a página sobre ${topic} no site da Fono Inova e queria entender como funciona a avaliação.`;
    window.open(`https://wa.me/5562992013573?text=${encodeURIComponent(msg + buildWhatsAppRefSignature())}`, '_blank');
  };

  return (
    <div className="flex flex-col gap-4">
      <ul className="grid gap-2 sm:grid-cols-2">
        {items.map((item) => {
          const on = marked.includes(item);
          return (
            <li key={item}>
              <button
                type="button"
                role="checkbox"
                aria-checked={on}
                onClick={() => toggle(item)}
                className={`fi-lift flex min-h-14 w-full items-start gap-3 rounded-2xl p-4 text-left transition-colors ${
                  on ? 'bg-primary/5 text-slate-900 ring-2 ring-primary' : 'bg-white text-slate-800 ring-1 ring-slate-200 hover:ring-primary'
                }`}
              >
                <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${on ? 'border-primary bg-primary text-white' : 'border-slate-300 bg-white text-transparent'}`}>
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
                <span>{item}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <div ref={boxRef}>
        {marked.length > 0 && (
          <div className="flex flex-col gap-3 rounded-2xl bg-[#0f5c4b] p-5 text-white sm:flex-row sm:items-center sm:justify-between">
            <p className="leading-snug">
              <b className="block text-lg">Você marcou {marked.length} {marked.length === 1 ? 'sinal' : 'sinais'}.</b>
              <span className="text-emerald-50/90">Envie para a equipe: a conversa já começa com o que você marcou.</span>
            </p>
            <button
              type="button"
              onClick={send}
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 font-bold text-[#0f5c4b] transition-transform motion-safe:hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" /> Enviar no WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
