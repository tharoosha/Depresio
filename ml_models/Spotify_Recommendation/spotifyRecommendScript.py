import spotipy

# oauth_object = spotipy.oauth2.SpotifyOAuth(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, scope=SCOPE)
from spotipy.oauth2 import SpotifyClientCredentials
import pandas as pd
from sklearn.model_selection import train_test_split
import tensorflow as tf
from sklearn.preprocessing import StandardScaler
from tensorflow.keras import layers, models
from tensorflow.keras.optimizers.legacy import Adam
import pickle
import os
import config as cf

# Replace these with your actual Spotify API credentials
CLIENT_ID = cf.SPOTIFY_CLIENT_ID
CLIENT_SECRET = cf.SPOTIFY_CLIENT_SECRET
REDIRECT_URI = cf.SPOTIFY_REDIRECT_URI


client_credentials_manager = SpotifyClientCredentials(client_id=CLIENT_ID, client_secret=CLIENT_SECRET)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

def decodeLabels(label):
        if label == 0: 
                return 'sadness'
        elif label == 1:
                return 'joy'
        elif label == 2:
                return 'love'
        elif label == 3:
                return 'anger'
        elif label == 4:
                return 'fear'
        elif label == 5:
                return 'surprise'

def class_to_index(class_name):
    class_dict = {'sadness': 0, 'joy': 1, 'love': 2, 'anger': 3, 'fear': 4, 'surprise': 5}
    return class_dict[class_name]


def getAudioFeatures(track_id):
    audio_features = sp.audio_features(track_id)[0]
    for key in ['type','id','uri','track_href','analysis_url']:
        audio_features.pop(key, None)
    return list(audio_features.values())

def getRecentlyPlayed():
    SCOPE = 'user-library-read', 'playlist-read-private', 'user-top-read', 'user-read-recently-played'
    
    oauth_object = spotipy.oauth2.SpotifyOAuth(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, scope=SCOPE)
    access_token = oauth_object.get_access_token(as_dict=False)
    spotifyObject = spotipy.Spotify(auth=access_token)

    offset = 0
    recentSongs = []
    recently_played = spotifyObject.current_user_recently_played(limit=50, after=None)
    
    while (len(recently_played['items']) > 0) and offset < 200:
        for item in recently_played['items']:
            track = item['track']
            recentSongs.append([track['id']] + getAudioFeatures(track['id']))
        offset += 50
        recently_played = spotifyObject.current_user_recently_played(limit=50, after=offset)
      
    return pd.DataFrame(recentSongs)

def get_max_index(row):
    max_index = 0
    max_value = 0
    for i in range(1, len(row)):
        if row[i] > max_value:
            max_value = row[i]
            max_index = i
    return max_index

def initialize():
    
    #######################################################################################################################################
    '''Train model from scratch and save it along with the scaler'''

    df=pd.read_csv("ml_models/spotify_recommendation/dataset.csv")

    df['Mood'] = df['Mood'].apply(class_to_index)

    df.drop(['Song_ID','Song','Artist'],axis=1,inplace=True)

    train, test = train_test_split(df, test_size=0.2, random_state=42)

    y_train = train['Mood']
    y_test = test['Mood']
    x_train = train.drop(['Mood'], axis=1)
    x_test = test.drop(['Mood'], axis=1)

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(x_train)
    X_test_scaled = scaler.transform(x_test)

    model = models.Sequential([
        layers.Dense(256, activation='sigmoid', input_shape=(x_train.shape[1],)),
        layers.Dense(128, activation='tanh'),
        layers.Dense(64, activation='tanh'),
        layers.Dense(32, activation='tanh'),
        layers.Dense(6, activation='softmax')
    ])

    model.compile(optimizer=Adam(learning_rate=0.001),
                loss='sparse_categorical_crossentropy',
                metrics=['accuracy'])

    epochs = 100
    batch_size = 128
    model.fit(X_train_scaled, y_train, epochs=epochs, batch_size=batch_size, verbose=1)

    loss, accuracy = model.evaluate(X_test_scaled, y_test, verbose=0)
    print(f"Test loss: {loss:.4f}, Test accuracy: {accuracy:.4f}")

    # Save the tokenizer
    with open('ml_models/spotify_recommendation/tokenizer.pkl', 'wb') as f:
        pickle.dump(scaler, f)

    model.save('ml_models/spotify_recommendation/spotify_model')

    #######################################################################################################################################
    
def getRecommendation(mood, model, scaler):

    df_recentSongs = getRecentlyPlayed()
    df2 = pd.DataFrame(model.predict(scaler.fit_transform(df_recentSongs.iloc[:, 1:])))
    df2['Mood']=df2.apply(get_max_index, axis=1)
    df_recentSongs['Mood'] = df2['Mood'].apply(decodeLabels)
    filtered_df = df_recentSongs[df_recentSongs['Mood']==mood]
    return filtered_df.tail(10)[0].tolist()[::-1]

if __name__ == "__main__":
    # model, scaler = initialize()
    print(f"Client ID: {os.environ.get('CLIENT_ID')}")
    print(f"Client Secret: {os.environ.get('CLIENT_SECRET')}")
    print(f"Redirect URI: {os.environ.get('REDIRECT_URI')}")
    
    initialize()
    # print(getRecommendation('surprise', models, scaler))

