import { AlertCircle } from 'lucide-react';

type Props = {
  items: string[];
  title?: string;
  className?: string;
};

// Bloco "Sinais de alerta" — destaque visual para a identificação rápida (sem tom de diagnóstico).
export default function AlertSigns({ items, title = 'Sinais de alerta', className = '' }: Props) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-amber-200/70 bg-gradient-to-br from-amber-50 via-white to-rose-50/60 p-5 pl-6 text-left shadow-md ${className}`}>
      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-amber-400 to-rose-400" />
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 ring-4 ring-amber-50">
          <AlertCircle className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="text-base font-bold text-slate-900">{title}</p>
      </div>
      <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[15px] leading-snug text-slate-700">
            <span aria-hidden="true" className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-amber-500 ring-2 ring-amber-200" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 border-t border-amber-100 pt-3 text-xs text-slate-500">
        Reconhecer um desses sinais não é diagnóstico — é um bom motivo para conversar com a equipe.
      </p>
    </div>
  );
}
