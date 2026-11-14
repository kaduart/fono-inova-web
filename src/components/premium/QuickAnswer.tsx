// Bloco "Resposta rápida": responde em 2–3 frases a pergunta principal da página e lista os fatos
// da clínica (onde, quando, convênio, como agendar). Fica visível para a família e é o trecho que
// a IA do Google (AI Overviews / AI Mode), o ChatGPT e o Perplexity conseguem citar sem reescrever.
// Regras: só fatos confirmados; nunca nome de profissional nem quantidade de profissionais.
import { CalendarCheck, Clock, Info, MapPin, ShieldCheck } from 'lucide-react';
import type { ReactNode } from 'react';

export const FATOS_CLINICA = {
  endereco: 'Av. Minas Gerais, 405, bairro Jundiaí, Anápolis-GO (CEP 75110-770)',
  horario: 'Segunda a sexta, das 8h às 19h, com hora marcada',
  agendamento: 'WhatsApp (62) 99201-3573',
};

type Fato = { label: string; value: ReactNode; icon?: 'local' | 'horario' | 'convenio' | 'agenda' | 'aviso' };

type QuickAnswerProps = {
  /** Pergunta que a página responde, como a família digitaria no Google. */
  question: string;
  /** Resposta direta em 2–3 frases. A primeira frase precisa se sustentar sozinha. */
  answer: ReactNode;
  /** Texto da linha de convênio (cada página diz o que vale para ela). */
  convenio: ReactNode;
  /** Fatos extras opcionais, mostrados depois dos fixos. */
  extra?: Fato[];
  className?: string;
};

const ICONS = { local: MapPin, horario: Clock, convenio: ShieldCheck, agenda: CalendarCheck, aviso: Info };

const QuickAnswer = ({ question, answer, convenio, extra = [], className = '' }: QuickAnswerProps) => {
  const fatos: Fato[] = [
    { label: 'Onde', value: FATOS_CLINICA.endereco, icon: 'local' },
    { label: 'Horário', value: FATOS_CLINICA.horario, icon: 'horario' },
    { label: 'Convênio', value: convenio, icon: 'convenio' },
    { label: 'Como agendar', value: FATOS_CLINICA.agendamento, icon: 'agenda' },
    ...extra,
  ];
  return (
    <section aria-labelledby="resposta-rapida" className={`py-10 bg-white ${className}`}>
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="rounded-2xl border border-slate-200 bg-[#f6f9f8] p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Resposta rápida</p>
          <h2 id="resposta-rapida" className="mt-1 text-2xl md:text-3xl font-bold font-poppins text-slate-900">
            {question}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-700">{answer}</p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            {fatos.map((f) => {
              const Icon = ICONS[f.icon ?? 'local'];
              return (
                <div key={f.label} className="flex gap-3">
                  <Icon className="mt-0.5 h-5 w-5 flex-none text-primary" aria-hidden="true" />
                  <div>
                    <dt className="text-sm font-semibold text-slate-900">{f.label}</dt>
                    <dd className="text-sm text-slate-600">{f.value}</dd>
                  </div>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default QuickAnswer;
