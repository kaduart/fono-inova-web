import { Star } from 'lucide-react';

// Avaliações reais copiadas do perfil da clínica no Google (texto original, sem edição).
// Para atualizar: adicione novas avaliações no array. Nome abreviado (primeiro nome + inicial).
export const GOOGLE_REVIEWS_URL = 'https://www.google.com/maps?cid=4885146379272428062';

const REVIEWS = [
  { name: 'Joyce Z.', text: 'Está sendo boa estamos no começo mas são bem atenciosos cuidadosos com meu filho espero melhoras na fala e leitura desde já agradeço pela atenção' },
  { name: 'Tiago A.', text: 'Eu amo o atendimento, a tia Lorrayne é uma princesa usada por Deus para ajudar nossos filhos! Que Deus abençoe cada dia mais!' },
  { name: 'Daniela A.', text: 'Profissionais maravilhosos e de um coração gigante, principalmente a Tia Tatiane meu filho adora as seções com ela.' },
  { name: 'Wanderson S.', text: 'Bom atendimento! Profissionais bem capacitados. Minha filha amo o atendimento' },
  { name: 'Fabby R.', text: 'Levei minha filha, e gostei muito do atendimento. Super indico!' },
  { name: 'Adelson P.', text: 'Levei meu filho lá, ótimo atendimento indico a todos!!! Parabéns' },
  { name: 'Alessandro F.', text: 'Excelente atendimento ótimos super limpo indico top top top' },
];

type Props = {
  count?: number;
  offset?: number;
  className?: string;
  title?: string;
};

export default function GoogleReviews({ count = 3, offset = 0, className = '', title = 'O que as famílias dizem no Google' }: Props) {
  const items = Array.from({ length: count }, (_, i) => REVIEWS[(offset + i) % REVIEWS.length]);
  return (
    <div className={className}>
      {title && (
        <p className="mb-6 text-center text-sm font-semibold uppercase tracking-wider text-slate-500">{title}</p>
      )}
      <div className="grid gap-5 md:grid-cols-3 max-w-6xl mx-auto">
        {items.map((r) => (
          <figure key={r.name} className="flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-lg">
            <div className="mb-3 flex gap-1" aria-label="5 de 5 estrelas">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
              ))}
            </div>
            <blockquote className="flex-1 text-base leading-relaxed text-slate-700">“{r.text}”</blockquote>
            <figcaption className="mt-4 border-t border-slate-100 pt-3 text-sm font-semibold text-slate-900">
              {r.name} <span className="font-normal text-slate-500">· avaliação no Google</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-slate-600">
        <strong className="text-slate-900">5,0</strong> de nota no Google ·{' '}
        <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">
          ver todas as avaliações
        </a>
      </p>
    </div>
  );
}
