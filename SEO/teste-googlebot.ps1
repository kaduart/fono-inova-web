param([string]$p = "/fonoaudiologia-anapolis", [string]$ua = "Googlebot")
$html = (curl.exe -sS -A $ua "https://www.clinicafonoinova.com.br$p") -join "`n"
Write-Host "UA: $ua | pagina: $p | tamanho do HTML: $($html.Length) caracteres"
$achou = [regex]::Matches($html, '(?is)<title\b[^>]*>.*?</title>|<h1\b[^>]*>.*?</h1>|<link\b[^>]*canonical[^>]*>')
if ($achou.Count -eq 0) { Write-Host "Nada encontrado (sem title/h1/canonical)" } else { $achou | ForEach-Object { $_.Value } }
