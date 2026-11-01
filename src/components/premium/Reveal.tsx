import { useEffect, useRef, useState, type ReactNode } from 'react';

// Entrada suave ao rolar. O conteúdo nasce visível: só esconde (e depois revela) o que está abaixo da dobra,
// e nunca anima com "reduzir movimento" ativo.
export default function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    // Prerender (navegador automatizado) grava o HTML com tudo visível
    if (navigator.webdriver) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    setHidden(true);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setHidden(false);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${hidden ? 'translate-y-6 opacity-0' : 'translate-y-0 opacity-100'} ${className}`}
    >
      {children}
    </div>
  );
}
