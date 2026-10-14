import { CheckCircle2, MessageCircle } from 'lucide-react';
import ButtonWhatsApp from '../ui/ButtonWhatsapp.jsx';
import Reveal from './Reveal';

// Bloco "atendimento diferenciado": foto real do espaço + pontos de valor, sem prometer prazo, preço ou resultado.
const PHOTOS = {
  terapia: { src: '/images/clinica/galeria/sala-de-terapia.webp', alt: 'Sala de terapia da Clínica Fono Inova com espelho, adesivos de animais e tapete de EVA' },
  movimento: { src: '/images/clinica/galeria/espaco-movimento.webp', alt: 'Espaço de movimento da Clínica Fono Inova com cama elástica, balanços e piso de grama sintética' },
  ludico: { src: '/images/clinica/galeria/consultorio-ludico.webp', alt: 'Sala de atendimento da Clínica Fono Inova com mural da floresta, mesa e tapete de EVA colorido' },
  piscina: { src: '/images/clinica/galeria/sala-piscina-bolinhas.webp', alt: 'Sala da Clínica Fono Inova com piscina de bolinhas, espaldar e bolas terapêuticas' },
  jogos: { src: '/images/clinica/galeria/jogos-terapeuticos.webp', alt: 'Estante com jogos e brinquedos usados nos atendimentos da Clínica Fono Inova' },
  kids: { src: '/images/clinica/galeria/espaco-kids.webp', alt: 'Espaço Kid’s da Clínica Fono Inova, com mesinha e cadeiras infantis' },
} as const;

type Props = {
  photo?: keyof typeof PHOTOS;
  reverse?: boolean;
  whatsappMessage?: string;
  title?: string;
};

const POINTS = [
  'Equipe multidisciplinar no mesmo endereço, conversando sobre a criança',
  'Plano terapêutico único, pensado para a necessidade de cada família',
  'Ambiente lúdico e acolhedor, para a criança se sentir à vontade',
  'Orientação para a família em cada etapa do atendimento',
];

export default function DifferentialSection({
  photo = 'terapia',
  reverse = false,
  title = 'Um atendimento pensado para a sua criança',
  whatsappMessage = 'Olá! Vi o site da Fono Inova e gostaria de entender como funciona o atendimento.',
}: Props) {
  const img = PHOTOS[photo];
  return (
    <Reveal>
      <section className="py-14 md:py-20 bg-white" aria-labelledby="diferencial-titulo">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className={reverse ? 'lg:order-2' : ''}>
              <img src={img.src} alt={img.alt} loading="lazy" decoding="async" className="h-72 w-full rounded-3xl object-cover shadow-xl sm:h-96 lg:h-[420px]" />
            </div>
            <div className={`space-y-6 ${reverse ? 'lg:order-1' : ''}`}>
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">Atendimento diferenciado</span>
              <h2 id="diferencial-titulo" className="text-3xl font-bold font-poppins leading-tight text-slate-900 md:text-4xl">{title}</h2>
              <ul className="space-y-3">
                {POINTS.map((p) => (
                  <li key={p} className="flex gap-3 text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
              <ButtonWhatsApp
                message={whatsappMessage}
                className="w-full justify-center rounded-xl bg-green-600 px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-green-700 hover:shadow-xl sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" />
                Tirar dúvidas pelo WhatsApp
              </ButtonWhatsApp>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
