# AGENTS.md

This file provides guidance for coding agents working in this repository.

## Repository purpose
Bedrock Copilot Tooling contains scripts, schemas, templates, and docs used to assemble and curate product metadata.

## Working norms
- Prefer minimal, focused changes over broad refactors.
- Keep behavior deterministic and avoid introducing hidden side effects.
- Preserve existing file structure and naming unless a task explicitly requires changes.
- Do not add new dependencies unless necessary and justified.

## Factory boundaries
- Never manually edit files under `outputs/`.
- Make source edits under `packages/`, `schemas/`, `templates/`, and `docs/curated/`.
- When extraction inputs or logic change, update `docs/provenance/source-index.json`.
- Keep generated outputs deterministic (avoid timestamps or other non-deterministic data unless explicitly required).
- Before handing off work, run the most relevant tests/checks available and record the commands you used.

## Coding conventions
- Match the style already used in each package or directory.
- Keep functions small and composable.
- Add or update inline comments only when they materially clarify non-obvious logic.

## Validation expectations
When changing code, validate it using the repository’s minimal viable loop (see the main README/OVERVIEW for the canonical description of the snapshot → extract → generate → test/validation workflow and product contract).
- Prefer running the full loop for the area you’re touching (snapshot → extract → generate → test/validation), including any golden comparison steps.
- Run project-specific tests, linters, and/or type checks that are relevant to your change.
- Verify that product contract expectations still hold (for example, schemas, templates, and curated outputs remain consistent with documented contracts).
- In your handoff, list exactly which commands you ran to validate the change.

## Documentation expectations
- Update docs when changing behavior, public interfaces, schemas, or templates.
- Keep README/OVERVIEW-level guidance high level; place detailed implementation notes close to the code.

## Commit/PR expectations
- Use clear, descriptive commit messages.
- In PR descriptions, include:
  - what changed,
  - why it changed,
  - how it was validated,
  - any follow-up work or known limitations.

## Scope and precedence
- More deeply nested `AGENTS.md` files may define directory-specific rules.
- Direct user/developer/system instructions always take precedence.
