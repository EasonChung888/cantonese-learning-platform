# GitHub Publication Design

## Goal

Publish the existing Cantonese learning website as a public GitHub repository with an English README and an MIT License. The remote must be named `origin`, and the published branch must be `main`.

## Repository Identity

- Repository name: `cantonese-learning-platform`
- Visibility: public
- Default branch: `main`
- Remote name: `origin`
- GitHub owner: the account currently authenticated in GitHub CLI

## Published Scope

The repository will contain the existing static learning application, its audio assets, audit scripts, and project documentation. The following local-only artifacts will be excluded through `.gitignore`:

- `Cantonese-site-backup-2026-07-23.zip`, because it duplicates the working project and adds 32 MB of redundant data.
- `resume-project.html`, because it is a standalone portfolio page rather than part of the learning application.

Existing tracked archives will remain unchanged to avoid rewriting project history or broadening the task into repository cleanup.

## README

`README.md` will be written in English and will describe the project as a dependency-free, offline-capable Cantonese learning platform. It will cover:

- the 31-day lesson structure;
- pronunciation, vocabulary, sentence, quiz, and listening-practice features;
- spaced retry and persistent local progress;
- the vanilla HTML, CSS, and JavaScript architecture;
- local usage through a simple HTTP server;
- the existing Node.js audit command;
- the repository license.

The README will avoid claims that cannot be verified from the repository.

## License

The project will use the standard MIT License text with copyright year 2026 and the local Git author name, `eason`.

## Validation

Before publication:

1. Run the existing Node.js audit script.
2. Confirm that `README.md`, `LICENSE`, and `.gitignore` contain the intended content.
3. Confirm that the two excluded local artifacts are no longer reported by Git.
4. Confirm that no tracked file exceeds GitHub's 100 MB per-file limit.
5. Review the final commit and working-tree status.

After publication:

1. Confirm `origin` points to the new GitHub repository.
2. Confirm local `main` tracks `origin/main`.
3. Confirm the repository is public and its default branch is `main`.
4. Confirm the pushed commit matches local `HEAD`.

## Failure Handling

If the repository name is already taken under the authenticated account, choose a close English alternative and report it. If validation fails, do not publish until the failure is understood and corrected. If GitHub repository creation succeeds but push fails, preserve the configured remote, diagnose the push, and retry without rewriting history.
