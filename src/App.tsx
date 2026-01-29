import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

// Import das páginas existentes
import AnalyticsTest from './components/AnalyticsTest';
import BookingModal from './components/BookingModal.jsx';
import ArticlePage from './pages/Article';
import Articles from './pages/Articles';
import ClinicaMultidisciplinar from './pages/ClinicaMultidisciplinar';
import FisioPage from './pages/FisioPage';
import FonoPage from './pages/FonoPage';
import FreioLingualPage from './pages/FreioLingual';
import Home from './pages/Home';
import NeuropsicologicaPage from './pages/NeuroPsicologia';
import PsicopedagogiaPage from './pages/PsicopedagogiaPage';
import PsicoPage from './pages/PsisoPage';
import TerapiaOcupacionalPage from './pages/TerapiaOcupacionaPage';

// Import das NOVAS páginas de funil (landing pages de marketing)
import AdultoVozPage from './pages/AdultoVozPage';
import DificuldadeEscolarPage from './pages/DificuldadeEscolarPage';
import FalaTardiaPage from './pages/FalaTardiaPage';
import FaqPage from './pages/Faq.jsx';
import TeaPage from './pages/TeaPage';

// Hook simples para analytics
const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'G-N59X7PNQZZ', {
        page_path: location.pathname,
        page_title: document.title
      });
    }
  }, [location]);
};

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useAnalytics(); // → Analytics funcionando!

  return (
    <div className="min-h-screen bg-background font-inter">
      {/*  popup page inicial 
      <div className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold flex items-center justify-center transition-all duration-300 hover:shadow-xl -mt-5">
        <SpecialistPopup />
      </div> 
      */}

      <Routes>
        {/* Rotas existentes */}
        <Route path="/" element={<Home />} />
        <Route path="/analytics" element={<AnalyticsTest />} />
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
        <Route path="/avaliacao-autismo-infantil" element={<TeaPage />} />
        <Route path="/fala-tardia" element={<FalaTardiaPage />} />
        <Route path="/avaliacao-neuropsicologica-dificuldade-escolar" element={<DificuldadeEscolarPage />} />
        <Route path="/fonoaudiologia-adulto" element={<AdultoVozPage />} />
        <Route path="/faq" element={<FaqPage />} />
      </Routes>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;