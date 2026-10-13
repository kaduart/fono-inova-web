import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

// Galeria de fotos reais da clínica (arquivos em /public/images/clinica/galeria, WebP otimizado).
export const clinicPhotos = [
  { src: '/images/clinica/galeria/recepcao.webp', alt: 'Recepção da Clínica Fono Inova com parede verde, escada colorida ao fundo e sala de espera', caption: 'Recepção' },
  { src: '/images/clinica/galeria/escada-recepcao.webp', alt: 'Escada lúdica colorida ao lado do balcão de recepção com a logo da Clínica Fono Inova', caption: 'Escada lúdica' },
  { src: '/images/clinica/galeria/espaco-kids.webp', alt: 'Espaço Kid’s da clínica, com mesinha e cadeiras infantis', caption: 'Espaço Kid’s' },
  { src: '/images/clinica/galeria/consultorio.webp', alt: 'Consultório com mesa de atendimento e mural infantil de balão e animais', caption: 'Consultório' },
  { src: '/images/clinica/galeria/consultorio-ludico.webp', alt: 'Sala de atendimento com mural da floresta, mesa e tapete de EVA colorido', caption: 'Sala de atendimento' },
  { src: '/images/clinica/galeria/sala-de-terapia.webp', alt: 'Sala de terapia com espelho, adesivos de animais e tapete de EVA', caption: 'Sala de terapia' },
  { src: '/images/clinica/galeria/sala-piscina-bolinhas.webp', alt: 'Sala com piscina de bolinhas, espaldar e bolas terapêuticas', caption: 'Sala com piscina de bolinhas' },
  { src: '/images/clinica/galeria/espaco-movimento.webp', alt: 'Espaço de movimento com cama elástica, balanços e piso de grama sintética', caption: 'Espaço de movimento' },
  { src: '/images/clinica/galeria/jogos-terapeuticos.webp', alt: 'Estante com jogos e brinquedos usados nos atendimentos', caption: 'Jogos e brinquedos' },
];

type Props = { title?: string; subtitle?: string; photos?: typeof clinicPhotos };

export default function ClinicGallery({
  title = 'Conheça a clínica',
  subtitle = 'Um espaço pensado para acolher a criança e a família. Fotos reais da Clínica Fono Inova, em Anápolis.',
  photos = clinicPhotos,
}: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(null);
    lastFocus.current?.focus();
  }, []);
  const go = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, go]);

  return (
    <section className="py-14 md:py-20 bg-slate-50" aria-labelledby="galeria-titulo">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 id="galeria-titulo" className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 mb-3">{title}</h2>
        <p className="text-slate-600 max-w-2xl mb-8">{subtitle}</p>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {photos.map((p, i) => (
            <li key={p.src} className={i === 0 ? 'col-span-2 md:col-span-2 md:row-span-2' : ''}>
              <button
                type="button"
                onClick={(e) => {
                  lastFocus.current = e.currentTarget;
                  setOpen(i);
                }}
                className="group relative block w-full h-full overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
                aria-label={`Ampliar foto: ${p.caption}`}
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  decoding="async"
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${i === 0 ? 'h-64 md:h-full min-h-[16rem]' : 'h-40 sm:h-48 md:h-56'}`}
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 pb-2 pt-8 text-left text-sm font-medium text-white">
                  {p.caption}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={photos[open].caption}
          onClick={close}
        >
          <button ref={closeRef} type="button" onClick={close} className="absolute top-4 right-4 rounded-full bg-white/15 p-2 text-white hover:bg-white/25" aria-label="Fechar">
            <X className="w-6 h-6" />
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); go(-1); }} className="absolute left-2 md:left-6 rounded-full bg-white/15 p-2 text-white hover:bg-white/25" aria-label="Foto anterior">
            <ChevronLeft className="w-7 h-7" />
          </button>
          <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img src={photos[open].src} alt={photos[open].alt} className="max-h-[80vh] w-auto max-w-full rounded-xl object-contain" />
            <figcaption className="mt-3 text-center text-white/90">{photos[open].caption} · {open + 1}/{photos.length}</figcaption>
          </figure>
          <button type="button" onClick={(e) => { e.stopPropagation(); go(1); }} className="absolute right-2 md:right-6 rounded-full bg-white/15 p-2 text-white hover:bg-white/25" aria-label="Próxima foto">
            <ChevronRight className="w-7 h-7" />
          </button>
        </div>
      )}
    </section>
  );
}
