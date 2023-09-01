import emotionScript

if __name__ == "__main__":
    print("I'm here")
    model, tokenizer, emotionQueue = emotionScript.initialize()
    # print(emotionScript.getInstantEmotion(['I have got lower marks than I expected in my exam.'], model, tokenizer))
    print(emotionScript.getEmotion(['I have got lower marks than I expected in my exam.'], model, tokenizer, emotionQueue))
