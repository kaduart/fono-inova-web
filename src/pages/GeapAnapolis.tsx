import { lazy, Suspense } from 'react';
import ConvenioInteresse from '../components/ConvenioInteresse';
import { CONVENIOS_STATUS } from '../data/conveniosStatus';

// A LP completa do GEAP está preservada em GeapAnapolisLP.tsx (não apagar). Ela só volta quando
// CONVENIOS_STATUS.geap for 'ativo' (src/data/conveniosStatus.ts) — ver as instruções lá.
const GeapAnapolisLP = lazy(() => import('./GeapAnapolisLP'));

const GeapAnapolis = () =>
  CONVENIOS_STATUS.geap === 'ativo' ? (
    <Suspense fallback={null}>
      <GeapAnapolisLP />
    </Suspense>
  ) : (
    <ConvenioInteresse nome="GEAP" slug="geap" path="/convenio-geap-anapolis" />
  );

export default GeapAnapolis;
