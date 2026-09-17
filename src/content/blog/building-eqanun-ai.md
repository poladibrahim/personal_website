---
title: 'Building e-qanun.ai: legal search for a low-resource language'
description: 'What it takes to ship a legal AI assistant when your language has no pretrained models, no clean corpus, and no benchmark to aim at.'
pubDate: 2026-07-22
tags: ['RAG', 'Retrieval', 'Low-resource NLP', 'Production']
---

Most RAG tutorials assume three things: you have English text, you have a good embedding model, and your documents are already digital. On [eqanun.ai](https://eqanun.ai) we had none of them. This is what we built instead.

## The problem

Azerbaijani legislation is published as a large body of interlinked documents — codes, laws, decrees, amendments — accumulated over decades. A lawyer's question is rarely a keyword. It sounds like "what are the notice requirements for terminating an employment contract during probation?" and the correct answer is a specific article of a specific code, in force in a specific version, with whatever amended it.

That gives you three hard requirements straight away:

1. **Precision matters more than recall.** A plausible-but-wrong article is worse than no answer.
2. **The answer must be attributable.** Every claim has to point back to a source document the user can open and read.
3. **The corpus is not text yet.** A meaningful share of it is scanned PDFs.

## Why a single vector index was never going to be enough

Dense retrieval is very good at the thing lexical search is bad at: matching a question phrased in everyday language against text written in legal register. It is also very good at confidently returning something adjacent and irrelevant.

Lexical search has the opposite failure mode. If a user types an exact article number, a defined legal term, or a proper noun, BM25-style matching finds it immediately and a dense model may not. Legal language is full of terms of art where the exact string genuinely matters.

So we ran both. Dense retrieval over embeddings in FAISS, lexical retrieval in Elasticsearch, candidates merged, then a cross-encoder reranker over the merged set to produce the final ordering. The reranker is the piece that does the heavy lifting for precision: it sees the query and the candidate passage together instead of comparing two independently-computed vectors, and it is dramatically better at telling "this is about the right topic" from "this actually answers the question."

I wrote about that stack in more detail in [Hybrid retrieval in production](/blog/hybrid-retrieval-in-production/).

## Chunking is a legal problem, not a text problem

The default advice — split into 512 tokens with some overlap — is actively wrong for legislation. Legal documents already have a structure that means something: code → chapter → article → paragraph. An article is the natural unit of citation, because it is the unit a lawyer cites.

We chunked along that structure rather than across it, and carried the hierarchy with each chunk as metadata, so a retrieved passage knows which article of which code it came from and can be rendered as a proper citation. That single decision improved both the answers and, more importantly, the user's ability to check them.

## Embeddings you have to train yourself

There was no Azerbaijani embedding model that understood legal text well enough. So we trained domain-specific embedding and reranking models on transformer architectures, targeting query understanding, ranking quality and low-resource adaptation.

The hardest part was not the training loop. It was building an evaluation set that meant anything. Without one you are tuning against your own intuition, which is a good way to make a system that works on the twenty queries you happen to remember. We invested in real query-document relevance judgements early, and every improvement claim after that point rests on them.

## Serving it

None of this matters if it is slow or falls over. The models run as containerised microservices on Kubernetes with CI/CD in front of them. Latency and cost came down through fairly unglamorous engineering — batching embedding and rerank calls, caching what repeats, parallelising what can run concurrently — and quality came up through hyperparameter search and ablation studies that told us which components were actually earning their keep.

That ablation habit is the thing I would keep if I could only keep one. In a pipeline with retrieval, merging, reranking and generation, it is genuinely easy to ship a component that does nothing. Turning each one off and measuring is the only way to know.

## What I would tell someone starting the same project

- **Build the evaluation set before the clever part.** Everything downstream depends on it.
- **Respect the document structure you were given.** Legal text is already chunked by people who thought hard about it.
- **Assume you will train your own models.** For a low-resource language this is not a stretch goal, it is the baseline.
- **Budget real time for OCR.** Which is its own post, because it deserves one.
