# Factory Repo Copilot Instructions

You are working in the **factory** repository.

## Non-negotiable rules

- Never manually edit files under `outputs/`.
- Make source changes under `packages/`, `schemas/`, `templates/`, and `docs/curated/`.
- If extraction inputs or logic changes, update `docs/provenance/source-index.json`.
- Keep outputs deterministic (avoid timestamps unless explicitly required).
- Run tests/checks before declaring completion.
