import { Clock, MapPin, Star, Users } from 'lucide-react';
import TeamStatus from '../lp/TeamStatus';

// Barra de prova: só dados confirmados pela clínica (nota 5,0 no Google, +500 famílias, horário e endereço).
const items = [
  { icon: Star, strong: '5,0 no Google', small: 'avaliação das famílias' },
  { icon: Users, strong: '+500 famílias', small: 'atendidas' },
  { icon: Clock, strong: 'Seg a sex', small: 'das 8h às 18h' },
  { icon: MapPin, strong: 'Jundiaí, Anápolis', small: 'Av. Minas Gerais, 405' },
];

export default function ProofBar({ className = '', status = true }: { className?: string; status?: boolean }) {
  return (
    <section aria-label="Informações da clínica" className={`relative z-10 ${className}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl bg-slate-200 shadow-lg ring-1 ring-slate-200">
          {items.map(({ icon: Icon, strong, small }) => (
            <li key={strong} className="flex items-center gap-3 bg-white px-4 py-4 md:px-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block text-sm font-bold text-slate-900 md:text-base">{strong}</span>
                <span className="block text-xs text-slate-500 md:text-sm">{small}</span>
              </span>
            </li>
          ))}
        </ul>
        {/* Status do atendimento agora (só no navegador): reforça que alguém responde no WhatsApp */}
        {status && (
          <div className="mt-3 flex justify-center">
            <TeamStatus />
          </div>
        )}
      </div>
    </section>
  );
}
