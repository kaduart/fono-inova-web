import { useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { AlertCircle, Check, MessageCircle } from 'lucide-react';
import { trackButtonClick } from '../../hooks/useAnalytics';
import { buildWhatsAppRefSignature } from '../../hooks/useLeadTracking';

type Props = {
  items: string[];
  title?: string;
  className?: string;
  /** Tema citado na mensagem do WhatsApp. Sem ele, usa o H1 da página. */
  topic?: string;
};

// Sinais de alerta clicáveis: a família marca o que reconhece e a conversa no WhatsApp já chega com a lista.
// Os textos continuam todos no HTML (SEO igual); só passaram a ser botões de marcar.
export default function AlertSigns({ items, title = 'Sinais de alerta', className = '', topic }: Props) {
  const [marked, setMarked] = useState<string[]>([]);
  const [boxRef] = useAutoAnimate({ duration: 220 });

  const toggle = (item: string) => {
    setMarked((prev) => (prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]));
    try { trackButtonClick?.('AlertSigns_marcar'); } catch { /* sem analytics */ }
  };

  const send = () => {
    try { trackButtonClick?.('AlertSigns_enviar'); } catch { /* sem analytics */ }
    const tema = topic || document.querySelector('h1')?.textContent?.trim() || 'desenvolvimento infantil';
    const lista = marked.map((m) => `• ${m}`).join('\n');
    const msg = `Oi! Vi a página "${tema}" no site da Fono Inova e marquei o que acontece com meu filho:\n${lista}\n\nPode me explicar como funciona a avaliação?`;
    window.open(`https://wa.me/5562992013573?text=${encodeURIComponent(msg + buildWhatsAppRefSignature())}`, '_blank');
  };

  return (
    <div className={`rounded-2xl bg-white p-5 text-left ring-1 ring-slate-200 shadow-[0_10px_30px_-20px_rgba(15,64,55,0.4)] ${className}`}>
      <div className="mb-1 flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
          <AlertCircle className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="text-base font-bold text-slate-900">{title}</p>
      </div>
      <p className="mb-3 text-sm text-slate-500">Toque no que você reconhece no seu filho.</p>
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
                className={`flex min-h-12 w-full items-start gap-2.5 rounded-xl p-3 text-left text-[15px] leading-snug transition-colors ${
                  on ? 'bg-primary/5 text-slate-900 ring-2 ring-primary' : 'bg-[#f6f9f8] text-slate-700 ring-1 ring-slate-200 hover:ring-primary'
                }`}
              >
                <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 ${on ? 'border-primary bg-primary text-white' : 'border-slate-300 bg-white text-transparent'}`}>
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span>{item}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <div ref={boxRef}>
        {marked.length > 0 && (
          <div className="mt-3 flex flex-col gap-3 rounded-xl bg-[#0f5c4b] p-4 text-white sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-snug">
              <b className="block text-base">Você marcou {marked.length} {marked.length === 1 ? 'sinal' : 'sinais'}.</b>
              A conversa já começa com o que você marcou.
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
      <p className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
        Reconhecer um desses sinais não é diagnóstico — é um bom motivo para conversar com a equipe.
      </p>
    </div>
  );
}
