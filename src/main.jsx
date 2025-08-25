// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async'; // importa o HelmetProvider
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import App from './App.jsx';
import AnalyticsProvider from './components/AnalyticsProvider.jsx';

const GA_MEASUREMENT_ID = 'G-N59X7PNQZZ';

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
    <HelmetProvider>
      <BrowserRouter>
        <AnalyticsProvider>
          <App />
        </AnalyticsProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
