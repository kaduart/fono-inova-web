import { Suspense, lazy, useEffect, useRef } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

// Import do monitor de WhatsApp
import WhatsAppStatusAlert from './components/WhatsAppStatusAlert';
import SpecialistPopup from './components/SpecialityPopup/SpecialityPopUp';

// Import das páginas existentes
const AnalyticsDashboard = lazy(() => import('./components/AnalyticsDashboard'));
const AnalyticsTest = lazy(() => import('./components/AnalyticsTest'));
const ArticlePage = lazy(() => import('./pages/Article'));
const Articles = lazy(() => import('./pages/Articles'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const LandingPage = lazy(() => import('./pages/lp/LandingPage'));
const ApoioFamilias = lazy(() => import('./pages/ApoioFamilias'));
const ConectaApp = lazy(() => import('./pages/ConectaApp'));
const ReembolsoPlanoSaudeAnapolis = lazy(() => import('./pages/ReembolsoPlanoSaudeAnapolis'));
const ClinicaMultidisciplinar = lazy(() => import('./pages/ClinicaMultidisciplinar'));
const Home = lazy(() => import('./pages/Home'));
const PsicopedagogiaPage = lazy(() => import('./pages/PsicopedagogiaPage'));
const PsicomotricidadePage = lazy(() => import('./pages/PsicomotricidadePage'));
const PsicopedagogiaLPPage = lazy(() => import('./pages/PsicopedagogiaLPPage'));
const MusicoterapiaPage = lazy(() => import('./pages/MusicoterapiaPage'));
const EquipePage = lazy(() => import('./pages/Equipe'));
const ClinicaPage = lazy(() => import('./pages/Clinica'));

// Import das NOVAS páginas de funil (landing pages de marketing)
const AdultoVozPage = lazy(() => import('./pages/AdultoVozPage'));
const SindromeDeDownPage = lazy(() => import('./pages/SindromeDeDownPage'));
const PrematuridadePage = lazy(() => import('./pages/PrematuridadePage'));
const DificuldadeEscolarPage = lazy(() => import('./pages/DificuldadeEscolarPage'));
const FaqPage = lazy(() => import('./pages/Faq.jsx'));
const PrivacidadePage = lazy(() => import('./pages/Privacidade.jsx'));
const LPAvaliacaoInfantil = lazy(() => import('./pages/LPAvaliacaoInfantil'));
const TdahAvaliacaoPage = lazy(() => import('./pages/TdahAvaliacaoPage'));
const ComportamentoInfantilPage = lazy(() => import('./pages/ComportamentoInfantilPage'));
const NeuropediatriaPage = lazy(() => import('./pages/NeuropediatriaPage'));

// Import das NOVAS páginas de especialidade SEO Local (dominar Anápolis)
const FonoaudiologiaAnapolis = lazy(() => import('./pages/FonoaudiologiaAnapolis'));
const PsicologiaInfantilAnapolis = lazy(() => import('./pages/PsicologiaInfantilAnapolis'));
const TerapiaOcupacionalAnapolis = lazy(() => import('./pages/TerapiaOcupacionalAnapolis'));
const PsicomotricidadeAnapolis = lazy(() => import('./pages/PsicomotricidadeAnapolis'));
const TesteLinguinhaAnapolis = lazy(() => import('./pages/TesteLinguinhaAnapolis'));
const FisioterapiaInfantilAnapolis = lazy(() => import('./pages/FisioterapiaInfantilAnapolis'));
// Long-tail local — intenção emocional + geo
const FalaTardiaAnapolis = lazy(() => import('./pages/FalaTardiaAnapolis'));
const AutismoAnapolis = lazy(() => import('./pages/AutismoAnapolis'));
const SeletividadeAlimentarAnapolis = lazy(() => import('./pages/SeletividadeAlimentarAnapolis'));
const TdahAnapolis = lazy(() => import('./pages/TdahAnapolis'));
const DislexiaAnapolis = lazy(() => import('./pages/DislexiaAnapolis'));
const AvaliacaoNeuropsicologicaAnapolis = lazy(() => import('./pages/AvaliacaoNeuropsicologicaAnapolis'));
// Convênios
const BaseAereaAnapolis = lazy(() => import('./pages/BaseAereaAnapolis'));
const GeapAnapolis = lazy(() => import('./pages/GeapAnapolis'));
const IpasgoAnapolis = lazy(() => import('./pages/IpasgoAnapolis'));
const BradescoSaudeAnapolis = lazy(() => import('./pages/BradescoSaudeAnapolis'));
const InteresseConfirmado = lazy(() => import('./pages/InteresseConfirmado'));
// Link-in-bio (Instagram/redes sociais)
const LinksBio = lazy(() => import('./pages/LinksBio'));

// Hook de tracking
import { useLeadTracking } from './hooks/useLeadTracking';
import { installWhatsAppContactTracking, trackMetaPageView } from './helper/metaPixel';

// Hook simples para analytics (GA4 já faz o tracking)
const useAnalytics = () => {
  const location = useLocation();
  const isFirstPage = useRef(true);

  useEffect(() => {
    installWhatsAppContactTracking();
  }, []);

  useEffect(() => {
    // O PageView da primeira página já sai do index.html
    if (isFirstPage.current) {
      isFirstPage.current = false;
    } else {
      trackMetaPageView();
    }

    // Scroll para o topo ao mudar de página
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (typeof (window).gtag !== 'undefined') {
      (window).gtag('config', 'G-N59X7PNQZZ', {
        page_path: location.pathname,
        page_title: document.title
      });
    }
  }, [location]);
};

// Componente de rastreamento de leads
const LeadTracker = ({ children }) => {
  const location = useLocation();
  
  // Inicializar tracking em todas as páginas
  useLeadTracking();
  
  useEffect(() => {
    // Rastrear mudança de página
    console.log('📍 Página atual:', location.pathname);
  }, [location]);
  
  return children;
};

function App() {
  useAnalytics(); // → Analytics funcionando!

  return (
    <div className="min-h-screen bg-background font-inter overflow-x-hidden">
      {/* 🚨 Alerta de status do WhatsApp (só aparece para admins) */}
      <WhatsAppStatusAlert />
      <LeadTracker>
        <SpecialistPopup />
        <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
        <Routes>
          {/* Rotas existentes */}
          <Route path="/" element={<Home />} />
          <Route path="/analytics" element={<AnalyticsTest />} />
          <Route path="/dashboard" element={<AnalyticsDashboard />} />
          <Route path="/artigos" element={<Articles />} />
          <Route path="/artigos/:slug" element={<ArticlePage />} />
          <Route path="/artigos/fono-guia-completo" element={<Navigate to="/artigos/fonoaudiologia-guia-completo" replace />} />
          {/* GSC (2026-09-15) sinalizou como conteúdo duplicado do sinais-autismo-crianca (mais novo e completo); artigo antigo removido, rota redireciona */}
          <Route path="/artigos/entendendo-espectro-autista" element={<Navigate to="/artigos/sinais-autismo-crianca" replace />} />
          <Route path="/fonoaudiologia" element={<Navigate to="/fonoaudiologia-anapolis" replace />} />
          <Route path="/psicologia" element={<Navigate to="/psicologia-infantil-anapolis" replace />} />
          <Route path="/terapia-ocupacional" element={<Navigate to="/terapia-ocupacional-anapolis" replace />} />
          <Route path="/fisioterapia" element={<Navigate to="/fisioterapia-infantil-anapolis" replace />} />
          <Route path="/abordagem-multidisciplinar" element={<ClinicaMultidisciplinar />} />
          <Route path="/psicopedagogia" element={<PsicopedagogiaPage />} />
          <Route path="/avaliacao-neuropsicologica" element={<Navigate to="/avaliacao-neuropsicologica-anapolis" replace />} />
          <Route path="/freio-lingual" element={<Navigate to="/teste-da-linguinha-anapolis" replace />} />

          {/* NOVAS ROTAS - Landing Pages de Funil de Marketing */}
          <Route path="/avaliacao-infantil" element={<LPAvaliacaoInfantil />} />
          <Route path="/avaliacao-autismo-infantil" element={<Navigate to="/autismo-anapolis" replace />} />
          <Route path="/fala-tardia" element={<Navigate to="/fala-tardia-anapolis" replace />} />
          <Route path="/dislexia-infantil" element={<Navigate to="/dislexia-anapolis" replace />} />
          <Route path="/tdah-infantil" element={<Navigate to="/tdah-anapolis" replace />} />
          <Route path="/avaliacao-tdah-anapolis" element={<TdahAvaliacaoPage />} />
          <Route path="/comportamento-infantil-anapolis" element={<ComportamentoInfantilPage />} />
          <Route path="/neuropediatra-anapolis" element={<NeuropediatriaPage />} />
          <Route path="/consulta-neuropediatra-infantil" element={<Navigate to="/neuropediatra-anapolis" replace />} />
          <Route path="/avaliacao-neurologica-infantil" element={<Navigate to="/neuropediatra-anapolis" replace />} />
          <Route path="/avaliacao-neuropsicologica-dificuldade-escolar" element={<DificuldadeEscolarPage />} />
          <Route path="/fonoaudiologia-adulto" element={<AdultoVozPage />} />
          <Route path="/sindrome-de-down" element={<SindromeDeDownPage />} />
          <Route path="/prematuridade-desenvolvimento" element={<PrematuridadePage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/psicomotricidade" element={<PsicomotricidadePage />} />
          <Route path="/psicopedagogia-clinica" element={<PsicopedagogiaLPPage />} />
          <Route path="/musicoterapia" element={<MusicoterapiaPage />} />
          <Route path="/equipe" element={<EquipePage />} />
          <Route path="/nossa-clinica" element={<ClinicaPage />} />
          
          {/* NOVAS ROTAS - Especialidades SEO Local (dominar Anápolis) */}
          <Route path="/fonoaudiologia-anapolis" element={<FonoaudiologiaAnapolis />} />
          <Route path="/fonoaudiologia-infantil-anapolis" element={<Navigate to="/fonoaudiologia-anapolis" replace />} />
          <Route path="/fonoaudiologo-infantil-anapolis" element={<Navigate to="/fonoaudiologia-anapolis" replace />} />
          <Route path="/avaliacao-fonoaudiologica" element={<Navigate to="/fonoaudiologia-anapolis" replace />} />
          <Route path="/atraso-de-fala-infantil" element={<Navigate to="/fonoaudiologia-anapolis" replace />} />
          <Route path="/psicologia-infantil-anapolis" element={<PsicologiaInfantilAnapolis />} />
          <Route path="/psicologo-infantil-anapolis" element={<Navigate to="/psicologia-infantil-anapolis" replace />} />
          <Route path="/psicologa-infantil-anapolis" element={<Navigate to="/psicologia-infantil-anapolis" replace />} />
          <Route path="/consulta-psicologo-infantil" element={<Navigate to="/psicologia-infantil-anapolis" replace />} />
          <Route path="/terapia-ocupacional-anapolis" element={<TerapiaOcupacionalAnapolis />} />
          <Route path="/psicomotricidade-anapolis" element={<PsicomotricidadeAnapolis />} />
          <Route path="/teste-da-linguinha-anapolis" element={<TesteLinguinhaAnapolis />} />
          <Route path="/fisioterapia-infantil-anapolis" element={<FisioterapiaInfantilAnapolis />} />
          <Route path="/avaliacao-neuropsicologica-anapolis" element={<AvaliacaoNeuropsicologicaAnapolis />} />
          <Route path="/convenio-base-aerea-anapolis" element={<BaseAereaAnapolis />} />
          <Route path="/convenio-geap-anapolis" element={<GeapAnapolis />} />
          {/* IPASGO: credenciamento ainda não confirmado (previsão ~20 dias, checado em 2026-09-14).
              Rota existe mas fica fora do sitemap e sem link no /links até a confirmação. */}
          <Route path="/convenio-ipasgo-anapolis" element={<IpasgoAnapolis />} />
          <Route path="/convenio-bradesco-saude-anapolis" element={<BradescoSaudeAnapolis />} />
          <Route path="/convenio-bradesco-anapolis" element={<Navigate to="/convenio-bradesco-saude-anapolis" replace />} />
          <Route path="/lista-de-interesse-confirmada" element={<InteresseConfirmado />} />
          <Route path="/links" element={<LinksBio />} />
          {/* Long-tail local — intenção emocional + geo */}
          <Route path="/fala-tardia-anapolis" element={<FalaTardiaAnapolis />} />
          <Route path="/autismo-anapolis" element={<AutismoAnapolis />} />
          <Route path="/seletividade-alimentar-anapolis" element={<SeletividadeAlimentarAnapolis />} />
          <Route path="/tdah-anapolis" element={<TdahAnapolis />} />
          <Route path="/dislexia-anapolis" element={<DislexiaAnapolis />} />

          {/* Páginas institucionais */}
          <Route path="/privacidade" element={<PrivacidadePage />} />
          <Route path="/apoio-as-familias" element={<ApoioFamilias />} />
          <Route path="/app" element={<ConectaApp />} />
          <Route path="/conecta" element={<Navigate to="/app" replace />} />
          <Route path="/reembolso-plano-de-saude-anapolis" element={<ReembolsoPlanoSaudeAnapolis />} />
          
          {/* Rota dinâmica para Landing Pages SEO */}
          <Route path="/lp/:slug" element={<LandingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </Suspense>
      </LeadTracker>
    </div>
  );
}

export default App;
