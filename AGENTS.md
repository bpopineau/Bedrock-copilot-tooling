# AGENTS.md

This file provides guidance for coding agents working in this repository.

## Repository purpose
Bedrock Copilot Tooling contains scripts, schemas, templates, and docs used to assemble and curate product metadata.

## Working norms
- Prefer minimal, focused changes over broad refactors.
- Keep behavior deterministic and avoid introducing hidden side effects.
- Preserve existing file structure and naming unless a task explicitly requires changes.
- Do not add new dependencies unless necessary and justified.

## Coding conventions
- Match the style already used in each package or directory.
- Keep functions small and composable.
- Add or update inline comments only when they materially clarify non-obvious logic.

## Validation expectations
When changing code, run the most relevant checks available (for example project tests or lint/type checks) and include the exact commands in your handoff.

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
