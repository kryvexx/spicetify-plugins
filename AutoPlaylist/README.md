# AutoPlaylist
This extension allows you to set a playlist that will be open automatically as soon as Spicetify starts up.

## Here's how it works: 
- Given your playlist's URL (https://open.spotify.com/playlist/...), the last part is the playlist ID
- Knowing this, its possible to make a call to Spotify's playlist URI: `spotify://playlist/PLAYLIST-ID-HERE` to open the playlist.
- So, this extension basically runs that URI as soon as the application starts, effecticely opening your desired playlist at startup.

## How to use:
1. [Install Spicetify](https://spicetify.app/docs/advanced-usage/installation/) (duh)
2. Install this extension
3. Copy your playlist's URL
4. Press **F12** to open the configurator
5. Insert the URL inside the input box and click **[Save Playlist]**
   - Enable the extension, if for some reason it's disabled (should be enabled by default on installing)
   - The following values are stored in LocalStorage: AutoPlaylistID (Playlist ID), AutoPlaylistEnabled (true/false)
6. Close the configurator and restart Spotify to make sure it works.
