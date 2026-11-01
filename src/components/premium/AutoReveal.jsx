import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Movimento padrão em todas as páginas, sem mexer em cada uma:
// cada seção (menos a primeira, que é o topo) e cada card dentro de grids sobe suave ao entrar na tela.
// Não roda no pré-render (navigator.webdriver) nem para quem pediu menos movimento,
// então o HTML que o Google lê continua com tudo visível.
export default function AutoReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined' || navigator.webdriver) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (!('IntersectionObserver' in window)) return undefined;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('fi-in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    // espera a página (lazy) montar
    const t = setTimeout(() => {
      const vh = window.innerHeight;
      const sections = Array.from(document.querySelectorAll('main section')).slice(1);
      const cards = Array.from(document.querySelectorAll('main section .grid > *'));
      [...sections, ...cards].forEach((el) => {
        if (el.classList.contains('fi-reveal')) return;
        if (el.closest('[data-reveal]') || el.querySelector('[data-reveal]')) return; // já tem animação própria
        if (el.getBoundingClientRect().top < vh * 0.9) return; // já visível: não esconde
        el.classList.add('fi-reveal');
        if (el.parentElement?.classList.contains('grid')) {
          const i = Array.prototype.indexOf.call(el.parentElement.children, el) % 4;
          el.style.transitionDelay = `${i * 70}ms`;
        }
        io.observe(el);
      });
    }, 120);

    return () => { clearTimeout(t); io.disconnect(); };
  }, [pathname]);

  return null;
}
