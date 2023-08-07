import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import LabelEncoder
import numpy as np

import sys
import json

def train_and_predict_video_types(input_mood):
    # try: 
        df = pd.read_csv('/Volumes/Transcend/Development/Depresio/ml_models/recommanded_system/youtube_data.csv', engine='python')
        mood_encoder = LabelEncoder()
        video_type_encoder = LabelEncoder()
        df['mood_encoded'] = mood_encoder.fit_transform(df['mood'])
        df['video_type_encoded'] = video_type_encoder.fit_transform(
            df['video_type'])
        X = df['mood_encoded']
        y = df['video_type_encoded']
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42)
        param_grid = {'C': [0.1, 1, 10]}

        logreg = LogisticRegression(
            multi_class='multinomial', solver='lbfgs', max_iter=1000)
        
        grid_search = GridSearchCV(logreg, param_grid, cv=5)
        
        grid_search.fit(X_train.values.reshape(-1, 1), y_train)
        best_model = grid_search.best_estimator_
        best_params = grid_search.best_params_
        best_model.fit(X_train.values.reshape(-1, 1), y_train)
        input_mood_encoded = mood_encoder.transform([input_mood])
        input_data = pd.DataFrame({'mood_encoded': input_mood_encoded})
        num_predictions = 1000
        input_data_repeated = pd.concat(
            [input_data] * num_predictions, ignore_index=True)
        predicted_probabilities = best_model.predict_proba(
            input_data_repeated.values.reshape(-1, 1))
        video_types = video_type_encoder.classes_
        average_probabilities = np.mean(predicted_probabilities, axis=0)
        filtered_video_types = []
        filtered_probabilities = []
        total_filtered_probability = 0
        for video_type, probability in zip(video_types, average_probabilities):
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
        
        # result = json.dumps(video_type_probabilities_dict)
        # # response = str(result)
        # output = {"result": result}

        # output_json = json.dumps(output)
        # sys.stdout.flush()
        # print(result)
        return video_type_probabilities_dict
    # except:
        # error_message = str(e)
        # output = {"error2011": error_message}

        # output_json = json.dumps(output)
        # # print(output_json)
        # sys.stdout.flush()
        # return(output_json)
    # return input_mood
    # return result


# print(train_and_predict_video_types(input_mood=sys.argv[1]))
# train_and_predict_video_types(input_mood="Happiness")

# print(result)

# if __name__ == '__main__':
#     input = sys.argv[1]
#     # print(train_and_predict_video_types(input))
#     # train_and_predict_video_types(input)
#     train_and_predict_video_types(input)

    # input

# if __name__ == '__main__':
#     # Check if there is at least one command-line argument (excluding the script name)
#     if len(sys.argv) > 1:
#         # The first command-line argument (sys.argv[1]) will be the input_mood
#         input_mood = sys.argv[1]

#         # Call the function with the received input_mood
#         train_and_predict_video_types(input_mood)
#     else:
#         # If no input_mood is provided, handle the case accordingly
#         print(json.dumps({"error": "No mood provided"}))
#         sys.stdout.flush()