// SCHEMAS ESPECÍFICOS PARA CADA PÁGINA DA FONO INOVA
// Geo-coordenadas fixas: Av. Minas Gerais, Jundiaí, Anápolis/GO
const COORDS = {
    lat: -16.333449,
    lon: -48.948923
};

const ENDERECO_COMPLETO = {
    "@type": "PostalAddress",
    "streetAddress": "Av. Minas Gerais, 405 - Jundiaí",
    "addressLocality": "Anápolis",
    "addressRegion": "GO",
    "postalCode": "75110-000",
    "addressCountry": "BR"
};

const CONTATO = {
    telephone: "+55-62-9XXXX-XXXX", // Substitua pelo seu WhatsApp real
    email: "contato@clinicafonoinova.com.br",
    url: "https://www.clinicafonoinova.com.br"
};

// ==========================================
// SCHEMA BASE (REUTILIZÁVEL)
// ==========================================
export const schemaBaseLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": "https://www.clinicafonoinova.com.br/#local",
    "name": "Clínica Fono Inova",
    "alternateName": "Fono Inova Anápolis",
    "description": "Clínica multidisciplinar infantil em Anápolis especializada em fonoaudiologia, fisioterapia, psicologia e terapia ocupacional no bairro Jundiaí",
    "url": CONTATO.url,
    "telephone": CONTATO.telephone,
    "email": CONTATO.email,
    "priceRange": "$$",
    "image": "https://www.clinicafonoinova.com.br/images/og-image.jpg",
    "address": ENDERECO_COMPLETO,
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": COORDS.lat,
        "longitude": COORDS.lon
    },
    "openingHoursSpecification": [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "18:00"
        },
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Saturday",
            "opens": "08:00",
            "closes": "12:00"
        }
    ],
    "medicalSpecialty": [
        "SpeechLanguagePathology",
        "PhysicalTherapy",
        "Psychology",
        "OccupationalTherapy"
    ]
};

export const schemaFAQPsicologia = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Onde fica o atendimento psicológico infantil em Anápolis?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "O atendimento psicológico infantil da Fono Inova fica no bairro Jundiaí, na Av. Minas Gerais, em Anápolis/GO. Atendemos crianças com TDAH, ansiedade e autismo."
            }
        },
        {
            "@type": "Question",
            "name": "Como saber se meu filho tem TDAH em Anápolis?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "O diagnóstico de TDAH deve ser feito por um psicólogo especializado através de avaliação completa. Na Fono Inova no Jundiaí, realizamos entrevistas, testes específicos e observação comportamental."
            }
        }
    ]
};


export const schemaFAQPsicopedagogia = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Onde fazer avaliação psicopedagógica em Anápolis?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A avaliação psicopedagógica é realizada na Clínica Fono Inova, localizada no bairro Jundiaí, na Av. Minas Gerais em Anápolis/GO. Atendemos crianças com dificuldades de aprendizagem, dislexia e TDAH."
            }
        },
        {
            "@type": "Question",
            "name": "Como saber se meu filho precisa de psicopedagogo em Anápolis?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Se seu filho tem dificuldades persistentes na alfabetização, troca letras, escreve espelhado ou tem notas baixas apesar de estudar, é hora de buscar ajuda psicopedagógica no Jundiaí."
            }
        },
        {
            "@type": "Question",
            "name": "Psicopedagogia em Anápolis atende dislexia?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sim! A Fono Inova no bairro Jundiaí oferece atendimento especializado para dislexia, discalculia e disgrafia, com métodos fônicos e multissensoriais."
            }
        }
    ]
};

// ==========================================
// SCHEMAS ESPECÍFICOS POR PÁGINA
// ==========================================

// 1. HOME PAGE (MedicalBusiness completo com tudo)
export const schemaHome = {
    ...schemaBaseLocalBusiness,
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Serviços Terapêuticos Infantis em Anápolis",
        "itemListElement": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "MedicalTherapy",
                    "name": "Fonoaudiologia Infantil",
                    "url": "https://www.clinicafonoinova.com.br/fonoaudiologia"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "MedicalTherapy",
                    "name": "Fisioterapia Pediátrica",
                    "url": "https://www.clinicafonoinova.com.br/fisioterapia"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "MedicalTherapy",
                    "name": "Psicologia Infantil",
                    "url": "https://www.clinicafonoinova.com.br/psicologia"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "MedicalTherapy",
                    "name": "Teste da Linguinha",
                    "url": "https://www.clinicafonoinova.com.br/freio-lingual"
                }
            }
        ]
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "127",
        "bestRating": "5"
    }
};

// 2. FONOAUDIOLOGIA (FonoPage.tsx)
export const schemaFonoaudiologia = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Fonoaudiologia Infantil em Anápolis | Fono Inova",
    "description": "Tratamento especializado em atraso de fala, distúrbios de linguagem e comunicação infantil no bairro Jundiaí, Anápolis.",
    "url": "https://www.clinicafonoinova.com.br/fonoaudiologia",
    "about": {
        "@type": "MedicalProcedure",
        "name": "Fonoaudiologia Infantil",
        "procedureType": "Terapia de Linguagem",
        "bodyLocation": "Fala, linguagem e deglutição",
        "indication": ["Atraso de fala", "Distúrbios articulatórios", "Autismo", "Síndrome de Down"]
    },
    "provider": {
        "@type": "MedicalBusiness",
        "name": "Clínica Fono Inova",
        "address": ENDERECO_COMPLETO
    },
    "image": "https://www.clinicafonoinova.com.br/images/servicos/fonoaudiologia.jpg"
};

// 3. FISIOTERAPIA (FisioPage.tsx)
export const schemaFisioterapia = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Fisioterapia Infantil em Anápolis | Fono Inova",
    "description": "Fisioterapia pediátrica para desenvolvimento motor, torticólis, atraso motor e reabilitação infantil no Jundiaí.",
    "url": "https://www.clinicafonoinova.com.br/fisioterapia",
    "about": {
        "@type": "MedicalTherapy",
        "name": "Fisioterapia Pediátrica",
        "relevantSpecialty": "PhysicalTherapy",
        "procedureType": "Reabilitação motora infantil"
    },
    "provider": {
        "@type": "MedicalBusiness",
        "name": "Clínica Fono Inova",
        "address": ENDERECO_COMPLETO
    }
};

// 4. FREIO LINGUAL (FreioLingual.tsx) - PALAVRA-CHAVE OURO
export const schemaFreioLingual = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Teste da Linguinha Anápolis | Freio Lingual - Fono Inova",
    "description": "Avaliação e tratamento do freio lingual (língua presa) em bebês e crianças no bairro Jundiaí, Anápolis. Melhora na amamentação e fala.",
    "url": "https://www.clinicafonoinova.com.br/freio-lingual",
    "about": {
        "@type": "MedicalProcedure",
        "name": "Avaliação do Freio Lingual",
        "alternateName": "Teste da Linguinha",
        "procedureType": "Diagnóstico e intervenção",
        "bodyLocation": "Freio lingual (língua)",
        "indication": ["Dificuldade na amamentação", "Língua presa", "Anquiloglossia", "Problemas de fala"]
    },
    "provider": {
        "@type": "MedicalBusiness",
        "name": "Clínica Fono Inova",
        "address": ENDERECO_COMPLETO
    },
    "image": "https://www.clinicafonoinova.com.br/images/servicos/freio-lingual.jpg"
};

// 5. PSICOLOGIA (PsicoPage.tsx)
export const schemaPsicologia = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Psicologia Infantil em Anápolis | Fono Inova",
    "description": "Acompanhamento psicológico infantil para desenvolvimento emocional, comportamental e social em Anápolis.",
    "url": "https://www.clinicafonoinova.com.br/psicologia",
    "about": {
        "@type": "MedicalTherapy",
        "name": "Psicologia Infantil",
        "relevantSpecialty": "Psychology"
    },
    "provider": {
        "@type": "MedicalBusiness",
        "name": "Clínica Fono Inova",
        "address": ENDERECO_COMPLETO
    }
};

// 6. NEUROPSICOLOGIA (NeuroPsicologia.tsx)
export const schemaNeuropsicologia = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Avaliação Neuropsicológica Infantil Anápolis | Fono Inova",
    "description": "Avaliação neuropsicológica completa para diagnóstico de TEA, TDAH, dislexia e transtornos do neurodesenvolvimento em Anápolis.",
    "url": "https://www.clinicafonoinova.com.br/avaliacao-neuropsicologica",
    "about": {
        "@type": "MedicalProcedure",
        "name": "Avaliação Neuropsicológica Infantil",
        "procedureType": "Diagnóstico cognitivo",
        "indication": ["TEA", "TDAH", "Dislexia", "Dificuldades de aprendizagem"]
    },
    "provider": {
        "@type": "MedicalBusiness",
        "name": "Clínica Fono Inova",
        "address": ENDERECO_COMPLETO
    }
};

// 7. TEA (TeaPage.tsx)
export const schemaTea = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Tratamento para Autismo (TEA) em Anápolis | Fono Inova",
    "description": "Atendimento multidisciplinar para crianças com Transtorno do Espectro Autista (TEA) no bairro Jundiaí, Anápolis.",
    "url": "https://www.clinicafonoinova.com.br/tea",
    "about": {
        "@type": "MedicalCondition",
        "name": "Transtorno do Espectro Autista",
        "alternateName": "TEA",
        "possibleTreatment": ["Fonoaudiologia", "Terapia Ocupacional", "Psicologia"]
    },
    "provider": {
        "@type": "MedicalBusiness",
        "name": "Clínica Fono Inova",
        "address": ENDERECO_COMPLETO
    }
};

// 8. TERAPIA OCUPACIONAL (TerapiaOcupacionalPage.tsx)
export const schemaTerapiaOcupacional = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Terapia Ocupacional Infantil em Anápolis | Fono Inova",
    "description": "Terapia ocupacional para desenvolvimento de habilidades motoras, sensoriais e autonomia infantil no Jundiaí.",
    "url": "https://www.clinicafonoinova.com.br/terapia-ocupacional",
    "about": {
        "@type": "MedicalTherapy",
        "name": "Terapia Ocupacional Infantil",
        "relevantSpecialty": "OccupationalTherapy"
    },
    "provider": {
        "@type": "MedicalBusiness",
        "name": "Clínica Fono Inova",
        "address": ENDERECO_COMPLETO
    }
};

// 9. PSICOPEDAGOGIA (PsicopedagogiaPage.tsx)
export const schemaPsicopedagogia = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Psicopedagogia em Anápolis | Dificuldades de Aprendizagem",
    "description": "Psicopedagogia especializada em dificuldades de aprendizagem, dislexia, TDAH e desenvolvimento escolar em Anápolis.",
    "url": "https://www.clinicafonoinova.com.br/psicopedagogia",
    "about": {
        "@type": "MedicalTherapy",
        "name": "Psicopedagogia Clínica",
        "relevantSpecialty": "SpeechLanguagePathology" // Schema não tem psicopedagogia específica, usamos mais próximo
    },
    "provider": {
        "@type": "MedicalBusiness",
        "name": "Clínica Fono Inova",
        "address": ENDERECO_COMPLETO
    }
};

// 10. FALA TARDIA (FalaTardiaPage.tsx) - Página de nicho específico
export const schemaFalaTardia = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Fala Tardia em Crianças | Tratamento Anápolis - Fono Inova",
    "description": "Tratamento especializado para crianças com atraso na fala e linguagem. Fonoaudiologia infantil no bairro Jundiaí, Anápolis.",
    "url": "https://www.clinicafonoinova.com.br/fala-tardia",
    "about": {
        "@type": "MedicalCondition",
        "name": "Atraso no Desenvolvimento da Linguagem",
        "alternateName": ["Fala tardia", "Atraso de fala"],
        "possibleTreatment": "Fonoaudiologia"
    },
    "provider": {
        "@type": "MedicalBusiness",
        "name": "Clínica Fono Inova",
        "address": ENDERECO_COMPLETO
    }
};

// 11. DIFICULDADE ESCOLAR (DificuldadeEscolarPage.tsx)
export const schemaDificuldadeEscolar = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Dificuldade Escolar em Anápolis | Tratamento - Fono Inova",
    "description": "Avaliação e tratamento de dificuldades escolares, dislexia, disgrafia e TDAH em crianças do Jundiaí, Anápolis.",
    "url": "https://www.clinicafonoinova.com.br/dificuldade-escolar",
    "about": {
        "@type": "MedicalCondition",
        "name": "Dificuldades de Aprendizagem Escolar",
        "possibleTreatment": ["Psicopedagogia", "Psicologia", "Fonoaudiologia"]
    },
    "provider": {
        "@type": "MedicalBusiness",
        "name": "Clínica Fono Inova",
        "address": ENDERECO_COMPLETO
    }
};

// 12. ADULTO VOZ (AdultoVozPage.tsx)
export const schemaAdultoVoz = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Fonoaudiologia para Adultos em Anápolis | Voz - Fono Inova",
    "description": "Tratamento de distúrbios da voz, rouquidão e reabilitação vocal para adultos no bairro Jundiaí, Anápolis.",
    "url": "https://www.clinicafonoinova.com.br/fonoaudiologia-adulto",
    "about": {
        "@type": "MedicalTherapy",
        "name": "Fonoaudiologia para Adultos",
        "procedureType": "Terapia vocal"
    },
    "provider": {
        "@type": "MedicalBusiness",
        "name": "Clínica Fono Inova",
        "address": ENDERECO_COMPLETO
    }
};

// 13. CLÍNICA MULTIDISCIPLINAR (ClinicaMultidisciplinar.tsx)
export const schemaMultidisciplinar = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Clínica Multidisciplinar Infantil em Anápolis | Fono Inova",
    "description": "Clínica multidisciplinar com fonoaudiologia, psicologia, fisioterapia e terapia ocupacional integradas no Jundiaí.",
    "url": "https://www.clinicafonoinova.com.br/clinica-multidisciplinar",
    "about": {
        "@type": "MedicalClinic",
        "name": "Clínica Multidisciplinar Infantil",
        "availableService": ["Fonoaudiologia", "Psicologia", "Fisioterapia", "Terapia Ocupacional"]
    },
    "provider": {
        "@type": "MedicalBusiness",
        "name": "Clínica Fono Inova",
        "address": ENDERECO_COMPLETO
    }
};

// 14. FAQ (Faq.tsx) - Schema especial de perguntas
export const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Onde fica a Clínica Fono Inova em Anápolis?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A Fono Inova fica no bairro Jundiaí, na Av. Minas Gerais, em Anápolis/GO. Atendemos crianças de toda a região."
            }
        },
        {
            "@type": "Question",
            "name": "Quanto custa o teste da linguinha em Anápolis?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A avaliação do freio lingual (teste da linguinha) na Fono Inova tem valor acessível. Entre em contato pelo WhatsApp para valores atualizados e convênios aceitos."
            }
        },
        {
            "@type": "Question",
            "name": "Atende por convênio?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sim, a Fono Inova atende diversos convênios de saúde. Consulte disponibilidade para fonoaudiologia, fisioterapia, psicologia e terapia ocupacional."
            }
        },
        {
            "@type": "Question",
            "name": "Qual o horário de atendimento?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Atendemos de segunda a sexta das 8h às 18h e aos sábados das 8h às 12h, no bairro Jundiaí em Anápolis."
            }
        }
    ]
};

export const schemaFAQTO = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Onde fazer terapia ocupacional infantil em Anápolis?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A terapia ocupacional infantil é oferecida na Clínica Fono Inova, localizada no bairro Jundiaí, em Anápolis/GO. Atendemos crianças com integração sensorial, autonomia e coordenação motora."
            }
        },
        {
            "@type": "Question",
            "name": "Qual o valor da sessão de terapia ocupacional no Jundiaí?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Na Fono Inova no bairro Jundiaí, oferecemos valores acessíveis e parcelamos direto. Aceitamos convênios. Entre em contato pelo WhatsApp para valores atualizados."
            }
        }
    ]
};

export const schemaFAQTea = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Onde fazer avaliação de autismo (TEA) em Anápolis?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A avaliação para TEA é realizada na Clínica Fono Inova, no bairro Jundiaí, em Anápolis/GO. Temos equipe multidisciplinar com psicólogos, fonoaudiólogos e terapeutas ocupacionais especializados em autismo infantil."
            }
        },
        {
            "@type": "Question",
            "name": "Qual o melhor lugar para avaliar meu filho com suspeita de autismo no Jundiaí?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No bairro Jundiaí, a Fono Inova oferece avaliação multidisciplinar completa para TEA, com profissionais experientes em diagnóstico precoce do autismo. Atendemos crianças de Anápolis e região."
            }
        }
    ]
};

export const schemaFAQFalaTardia = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Com que idade devo procurar fonoaudiologia em Anápolis?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Se seu filho tem 2 anos e fala menos de 50 palavras, ou 3 anos e não forma frases, é hora de buscar ajuda na Fono Inova no bairro Jundiaí."
            }
        },
        {
            "@type": "Question",
            "name": "Onde fica a clínica de fonoaudiologia no Jundiaí?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A Fono Inova fica na Av. Minas Gerais, no bairro Jundiaí em Anápolis/GO, com fácil estacionamento e acesso."
            }
        }
    ]
};

// 15. ARTIGOS/BLOG (Articles.tsx e Article.jsx) - Article schema
export const schemaArticle = (titulo, descricao, imagem, url, dataPublicacao) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": titulo,
    "description": descricao,
    "image": imagem,
    "url": url,
    "datePublished": dataPublicacao,
    "author": {
        "@type": "Organization",
        "name": "Clínica Fono Inova"
    },
    "publisher": {
        "@type": "MedicalBusiness",
        "name": "Clínica Fono Inova",
        "logo": {
            "@type": "ImageObject",
            "url": "https://www.clinicafonoinova.com.br/images/logo.png"
        }
    }
});

export const schemaFAQFisio = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Onde fazer fisioterapia infantil em Anápolis?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A fisioterapia infantil é realizada na Clínica Fono Inova, no bairro Jundiaí, em Anápolis/GO. Atendemos bebês e crianças com atraso motor, torcicolo e paralisia cerebral."
            }
        }
    ]
};

export const schemaFAQMultidisciplinar = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Onde fica a clínica multidisciplinar infantil em Anápolis?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A Clínica Fono Inova fica no bairro Jundiaí, na Av. Minas Gerais, em Anápolis/GO. Oferecemos atendimento multidisciplinar com fonoaudiologia, psicologia, fisioterapia e terapia ocupacional integradas no mesmo local."
            }
        },
        {
            "@type": "Question",
            "name": "Qual a vantagem de uma clínica multidisciplinar no Jundiaí?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Na Fono Inova no bairro Jundiaí, você tem acesso a todos os especialistas no mesmo lugar, com equipe integrada e comunicação constante entre profissionais. Isso evita deslocamentos múltiplos e garante tratamento coordenado para seu filho."
            }
        }
    ]
};

export const schemaFAQAdulto = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Onde fazer fonoaudiologia para adultos em Anápolis?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A fonoaudiologia para adultos é realizada na Clínica Fono Inova, localizada no bairro Jundiaí, na Av. Minas Gerais em Anápolis/GO. Atendemos rouquidão, disfagia e treinamento vocal para profissionais."
            }
        },
        {
            "@type": "Question",
            "name": "Quanto custa a avaliação fonoaudiológica para adultos no Jundiaí?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Na Fono Inova no bairro Jundiaí, a avaliação fonoaudiológica para adultos tem valor acessível. Aceitamos convênios. Entre em contato pelo WhatsApp para valores atualizados de avaliação e sessões."
            }
        }
    ]
};

// FAQ ESPECÍFICO PARA DIFICULDADE ESCOLAR - ESSENCIAL PARA SEO LOCAL
export const schemaFAQDificuldadeEscolar = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Onde fazer avaliação neuropsicológica para dificuldade escolar em Anápolis?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A avaliação neuropsicológica infantil é realizada na Clínica Fono Inova, localizada no bairro Jundiaí, na Av. Minas Gerais em Anápolis/GO. Identificamos dislexia, TDAH, discalculia e outras dificuldades de aprendizagem através de testes padronizados."
            }
        },
        {
            "@type": "Question",
            "name": "Como saber se meu filho precisa de psicólogo ou psicopedagogo no Jundiaí?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Se seu filho estuda muito mas tira notas baixas, troca letras (b/d, p/q), demora muito para fazer lição de casa ou tem desânimo com a escola, é hora de buscar ajuda. Na Fono Inova no bairro Jundiaí fazemos a avaliação completa para identificar se a causa é TDAH, dislexia ou outra dificuldade específica."
            }
        },
        {
            "@type": "Question",
            "name": "Qual o valor da avaliação neuropsicológica em Anápolis?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Na Clínica Fono Inova no bairro Jundiaí, a avaliação neuropsicológica infantil tem preço acessível e parcelamos direto. O investimento inclui processo completo: entrevista inicial, testes específicos, relatório técnico detalhado e devolutiva com orientações. Entre em contato pelo WhatsApp para valores atualizados."
            }
        },
        {
            "@type": "Question",
            "name": "A dislexia tem cura com tratamento?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A dislexia não tem 'cura', pois é um jeito diferente do cérebro processar a linguagem escrita, mas com reabilitação neuropsicológica especializada (fonoaudiologia e psicopedagogia), a criança desenvolve estratégias eficientes para ler e escrever normalmente. Na Fono Inova trabalhamos métodos fônicos e multissensoriais adaptados."
            }
        }
    ]
};


export const schemaFAQFreioLingual = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Onde fazer o teste da linguinha em Anápolis?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "O teste da linguinha (avaliação do freio lingual) é realizado na Clínica Fono Inova, localizada no bairro Jundiaí, na Av. Minas Gerais em Anápolis/GO. Atendemos bebês, crianças e adultos com suspeita de língua presa."
            }
        },
        {
            "@type": "Question",
            "name": "Quanto custa a avaliação do freio lingual no Jundiaí?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Na Fono Inova no bairro Jundiaí, oferecemos avaliação completa do freio lingual com valor acessível. Aceitamos convênios. Entre em contato pelo WhatsApp para valores atualizados da consulta e procedimento cirúrgico."
            }
        },
        {
            "@type": "Question",
            "name": "Preciso de encaminhamento para frenotomia em Anápolis?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sim, a avaliação fonoaudiológica é necessária antes da cirurgia. Na Fono Inova avaliamos e encaminhamos para cirurgiões parceiros no bairro Jundiaí ou em Anápolis, realizando também o acompanhamento pré e pós-operatório."
            }
        }
    ]
};