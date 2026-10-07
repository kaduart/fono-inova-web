param([string]$b = "https://fono-inova-hwijfof4i-kadu-arts-projects.vercel.app")
function Code($p) { curl.exe -s -o NUL -w "%{http_code}" "$b$p" }
Write-Host "--- validas (esperado 200)"
foreach ($p in "/","/fonoaudiologia-anapolis","/autismo-anapolis","/artigos/fonoaudiologia-para-autismo","/lp/troca-letras-crianca","/obrigado") { "$p -> $(Code $p)" }
Write-Host "--- inexistentes (esperado 404)"
foreach ($p in "/xyz-inventada","/artigos/nao-existe") { "$p -> $(Code $p)" }
Write-Host "--- arquivos (esperado 200)"
foreach ($p in "/robots.txt","/sitemap.xml") { "$p -> $(Code $p)" }
Write-Host "--- redirects (esperado 308 e Location com parametros)"
foreach ($p in "/freio-lingual?utm_source=teste&x=1","/lp/fala-enrolada-crianca?utm_source=teste","/lp/dificuldade-pronunciar-r","/lp/troca-letras-crianca","/convenio-bradesco-anapolis") {
  Write-Host "== $p"
  curl.exe -s -I "$b$p" | Select-String -Pattern "^HTTP|^location"
}
Write-Host "--- obrigado (esperado x-robots-tag: noindex)"
curl.exe -s -I "$b/obrigado" | Select-String -Pattern "^HTTP|x-robots-tag"
