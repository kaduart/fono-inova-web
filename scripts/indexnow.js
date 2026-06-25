/**
 * 🚀 IndexNow Submission Helper
 * 
 * Envia URLs para o Bing (e outros motores compatíveis com IndexNow)
 * quando novas páginas são publicadas.
 * 
 * Uso:
 *   node scripts/indexnow.js https://www.clinicafonoinova.com.br/artigos/novo-artigo
 *   node scripts/indexnow.js --bulk scripts/urls-para-indexnow.txt
 */

import fs from 'fs';

const INDEXNOW_KEY = 'fc27b457-c887-4f8a-b534-952bfd2d147f';
const HOST = 'www.clinicafonoinova.com.br';
const INDEXNOW_ENDPOINT = 'https://www.bing.com/indexnow';

async function submitUrl(url) {
  try {
    const params = new URLSearchParams({
      url,
      key: INDEXNOW_KEY,
    });

    const response = await fetch(`${INDEXNOW_ENDPOINT}?${params.toString()}`, {
      method: 'GET',
    });

    if (response.ok) {
      console.log(`✅ Enviado: ${url}`);
      return true;
    } else {
      console.error(`❌ Falha (${response.status}): ${url}`);
      const text = await response.text();
      console.error(text);
      return false;
    }
  } catch (error) {
    console.error(`❌ Erro ao enviar ${url}:`, error.message);
    return false;
  }
}

async function submitBulk(filePath) {
  const urls = fs.readFileSync(filePath, 'utf-8')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

  console.log(`Enviando ${urls.length} URLs...`);
  
  for (const url of urls) {
    await submitUrl(url);
    // Pequeno delay para não sobrecarregar a API
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Uso:');
    console.log('  node scripts/indexnow.js <URL>');
    console.log('  node scripts/indexnow.js --bulk <arquivo-com-urls.txt>');
    process.exit(1);
  }

  if (args[0] === '--bulk' && args[1]) {
    await submitBulk(args[1]);
  } else {
    await submitUrl(args[0]);
  }
}

main();
