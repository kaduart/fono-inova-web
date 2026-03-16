#!/usr/bin/env node
// Script para gerar imagens premium usando Leonardo.ai API
// Requer: LEONARDO_API_KEY no .env

const fs = require('fs');
const path = require('path');

// Configurações de imagens premium
const imageConfigs = [
  {
    filename: 'bebe-nao-fala.jpg',
    prompt: 'Professional photography, baby 8 months old making sounds, mother talking to baby face to face, warm natural lighting, soft pastel colors, shallow depth of field, cozy home environment, bonding moment, high quality, 8k, photorealistic',
    alt: 'Bebê interagindo com a mãe - marcos do desenvolvimento da fala infantil'
  },
  {
    filename: 'estimular-fala.jpg',
    prompt: 'Professional photography, parents reading colorful picture book to toddler 2 years old, cozy living room, educational moment, warm lighting, happy atmosphere, pointing at images, learning together, high quality, 8k, photorealistic',
    alt: 'Pais lendo livro colorido para criança - estimulação da linguagem'
  },
  {
    filename: 'fala-tardia-causas.jpg',
    prompt: 'Professional photography, speech therapist desk with therapy materials, flash cards, alphabet blocks, educational toys, professional office, organized, soft natural light, wooden table, child-friendly environment, high quality, 8k',
    alt: 'Fonoaudióloga com material terapêutico - avaliação de fala tardia'
  },
  {
    filename: 'autismo-guia.jpg',
    prompt: 'Professional photography, child with autism engaging in sensory play therapy, colorful textured toys, therapist hands guiding gently, warm inviting room, soft lighting, focused attention, safe space, high quality, 8k, photorealistic',
    alt: 'Criança em atividade terapêutica para autismo'
  },
  {
    filename: 'desenvolvimento-motor.jpg',
    prompt: 'Professional photography, child climbing soft play structure, gross motor activity, indoor playground, action shot, energy and movement, colorful foam blocks, joyful expression, physical therapy setting, high quality, 8k',
    alt: 'Criança em atividade de coordenação motora'
  },
  {
    filename: 'fala-tardia-crianca.jpg',
    prompt: 'Professional photography, toddler pointing and trying to communicate, expressive gesture, parent listening attentively, emotional connection moment, living room setting, soft focus background, warm tones, high quality, 8k',
    alt: 'Criança tentando se comunicar - avaliação de fala tardia'
  },
  {
    filename: 'faq-desenvolvimento.jpg',
    prompt: 'Professional photography, family sitting with child therapist, consultation room, supportive atmosphere, professional guidance, warm lighting, parents listening, notebook and pen, welcoming environment, high quality, 8k',
    alt: 'Família em consulta na Clínica Fono Inova'
  },
  {
    filename: 'tdah-infantil.jpg',
    prompt: 'Professional photography, child with ADHD focused on completing puzzle, concentration moment, colorful educational materials, achievement expression, wooden table, soft natural light, determination, high quality, 8k',
    alt: 'Criança concentrada em atividade terapêutica - TDAH'
  },
  {
    filename: 'seletividade-alimentar.jpg',
    prompt: 'Professional photography, child exploring new fruits and vegetables, colorful healthy foods, playful approach to nutrition, bright kitchen setting, curious expression, rainbow of vegetables, food therapy, high quality, 8k',
    alt: 'Criança explorando alimentos coloridos - terapia de seletividade alimentar'
  },
  {
    filename: 'processamento-auditivo.jpg',
    prompt: 'Professional photography, child wearing professional headphones, hearing test session, audiology booth, concentrating on sounds, modern equipment, clinical but child-friendly environment, sound therapy, high quality, 8k',
    alt: 'Criança em avaliação auditiva com fones profissionais'
  },
  {
    filename: 'orientacao-parental.jpg',
    prompt: 'Professional photography, parents in consultation with child psychologist, therapy office, supportive conversation, taking notes, warm professional setting, understanding expressions, guidance moment, high quality, 8k',
    alt: 'Pais em conversa com terapeuta - orientação parental'
  }
];

// Configurações do Leonardo.ai
const LEONARDO_API_KEY = process.env.LEONARDO_API_KEY;
const OUTPUT_DIR = path.join(__dirname, '../public/images/artigos');

async function generateImage(config) {
  console.log(`🎨 Gerando: ${config.filename}`);
  console.log(`   Prompt: ${config.prompt.substring(0, 80)}...`);
  
  // Aqui você integraria com a API do Leonardo.ai
  // Documentação: https://docs.leonardo.ai/
  
  console.log(`   ✅ ${config.filename} - Configurado (adicionar API key para gerar)`);
}

async function main() {
  console.log('🚀 Gerador de Imagens Premium - Clínica Fono Inova\n');
  
  // Verificar diretório
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  // Verificar API Key
  if (!LEONARDO_API_KEY) {
    console.log('⚠️  LEONARDO_API_KEY não encontrada no .env');
    console.log('   Para usar:\n');
    console.log('   1. Crie conta em: https://leonardo.ai');
    console.log('   2. Gere uma API Key');
    console.log('   3. Adicione ao .env: LEONARDO_API_KEY=sua_chave_aqui\n');
    console.log('   Configurações preparadas:\n');
  }
  
  // Mostrar configurações
  for (const config of imageConfigs) {
    console.log(`📷 ${config.filename}`);
    console.log(`   Alt: ${config.alt}`);
    console.log(`   Prompt: ${config.prompt.substring(0, 60)}...\n`);
  }
  
  console.log('\n✨ Total de imagens configuradas:', imageConfigs.length);
  console.log('\n💡 Alternativa sem API:');
  console.log('   Use os prompts acima no Midjourney ou DALL-E 3');
}

main().catch(console.error);

// Exportar configs para uso em outros scripts
module.exports = { imageConfigs };
