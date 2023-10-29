# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.linear_model import LinearRegression
# from sklearn.metrics import mean_squared_error
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.compose import ColumnTransformer
# from sklearn.pipeline import Pipeline
# from sklearn.preprocessing import OneHotEncoder
# from sklearn.neighbors import NearestNeighbors

# # Read the data from the CSV file
# df = pd.read_csv('sample_dataset.csv')

# # Define the features (text and categorical)
# text_features = ['video_description']
# categorical_features = ['video_category']

# # Create a ColumnTransformer to preprocess text and categorical features
# preprocessor = ColumnTransformer(
#     transformers=[
#         ('text', TfidfVectorizer(), text_features),
#         ('cat', OneHotEncoder(), categorical_features)
#     ])

# # Create a Linear Regression model
# model = Pipeline([
#     ('preprocessor', preprocessor),
#     ('regressor', LinearRegression())
# ])

# # Define the target variable
# y = df['video_rating']


# # Split the data into training and testing sets
# X_train, X_test, y_train, y_test = train_test_split(df.drop('video_rating', axis=1), y, test_size=0.2, random_state=42)


# # Convert column names to strings
# X_train.columns = X_train.columns.astype(str)


# # Train the model
# model.fit(X_train, y_train)

# # Make predictions
# y_pred = model.predict(X_test)

# # Calculate the Mean Squared Error
# mse = mean_squared_error(y_test, y_pred)
# print("Mean Squared Error:", mse)

# # Now, you can use this model to recommend videos to a user based on their mood and rating preferences.
# # To recommend videos for a user with mood "Shorts" and ratings between 3.5 and 4.0, you can use k-Nearest Neighbors (k-NN) to find the most similar videos.

# # First, transform the user's mood and rating into the feature space used by the model
# user_features = tfidf_vectorizer.transform(["Shorts"]).toarray()
# user_rating = 3.75  # Average of 3.5 and 4.0

# # Combine the user's features with their rating
# user_input = pd.concat([pd.DataFrame(user_features), df[category_feature_names].iloc[0, :], pd.DataFrame({'user_rating': [user_rating]})], axis=1)

# # Fit a k-NN model to find similar videos
# knn = NearestNeighbors(n_neighbors=10)
# knn.fit(X)

# # Find the indices of the most similar videos
# distances, indices = knn.kneighbors(user_input, n_neighbors=10)

# # Get the recommended video titles
# recommended_video_titles = df['video_title'].iloc[indices[0]]

# print("Recommended videos:")
# print(recommended_video_titles)


import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

# Step 1: Load the dataset
df = pd.read_csv('train.csv')


tfidf_vectorizer = TfidfVectorizer()
tfidf_matrix = tfidf_vectorizer.fit_transform(df['video_description'])

cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)


# Step 6: Make Predictions
def get_recommendations(category, rating):
    # Find the index of the video matching the user's input
    user_input_index = df[(df['video_category'] == category) & (df['video_rating'] == rating)].index[0]

    # Compute the cosine similarity scores for all videos
    sim_scores = list(enumerate(cosine_sim[user_input_index]))

    # Sort the videos based on similarity scores
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Get the top recommendations
    top_recommendations = sim_scores[1:6]  # Exclude the user's input video
    recommended_indices = [rec[0] for rec in top_recommendations]

    # Return the video titles of the recommended videos
    recommended_titles = df['video_title'].iloc[recommended_indices]
    return recommended_titles

# Example usage
user_category = "Comedy"
user_rating = 3.4
recommendations = get_recommendations(user_category, user_rating)
print("Recommended Video Titles:")
print(recommendations)
