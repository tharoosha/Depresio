import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import LabelEncoder
from sklearn.impute import SimpleImputer
from sklearn.metrics import classification_report
import numpy as np


def update_user_feedback(mood, video_type, user_feedback):
    """
    Update user feedback in the dataset.

    Args:
        mood (str): The mood of the video.
        video_type (str): The type of the video.
        user_feedback (int): The user feedback score (0-5).
    """
    # Create the text to be added
    text = mood + "," + video_type + "," + str(user_feedback)

    # Open the CSV file in 'a' (append) mode and write the text
    with open('youtube_data.csv', 'a') as file:
        file.write('\n' + text)


def train_and_predict_video_types(input_mood):
    # Load the dataset with user feedback as NaN initially
    df = pd.read_csv('youtube_data.csv')
    # Fill missing user_feedback values with 0
    df['user_feedback'].fillna(0, inplace=True)

    # Preprocess data
    mood_encoder = LabelEncoder()
    video_type_encoder = LabelEncoder()
    df['mood_encoded'] = mood_encoder.fit_transform(df['mood'])
    df['video_type_encoded'] = video_type_encoder.fit_transform(
        df['video_type'])

    # Split data into train and test sets
    X = df[['mood_encoded', 'user_feedback']]
    y = df['video_type_encoded']
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42)

    # Train a logistic regression model
    param_grid = {'C': [0.1, 1, 10]}
    logreg = LogisticRegression(
        multi_class='multinomial', solver='lbfgs', max_iter=1000)
    grid_search = GridSearchCV(logreg, param_grid, cv=5)
    grid_search.fit(X_train, y_train)
    best_model = grid_search.best_estimator_

    # Predict video types
    input_mood_encoded = mood_encoder.transform([input_mood])
    input_data = pd.DataFrame({'mood_encoded': input_mood_encoded, 'user_feedback': [
                              0]})  # Initialize user feedback as 0
    num_predictions = 1000
    input_data_repeated = pd.concat(
        [input_data] * num_predictions, ignore_index=True)
    predicted_probabilities = best_model.predict_proba(input_data_repeated)

    # Post-process predictions based on user feedback
    video_types = video_type_encoder.classes_
    average_probabilities = np.mean(predicted_probabilities, axis=0)
    filtered_video_types = []
    filtered_probabilities = []
    total_filtered_probability = 0

    for video_type, probability in zip(video_types, average_probabilities):
        feedback_score = df[df['video_type'] ==
                            video_type]['user_feedback'].mean()
        if not np.isnan(feedback_score):
            # Adjust probability based on feedback score
            probability *= (feedback_score + 1)
        rounded_probability = int(round(probability * 100))
        if rounded_probability >= 10:
            filtered_video_types.append(video_type)
            filtered_probabilities.append(rounded_probability)
            total_filtered_probability += rounded_probability

    normalized_probabilities = [
        p / total_filtered_probability for p in filtered_probabilities]
    rounded_probabilities_sum_100 = np.round(
        np.array(normalized_probabilities) * 100).astype(int)
    rounded_probabilities_sum_100[-1] += 100 - \
        np.sum(rounded_probabilities_sum_100)
    divided_rounded_probabilities = [
        round(p / 10) for p in rounded_probabilities_sum_100]

    video_type_probabilities_dict = dict(
        zip(filtered_video_types, divided_rounded_probabilities))
    return video_type_probabilities_dict
