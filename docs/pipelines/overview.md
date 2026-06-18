---
title: Pipeline Engine Overview
description: Run YAML-defined task pipelines with luca run.
---

# Pipeline Engine Overview

The `luca run` command executes an ordered list of shell tasks defined in a YAML file. It's the simplest way to define repeatable, parameterised workflows without reaching for a full CI system or shell scripts.

## Basic Usage

```bash
luca run <name>
luca run --file path/to/pipeline.yml
```

## File Lookup Convention

When you run `luca run ci`, Luca searches for the pipeline file in this order:

1. `./ci.yml`
2. `./ci`
3. `./pipelines/ci.yml`
4. `./pipelines/ci`

Use `--file` to skip the lookup and specify an explicit path:

```bash
luca run --file pipelines/release.yml
```

## Minimal Example

`pipelines/build.yml`:

```yaml
---
tasks:
  - name: Build
    command: swift build

  - name: Test
    command: swift test
```

Run it:

```bash
luca run build
```

Luca prints each task name before executing it and exits non-zero if any task fails.

## What Pipelines Support

| Feature | Description |
|---|---|
| Parameters | Declare typed inputs, reference them with `${name}` |
| Conditions | Skip tasks with `when:` expressions |
| Env variables | Pipeline-level and task-level `env:` maps |
| `.env` files | Auto-detected or explicit dotenv files |
| Working directories | Per-pipeline and per-task `working-directory:` |
| Error tolerance | `continue-on-error: true` on individual tasks |
| Tool validation | `tools:` field lists required binaries; `--dry-run` checks availability |
| Dry run | `--dry-run` previews everything without executing |
| Params files | Convention-based or explicit YAML files for parameter values |
