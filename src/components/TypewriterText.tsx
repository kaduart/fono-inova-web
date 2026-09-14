import { useEffect, useState } from 'react';

type TextSegment = {
  text: string;
  className?: string;
};

type TypewriterTextProps = {
  text?: string;
  segments?: TextSegment[];
  typingSpeed?: number;
  startDelay?: number;
  cursorClassName?: string;
};

const TypewriterText = ({
  text,
  segments,
  typingSpeed = 34,
  startDelay = 1000,
  cursorClassName = 'bg-current',
}: TypewriterTextProps) => {
  const resolvedSegments: TextSegment[] = segments ?? [{ text: text ?? '' }];
  const fullText = resolvedSegments.map((segment) => segment.text).join('');

  const [displayLength, setDisplayLength] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReduceMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);

    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setDisplayLength(fullText.length);
      return;
    }

    setDisplayLength(0);
    let characterIndex = 0;
    let typingTimer: ReturnType<typeof setTimeout> | undefined;

    const typeNextCharacter = () => {
      characterIndex += 1;
      setDisplayLength(characterIndex);

      if (characterIndex < fullText.length) {
        typingTimer = setTimeout(typeNextCharacter, typingSpeed);
      }
    };

    const startTimer = setTimeout(typeNextCharacter, startDelay);

    return () => {
      clearTimeout(startTimer);
      if (typingTimer) clearTimeout(typingTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion, startDelay, fullText, typingSpeed]);

  let consumed = 0;

  return (
    <span className="relative inline-grid max-w-full align-bottom">
      <span className="invisible col-start-1 row-start-1" aria-hidden="true">
        {resolvedSegments.map((segment, index) => (
          <span key={index} className={segment.className}>{segment.text}</span>
        ))}
      </span>
      <span className="sr-only">{fullText}</span>
      <span className="col-start-1 row-start-1" aria-hidden="true">
        {resolvedSegments.map((segment, index) => {
          const segmentStart = consumed;
          consumed += segment.text.length;
          const revealed = segment.text.slice(0, Math.max(0, displayLength - segmentStart));
          if (!revealed) return null;
          return (
            <span key={index} className={segment.className}>
              {revealed}
            </span>
          );
        })}
        {!reduceMotion && displayLength < fullText.length && (
          <span
            className={`ml-0.5 inline-block h-[1em] w-0.5 animate-pulse align-[-0.08em] ${cursorClassName}`}
          />
        )}
      </span>
    </span>
  );
};

export default TypewriterText;
