import ConvenioInteresse from '../components/ConvenioInteresse';

// Bradesco Saúde: credenciamento em fase inicial (2026-09-21) — só lista de interesse. Ao liberar, criar LP
// completa (modelo: BaseAereaAnapolis.tsx) sem afirmar "todas as modalidades": a rede varia por produto.
const BradescoSaudeAnapolis = () => (
  <ConvenioInteresse nome="Bradesco Saúde" slug="bradesco" path="/convenio-bradesco-saude-anapolis" />
);

export default BradescoSaudeAnapolis;
