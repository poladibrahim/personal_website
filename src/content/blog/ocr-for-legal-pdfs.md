---
title: 'OCR for legal PDFs: the unglamorous half of RAG'
description: 'Multi-column layouts, scans of scans, and tables that carry legal meaning. Notes on the document pipeline nobody puts in the architecture diagram.'
pubDate: 2026-03-30
tags: ['OCR', 'Document AI', 'RAG', 'Production']
---

Every RAG architecture diagram starts with a cylinder labelled "documents." In my experience roughly half the engineering effort lives inside that cylinder, and none of it is in the diagram.

## The input is worse than you think

When you build retrieval over an official legal corpus, you do not get clean text. You get, in rough order of increasing pain:

- Digital PDFs with a proper text layer. Fine.
- Digital PDFs with a text layer that is *wrong* — reading order scrambled, ligatures mangled, or a text layer that does not match what is rendered.
- Scans. Sometimes good ones.
- Scans of photocopies of scans, slightly rotated, with a stamp over the article number you needed.

The second category is the dangerous one, because it looks like success. You extract text, you get text, nothing errors, and the reading order is nonsense.

## Multi-column layouts break naive extraction

Legal documents love two-column layouts. A naive extractor reads across the page rather than down the column, and you get sentences that interleave two unrelated paragraphs. The output is fluent-looking garbage, which will sail straight through any check based on "did we get text out."

The fix is layout analysis before text extraction: detect regions, establish reading order, extract within regions. This is the single highest-value thing in a document pipeline for this kind of corpus, and it is the step people skip because the naive version appears to work.

## Tables mean something

In most documents a table is decoration. In legislation a table is frequently the actual legal content — rates, thresholds, deadlines, categories. Flattening it into a line of space-separated numbers destroys the relationship between a row and its header, and a retrieval system built on that will confidently return a number attached to the wrong category.

Tables need structural extraction and a serialisation that preserves the row/column relationship in whatever form the downstream model sees. Getting this wrong is not a quality regression, it is a correctness bug that happens to be quiet.

## Build the boring diagnostics first

The thing I would do earlier if I did it again: instrument the pipeline so you can *see* what came out, per document, at scale.

Cheap signals that caught real problems for us:

- Characters extracted per page, flagged against the distribution for that document type. A near-empty page in the middle of a dense document is a scan that failed silently.
- Ratio of non-dictionary tokens. Spikes mean OCR noise or an encoding problem.
- Reading-order sanity checks — does the article numbering come out monotonic?
- Spot-rendering: pull a random sample of pages and compare extracted text against the rendered image by eye. Do this regularly. Nothing else finds the weird cases.

The failure mode of a document pipeline is not a crash. It is silent, partial degradation on a subset of documents that you will not notice until a user asks about exactly those documents.

## Pre-process for retrieval, not for reading

Once the text is out, there is a second round of decisions. Hyphenation across line breaks, headers and footers repeated on every page, page numbers embedded mid-sentence, footnote markers glued to words. None of this matters to a human reading the PDF and all of it pollutes an embedding.

The rule I settled on: normalise anything that is an artefact of *rendering*, preserve anything that is an artefact of *the document's structure*. Page numbers go. Article numbers absolutely stay — they are how the citation works.

## Why it is worth the effort

A retrieval system cannot be better than its corpus. You can train a better embedding model, add a cross-encoder, tune the candidate set — and if the article the user needs was extracted as scrambled two-column soup, none of it helps.

The document pipeline is not the interesting part of the system. It is the part that determines the ceiling of everything above it.
