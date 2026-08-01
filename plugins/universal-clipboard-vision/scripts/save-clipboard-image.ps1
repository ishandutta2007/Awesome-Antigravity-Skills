<#
.SYNOPSIS
    Universal AI Clipboard Image Extractor
.DESCRIPTION
    Extracts any image from the Windows Clipboard and saves it as a PNG in a dedicated, auto-cleaning cache directory.
#>

$ErrorActionPreference = 'Stop'

# Define cache directory
$CacheDir = "$env:USERPROFILE\.gemini\clipboard_cache"
if (!(Test-Path -LiteralPath $CacheDir)) {
    New-Item -ItemType Directory -Force -Path $CacheDir | Out-Null
}

# Auto-cleanup: keep only the newest 5 screenshots to save disk space
$OldFiles = Get-ChildItem -LiteralPath $CacheDir -Filter "clip_*.png" | Sort-Object CreationTime -Descending | Select-Object -Skip 5
if ($OldFiles) {
    $OldFiles | Remove-Item -Force -ErrorAction SilentlyContinue
}

# Load PresentationCore for Clipboard access
Add-Type -AssemblyName PresentationCore
Add-Type -AssemblyName WindowsBase
Add-Type -AssemblyName System.Drawing

# Ensure running in Single-Threaded Apartment (STA) mode required by Windows Clipboard APIs
if ([System.Threading.Thread]::CurrentThread.GetApartmentState() -ne 'STA') {
    Write-Error "This script must be run in STA mode. Invoke PowerShell with -sta flag."
    exit 1
}

if ([System.Windows.Clipboard]::ContainsImage()) {
    $BitmapSource = [System.Windows.Clipboard]::GetImage()
    $Timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $FilePath = "$CacheDir\clip_$Timestamp.png"
    
    # Encode as PNG and write to cache
    $Stream = [System.IO.FileStream]::new($FilePath, [System.IO.FileMode]::Create)
    $Encoder = [System.Windows.Media.Imaging.PngBitmapEncoder]::new()
    $Encoder.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($BitmapSource))
    $Encoder.Save($Stream)
    $Stream.Close()
    
    Write-Output "SUCCESS_IMAGE_SAVED: $FilePath"
    exit 0
} else {
    Write-Output "ERROR_NO_IMAGE_IN_CLIPBOARD: Please copy an image or take a screenshot (Win+Shift+S) and try again."
    exit 1
}
