# 🚀 Configuração do IndexNow

## Chave gerada

```
fc27b457-c887-4f8a-b534-952bfd2d147f
```

## Arquivos criados

- `public/fc27b457-c887-4f8a-b534-952bfd2d147f.txt` → validação no Bing
- `dist/fc27b457-c887-4f8a-b534-952bfd2d147f.txt` → validação no ambiente de produção
- `scripts/indexnow.js` → helper para envio de URLs
- `scripts/urls-para-indexnow.txt` → lista de URLs para envio em massa

## Como validar no Bing Webmaster Tools

1. Acesse: https://www.bing.com/webmasters/indexnow
2. Cole a chave: `fc27b457-c887-4f8a-b534-952bfd2d147f`
3. O Bing vai verificar o arquivo em:
   ```
   https://www.clinicafonoinova.com.br/fc27b457-c887-4f8a-b534-952bfd2d147f.txt
   ```
4. Clique em **Verify** / **Validar**

## Como enviar URLs

### Uma URL

```bash
node scripts/indexnow.js https://www.clinicafonoinova.com.br/artigos/teste-da-linguinha-guia-completo
```

### Várias URLs (em massa)

```bash
node scripts/indexnow.js --bulk scripts/urls-para-indexnow.txt
```

## Quando enviar

Sempre que publicar páginas novas ou fizer alterações importantes:

- Novos artigos do blog
- Novas landing pages
- Atualizações de conteúdo relevantes
- Correções de SEO importantes

## Benefícios

- Indexação mais rápida no Bing
- Melhor visibilidade no Microsoft Copilot e AI Overviews
- Menor dependência de crawl passivo
