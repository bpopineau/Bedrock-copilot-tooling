# Bedrock Add-On Tooling

[![Status](https://img.shields.io/badge/status-planned-blue)](#roadmap)
[![Architecture](https://img.shields.io/badge/architecture-copilot%20%2B%20mcp%20%2B%20validation-success)](#architecture)
[![Workflow](https://img.shields.io/badge/workflow-spec%20%E2%86%92%20plan%20%E2%86%92%20generate%20%E2%86%92%20validate%20%E2%86%92%20repair-orange)](#workflow)
[![License](https://img.shields.io/badge/license-TBD-lightgrey)](#license)

A **Copilot-centered, documentation-distilled, skills-enabled, MCP-powered** tooling system for creating **Minecraft Bedrock add-ons** with stronger reliability, explicit version targeting, deterministic validation, and repair-first workflows.

---

## Table of Contents

- [Why this project exists](#why-this-project-exists)
- [Project goals](#project-goals)
- [Core idea](#core-idea)
- [Architecture](#architecture)
- [Workflow](#workflow)
- [Repository layout](#repository-layout)
- [Quick start](#quick-start)
- [Documentation strategy](#documentation-strategy)
- [Skills strategy](#skills-strategy)
- [Agent model](#agent-model)
- [MCP toolset](#mcp-toolset)
- [Validation and repair](#validation-and-repair)
- [Implementation checklist](#implementation-checklist)
- [Roadmap](#roadmap)
- [Fine-tuning policy](#fine-tuning-policy)
- [Success criteria](#success-criteria)
- [License](#license)

---

## Why this project exists

Minecraft Bedrock add-on development is not just about generating a single valid JSON file.

A usable add-on usually requires:

- correct pack structure
- valid manifests
- consistent namespaces and identifiers
- correct cross-file references
- version-aware generation
- scripting conventions
- validation and repair loops
- packaging into a final deliverable

Prompting alone is good for prototypes, but not reliable enough for a repeatable engineering workflow.

This project exists to build a **compiler-like Bedrock add-on pipeline** instead of a one-shot prompt workflow.

---

## Project goals

### Primary goals

- Convert feature requests into **structured implementation specs**
- Generate **coherent Bedrock pack files**
- Keep identifiers, references, and layout consistent
- Make version targeting explicit
- Validate before declaring work complete
- Repair failures with minimal targeted changes
- Package only after passing required gates

### Non-goals

This project is **not**:

- a generic Bedrock doc chatbot
- a giant prompt stuffed with official documentation
- a single âmagic promptâ generator
- a many-model orchestration platform on day one
- a fine-tuning-first experiment

---

## Core idea

The core design principle is:

> **Frontier intelligence + local deterministic tooling**

This project uses a strong coding model for reasoning, then surrounds it with Bedrock-specific control, validation, repair, and packaging infrastructure.

Not:

> âHope the model remembers Bedrock correctly.â

And not:

> âFine-tune our way out of missing tooling.â

---

## Architecture

The system is organized into five layers.

### 1. Intelligence layer

Use Copilot / GPT-class reasoning for:

- intent interpretation
- multi-file planning
- add-on design decisions
- JSON / TypeScript generation
- nontrivial repair reasoning

### 2. Control layer

Use repo-native AI controls for consistency:

- `.github/copilot-instructions.md`
- path-specific instruction files
- reusable prompt files
- task-specific Copilot skills
- a custom Bedrock agent profile

Skills provide reusable Bedrock workflows that can bundle instructions, examples, templates, and helper scripts for specialized tasks.

### 3. Deterministic Bedrock layer

Use MCP tools for:

- version policy lookup
- manifest rule lookup
- file recipe lookup
- script rule lookup
- pack validation
- validation report parsing
- repair scaffolding
- packaging

### 4. Knowledge layer

Distill Bedrock docs into project-native assets:

- version policy
- version matrix
- file recipes
- migration notes
- gold examples
- curated vanilla examples

### 5. Quality gate layer

Every meaningful task flows through:

1. spec
2. plan
3. generate
4. validate
5. repair
6. revalidate
7. package

Nothing is âdoneâ until validation passes.

---

## Workflow

### 1. Spec

Translate a request into a strict internal spec.

The spec captures:

- requested feature
- target pack type
- target version policy
- required artifact families
- namespaces and identifiers
- assumptions
- acceptance criteria

### 2. Pack plan

Turn the spec into a Bedrock pack plan.

This includes:

- behavior pack vs behavior + resource pack
- manifest/module design
- folder layout
- script requirements
- dependencies
- asset requirements

### 3. Artifact generation

Generate only the artifacts required for the plan, such as:

- `manifest.json`
- items
- blocks
- entities
- loot tables
- animations
- controllers
- textures and metadata
- script entrypoints
- TypeScript logic

### 4. Validation

Run deterministic checks against the generated project.

### 5. Repair

If validation fails, repair using the **smallest safe change set**.

### 6. Packaging

Only package validated outputs.

---

## Repository layout

```text
.github/
  copilot-instructions.md
  instructions/
    manifest.instructions.md
    items.instructions.md
    blocks.instructions.md
    entities.instructions.md
    scripts.instructions.md
  prompts/
    create-item.prompt.md
    create-block.prompt.md
    repair-pack.prompt.md
    upgrade-version.prompt.md
  skills/
    create-bedrock-item/
      SKILL.md
      examples/
      templates/
      scripts/
    create-bedrock-block/
      SKILL.md
      examples/
      templates/
      scripts/
    repair-bedrock-pack/
      SKILL.md
      examples/
      scripts/
    upgrade-bedrock-version/
      SKILL.md
      migration-rules/
      scripts/
    package-bedrock-addon/
      SKILL.md
      scripts/
  agents/
    bedrock-addon-engineer.agent.md

docs/
  bedrock/
    version-policy.md
    version-matrix.json
    file-recipes/
      manifest.md
      items.md
      blocks.md
      entities.md
      scripts.md
      packaging.md
    migration-notes/

examples/
  gold/
  vanilla/

tools/
  bedrock-mcp/
    server/
    rules/
    validators/
    packaging/

behavior_packs/
resource_packs/
scripts/
```

---

## What goes in each area

### `.github/prompts/`

Focused one-time workflow prompts for scoped tasks.

### `.github/skills/`

Reusable Bedrock workflow capabilities.

Each skill should contain a `SKILL.md` file plus any optional supporting assets needed to perform the task well, such as:

- examples
- templates
- helper scripts
- migration references
- validation notes

Recommended starter skills:

- `create-bedrock-item`
- `create-bedrock-block`
- `repair-bedrock-pack`
- `upgrade-bedrock-version`
- `package-bedrock-addon`

---

## Quick start

### 1. Create the repo foundation

Create these first:

- `.github/copilot-instructions.md`
- `docs/bedrock/version-policy.md`
- `docs/bedrock/version-matrix.json`
- `.github/agents/bedrock-addon-engineer.agent.md`

### 2. Add Bedrock knowledge assets

Populate:

- `docs/bedrock/file-recipes/`
- `docs/bedrock/migration-notes/`
- `examples/gold/`
- `examples/vanilla/`

### 3. Add AI control surfaces

Create:

- path-specific instruction files
- reusable prompt files
- the Bedrock agent profile

### 4. Add initial Copilot skills

Create the first Bedrock skills:

- `.github/skills/create-bedrock-item/SKILL.md`
- `.github/skills/create-bedrock-block/SKILL.md`
- `.github/skills/repair-bedrock-pack/SKILL.md`
- `.github/skills/upgrade-bedrock-version/SKILL.md`
- `.github/skills/package-bedrock-addon/SKILL.md`

### 5. Build the first MCP tools

Start with:

- version policy lookup
- file recipe lookup
- validation
- validation report parsing

### 6. Wire the workflow

Implement the pipeline:

`spec -> plan -> generate -> validate -> repair -> revalidate -> package`

---

## Documentation strategy

Do **not** treat Bedrock documentation as a giant blob to paste into prompts.

Instead, convert it into a small set of curated engineering assets.

### Required outputs

#### `docs/bedrock/version-policy.md`

Defines the repoâs official targeting policy.

This should answer questions like:

- What Bedrock version policy do we follow?
- When are preview-only features allowed?
- How are migrations handled?
- What is the default script target policy?

#### `docs/bedrock/version-matrix.json`

Maps artifact families to the correct version expectations.

Examples:

- manifests
- items
- blocks
- entities
- animations
- controllers
- scripts
- pack metadata

#### `docs/bedrock/file-recipes/`

Short operational guides for each artifact family.

Each file recipe should include:

- purpose
- required location
- required fields
- optional fields
- common mistakes
- minimal valid example
- cross-file dependencies

#### `docs/bedrock/migration-notes/`

Tracks generation-relevant behavior changes.

#### `examples/gold/`

Small trusted canonical examples that reflect preferred patterns.

#### `examples/vanilla/`

Curated official-style examples used for grounding.

---

## Skills strategy

This project uses **Copilot skills** for repeatable, Bedrock-specific workflows.

Skills are the right place for tasks that need more than a one-off prompt, such as:

- creating a custom item
- creating a custom block
- repairing a broken pack
- upgrading a pack to the current version policy
- packaging a validated add-on

In this repository:

- **Custom instructions** define always-on Bedrock rules and standards
- **Prompt files** handle focused one-time workflows
- **Skills** package reusable Bedrock capabilities with instructions, examples, templates, and scripts
- **MCP tools** provide deterministic live actions such as validation, lookup, repair support, and packaging

Each skill should live in its own directory and include a `SKILL.md` file. Supporting resources such as examples, templates, markdown references, and scripts should live alongside it.

> Skills are used for repeatable Bedrock workflows. Repository-wide and path-specific instructions remain the always-on rules. Prompt files remain useful for focused one-time tasks.

If you use skills in this repo, verify support in your editor and Copilot surface first, since skills availability can vary by environment and feature set.

---

## Agent model

This project uses **role-based orchestration**, but not many separately trained models at the start.

### Spec Agent

Responsible for:

- interpreting requests
- creating internal implementation specs
- defining assumptions and acceptance criteria

### Pack Planner Agent

Responsible for:

- deciding pack topology
- planning manifests, dependencies, and file layout
- selecting required artifact families

### Artifact Generator Agent

Responsible for:

- generating JSON and TypeScript artifacts
- following version policy
- preserving naming and identifier consistency

### Validator Agent

Responsible for:

- running deterministic checks
- surfacing precise failures
- blocking completion until gates pass

### Repair Agent

Responsible for:

- applying minimal targeted fixes
- using validator output as the primary guide
- avoiding unrelated rewrites

### Packager Agent

Responsible for:

- assembling final outputs
- packaging only after validation succeeds

> These are workflow roles first.  
> They do not need to be separate models on day one.

---

## MCP toolset

The initial Bedrock MCP toolset should include the following.

### `bedrock_resolve_version_policy`

Returns the active repo policy for version targeting.

### `bedrock_lookup_manifest_rules`

Returns manifest requirements for the selected pack type and target policy.

### `bedrock_lookup_file_recipe`

Returns the structured recipe for an artifact family.

Examples:

- item
- block
- entity
- loot table
- animation
- controller

### `bedrock_lookup_script_rules`

Returns current scripting guidance relevant to the active target.

### `bedrock_validate_pack`

Runs project validation.

### `bedrock_parse_validation_report`

Converts raw validator output into structured repair input.

### `bedrock_repair_from_errors`

Takes files plus errors and proposes or applies minimal fixes.

### `bedrock_package_project`

Packages a validated project into its final output format.

---

## Validation and repair

### Validation policy

Validation is mandatory.

Every meaningful generation task should end in one of two states:

- **valid**
- **invalid with a precise failure report**

Never stop at âthe files were generated.â

### Completion criteria

A task is complete only when:

- required files exist
- pack structure is coherent
- identifiers are consistent
- validation passes
- script/build checks pass when applicable
- the output is ready for packaging

### Repair policy

Repair should be:

- minimal
- scoped
- explainable
- followed immediately by revalidation

Avoid broad rewrites when only a targeted fix is needed.

---

## Implementation checklist

### Phase 1 â Foundation

- [ ] Create `docs/bedrock/version-policy.md`
- [ ] Create `docs/bedrock/version-matrix.json`
- [ ] Create `docs/bedrock/file-recipes/manifest.md`
- [ ] Create `docs/bedrock/file-recipes/items.md`
- [ ] Create `docs/bedrock/file-recipes/blocks.md`
- [ ] Create `docs/bedrock/file-recipes/entities.md`
- [ ] Create `docs/bedrock/file-recipes/scripts.md`
- [ ] Add initial `docs/bedrock/migration-notes/`
- [ ] Add `examples/gold/`
- [ ] Add `examples/vanilla/`

### Phase 2 â Copilot control

- [ ] Create `.github/copilot-instructions.md`
- [ ] Create `.github/instructions/manifest.instructions.md`
- [ ] Create `.github/instructions/items.instructions.md`
- [ ] Create `.github/instructions/blocks.instructions.md`
- [ ] Create `.github/instructions/entities.instructions.md`
- [ ] Create `.github/instructions/scripts.instructions.md`
- [ ] Create `.github/prompts/create-item.prompt.md`
- [ ] Create `.github/prompts/create-block.prompt.md`
- [ ] Create `.github/prompts/repair-pack.prompt.md`
- [ ] Create `.github/prompts/upgrade-version.prompt.md`
- [ ] Create `.github/skills/create-bedrock-item/SKILL.md`
- [ ] Create `.github/skills/create-bedrock-block/SKILL.md`
- [ ] Create `.github/skills/repair-bedrock-pack/SKILL.md`
- [ ] Create `.github/skills/upgrade-bedrock-version/SKILL.md`
- [ ] Create `.github/skills/package-bedrock-addon/SKILL.md`
- [ ] Create `.github/agents/bedrock-addon-engineer.agent.md`

### Phase 3 â MCP tools

- [ ] Implement `bedrock_resolve_version_policy`
- [ ] Implement `bedrock_lookup_manifest_rules`
- [ ] Implement `bedrock_lookup_file_recipe`
- [ ] Implement `bedrock_lookup_script_rules`
- [ ] Implement `bedrock_validate_pack`
- [ ] Implement `bedrock_parse_validation_report`
- [ ] Implement `bedrock_repair_from_errors`
- [ ] Implement `bedrock_package_project`

### Phase 4 â Orchestration

- [ ] Implement spec stage
- [ ] Implement planning stage
- [ ] Implement generation stage
- [ ] Implement validation stage
- [ ] Implement repair stage
- [ ] Implement revalidation stage
- [ ] Implement packaging stage

### Phase 5 â Evaluation

- [ ] Track validator pass rate
- [ ] Track failure classes
- [ ] Track repair success rate
- [ ] Track time-to-valid-output
- [ ] Track manual correction rate

### Phase 6 â Optional specialization

- [ ] Evaluate whether prompt + tools are sufficient
- [ ] Add task routing if justified
- [ ] Consider local adapters for strict JSON generation
- [ ] Consider local adapters for repair workflows

---

## Roadmap

### Milestone 1
Repo foundation and documentation distillation

### Milestone 2
Copilot control surfaces and Bedrock agent profile

### Milestone 3
Initial MCP lookup and validation tools

### Milestone 4
End-to-end generate/validate/repair workflow

### Milestone 5
Metrics, evals, and stabilization

### Milestone 6
Optional local specialization

---

## Fine-tuning policy

Fine-tuning is explicitly **deferred**.

This project will only revisit local model specialization after all of the following exist:

- a working Bedrock tooling pipeline
- repeatable validation
- a real failure corpus
- measurable evidence that prompting + tools is insufficient

### Likely first specialization targets

If local training is added later, the best early candidates are:

1. strict structured JSON generation
2. repair from validator or runtime failures

Not a broad all-purpose Bedrock add-on model.

---

## Success criteria

The project is succeeding when it can reliably do the following:

### Functional success

- generate coherent Bedrock pack structures
- produce correct artifact families for common tasks
- maintain identifier consistency across files
- repair common failures automatically

### Operational success

- require limited manual correction
- make version behavior explicit
- support incremental work inside the repo
- keep outputs repeatable

### Quality success

- high validator pass rate
- consistent packaging success
- clear surfacing of script/build issues
- strong repair performance from failure reports

---

## License

TBD.

---

## Final statement

This repository is a **Bedrock add-on compiler/copilot system**, not a prompt experiment.

The baseline architecture is:

> **Copilot-centered, documentation-distilled, skills-enabled, MCP-powered, validator-backed, repair-gated Bedrock add-on tooling**
