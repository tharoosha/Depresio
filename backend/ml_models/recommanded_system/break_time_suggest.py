import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression


def predict_break_time(working_time):
    df = pd.read_csv('/Volumes/Transcend/Development/Depresio/ml_models/recommanded_system/break_time.csv')

    z_scores = np.abs((df - df.mean()) / df.std())
    df_filtered = df[(z_scores < 3).all(axis=1)]

    X = df_filtered[['working_time']]
    y = df_filtered['break_time']

    model = LinearRegression()
    model.fit(X, y)

    predicted_break_time = model.predict([[working_time]])

    return {"break_time": predicted_break_time[0]}


print(predict_break_time(12.5))
