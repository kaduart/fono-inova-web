/**
 * Estruturas SEO completas para todas as especialidades
 * Seguindo padrão: H1, H2s (5-8), H3s (2-4 por H2), Termos Relacionados, FAQ
 */

export interface SEOH3 {
  title: string;
  content?: string;
}

export interface SEOH2 {
  title: string;
  h3s: SEOH3[];
  relatedTerms: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SEOStructure {
  h1: string;
  h2Sections: SEOH2[];
  faq: FAQItem[];
}

// ============================================
// 1. FONOAUDIOLOGIA INFANTIL
// ============================================
export const fonoaudiologiaSEO: SEOStructure = {
  h1: "Fonoaudiologia Infantil em Anápolis",
  h2Sections: [
    {
      title: "Conceito Básico",
      h3s: [
        { title: "Definição da fonoaudiologia infantil", content: "Área especializada que avalia e trata distúrbios da comunicação, fala, linguagem, voz e audição em crianças." },
        { title: "Importância do desenvolvimento da fala", content: "A fala é fundamental para a interação social, aprendizagem escolar e desenvolvimento cognitivo da criança." },
        { title: "Diferença entre fala e linguagem", content: "Fala é a expressão oral das palavras; linguagem é o sistema simbólico que inclui compreensão, expressão e comunicação." },
      ],
      relatedTerms: ["articulação", "fonema", "linguagem receptiva", "linguagem expressiva", "desenvolvimento comunicativo"],
    },
    {
      title: "Principais Distúrbios",
      h3s: [
        { title: "Atraso na fala", content: "Criança que não apresenta o vocabulário esperado para sua faixa etária, dificultando a comunicação." },
        { title: "Distúrbios de linguagem", content: "Incluem dificuldades de compreensão, expressão, organização das ideias e uso social da linguagem." },
        { title: "Apraxia de fala infantil", content: "Transtorno motor da fala onde a criança tem dificuldade para programar os movimentos da articulação." },
        { title: "Fonológico e articulatório", content: "Erros na produção dos sons da fala que podem afetar a inteligibilidade da comunicação." },
      ],
      relatedTerms: ["disartria", "gagueira", "dislexia", "fonológica", "déficit auditivo"],
    },
    {
      title: "Avaliação e Diagnóstico",
      h3s: [
        { title: "Testes padronizados", content: "Instrumentos validados para avaliar o desenvolvimento da linguagem comparando com a faixa etária." },
        { title: "Observação clínica", content: "Avaliação do comportamento comunicativo em situações lúdicas e estruturadas." },
        { title: "Registro de histórico familiar", content: "Análise de fatores hereditários e histórico de desenvolvimento da criança." },
      ],
      relatedTerms: ["protocolo diagnóstico", "triagem auditiva", "escala de desenvolvimento", "avaliação funcional", "análise fonológica"],
    },
    {
      title: "Intervenção e Tratamento",
      h3s: [
        { title: "Terapia individual", content: "Atendimento personalizado focado nas necessidades específicas de cada criança." },
        { title: "Estratégias lúdicas", content: "Uso de jogos, brincadeiras e atividades motivadoras durante as sessões terapêuticas." },
        { title: "Envolvimento da família", content: "Orientação aos pais para estimulação da linguagem no ambiente familiar." },
      ],
      relatedTerms: ["exercícios de fala", "reforço positivo", "estimulação auditiva", "plano terapêutico", "atividades em casa"],
    },
    {
      title: "Aplicações Práticas",
      h3s: [
        { title: "Adaptação escolar", content: "Intervenção para facilitar a participação da criança nas atividades educacionais." },
        { title: "Rotina em casa", content: "Estratégias para estimular a comunicação durante as atividades diárias familiares." },
        { title: "Recursos complementares", content: "Uso de aplicativos, materiais visuais e recursos tecnológicos na terapia." },
      ],
      relatedTerms: ["material visual", "jogos educativos", "suporte pedagógico", "acompanhamento interdisciplinar", "atividades motoras"],
    },
    {
      title: "Tecnologias e Recursos",
      h3s: [
        { title: "Apps de linguagem", content: "Aplicativos desenvolvidos para estimular o desenvolvimento da fala e linguagem." },
        { title: "Softwares de avaliação", content: "Ferramentas digitais para análise e acompanhamento do progresso terapêutico." },
        { title: "Recursos audiovisuais", content: "Vídeos, músicas e material multimídia usados na terapia fonoaudiológica." },
      ],
      relatedTerms: ["tablet educativo", "monitoramento remoto", "realidade aumentada", "plataforma clínica", "jogos digitais"],
    },
    {
      title: "Prevenção e Educação",
      h3s: [
        { title: "Dicas para pais", content: "Orientações sobre como estimular a linguagem desde o nascimento." },
        { title: "Programas escolares preventivos", content: "Triagens e ações de prevenção em instituições de ensino." },
        { title: "Sinais de alerta", content: "Indicadores que mostram necessidade de avaliação fonoaudiológica." },
      ],
      relatedTerms: ["triagem precoce", "orientação parental", "estímulo em casa", "acompanhamento contínuo", "prevenção"],
    },
  ],
  faq: [
    { question: "Qual a idade ideal para iniciar avaliação fonoaudiológica?", answer: "A avaliação pode ser feita a partir dos 12 meses se houver suspeita de atraso. O ideal é buscar ajuda assim que os pais notarem que a criança não está falando conforme a expectativa para a idade." },
    { question: "Quanto tempo dura o tratamento típico?", answer: "O tempo varia conforme o diagnóstico. Casos leves podem evoluir em 3-6 meses, enquanto condições mais complexas podem necessitar de 12 meses ou mais de acompanhamento." },
    { question: "Como estimular a fala em casa de forma correta?", answer: "Fale muito com seu filho, leia livros, cante músicas, evite telas, incentive a socialização com outras crianças e repita as palavras de forma clara e lúdica." },
    { question: "O que diferencia a fonoaudiologia infantil de outras especialidades?", answer: "A fonoaudiologia infantil foca especificamente no desenvolvimento da comunicação, diferindo da psicologia (aspectos emocionais) e terapia ocupacional (aspectos motores e sensoriais)." },
  ],
};

// ============================================
// 2. PSICOLOGIA INFANTIL
// ============================================
export const psicologiaSEO: SEOStructure = {
  h1: "Psicologia Infantil em Anápolis",
  h2Sections: [
    {
      title: "Conceito Básico",
      h3s: [
        { title: "Definição da psicologia infantil", content: "Especialidade que estuda e intervém no desenvolvimento emocional, comportamental e mental de crianças e adolescentes." },
        { title: "Desenvolvimento emocional", content: "Processo de construção das emoções, regulação afetiva e inteligência emocional na infância." },
        { title: "Importância da intervenção precoce", content: "Identificar e tratar dificuldades no início da vida previne problemas mais graves na adolescência e vida adulta." },
      ],
      relatedTerms: ["desenvolvimento cognitivo", "saúde mental infantil", "bem-estar emocional", "comportamento infantil", "psicoterapia"],
    },
    {
      title: "Principais Condições",
      h3s: [
        { title: "TDAH", content: "Transtorno de Déficit de Atenção e Hiperatividade caracterizado por desatenção, hiperatividade e impulsividade." },
        { title: "Transtornos de ansiedade", content: "Incluem ansiedade generalizada, fobias, transtorno de ansiedade de separação e TOC infantil." },
        { title: "Autismo", content: "Transtorno do Espectro Autista (TEA) que afeta a comunicação, interação social e comportamento." },
        { title: "Depressão infantil", content: "Tristeza persistente, perda de interesse em atividades e alterações no sono e apetite em crianças." },
      ],
      relatedTerms: ["diagnóstico diferencial", "avaliação comportamental", "transtorno de aprendizagem", "regulação emocional", "intolerância à frustração"],
    },
    {
      title: "Avaliação Psicológica",
      h3s: [
        { title: "Entrevista com os pais", content: "Coleta de histórico de desenvolvimento, comportamento e dinâmica familiar." },
        { title: "Testes psicológicos", content: "Aplicação de instrumentos padronizados para avaliar cognição, emoções e comportamento." },
        { title: "Observação comportamental", content: "Análise do comportamento da criança em diferentes contextos e situações." },
      ],
      relatedTerms: ["anamnese", "teste projetivo", "escala comportamental", "avaliação neuropsicológica", "laudo psicológico"],
    },
    {
      title: "Intervenção Terapêutica",
      h3s: [
        { title: "Terapia cognitivo-comportamental", content: "Abordagem focada em modificar pensamentos e comportamentos disfuncionais." },
        { title: "Psicoterapia infantil", content: "Uso de jogos, desenhos e brincadeiras como ferramentas terapêuticas com crianças." },
        { title: "Orientação parental", content: "Acompanhamento dos pais para melhorar a relação e o manejo comportamental em casa." },
      ],
      relatedTerms: ["reestruturação cognitiva", "técnicas comportamentais", "jogo terapêutico", "mediação familiar", "regras e limites"],
    },
    {
      title: "Aplicações no Cotidiano",
      h3s: [
        { title: "Adaptação escolar", content: "Estratégias para melhorar o desempenho e comportamento na escola." },
        { title: "Rotina familiar", content: "Organização da rotina doméstica para promover bem-estar emocional da criança." },
        { title: "Integração social", content: "Desenvolvimento de habilidades sociais para interação com pares." },
      ],
      relatedTerms: ["inclusão escolar", "habilidades sociais", "inteligência emocional", "autonomia", "resiliência"],
    },
    {
      title: "Recursos Terapêuticos",
      h3s: [
        { title: "Brinquedos terapêuticos", content: "Uso lúdico de bonecas, carrinhos, areia e material de desenho na terapia." },
        { title: "Tecnologia assistiva", content: "Aplicativos e jogos digitais para desenvolvimento emocional e cognitivo." },
        { title: "Material de expressão", content: "Pintura, modelagem e atividades artísticas como forma de expressão emocional." },
      ],
      relatedTerms: ["caixa de areia", "bonecas familiares", "desenho terapêutico", "musicoterapia", "psicomotricidade relacional"],
    },
    {
      title: "Prevenção e Promoção",
      h3s: [
        { title: "Educação emocional", content: "Ensino de identificação e gestão das emoções desde a infância." },
        { title: "Programas escolares", content: "Intervenções preventivas em instituições de ensino." },
        { title: "Desenvolvimento parental", content: "Capacitação de pais para educação saudável e positiva." },
      ],
      relatedTerms: ["parentalidade positiva", "educação socioemocional", "prevenção de bullying", "vínculo afetivo", "comunicação não violenta"],
    },
  ],
  faq: [
    { question: "Qual a idade ideal para iniciar acompanhamento psicológico?", answer: "O acompanhamento pode começar a partir dos 2 anos quando há suspeita de atrasos ou dificuldades. Para questões comportamentais, entre 3 e 6 anos é um período ideal para intervenção." },
    { question: "Como saber se meu filho precisa de psicólogo?", answer: "Sinais incluem mudanças bruscas de comportamento, dificuldade de socialização, regressões, medos excessivos, queda no rendimento escolar ou isolamento." },
    { question: "O que acontece na primeira consulta?", answer: "Na primeira sessão, o psicólogo conversa com os pais para entender a história da criança, faz observações iniciais e estabelece um plano de avaliação e intervenção." },
    { question: "Qual a diferença entre psicologia e psicopedagogia?", answer: "A psicologia foca no aspecto emocional, comportamental e mental, enquanto a psicopedagogia trabalha especificamente dificuldades de aprendizagem escolar." },
  ],
};

// ============================================
// 3. TERAPIA OCUPACIONAL
// ============================================
export const terapiaOcupacionalSEO: SEOStructure = {
  h1: "Terapia Ocupacional em Anápolis",
  h2Sections: [
    {
      title: "Conceito Básico",
      h3s: [
        { title: "Definição da terapia ocupacional", content: "Profissão que visa desenvolver, recuperar ou manter as habilidades necessárias para as atividades diárias e participação social." },
        { title: "Ocupação e desenvolvimento", content: "As ocupações são as atividades que dão significado à vida e promovem o desenvolvimento infantil." },
        { title: "Abordagem holística", content: "Visão integral da criança considerando aspectos físicos, emocionais, sociais e ambientais." },
      ],
      relatedTerms: ["ocupação humana", "participação social", "atividades de vida diária", "desempenho ocupacional", "funcionalidade"],
    },
    {
      title: "Principais Condições",
      h3s: [
        { title: "Integração sensorial", content: "Dificuldades em processar informações sensoriais como tato, audição, visão e movimento." },
        { title: "Atraso motor", content: "Desenvolvimento tardio de habilidades motoras grossas e finas esperadas para a idade." },
        { title: "Deficiência de coordenação", content: "DCD - dificuldade em realizar movimentos coordenados e aprender novas habilidades motoras." },
        { title: "Autismo e TDAH", content: "Condições que afetam a regulação sensorial, atenção e organização comportamental." },
      ],
      relatedTerms: ["dispraxia", "hipersensibilidade", "hipossensibilidade", "processamento sensorial", "modulação sensorial"],
    },
    {
      title: "Avaliação Ocupacional",
      h3s: [
        { title: "Avaliação sensorial", content: "Análise do processamento e resposta aos estímulos sensoriais do ambiente." },
        { title: "Avaliação motora", content: "Verificação da coordenação, força, equilíbrio e planejamento motor." },
        { title: "Avaliação funcional", content: "Observação do desempenho em atividades da vida diária como vestir-se e alimentar-se." },
      ],
      relatedTerms: ["escala de desempenho", "perfil sensorial", "avaliação de brincar", "análise funcional", "observação estruturada"],
    },
    {
      title: "Intervenção Terapêutica",
      h3s: [
        { title: "Integração sensorial terapêutica", content: "Atividades específicas para melhorar o processamento sensorial da criança." },
        { title: "Treino de coordenação", content: "Exercícios para desenvolver motricidade fina, grafismo e habilidades manuais." },
        { title: "Treino de autonomia", content: "Prática de atividades diárias como vestir-se, alimentar-se e higiene pessoal." },
      ],
      relatedTerms: ["caixa de ferramentas sensoriais", "terapia de brincar", "abordagem neuroevolutiva", "taping", "orteses"],
    },
    {
      title: "Aplicações Práticas",
      h3s: [
        { title: "Adaptações escolares", content: "Ajustes no ambiente e materiais escolares para melhor participação." },
        { title: "Adaptação do ambiente doméstico", content: "Modificações na casa para promover autonomia e segurança." },
        { title: "Rotina estruturada", content: "Organização do dia a dia para reduzir ansiedade e melhorar a organização." },
      ],
      relatedTerms: ["escrita", "uso de tesoura", "coordenação visomotora", "organização espacial", "esquema corporal"],
    },
    {
      title: "Recursos Terapêuticos",
      h3s: [
        { title: "Equipamentos sensoriais", content: "Balanços, gangorras, piscina de bolinhas e equipamentos de suspensão." },
        { title: "Material de coordenação", content: "Massinhas, pinças, blocos, quebra-cabeças e jogos de destreza manual." },
        { title: "Tecnologia assistiva", content: "Apps, softwares adaptados e recursos digitais para terapia." },
      ],
      relatedTerms: ["plataforma terapêutica", "colchonetes", "instrumentos de percussão", "material tátil", "obstáculos"],
    },
    {
      title: "Prevenção e Educação",
      h3s: [
        { title: "Orientação aos cuidadores", content: "Estratégias para pais promoverem o desenvolvimento em casa." },
        { title: "Ambientes enriquecidos", content: "Criação de espaços que estimulem o desenvolvimento sensorial e motor." },
        { title: "Brincadeiras terapêuticas", content: "Atividades lúdicas que promovem desenvolvimento enquanto a criança se diverte." },
      ],
      relatedTerms: ["estimulação precoce", "parque infantil", "atividades lúdicas", "exploração sensorial", "brincar terapêutico"],
    },
  ],
  faq: [
    { question: "Qual a diferença entre terapia ocupacional e fisioterapia?", answer: "A fisioterapia foca na reabilitação física e movimento, enquanto a terapia ocupacional trabalha a funcionalidade nas atividades diárias, integração sensorial e participação social." },
    { question: "Quando procurar um terapeuta ocupacional?", answer: "Quando a criança tem dificuldade para se vestir, alimentar, segurar lápis, organizar-se, é desajeitada, ou apresenta hipersensibilidade a sons, texturas ou movimentos." },
    { question: "O que é integração sensorial?", answer: "É a capacidade do cérebro de receber, organizar e interpretar informações sensoriais do ambiente para produzir respostas adequadas." },
    { question: "A terapia ocupacional ajuda na escola?", answer: "Sim! Melhora a coordenação para escrita, atenção, organização do material, participação em atividades físicas e interação social." },
  ],
};

// ============================================
// 4. PSICOMOTRICIDADE
// ============================================
export const psicomotricidadeSEO: SEOStructure = {
  h1: "Psicomotricidade Infantil em Anápolis",
  h2Sections: [
    {
      title: "Conceito Básico",
      h3s: [
        { title: "O que é psicomotricidade", content: "Estudo científico das relações entre o psiquismo e a motricidade, desenvolvido por Aucouturier." },
        { title: "Relação mente-corpo", content: "A psicomotricidade considera o ser humano como unidade indissociável de corpo, inteligência e afetividade." },
        { title: "Importância no desenvolvimento", content: "Base para a aprendizagem escolar, autonomia e organização do pensamento." },
      ],
      relatedTerms: ["consciência corporal", "esquema corporal", "tonicidade", "lateralidade", "dominância"],
    },
    {
      title: "Principais Distúrbios",
      h3s: [
        { title: "Desorganização corporal", content: "Dificuldade em reconhecer o próprio corpo, lateralidade e representação interna do corpo." },
        { title: "Insegurança espacial", content: "Tropeços, quedas frequentes, desorientação no espaço e dificuldade de direção." },
        { title: "Problemas de tonicidade", content: "Tensão muscular inadequada, postura incorreta e cansaço excessivo." },
        { title: "Dificuldade de representação", content: "Problemas para representar o corpo no desenho e no espaço." },
      ],
      relatedTerms: ["clumsy child", "mal jeito", "torpor", "agitação motora", "descoordenação"],
    },
    {
      title: "Avaliação Psicomotora",
      h3s: [
        { title: "Avaliação do esquema corporal", content: "Verificação da representação interna que a criança tem do próprio corpo." },
        { title: "Avaliação da lateralidade", content: "Identificação da dominância manual, ocular e podálica." },
        { title: "Avaliação da representação espacial", content: "Análise da organização no espaço, temporalidade e representação gráfica." },
      ],
      relatedTerms: ["bateria psicomotora", "teste de imitação de gestos", "desenho da figura humana", "avaliação tonicidade", "retracing"],
    },
    {
      title: "Intervenção Terapêutica",
      h3s: [
        { title: "Relaxamento e tonicidade", content: "Exercícios para melhorar a consciência e regulação do tônus muscular." },
        { title: "Atividades de esquema corporal", content: "Jogos e exercícios para desenvolver a representação corporal." },
        { title: "Educação espacial", content: "Atividades de lateralidade, direção, orientação e organização espacial." },
      ],
      relatedTerms: ["relaxamento psicomotor", "reação de equilíbrio", "lateralização", "adaptação postural", "cinestesia"],
    },
    {
      title: "Aplicações Escolares",
      h3s: [
        { title: "Pré-requisitos para escrita", content: "Desenvolvimento das bases motoras necessárias para o aprendizado da escrita." },
        { title: "Coordenação visomotora", content: "Integração entre o sistema visual e motor para atividades escolares." },
        { title: "Organização espacial na escola", content: "Noções de posicionamento no caderno, folha e espaço escolar." },
      ],
      relatedTerms: ["pré-escrita", "grafismo", "espaço topológico", "espaço euclidiano", "projeção espacial"],
    },
    {
      title: "Recursos e Técnicas",
      h3s: [
        { title: "Material de apoio", content: "Bolas, arcos, bambolês, cordas e material de percussão corporal." },
        { title: "Atividades de body percussion", content: "Uso do próprio corpo para produzir sons e ritmos." },
        { title: "Movimento e dança", content: "Atividades expressivas que trabalham o corpo no espaço e no tempo." },
      ],
      relatedTerms: ["massagem", "dança educativa", "ginástica educativa", "jogos corporais", "imersão"],
    },
    {
      title: "Prevenção e Estimulação",
      h3s: [
        { title: "Estimulação precoce", content: "Atividades desde o nascimento para promover o desenvolvimento corporal." },
        { title: "Brincadeiras corporais", content: "Jogos tradicionais que promovem consciência e domínio corporal." },
        { title: "Orientação parental", content: "Como estimular a psicomotricidade no dia a dia familiar." },
      ],
      relatedTerms: ["prevenção primária", "reeducação", "reeducação relacional", "acompanhamento", "desenvolvimento global"],
    },
  ],
  faq: [
    { question: "Qual a diferença entre psicomotricidade e fisioterapia?", answer: "A psicomotricidade trabalha a relação entre corpo, mente e emoção através do movimento, enquanto a fisioterapia foca na reabilitação física e funcional do movimento." },
    { question: "Como identificar problemas de psicomotricidade?", answer: "Sinais incluem tropeços frequentes, dificuldade para segurar lápis, confusão entre direita/esquerda, postura inadequada e dificuldade de organização espacial." },
    { question: "A psicomotricidade ajuda na aprendizagem escolar?", answer: "Sim! A psicomotricidade é base para a escrita, leitura, matemática e organização escolar. Problemas psicomotores frequentemente se manifestam como dificuldades de aprendizagem." },
    { question: "A partir de que idade pode começar?", answer: "A estimulação psicomotora pode começar desde o nascimento. A reeducação psicomotora é indicada quando são identificadas dificuldades, geralmente a partir dos 3 anos." },
  ],
};

// ============================================
// 5. TESTE DA LINGUINHA (FREIO LINGUAL)
// ============================================
export const testeLinguinhaSEO: SEOStructure = {
  h1: "Teste da Linguinha em Anápolis",
  h2Sections: [
    {
      title: "Conceito Básico",
      h3s: [
        { title: "O que é o teste da linguinha", content: "Avaliação especializada para identificar ankyloglossia (freio lingual curto) em bebês e crianças." },
        { title: "Anatomia do freio lingual", content: "Estrutura fibrosa que une a língua ao assoalho da boca, quando curta pode limitar movimentos." },
        { title: "Importância do diagnóstico precoce", content: "Identificar no início da vida previne problemas na amamentação, alimentação e fala." },
      ],
      relatedTerms: ["ankyloglossia", "freio lingual", "freio curto", "anquiloglossia", "frenulo lingual"],
    },
    {
      title: "Sinais e Sintomas",
      h3s: [
        { title: "Dificuldades na amamentação", content: "Pega inadequada, dor nos seios, cansaço do bebê e ganho de peso insuficiente." },
        { title: "Problemas na alimentação", content: "Dificuldade para lamber, mastigar, manter alimentos na boca ou engolir." },
        { title: "Alterações na fala", content: "Troca de letras (L, R, T, D), fala arrastada ou dificuldade de articulação." },
        { title: "Sinais visíveis", content: "Língua em formato de coração, não consegue tocar o céu da boca ou mover para os lados." },
      ],
      relatedTerms: ["má sucção", "glossoptose", "língua presa", "limitação de mobilidade", "hipotonia lingual"],
    },
    {
      title: "Avaliação Fonoaudiológica",
      h3s: [
        { title: "Protocolos de avaliação", content: "Uso de escalas validadas como Hazelbaker e Kotlow para classificar a gravidade." },
        { title: "Avaliação funcional", content: "Observação da mobilidade lingual durante sucção, deglutição, fala e movimentos." },
        { title: "Avaliação multidisciplinar", content: "Integração com pediatras, dentistas e lactaristas para diagnóstico completo." },
      ],
      relatedTerms: ["escala de Kotlow", "escala Hazelbaker", "avaliação funcional", "mobilidade lingual", "protocolo de screening"],
    },
    {
      title: "Tratamento e Intervenção",
      h3s: [
        { title: "Fonoaudiologia pré e pós-cirúrgica", content: "Preparação dos músculos antes e reabilitação após a frenectomia." },
        { title: "Exercícios miofuncionais", content: "Atividades para melhorar a mobilidade, força e posicionamento da língua." },
        { title: "Frenectomia", content: "Procedimento cirúrgico simples para liberar o freio lingual quando indicado." },
      ],
      relatedTerms: ["frenotomia", "frenectomia a laser", "miofuncional", "exercícios linguais", "reabilitação"],
    },
    {
      title: "Impactos no Desenvolvimento",
      h3s: [
        { title: "Amamentação e nutrição", content: "Relação direta entre freio curto e dificuldades na alimentação do bebê." },
        { title: "Desenvolvimento da fala", content: "Como a mobilidade lingual afeta a produção correta dos sons da fala." },
        { title: "Saúde bucal", content: "Repercussões na higiene, respiração e desenvolvimento dos dentes." },
      ],
      relatedTerms: ["lactação", "desmame", "respiração oral", "má oclusão", "posição lingual"],
    },
    {
      title: "Prevenção e Orientação",
      h3s: [
        { title: "Screening neonatal", content: "Avaliação do freio lingual logo após o nascimento." },
        { title: "Orientação às mães", content: "Informações sobre amamentação e sinais de alerta no bebê." },
        { title: "Acompanhamento contínuo", content: "Monitoramento do desenvolvimento mesmo após tratamento." },
      ],
      relatedTerms: ["triagem neonatal", "consulta pré-natal", "grupo de apoio", "aleitamento materno", "consultório amigo da criança"],
    },
  ],
  faq: [
    { question: "Quando devo fazer o teste da linguinha no meu bebê?", answer: "O ideal é avaliar nas primeiras semanas de vida, especialmente se houver dificuldades na amamentação. Quanto mais cedo o diagnóstico, melhores os resultados do tratamento." },
    { question: "O teste da linguinha dói?", answer: "Não, a avaliação fonoaudiológica é indolor. O profissional observa a mobilidade da língua e a estrutura do freio sem causar desconforto ao bebê ou criança." },
    { question: "Toda criança com freio curto precisa de cirurgia?", answer: "Nem sempre. Depende da gravidade e dos impactos funcionais. Muitas vezes a fonoaudiologia resolve, ou a cirurgia só é indicada após tentativas de terapia." },
    { question: "Qual especialista faz o teste da linguinha?", answer: "Fonoaudiólogos especializados em motricidade oral e amamentação são os profissionais indicados para avaliar e tratar o freio lingual." },
  ],
};

// ============================================
// 6. FISIOTERAPIA INFANTIL
// ============================================
export const fisioterapiaSEO: SEOStructure = {
  h1: "Fisioterapia Infantil em Anápolis",
  h2Sections: [
    {
      title: "Conceito Básico",
      h3s: [
        { title: "O que é fisioterapia infantil", content: "Especialidade que previne, diagnostica e trata distúrbios do movimento e função em crianças." },
        { title: "Desenvolvimento motor", content: "Processo de aquisição das habilidades motoras desde o nascimento até a adolescência." },
        { title: "Importância da reabilitação precoce", content: "Intervenção no início da vida maximiza o potencial de desenvolvimento da criança." },
      ],
      relatedTerms: ["desenvolvimento neuropsicomotor", "reabilitação pediátrica", "estimulação precoce", "terapia manual", "cinesioterapia"],
    },
    {
      title: "Principais Condições",
      h3s: [
        { title: "Paralisia cerebral", content: "Grupo de distúrbios do desenvolvimento do movimento e postura devido a lesão no cérebro imaturo." },
        { title: "Síndromes neurológicas", content: "Síndrome de Down, síndrome de Rett e outras condições genéticas que afetam o desenvolvimento motor." },
        { title: "Prematuridade", content: "Bebês nascidos antes da 37ª semana que necessitam acompanhamento do desenvolvimento motor." },
        { title: "Torcicolo e displasia", content: "Condições musculoesqueléticas comuns no período neonatal e infância." },
      ],
      relatedTerms: ["encefalopatia", "hipotonia", "hipertonia", "espasticidade", "assimetrias"],
    },
    {
      title: "Avaliação Fisioterapêutica",
      h3s: [
        { title: "Avaliação do desenvolvimento", content: "Uso de escalas como Alberta Infant Motor Scale e Bayley para avaliar marcos motores." },
        { title: "Análise biomecânica", content: "Estudo detalhado dos movimentos, postura e alinhamento corporal." },
        { title: "Avaliação respiratória", content: "Verificação da função pulmonar, padrão respiratório e secreções." },
      ],
      relatedTerms: ["GMS", "AIMS", "escala de Dubowitz", "exame físico", "anamnese fisioterapêutica"],
    },
    {
      title: "Tratamentos e Técnicas",
      h3s: [
        { title: "Terapia neuroevolutiva", content: "Abordagens como Bobath, Kabat e Eutonía para reorganizar o padrão motor." },
        { title: "Estimulação precoce", content: "Intervenções para bebês de risco ou com atraso no desenvolvimento." },
        { title: "Fisioterapia respiratória", content: "Técnicas para melhorar a função pulmonar e prevenir complicações respiratórias." },
      ],
      relatedTerms: ["PNF", "concepto bobath", "osteopatia pediátrica", "taping", "ventilação não invasiva"],
    },
    {
      title: "Recursos Terapêuticos",
      h3s: [
        { title: "Equipamentos de reabilitação", content: "Andadores, orteses, posicionadores e adaptações específicas." },
        { title: "Recursos eletroterápicos", content: "Uso de correntes elétricas, laser e ultrassom quando indicado." },
        { title: "Ambientes terapêuticos", content: "Piscina terapêutica, sala de integração sensorial e piso de espuma." },
      ],
      relatedTerms: ["hidroterapia", "barras paralelas", "bola suíça", "colchonetes", "espelho"],
    },
    {
      title: "Integração Familiar",
      h3s: [
        { title: "Orientação aos pais", content: "Treinamento de cuidadores para continuidade do tratamento em casa." },
        { title: "Adaptação do ambiente", content: "Modificações na casa para acessibilidade e segurança da criança." },
        { title: "Integração escolar", content: "Acompanhamento da criança no ambiente educacional." },
      ],
      relatedTerms: ["cuidados paliativos", "apoio familiar", "inclusão", "acessibilidade", "qualidade de vida"],
    },
  ],
  faq: [
    { question: "Quando devo levar meu filho à fisioterapia?", answer: "Quando houver atraso nos marcos do desenvolvimento, prematuridade, alterações de tônus muscular, assimetrias, ou após cirurgias e internações." },
    { question: "A fisioterapia infantil dói?", answer: "Não. As técnicas são adaptadas para serem confortáveis e lúdicas. O terapeuta trabalha com a criança de forma respeitosa e sem causar dor." },
    { question: "Quanto tempo dura o tratamento?", answer: "Varia conforme a condição. Algumas crianças precisam de acompanhamento por meses, outras por anos. A evolução é individual e acompanhada periodicamente." },
    { question: "Qual a diferença entre fisioterapia e terapia ocupacional infantil?", answer: "A fisioterapia foca na reabilitação do movimento, força e função física, enquanto a terapia ocupacional trabalha a funcionalidade nas atividades do dia a dia e integração sensorial." },
  ],
};

// ============================================
// 7. AVALIAÇÃO NEUROPSICOLÓGICA
// ============================================
export const neuropsicologiaSEO: SEOStructure = {
  h1: "Avaliação Neuropsicológica em Anápolis",
  h2Sections: [
    {
      title: "Conceito Básico",
      h3s: [
        { title: "O que é neuropsicologia", content: "Especialidade que estuda as relações entre cérebro e comportamento, avaliando funções cognitivas." },
        { title: "Funções executivas", content: "Habilidades de planejamento, organização, atenção, memória de trabalho e controle inibitório." },
        { title: "Importância da avaliação", content: "Diagnóstico preciso orienta intervenções educacionais e terapêuticas adequadas." },
      ],
      relatedTerms: ["neurociência", "cognição", "funções cerebrais", "avaliação neurocognitiva", "neurodesenvolvimento"],
    },
    {
      title: "Condições Avaliadas",
      h3s: [
        { title: "TDAH", content: "Avaliação de atenção, impulsividade e hiperatividade com testes específicos." },
        { title: "Dislexia e TDE", content: "Avaliação das habilidades de leitura, escrita e processamento fonológico." },
        { title: "TEA", content: "Avaliação cognitiva, comunicação e flexibilidade mental no autismo." },
        { title: "Deficiência intelectual", content: "Avaliação do funcionamento intelectual e adaptativo." },
      ],
      relatedTerms: ["transtornos de aprendizagem", "déficit de memória", "dispraxias", "gnosias", "praxias"],
    },
    {
      title: "Processo de Avaliação",
      h3s: [
        { title: "Anamnese detalhada", content: "Coleta completa de histórico de desenvolvimento, médico e escolar." },
        { title: "Testes neuropsicológicos", content: "Baterias padronizadas que avaliam linguagem, memória, atenção, funções visuoespaciais." },
        { title: "Análise de resultados", content: "Interpretação dos achados e elaboração de laudo completo." },
      ],
      relatedTerms: ["WISC", "NEPSY", "Trail Making Test", "Rey Complex Figure", "Stroop Test"],
    },
    {
      title: "Áreas Cognitivas Avaliadas",
      h3s: [
        { title: "Atenção e concentração", content: "Avaliação da atenção sustentada, seletiva, alternante e dividida." },
        { title: "Memória", content: "Avaliação de memória visual, verbal, de curto e longo prazo." },
        { title: "Funções executivas", content: "Planejamento, flexibilidade mental, controle inibitório e tomada de decisão." },
        { title: "Linguagem", content: "Compreensão, expressão, nomeação e processamento fonológico." },
      ],
      relatedTerms: ["memória de trabalho", "velocidade de processamento", "fluência verbal", "raciocínio lógico", "processamento auditivo"],
    },
    {
      title: "Aplicações do Laudo",
      h3s: [
        { title: "Plano educacional individual", content: "Adaptações curriculares baseadas no perfil cognitivo da criança." },
        { title: "Orientação terapêutica", content: "Direcionamento dos tipos de intervenção mais indicados." },
        { title: "Acompanhamento do desenvolvimento", content: "Reavaliações periódicas para monitorar evolução." },
      ],
      relatedTerms: ["PEI", "adaptações curriculares", "acompanhamento neuropsicológico", "reabilitação cognitiva", "intervenção psicoeducacional"],
    },
    {
      title: "Integração Multidisciplinar",
      h3s: [
        { title: "Articulação com escola", content: "Orientação aos educadores sobre o perfil cognitivo do aluno." },
        { title: "Integração com terapeutas", content: "Compartilhamento de resultados com fonoaudiologia, TO e psicologia." },
        { title: "Acompanhamento médico", content: "Interface com neurologistas e pediatras no manejo do caso." },
      ],
      relatedTerms: ["equipe multidisciplinar", "abordagem integrada", "intervenção precoce", "estratégias compensatórias", "potencialidades"],
    },
    {
      title: "Prevenção e Promoção",
      h3s: [
        { title: "Triagem neuropsicológica", content: "Avaliações breves para identificar crianças que necessitam avaliação completa." },
        { title: "Estimulação cognitiva", content: "Atividades para desenvolver funções executivas desde a infância." },
        { title: "Educação parenta", content: "Orientações sobre como promover o desenvolvimento cognitivo em casa." },
      ],
      relatedTerms: ["reserva cognitiva", "plasticidade cerebral", "hábitos saudáveis", "sono adequado", "atividade física"],
    },
  ],
  faq: [
    { question: "Em que consiste a avaliação neuropsicológica?", answer: "É uma avaliação completa das funções cerebrais que inclui testes de inteligência, atenção, memória, linguagem, funções executivas e comportamento, resultando em um laudo detalhado." },
    { question: "Quanto tempo dura a avaliação neuropsicológica?", answer: "Geralmente são necessárias 3 a 5 sessões de 1 hora cada, dependendo da idade da criança e das queixas apresentadas." },
    { question: "A avaliação neuropsicológica diagnostica TDAH?", answer: "Sim, é um dos instrumentos fundamentais para diagnóstico de TDAH, além de ajudar a descartar outras condições que podem causar sintomas similares." },
    { question: "Qual a idade mínima para avaliação neuropsicológica?", answer: "A partir dos 4-5 anos já é possível fazer avaliações neuropsicológicas, embora alguns testes específicos tenham idade mínima maior." },
  ],
};

// Exportar todas as estruturas
export const seoStructures = {
  fonoaudiologia: fonoaudiologiaSEO,
  psicologia: psicologiaSEO,
  terapiaOcupacional: terapiaOcupacionalSEO,
  psicomotricidade: psicomotricidadeSEO,
  testeLinguinha: testeLinguinhaSEO,
  fisioterapia: fisioterapiaSEO,
  neuropsicologia: neuropsicologiaSEO,
};

export default seoStructures;
