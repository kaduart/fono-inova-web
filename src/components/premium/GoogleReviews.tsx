import { Star } from 'lucide-react';

// Avaliações reais copiadas do perfil da clínica no Google (texto original, sem edição).
// Para atualizar: adicione novas avaliações no array. Nome abreviado (primeiro nome + inicial).
export const GOOGLE_REVIEWS_URL = 'https://www.google.com/maps?cid=4885146379272428062';

const REVIEWS = [
  { name: 'João P.', text: 'Muito ótimo, super indico!!! 100% confiável e confortável é uma excelente clínica, com profissionais capazes e responsáveis pelo seu trabalho!' },
  { name: 'Joyce Z.', text: 'Está sendo boa estamos no começo mas são bem atenciosos cuidadosos com meu filho espero melhoras na fala e leitura desde já agradeço pela atenção' },
  { name: 'Daniela M.', text: 'Levei minha sobrinha para fazer o teste da linguinha com a Dra Lorrayne há um tempo atrás, agora ela precisou de fonoaudióloga e retornei, fiquei impressionada com qualidade do atendimento desde as meninas da recepção à Doutora, todas são muito atenciosas.' },
  { name: 'Agda S.', text: 'Experiência maravilhosa, ambiente acolhedor e meu filho se sente super a vontade com as profissionais de terapia' },
  { name: 'Tiago A.', text: 'Eu amo o atendimento, a tia Lorrayne é uma princesa usada por Deus para ajudar nossos filhos! Que Deus abençoe cada dia mais!' },
  { name: 'Matheus R.', text: 'Ótimo atendimento, a fonoaudióloga Lorraine nos atendeu super bem e foi super atenciosa. A clínica é excelente e muito bem organizada, desde a recepcionista aos cuidados com o espaço para o atendimento.' },
  { name: 'Mira', text: 'Muito bem organizado o espaço, bem limpinho ótimos profissionais, super indico!' },
  { name: 'Daniela A.', text: 'Profissionais maravilhosos e de um coração gigante, principalmente a Tia Tatiane meu filho adora as seções com ela.' },
  { name: 'Rodrigo P.', text: 'Levei meu sobrinho, um ambiente muito acolhedor! Super indico!!!' },
  { name: 'Cris A.', text: 'Ótimas pessoas. Lugar acolhedor. A fono Lorrany e muito cuidadosa.' },
  { name: 'Wanderson S.', text: 'Bom atendimento! Profissionais bem capacitados. Minha filha amo o atendimento' },
  { name: 'Lucivando C.', text: 'Ótimos profissionais, ambiente maravilhoso' },
  { name: 'Fabby R.', text: 'Levei minha filha, e gostei muito do atendimento. Super indico!' },
  { name: 'Giovana S.', text: 'Funcionárias eficientes e educadas. Não tenho o q reclamar.' },
  { name: 'Adelson P.', text: 'Levei meu filho lá, ótimo atendimento indico a todos!!! Parabéns' },
  { name: 'Nilson L.', text: 'Atendimento atencioso e de qualidade, recomendo' },
  { name: 'Alessandro F.', text: 'Excelente atendimento ótimos super limpo indico top top top' },
  { name: 'Renan S.', text: 'A clínica é ótima e tem um perfeito atendimento, nota 10' },
  { name: 'Bruno N.', text: 'A clínica tem um excelente atendimento, são ótimos profissionais!! Meus parabéns' },
  { name: 'Dario M.', text: 'Recomendo, ótimo atendimento, super educados, parabéns' },
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
