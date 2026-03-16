// Serviço de Imagens Premium
// Busca imagens gratuitas de alta qualidade de APIs públicas

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

// Mapeamento de buscas otimizadas por categoria
const searchQueries = {
  fonoaudiologia: [
    'speech therapy child',
    'speech language pathology',
    'toddler learning to talk',
    'child communication therapy',
    'pediatric speech therapist'
  ],
  psicologia: [
    'child psychology',
    'child counseling',
    'family therapy',
    'parent child therapy',
    'child mental health'
  ],
  autismo: [
    'autism therapy',
    'sensory play therapy',
    'autism occupational therapy',
    'special needs child',
    'autism support'
  ],
  terapia: [
    'occupational therapy child',
    'sensory integration therapy',
    'pediatric therapy',
    'child development therapy',
    'motor skills therapy'
  ],
  aprendizagem: [
    'child learning',
    'dyslexia therapy',
    'educational therapy',
    'child reading',
    'learning difficulties'
  ],
  geral: [
    'happy child',
    'child playing',
    'family moment',
    'child smiling',
    'children activity'
  ]
};

// Buscar imagem no Unsplash
export const fetchUnsplashImage = async (category = 'geral', index = 0) => {
  if (!UNSPLASH_ACCESS_KEY) {
    console.warn('Unsplash API key não configurada');
    return null;
  }

  const queries = searchQueries[category] || searchQueries.geral;
  const query = queries[index % queries.length];

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=10&orientation=landscape`,
      {
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      }
    );

    if (!response.ok) throw new Error('Falha na API Unsplash');

    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const image = data.results[index % data.results.length];
      return {
        url: image.urls.regular,
        thumb: image.urls.small,
        alt: image.alt_description || query,
        credit: image.user.name,
        creditUrl: image.user.links.html,
        source: 'unsplash'
      };
    }

    return null;
  } catch (error) {
    console.error('Erro ao buscar imagem Unsplash:', error);
    return null;
  }
};

// Buscar imagem no Pexels
export const fetchPexelsImage = async (category = 'geral', index = 0) => {
  if (!PEXELS_API_KEY) {
    console.warn('Pexels API key não configurada');
    return null;
  }

  const queries = searchQueries[category] || searchQueries.geral;
  const query = queries[index % queries.length];

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=10&orientation=landscape`,
      {
        headers: {
          'Authorization': PEXELS_API_KEY
        }
      }
    );

    if (!response.ok) throw new Error('Falha na API Pexels');

    const data = await response.json();
    
    if (data.photos && data.photos.length > 0) {
      const image = data.photos[index % data.photos.length];
      return {
        url: image.src.large,
        thumb: image.src.medium,
        alt: image.alt || query,
        credit: image.photographer,
        creditUrl: image.photographer_url,
        source: 'pexels'
      };
    }

    return null;
  } catch (error) {
    console.error('Erro ao buscar imagem Pexels:', error);
    return null;
  }
};

// Buscar imagem de qualquer fonte disponível
export const fetchPremiumImage = async (category = 'geral', index = 0) => {
  // Tentar Unsplash primeiro
  let image = await fetchUnsplashImage(category, index);
  
  // Se falhar, tentar Pexels
  if (!image) {
    image = await fetchPexelsImage(category, index);
  }

  return image;
};

// Cache de imagens para evitar múltiplas requisições
const imageCache = new Map();

export const getCachedImage = async (category, index) => {
  const key = `${category}-${index}`;
  
  if (imageCache.has(key)) {
    return imageCache.get(key);
  }

  const image = await fetchPremiumImage(category, index);
  
  if (image) {
    imageCache.set(key, image);
  }

  return image;
};

// Limpar cache
export const clearImageCache = () => {
  imageCache.clear();
};

// Configurações de imagens fallback (quando APIs não disponíveis)
export const fallbackImages = {
  fonoaudiologia: [
    'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800',
    'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=800'
  ],
  psicologia: [
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800',
    'https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?w=800'
  ],
  autismo: [
    'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800',
    'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800'
  ],
  terapia: [
    'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800',
    'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800'
  ],
  aprendizagem: [
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800'
  ],
  geral: [
    'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=800',
    'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800'
  ]
};

// Obter imagem fallback
export const getFallbackImage = (category, index) => {
  const images = fallbackImages[category] || fallbackImages.geral;
  return {
    url: images[index % images.length],
    alt: `Imagem relacionada a ${category}`,
    credit: 'Unsplash',
    creditUrl: 'https://unsplash.com',
    source: 'fallback'
  };
};

export default {
  fetchUnsplashImage,
  fetchPexelsImage,
  fetchPremiumImage,
  getCachedImage,
  getFallbackImage,
  clearImageCache
};
