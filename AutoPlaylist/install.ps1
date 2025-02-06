Clear-Host
Write-Host @"
                _        _____  _             _ _     _   
     /\        | |      |  __ \| |           | (_)   | |  
    /  \  _   _| |_ ___ | |__) | | __ _ _   _| |_ ___| |_ 
   / /\ \| | | | __/ _ \|  ___/| |/ _`` | | | | | / __| __|
  / ____ \ |_| | || (_) | |    | | (_| | |_| | | \__ \ |_ 
 /_/    \_\__,_|\__\___/|_|    |_|\__,_|\__, |_|_|___/\__|
    (idk how to publish extensions)      __/ |  Installer
                                        |___/             
    
"@ -ForegroundColor Magenta

Write-Host "    => Extension & Installer by: " -NoNewline
Write-Host "Kryvex" -ForegroundColor Green -NoNewline
Write-Host " (" -NoNewline
Write-Host "https://guns.lol/kryvex" -ForegroundColor Cyan -NoNewline
Write-Host ")"
Write-Host "    => if you don't trust it, go have a look at its code, it's "-NoNewline
Write-Host "open source!" -ForegroundColor Green
Write-Host 
Write-Host "[#] Beginning installation in 3 seconds..." -ForegroundColor Green
Start-Sleep 3

### CHECKS

Write-Host "[Step 1] Checking Spicetify..." -ForegroundColor Yellow

$spicetifyPath = spicetify -c 2>$null
if (-not $spicetifyPath) {
    Write-Host "[Error] Spicetify is not installed, or is not in PATH." -ForegroundColor Red
    exit
}

$spicetifyPath = Split-Path -Path $spicetifyPath -Parent
$extensionsFolder = Join-Path $spicetifyPath "Extensions"

if (-not (Test-Path $extensionsFolder)) {
    Write-Host "[Error] Extensions folder not found." -ForegroundColor Red
    exit
}

Write-Host "[Step 1] All good!" -ForegroundColor Green

### DOWNLOAD SECTION

Write-Host "[Step 2] Downloading AutoPlaylist from GitHub..." -ForegroundColor Yellow
$githubFileUrl = "https://raw.githubusercontent.com/kryvexx/spicetify-plugins/refs/heads/main/AutoPlaylist/autoPlaylist.js"
$extensionFileName = "autoPlaylist.js"
$extensionFilePath = Join-Path $extensionsFolder $extensionFileName

try {
    Invoke-WebRequest -Uri $githubFileUrl -OutFile $extensionFilePath
} catch {
    Write-Host "[Error] Failed to download. $($_.Exception.Message)" -ForegroundColor Red
    exit
}

Write-Host "[Step 2] Done!" -ForegroundColor Green

### INSTALL SECTION

Write-Host "[Step 3] Installing the extension..." -ForegroundColor Yellow
Write-Host "    => spicetify config extensions $extensionFileName" -ForegroundColor Gray
spicetify config extensions $extensionFileName -q
Write-Host "    => spicetify apply" -ForegroundColor Gray
spicetify apply -q
Write-Host "    => spicetify restart" -ForegroundColor Gray
spicetify restart -q

Write-Host "[Step 3] Done!" -ForegroundColor Green
Write-Host
Write-Host "Thank you for installing AutoPlaylist!" -ForegroundColor Green
Write-Host "To open the configurator, press F12 while on Spotify, it's pretty straight forward." -ForegroundColor Green
Write-Host "Automatically closing in 8 seconds, to give you time to read." -ForegroundColor Gray
Start-Sleep 8
Clear-Host
exit
