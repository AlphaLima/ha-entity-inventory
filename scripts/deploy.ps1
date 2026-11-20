<#
 Kopiert die Integration auf den HA-Server (Samba-Freigabe "config").
   .\scripts\deploy.ps1          -> kompletter Ordner
   .\scripts\deploy.ps1 -JsOnly  -> nur das Panel-JS (kein Neustart, im Browser Strg+F5)
 Ziel anders: .\scripts\deploy.ps1 -Target "\\andere-ip\config\custom_components"
#>
param(
    [string]$Target = "\\192.168.188.11\config\custom_components",
    [switch]$JsOnly
)
$ErrorActionPreference = "Stop"
$src = Join-Path $PSScriptRoot "..\custom_components\entity_inventory" | Resolve-Path
$dst = Join-Path $Target "entity_inventory"
if (-not (Test-Path $Target)) { throw "Ziel nicht erreichbar: $Target" }
if ($JsOnly) {
    New-Item -ItemType Directory -Force (Join-Path $dst "frontend") | Out-Null
    Copy-Item -Force (Join-Path $src "frontend\entity-inventory-panel.js") (Join-Path $dst "frontend\")
    Write-Host "JS kopiert nach $dst\frontend - im Browser Strg+F5."
} else {
    # spiegelt NUR den Ordner entity_inventory (loescht dort Veraltetes), nie andere Integrationen
    robocopy $src $dst /MIR /XD __pycache__ /XF *.pyc /NJH /NJS /NP | Out-Null
    if ($LASTEXITCODE -ge 8) { throw "robocopy Fehler $LASTEXITCODE" }
    $global:LASTEXITCODE = 0 # robocopy 1 = "Dateien kopiert", kein Fehler
    Write-Host "Ordner gespiegelt nach $dst. Wurde eine .py-Datei geaendert: HA neu starten, sonst Strg+F5."
}
