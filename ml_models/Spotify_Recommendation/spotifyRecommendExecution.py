import spotifyRecommendScript
import pickle
import tensorflow as tf
import json
import sys

if __name__ == "__main__":
    # spotifyRecommendScript.initialize()

    #######################################################################################################################################
    '''Load saved model and scaler'''

    with open('tokenizer.pkl', 'rb') as f:
        scaler = pickle.load(f)

    model = tf.keras.models.load_model('spotify_model')

    #######################################################################################################################################

    print(json.dumps({"Results": spotifyRecommendScript.getRecommendation(sys.argv[1], model, scaler)}))