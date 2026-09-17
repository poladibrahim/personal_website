---
title: 'Hybrid retrieval in production: dense, lexical, and the reranker in between'
description: 'Why neither vector search nor BM25 is enough on its own, and how the three-stage retrieve–merge–rerank pattern actually behaves once real users touch it.'
pubDate: 2026-05-14
tags: ['Retrieval', 'RAG', 'FAISS', 'Elasticsearch', 'Production']
---

If you only take one thing from three years of building search: **the retriever and the ranker are different jobs, and trying to make one model do both is how you end up with a system that is fast and wrong.**

## The shape of the pipeline

The architecture that survived contact with production looks like this:

1. **Retrieve, twice, in parallel.** A dense pass over embeddings (FAISS) and a lexical pass (Elasticsearch). Each returns a generous candidate set — you are optimising for recall here, not precision.
2. **Merge.** Combine the two candidate lists into one.
3. **Rerank.** A cross-encoder scores each `(query, passage)` pair jointly and produces the final ordering. Only the top handful survive.

Stage 1 is cheap per document and weak at judging. Stage 3 is expensive per document and strong at judging. The whole design exists so that the expensive model only ever sees a short list.

## Why both retrievers

Dense and lexical retrieval fail in almost perfectly complementary ways.

Dense retrieval maps meaning. It handles the case where a user asks a question in plain language and the document answers it in a completely different register — which is most real questions. Its failure mode is confident topical drift: it finds something that is *about* the same area of law and is not the thing you asked for.

Lexical retrieval matches strings. It nails exact article numbers, defined terms, proper nouns, rare tokens — anything where the specific characters carry the meaning. Its failure mode is that it cannot bridge vocabulary at all.

For a while I tried to fix dense retrieval's precision problem by training a better embedding model. That helps, and there is a ceiling. A bi-encoder computes the query vector and the document vector *independently* and then compares them. It never gets to look at the two together. That is a structural limit, not a training-data problem.

## The reranker is where precision comes from

A cross-encoder does look at them together. Query and candidate go into the same forward pass, and the model can attend across both. On the same candidate set, the ordering it produces is not marginally better than cosine similarity — it is a different quality of answer.

The cost is that it is O(candidates) forward passes per query, which is exactly why it sits at stage 3 behind a cheap retriever, and exactly why the candidate set size is one of the most consequential numbers in the whole system. Too small and the reranker never sees the right document. Too large and your latency budget evaporates. That number deserves a real sweep, not a guess.

## Merging is less interesting than it looks, and you should still measure it

There are elegant ways to fuse two ranked lists and there are blunt ones. In a pipeline that ends in a cross-encoder, the merge step mostly needs to not lose the right document — the reranker will fix the ordering anyway. Which means the question to ask of your merge strategy is *"does the correct answer make it into the candidate set?"*, not *"is it ranked well?"*. Measure recall at the merge boundary, precision at the end.

## Making it fast

Three things moved latency more than anything model-related:

- **Batching.** Embedding and rerank calls one at a time wastes most of your GPU. Batch aggressively, both within a request and across concurrent requests.
- **Caching.** Real query traffic is not uniformly distributed. A lot of it repeats, exactly or nearly. Cache embeddings, cache rerank scores, cache final results where correctness allows.
- **Parallelism.** The dense and lexical passes have no dependency on each other. Run them concurrently. This one is free and people forget it constantly.

None of this is research. All of it is the difference between a demo and a product.

## Ablate everything

In a four-stage pipeline it is genuinely easy to ship a component that contributes nothing, because the end-to-end number went up when you added it and something else also changed that week.

Turn each stage off. Measure. I have found components that were pure cost more than once, and the only reason I found them is that switching things off was part of the routine rather than a special investigation.

## The short version

- Retrieve for recall, rerank for precision, and do not confuse the two.
- Run dense and lexical together — their failure modes cancel.
- Candidate set size is a real hyperparameter with a real sweep.
- Batching, caching and parallelism buy more latency than a smaller model will.
- If you cannot ablate it, you do not know whether you need it.
