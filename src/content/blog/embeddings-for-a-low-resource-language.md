---
title: 'What training embeddings for Azerbaijani taught me about the rest of NLP'
description: 'Working on a language with no pretrained models strips away the shortcuts. Here is what is left when you cannot download your way out of a problem.'
pubDate: 2026-01-18
tags: ['Embeddings', 'Low-resource NLP', 'Research', 'Azerbaijani']
---

There is a version of machine learning engineering that consists of choosing the right model from a hub and fine-tuning it. It is a real skill and it is most of the industry. It is also not available to you if you work in Azerbaijani.

That constraint turned out to be the most useful teacher I have had.

## You find out what the pretrained model was doing for you

When there is a strong pretrained encoder for your language, it silently solves a lot of problems: tokenisation that does not shred your words, a sense of which tokens are semantically close, robustness to morphological variation. You inherit all of it and you never have to think about it.

Azerbaijani is agglutinative. A single root takes a stack of suffixes, and a tokenizer built mostly on English text will split a perfectly ordinary word into four meaningless pieces. Suddenly the thing you never thought about is the first thing on your list, and you understand what it was doing for you precisely because it stopped doing it.

The same is true up the stack. Every convenience you lose becomes a thing you now understand.

## Evaluation is the whole game

With a well-resourced language you can lean on public benchmarks. They are imperfect, but they give you a shared ruler.

For Azerbaijani legal retrieval there was no ruler. And without one, "did this change help?" is not a question you can answer — you are just choosing whichever variant felt better on the handful of queries you happen to remember, which is a great way to spend six months going sideways.

Building real relevance judgements is slow, unglamorous work. It is also the single highest-leverage thing we did. Every claim of improvement in that project traces back to it. If I started a new low-resource project tomorrow, I would build the evaluation set first and not write a line of model code until it existed.

## Domain beats scale more often than you expect

The intuition from the English-language literature is that bigger and more general usually wins. In a narrow domain, in a low-resource language, that intuition is not reliable. A smaller model trained on in-domain text — the actual legal register, the actual query patterns — repeatedly beat larger general-purpose alternatives on our task.

This is not a claim that scale does not matter. It is a claim that the gap a general model has to cross is much wider when the domain is specialised *and* the language is underrepresented in its pretraining data. Both gaps compound.

## Bi-encoders and cross-encoders are answering different questions

A bi-encoder embeds the query and the document separately and compares the vectors. It has to compress everything it might ever need to know about a document into a fixed vector, before it has seen the query. That is what makes it fast enough to index millions of passages, and it is also a hard structural ceiling on precision.

A cross-encoder sees both together. It cannot be pre-indexed, which is why it can only run over a short candidate list, and on that list it is far better.

Training both, for the same domain, made the trade-off concrete in a way that reading about it never did: you are not choosing between two models, you are assigning two different jobs.

## Data augmentation as a first-class citizen

With limited data you spend real time on generating more of it — paraphrase, synthetic queries against known-relevant passages, hard-negative mining. Hard negatives especially: passages that are topically close but wrong are exactly what the model needs to learn to separate, and random negatives teach it almost nothing after the first epoch.

A lot of my work in that period was building reusable pipelines to preprocess, clean and augment large-scale text corpora. That sounds like infrastructure. It was the model work.

## The transferable part

None of the above is really about Azerbaijani. It is about what happens when the shortcuts are removed:

- You learn what the pretrained model was doing, by losing it.
- You cannot skip evaluation, because nobody built it for you.
- You stop assuming bigger is better and start measuring.
- You treat data work as model work, because it is.

I would recommend a low-resource problem to anyone who wants to actually understand the stack. It is slower. You will know why everything is there.
