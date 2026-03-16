// Componente para interlinking entre artigos e LPs
// SEO: Cria cluster de conteúdo e fortalece autoridade de tópico

import { Link } from 'react-router-dom';

export const RelatedLandingPages = ({ links }) => {
  if (!links || links.length === 0) return null;

  return (
    <div className="my-8 p-6 bg-blue-50 rounded-xl border-l-4 border-blue-500">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Conteúdos relacionados que podem ajudar:
      </h3>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <Link 
              to={link.url}
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <span className="mr-2">→</span>
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const RelatedArticles = ({ articles }) => {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="my-8 p-6 bg-gray-50 rounded-xl">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Artigos relacionados:
      </h3>
      <ul className="space-y-2">
        {articles.map((article, index) => (
          <li key={index}>
            <Link 
              to={article.url}
              className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
            >
              <span className="mr-2">•</span>
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const CTABox = ({ title, text, buttonText, link, variant = "primary" }) => {
  const variants = {
    primary: "bg-green-50 border-green-500",
    secondary: "bg-blue-50 border-blue-500",
    urgent: "bg-red-50 border-red-500"
  };

  // Adicionar mensagem pronta se for link do WhatsApp
  const getWhatsAppLink = (originalLink) => {
    if (originalLink.includes('wa.me') && !originalLink.includes('text=')) {
      const message = "Olá! Vim pelo site e gostaria de agendar uma avaliação para meu filho.";
      return `${originalLink}&text=${encodeURIComponent(message)}`;
    }
    return originalLink;
  };

  return (
    <div className={`my-8 p-6 rounded-xl border-l-4 ${variants[variant]}`}>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-700 mb-4">{text}</p>
      <a
        href={getWhatsAppLink(link)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold transition-colors"
      >
        {buttonText}
      </a>
    </div>
  );
};

// Dados de interlinking para artigos
export const articleInterlinks = {
  "atraso-na-fala-como-estimular-linguagem-crianca": {
    landingPages: [
      { title: "Criança de 2 anos não fala? Veja os sinais de alerta", url: "/lp/crianca-2-anos-nao-fala" },
      { title: "Tratamento para atraso na fala infantil em Anápolis", url: "/lp/atraso-na-fala-infantil" },
      { title: "Criança troca letras na fala? Entenda as causas", url: "/lp/troca-letras-crianca" }
    ],
    cta: {
      title: "Preocupado com o desenvolvimento da fala do seu filho?",
      text: "Na Clínica Fono Inova em Anápolis, realizamos avaliação fonoaudiológica completa. Agende uma consulta e descubra como podemos ajudar.",
      buttonText: "Agendar Avaliação no WhatsApp",
      link: "https://wa.me/5562993377726?text=Oi! Li o artigo sobre atraso na fala e gostaria de agendar uma avaliação."
    }
  },
  "entendendo-espectro-auta": {
    landingPages: [
      { title: "Sinais de autismo em bebês - O que observar", url: "/lp/sinais-autismo-bebe" },
      { title: "Sinais de autismo aos 2 anos", url: "/lp/sinais-autismo-2-anos" },
      { title: "Avaliação de autismo em Anápolis", url: "/lp/avaliacao-tea-anapolis" }
    ],
    cta: {
      title: "Suspeita de autismo?",
      text: "A avaliação precoce faz toda a diferença. Na Clínica Fono Inova em Anápolis, temos equipe multidisciplinar especializada em TEA.",
      buttonText: "Agendar Avaliação",
      link: "https://wa.me/5562993377726?text=Oi! Tenho suspeita de autismo no meu filho e gostaria de agendar uma avaliação."
    }
  },
  "fala-tardia-criancas-quando-preocupar": {
    landingPages: [
      { title: "Criança de 2 anos não fala?", url: "/lp/crianca-2-anos-nao-fala" },
      { title: "Atraso na fala infantil - Tratamento", url: "/lp/atraso-na-fala-infantil" },
      { title: "Criança não forma frases?", url: "/lp/crianca-nao-forma-frases" }
    ],
    cta: {
      title: "Fala tardia precisa de atenção",
      text: "Quanto mais cedo começar o tratamento, melhores os resultados. Agende uma avaliação fonoaudiológica na Clínica Fono Inova.",
      buttonText: "Falar com Especialista",
      link: "https://wa.me/5562993377726?text=Oi! Gostaria de agendar uma avaliação para fala tardia."
    }
  },
  "processamento-auditivo-central-pac": {
    landingPages: [
      { title: "Processamento auditivo central em crianças", url: "/lp/processamento-auditivo" },
      { title: "Criança ouve mas não entende?", url: "/lp/processamento-auditivo" }
    ],
    cta: {
      title: "Suspeita de problema no processamento auditivo?",
      text: "Realizamos avaliação completa do PAC com equipamentos especializados em Anápolis.",
      buttonText: "Agendar Avaliação",
      link: "https://wa.me/5562993377726?text=Oi! Suspeito de processamento auditivo na minha criança."
    }
  },
  "tdah-infantil-guia-completo-pais": {
    landingPages: [
      { title: "Psicólogo infantil em Anápolis", url: "/lp/psicologo-infantil-anapolis" },
      { title: "Avaliação neuropsicológica em Anápolis", url: "/lp/avaliacao-neuropsicologica-anapolis" }
    ],
    cta: {
      title: "Suspeita de TDAH?",
      text: "A avaliação neuropsicológica é essencial para diagnóstico correto. Agende na Clínica Fono Inova.",
      buttonText: "Agendar Avaliação",
      link: "https://wa.me/5562993377726?text=Oi! Suspeito de TDAH no meu filho e gostaria de avaliação."
    }
  },
  "seletividade-alimentar-infantil": {
    landingPages: [
      { title: "Terapia ocupacional em Anápolis", url: "/lp/terapia-ocupacional-anapolis" }
    ],
    cta: {
      title: "Seletividade alimentar afetando sua rotina?",
      text: "A terapia ocupacional pode ajudar. Agende uma avaliação na Clínica Fono Inova.",
      buttonText: "Agendar Avaliação",
      link: "https://wa.me/5562993377726?text=Oi! Minha criança tem seletividade alimentar."
    }
  }
};

export default RelatedLandingPages;
