// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

// Configuração MÍNIMA do Google Analytics
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // ← SEU ID AQUI

// Script do Google Analytics (adiciona dinamicamente)
const gaScript = document.createElement('script');
gaScript.async = true;
gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
document.head.appendChild(gaScript);

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', GA_MEASUREMENT_ID);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)