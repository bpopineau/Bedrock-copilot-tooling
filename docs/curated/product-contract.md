# Product Repo Contract (v0)

## Required directories

The generator must produce a product repository containing the following paths (some may be created from templates and others may be generated during assembly):

- `.github/copilot-instructions.md`
- `.github/instructions/`
- `.github/skills/`
- `.github/agents/`
- `docs/bedrock/`
- `tools/bedrock-mcp/`
- `examples/gold/`
- `examples/broken/`

## Required gates

- validate -> repair (if needed) -> validate

## Version policy

- `docs/bedrock/version-policy.md` is human-readable source of truth.
- `docs/bedrock/version-matrix.json` is machine-readable source of truth.
