// AUTHOR: Kryvex
// GITHUB: https://github.com/kryvexx
// LICENSE: MIT
// DON'T STEAL MY CODE!
// OR AT LEAST GIVE CREDIT!
// PLEASE EXCUSE MY BAD CODE, ITS MY FIRST PLUGIN

(function() {
    console.log("[AutoPlaylist] Initializing extension...");

    function AP_checkSpicetify() {
        if (typeof Spicetify !== "undefined") {
            AP_runPlugin();
        } else {
            setTimeout(AP_checkSpicetify, 100);
        }
    }

    function AP_runPlugin() {
        if (!localStorage.getItem("AutoPlaylistID")) { localStorage.setItem("AutoPlaylistID", null) }
        if (!localStorage.getItem("AutoPlaylistEnabled")) { localStorage.setItem("AutoPlaylistEnabled", 'true') }

        function AP_getPlaylistId(url) {
            const regex = /spotify\.com\/playlist\/([a-zA-Z0-9]+)/;
            const match = url.match(regex);
            return match ? match[1] : null;
        }
    
        function AP_checkAndRedirect() {
            const playlistID = localStorage.getItem('AutoPlaylistID');
            const enabled = localStorage.getItem('AutoPlaylistEnabled');
            
            if (enabled !== 'true') { console.log("[AutoPlaylist] Will not redirect - Extension disabled by the user.")}
            else{
                if (playlistID && enabled === 'true') {
                    console.log("[AutoPlaylist] Valid parameters, redirecting...");
                    window.location.href = `spotify://playlist/${playlistID}`;
                    console.log("[AutoPlaylist] Done redirecting");
                    console.log(`[AutoPlaylist] NOTE: If you refreshed Spotify, this most likely hasn't worked...
                     ...as specified inside the configurator (F12)`);
                } else {
                    Spicetify.showNotification("[AutoPlaylist] Invalid playlist ID", true, 3500);
                }
            }
            
        }

        function AP_setupPlaylistURL() {
            Spicetify.PopupModal.display({
                title: 'AutoPlaylist Configurator',
                content: `
                    <label for="playlistURL">Enter your playlist URL: </label>
                    <input type="text" id="playlistURL" name="playlistURL" autocomplete="off" placeholder="https://open.spotify.com/playlist/..." style="width: 100%; padding: 8px; margin: 10px 0; border-radius: 4px; border: 1px solid #ccc;"><br>
                    <p>Current playlist ID (click to open): <a id="currentPlaylist" style="color: #1DB954; text-decoration: underline;">None</a></p>
                    <button id="saveButton" style="padding: 10px 20px; background-color: #1DB954; color: white; border: none; border-radius: 4px; cursor: pointer;">Save Playlist</button>
                    <button id="enabled" style="padding: 10px 20px; background-color: #1DB954; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px;">Extension Enabled</button>
                    <br><br>
                    <details>
                        <summary>What is AutoPlaylist for?</summary>
                        <p style="padding-left: 25px; margin-top: 0px;">AutoPlaylist is made for those who want to access their favourite playlists as soon as Spotify starts.<br>
                        Whether you're lazy or just want to use it as a time saver, it just works. (only on startup, not after reloading)</p>
                    </details>
                    <details>
                        <summary>Why did you make this?</summary>
                        <p style="padding-left: 25px; margin-top: 0px;">Since my PC is <s>shit</s> not the best, Spicetify is <b>SLOW</b>, and I observed that it suddenly gets a lot faster when I'm viewing playlists.<br>
                        It may be only me, but who knows if others have this same problem...</p>
                    </details>
                    <details>
                        <summary>Supported platforms</summary>
                        <p style="padding-left: 25px; margin-top: 0px;">Every platform that supports Spotify's URI scheme, which is <code>spotify://</code> is supported.<br></p>
                    </details>
                    <br>
                    <p style="font-size: 12px;font-weight: bold;">Made with 💜 by <a href="https://guns.lol/kryvexfps" style="color:#1DB954; text-decoration: underline;">Kryvex</a> from <span style="color: #1DB954;">It</span><span style="color: #FFFFFF;">a</span><span style="color: #D22C2D;">ly</span></p>
                `,
                isLarge: true,
            });

            const AP_currentPlaylist = document.getElementById('currentPlaylist')
            AP_currentPlaylist.innerHTML = localStorage.getItem("AutoPlaylistID");
            AP_currentPlaylist.setAttribute("href", `spotify://playlist/${localStorage.getItem("AutoPlaylistID")}`)
            AP_currentPlaylist.addEventListener('click', function(){
                Spicetify.PopupModal.hide();
                Spicetify.showNotification("[AutoPlaylist] Configurator automatically hidden, press F12 to reopen")
            })
            function AP_updateCurrentPLaylist() {
                AP_currentPlaylist.innerHTML = localStorage.getItem("AutoPlaylistID");
                AP_currentPlaylist.setAttribute("href", `spotify://playlist/${localStorage.getItem("AutoPlaylistID")}`)
            }
            
            AP_updateCurrentPLaylist();

            

            
            document.getElementById('saveButton').addEventListener('click', function() {
                const playlistURL = document.getElementById('playlistURL').value;
                const playlistId = AP_getPlaylistId(playlistURL);
                
                if (playlistId) {
                    localStorage.setItem('AutoPlaylistID', playlistId);
                    AP_updateCurrentPLaylist();
                    Spicetify.showNotification("[AutoPlaylist] Playlist saved!", false, 3500);
                } else {
                    Spicetify.showNotification("[AutoPlaylist] Invalid playlist!", true, 3500);
                }
            });
            
            const AP_enabledButton = document.getElementById('enabled');
            const AP_initialState = localStorage.getItem('AutoPlaylistEnabled') === 'true';
            
            function AP_updateButtonState(enabled) {
                if (enabled) {
                    AP_enabledButton.textContent = "Extension Enabled";
                    AP_enabledButton.style.backgroundColor = "#1DB954";
                    console.log("[AutoPlaylist] Extension enabled!")
                } else {
                    AP_enabledButton.textContent = "Extension Disabled";
                    AP_enabledButton.style.backgroundColor = "#D22C2D";
                    console.log("[AutoPlaylist] Extension disabled!")
                }
            }
            
            AP_updateButtonState(AP_initialState);
            
            AP_enabledButton.addEventListener('click', function() {
                const currentState = AP_enabledButton.textContent === "Extension Enabled";
                const newState = !currentState;
            
                localStorage.setItem('AutoPlaylistEnabled', newState.toString());
                AP_updateButtonState(newState);
            });
            
            
            document.getElementById('saveButton')?.addEventListener('click', () => {
                const playlistURL = document.getElementById('playlistURL').value;
                console.log("[AutoPlaylist] Entered Playlist URL:", playlistURL);
            });
        }
    
        document.addEventListener('keydown', function(event) {
            if (event.key === 'F12') {
                AP_setupPlaylistURL();
            }
        });
    
        window.addEventListener('load', () => {
            console.log("[AutoPlaylist] Extension loaded! Press F12 to open the configurator");
            AP_checkAndRedirect();
        });
    }

    AP_checkSpicetify();
})();
