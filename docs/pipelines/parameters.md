---
title: Pipeline Parameters
description: Declare and use typed parameters in pipeline YAML files.
---

# Pipeline Parameters

Parameters let you write a single pipeline that behaves differently depending on inputs provided at runtime.

## Declaring Parameters

Add a `parameters:` block at the top of your pipeline file:

```yaml
parameters:
  - name: flavor
    description: Build configuration (debug or release)
    default: debug
  - name: upload
    description: Whether to upload the artifact after building
```

| Field | Description |
|---|---|
| `name` | Key used in `${name}` substitutions and `--param name=value`. |
| `description` | Optional. Shown in `--dry-run` output. |
| `default` | Optional. Value used when no `--param` is supplied. Omit to make the parameter required. |

## Using Parameters in Commands

Reference parameters with `${name}` inside any task `command:`:

```yaml
tasks:
  - name: Build
    command: swift build --configuration ${flavor}
  - name: Upload
    command: ./upload.sh --flavor ${flavor}
    when: ${upload} == true
```

## Providing Values at Runtime

Pass values on the command line:

```bash
luca run build --param flavor=release --param upload=true
```

Multiple `--param` flags are supported.

## Required vs Optional Parameters

- A parameter with a `default:` is optional — the default is used when no `--param` is supplied.
- A parameter without a `default:` is required — Luca exits with an error if no value is provided.

## Security

Parameters are passed to tasks via the process environment, not interpolated into shell text. This prevents shell injection attacks regardless of what value is supplied.

## Viewing Parameters in Dry Run

`--dry-run` shows each parameter with its resolved value and source:

```bash
luca run build --dry-run --param flavor=release
```

Example output:

```
[DRY RUN] Pipeline: build

Parameters:
  flavor = release (override)
  upload = false (default)
```

See [Dry Run](/pipelines/dry-run) for full output details.
