Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$ProjectRoot = Split-Path -Parent $PSScriptRoot
$Compiler = Join-Path $env:WINDIR 'Microsoft.NET\Framework64\v4.0.30319\csc.exe'
$IconPath = Join-Path $ProjectRoot 'desktop\public\brand\polaris-north-star.ico'
$OutputPath = Join-Path $ProjectRoot 'Polaris Agent.exe'
& $Compiler /nologo /target:winexe /reference:System.Windows.Forms.dll "/win32icon:$IconPath" "/out:$OutputPath" (Join-Path $PSScriptRoot 'PolarisLauncher.cs')
if ($LASTEXITCODE -ne 0) { throw 'Unable to build the Polaris Agent launcher.' }
Write-Host "Created $OutputPath"
