import { useEffect, useState } from 'react';

// Status honesto do atendimento, pelo horário de Brasília: seg a sex, 8h às 18h.
// Dentro do horário: "respondendo agora". Fora: diz quando a equipe volta.
function statusNow() {
  const parts = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo', weekday: 'short', hour: 'numeric', hour12: false,
  }).formatToParts(new Date());
  const wd = parts.find((p) => p.type === 'weekday')?.value?.replace('.', '').toLowerCase() || '';
  const h = Number(parts.find((p) => p.type === 'hour')?.value);
  const weekday = !['sáb', 'sab', 'dom'].includes(wd);
  if (weekday && h >= 8 && h < 18) return { open: true, text: 'Equipe respondendo agora no WhatsApp' };
  const backTomorrow = weekday ? h >= 18 && wd !== 'sex' : false;
  const when = weekday && h < 8 ? 'hoje a partir das 8h' : backTomorrow ? 'amanhã a partir das 8h' : 'segunda a partir das 8h';
  return { open: false, text: `Deixe sua mensagem: a equipe responde ${when}` };
}

export default function TeamStatus({ className = '' }) {
  const [st, setSt] = useState(null);
  useEffect(() => { setSt(statusNow()); }, []);
  if (!st) return null; // só no navegador (o HTML pré-gerado não fixa um horário)
  return (
    <span className={`inline-flex items-center gap-2 text-sm font-medium text-slate-700 ${className}`}>
      <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
        {st.open && <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60 motion-safe:animate-ping" />}
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${st.open ? 'bg-green-600' : 'bg-amber-500'}`} />
      </span>
      {st.text}
    </span>
  );
}
