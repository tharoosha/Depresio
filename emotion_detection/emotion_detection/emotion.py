import json

import datasets
from datasets.tasks import TextClassification


_CITATION = """\
@inproceedings{saravia-etal-2018-carer,
    title = "{CARER}: Contextualized Affect Representations for Emotion Recognition",
    author = "Saravia, Elvis  and
      Liu, Hsien-Chi Toby  and
      Huang, Yen-Hao  and
      Wu, Junlin  and
      Chen, Yi-Shin",
    booktitle = "Proceedings of the 2018 Conference on Empirical Methods in Natural Language Processing",
    month = oct # "-" # nov,
    year = "2018",
    address = "Brussels, Belgium",
    publisher = "Association for Computational Linguistics",
    url = "https://www.aclweb.org/anthology/D18-1404",
    doi = "10.18653/v1/D18-1404",
    pages = "3687--3697",
    abstract = "Emotions are expressed in nuanced ways, which varies by collective or individual experiences, knowledge, and beliefs. Therefore, to understand emotion, as conveyed through text, a robust mechanism capable of capturing and modeling different linguistic nuances and phenomena is needed. We propose a semi-supervised, graph-based algorithm to produce rich structural descriptors which serve as the building blocks for constructing contextualized affect representations from text. The pattern-based representations are further enriched with word embeddings and evaluated through several emotion recognition tasks. Our experimental results demonstrate that the proposed method outperforms state-of-the-art techniques on emotion recognition tasks.",
}
"""

_DESCRIPTION = """\
Emotion is a dataset of English Twitter messages with six basic emotions: anger, fear, joy, love, sadness, and surprise. For more detailed information please refer to the paper.
"""

_HOMEPAGE = "https://github.com/dair-ai/emotion_dataset"

_LICENSE = "The dataset should be used for educational and research purposes only"

_URLS = {
    "split": {
        "train": "data/train.jsonl.gz",
        "validation": "data/validation.jsonl.gz",
        "test": "data/test.jsonl.gz",
    },
    "unsplit": {
        "train": "data/data.jsonl.gz",
    },
}


class Emotion(datasets.GeneratorBasedBuilder):
    VERSION = datasets.Version("1.0.0")
    BUILDER_CONFIGS = [
        datasets.BuilderConfig(
            name="split", version=VERSION, description="Dataset split in train, validation and test"
        ),
        datasets.BuilderConfig(name="unsplit", version=VERSION, description="Unsplit dataset"),
    ]
    DEFAULT_CONFIG_NAME = "split"

    def _info(self):
        class_names = ["sadness", "joy", "love", "anger", "fear", "surprise"]
        return datasets.DatasetInfo(
            description=_DESCRIPTION,
            features=datasets.Features(
                {"text": datasets.Value("string"), "label": datasets.ClassLabel(names=class_names)}
            ),
            supervised_keys=("text", "label"),
            homepage=_HOMEPAGE,
            citation=_CITATION,
            license=_LICENSE,
            task_templates=[TextClassification(text_column="text", label_column="label")],
        )

    def _split_generators(self, dl_manager):
        """Returns SplitGenerators."""
        paths = dl_manager.download_and_extract(_URLS[self.config.name])
        if self.config.name == "split":
            return [
                datasets.SplitGenerator(name=datasets.Split.TRAIN, gen_kwargs={"filepath": paths["train"]}),
                datasets.SplitGenerator(name=datasets.Split.VALIDATION, gen_kwargs={"filepath": paths["validation"]}),
                datasets.SplitGenerator(name=datasets.Split.TEST, gen_kwargs={"filepath": paths["test"]}),
            ]
        else:
            return [datasets.SplitGenerator(name=datasets.Split.TRAIN, gen_kwargs={"filepath": paths["train"]})]

    def _generate_examples(self, filepath):
        """Generate examples."""
        with open(filepath, encoding="utf-8") as f:
            for idx, line in enumerate(f):
                example = json.loads(line)
                yield idx, example
