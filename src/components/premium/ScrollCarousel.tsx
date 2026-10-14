import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Children, useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

// Carrossel leve (CSS scroll-snap, sem biblioteca): arrasta no celular, setas e teclado no desktop.
// Todo o conteúdo fica no HTML (bom para SEO e leitores de tela). Sem autoplay.
type Props = {
  ariaLabel: string;
  children: ReactNode;
  /** largura de cada item; padrão: 82% no celular, 46% no tablet, 32% no desktop */
  itemClassName?: string;
  className?: string;
};

const DEFAULT_ITEM = 'w-[82%] sm:w-[46%] lg:w-[32%]';

export default function ScrollCarousel({ ariaLabel, children, itemClassName = DEFAULT_ITEM, className = '' }: Props) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const items = Children.toArray(children);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [update, items.length]);

  const scrollByPage = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: reduce ? 'auto' : 'smooth' });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); scrollByPage(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); scrollByPage(-1); }
  };

  const btn =
    'absolute top-1/2 -translate-y-1/2 z-10 hidden md:flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-800 shadow-lg ring-1 ring-slate-200 transition hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40';

  return (
    <div className={`relative ${className}`} role="region" aria-roledescription="carrossel" aria-label={ariaLabel}>
      <ul
        ref={trackRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3 -mx-4 px-4 lg:mx-0 lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 rounded-2xl motion-reduce:scroll-auto"
      >
        {items.map((child, i) => (
          <li key={i} className={`snap-start shrink-0 ${itemClassName}`} aria-roledescription="slide" aria-label={`${i + 1} de ${items.length}`}>
            {child}
          </li>
        ))}
      </ul>
      <button type="button" className={`${btn} -left-3 lg:-left-5`} onClick={() => scrollByPage(-1)} disabled={!canPrev} aria-label="Anterior">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button type="button" className={`${btn} -right-3 lg:-right-5`} onClick={() => scrollByPage(1)} disabled={!canNext} aria-label="Próximo">
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
