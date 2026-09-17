---
title: 'From Baku to Bonn'
description: 'Why I left a job I loved at Azerbaijan''s National AI Center to start an MSc in Germany, and what the first year actually felt like.'
pubDate: 2026-09-10
tags: ['Personal', 'Career', 'Germany']
---

I spent almost three years at Azerbaijan's National AI Center. I walked in as an intern in June 2023, a student who had read a lot of papers and shipped almost nothing, and I walked out in March 2026 as a Middle AI Engineer on a system that real lawyers use. That is the short version. The longer version is why I left.

## The job that taught me everything

Most of my time at the Center went into [eqanun.ai](https://eqanun.ai), a legal AI assistant for Azerbaijani law. It is the kind of project that sounds tidy in a job description and is anything but in practice. Legal text is long, structured, cross-referential, and unforgiving — if your retrieval returns the wrong article of the wrong code, you have not given a slightly worse answer, you have given a wrong one.

And it is in Azerbaijani. That single fact reshapes the whole problem. There is no strong off-the-shelf embedding model waiting for you. There is no clean, deduplicated corpus. There is no benchmark you can point at to convince yourself you are doing well. You build the tokenizer intuition, the evaluation set, and the retrieval stack yourself, and you learn very quickly which parts of the literature survive contact with a language that has 10 million speakers instead of a billion.

I loved it. I also noticed, somewhere around the second year, that I kept running into the same wall: I could make things work, but I could not always explain *why* one architecture beat another beyond "I ran the ablation and this one won."

## The decision

In parallel with the engineering work, I ran a research project under the Head of AI on domain-specific embedding and reranking models for legal search. It shipped into the E-qanun AI platform and became a technical paper. That year was the one that changed my mind. Doing research properly — reading carefully, designing an experiment that can actually falsify something, writing it down so someone else can check you — is a different skill from shipping, and I only had half of it.

So I applied to the University of Bonn for an M.Sc. in Computer Science. Admission ran through a paper-based research contest on large language models, which felt like the right filter: not "can you memorise," but "can you read a paper and say something non-obvious about it." I got in, and an Erasmus Mundus scholarship made it possible. I also received a Visegrad scholarship and turned it down — Germany was where I wanted to be.

## What the first year was actually like

Nobody warns you how much of moving countries is administrative. Anmeldung, blocked account, health insurance, a residence permit appointment three months out. For a while my main technical skill was filling in forms in a language I could not read.

The academic part was easier than the bureaucracy and harder than I expected in a different way. At work, I was the person who knew the retrieval stack. In a master's programme, you are surrounded by people who know things you have never touched, and the honest response is to be a beginner again on purpose. I have been enjoying that more than I thought I would.

German is the slow burn. I am at A1 and climbing, which is roughly the level where you can order food confidently and understand approximately none of the reply.

## What's next

I am looking for a working student position — up to 20 hours a week — in AI, ML or Data Science, around Bonn, Cologne, the wider NRW area, or remote. The thing I am best at is making retrieval systems work on messy, real, non-English data, and I would like to keep doing that while I study rather than putting it on hold for two years.

If that is a problem your team has, [my inbox is open](/contact/).

I am also going to write here more. Partly because explaining something is the fastest way to find out you do not understand it, and partly because a lot of what I learned about low-resource retrieval was never written down anywhere I could find it. The next few posts are my attempt to fix that.
