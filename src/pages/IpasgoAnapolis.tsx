import { lazy, Suspense } from 'react';
import ConvenioInteresse from '../components/ConvenioInteresse';
import { CONVENIOS_STATUS } from '../data/conveniosStatus';

// A LP completa do IPASGO está preservada em IpasgoAnapolisLP.tsx (não apagar). Ela só volta quando
// CONVENIOS_STATUS.ipasgo for 'ativo' (src/data/conveniosStatus.ts). Atenção: o IPASGO começa SÓ com
// Terapia Ocupacional — revisar o texto da LP (que cita 4 especialidades) antes de ativar.
const IpasgoAnapolisLP = lazy(() => import('./IpasgoAnapolisLP'));

const IpasgoAnapolis = () =>
  CONVENIOS_STATUS.ipasgo === 'ativo' ? (
    <Suspense fallback={null}>
      <IpasgoAnapolisLP />
    </Suspense>
  ) : (
    <ConvenioInteresse nome="IPASGO" slug="ipasgo" path="/convenio-ipasgo-anapolis" />
  );

export default IpasgoAnapolis;
