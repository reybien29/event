#Requires -Version 5.1
<#
.SYNOPSIS
  Production setup for this app on Render using the Render CLI + Render API.

  The Render CLI (v2.x) can list services, trigger deploys, and stream logs — it does NOT
  update environment variables on existing services. For that, this script uses the
  Render REST API with RENDER_API_KEY (create one under Dashboard → Account → API Keys).

  Prerequisites:
  - render CLI installed and logged in: render login
  - php on PATH (for: php artisan key:generate --show)
  - $env:RENDER_API_KEY set to a Render API key (Bearer token)

  Usage:
    $env:RENDER_API_KEY = "rnd_xxxxxxxx"
    .\setup-render-production.ps1 -ServiceId "srv-xxxxxxxx"

  Optional:
    .\setup-render-production.ps1 -ServiceId "srv-xxx" -AppUrl "https://your-app.onrender.com"
    .\setup-render-production.ps1 -ServiceId "srv-xxx" -DatabaseUrl $env:RENDER_DATABASE_URL
    .\setup-render-production.ps1 -ServiceId "srv-xxx" -SkipEnv   # only: deploy latest via CLI
#>
param(
    [Parameter(Mandatory = $false)]
    [string] $ServiceId = "srv-d714u3vkijhs73cc49n0",

    [Parameter(Mandatory = $false)]
    [string] $AppUrl = "https://event-tkku.onrender.com",

    [Parameter(Mandatory = $false)]
    [string] $DatabaseUrl,

    [switch] $SkipEnv
)

$ErrorActionPreference = "Stop"
$apiBase = "https://api.render.com/v1"

function Test-RenderCli {
    if (-not (Get-Command render -ErrorAction SilentlyContinue)) {
        Write-Error "Render CLI not found. Install: https://render.com/docs/cli"
    }
}

function Invoke-RenderApiPutEnv {
    param(
        [string] $ServiceId,
        [string] $Key,
        [string] $Value
    )
    $uri = "$apiBase/services/$ServiceId/env-vars/$Key"
    $body = @{ value = $Value } | ConvertTo-Json
    $headers = @{
        Authorization  = "Bearer $($env:RENDER_API_KEY)"
        "Content-Type" = "application/json"
    }
    Invoke-RestMethod -Uri $uri -Method Put -Headers $headers -Body $body
}

Test-RenderCli

Write-Host "== Render CLI: workspace / service ==" -ForegroundColor Cyan
render whoami --output text --confirm 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Error "Run: render login"
}

if (-not $SkipEnv) {
    if (-not $env:RENDER_API_KEY) {
        Write-Error "Set RENDER_API_KEY (Dashboard → Account Settings → API Keys), then re-run. CLI alone cannot set env vars on an existing service."
    }

    Write-Host "`n== Generating APP_KEY (php artisan) ==" -ForegroundColor Cyan
    Push-Location $PSScriptRoot
    try {
        $appKey = php artisan key:generate --show 2>&1
        if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($appKey)) {
            Write-Error "php artisan key:generate --show failed. Ensure PHP is on PATH and you are in the Laravel project root."
        }
        $appKey = $appKey.Trim()
    } finally {
        Pop-Location
    }

    Write-Host "`n== Render API: setting environment variables on $ServiceId ==" -ForegroundColor Cyan
    $vars = [ordered]@{
        APP_KEY     = $appKey
        APP_URL     = $AppUrl
        APP_ENV     = "production"
        APP_DEBUG   = "false"
        LOG_CHANNEL = "stderr"
    }
    if ($DatabaseUrl) {
        $vars["DB_CONNECTION"] = "pgsql"
        $vars["DB_URL"] = $DatabaseUrl
    }

    foreach ($name in $vars.Keys) {
        Write-Host "  PUT $name"
        Invoke-RenderApiPutEnv -ServiceId $ServiceId -Key $name -Value $vars[$name]
    }

    if (-not $DatabaseUrl) {
        Write-Host "`nNOTE: No -DatabaseUrl passed. App may use SQLite from entrypoint unless you add DB_URL later." -ForegroundColor Yellow
        Write-Host "      Postgres: copy Internal Database URL from the database in the dashboard, then:" -ForegroundColor Yellow
        Write-Host "      `$env:RENDER_API_KEY = '...'; .\setup-render-production.ps1 -ServiceId $ServiceId -DatabaseUrl 'postgresql://...'" -ForegroundColor Yellow
    }
}

Write-Host "`n== Render CLI: trigger deploy ==" -ForegroundColor Cyan
render deploys create $ServiceId --confirm --wait --output json

Write-Host "`nDone. Logs: render logs -r $ServiceId --limit 50 --output text --confirm" -ForegroundColor Green
