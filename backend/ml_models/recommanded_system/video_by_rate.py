
# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.linear_model import LinearRegression
# from sklearn.metrics import mean_squared_error
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.preprocessing import OneHotEncoder

# # Load your dataset (replace 'your_dataset.csv' with your data)
# data = pd.read_csv('sample_dataset.csv')

# # Feature extraction
# tfidf = TfidfVectorizer(max_features=1000, stop_words='english')
# X_text = tfidf.fit_transform(data['video_title'] + ' ' + data['video_description'])

# encoder = OneHotEncoder(sparse=False)
# X_category = encoder.fit_transform(data['video_category'].values.reshape(-1, 1))

# # Combine features
# X = pd.DataFrame(X_text.toarray())
# X = pd.concat([X, pd.DataFrame(X_category)], axis=1)

# # Target variable
# y = data['video_rating']

# # Split the data into training and testing sets
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# # Create and train the model
# model = LinearRegression()
# model.fit(X_train, y_train)

# # Make predictions
# y_pred = model.predict(X_test)

# # Evaluate the model (e.g., using Mean Squared Error)
# mse = mean_squared_error(y_test, y_pred)
# print(f'Mean Squared Error: {mse}')

# # User input: User's video preferences
# user_preferences = {
#     'video_title': 'Your preferred video title',
#     'video_description': 'Your preferred video description',
#     'video_category': 'Shorts'  # Replace with a valid category from your dataset
# }

# # Check if the user's preferred category is in the dataset
# if user_preferences['video_category'] not in data['video_category'].values:
#     print(f"User's preferred category '{user_preferences['video_category']}' is not found in the dataset.")
# else:
#     # Transform user preferences into features
#     user_features_text = tfidf.transform([user_preferences['video_title'] + ' ' + user_preferences['video_description']])
#     user_features_category = encoder.transform([[user_preferences['video_category']]])

#     # Combine user features
#     user_features = pd.DataFrame(user_features_text.toarray())
#     user_features = pd.concat([user_features, pd.DataFrame(user_features_category)], axis=1)

#     # Predict ratings for user preferences
#     user_rating = model.predict(user_features)

#     # Recommend videos with the highest predicted ratings
#     recommended_videos = data.loc[data['video_rating'] >= user_rating[0]]
#     print('Recommended Videos:')
#     print(recommended_videos[['video_title', 'video_description', 'video_category', 'video_rating']])

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.neighbors import NearestNeighbors

# Read the data from the CSV file
df = pd.read_csv('sample_dataset.csv')

# Define the features (text and categorical)
text_features = ['video_description']
categorical_features = ['video_category']

# Create a ColumnTransformer to preprocess text and categorical features
preprocessor = ColumnTransformer(
    transformers=[
        ('text', TfidfVectorizer(), text_features),
        ('cat', OneHotEncoder(), categorical_features)
    ])

# Create a Linear Regression model
model = Pipeline([
    ('preprocessor', preprocessor),
    ('regressor', LinearRegression())
])

# Define the target variable
y = df['video_rating']


# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(df.drop('video_rating', axis=1), y, test_size=0.2, random_state=42)


# Convert column names to strings
X_train.columns = X_train.columns.astype(str)


# Train the model
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Calculate the Mean Squared Error
mse = mean_squared_error(y_test, y_pred)
print("Mean Squared Error:", mse)

# Now, you can use this model to recommend videos to a user based on their mood and rating preferences.
# To recommend videos for a user with mood "Shorts" and ratings between 3.5 and 4.0, you can use k-Nearest Neighbors (k-NN) to find the most similar videos.

# First, transform the user's mood and rating into the feature space used by the model
user_features = tfidf_vectorizer.transform(["Shorts"]).toarray()
user_rating = 3.75  # Average of 3.5 and 4.0

# Combine the user's features with their rating
user_input = pd.concat([pd.DataFrame(user_features), df[category_feature_names].iloc[0, :], pd.DataFrame({'user_rating': [user_rating]})], axis=1)

# Fit a k-NN model to find similar videos
knn = NearestNeighbors(n_neighbors=10)
knn.fit(X)

# Find the indices of the most similar videos
distances, indices = knn.kneighbors(user_input, n_neighbors=10)

# Get the recommended video titles
recommended_video_titles = df['video_title'].iloc[indices[0]]

print("Recommended videos:")
print(recommended_video_titles)
