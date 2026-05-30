#!/usr/bin/env node
/**
 * 🔍 Verificador de 301 Redirects
 * Testa todos os redirects do vercel.json contra o domínio real
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const DOMAIN = 'www.clinicafonoinova.com.br';
const TIMEOUT_MS = 15000;

function request(urlStr, method = 'HEAD', maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlStr);
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname + url.search,
      method,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; RedirectBot/1.0)',
        'Accept': '*/*',
      },
    };

    const req = https.request(options, (res) => {
      const location = res.headers.location;
      resolve({
        statusCode: res.statusCode,
        headers: res.headers,
        location,
        url: urlStr,
      });
    });

    req.on('error', reject);
    req.setTimeout(TIMEOUT_MS, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
    req.end();
  });
}

async function followRedirectChain(startUrl, maxDepth = 5) {
  const chain = [];
  let current = startUrl;

  for (let i = 0; i < maxDepth; i++) {
    try {
      const res = await request(current, 'HEAD');
      chain.push({ url: current, status: res.statusCode, location: res.location });

      if (res.statusCode >= 300 && res.statusCode < 400 && res.location) {
        current = res.location.startsWith('http') ? res.location : `https://${DOMAIN}${res.location}`;
        continue;
      }

      // Verifica se destino final é 404
      if (res.statusCode === 404) {
        chain[chain.length - 1].error = 'DESTINO_FINAL_404';
      }

      break;
    } catch (err) {
      chain.push({ url: current, status: 'ERROR', error: err.message });
      break;
    }
  }

  return chain;
}

async function main() {
  const vercelPath = path.join(__dirname, '..', 'vercel.json');
  const config = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
  const redirects = config.redirects || [];

  console.log(`🔍 Testando ${redirects.length} redirects em https://${DOMAIN}\n`);

  const results = {
    ok: [],
    warn: [],
    error: [],
  };

  for (const rule of redirects) {
    const source = rule.source;
    const expectedDest = rule.destination;
    const isPermanent = rule.permanent === true;

    // Pula regras com "has" (host redirect) por simplicidade
    if (rule.has) {
      console.log(`⏭️  Pulando regra com condição (host redirect): ${source}`);
      continue;
    }

    // Pula wildcards com :path* — testa um exemplo simples
    const testPath = source.replace(/:path\*/g, 'teste').replace(/:path/g, 'teste');
    const startUrl = `https://${DOMAIN}${testPath}`;

    const chain = await followRedirectChain(startUrl);
    const last = chain[chain.length - 1];

    // Verificações
    const issues = [];

    if (chain.length === 1 && last.status < 300) {
      issues.push('NÃO_REDIRECIONOU (ainda não deployado?)');
    }

    if (chain.length > 4) {
      issues.push('CHAIN_MUITO_LONGA');
    }

    const hasLoop = chain.some((step, idx) =>
      chain.slice(idx + 1).some(s => s.url === step.url)
    );
    if (hasLoop) {
      issues.push('LOOP_DETECTADO');
    }

    if (last.error === 'DESTINO_FINAL_404') {
      issues.push('DESTINO_FINAL_404');
    }

    if (last.status >= 400 && last.status !== 404) {
      issues.push(`ERRO_HTTP_${last.status}`);
    }

    // Verifica se o destino esperado aparece na chain
    const expectedFull = expectedDest.startsWith('http')
      ? expectedDest
      : `https://${DOMAIN}${expectedDest}`;
    const foundExpected = chain.some(s => s.url === expectedFull || s.location === expectedFull);
    if (!foundExpected && chain.length > 1) {
      issues.push(`DESTINO_INESPERADO (esperava: ${expectedDest})`);
    }

    // Verifica se o primeiro redirect é 301/308
    if (chain.length > 1) {
      const firstRedirect = chain[0];
      if (firstRedirect.status !== 301 && firstRedirect.status !== 308) {
        issues.push(`PRIMEIRO_STATUS_${firstRedirect.status} (deveria ser 301/308)`);
      }
      if (firstRedirect.status === 301 && !isPermanent) {
        issues.push('STATUS_301_MAS_NÃO_MARCADO_PERMANENT');
      }
    }

    const status = issues.length === 0 ? 'ok' : issues.some(i => i.includes('404') || i.includes('LOOP') || i.includes('ERRO_HTTP')) ? 'error' : 'warn';

    const result = {
      source: testPath,
      expectedDest,
      chain: chain.map(c => `${c.status} → ${c.url}`).join(' → '),
      issues,
    };

    results[status].push(result);

    const icon = status === 'ok' ? '✅' : status === 'warn' ? '⚠️' : '❌';
    console.log(`${icon} ${testPath} → ${expectedDest}`);
    if (issues.length) {
      issues.forEach(issue => console.log(`   └─ ${issue}`));
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMO');
  console.log('='.repeat(60));
  console.log(`✅ OK:      ${results.ok.length}`);
  console.log(`⚠️  AVISO:   ${results.warn.length}`);
  console.log(`❌ ERRO:    ${results.error.length}`);

  if (results.error.length) {
    console.log('\n❌ REDIRECTS COM ERRO CRÍTICO:');
    results.error.forEach(r => {
      console.log(`   • ${r.source}`);
      r.issues.forEach(i => console.log(`     - ${i}`));
    });
    process.exit(1);
  }

  if (results.warn.length) {
    console.log('\n⚠️  REDIRECTS COM AVISO:');
    results.warn.forEach(r => {
      console.log(`   • ${r.source}`);
      r.issues.forEach(i => console.log(`     - ${i}`));
    });
  }

  console.log('\n✅ Verificação concluída.');
}

main().catch(err => {
  console.error('💥 Erro fatal:', err);
  process.exit(1);
});
