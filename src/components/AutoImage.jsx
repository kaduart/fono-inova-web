// Componente de Imagem Automática Premium
// Busca imagens de APIs gratuitas ou mostra placeholder premium
import { useState, useEffect } from 'react';
import { getFallbackImage } from '../services/imageService';

// Banco de imagens premium pré-selecionadas (URLs diretas de CDNs confiáveis)
const premiumImageBank = {
  fonoaudiologia: [
    {
      url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&q=60',
      alt: 'Criança em sessão de fonoaudiologia - Clínica Fono Inova',
      credit: 'Unsplash',
      photographer: 'Ben White'
    },
    {
      url: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=400&q=60',
      alt: 'Terapia de linguagem infantil - Clínica Fono Inova',
      credit: 'Unsplash',
      photographer: 'Joshua Hoehne'
    },
    {
      url: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&q=60',
      alt: 'Desenvolvimento da fala em crianças - Anápolis',
      credit: 'Unsplash',
      photographer: 'Nathan Anderson'
    }
  ],
  psicologia: [
    {
      url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=60',
      alt: 'Psicologia infantil - Avaliação em Anápolis',
      credit: 'Unsplash',
      photographer: 'National Cancer Institute'
    },
    {
      url: 'https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?w=400&q=60',
      alt: 'Terapia psicológica para crianças - Clínica Fono Inova',
      credit: 'Unsplash',
      photographer: 'Aedrian'
    },
    {
      url: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=400&q=60',
      alt: 'Acompanhamento psicológico infantil - Anápolis',
      credit: 'Unsplash',
      photographer: 'Santi Vedrí'
    }
  ],
  autismo: [
    {
      url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&q=60',
      alt: 'Terapia para autismo - Integração sensorial',
      credit: 'Unsplash',
      photographer: 'Susan Wilkinson'
    },
    {
      url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400&q=60',
      alt: 'Brincadeira terapêutica - Desenvolvimento infantil',
      credit: 'Unsplash',
      photographer: 'Caroline Hernandez'
    },
    {
      url: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&q=60',
      alt: 'Avaliação neuropsicológica - TEA',
      credit: 'Unsplash',
      photographer: 'Jacek Dylag'
    }
  ],
  terapia: [
    {
      url: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&q=60',
      alt: 'Terapia ocupacional infantil - Coordenação motora',
      credit: 'Unsplash',
      photographer: 'Nathan Anderson'
    },
    {
      url: 'https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=400&q=60',
      alt: 'Integração sensorial - Terapia ocupacional',
      credit: 'Unsplash',
      photographer: 'Robert Collins'
    },
    {
      url: 'https://images.unsplash.com/photo-1603352525944-0ef17b6a4e2a?w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1603352525944-0ef17b6a4e2a?w=400&q=60',
      alt: 'Desenvolvimento motor infantil - Anápolis',
      credit: 'Unsplash',
      photographer: 'Daiga Ellaby'
    }
  ],
  aprendizagem: [
    {
      url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=60',
      alt: 'Aprendizagem infantil - Dislexia e TDAH',
      credit: 'Unsplash',
      photographer: 'Element5 Digital'
    },
    {
      url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=60',
      alt: 'Psicopedagogia - Dificuldades de aprendizagem',
      credit: 'Unsplash',
      photographer: 'Caleb Woods'
    },
    {
      url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=60',
      alt: 'Leitura e escrita - Reabilitação neuropsicológica',
      credit: 'Unsplash',
      photographer: 'Lonely Planet'
    }
  ],
  geral: [
    {
      url: 'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=400&q=60',
      alt: 'Família feliz - Desenvolvimento infantil',
      credit: 'Unsplash',
      photographer: 'Chayene Rafaela'
    },
    {
      url: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400&q=60',
      alt: 'Crianças brincando - Crescimento saudável',
      credit: 'Unsplash',
      photographer: 'Lina Trochez'
    },
    {
      url: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=1200&q=80',
      thumb: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=400&q=60',
      alt: 'Momentos especiais - Infância',
      credit: 'Unsplash',
      photographer: 'Kuanish Reymbaev'
    }
  ]
};

// Hash simples para consistência
const getHash = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

// Selecionar imagem consistente baseada no slug
const getConsistentImage = (slug, category = 'geral') => {
  const images = premiumImageBank[category] || premiumImageBank.geral;
  const hash = getHash(slug);
  const index = hash % images.length;
  return images[index];
};

// Componente AutoImage
const AutoImage = ({ 
  slug, 
  category = 'geral', 
  alt,
  className = '',
  aspectRatio = '16/9',
  priority = false
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  const image = getConsistentImage(slug, category);
  const displayAlt = alt || image.alt;

  return (
    <div 
      className={`relative overflow-hidden rounded-xl bg-gray-100 ${className}`}
      style={{ aspectRatio }}
    >
      {/* Placeholder enquanto carrega */}
      {!loaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-200 to-gray-300" />
      )}
      
      {/* Imagem */}
      <img
        src={image.url}
        alt={displayAlt}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`
          absolute inset-0 w-full h-full object-cover
          transition-all duration-500
          ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
        `}
      />
      
      {/* Overlay de crédito (subtle) */}
      {loaded && (
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity">
          <p className="text-white text-xs text-right">
            Photo by {image.photographer} on {image.credit}
          </p>
        </div>
      )}
      
      {/* Fallback em caso de erro */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
          <div className="text-center text-white p-4">
            <svg className="w-12 h-12 mx-auto mb-2 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm font-medium">{displayAlt}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Hook para usar imagens consistentes
export const useAutoImage = (slug, category = 'geral') => {
  return getConsistentImage(slug, category);
};

export default AutoImage;
