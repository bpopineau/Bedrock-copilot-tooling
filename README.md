# Bedrock Copilot Tooling Factory

This repository is the **factory** for generating a Copilot-ready Minecraft Bedrock add-on tooling repository.

## Minimal viable loop

The default workflow is:

1. snapshot upstream docs
2. extract deterministic rules
3. generate product repo
4. run tests/validation
5. publish

## Repository boundaries

- Factory source lives in `packages/`, `schemas/`, `templates/`, and `docs/curated/`.
- Generated artifacts live in `outputs/` and must not be manually edited.
- Upstream source snapshots are tracked in `vendor/` with provenance in `docs/provenance/`.

## Current status

This scaffold includes initial Copilot control surfaces, starter skills, schemas, and placeholders for extractors/generators.
