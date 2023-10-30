# import numpy as np
# import pandas as pd
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.feature_extraction.text import CountVectorizer
# from sentence_transformers import SentenceTransformer
# from sklearn.multioutput import MultiOutputClassifier
# from sklearn.linear_model import SGDClassifier


# # Load the model and data (you can load them as globals)
# df = pd.read_csv('title_category.csv')
# df = df.rename(columns={'Unnamed: 0': 'Index'})
# df = df.dropna(subset=['Index'])
# df['Type of Video'] = df['Type of Video'].str.replace('__##__', ',')

# tf_idf = TfidfVectorizer(min_df=2, max_features=None, strip_accents='unicode',
#                         norm='l2', analyzer='char', token_pattern=r'\w{1,}', ngram_range=(1, 5),
#                         use_idf=1, smooth_idf=1, stop_words='english')
# features = tf_idf.fit_transform(df['Title of the video']).toarray()
# embedder = SentenceTransformer('bert-base-nli-mean-tokens')
# semantic_embedder = SentenceTransformer('bert-base-nli-stsb-mean-tokens')
# bert_features = embedder.encode(df['Title of the video'].tolist())
# semantic_bert_features = semantic_embedder.encode(df['Title of the video'].tolist())
# final_features = np.hstack((features, bert_features, semantic_bert_features))

# df['Type of Video'].fillna('', inplace=True)
# vectorizer = CountVectorizer(tokenizer=lambda x: x.split(','))
# y = vectorizer.fit_transform(df['Type of Video'])
# clf = MultiOutputClassifier(SGDClassifier(max_iter=4000)).fit(final_features, y.toarray())

# def generate_embedding(text):
#     word_transform = tf_idf.transform([text]).toarray()[0]
#     bert_transform = embedder.encode([text], show_progress_bar=False)[0]
#     semantic_bert_transform = semantic_embedder.encode([text], show_progress_bar=False)[0]
#     embedding = np.hstack((word_transform, bert_transform, semantic_bert_transform))
#     return embedding

# def get_terms(pred_list):
#     return [w.title() for w in vectorizer.inverse_transform([pred_list])[0]]

# def get_topics(text):
#     text_embedding = generate_embedding(text)
#     pred_list = clf.predict([text_embedding])[0]
#     return get_terms(pred_list)

# def classify_video():
#     print("Model called")
#     video_title = data['video_title']
#     categories = get_topics(video_title)
#     return categories



# video_title = "Eric Weinstein: Revolutionary Ideas in Science, Math, and Society | Artificial Intelligence Podcast"

# data = {'video_title': video_title}

# categories = classify_video()

# print(categories)

import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sentence_transformers import SentenceTransformer
from sklearn.multioutput import MultiOutputClassifier
from sklearn.linear_model import SGDClassifier
from sklearn.preprocessing import MultiLabelBinarizer

# Load the model and data (you can load them as globals)
df = pd.read_csv('title_category.csv').dropna(subset=['Unnamed: 0']).rename(columns={'Unnamed: 0': 'Index'})
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
mlb = MultiLabelBinarizer()
y = mlb.fit_transform(df['Type of Video'].str.split(','))
clf = MultiOutputClassifier(SGDClassifier(max_iter=4000)).fit(final_features, y)

def generate_embedding(text):
    word_transform = tf_idf.transform([text]).toarray()[0]
    bert_transform = embedder.encode([text], show_progress_bar=False)[0]
    semantic_bert_transform = semantic_embedder.encode([text], show_progress_bar=False)[0]
    embedding = np.hstack((word_transform, bert_transform, semantic_bert_transform))
    return embedding

def get_topics(text):
    text_embedding = generate_embedding(text)
    pred_list = clf.predict([text_embedding])[0]
    return mlb.classes_[pred_list == 1]

def classify_video(video_title):
    categories = get_topics(video_title)
    return categories

video_title = "Eric Weinstein: Revolutionary Ideas in Science, Math, and Society | Artificial Intelligence Podcast"
categories = classify_video(video_title)
print(categories)
