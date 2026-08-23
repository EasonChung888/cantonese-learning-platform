# GitHub Publication Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the existing Cantonese learning site as a public GitHub repository with an English README and MIT License.

**Architecture:** Keep the application as its existing dependency-free static site. Add repository-level documentation and ignore rules without changing runtime code, validate with the existing Node.js audit, then create and verify the GitHub remote through GitHub CLI.

**Tech Stack:** HTML5, CSS, vanilla JavaScript, Node.js audit scripts, Git, GitHub CLI

## Global Constraints

- Repository name: `cantonese-learning-platform` unless that name is unavailable.
- Visibility: public.
- Remote name: `origin`.
- Published branch: `main`.
- README language: English.
- License: MIT, copyright 2026 eason.
- Do not publish `Cantonese-site-backup-2026-07-23.zip` or `resume-project.html`.
- Do not rewrite history or remove existing tracked archives.

---

### Task 1: Add Public Repository Metadata

**Files:**
- Modify: `.gitignore`
- Create: `README.md`
- Create: `LICENSE`

**Interfaces:**
- Consumes: the existing static entry point `index.html`, the audit script `scripts/audit-listening.js`, and the current `main` branch.
- Produces: public-facing setup documentation, an MIT grant, and ignore rules for the two local-only artifacts.

- [ ] **Step 1: Extend the local-artifact ignore rules**

Append these exact entries to `.gitignore`:

```gitignore

# Local publication artifacts
Cantonese-site-backup-2026-07-23.zip
resume-project.html
```

- [ ] **Step 2: Confirm the local artifacts are ignored**

Run:

```bash
git check-ignore -v Cantonese-site-backup-2026-07-23.zip resume-project.html
git status --short
```

Expected: both files resolve to the new `.gitignore` rules and neither appears in `git status --short`.

- [ ] **Step 3: Create the English README**

Create `README.md` with the following sections and verified claims:

````markdown
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
````

- [ ] **Step 4: Create the MIT License**

Create `LICENSE` using the standard MIT text, beginning with:

```text
MIT License

Copyright (c) 2026 eason
```

Include the complete permission grant and warranty disclaimer from the canonical MIT License.

- [ ] **Step 5: Review and validate the metadata changes**

Run:

```bash
git diff --check
git diff -- .gitignore README.md LICENSE
node scripts/audit-listening.js
find . -type f -size +99M -not -path './.git/*' -print
```

Expected: no whitespace errors, the diff matches the approved scope, the audit prints `Listening audit passed`, and no file is printed by the size check.

- [ ] **Step 6: Commit the repository metadata**

Run:

```bash
git add .gitignore README.md LICENSE docs/superpowers/plans/2026-08-23-github-publication.md
git diff --cached --check
git commit -m "Add public repository documentation"
```

Expected: one commit containing the ignore rules, English README, MIT License, and this implementation plan.

### Task 2: Create and Verify the Public GitHub Repository

**Files:**
- No files created or modified.

**Interfaces:**
- Consumes: a clean local `main` branch and an authenticated GitHub CLI session.
- Produces: a public GitHub repository, `origin`, and a pushed `origin/main` tracking branch.

- [ ] **Step 1: Recheck the publish preconditions**

Run:

```bash
git status --short --branch
git remote -v
gh auth status
gh repo view EasonChung888/cantonese-learning-platform --json name,visibility,defaultBranchRef 2>/dev/null
```

Expected: the tree is clean, no `origin` exists, GitHub CLI is authenticated as `EasonChung888`, and the final command reports that the intended repository does not exist. If the name is taken, choose `cantonese-study-platform` and use that name in the following steps.

- [ ] **Step 2: Create the public repository and push `main`**

Run from the project root:

```bash
gh repo create cantonese-learning-platform --public --source=. --remote=origin --push
```

Expected: GitHub creates the public repository, adds `origin`, pushes local `main`, and configures upstream tracking.

- [ ] **Step 3: Verify local and remote state**

Run:

```bash
git remote -v
git status --short --branch
git rev-parse HEAD
git rev-parse origin/main
gh repo view --json nameWithOwner,url,visibility,defaultBranchRef
```

Expected: `origin` points to the new repository, status reports `main...origin/main` with no changes, both revisions are identical, visibility is `PUBLIC`, and the default branch is `main`.
