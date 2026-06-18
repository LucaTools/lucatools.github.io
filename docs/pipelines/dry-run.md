---
title: Dry Run
description: Preview pipeline execution without running any commands.
---

# Dry Run

The `--dry-run` flag validates the pipeline and prints a full execution preview without running any tasks.

## Usage

```bash
luca run ci --dry-run
luca run ci --dry-run --param flavor=release
luca run --file pipelines/deploy.yml --dry-run
```

## What Dry Run Shows

Given this pipeline (`pipelines/ci.yml`):

```yaml
parameters:
  - name: flavor
    default: debug
  - name: upload
    default: "false"

tasks:
  - name: Build
    command: swift build --configuration ${flavor}
    tools:
      - swift

  - name: Upload
    command: ./upload.sh
    when: ${upload} == true
    continue-on-error: true
```

Running `luca run ci --dry-run --param flavor=release`:

```
[DRY RUN] Pipeline: ci

Parameters:
  flavor = release (override)
  upload = false (default)

Task 1: Build
  Command: swift build --configuration ${flavor}
  Tools:   swift ✓

Task 2: Upload
  Command: ./upload.sh
  Tools:   ./upload.sh ✓
  When:    ${upload} == true → skip
  Flags:   continue-on-error

No tasks executed.
```

## Output Details

- **Parameters** — each declared parameter shows its resolved value and source:
  - `(override)` — supplied via `--param`
  - `(file)` — loaded from a params file
  - `(default)` — using the declared default
- **Tools** — each task shows tool availability with ✓ or ✗
- **When** — condition expressions are evaluated and the outcome (`run` or `skip`) is shown
- **Flags** — `continue-on-error` is listed when set
- **Env file** — if a `.env` file is loaded, its path and keys are shown before the task list
- **No tasks executed** — always printed at the end to confirm nothing ran

## Tool Availability Check

Dry run validates that the tools referenced by each task exist on `PATH` (or `.luca/tools/`). A ✗ next to a tool name means that tool is not available — the full run would fail for that task.
