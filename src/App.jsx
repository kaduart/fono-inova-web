import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

// Import das páginas existentes
import AnalyticsDashboard from './components/AnalyticsDashboard';
import AnalyticsTest from './components/AnalyticsTest';
import ArticlePage from './pages/Article';
import Articles from './pages/Articles';
import LandingPage from './pages/lp/LandingPage';
import ClinicaMultidisciplinar from './pages/ClinicaMultidisciplinar';
import FisioPage from './pages/FisioPage';
import FonoPage from './pages/FonoPage';
import FreioLingualPage from './pages/FreioLingual';
import Home from './pages/Home';
import NeuropsicologicaPage from './pages/NeuroPsicologia';
import PsicopedagogiaPage from './pages/PsicopedagogiaPage';
import PsicoPage from './pages/PsisoPage';
import TerapiaOcupacionalPage from './pages/TerapiaOcupacionaPage';
import PsicomotricidadePage from './pages/PsicomotricidadePage';
import PsicopedagogiaLPPage from './pages/PsicopedagogiaLPPage';
import MusicoterapiaPage from './pages/MusicoterapiaPage';
import EquipePage from './pages/Equipe';
import ClinicaPage from './pages/Clinica';

// Import das NOVAS páginas de funil (landing pages de marketing)
import AdultoVozPage from './pages/AdultoVozPage';
import DificuldadeEscolarPage from './pages/DificuldadeEscolarPage';
import DislexiaPage from './pages/DislexiaPage';
import FalaTardiaPage from './pages/FalaTardiaPage';
import FaqPage from './pages/Faq.jsx';
import LPAvaliacaoInfantil from './pages/LPAvaliacaoInfantil';
import TdahPage from './pages/TdahPage';
import TeaPage from './pages/TeaPage';

// Import das NOVAS páginas de especialidade SEO Local (dominar Anápolis)
import FonoaudiologiaAnapolis from './pages/FonoaudiologiaAnapolis';
import PsicologiaInfantilAnapolis from './pages/PsicologiaInfantilAnapolis';
import TerapiaOcupacionalAnapolis from './pages/TerapiaOcupacionalAnapolis';
import PsicomotricidadeAnapolis from './pages/PsicomotricidadeAnapolis';
import TesteLinguinhaAnapolis from './pages/TesteLinguinhaAnapolis';
import FisioterapiaInfantilAnapolis from './pages/FisioterapiaInfantilAnapolis';
import AvaliacaoNeuropsicologicaAnapolis from './pages/AvaliacaoNeuropsicologicaAnapolis';

// Hook de tracking
import { useLeadTracking } from './hooks/useLeadTracking';

// Hook simples para analytics (GA4 já faz o tracking)
const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
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
      <LeadTracker>
        <Routes>
          {/* Rotas existentes */}
          <Route path="/" element={<Home />} />
          <Route path="/analytics" element={<AnalyticsTest />} />
          <Route path="/dashboard" element={<AnalyticsDashboard />} />
          <Route path="/artigos" element={<Articles />} />
          <Route path="/artigos/:slug" element={<ArticlePage />} />
          <Route path="/fonoaudiologia" element={<FonoPage />} />
          <Route path="/psicologia" element={<PsicoPage />} />
          <Route path="/terapia-ocupacional" element={<TerapiaOcupacionalPage />} />
          <Route path="/fisioterapia" element={<FisioPage />} />
          <Route path="/abordagem-multidisciplinar" element={<ClinicaMultidisciplinar />} />
          <Route path="/psicopedagogia" element={<PsicopedagogiaPage />} />
          <Route path="/avaliacao-neuropsicologica" element={<NeuropsicologicaPage />} />
          <Route path="/freio-lingual" element={<FreioLingualPage />} />

          {/* NOVAS ROTAS - Landing Pages de Funil de Marketing */}
          <Route path="/avaliacao-infantil" element={<LPAvaliacaoInfantil />} />
          <Route path="/avaliacao-autismo-infantil" element={<TeaPage />} />
          <Route path="/fala-tardia" element={<FalaTardiaPage />} />
          <Route path="/dislexia-infantil" element={<DislexiaPage />} />
          <Route path="/tdah-infantil" element={<TdahPage />} />
          <Route path="/avaliacao-neuropsicologica-dificuldade-escolar" element={<DificuldadeEscolarPage />} />
          <Route path="/fonoaudiologia-adulto" element={<AdultoVozPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/psicomotricidade" element={<PsicomotricidadePage />} />
          <Route path="/psicopedagogia-clinica" element={<PsicopedagogiaLPPage />} />
          <Route path="/musicoterapia" element={<MusicoterapiaPage />} />
          <Route path="/equipe" element={<EquipePage />} />
          <Route path="/nossa-clinica" element={<ClinicaPage />} />
          
          {/* NOVAS ROTAS - Especialidades SEO Local (dominar Anápolis) */}
          <Route path="/fonoaudiologia-anapolis" element={<FonoaudiologiaAnapolis />} />
          <Route path="/psicologia-infantil-anapolis" element={<PsicologiaInfantilAnapolis />} />
          <Route path="/terapia-ocupacional-anapolis" element={<TerapiaOcupacionalAnapolis />} />
          <Route path="/psicomotricidade-anapolis" element={<PsicomotricidadeAnapolis />} />
          <Route path="/teste-da-linguinha-anapolis" element={<TesteLinguinhaAnapolis />} />
          <Route path="/fisioterapia-infantil-anapolis" element={<FisioterapiaInfantilAnapolis />} />
          <Route path="/avaliacao-neuropsicologica-anapolis" element={<AvaliacaoNeuropsicologicaAnapolis />} />
          
          {/* Rota dinâmica para Landing Pages SEO */}
          <Route path="/lp/:slug" element={<LandingPage />} />
        </Routes>
      </LeadTracker>
    </div>
  );
}

export default App;
