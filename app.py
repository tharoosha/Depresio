import numpy as np
import pandas as pd
import warnings  # Import the warnings module to suppress warnings
from sklearn.feature_extraction.text import TfidfVectorizer
from sentence_transformers import SentenceTransformer
from sklearn.multioutput import MultiOutputClassifier
from sklearn.linear_model import SGDClassifier
from sklearn.preprocessing import MultiLabelBinarizer

# Load the model and data (you can load them as globals)
df = pd.read_csv('title_category.csv').dropna(subset=['Unnamed: 0']).rename(columns={'Unnamed: 0': 'Index'})
df['Category'] = df['Category'].str.replace('__##__', ',')

# Suppress FutureWarnings and UserWarnings
warnings.simplefilter(action='ignore', category=FutureWarning)
warnings.simplefilter(action='ignore', category=UserWarning)

tf_idf = TfidfVectorizer(min_df=2, max_features=None, strip_accents='unicode',
                        norm='l2', analyzer='char', token_pattern=r'\w{1,}', ngram_range=(1, 5),
                        use_idf=1, smooth_idf=1, stop_words='english')
features = tf_idf.fit_transform(df['Title of the video']).toarray()
embedder = SentenceTransformer('bert-base-nli-mean-tokens')
semantic_embedder = SentenceTransformer('bert-base-nli-stsb-mean-tokens')
bert_features = embedder.encode(df['Title of the video'].tolist())
semantic_bert_features = semantic_embedder.encode(df['Title of the video'].tolist())
final_features = np.hstack((features, bert_features, semantic_bert_features))

df['Category'].fillna('', inplace=True)
mlb = MultiLabelBinarizer()
y = mlb.fit_transform(df['Category'].str.split(','))
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

video_title = "Revolutionary Ideas in Science, Math, and Society | Artificial Intelligence Podcast"
categories = classify_video(video_title)
print(categories)

video_title = "The 7 Habits of Highly Effective People by Stephen Covey - Animated Book Review"
categories = classify_video(video_title)
print(categories)


