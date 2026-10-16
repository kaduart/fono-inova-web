import type { FAQItem } from './seoStructures';

// FAQ visível + dados estruturados (via FAQSection). Perguntas baseadas em buscas reais (AnswerThePublic/Google, out/2026).
// Regras de verdade: sessão 40 min; avaliação 1 h (anamnese com os pais, criança não precisa estar presente);
// laudo de autismo/TDAH somente pelo neuropediatra; convênio só BAAN + particular com recibo; sem números não confirmados.

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
    question: 'Vocês atendem pelo plano de saúde?',
    answer:
      'Hoje atendemos pelo convênio da Base Aérea de Anápolis (BAAN) e no atendimento particular. No particular, emitimos o recibo para você solicitar reembolso ao seu plano de saúde, conforme as regras do plano.',
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
