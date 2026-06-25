# 🚀 Configuração do Prerender.io no Vercel

## O que isso resolve

O site é uma SPA React. Sem prerender, o Bing/Google recebem o HTML vazio 
com título padrão (`Clínica Fono Inova em Anápolis`) para todas as páginas.

O Prerender.io gera HTML estático para bots, resolvendo:
- Títulos duplicados
- Descriptions faltando
- h1 faltando
- Conteúdo insuficiente

---

## Como configurar

### 1. Criar conta no Prerender.io

Acesse: https://prerender.io

- Plano gratuito: 250 páginas/mês
- Copie o token gerado (API Token)

### 2. Adicionar variável de ambiente no Vercel

No Vercel Dashboard:
1. Vá em **Settings → Environment Variables**
2. Clique em **Add**
3. Preencha:
   - **Name:** `PRERENDER_TOKEN`
   - **Value:** cole o token copiado
   - **Environments:** Production + Preview + Development
4. Clique em **Save**

Ou via CLI:

```bash
vercel env add PRERENDER_TOKEN
# cole o token
# selecione: Production + Preview + Development
```

### 3. Deploy

```bash
vercel --prod
```

---

## Arquivos no projeto

- **`middleware.js`** → Edge Middleware que detecta bots e envia para Prerender.io
- **`vercel.json`** → regras de redirect e SPA fallback

---

## Como testar

### Testar com bot (Googlebot)

```bash
curl -A "Googlebot" https://www.clinicafonoinova.com.br/fonoaudiologia-anapolis | grep -i "<title>"
```

**Esperado:**
```html
<title>Fonoaudiologia Infantil em Anápolis | Clínica Fono Inova</title>
```

### Testar página normal (usuário)

```bash
curl -A "Mozilla/5.0" https://www.clinicafonoinova.com.br/fonoaudiologia-anapolis | head -20
```

---

## URLs para forçar recache no Prerender.io

Após o deploy, acesse o dashboard do Prerender.io e solicite recache:

```
https://www.clinicafonoinova.com.br/
https://www.clinicafonoinova.com.br/fonoaudiologia-anapolis
https://www.clinicafonoinova.com.br/psicologia-infantil-anapolis
https://www.clinicafonoinova.com.br/terapia-ocupacional-anapolis
https://www.clinicafonoinova.com.br/avaliacao-neuropsicologica-anapolis
https://www.clinicafonoinova.com.br/nossa-clinica
https://www.clinicafonoinova.com.br/seletividade-alimentar-anapolis
https://www.clinicafonoinova.com.br/tdah-anapolis
```

---

## Depois do deploy

1. Acesse **Bing Webmaster → URL Inspection**
2. Inspecione as URLs acima
3. Clique em **Request Indexing**

Os erros de SEO/GEO devem desaparecer após o Bing reindexar.

---

## Problemas comuns

### O Prerender não funciona

Verifique se a variável `PRERENDER_TOKEN` está configurada corretamente no Vercel.

### Middleware não está sendo executado

Verifique se o arquivo `middleware.js` está na raiz do projeto e se você fez deploy após criá-lo.
