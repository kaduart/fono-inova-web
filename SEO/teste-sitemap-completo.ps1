# Confere TODAS as URLs do sitemap como Googlebot: http, bytes, H1, canonical proprio, noindex.
# Uso: powershell -ExecutionPolicy Bypass -File .\SEO\teste-sitemap-completo.ps1 [-b https://www.clinicafonoinova.com.br]
param([string]$b = "https://www.clinicafonoinova.com.br")
$ua = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
$sm = curl.exe -s -A $ua "$b/sitemap.xml"
$urls = [regex]::Matches($sm, "<loc>([^<]+)</loc>") | ForEach-Object { $_.Groups[1].Value }
$rows = foreach ($u in $urls) {
  $path = ([uri]$u).AbsolutePath.TrimEnd('/'); if (-not $path) { $path = "/" }
  $html = curl.exe -s -A $ua -D - "$b$path" | Out-String
  $status = if ($html -match "HTTP/[\d.]+ (\d+)") { $Matches[1] } else { "?" }
  $h1 = ([regex]::Matches($html, "<h1[\s>]")).Count
  $can = if ($html -match '<link[^>]*rel="canonical"[^>]*href="([^"]+)"') { $Matches[1] } elseif ($html -match '<link[^>]*href="([^"]+)"[^>]*rel="canonical"') { $Matches[1] } else { "-" }
  $okCan = ($can.TrimEnd('/') -eq ("https://www.clinicafonoinova.com.br" + $path).TrimEnd('/'))
  $noidx = ($html -match "(?i)x-robots-tag:\s*noindex") -or ($html -match '(?i)<meta[^>]*name="robots"[^>]*noindex')
  [pscustomobject]@{ Path = $path; Http = $status; Bytes = $html.Length; H1 = $h1; CanonOK = $okCan; Noindex = $noidx }
}
$rows | Format-Table -AutoSize
$bad = $rows | Where-Object { $_.Http -ne "200" -or $_.H1 -ne 1 -or -not $_.CanonOK -or $_.Noindex }
"`nTotal: $($rows.Count)  |  Com problema: $($bad.Count)"
if ($bad) { "--- PROBLEMAS ---"; $bad | Format-Table -AutoSize }
