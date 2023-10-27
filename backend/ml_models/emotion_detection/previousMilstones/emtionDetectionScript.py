# %% [markdown]
# ### Initialization and load the data

# %%
# ! pip install nlp

# %%
# %matplotlib inline

import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
import nlp
import random

# %%
print("Await...")

# %%
def show_history(h):
    epochs_trained = len(h.history['loss'])
    plt.figure(figsize=(16,6))

    plt.subplot(1,2,1)
    plt.plot(range(0, epochs_trained), h.history.get('accuracy'), label='Training')
    plt.plot(range(0, epochs_trained), h.history.get('val_accuracy'), label='Validation')
    plt.ylim([0., 1.])
    plt.xlabel('Epochs')
    plt.ylabel('Accuracy')
    plt.legend()

    plt.subplot(1,2,2)
    plt.plot(range(0, epochs_trained), h.history.get('loss'), label='Training')
    plt.plot(range(0, epochs_trained), h.history.get('val_loss'), label='Validation')
    plt.xlabel('Epochs')
    plt.ylabel('Loss')
    plt.legend()
    plt.show()
    
    


# %%
def show_confusion_matrix(y_true, y_pred, classes):
    from sklearn.metrics import confusion_matrix

    cm = confusion_matrix(y_true, y_pred, normalize='true')

    plt.figure(figsize=(8,8))
    sp = plt.subplot(1, 1, 1)
    ctx = sp.matshow(cm)
    plt.xticks(list(range(0,6)), labels=classes)
    plt.yticks(list(range(0,6)), labels=classes)
    plt.colorbar(ctx)
    plt.show()

print('using TensorFlow version', tf.__version__)


# %%
def decodeLabels(label):
        if label == 0: 
                return 'sadness'
        elif label == 1:
                return 'joy'
        elif label == 2:
                return 'love'
        elif label == 3:
                return 'anger'
        elif label == 4:
                return 'fear'
        elif label == 5:
                return 'surprise'

# %%
def makePrediction(tweet):
    # use the model to predict and print the sentiment of a custom tweet provided by the user

    # custom_sentence = ["i didnt feel comfertable"]
    test_seq=get_sequences(tokenizer, tweet)
    x=np.expand_dims(test_seq[0], axis=0)
    p = model.predict(x)[0]
    pred_class = index_to_class[np.argmax(p).astype('uint8')]
    # print('Predicted Emotion:', pred_class)
    return pred_class

# %%
dataset = nlp.load_dataset('json', data_files=r'C:\Users\nadil\OneDrive\Documents\Vihidun_SLIIT_Project\Depresio\ml_models\emotion_detection\Data\data.jsonl')
# dataset = nlp.load_dataset('json', data_files=r'C:\Users\nadil\OneDrive\Documents\Vihidun_SLIIT_Project\Depresio\ml_models\emotion_detection\Data\train.jsonl')
dataset =  dataset['train']

# %%
# dataset

# %%
train_testval = dataset.train_test_split(test_size=0.01)
test_val = train_testval['test'].train_test_split(test_size=0.5)
# dataset = {'train' : train_testval['train'], 'test' : test_val['train'], 'val' : test_val['test']}
# dataset
train = train_testval['train']
test = test_val['train']
val = test_val['test']

# print(train, test, val)

# %%
# type(train)

# %%
def get_tweet(data):
    texts = [x['text'] for x in data]
    labels = [x['label'] for x in data]
    return texts, labels

# %%
tweets, labels = get_tweet(train)


# %%
# tweets

# %%
# labels

# %% [markdown]
# ### Tokenizer

# %%
from tensorflow.keras.preprocessing.text import Tokenizer

# %%
tokenizer = Tokenizer(num_words=1000,oov_token='<UNK>')
tokenizer.fit_on_texts(tweets)

# %%
# tokenizer.texts_to_sequences([tweets[0]])

# %%
# tweets[4]

# %% [markdown]
# ### Padding and Truncating Sequences

# %%
# lengths=[len(t.split(" ")) for t in tweets]
# plt.hist(lengths,bins=len(set(lengths)))
# plt.show()

# %%
maxlen= 50

from tensorflow.keras.preprocessing.sequence import pad_sequences


# %%
def get_sequences(tokenizer, tweets):
    sequences = tokenizer.texts_to_sequences(tweets)
    padded= pad_sequences(sequences,truncating='post', padding='post',maxlen= maxlen)
    return padded

# %%
padded_train_seq = get_sequences(tokenizer,tweets)

# %%
# padded_train_seq[0]

# %% [markdown]
# ### Preparing the Labels

# %%
classes = set((labels))
classes = [decodeLabels(x) for x in classes]
# print(classes)

# %%
# plt.hist(labels, bins=11)
# plt.xticks(list(range(0,6)), labels=classes)
# plt.show()

# %%
class_to_index = {'sadness': 0, 'joy': 1, 'love': 2, 'anger': 3, 'fear': 4, 'surprise': 5}
# class_to_index = dict((c,i) for i, c in enumerate(classes))
index_to_class = dict((v,k) for k,v in class_to_index.items())

# %%
# class_to_index

# %%
# index_to_class

# %%
# names_to_ids=lambda labels:np.array([class_to_index.get(x) for x in labels])
names_to_ids=lambda labels:np.array([x for x in labels])

# %%
train_labels=names_to_ids(labels)
# print(train_labels[4])

# %% [markdown]
# ### Creating the model

# %%
model = tf.keras.models.Sequential([
    tf.keras.layers.Embedding(1000,16,input_length=maxlen),
    tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(20,return_sequences=True)),
    tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(20)),
    tf.keras.layers.Dense(6,activation='softmax')
])

model.compile(
    loss='sparse_categorical_crossentropy',
    optimizer='adam',
    metrics=['accuracy']
)

# %%
model.summary()

# %% [markdown]
# ### Training the Model

# %%
# val = val['train']

# %%
val_tweets, val_labels = get_tweet(val)
val_seq = get_sequences(tokenizer,val_tweets)
val_labels = names_to_ids(val_labels)

# %%
val_tweets[1], val_labels[1]

# %%
h = model.fit(
    padded_train_seq, train_labels,
    validation_data=(val_seq, val_labels),
    epochs=20,
    callbacks=tf.keras.callbacks.EarlyStopping(monitor='val_accuracy', patience=2)
)


# %% [markdown]
# ### Evaluating the Model

# %%
show_history(h)

# %%
# test = test['train']

# %%
# test_tweets, test_labels= get_tweet(test)
# test_seq=get_sequences(tokenizer, test_tweets)
# test_labels=names_to_ids(test_labels)

# %%
# model.evaluate(test_seq, test_labels)

# %%
# i = random.randint(0, len(test_labels) - 1)
# i

# %%
# test_labels

# %%
# np.expand_dims(test_seq[i], axis=0)

# %%
# i = random.randint(0, len(test_labels) - 1)
# print('Sentence:', test_tweets[i])
# print('Emotion:', index_to_class[test_labels[i]])
# p = model.predict(np.expand_dims(test_seq[i], axis=0))[0]
# pred_class = index_to_class[np.argmax(p).astype('uint8')]
# print('Predicted Emotion:', pred_class)


# %% [markdown]
# custome function evaluation

# %%
# custom_sentence = ["i didnt feel confertable"]
# test_seq=get_sequences(tokenizer, custom_sentence)
# x=np.expand_dims(test_seq[0], axis=0)
# p = model.predict(x)[0]


# %%
# pred_class = index_to_class[np.argmax(p).astype('uint8')]
# print('Predicted Emotion:', pred_class)

# %%
# preds = model.predict(test_seq)
# classes_x = np.argmax(preds, axis=1)


# %%
# show_confusion_matrix(test_labels,classes_x,list(classes))

# %% [markdown]
# Custom Inputs

# %%

# %%
# comment out this

for i in range(5):
      print(makePrediction(list(input('Enter tweet'))))