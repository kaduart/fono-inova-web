/**
 * 🎯 LandingPageRegistry v1
 * Fonte única de verdade para todas as landing pages e páginas de conversão.
 * Integra: site, CRM, GMB, templates de post e sitemap.
 *
 * Regras:
 * - UMA única URL primária por intenção de busca
 * - WhatsApp padronizado em todas as fontes
 * - Páginas institucionais educam; money pages convertem
 * - Nunca canibalizar: se há primary, as demais devem linkar para ela
 */

export const WHATSAPP_PADRAO = {
  numero: "5562992013573",
  formatado: "(62) 99201-3573",
  mensagemBase: "Oi! Vi o site sobre {tema} 💚\nQuero agendar uma avaliação.",
};

export type PageIntent = "conversion" | "geo" | "education" | "institutional";

export interface LandingPageEntry {
  id: string;
  slug: string;
  url: string;
  nome: string;
  headline: string;
  categoria: string;
  intent: PageIntent;
  /** Se true, é a página principal de conversão para esse tópico */
  primary: boolean;
  /** Tópico semântico que esta página representa */
  topic: string;
  /** IDs de páginas relacionadas (para links internos) */
  relatedIds: string[];
  /** Prioridade para campanhas e posts */
  priority: "alta" | "media" | "baixa";
  /** Mensagem específica do WhatsApp */
  whatsappMessage: string;
  /** Público-alvo da página */
  publico: string;
  /** Gancho emocional principal */
  gancho: string;
}

const BASE_URL = "https://www.clinicafonoinova.com.br";

function buildUrl(slug: string): string {
  return `${BASE_URL}${slug}`;
}

function buildWhatsApp(tema: string): string {
  return WHATSAPP_PADRAO.mensagemBase.replace("{tema}", tema);
}

export const LANDING_PAGES: LandingPageEntry[] = [
  // ═══════════════════════════════════════════════════════════
  // 🏠 HOME & INSTITUCIONAIS
  // ═══════════════════════════════════════════════════════════
  {
    id: "home",
    slug: "/",
    url: buildUrl("/"),
    nome: "Clínica Fono Inova",
    headline: "Centro de Desenvolvimento Infantil em Anápolis",
    categoria: "institucional",
    intent: "institutional",
    primary: true,
    topic: "clínica infantil Anápolis",
    relatedIds: ["fonoaudiologia_anapolis", "psicologia_infantil_anapolis", "terapia_ocupacional_anapolis"],
    priority: "alta",
    whatsappMessage: buildWhatsApp("a clínica"),
    publico: "Pais e responsáveis em Anápolis",
    gancho: "Desenvolvimento infantil completo em um só lugar",
  },
  {
    id: "nossa_clinica",
    slug: "/nossa-clinica",
    url: buildUrl("/nossa-clinica"),
    nome: "Nossa Clínica",
    headline: "Conheça a Clínica Fono Inova",
    categoria: "institucional",
    intent: "institutional",
    primary: false,
    topic: "clínica infantil Anápolis",
    relatedIds: ["home", "equipe"],
    priority: "media",
    whatsappMessage: buildWhatsApp("a clínica"),
    publico: "Pais que querem conhecer a clínica",
    gancho: "Estrutura acolhedora para crianças",
  },
  {
    id: "equipe",
    slug: "/equipe",
    url: buildUrl("/equipe"),
    nome: "Equipe",
    headline: "Nossa equipe multidisciplinar",
    categoria: "institucional",
    intent: "institutional",
    primary: false,
    topic: "equipe clínica Anápolis",
    relatedIds: ["home", "nossa_clinica"],
    priority: "media",
    whatsappMessage: buildWhatsApp("a equipe"),
    publico: "Pais que querem conhecer os profissionais",
    gancho: "Especialistas dedicados ao desenvolvimento infantil",
  },
  {
    id: "abordagem_multidisciplinar",
    slug: "/abordagem-multidisciplinar",
    url: buildUrl("/abordagem-multidisciplinar"),
    nome: "Abordagem Multidisciplinar",
    headline: "Tratamento integrado para seu filho",
    categoria: "institucional",
    intent: "education",
    primary: false,
    topic: "abordagem multidisciplinar infantil",
    relatedIds: ["fonoaudiologia_anapolis", "psicologia_infantil_anapolis", "terapia_ocupacional_anapolis"],
    priority: "media",
    whatsappMessage: buildWhatsApp("abordagem multidisciplinar"),
    publico: "Pais que buscam atendimento integrado",
    gancho: "Vários especialistas trabalhando juntos",
  },
  {
    id: "faq",
    slug: "/faq",
    url: buildUrl("/faq"),
    nome: "Dúvidas Frequentes",
    headline: "Tire suas dúvidas",
    categoria: "institucional",
    intent: "education",
    primary: false,
    topic: "duvidas clinica infantil",
    relatedIds: ["home"],
    priority: "baixa",
    whatsappMessage: buildWhatsApp("duvidas"),
    publico: "Pais com dúvidas gerais",
    gancho: "Respostas claras sobre nossos atendimentos",
  },

  // ═══════════════════════════════════════════════════════════
  // 🎯 MONEY PAGES — ALTA CONVERSÃO (sem geo)
  // ═══════════════════════════════════════════════════════════
  {
    id: "fala_tardia",
    slug: "/fala-tardia",
    url: buildUrl("/fala-tardia"),
    nome: "Fala Tardia Infantil",
    headline: "Sua criança de 2 anos ainda não fala?",
    categoria: "fonoaudiologia",
    intent: "conversion",
    primary: true,
    topic: "fala tardia",
    relatedIds: ["fonoaudiologia_anapolis", "fonoaudiologia", "atraso_fala_anapolis"],
    priority: "alta",
    whatsappMessage: buildWhatsApp("fala tardia"),
    publico: "Pais de crianças 2-4 anos com atraso na fala",
    gancho: "Sua criança não fala ainda?",
  },
  {
    id: "avaliacao_autismo",
    slug: "/avaliacao-autismo-infantil",
    url: buildUrl("/avaliacao-autismo-infantil"),
    nome: "Avaliação de Autismo Infantil",
    headline: "Sinais de autismo no seu filho?",
    categoria: "psicologia",
    intent: "conversion",
    primary: true,
    topic: "autismo infantil",
    relatedIds: ["psicologia_infantil_anapolis", "tea", "autismo_anapolis"],
    priority: "alta",
    whatsappMessage: buildWhatsApp("avaliação de autismo"),
    publico: "Pais com suspeita de autismo no filho",
    gancho: "Seu filho não olha nos olhos ou não responde ao nome?",
  },
  {
    id: "dislexia_infantil",
    slug: "/dislexia-infantil",
    url: buildUrl("/dislexia-infantil"),
    nome: "Dislexia Infantil",
    headline: "Seu filho confunde letras?",
    categoria: "psicopedagogia",
    intent: "conversion",
    primary: true,
    topic: "dislexia infantil",
    relatedIds: ["dificuldade_escolar", "psicopedagogia", "dislexia_anapolis"],
    priority: "alta",
    whatsappMessage: buildWhatsApp("dislexia infantil"),
    publico: "Pais de crianças em fase de alfabetização",
    gancho: "Seu filho troca b por d?",
  },
  {
    id: "tdah_infantil",
    slug: "/tdah-infantil",
    url: buildUrl("/tdah-infantil"),
    nome: "TDAH Infantil",
    headline: "Seu filho é muito inquieto?",
    categoria: "neuropsicologia",
    intent: "conversion",
    primary: true,
    topic: "TDAH infantil",
    relatedIds: ["avaliacao_neuropsicologica", "avaliacao_neuropsicologica_anapolis", "tdah_anapolis"],
    priority: "alta",
    whatsappMessage: buildWhatsApp("TDAH infantil"),
    publico: "Pais de crianças com desatenção ou hiperatividade",
    gancho: "Seu filho não consegue parar quieto?",
  },
  {
    id: "dificuldade_escolar",
    slug: "/avaliacao-neuropsicologica-dificuldade-escolar",
    url: buildUrl("/avaliacao-neuropsicologica-dificuldade-escolar"),
    nome: "Dificuldade Escolar",
    headline: "Seu filho tem dificuldade na escola?",
    categoria: "neuropsicologia",
    intent: "conversion",
    primary: true,
    topic: "dificuldade escolar",
    relatedIds: ["dislexia_infantil", "tdah_infantil", "psicopedagogia"],
    priority: "media",
    whatsappMessage: buildWhatsApp("dificuldade escolar"),
    publico: "Pais de crianças com baixo rendimento escolar",
    gancho: "Seu filho se esforça mas as notas não melhoram?",
  },
  {
    id: "fonoaudiologia_adulto",
    slug: "/fonoaudiologia-adulto",
    url: buildUrl("/fonoaudiologia-adulto"),
    nome: "Fonoaudiologia Adulto",
    headline: "Problemas de voz ou fala?",
    categoria: "fonoaudiologia",
    intent: "conversion",
    primary: true,
    topic: "fonoaudiologia adulto",
    relatedIds: ["fonoaudiologia"],
    priority: "baixa",
    whatsappMessage: buildWhatsApp("fonoaudiologia adulto"),
    publico: "Adultos com problemas de voz ou fala",
    gancho: "Problemas de voz ou fala?",
  },

  // ═══════════════════════════════════════════════════════════
  // 🏥 PÁGINAS INSTITUCIONAIS DE ESPECIALIDADE (educam, não convertem sozinhas)
  // ═══════════════════════════════════════════════════════════
  {
    id: "fonoaudiologia",
    slug: "/fonoaudiologia",
    url: buildUrl("/fonoaudiologia"),
    nome: "Fonoaudiologia",
    headline: "Fonoaudiologia Infantil",
    categoria: "fonoaudiologia",
    intent: "education",
    primary: false,
    topic: "fonoaudiologia",
    relatedIds: ["fonoaudiologia_anapolis", "fala_tardia"],
    priority: "media",
    whatsappMessage: buildWhatsApp("fonoaudiologia"),
    publico: "Pais que querem entender a fonoaudiologia",
    gancho: "Desenvolvimento da fala e linguagem",
  },
  {
    id: "psicologia",
    slug: "/psicologia",
    url: buildUrl("/psicologia"),
    nome: "Psicologia",
    headline: "Psicologia Infantil",
    categoria: "psicologia",
    intent: "education",
    primary: false,
    topic: "psicologia infantil",
    relatedIds: ["psicologia_infantil_anapolis", "avaliacao_autismo"],
    priority: "media",
    whatsappMessage: buildWhatsApp("psicologia"),
    publico: "Pais que buscam apoio emocional para o filho",
    gancho: "Comportamento e desenvolvimento emocional",
  },
  {
    id: "terapia_ocupacional",
    slug: "/terapia-ocupacional",
    url: buildUrl("/terapia-ocupacional"),
    nome: "Terapia Ocupacional",
    headline: "Terapia Ocupacional Infantil",
    categoria: "terapia_ocupacional",
    intent: "education",
    primary: false,
    topic: "terapia ocupacional",
    relatedIds: ["terapia_ocupacional_anapolis"],
    priority: "media",
    whatsappMessage: buildWhatsApp("terapia ocupacional"),
    publico: "Pais de crianças com dificuldades motoras",
    gancho: "Autonomia e coordenação motora",
  },
  {
    id: "fisioterapia",
    slug: "/fisioterapia",
    url: buildUrl("/fisioterapia"),
    nome: "Fisioterapia",
    headline: "Fisioterapia Infantil",
    categoria: "fisioterapia",
    intent: "education",
    primary: false,
    topic: "fisioterapia pediatrica",
    relatedIds: ["fisioterapia_infantil_anapolis"],
    priority: "media",
    whatsappMessage: buildWhatsApp("fisioterapia"),
    publico: "Pais de crianças com dificuldades motoras",
    gancho: "Desenvolvimento motor e postura",
  },
  {
    id: "psicomotricidade",
    slug: "/psicomotricidade",
    url: buildUrl("/psicomotricidade"),
    nome: "Psicomotricidade",
    headline: "Psicomotricidade Infantil",
    categoria: "psicomotricidade",
    intent: "education",
    primary: false,
    topic: "psicomotricidade",
    relatedIds: ["psicomotricidade_anapolis"],
    priority: "media",
    whatsappMessage: buildWhatsApp("psicomotricidade"),
    publico: "Pais de crianças em fase escolar",
    gancho: "Corpo, movimento e aprendizagem",
  },
  {
    id: "psicopedagogia",
    slug: "/psicopedagogia",
    url: buildUrl("/psicopedagogia"),
    nome: "Psicopedagogia",
    headline: "Psicopedagogia Clínica",
    categoria: "psicopedagogia",
    intent: "education",
    primary: false,
    topic: "psicopedagogia",
    relatedIds: ["dislexia_infantil", "dificuldade_escolar"],
    priority: "media",
    whatsappMessage: buildWhatsApp("psicopedagogia"),
    publico: "Pais de crianças com dificuldades escolares",
    gancho: "Aprendizagem escolar de forma eficiente",
  },
  {
    id: "neuropsicologia",
    slug: "/avaliacao-neuropsicologica",
    url: buildUrl("/avaliacao-neuropsicologica"),
    nome: "Avaliação Neuropsicológica",
    headline: "Avaliação Neuropsicológica Infantil",
    categoria: "neuropsicologia",
    intent: "education",
    primary: false,
    topic: "avaliação neuropsicológica",
    relatedIds: ["avaliacao_neuropsicologica_anapolis", "tdah_infantil"],
    priority: "media",
    whatsappMessage: buildWhatsApp("avaliação neuropsicológica"),
    publico: "Pais que buscam diagnóstico cognitivo",
    gancho: "Memória, atenção e funções executivas",
  },
  {
    id: "freio_lingual",
    slug: "/freio-lingual",
    url: buildUrl("/freio-lingual"),
    nome: "Freio Lingual",
    headline: "Freio Lingual em Bebês",
    categoria: "fonoaudiologia",
    intent: "education",
    primary: false,
    topic: "freio lingual",
    relatedIds: ["teste_da_linguinha_anapolis"],
    priority: "media",
    whatsappMessage: buildWhatsApp("freio lingual"),
    publico: "Mães de bebês com dificuldade para amamentar",
    gancho: "Seu bebê tem dificuldade para mamar?",
  },
  {
    id: "musicoterapia",
    slug: "/musicoterapia",
    url: buildUrl("/musicoterapia"),
    nome: "Musicoterapia",
    headline: "Musicoterapia Infantil",
    categoria: "musicoterapia",
    intent: "education",
    primary: false,
    topic: "musicoterapia",
    relatedIds: ["avaliacao_autismo"],
    priority: "baixa",
    whatsappMessage: buildWhatsApp("musicoterapia"),
    publico: "Pais de crianças com dificuldades de comunicação",
    gancho: "Comunicação através da música",
  },

  // ═══════════════════════════════════════════════════════════
  // 📍 SEO LOCAL — GEO PAGES (money pages locais)
  // ═══════════════════════════════════════════════════════════
  {
    id: "fonoaudiologia_anapolis",
    slug: "/fonoaudiologia-anapolis",
    url: buildUrl("/fonoaudiologia-anapolis"),
    nome: "Fonoaudiologia Infantil em Anápolis",
    headline: "Fonoaudiologia Infantil em Anápolis",
    categoria: "fonoaudiologia",
    intent: "geo",
    primary: true,
    topic: "fonoaudiologia infantil Anápolis",
    relatedIds: ["fala_tardia", "atraso_fala_anapolis", "fonoaudiologia"],
    priority: "alta",
    whatsappMessage: buildWhatsApp("fonoaudiologia infantil em Anápolis"),
    publico: "Pais de Anápolis com crianças com dificuldades de fala",
    gancho: "Seu filho tem dificuldade para falar em Anápolis?",
  },
  {
    id: "psicologia_infantil_anapolis",
    slug: "/psicologia-infantil-anapolis",
    url: buildUrl("/psicologia-infantil-anapolis"),
    nome: "Psicologia Infantil em Anápolis",
    headline: "Psicologia Infantil em Anápolis",
    categoria: "psicologia",
    intent: "geo",
    primary: true,
    topic: "psicologia infantil Anápolis",
    relatedIds: ["avaliacao_autismo", "autismo_anapolis", "psicologia"],
    priority: "alta",
    whatsappMessage: buildWhatsApp("psicologia infantil em Anápolis"),
    publico: "Pais de Anápolis com dificuldades emocionais/comportamentais",
    gancho: "Seu filho apresenta dificuldades emocionais em Anápolis?",
  },
  {
    id: "terapia_ocupacional_anapolis",
    slug: "/terapia-ocupacional-anapolis",
    url: buildUrl("/terapia-ocupacional-anapolis"),
    nome: "Terapia Ocupacional em Anápolis",
    headline: "Terapia Ocupacional em Anápolis",
    categoria: "terapia_ocupacional",
    intent: "geo",
    primary: true,
    topic: "terapia ocupacional infantil Anápolis",
    relatedIds: ["terapia_ocupacional", "fisioterapia_infantil_anapolis"],
    priority: "alta",
    whatsappMessage: buildWhatsApp("terapia ocupacional em Anápolis"),
    publico: "Pais de Anápolis com crianças com dificuldades motoras",
    gancho: "Seu filho tem dificuldade de coordenação em Anápolis?",
  },
  {
    id: "psicomotricidade_anapolis",
    slug: "/psicomotricidade-anapolis",
    url: buildUrl("/psicomotricidade-anapolis"),
    nome: "Psicomotricidade Infantil em Anápolis",
    headline: "Psicomotricidade Infantil em Anápolis",
    categoria: "psicomotricidade",
    intent: "geo",
    primary: true,
    topic: "psicomotricidade infantil Anápolis",
    relatedIds: ["psicomotricidade", "fonoaudiologia_anapolis"],
    priority: "alta",
    whatsappMessage: buildWhatsApp("psicomotricidade infantil em Anápolis"),
    publico: "Pais de Anápolis com crianças em fase escolar",
    gancho: "Seu filho é desatento ou troca letras em Anápolis?",
  },
  {
    id: "fisioterapia_infantil_anapolis",
    slug: "/fisioterapia-infantil-anapolis",
    url: buildUrl("/fisioterapia-infantil-anapolis"),
    nome: "Fisioterapia Infantil em Anápolis",
    headline: "Fisioterapia Infantil em Anápolis",
    categoria: "fisioterapia",
    intent: "geo",
    primary: true,
    topic: "fisioterapia infantil Anápolis",
    relatedIds: ["fisioterapia", "terapia_ocupacional_anapolis"],
    priority: "alta",
    whatsappMessage: buildWhatsApp("fisioterapia infantil em Anápolis"),
    publico: "Pais de Anápolis com crianças com dificuldades motoras",
    gancho: "Seu filho tem dificuldade de postura ou movimento em Anápolis?",
  },
  {
    id: "teste_da_linguinha_anapolis",
    slug: "/teste-da-linguinha-anapolis",
    url: buildUrl("/teste-da-linguinha-anapolis"),
    nome: "Teste da Linguinha em Anápolis",
    headline: "Teste da Linguinha em Anápolis GO",
    categoria: "fonoaudiologia",
    intent: "geo",
    primary: true,
    topic: "teste da linguinha Anápolis",
    relatedIds: ["freio_lingual", "fala_tardia", "fonoaudiologia_anapolis"],
    priority: "alta",
    whatsappMessage: buildWhatsApp("Teste da Linguinha em Anápolis"),
    publico: "Mães de bebês e crianças em Anápolis com suspeita de freio lingual",
    gancho: "Seu bebê tem dificuldade para mamar ou língua presa em Anápolis?",
  },
  {
    id: "avaliacao_neuropsicologica_anapolis",
    slug: "/avaliacao-neuropsicologica-anapolis",
    url: buildUrl("/avaliacao-neuropsicologica-anapolis"),
    nome: "Avaliação Neuropsicológica em Anápolis",
    headline: "Avaliação Neuropsicológica em Anápolis",
    categoria: "neuropsicologia",
    intent: "geo",
    primary: true,
    topic: "avaliação neuropsicológica infantil Anápolis",
    relatedIds: ["neuropsicologia", "tdah_infantil", "tdah_anapolis"],
    priority: "alta",
    whatsappMessage: buildWhatsApp("avaliação neuropsicológica em Anápolis"),
    publico: "Pais de Anápolis com dificuldades de aprendizagem ou atenção",
    gancho: "Seu filho tem dificuldade de atenção ou aprendizagem em Anápolis?",
  },
  {
    id: "neuropediatra_anapolis",
    slug: "/neuropediatra-anapolis",
    url: buildUrl("/neuropediatra-anapolis"),
    nome: "Neuropediatra em Anápolis",
    headline: "Neuropediatra em Anápolis",
    categoria: "neuropediatria",
    intent: "geo",
    primary: true,
    topic: "neuropediatra Anápolis",
    relatedIds: ["avaliacao_neuropsicologica_anapolis", "tdah_anapolis", "autismo_anapolis"],
    priority: "alta",
    whatsappMessage: buildWhatsApp("neuropediatra em Anápolis"),
    publico: "Pais de Anápolis que buscam avaliação neurológica",
    gancho: "Você busca neuropediatra em Anápolis?",
  },

  // ═══════════════════════════════════════════════════════════
  // 🔥 LONG-TAIL LOCAL — INTENÇÃO EMOCIONAL + GEO
  // ═══════════════════════════════════════════════════════════
  {
    id: "fala_tardia_anapolis",
    slug: "/fala-tardia-anapolis",
    url: buildUrl("/fala-tardia-anapolis"),
    nome: "Fala Tardia em Anápolis",
    headline: "Criança não fala em Anápolis?",
    categoria: "fonoaudiologia",
    intent: "geo",
    primary: false,
    topic: "fala tardia Anápolis",
    relatedIds: ["fala_tardia", "fonoaudiologia_anapolis"],
    priority: "media",
    whatsappMessage: buildWhatsApp("fala tardia em Anápolis"),
    publico: "Pais de Anápolis com crianças que não falam",
    gancho: "Sua criança de 2 anos não fala em Anápolis?",
  },
  {
    id: "autismo_anapolis",
    slug: "/autismo-anapolis",
    url: buildUrl("/autismo-anapolis"),
    nome: "Autismo em Anápolis",
    headline: "Sinais de autismo em Anápolis",
    categoria: "psicologia",
    intent: "geo",
    primary: false,
    topic: "autismo Anápolis",
    relatedIds: ["avaliacao_autismo", "psicologia_infantil_anapolis"],
    priority: "media",
    whatsappMessage: buildWhatsApp("autismo em Anápolis"),
    publico: "Pais de Anápolis com suspeita de autismo",
    gancho: "Você suspeita de autismo no seu filho em Anápolis?",
  },
  {
    id: "tdah_anapolis",
    slug: "/tdah-anapolis",
    url: buildUrl("/tdah-anapolis"),
    nome: "TDAH em Anápolis",
    headline: "TDAH infantil em Anápolis",
    categoria: "neuropsicologia",
    intent: "geo",
    primary: false,
    topic: "TDAH Anápolis",
    relatedIds: ["tdah_infantil", "avaliacao_neuropsicologica_anapolis"],
    priority: "media",
    whatsappMessage: buildWhatsApp("TDAH em Anápolis"),
    publico: "Pais de Anápolis com crianças com TDAH",
    gancho: "Seu filho é muito inquieto em Anápolis?",
  },
  {
    id: "dislexia_anapolis",
    slug: "/dislexia-anapolis",
    url: buildUrl("/dislexia-anapolis"),
    nome: "Dislexia em Anápolis",
    headline: "Dislexia infantil em Anápolis",
    categoria: "psicopedagogia",
    intent: "geo",
    primary: false,
    topic: "dislexia Anápolis",
    relatedIds: ["dislexia_infantil", "dificuldade_escolar"],
    priority: "media",
    whatsappMessage: buildWhatsApp("dislexia em Anápolis"),
    publico: "Pais de Anápolis com crianças com dislexia",
    gancho: "Seu filho troca letras em Anápolis?",
  },
  {
    id: "seletividade_alimentar_anapolis",
    slug: "/seletividade-alimentar-anapolis",
    url: buildUrl("/seletividade-alimentar-anapolis"),
    nome: "Seletividade Alimentar em Anápolis",
    headline: "Criança com seletividade alimentar em Anápolis",
    categoria: "terapia_ocupacional",
    intent: "geo",
    primary: false,
    topic: "seletividade alimentar Anápolis",
    relatedIds: ["terapia_ocupacional_anapolis"],
    priority: "media",
    whatsappMessage: buildWhatsApp("seletividade alimentar em Anápolis"),
    publico: "Pais de Anápolis com crianças que não comem bem",
    gancho: "Seu filho recusa alimentos em Anápolis?",
  },

  // ═══════════════════════════════════════════════════════════
  // 🎯 LANDING PAGES DE FUNIL ADICIONAIS
  // ═══════════════════════════════════════════════════════════
  {
    id: "sindrome_de_down",
    slug: "/sindrome-de-down",
    url: buildUrl("/sindrome-de-down"),
    nome: "Síndrome de Down",
    headline: "Atendimento para Síndrome de Down",
    categoria: "multidisciplinar",
    intent: "conversion",
    primary: true,
    topic: "síndrome de down",
    relatedIds: ["fonoaudiologia", "fisioterapia", "terapia_ocupacional"],
    priority: "media",
    whatsappMessage: buildWhatsApp("Síndrome de Down"),
    publico: "Pais de crianças com Síndrome de Down",
    gancho: "Desenvolvimento integral para crianças com Síndrome de Down",
  },
  {
    id: "prematuridade_desenvolvimento",
    slug: "/prematuridade-desenvolvimento",
    url: buildUrl("/prematuridade-desenvolvimento"),
    nome: "Prematuridade e Desenvolvimento",
    headline: "Acompanhamento de prematuros",
    categoria: "multidisciplinar",
    intent: "conversion",
    primary: true,
    topic: "prematuridade desenvolvimento",
    relatedIds: ["fisioterapia", "fonoaudiologia", "terapia_ocupacional"],
    priority: "media",
    whatsappMessage: buildWhatsApp("acompanhamento de prematuros"),
    publico: "Pais de bebês prematuros",
    gancho: "Acompanhamento especializado para prematuros",
  },
  {
    id: "comportamento_infantil_anapolis",
    slug: "/comportamento-infantil-anapolis",
    url: buildUrl("/comportamento-infantil-anapolis"),
    nome: "Comportamento Infantil em Anápolis",
    headline: "Comportamento infantil em Anápolis",
    categoria: "psicologia",
    intent: "geo",
    primary: false,
    topic: "comportamento infantil Anápolis",
    relatedIds: ["psicologia_infantil_anapolis", "tdah_anapolis"],
    priority: "media",
    whatsappMessage: buildWhatsApp("comportamento infantil em Anápolis"),
    publico: "Pais de Anápolis com dificuldades comportamentais",
    gancho: "Seu filho tem comportamento desafiador em Anápolis?",
  },
  {
    id: "neuropediatria",
    slug: "/neuropediatra-anapolis",
    url: buildUrl("/neuropediatra-anapolis"),
    nome: "Neuropediatra Anápolis",
    headline: "Neuropediatra em Anápolis",
    categoria: "neuropediatria",
    intent: "geo",
    primary: false,
    topic: "neuropediatra Anápolis",
    relatedIds: ["neuropediatra_anapolis", "avaliacao_neuropsicologica_anapolis"],
    priority: "alta",
    whatsappMessage: buildWhatsApp("neuropediatra em Anápolis"),
    publico: "Pais de Anápolis que buscam neuropediatra",
    gancho: "Você busca neuropediatra em Anápolis?",
  },
  {
    id: "tea",
    slug: "/tea",
    url: buildUrl("/tea"),
    nome: "TEA",
    headline: "Transtorno do Espectro Autista",
    categoria: "psicologia",
    intent: "education",
    primary: false,
    topic: "TEA",
    relatedIds: ["avaliacao_autismo", "autismo_anapolis"],
    priority: "media",
    whatsappMessage: buildWhatsApp("TEA"),
    publico: "Pais que buscam informações sobre TEA",
    gancho: "Entenda o TEA e como podemos ajudar",
  },
  {
    id: "tdah_avaliacao",
    slug: "/avaliacao-tdah-anapolis",
    url: buildUrl("/avaliacao-tdah-anapolis"),
    nome: "Avaliação TDAH Anápolis",
    headline: "Avaliação de TDAH em Anápolis",
    categoria: "neuropsicologia",
    intent: "conversion",
    primary: false,
    topic: "avaliação TDAH Anápolis",
    relatedIds: ["tdah_infantil", "tdah_anapolis", "avaliacao_neuropsicologica_anapolis"],
    priority: "media",
    whatsappMessage: buildWhatsApp("avaliação de TDAH em Anápolis"),
    publico: "Pais de Anápolis com suspeita de TDAH",
    gancho: "Avaliação completa de TDAH em Anápolis",
  },
  {
    id: "avaliacao_infantil",
    slug: "/avaliacao-infantil",
    url: buildUrl("/avaliacao-infantil"),
    nome: "Avaliação Infantil",
    headline: "Avaliação Infantil em Anápolis",
    categoria: "multidisciplinar",
    intent: "conversion",
    primary: false,
    topic: "avaliação infantil Anápolis",
    relatedIds: ["fonoaudiologia_anapolis", "psicologia_infantil_anapolis", "terapia_ocupacional_anapolis"],
    priority: "alta",
    whatsappMessage: buildWhatsApp("avaliação infantil"),
    publico: "Pais que não sabem qual especialidade procurar",
    gancho: "Seu filho tem dificuldade para falar ou se comportar?",
  },
];

// ═══════════════════════════════════════════════════════════
// 🔧 HELPERS
// ═══════════════════════════════════════════════════════════

export function getPageById(id: string): LandingPageEntry | undefined {
  return LANDING_PAGES.find((page) => page.id === id);
}

export function getPageBySlug(slug: string): LandingPageEntry | undefined {
  return LANDING_PAGES.find((page) => page.slug === slug);
}

export function getPrimaryPages(): LandingPageEntry[] {
  return LANDING_PAGES.filter((page) => page.primary);
}

export function getPagesByIntent(intent: PageIntent): LandingPageEntry[] {
  return LANDING_PAGES.filter((page) => page.intent === intent);
}

export function getPagesByCategory(categoria: string): LandingPageEntry[] {
  return LANDING_PAGES.filter((page) => page.categoria === categoria);
}

export function getRelatedPages(id: string): LandingPageEntry[] {
  const page = getPageById(id);
  if (!page) return [];
  return page.relatedIds.map((relatedId) => getPageById(relatedId)).filter(Boolean) as LandingPageEntry[];
}

export function getWhatsAppLink(tema: string): string {
  const message = encodeURIComponent(
    WHATSAPP_PADRAO.mensagemBase.replace("{tema}", tema)
  );
  return `https://wa.me/${WHATSAPP_PADRAO.numero}?text=${message}`;
}

export function getPageWhatsAppLink(id: string): string {
  const page = getPageById(id);
  if (!page) return getWhatsAppLink("a clínica");
  const message = encodeURIComponent(page.whatsappMessage);
  return `https://wa.me/${WHATSAPP_PADRAO.numero}?text=${message}`;
}

export function getAllSlugs(): string[] {
  return LANDING_PAGES.map((page) => page.slug);
}

export default LANDING_PAGES;
