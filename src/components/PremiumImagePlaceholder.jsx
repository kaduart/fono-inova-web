// Componente de Placeholder Premium para Imagens
// Gera imagens estilizadas temporárias até as reais ficarem prontas
// Usa SVG com gradientes e padrões profissionais

import { useState, useEffect } from 'react';

const PremiumImagePlaceholder = ({ 
  title, 
  category = "fonoaudiologia",
  className = "",
  aspectRatio = "16/9"
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Configurações de cores por categoria
  const categoryColors = {
    fonoaudiologia: {
      gradient: "from-blue-400 to-blue-600",
      accent: "bg-blue-500",
      pattern: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)"
    },
    psicologia: {
      gradient: "from-purple-400 to-purple-600",
      accent: "bg-purple-500",
      pattern: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)"
    },
    autismo: {
      gradient: "from-teal-400 to-teal-600",
      accent: "bg-teal-500",
      pattern: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)"
    },
    terapia: {
      gradient: "from-green-400 to-green-600",
      accent: "bg-green-500",
      pattern: "radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)"
    },
    aprendizagem: {
      gradient: "from-orange-400 to-orange-600",
      accent: "bg-orange-500",
      pattern: "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)"
    }
  };

  const colors = categoryColors[category] || categoryColors.fonoaudiologia;

  // Ícones SVG por categoria
  const icons = {
    fonoaudiologia: (
      <svg className="w-16 h-16 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    psicologia: (
      <svg className="w-16 h-16 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    autismo: (
      <svg className="w-16 h-16 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    terapia: (
      <svg className="w-16 h-16 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    aprendizagem: (
      <svg className="w-16 h-16 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  };

  const icon = icons[category] || icons.fonoaudiologia;

  // Placeholder premium com gradiente e padrão
  const PlaceholderContent = () => (
    <div 
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${colors.gradient} ${className}`}
      style={{ aspectRatio }}
    >
      {/* Padrão de fundo */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{ background: colors.pattern }}
      />
      
      {/* Círculos decorativos */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl" />
      
      {/* Conteúdo central */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <div className={`${colors.accent} bg-opacity-20 p-4 rounded-full mb-4`}>
          {icon}
        </div>
        <h3 className="text-white font-semibold text-lg mb-2 drop-shadow-lg">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-white text-sm opacity-80">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          Imagem em breve
        </div>
      </div>

      {/* Badge de qualidade */}
      <div className="absolute top-3 right-3">
        <span className="bg-white bg-opacity-20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
          Premium
        </span>
      </div>
    </div>
  );

  return <PlaceholderContent />;
};

// Hook para verificar se imagem existe
export const useImageExists = (src) => {
  const [exists, setExists] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setExists(true);
      setLoading(false);
    };
    img.onerror = () => {
      setExists(false);
      setLoading(false);
    };
    img.src = src;
  }, [src]);

  return { exists, loading };
};

// Componente que alterna entre imagem real e placeholder
export const SmartImage = ({ 
  src, 
  alt, 
  title,
  category,
  className = "",
  aspectRatio = "16/9"
}) => {
  const { exists, loading } = useImageExists(src);

  if (loading) {
    return (
      <div 
        className={`bg-gray-200 animate-pulse rounded-xl ${className}`}
        style={{ aspectRatio }}
      />
    );
  }

  if (!exists) {
    return (
      <PremiumImagePlaceholder 
        title={title}
        category={category}
        className={className}
        aspectRatio={aspectRatio}
      />
    );
  }

  return (
    <img 
      src={src} 
      alt={alt}
      className={`w-full h-full object-cover rounded-xl ${className}`}
      loading="lazy"
    />
  );
};

export default PremiumImagePlaceholder;
