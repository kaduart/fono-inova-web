/**
 * 🧪 TESTE DE WHATSAPP EM PRODUÇÃO
 * 
 * Como usar:
 * 1. Abra o site em produção
 * 2. Abra o console do navegador (F12)
 * 3. Cole este código e aperte Enter
 * 4. Clique em qualquer botão de WhatsApp
 * 5. Veja os logs no console
 */

(function() {
    console.log('🧪 INICIANDO TESTE DE WHATSAPP...');
    
    let cliquesDetectados = 0;
    let janelasAbertas = 0;
    
    // Intercepta window.open
    const originalOpen = window.open;
    window.open = function(url, target, features) {
        console.log('📱 window.open() chamado:', url);
        
        if (url.includes('wa.me')) {
            console.log('✅ LINK DO WHATSAPP DETECTADO!');
            console.log('📞 Número:', url.match(/wa.me\/(\d+)/)?.[1] || 'N/A');
            console.log('💬 Mensagem:', decodeURIComponent(url.match(/text=([^&]+)/)?.[1] || 'Sem mensagem'));
            janelasAbertas++;
            
            // Alerta visual
            const div = document.createElement('div');
            div.innerHTML = `
                <div style="
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #25d366;
                    color: white;
                    padding: 20px;
                    border-radius: 10px;
                    z-index: 99999;
                    font-family: sans-serif;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                ">
                    <h3>✅ WhatsApp Funcionando!</h3>
                    <p>Número: ${url.match(/wa.me\/(\d+)/)?.[1] || 'N/A'}</p>
                    <p>Janelas abertas: ${janelasAbertas}</p>
                </div>
            `;
            document.body.appendChild(div);
            setTimeout(() => div.remove(), 3000);
        }
        
        // Chama o original
        return originalOpen.apply(this, arguments);
    };
    
    // Monitora cliques em links
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a, button');
        if (!target) return;
        
        const href = target.href || target.getAttribute('onclick') || '';
        
        if (href.includes('wa.me') || target.textContent.toLowerCase().includes('whatsapp')) {
            cliquesDetectados++;
            console.log('🖱️ CLIQUE EM WHATSAPP DETECTADO!');
            console.log('   Elemento:', target.tagName);
            console.log('   Texto:', target.textContent?.substring(0, 50));
            console.log('   Href:', href);
            
            // Verifica se gtag existe
            if (typeof window.gtag === 'function') {
                console.log('✅ GA4 (gtag) está carregado');
            } else {
                console.warn('⚠️ GA4 (gtag) NÃO está carregado');
            }
            
            // Verifica se fbq existe
            if (typeof window.fbq === 'function') {
                console.log('✅ Meta Pixel (fbq) está carregado');
            } else {
                console.warn('⚠️ Meta Pixel (fbq) NÃO está carregado');
            }
        }
    }, true);
    
    console.log('✅ Monitoramento ativado!');
    console.log('   Agora clique em qualquer botão de WhatsApp e veja os logs aqui.');
    
    // Mostra status atual
    console.log('📊 STATUS ATUAL:');
    console.log('   GA4 ID:', window.dataLayer?.find(e => e[0] === 'config')?.[1] || 'N/A');
    console.log('   gtag:', typeof window.gtag === 'function' ? '✅ OK' : '❌ Não carregado');
    console.log('   fbq:', typeof window.fbq === 'function' ? '✅ OK' : '❌ Não carregado');
    
})();

/**
 * 🧪 TESTE RÁPIDO - Simula clique programaticamente
 * 
 * Execute esta parte para testar sem clicar manualmente:
 */

function testarWhatsAppButton() {
    console.log('\n🧪 TESTE AUTOMÁTICO DE BOTÕES WHATSAPP...\n');
    
    // Procura botões de WhatsApp
    const botoes = [
        ...document.querySelectorAll('a[href*="wa.me"]'),
        ...document.querySelectorAll('button'),
        ...document.querySelectorAll('[onclick*="wa.me"]')
    ].filter(el => {
        const text = (el.textContent || el.href || '').toLowerCase();
        return text.includes('whatsapp') || text.includes('wa.me');
    });
    
    console.log(`🔍 Encontrados ${botoes.length} botões de WhatsApp:`);
    
    botoes.forEach((btn, i) => {
        console.log(`\n[${i + 1}] ${btn.tagName}`);
        console.log('    Texto:', btn.textContent?.substring(0, 50)?.trim());
        console.log('    Link:', btn.href || 'N/A');
        
        // Verifica o número
        const match = (btn.href || '').match(/wa.me\/(\d+)/);
        if (match) {
            const numero = match[1];
            console.log('    Número:', numero);
            console.log('    ✅ Correto:', numero === '5562992013573' ? 'SIM' : '❌ NÃO!');
        }
    });
    
    return botoes;
}

// Executa o teste automático
testarWhatsAppButton();

console.log('\n📋 RESUMO DOS TESTES:');
console.log('   1. Abra qualquer botão de WhatsApp');
console.log('   2. Veja se aparece o alerta verde ✅');
console.log('   3. Verifique se o WhatsApp abriu em nova aba');
console.log('   4. Confirme o número: 5562992013573');
