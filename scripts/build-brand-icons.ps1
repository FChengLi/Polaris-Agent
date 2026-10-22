Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$BrandDirectory = Join-Path $ProjectRoot 'desktop\public\brand'
$SourcePath = Join-Path $BrandDirectory 'polaris-north-star.png'
$IconPath = Join-Path $BrandDirectory 'polaris-north-star.ico'
$SourceImage = [System.Drawing.Image]::FromFile($SourcePath)
$Frames = [System.Collections.Generic.List[byte[]]]::new()
$Sizes = @(16, 24, 32, 48, 64, 128, 256)
try {
  foreach ($Size in $Sizes) {
    $Bitmap = [System.Drawing.Bitmap]::new($Size, $Size)
    $Graphics = [System.Drawing.Graphics]::FromImage($Bitmap)
    $Stream = [System.IO.MemoryStream]::new()
    try {
      $Graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
      $Graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $Graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
      $Graphics.Clear([System.Drawing.Color]::Transparent)
      $Graphics.DrawImage($SourceImage, 0, 0, $Size, $Size)
      $Bitmap.Save($Stream, [System.Drawing.Imaging.ImageFormat]::Png)
      $Frames.Add($Stream.ToArray())
    } finally { $Stream.Dispose(); $Graphics.Dispose(); $Bitmap.Dispose() }
  }
} finally { $SourceImage.Dispose() }

$Output = [System.IO.File]::Create($IconPath)
$Writer = [System.IO.BinaryWriter]::new($Output)
try {
  $Writer.Write([uint16]0); $Writer.Write([uint16]1); $Writer.Write([uint16]$Sizes.Count)
  $Offset = 6 + 16 * $Sizes.Count
  for ($Index = 0; $Index -lt $Sizes.Count; $Index++) {
    $Dimension = if ($Sizes[$Index] -eq 256) { 0 } else { $Sizes[$Index] }
    $Writer.Write([byte]$Dimension); $Writer.Write([byte]$Dimension)
    $Writer.Write([byte]0); $Writer.Write([byte]0)
    $Writer.Write([uint16]1); $Writer.Write([uint16]32)
    $Writer.Write([uint32]$Frames[$Index].Length); $Writer.Write([uint32]$Offset)
    $Offset += $Frames[$Index].Length
  }
  foreach ($Frame in $Frames) { $Writer.Write($Frame) }
} finally { $Writer.Dispose(); $Output.Dispose() }
Write-Host "Created $IconPath (16–256px, transparent PNG frames)."
