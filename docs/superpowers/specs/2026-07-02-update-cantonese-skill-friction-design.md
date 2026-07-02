# Update Cantonese Skill Friction Reduction Design

## Goal

Reduce repeated tool failures and manual recovery during routine `update-cantonese-study-day` runs while preserving visual source verification, sentence completeness, and existing validation guarantees.

## Scope

Update the existing skill rather than the Cantonese study site. Add one deterministic FlipHTML5 page-bundling script and revise the workflow, failure handling, validation order, and reporting rules. Do not automate lesson transcription or Jyutping inference.

## Design

### Canonical page-image fallback

Keep the in-app browser as the first choice for the canonical FlipHTML5 source. If navigation, screenshot, or `pageAssets` times out once, stop reconnecting repeatedly. Run a bundled script that:

1. Fetches the canonical book's `javascript/config.js`.
2. Evaluates `htmlConfig.fliphtml5_pages`.
3. Selects the exact one-based requested page range.
4. Downloads the real hashed `files/large/*.webp` assets to a temporary directory.
5. Creates two-page spread images with `ffmpeg` when available; otherwise returns individual page paths.
6. Prints a machine-readable summary containing page numbers, source URLs, and local paths.

The script must reject invalid ranges, cap the number of pages per call, avoid guessed image paths, and never write into the study-site repository.

### Completeness before audio

Require two content passes:

1. Build a compact inventory in printed order covering lesson text, vocabulary, supplementary sentences, understanding examples, pronunciation material, grammar examples, cultural sayings, communicative examples, exercises, character recognition, and short-reading sentences.
2. After editing `data.js`, repeat a sentence-only sweep against every inspected page image.

Run syntax checks and `validate_day.js` without `--require-audio` after this sweep. Generate audio only after the data set is stable, preventing a second audio run caused by late-discovered sentences.

### Browser and localhost failure handling

Treat a localhost navigation timeout the same as `ERR_CONNECTION_REFUSED` when `curl` returns HTTP 200: classify the in-app browser as isolated and do not retry alternate ports, tabs, or repeated browser setup. Check for an existing Chrome/Chromium binary before terminal Playwright. If none exists, complete HTTP, source-navigation, syntax, data, audio, and retry audits and report interactive browser automation as unavailable.

### Simplified Chinese and inferred readings

Before audio generation, inspect newly visible traditional characters and extend `TRADITIONAL_TO_SIMPLIFIED` only where the character is not intentionally Cantonese-specific. Preserve Cantonese writing and Jyutping.

Track whether each reading is printed or inferred. The final report must distinguish:

- uncertain transcription;
- visually confirmed transcription with inferred pronunciation;
- fully printed transcription and pronunciation.

### Validation order

Use this order:

1. `node --check app.js`
2. `node --check data.js`
3. `validate_day.js` without required audio
4. sentence-only source sweep
5. `DAY=dayN node scripts/generate-sentence-audio.js`
6. `validate_day.js --require-audio`
7. `audit_retry.js`
8. local HTTP and navigation-source checks
9. interactive browser smoke test only when a supported browser is available

## Files

- Update `SKILL.md` with the fallback and revised workflow.
- Add `scripts/bundle_fliphtml_pages.js`.
- Update `agents/openai.yaml` only if its prompt becomes inconsistent with the revised skill.
- Do not add README, changelog, or duplicated instructions.

## Testing

- Run the bundler on a small known range and verify the reported hashed URLs and non-empty images.
- Verify invalid and oversized ranges fail clearly.
- Run the skill creator's `quick_validate.py` against the skill directory.
- Run `node --check` on every JavaScript script in the skill.
- Do not forward-test by adding another study day because that would modify live workspace content; the completed Day 16 run is the real-world evaluation artifact.

