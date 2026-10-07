param([string]$b = "https://fono-inova-489gsqurn-kadu-arts-projects.vercel.app")
function Code($p) { curl.exe -s -o NUL -w "%{http_code}" "$b$p" }
function Analisa($p, $ua = "Googlebot") {
  $raw = (curl.exe -sS -i -A $ua "$b$p") -join "`n"
  $partes = $raw -split "`n`n", 2
  $cab = $partes[0]; $html = if ($partes.Count -gt 1) { $partes[1] } else { "" }
  $status = [regex]::Match($cab, 'HTTP/\S+\s+(\d+)').Groups[1].Value
  $xr = [regex]::Match($cab, '(?im)^x-robots-tag:\s*(.+)$').Groups[1].Value.Trim()
  if (-not $xr) { $xr = "-" }
  $h1 = ([regex]::Matches($html, '(?is)<h1\b')).Count
  $can = [regex]::Match($html, '(?is)<link\b[^>]*rel="canonical"[^>]*href="([^"]*)"').Groups[1].Value
  if (-not $can) { $can = "-" }
  $metaNoindex = if ($html -match '(?is)<meta\b[^>]*name="robots"[^>]*noindex') { "SIM" } else { "nao" }
  "{0,-26} {1,-11} http={2} bytes={3,7} h1={4} canonical={5} meta-noindex={6} x-robots={7}" -f $p, $ua, $status, $html.Length, $h1, $can, $metaNoindex, $xr
}
Write-Host "--- pre-renderizadas (esperado: html completo, canonical proprio, sem noindex)"
foreach ($p in "/","/fonoaudiologia-anapolis","/autismo-anapolis") { Analisa $p "Googlebot"; Analisa $p "Mozilla/5.0" }
Write-Host "--- shell (esperado: ~3600 bytes, sem canonical, sem noindex nem na meta nem no header)"
foreach ($p in "/dislexia-anapolis","/artigos") { Analisa $p }
Write-Host "--- /_shell.html direto (esperado: x-robots=noindex)"
Analisa "/_shell.html"
Write-Host "--- inexistente (esperado: http=404, x-robots=noindex)"
Analisa "/xyz-inventada"
Write-Host "--- /obrigado (esperado: x-robots=noindex)"
Analisa "/obrigado"
Write-Host "--- status"
foreach ($p in "/robots.txt","/sitemap.xml","/artigos/fonoaudiologia-para-autismo") { "$p -> $(Code $p)" }
Write-Host "--- redirects (esperado 308)"
foreach ($p in "/freio-lingual?utm_source=teste&x=1","/lp/troca-letras-crianca","/lp/fala-enrolada-crianca") { Write-Host "== $p"; curl.exe -s -I "$b$p" | Select-String -Pattern "^HTTP|^location" }
