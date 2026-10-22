Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$ProjectRoot = Split-Path -Parent $PSScriptRoot
$DesktopDirectory = [Environment]::GetFolderPath('Desktop')
$ShortcutPath = Join-Path $DesktopDirectory 'Polaris Agent.lnk'
$IconPath = Join-Path $ProjectRoot 'desktop\public\brand\polaris-north-star.ico'
if (-not (Test-Path -LiteralPath $IconPath)) { & (Join-Path $PSScriptRoot 'build-brand-icons.ps1') }
$LauncherPath = Join-Path $ProjectRoot 'Polaris Agent.exe'
if (-not (Test-Path -LiteralPath $LauncherPath)) { & (Join-Path $PSScriptRoot 'build-windows-launcher.ps1') }
$ShortcutShell = New-Object -ComObject WScript.Shell
$Shortcut = $ShortcutShell.CreateShortcut($ShortcutPath)
$Shortcut.TargetPath = $LauncherPath
$Shortcut.Arguments = ''
$Shortcut.WorkingDirectory = $ProjectRoot
$Shortcut.IconLocation = "$IconPath,0"
$Shortcut.Description = 'Polaris Agent — 本地智能体工作区'
$Shortcut.WindowStyle = 7
$Shortcut.Save()
Write-Host "Created $ShortcutPath"
