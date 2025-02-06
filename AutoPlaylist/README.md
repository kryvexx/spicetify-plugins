# AutoPlaylist
This extension allows you to set a playlist that will be open automatically as soon as Spicetify starts up.

## Here's how it works: 
- Given your playlist's URL (https://open.spotify.com/playlist/...), the last part is the playlist ID
- Knowing this, its possible to make a call to Spotify's playlist URI: `spotify://playlist/PLAYLIST-ID-HERE` to open the playlist.
- So, this extension basically runs that URI as soon as the application starts, effecticely opening your desired playlist at startup.

## How to use:
1. [Install the extension](https://github.com/kryvexx/spicetify-plugins/blob/main/AutoPlaylist/README.md#installer-windows-only)
2. Copy your playlist's URL
3. Press **F12** to open the configurator
4. Insert the URL inside the input box and click **[Save Playlist]**
   - Enable the extension, if for some reason it's disabled (should be enabled by default on installing)
   - The following values are stored in LocalStorage: AutoPlaylistID (Playlist ID), AutoPlaylistEnabled (true/false)
5. Close the configurator and restart Spotify to make sure it works.

## Installer (Windows only)
Since I have no clue on how to publish extensions, here's the installer (just paste in PowerShell, [feel free to check the code](https://github.com/kryvexx/spicetify-plugins/blob/main/AutoPlaylist/install.ps1))
```powershell
iwr "https://raw.githubusercontent.com/kryvexx/spicetify-plugins/refs/heads/main/AutoPlaylist/install.ps1" | iex
```
