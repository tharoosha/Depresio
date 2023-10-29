import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import config as cf

# client_id = '07f4d94fc95d4955ad32cdf68dbefa0c'
# client_secret = 'd45466167e4149b59cb91717b0ef6e3d'
os.environ["SPOTIPY_CLIENT_ID"] = os.getenv("SPOTIFY_CLIENT_ID")
os.environ["SPOTIPY_CLIENT_SECRET"] = os.getenv("SPOTIFY_CLIENT_SECRET")
os.environ["SPOTIPY_REDIRECT_URI"] = os.getenv("SPOTIFY_REDIRECT_URI")

client_id = cf.SPOTIFY_CLIENT_ID
client_secret = cf.SPOTIFY_CLIENT_SECRET
client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

def suggest_song(mood):
    # Search for tracks based on the mood
    results = sp.search(q='mood:' + mood, type='track', limit=1)

    if len(results['tracks']['items']) > 0:
        track = results['tracks']['items'][0]
        song_name = track['name']
        artist_name = track['artists'][0]['name']
        song_url = track['external_urls']['spotify']
        return f"Suggested Song: {song_name} by {artist_name}\nListen here: {song_url}"
    else:
        return "No songs found for the given mood."

mood = input("Enter the mood: ")
suggestion = suggest_song(mood)
print(suggestion)
