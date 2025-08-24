// src/App.jsx
import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

// Import das páginas
import BookingModal from './components/BookingModal'
import SpecialistPopup from './components/SpecialityPopup/SpecialityPopUp'
import ClinicaMultidisciplinar from './pages/ClinicaMultidisciplinar'
import FisioPage from './pages/FisioPage'
import FonoPage from './pages/FonoPage'
import Home from './pages/Home'
import PsicoPage from './pages/PsisoPage'
import TerapiaOcupacionalPage from './pages/TerapiaOcupacionaPage'
import Articles from './pages/Articles'
import ArticlePage from './pages/Article'

// Hook simples para analytics
const useAnalytics = () => {
  const location = useLocation()

  useEffect(() => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'G-N59X7PNQZZ', {
        page_path: location.pathname,
        page_title: document.title
      })
    }
  }, [location])
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  useAnalytics() // ← Analytics funcionando!


  return (
    <div className="min-h-screen bg-background font-inter">
      <div 
      className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold flex items-center justify-center transition-all duration-300 hover:shadow-xl -mt-5">
      <SpecialistPopup />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artigos" element={<Articles />} />
        <Route path="/artigos/:slug" element={<ArticlePage />} />
        <Route path="/fonoaudiologia" element={<FonoPage />} />
        <Route path="/psicologia" element={<PsicoPage />} />
        <Route path="/terapia-ocupacional" element={<TerapiaOcupacionalPage />} />
        <Route path="/fisioterapia" element={<FisioPage />} />
        <Route path="/abordagem-multidisciplinar" element={<ClinicaMultidisciplinar />} />
      </Routes>
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

export default App