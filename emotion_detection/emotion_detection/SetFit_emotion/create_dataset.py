from datasets import load_dataset


def main():
    raw_dset = load_dataset("emotion")
    labels = raw_dset["train"].features["label"]

    for split, dset in raw_dset.items():
        dset = dset.map(lambda x: {"label_text": labels.int2str(x["label"])}, num_proc=4)
        dset.to_json(f"{split}.jsonl")


if __name__ == "__main__":
    main()
