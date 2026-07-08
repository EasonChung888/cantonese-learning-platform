# Day 5 · 约会 — Design

## Goal

Append Chapter 04, “約會”, as `day5` in the existing Cantonese study website. The supplied source spans printed pages 40–53. Day 5 must preserve the chapter’s source order, printed Cantonese romanization, distinct complete sentences, and Simplified Chinese learner-facing explanations.

## Source order and scope

Process the images by visible printed page number: 40–53. The unnumbered chapter title page belongs immediately before page 40. Include the lesson text, key vocabulary, supplementary vocabulary, comprehension and grammar explanations, Cantonese usage notes, checked-tone pronunciation material, exercises, Cantonese-character recognition, and short reading.

Every distinct complete source sentence appears exactly once as a `sentenceJyutping` item. Isolated words, pronunciation-table cells, and fragments become non-sentence entries with all three quiz modes: `jyutping`, `meaning`, and `reverse`.

## Data design

Use exactly these modules, in this order:

1. `重點詞彙`
2. `課文`
3. `補充語彙`
4. `重點理解`
5. `講解`
6. `練習`
7. `粵字辨認`
8. `短文朗讀`

Categories follow `<chapter> <title> · <subtitle>`. Material under `講解` uses nested categories for the source subsection, including grammar, Cantonese time expressions, 入聲韻母, pronunciation practice, and 粵語趣談. IDs begin with `day5-` and follow the existing Day 3/4 field shapes.

The chapter navigation entry is `{ id: "day5", label: "Day 5", topic: "约会" }`. Existing days and their content remain unchanged. Day 1 and Day 2 retain their legacy module order; chapter-based days use their data-derived module order.

## Audio and interface

Generate one `.m4a` file for each new sentence item. Each filename exactly matches its item ID, and synthesis uses `item.cantonese || item.traditional`. The visible interface remains Simplified Chinese while Cantonese-specific characters and the book’s romanization are preserved.

## Verification

Run JavaScript syntax checks, the bundled Day validator with required audio, and an HTTP smoke test. Confirm:

- Day 5 navigation displays the topic and item count.
- All eight modules appear in the required order.
- IDs and normalized sentences are unique.
- Every sentence has matching audio.
- The page loads successfully from a local HTTP URL.

Any genuinely unreadable source text or inferred pronunciation will be reported explicitly rather than silently invented.
