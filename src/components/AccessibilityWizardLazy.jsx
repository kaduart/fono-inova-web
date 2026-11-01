import { lazy, Suspense, useState, useEffect } from 'react';

// O assistente de acessibilidade usa MUI (~170 KB). Ele só é baixado quando a pessoa abre,
// em vez de pesar no carregamento de toda página de especialidade.
const Wizard = lazy(() => import('./AccessibilityWizard'));

export default function AccessibilityWizardLazy({ open, ...props }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { if (open) setLoaded(true); }, [open]);
  if (!loaded) return null;
  return (
    <Suspense fallback={null}>
      <Wizard open={open} {...props} />
    </Suspense>
  );
}
