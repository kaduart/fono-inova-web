param([string]$p = "/fonoaudiologia-anapolis", [string]$ua = "Googlebot", [string]$base = "https://www.clinicafonoinova.com.br")
$html = (curl.exe -sS -A $ua "$base$p") -join "`n"
Write-Host "UA: $ua | pagina: $base$p | tamanho do HTML: $($html.Length) caracteres"
$achou = [regex]::Matches($html, '(?is)<title\b[^>]*>.*?</title>|<h1\b[^>]*>.*?</h1>|<link\b[^>]*canonical[^>]*>')
if ($achou.Count -eq 0) { Write-Host "Nada encontrado (sem title/h1/canonical)" } else { $achou | ForEach-Object { $_.Value.Substring(0, [Math]::Min(160, $_.Value.Length)) } }
