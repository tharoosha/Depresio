import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
import nlp
import random
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

def get_tweet(data):
    texts = [x['text'] for x in data]
    labels = [x['label'] for x in data]
    return texts, labels

def get_sequences(tokenizer, tweets):
    sequences = tokenizer.texts_to_sequences(tweets)
    padded= pad_sequences(sequences,truncating='post', padding='post',maxlen= 50)
    return padded

class_to_index = {'sadness': 0, 'joy': 1, 'love': 2, 'anger': 3, 'fear': 4, 'surprise': 5}
index_to_class = dict((v,k) for k,v in class_to_index.items())

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

def initialize():

    # dataset = nlp.load_dataset('json', data_files='D:\Projects\Depressio 1.2\Data\data.jsonl')

    test = nlp.load_dataset('json', data_files=r'C:\Users\nadil\OneDrive\Documents\Vihidun_SLIIT_Project\Depresio\ml_models\emotion_detection\Data\test.jsonl')
    train = nlp.load_dataset('json', data_files=r'C:\Users\nadil\OneDrive\Documents\Vihidun_SLIIT_Project\Depresio\ml_models\emotion_detection\Data\train.jsonl')
    val = nlp.load_dataset('json', data_files=r'C:\Users\nadil\OneDrive\Documents\Vihidun_SLIIT_Project\Depresio\ml_models\emotion_detection\Data\validation.jsonl')

    # dataset = nlp.load_dataset('json', data_files=r'C:\Users\nadil\OneDrive\Documents\Vihidun_SLIIT_Project\Depresio\ml_models\emotion_detection\Data\data.jsonl')
    # dataset =  dataset['train']

    # train_testval = dataset.train_test_split(test_size=0.01)
    # test_val = train_testval['test'].train_test_split(test_size=0.5)

    # train = train_testval['train']
    # test = test_val['train']
    # val = test_val['test']

    # print(train, test, val)

    train=train['train']
    test=test['train']
    val=val['train']

    tweets, labels = get_tweet(train)

    tokenizer = Tokenizer(num_words=1000,oov_token='<UNK>')
    tokenizer.fit_on_texts(tweets)

    maxlen= 50

    padded_train_seq = get_sequences(tokenizer,tweets)

    classes = set((labels))
    classes = [decodeLabels(x) for x in classes]

    # class_to_index = {'sadness': 0, 'joy': 1, 'love': 2, 'anger': 3, 'fear': 4, 'surprise': 5}
    # index_to_class = dict((v,k) for k,v in class_to_index.items())

    names_to_ids=lambda labels:np.array([x for x in labels])

    train_labels=names_to_ids(labels)

    # Creating the model
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

    model.summary()

    val_tweets, val_labels = get_tweet(val)
    val_seq = get_sequences(tokenizer,val_tweets)
    val_labels = names_to_ids(val_labels)

    h = model.fit(
        padded_train_seq, train_labels,
        validation_data=(val_seq, val_labels),
        epochs=20,
        callbacks=tf.keras.callbacks.EarlyStopping(monitor='val_accuracy', patience=2)
    )

    # test_tweets, test_labels= get_tweet(test)
    # test_seq=get_sequences(tokenizer, test_tweets)
    # test_labels=names_to_ids(test_labels)

    # model.evaluate(test_seq, test_labels)

    return model,tokenizer

def makePrediction(tweet, model, tokenizer):
    test_seq=get_sequences(tokenizer, tweet)
    x=np.expand_dims(test_seq[0], axis=0)
    p = model.predict(x)[0]
    pred_class = index_to_class[np.argmax(p).astype('uint8')]
    return pred_class

import openai

# Set up your OpenAI API credentials
# openai.api_key = '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'
openai.api_key = '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'

def get_completion(prompt, model="gpt-3.5-turbo"):
# def get_completion(prompt, model="text-davinci-002"):
    messages = [{"role": "user", "content": prompt}]
    response = openai.ChatCompletion.create(
    model=model,
    messages=messages,
    temperature=0,
    )

    return response.choices[0].message["content"]

import backoff

@backoff.on_exception(backoff.expo, openai.error.RateLimitError)
def completion_with_backoff(prompt):
    return get_completion(prompt)

def newMakeGPTprediction(tweet):
    prompt = tweet[0] + '\nGuess the most possible emotion for the given sentence within following emotions: sadness, joy, love, anger, fear, surprise.'
    # print(prompt)
    response = completion_with_backoff(prompt)
    return response

# ensemble two prediction using a weighted method
def finalAnswer(tweet, model, tokenizer):
    pred1 = makePrediction(tweet, model, tokenizer)
    # print(pred1)
    pred2 = newMakeGPTprediction(tweet)
    # print(pred2)
    if pred1 == pred2:
        return pred1
    elif (pred2 in ['sadness', 'joy', 'love', 'anger', 'fear', 'surprise']):
        return pred2
    else:
        return pred1

# newMakeGPTprediction(["I am very happy today"])
def answer(tweet):
    print(finalAnswer(tweet, model, tokenizer))

# answer(['I have got lower marks than I expected in my exam.'])

if __name__ == "__main__":
    print("I'm going to initialize")
    model, tokenizer = initialize()
    print("Initialized")
    # finalAnswer(['I am feeling sad'], model, tokenizer)

# print(finalAnswer(['I am feeling sad'], model, tokenizer))

