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
      const message = "Oi! Vi o site de vocês e fiquei com algumas dúvidas.\n\nPode me explicar melhor como funciona o atendimento?";
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
      title: "Com dúvidas sobre o desenvolvimento da fala do seu filho?",
      text: "Na Clínica Fono Inova em Anápolis, realizamos avaliação fonoaudiológica completa. Agende uma consulta e descubra como podemos ajudar.",
      buttonText: "Agendar Avaliação no WhatsApp",
      link: "https://wa.me/5562992013573?text=Oi! Vi no site sobre fala tardia e me identifiquei.\n\nMeu filho(a) tem atraso na fala. Pode me explicar como funciona a avaliação?"
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
      link: "https://wa.me/5562992013573?text=Oi! Vi no site sobre avaliação de autismo e fiquei com algumas dúvidas.\n\nTenho percebido alguns comportamentos no meu filho(a). Pode me explicar como funciona a avaliação?"
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
      link: "https://wa.me/5562992013573?text=Oi! Vi no site sobre fala tardia e me identifiquei.\n\nMeu filho(a) tem atraso na fala. Pode me explicar como funciona a avaliação?"
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
      link: "https://wa.me/5562992013573?text=Oi! Vi no site sobre fala tardia e me identifiquei.\n\nSuspeito de processamento auditivo na minha criança. Pode me explicar como funciona a avaliação?"
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
      link: "https://wa.me/5562992013573?text=Oi! Vi no site sobre dificuldade de atenção e me chamou atenção.\n\nSuspeito de TDAH no meu filho(a). Pode me explicar como funciona a avaliação?"
    }
  },
  "seletividade-alimentar-infantil": {
    landingPages: [
      { title: "Terapia ocupacional em Anápolis", url: "/terapia-ocupacional-anapolis" },
      { title: "Fonoaudiologia em Anápolis", url: "/fonoaudiologia-anapolis" }
    ],
    cta: {
      title: "Seletividade alimentar afetando sua rotina?",
      text: "A terapia ocupacional pode ajudar. Agende uma avaliação na Clínica Fono Inova em Anápolis.",
      buttonText: "Agendar Avaliação",
      link: "https://wa.me/5562992013573?text=Oi! Vi no site de vocês e gostaria de entender melhor.\n\nMinha criança tem seletividade alimentar. Pode me explicar como vocês podem ajudar?"
    }
  },
  "atividades-desenvolvimento-motor": {
    landingPages: [
      { title: "Fisioterapia infantil em Anápolis", url: "/fisioterapia-infantil-anapolis" },
      { title: "Psicomotricidade em Anápolis", url: "/psicomotricidade-anapolis" },
      { title: "Terapia Ocupacional em Anápolis", url: "/terapia-ocupacional-anapolis" }
    ],
    cta: {
      title: "Querendo entender o desenvolvimento motor do seu filho?",
      text: "Avaliação especializada em fisioterapia e psicomotricidade na Clínica Fono Inova em Anápolis.",
      buttonText: "Agendar Avaliação",
      link: "https://wa.me/5562992013573?text=Oi! Vi o artigo sobre desenvolvimento motor e me identifiquei.\n\nGostaria de agendar uma avaliação para meu filho(a)."
    }
  },
  "faq-desenvolvimento-infantil": {
    landingPages: [
      { title: "Fonoaudiologia em Anápolis", url: "/fonoaudiologia-anapolis" },
      { title: "Psicologia infantil em Anápolis", url: "/psicologia-infantil-anapolis" },
      { title: "Avaliação neuropsicológica em Anápolis", url: "/avaliacao-neuropsicologica-anapolis" }
    ],
    cta: {
      title: "Ainda tem dúvidas sobre desenvolvimento infantil?",
      text: "Nossa equipe multidisciplinar em Anápolis pode ajudar. Entre em contato pelo WhatsApp.",
      buttonText: "Falar com Especialista",
      link: "https://wa.me/5562992013573?text=Oi! Li o FAQ de vocês e ainda tenho algumas dúvidas.\n\nPode me ajudar?"
    }
  },
  "importancia-orientacao-parental": {
    landingPages: [
      { title: "Psicologia infantil em Anápolis", url: "/psicologia-infantil-anapolis" },
      { title: "Avaliação neuropsicológica em Anápolis", url: "/avaliacao-neuropsicologica-anapolis" }
    ],
    cta: {
      title: "Quer fortalecer sua relação com seu filho?",
      text: "A orientação parental pode transformar a dinâmica familiar. Agende na Clínica Fono Inova.",
      buttonText: "Agendar Orientação",
      link: "https://wa.me/5562992013573?text=Oi! Vi o artigo sobre orientação parental e me interessei.\n\nGostaria de saber mais sobre como funciona."
    }
  },
  "importancia-psicomotricidade-desenvolvimento-infantil": {
    landingPages: [
      { title: "Psicomotricidade em Anápolis", url: "/psicomotricidade-anapolis" },
      { title: "Fisioterapia infantil em Anápolis", url: "/fisioterapia-infantil-anapolis" }
    ],
    cta: {
      title: "Psicomotricidade fortalece o aprendizado",
      text: "Avaliação psicomotora completa na Clínica Fono Inova em Anápolis. Agende agora.",
      buttonText: "Agendar Avaliação",
      link: "https://wa.me/5562992013573?text=Oi! Vi o artigo sobre psicomotricidade e quero saber mais.\n\nComo funciona a avaliação?"
    }
  },
  "psicopedagogia-alem-das-dificuldades-escolares": {
    landingPages: [
      { title: "Avaliação neuropsicológica em Anápolis", url: "/avaliacao-neuropsicologica-anapolis" },
      { title: "Psicologia infantil em Anápolis", url: "/psicologia-infantil-anapolis" }
    ],
    cta: {
      title: "Seu filho tem dificuldades na escola?",
      text: "A psicopedagogia identifica como seu filho aprende melhor. Avaliação em Anápolis.",
      buttonText: "Agendar Avaliação",
      link: "https://wa.me/5562992013573?text=Oi! Vi o artigo sobre psicopedagogia e me identifiquei.\n\nMeu filho tem dificuldades escolares."
    }
  },
  "musicoterapia-e-tea-conexoes-atraves-do-som": {
    landingPages: [
      { title: "Fonoaudiologia em Anápolis", url: "/fonoaudiologia-anapolis" },
      { title: "Psicologia infantil em Anápolis", url: "/psicologia-infantil-anapolis" }
    ],
    cta: {
      title: "Música pode ajudar seu filho autista",
      text: "Conheça nossas terapias para crianças no espectro autista em Anápolis.",
      buttonText: "Conhecer Terapias",
      link: "https://wa.me/5562992013573?text=Oi! Vi o artigo sobre musicoterapia e TEA.\n\nGostaria de saber mais sobre as terapias para autismo."
    }
  },
  "bebe-nao-fala": {
    landingPages: [
      { title: "Fonoaudiologia em Anápolis", url: "/fonoaudiologia-anapolis" },
      { title: "Teste da Linguinha em Anápolis", url: "/teste-da-linguinha-anapolis" }
    ],
    cta: {
      title: "Gostaria de saber mais sobre a fala do seu bebê?",
      text: "Avaliação fonoaudiológica especializada para bebês na Clínica Fono Inova.",
      buttonText: "Agendar Avaliação",
      link: "https://wa.me/5562992013573?text=Oi! Vi o artigo sobre bebê que não fala.\n\nMeu bebê tem atraso na fala."
    }
  },
  "como-estimular-fala-crianca": {
    landingPages: [
      { title: "Fonoaudiologia em Anápolis", url: "/fonoaudiologia-anapolis" },
      { title: "Criança de 2 anos não fala?", url: "/artigos/fala-tardia-criancas-quando-preocupar" }
    ],
    cta: {
      title: "Dicas ajudam, mas às vezes precisa de mais",
      text: "Se seu filho tem atraso na fala, a fonoaudiologia pode acelerar o desenvolvimento.",
      buttonText: "Agendar Avaliação",
      link: "https://wa.me/5562992013573?text=Oi! Vi o artigo sobre estimular a fala.\n\nMeu filho tem atraso. Preciso de ajuda profissional."
    }
  },
  "fala-tardia-causas": {
    landingPages: [
      { title: "Fonoaudiologia em Anápolis", url: "/fonoaudiologia-anapolis" },
      { title: "Teste da Linguinha em Anápolis", url: "/teste-da-linguinha-anapolis" }
    ],
    cta: {
      title: "Descubra a causa do atraso na fala",
      text: "Avaliação completa na Clínica Fono Inova para identificar e tratar a fala tardia.",
      buttonText: "Agendar Avaliação",
      link: "https://wa.me/5562992013573?text=Oi! Vi o artigo sobre causas da fala tardia.\n\nQuero agendar uma avaliação."
    }
  }
};

export default RelatedLandingPages;
