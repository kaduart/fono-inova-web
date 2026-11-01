type TextSegment = {
  text: string;
  className?: string;
};

type TypewriterTextProps = {
  text?: string;
  segments?: TextSegment[];
  /** Mantidos por compatibilidade com as páginas; não têm mais efeito. */
  typingSpeed?: number;
  startDelay?: number;
  cursorClassName?: string;
  /** true (padrão): o título sobe suave ao abrir. false: aparece parado. */
  animate?: boolean;
};

// Antes o título era "digitado" letra a letra (1s de espera + ~1,5s digitando), o que atrasava o
// maior elemento da tela (LCP) e escondia a dor da família nos primeiros segundos.
// Agora o texto completo já vem no HTML e só entra com um movimento curto (respeita reduced-motion).
const TypewriterText = ({ text, segments, animate = true }: TypewriterTextProps) => {
  const resolved: TextSegment[] = segments ?? [{ text: text ?? '' }];
  const content = resolved.map((s, i) => (
    <span key={i} className={s.className}>{s.text}</span>
  ));
  if (!animate) return <>{content}</>;
  return <span className="fi-rise inline-block max-w-full">{content}</span>;
};

export default TypewriterText;
