import type { FAQItem } from './seoStructures';

// FAQ visível + dados estruturados (via FAQSection). Perguntas baseadas em buscas reais (AnswerThePublic/Google, out/2026).
// Regras de verdade: sessão 40 min; avaliação 1 h (anamnese com os pais, criança não precisa estar presente);
// laudo de autismo/TDAH somente pelo neuropediatra; convênios BAAN e GEAP + particular com recibo (não Unimed/IPASGO); sem números não confirmados.

export const faqAutismo: FAQItem[] = [
  {
    question: 'Quais são os sinais de autismo na infância?',
    answer:
      'Alguns sinais de alerta: pouco contato visual, não responder quando chamado pelo nome, atraso ou ausência de fala, pouco interesse em brincar com outras crianças, movimentos repetitivos e muito incômodo com mudanças de rotina, sons ou texturas. Um sinal isolado não confirma autismo: o que importa é o conjunto de sinais e a idade da criança.',
  },
  {
    question: 'Meu filho tem suspeita de autismo. Por onde começar?',
    answer:
      'O primeiro passo é conversar com um profissional. Na Fono Inova, você começa por uma avaliação de 1 hora com os pais, a anamnese, sem precisar levar a criança: a equipe entende a queixa principal e traça o plano terapêutico. O diagnóstico e o laudo de autismo são feitos pelo neuropediatra, que atende aqui na clínica.',
  },
  {
    question: 'Quem dá o laudo de autismo?',
    answer:
      'Na Fono Inova, o laudo de autismo é emitido somente pelo neuropediatra. Fonoaudióloga, psicóloga e terapeuta ocupacional identificam sinais, avaliam e tratam a criança, mas não emitem laudo. O neuropediatra trabalha em conjunto com a equipe.',
  },
  {
    question: 'Onde fazer avaliação de autismo em Anápolis?',
    answer:
      'Na Clínica Fono Inova, no bairro Jundiaí (Av. Minas Gerais, 405). A equipe de fonoaudiologia, psicologia e terapia ocupacional avalia e acompanha a criança, e o neuropediatra da clínica é quem faz o diagnóstico e emite o laudo.',
  },
  {
    question: 'Quanto tempo dura cada sessão?',
    answer:
      'As sessões duram 40 minutos e a avaliação inicial dura 1 hora. Todo atendimento é por hora marcada: cada criança tem seu horário certo e pontual. A equipe define, no plano terapêutico, quais terapias e com que frequência.',
  },
  {
    question: 'A terapia ocupacional ajuda no autismo?',
    answer:
      'Sim. A terapia ocupacional trabalha a autonomia nas atividades do dia a dia, a coordenação e a regulação sensorial, e costuma fazer parte do plano de crianças no espectro, junto com fonoaudiologia e psicologia, conforme a necessidade de cada uma.',
  },
  {
    question: 'Atende pela Unimed ou outro plano de saúde?',
    answer:
      'Não atendemos pela Unimed nem pelo IPASGO. Atendemos pelos convênios da Base Aérea de Anápolis (BAAN) e GEAP, e no particular. No particular, emitimos o recibo para você solicitar reembolso ao seu plano, conforme as regras dele. Para confirmar a cobertura do seu caso, chame no WhatsApp.',
  },
];

export const faqTdah: FAQItem[] = [
  {
    question: 'Como identificar TDAH em crianças?',
    answer:
      'Os principais sinais são dificuldade de concentração, impulsividade, agitação excessiva e dificuldade para seguir instruções, de forma persistente e em mais de um ambiente, como casa e escola. Esses sinais pedem avaliação: o diagnóstico é feito pelo neuropediatra, com apoio da avaliação neuropsicológica.',
  },
  {
    question: 'Meu filho tem dificuldade de concentração na escola. É TDAH?',
    answer:
      'Nem sempre. A dificuldade de concentração pode ter várias causas, como dificuldades de aprendizagem, sono, ansiedade ou questões de linguagem. Por isso a avaliação olha o conjunto da criança antes de qualquer conclusão.',
  },
  {
    question: 'Qual profissional avalia TDAH em Anápolis?',
    answer:
      'Na Clínica Fono Inova, no bairro Jundiaí, a avaliação neuropsicológica é feita por neuropsicólogo, e o diagnóstico é validado pelo neuropediatra da clínica.',
  },
  {
    question: 'O fonoaudiólogo diagnostica TDAH?',
    answer:
      'Não. A fonoaudióloga avalia linguagem, fala e comunicação, mas não fecha diagnóstico de TDAH nem emite laudo. O diagnóstico é do neuropediatra, com apoio da avaliação neuropsicológica.',
  },
  {
    question: 'Quanto custa a avaliação neuropsicológica infantil e em quanto tempo sai o laudo?',
    answer:
      'A avaliação neuropsicológica é um processo completo: entrevista inicial, testes específicos, relatório técnico detalhado e devolutiva com orientações. O pacote custa R$ 2.500 e o laudo fica pronto em até 20 dias.',
  },
  {
    question: 'TDAH tem tratamento?',
    answer:
      'Sim. O TDAH tem tratamento eficaz que combina acompanhamento psicológico, orientação escolar, suporte aos pais e, quando indicado, tratamento médico. Quanto mais cedo iniciado, melhores os resultados.',
  },
  {
    question: 'Com que idade fazer avaliação de TDAH?',
    answer:
      'A avaliação pode ser feita a partir dos 6 anos, quando os comportamentos escolares ficam mais evidentes. Mas sinais em crianças mais novas também merecem atenção e acompanhamento especializado.',
  },
];

export const faqDislexia: FAQItem[] = [
  {
    question: 'O que é dislexia infantil?',
    answer:
      'Dislexia é uma dificuldade específica de aprendizagem que afeta a leitura e a escrita. A criança tem inteligência normal, mas enfrenta dificuldade para decodificar palavras, podendo trocar letras, ler de forma lenta ou ter dificuldade para memorizar o que leu.',
  },
  {
    question: 'Meu filho tem dificuldade de leitura. O que fazer?',
    answer:
      'A dificuldade merece atenção quando persiste mesmo com a rotina escolar e o apoio em casa: trocar letras, ler muito devagar, não compreender o que leu. O primeiro passo é uma avaliação psicopedagógica para entender onde está a dificuldade; se necessário, a equipe encaminha para outras avaliações e para o neuropediatra.',
  },
  {
    question: 'Como identificar dislexia em Anápolis?',
    answer:
      'A dislexia é investigada por avaliação psicopedagógica e neuropsicológica, que mostram o perfil de aprendizagem da criança. Quando é necessário laudo, ele é emitido pelo neuropediatra da clínica.',
  },
  {
    question: 'Dislexia tem tratamento?',
    answer:
      'Sim. Com acompanhamento psicopedagógico especializado e técnicas multissensoriais, a criança com dislexia pode desenvolver estratégias eficazes para leitura e escrita. O diagnóstico precoce é fundamental.',
  },
  {
    question: 'Qual profissional trata dislexia em Anápolis?',
    answer:
      'O psicopedagogo é o principal profissional no tratamento da dislexia. A Clínica Fono Inova, no bairro Jundiaí, tem psicopedagoga especializada em dificuldades de aprendizagem.',
  },
  {
    question: 'Quanto tempo dura cada sessão?',
    answer:
      'As sessões duram 40 minutos e a avaliação inicial dura 1 hora, com anamnese com os pais. Todo atendimento é por hora marcada, com horário certo e pontual para cada criança.',
  },
];

const PRECO_BASE =
  'A avaliação dura 1 hora e custa R$ 220. A sessão avulsa também é R$ 220 e dura 40 minutos; no pacote semanal (1 sessão por semana) a sessão sai por R$ 180, cerca de R$ 720 por mês. Para agendar, chame no WhatsApp (62) 99201-3573.';

export const faqNeuropediatria: FAQItem[] = [
  {
    question: 'O que faz um neuropediatra?',
    answer:
      'O neuropediatra é um médico especialista no desenvolvimento neurológico da criança. Avalia atrasos no desenvolvimento, autismo, TDAH, convulsões, dificuldades de aprendizagem e outros problemas neurológicos infantis.',
  },
  {
    question: 'Quem dá o laudo de autismo e de TDAH?',
    answer:
      'Na Fono Inova, o laudo de autismo e de TDAH é emitido somente pelo neuropediatra, que atende aqui na clínica e trabalha junto com fonoaudiologia, psicologia, terapia ocupacional e neuropsicologia. As demais especialidades identificam sinais e tratam, sem emitir laudo.',
  },
  {
    question: 'Quando levar meu filho ao neuropediatra?',
    answer:
      'Dependendo da suspeita, a avaliação pode ser feita desde os primeiros meses de vida. Sinais de alerta como atraso para sentar, andar ou falar, ou comportamentos atípicos devem ser avaliados o quanto antes.',
  },
  {
    question: 'O que o neuropediatra faz na primeira consulta?',
    answer:
      'O neuropediatra conversa com a família sobre o histórico e as queixas, observa o desenvolvimento da criança e define se são necessários exames, terapias ou retornos. Quando há suspeita de autismo ou TDAH, é ele quem conduz o diagnóstico e emite o laudo.',
  },
  {
    question: 'Quais exames o neuropediatra pede?',
    answer:
      'Depende de cada caso. Nem toda criança precisa de exames: o neuropediatra só solicita quando há indicação clínica, como em casos de convulsões ou suspeita de alterações neurológicas.',
  },
  {
    question: 'Preciso de encaminhamento para consultar o neuropediatra?',
    answer: 'Não é necessário encaminhamento. Você pode agendar diretamente a consulta pelo WhatsApp (62) 99201-3573.',
  },
  {
    question: 'Quanto custa a consulta com neuropediatra em Anápolis?',
    answer:
      'Na consulta, o neuropediatra avalia o desenvolvimento da criança, indica exames complementares quando necessário e define o acompanhamento. A consulta custa R$ 500.',
  },
  {
    question: 'O neuropediatra atende pela Unimed ou outro plano de saúde?',
    answer:
      'A consulta com neuropediatra é particular, com recibo para você solicitar reembolso ao seu plano, conforme as regras dele. Não atendemos pela Unimed nem pelo IPASGO. Se você tem o convênio da Base Aérea de Anápolis (BAAN), pergunte pelo WhatsApp se ele cobre a consulta.',
  },
  {
    question: 'Qual a diferença entre neuropediatra e neuropsicólogo?',
    answer:
      'O neuropediatra é médico: faz o diagnóstico e emite o laudo. O neuropsicólogo avalia atenção, memória, linguagem e outras funções por meio de testes, e o resultado ajuda o neuropediatra e orienta o plano terapêutico da criança.',
  },
  {
    question: 'Como funciona o acompanhamento após a primeira consulta?',
    answer:
      'Após a avaliação inicial, o neuropediatra indica a necessidade de exames complementares e define a frequência de retornos. O acompanhamento é individualizado conforme as necessidades de cada criança.',
  },
];

export const faqPsicopedagogia: FAQItem[] = [
  {
    question: 'Psicopedagogia é o mesmo que reforço escolar?',
    answer:
      'Não. O reforço escolar revisita conteúdos que o aluno perdeu. A psicopedagogia investiga e trata as causas da dificuldade de aprendizagem, trabalhando habilidades cognitivas, emocionais e perceptivas para que a criança aprenda com autonomia.',
  },
  {
    question: 'Quando uma criança precisa de psicopedagoga?',
    answer:
      'Quando há dificuldade para aprender, ler, escrever ou fazer contas que persiste apesar do esforço e do apoio da escola e da família, ou quando a criança perde o interesse e a confiança nos estudos. A avaliação mostra se existe uma dificuldade de aprendizagem e como ajudar.',
  },
  {
    question: 'O que faz um psicopedagogo infantil?',
    answer:
      'O psicopedagogo investiga como a criança aprende, identifica onde estão as dificuldades e trabalha estratégias, habilidades e jogos para que ela aprenda com mais autonomia, em parceria com a família e a escola.',
  },
  {
    question: 'Qual a diferença entre psicopedagogia e neuropsicopedagogia?',
    answer:
      'A psicopedagogia foca nos processos de aprendizagem e seus aspectos pedagógicos. A neuropsicopedagogia vai além, incluindo o estudo das bases neurológicas da aprendizagem, integrando conhecimentos da neurociência.',
  },
  {
    question: 'Meu filho precisa de psicopedagogo ou psicólogo?',
    answer:
      'O psicopedagogo atua nas dificuldades de aprendizagem escolar. O psicólogo trabalha questões emocionais e comportamentais. Muitas vezes, o trabalho conjunto é ideal, e a avaliação mostra por onde começar.',
  },
  {
    question: 'Preciso levar meu filho na avaliação?',
    answer:
      'Não. A avaliação é uma anamnese de 1 hora com os pais ou responsáveis, em que a psicopedagoga entende a queixa principal e o que acontece na rotina escolar da criança. Com isso, ela traça o plano terapêutico.',
  },
  {
    question: 'A partir de que idade meu filho pode ser avaliado?',
    answer:
      'A avaliação psicopedagógica costuma fazer sentido quando a criança entra na fase de alfabetização, mas sinais de alerta podem ser notados antes. Na dúvida, a conversa com a psicopedagoga ajuda a decidir se é hora de avaliar.',
  },
  {
    question: 'Quanto custa a psicopedagogia em Anápolis?',
    answer: PRECO_BASE,
  },
  {
    question: 'Atende pela Unimed ou outro plano de saúde?',
    answer:
      'Não atendemos pela Unimed nem pelo IPASGO. Atendemos pelos convênios da Base Aérea de Anápolis (BAAN) e GEAP, e no particular. No particular, emitimos o recibo para você solicitar reembolso ao seu plano, conforme as regras dele. Para confirmar a cobertura do seu caso, chame no WhatsApp.',
  },
  {
    question: 'Quanto tempo dura o acompanhamento psicopedagógico?',
    answer:
      'Depende de cada criança. As sessões duram 40 minutos, e a equipe define a frequência no plano terapêutico, fazendo reavaliações junto com a família ao longo do acompanhamento.',
  },
  {
    question: 'O psicopedagogo faz diagnóstico de dislexia ou TDAH?',
    answer:
      'O psicopedagogo identifica os sinais e avalia o impacto na aprendizagem. Na Fono Inova, o laudo diagnóstico é emitido somente pelo neuropediatra, que atende aqui na clínica, e a avaliação neuropsicológica complementa o quadro quando necessário.',
  },
  {
    question: 'A psicopedagogia ajuda em dislexia e discalculia?',
    answer:
      'Sim. A psicopedagogia é parte importante do tratamento desses transtornos, com métodos específicos e estratégias que ajudam a criança a superar suas dificuldades.',
  },
];

export const faqFalaTardia: FAQItem[] = [
  {
    question: 'Fala tardia e atraso na fala são a mesma coisa?',
    answer:
      'São nomes usados para a mesma preocupação: a criança fala menos do que o esperado para a idade. A avaliação fonoaudiológica mostra se é só um ritmo mais lento ou se há algo que precisa de acompanhamento, e qual o melhor caminho para cada criança.',
  },
  {
    question: 'Meu filho não fala. O que fazer?',
    answer:
      'Cada criança tem seu ritmo, mas quando a fala não aparece como esperado para a idade, o melhor caminho é avaliar cedo. Avaliar não significa que há um problema: significa descobrir se a criança precisa de acompanhamento. Na Fono Inova, a avaliação é uma conversa de 1 hora dos pais com a fonoaudióloga, sem precisar levar a criança.',
  },
  {
    question: 'Fala tardia é sinal de autismo?',
    answer:
      'Nem sempre. O atraso na fala pode ter várias causas, e o autismo é apenas uma delas. A fonoaudióloga identifica sinais de alerta na comunicação, mas o diagnóstico e o laudo são feitos somente pelo neuropediatra, que atende na clínica.',
  },
  {
    question: 'Com que idade procurar a fonoaudiologia?',
    answer:
      'Assim que os pais perceberem que a criança não está falando conforme a expectativa para a idade. Quanto mais cedo a avaliação, mais cedo a família entende o que está acontecendo e como ajudar.',
  },
  {
    question: 'Como estimular a fala em casa?',
    answer:
      'Fale muito com seu filho, leia livros, cante músicas, evite telas, incentive a socialização com outras crianças e repita as palavras de forma clara e lúdica.',
  },
  {
    question: 'Quanto custa a fonoaudiologia para fala tardia?',
    answer: PRECO_BASE,
  },
  {
    question: 'Quanto tempo dura cada sessão?',
    answer:
      'As sessões duram 40 minutos e a avaliação inicial dura 1 hora. Todo atendimento é por hora marcada, com horário certo e pontual para cada criança.',
  },
  {
    question: 'Onde fica a clínica de fonoaudiologia no Jundiaí?',
    answer:
      'A Fono Inova fica na Av. Minas Gerais, 405, bairro Jundiaí, em Anápolis/GO. Atendemos de segunda a sexta, das 8h às 19h, com acessibilidade no espaço.',
  },
];

const PLANOS_TERAPIAS =
  'Atendemos no particular, com recibo para você pedir reembolso ao seu plano conforme as regras dele, e pelos convênios da Base Aérea de Anápolis (BAAN) e GEAP. Não atendemos Unimed nem IPASGO. Para confirmar a cobertura do seu caso, chame no WhatsApp (62) 99201-3573.';

export const faqTerapiaOcupacional: FAQItem[] = [
  {
    question: 'O que a terapia ocupacional infantil trabalha?',
    answer:
      'A terapia ocupacional ajuda a criança a ganhar autonomia nas atividades do dia a dia: coordenação motora fina (segurar o lápis, recortar, abotoar), organização sensorial (sensibilidade a barulho, texturas, roupas), alimentação, brincar e rotina. O objetivo é a criança participar melhor em casa e na escola.',
  },
  {
    question: 'Quando procurar terapia ocupacional para meu filho?',
    answer:
      'Quando a criança tem dificuldade para se vestir, comer ou escrever, se incomoda muito com barulhos, texturas ou roupas, evita brincadeiras de movimento, ou quando a escola relata agitação e dificuldade de concentração. Não precisa de diagnóstico para começar: a avaliação mostra se há necessidade de acompanhamento.',
  },
  {
    question: 'O que é integração sensorial?',
    answer:
      'É a forma como o cérebro organiza o que a criança sente (toque, som, movimento, equilíbrio). Quando essa organização não funciona bem, a criança pode reagir demais ou de menos aos estímulos. Na terapia ocupacional, isso é trabalhado com atividades lúdicas e planejadas para cada criança.',
  },
  {
    question: 'Terapia ocupacional ajuda crianças com autismo e TDAH?',
    answer:
      'Sim. A terapia ocupacional é uma das terapias mais indicadas para crianças com autismo e TDAH, porque trabalha a organização sensorial, a rotina, a atenção e a autonomia. Na Fono Inova ela funciona junto com fonoaudiologia, psicologia e neuropediatria quando o caso pede.',
  },
  {
    question: 'Preciso de encaminhamento médico?',
    answer:
      'Não é necessário. A família pode agendar a avaliação diretamente pelo WhatsApp (62) 99201-3573. Se a criança já tiver relatório de outro profissional ou da escola, vale trazer na avaliação.',
  },
  {
    question: 'Quanto custa a terapia ocupacional em Anápolis?',
    answer: PRECO_BASE,
  },
  {
    question: 'A terapia ocupacional atende por plano de saúde?',
    answer: PLANOS_TERAPIAS,
  },
  {
    question: 'Onde fica a clínica?',
    answer:
      'Na Av. Minas Gerais, 405, bairro Jundiaí, em Anápolis/GO. Atendemos de segunda a sexta, das 8h às 19h, com hora marcada.',
  },
];

export const faqFisioterapiaInfantil: FAQItem[] = [
  {
    question: 'Quando a criança precisa de fisioterapia infantil?',
    answer:
      'Quando há atraso para sustentar a cabeça, rolar, sentar, engatinhar ou andar, quando a criança cai muito, anda na ponta dos pés, tem torcicolo congênito, alterações de postura ou nasceu prematura. Na dúvida, a avaliação mostra se há necessidade de acompanhamento.',
  },
  {
    question: 'Com que idade pode começar a fisioterapia?',
    answer:
      'Desde os primeiros meses de vida. Bebês com torcicolo, prematuros ou com atraso motor costumam ter melhores resultados quando o acompanhamento começa cedo.',
  },
  {
    question: 'Como é a sessão de fisioterapia infantil?',
    answer:
      'A sessão é feita com brincadeiras e atividades planejadas para estimular força, equilíbrio, coordenação e postura. Os pais recebem orientações para continuar o estímulo em casa, o que faz diferença na evolução da criança.',
  },
  {
    question: 'Qual a diferença entre fisioterapia infantil e terapia ocupacional?',
    answer:
      'A fisioterapia foca no movimento global: sentar, andar, equilíbrio, força e postura. A terapia ocupacional foca na autonomia nas atividades do dia a dia, na coordenação fina e na organização sensorial. Muitas crianças se beneficiam das duas.',
  },
  {
    question: 'Preciso de encaminhamento médico?',
    answer:
      'Não é necessário para a avaliação. A família pode agendar diretamente pelo WhatsApp (62) 99201-3573. Se houver laudo ou relatório do pediatra ou do neuropediatra, vale trazer.',
  },
  {
    question: 'Quanto custa a fisioterapia infantil em Anápolis?',
    answer: PRECO_BASE,
  },
  {
    question: 'A fisioterapia infantil atende por plano de saúde?',
    answer: PLANOS_TERAPIAS,
  },
  {
    question: 'Onde fica a clínica?',
    answer:
      'Na Av. Minas Gerais, 405, bairro Jundiaí, em Anápolis/GO. Atendemos de segunda a sexta, das 8h às 19h, com hora marcada.',
  },
];
