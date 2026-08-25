param(
    [string]$Configuration = "Release",
    [string]$OutputPath = "publish-iis"
)

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $PSScriptRoot
$backendProject = Join-Path $projectRoot "backend\LandingContact.Api\LandingContact.Api.csproj"
$wwwroot = Join-Path $projectRoot "backend\LandingContact.Api\wwwroot"
$frontendOutput = Join-Path $projectRoot "dist"
$publishOutput = Join-Path $projectRoot $OutputPath

Push-Location $projectRoot

try {
    npm ci
    npm run build

    New-Item -ItemType Directory -Path $wwwroot -Force | Out-Null
    Get-ChildItem -Path $wwwroot -Force | Remove-Item -Recurse -Force
    Copy-Item -Path (Join-Path $frontendOutput "*") -Destination $wwwroot -Recurse -Force

    dotnet publish $backendProject -c $Configuration -o $publishOutput

    Write-Host "IIS package created: $publishOutput"
}
finally {
    Pop-Location
}
