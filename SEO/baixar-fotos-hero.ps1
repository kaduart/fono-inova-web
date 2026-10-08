# Baixa as 5 fotos do topo (geradas por IA) para public\images\hero
$dest = Join-Path (Split-Path $PSScriptRoot -Parent) "public\images\hero"
New-Item -ItemType Directory -Force -Path $dest | Out-Null
$base = "https://d8j0ntlcm91z4.cloudfront.net/user_3Gn0rmEnnLRw2pUqAoV8fS32bU9/"
$fotos = @{
  "dislexia-hero.png"              = "hf_20261007_182640_0fcb9f6c-0a82-4e40-86ef-13a157a24452.png"
  "tdah-hero.png"                  = "hf_20261007_182859_4177cfb6-da80-4538-93aa-476a1a7e5bdd.png"
  "autismo-hero.png"               = "hf_20261007_182901_5d03efdf-eb2d-4753-aa7e-5a2d9c119811.png"
  "fala-tardia-hero.png"           = "hf_20261007_182902_90e27bca-1c28-428b-bc73-c52b80ce3717.png"
  "seletividade-alimentar-hero.png" = "hf_20261007_182905_cf8e847b-b64c-40e0-88f8-af95bdcc0735.png"
}
foreach ($nome in $fotos.Keys) {
  curl.exe -sS -L -o (Join-Path $dest $nome) ($base + $fotos[$nome])
  $f = Get-Item (Join-Path $dest $nome) -ErrorAction SilentlyContinue
  "{0,-34} {1,10:N0} bytes" -f $nome, $(if ($f) { $f.Length } else { 0 })
}
