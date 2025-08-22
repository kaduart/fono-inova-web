// src/App.jsx
import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

// Import das páginas
import BookingModal from './components/BookingModal'
import Home from './Home'
import ClinicaMultidisciplinar from './pages/ClinicaMultidisciplinar'
import FisioPage from './pages/FisioPage'
import FonoPage from './pages/FonoPage'
import PsicoPage from './pages/PsisoPage'
import TerapiaOcupacionalPage from './pages/TerapiaOcupacionaPage'

// Hook simples para analytics
const useAnalytics = () => {
  const location = useLocation()

  useEffect(() => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'G-XXXXXXXXXX', {
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
      <Routes>
        <Route path="/" element={<Home />} />
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