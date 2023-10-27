import numpy as np
import pandas as pd
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import VotingClassifier
from transformers import pipeline
from nltk.tokenize import RegexpTokenizer

# Initialize the sentiment analysis model
sentiment_analyzer = pipeline("sentiment-analysis")


def predict_mood(video_link, youtube_data_api_key):
    transcript = get_transcript(video_link, youtube_data_api_key)

    if transcript is None:
        return "Unable to fetch video transcript."

    feature_vector = create_feature_vector(transcript)

    model1 = LogisticRegression()
    model2 = sentiment_analyzer

    ensemble_model = VotingClassifier(
        estimators=[('lr', model1), ('sa', model2)], voting='hard')
    ensemble_model.fit(feature_vector, ["positive", "negative", "neutral"])

    prediction = ensemble_model.predict(feature_vector)[0]

    return prediction


def get_transcript(video_link, youtube_data_api_key):
    transcript = "This is a dummy transcript for testing."
    return transcript


def create_feature_vector(transcript):
    tokenizer = RegexpTokenizer(r'\w+')
    tokens = tokenizer.tokenize(transcript)
    feature_vector = []

    for word in tokens:
        word_sentiment = SentimentIntensityAnalyzer().polarity_scores(word)
        feature_vector.append(word_sentiment["compound"])

    tfidf_vectorizer = TfidfVectorizer()
    tfidf_feature_vector = tfidf_vectorizer.fit_transform(
        [transcript]).toarray()
    feature_vector = np.concatenate((feature_vector, tfidf_feature_vector[0]))

    return feature_vector


def video_to_mood(link: str):
    try:
        nltk.data.find('tokenizers/punkt')
    except LookupError:
        nltk.download('punkt')

    video_link = link
    youtube_data_api_key = "AIzaSyAFx7r4060tZZ-wDfbKgWyZDyaV-ACw0yc"

    mood = predict_mood(video_link, youtube_data_api_key)

    return {"mood": mood}


video_to_mood("https://www.youtube.com/watch?v=Rvkscfbn0B4")
