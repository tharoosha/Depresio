import emotionScript

if __name__ == "__main__":
    print("I'm here")
    model, tokenizer = emotionScript.initialize()
    print(emotionScript.finalAnswer(['I have got lower marks than I expected in my exam.'], model, tokenizer))
