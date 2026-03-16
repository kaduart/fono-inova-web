// Centralizador de Landing Pages
import fonoaudiologiaLPs from './fonoaudiologia';
import autismoLPs from './autismo';
import geograficasLPs from './geograficas';
import psicologiaLPs from './psicologia';
import aprendizagemLPs from './aprendizagem';

// Consolidar todas as landing pages
export const allLandingPages = [
  ...fonoaudiologiaLPs,
  ...autismoLPs,
  ...geograficasLPs,
  ...psicologiaLPs,
  ...aprendizagemLPs,
  // Futuros blocos:
  // ...psicomotricidadeLPs,
];

// Helper para buscar LP por slug
export const getLandingPageBySlug = (slug) => {
  return allLandingPages.find(lp => lp.slug === slug);
};

// Helper para listar todas as URLs de LPs (para sitemap)
export const getAllLandingPageUrls = () => {
  return allLandingPages.map(lp => ({
    slug: lp.slug,
    url: `/lp/${lp.slug}`,
    lastModified: lp.dateModified,
    priority: 0.8
  }));
};

// Helper para buscar LPs por categoria
export const getLandingPagesByCategory = (category) => {
  // Futuro: adicionar campo category nos LPs
  return allLandingPages.filter(lp => lp.category === category);
};

// Exportações individuais
export { fonoaudiologiaLPs };
export default allLandingPages;
