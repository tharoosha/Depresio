from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_extraction.text import CountVectorizer
from sentence_transformers import SentenceTransformer
from sklearn.multioutput import MultiOutputClassifier
from sklearn.linear_model import SGDClassifier

app = Flask(__name__)

# Load the model and data (you can load them as globals)
df = pd.read_csv('title_category.csv')
df = df.rename(columns={'Unnamed: 0': 'Index'})
df = df.dropna(subset=['Index'])
df['Type of Video'] = df['Type of Video'].str.replace('__##__', ',')

tf_idf = TfidfVectorizer(min_df=2, max_features=None, strip_accents='unicode',
                        norm='l2', analyzer='char', token_pattern=r'\w{1,}', ngram_range=(1, 5),
                        use_idf=1, smooth_idf=1, stop_words='english')
features = tf_idf.fit_transform(df['Title of the video']).toarray()
embedder = SentenceTransformer('bert-base-nli-mean-tokens')
semantic_embedder = SentenceTransformer('bert-base-nli-stsb-mean-tokens')
bert_features = embedder.encode(df['Title of the video'].tolist())
semantic_bert_features = semantic_embedder.encode(df['Title of the video'].tolist())
final_features = np.hstack((features, bert_features, semantic_bert_features))

df['Type of Video'].fillna('', inplace=True)
vectorizer = CountVectorizer(tokenizer=lambda x: x.split(','))
y = vectorizer.fit_transform(df['Type of Video'])
clf = MultiOutputClassifier(SGDClassifier(max_iter=4000)).fit(final_features, y.toarray())

def generate_embedding(text):
    word_transform = tf_idf.transform([text]).toarray()[0]
    bert_transform = embedder.encode([text], show_progress_bar=False)[0]
    semantic_bert_transform = semantic_embedder.encode([text], show_progress_bar=False)[0]
    embedding = np.hstack((word_transform, bert_transform, semantic_bert_transform))
    return embedding

def get_terms(pred_list):
    return [w.title() for w in vectorizer.inverse_transform([pred_list])[0]]

def get_topics(text):
    text_embedding = generate_embedding(text)
    pred_list = clf.predict([text_embedding])[0]
    return get_terms(pred_list)

@app.route('/classify', methods=['POST'])
def classify_video():

    print("Model called")
    data = request.get_json()
    video_title = data['video_title']

    # Call the get_topics function to classify the video
    categories = get_topics(video_title)

    # Return the categories as a JSON response
    response = {'categories': categories}
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
