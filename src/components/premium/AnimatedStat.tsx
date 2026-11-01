import NumberFlow from '@number-flow/react';
import { useEffect, useRef, useState } from 'react';

// Número que rola até o valor quando entra na tela (NumberFlow). Sem JS ou com "reduzir movimento", mostra o valor final.
type Props = { value: number; prefix?: string; suffix?: string; decimals?: number; className?: string };

export default function AnimatedStat({ value, prefix = '', suffix = '', decimals = 0, className = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || navigator.webdriver) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // já visível: não reinicia
    setShown(0);
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        setShown(value);
        io.disconnect();
      }
    }, { rootMargin: '0px 0px -15% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${value.toLocaleString('pt-BR', { minimumFractionDigits: decimals })}${suffix}`}>
      <NumberFlow
        value={shown}
        prefix={prefix}
        suffix={suffix}
        locales="pt-BR"
        format={{ minimumFractionDigits: decimals, maximumFractionDigits: decimals }}
        aria-hidden="true"
      />
    </span>
  );
}
