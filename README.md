# Cantonese Learning Platform

A dependency-free, offline-capable web app for structured Cantonese study. It organizes 31 days of Hong Kong–focused material into pronunciation, vocabulary, grammar, reading, quiz, and listening activities.

## Features

- 31 days of structured Cantonese lessons
- Cantonese text, Jyutping, and Mandarin explanations
- Multiple quiz modes for pronunciation, meaning, and reverse recall
- Daily listening practice with recorded sentence audio
- Retry scheduling that brings unfamiliar cards back after ordinary cards
- Persistent progress in `localStorage`, with JSON import and export
- Responsive, accessible interface built without a framework

## Run Locally

No build step or package installation is required. Serve the repository with any static HTTP server, for example:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Project Structure

- `index.html` — application markup and entry point
- `styles.css` — responsive visual system
- `app.js` — navigation, quizzes, state, and audio integration
- `listening-practice.js` — isolated listening-session and retry logic
- `data.js` — lesson and question content
- `audio/sentences/` — recorded Cantonese sentence audio
- `scripts/` — content-audit and audio-generation utilities

## Validation

Run the repository audit with Node.js:

```bash
node scripts/audit-listening.js
```

The audit checks lesson coverage, listening behavior, state cleanup, layout hooks, and sentence-audio completeness.

## Data and Progress

Study progress is stored in the browser through `localStorage`. The app also supports JSON export and import for moving progress between browsers or devices.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).
