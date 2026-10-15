# GitHub Pages Migration Implementation Plan

> Execution: direct implementation in this chat for this small hosting migration, as authorized by the user's persistent execution instructions.

**Goal:** Publish the existing Cantonese website on GitHub Free + GitHub Pages and remove its OpenAI deployment.

**Architecture:** Keep the current static application and relative asset URLs. GitHub Actions validates the content, prepares an allowlisted `dist/`, and deploys it to Pages from `main`. Retire the OpenAI deployment after verifying the replacement.

**Tech Stack:** HTML, CSS, JavaScript, Node.js, GitHub Actions, GitHub Pages.

## Global Constraints

- Preserve all lesson content, audio, appearance, and application behavior.
- Reuse the existing public repository `EasonChung888/cantonese-learning-platform`.
- Publish application files only; exclude backup archives and internal documents from the deployed site.
- Do not purchase hosting, upgrade the GitHub plan, or create a paid service.
- Browser progress is origin-specific; use the existing JSON export/import controls to migrate it.

### Task 1: Configure and publish Pages

**Files:** Create `.github/workflows/pages.yml` and `scripts/prepare-pages.mjs`; update `README.md` and `.gitignore`; retire `scripts/prepare-sites.mjs` and `.openai/hosting.json` after recording the old project identity.

- [ ] Add an allowlisted static packaging script based on the existing packager, including `.nojekyll`.
- [ ] Add a workflow triggered by pushes to `main` and manual dispatch, with `contents: read`, `pages: write`, and `id-token: write`; run `node scripts/audit-listening.js`, then `node scripts/prepare-pages.mjs`, and publish `dist/` with the official Pages actions.
- [ ] Run the same audit and packaging locally; compare packaged application and audio bytes with source, and ensure no backups or internal files are packaged.
- [ ] Enable Pages with `build_type: workflow` using the repository Pages API, push the configuration, and verify the deployment succeeds.
- [ ] Check the public HTML, scripts, styles, images, and representative audio over HTTPS, then check the rendered application and lesson navigation.

### Task 2: Retire the OpenAI deployment

**Old project identity:** `appgprj_6ac8b1610d848191806bfb4e1c99a6f4` (from the original hosting manifest).

- [ ] Inspect the old site's returned identity and live URL using Sites tools or its management UI.
- [ ] Preserve available old-origin progress via the app's JSON export before taking the old site offline.
- [ ] Use a supported unpublish or deployment removal operation. If the only option permanently deletes stored project data, obtain action-time confirmation required by the computer-use policy before that action.
- [ ] Confirm the old deployment is inactive; record any concrete access or platform limitation without representing a local manifest removal as remote deletion.
- [ ] Record final deployment URL, commit, validation, and retirement status in this file.
