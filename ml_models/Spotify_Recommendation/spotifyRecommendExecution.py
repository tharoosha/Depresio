import spotifyRecommendScript

if __name__ == "__main__":
    model, scaler = spotifyRecommendScript.initialize()
    print(spotifyRecommendScript.getRecommendation('joy', model, scaler))