---
title: Pipeline YAML Reference
description: Full reference for the pipeline YAML format.
---

# Pipeline YAML Reference

## Full Schema

```yaml
---
parameters:                          # Declared input parameters (optional)
  - name: flavor
    description: Build configuration
    default: debug
  - name: upload
    description: Whether to upload the artifact

env:                                 # Environment variables for all tasks (optional)
  CI: "true"
  DEVELOPER_DIR: /Applications/Xcode.app

working-directory: ios/              # Default working directory for all tasks (optional)

tasks:
  - name: Generate project           # Human-readable label (required)
    command: tuist generate          # Shell command to execute (required)
    tools:                           # Tools to validate before execution (optional)
      - tuist
    env:                             # Task-level env, merged on top of pipeline env (optional)
      TUIST_CONFIG_VERBOSE: "1"
    working-directory: ios/          # Overrides pipeline working-directory (optional)
    when: ${flavor} == release       # Condition — task skipped when false (optional)
    continue-on-error: true          # Non-zero exit is a warning, not a failure (optional)
```

## Pipeline-Level Fields

| Field | Type | Description |
|---|---|---|
| `tasks` | list | Required. Ordered list of tasks to execute. |
| `parameters` | list | Declared input parameters. See [Parameters](/pipelines/parameters). |
| `env` | map | Environment variables applied to every task. |
| `working-directory` | string | Default working directory. Relative paths resolve from the `luca run` invocation directory. |

## Task Fields

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. Label shown in terminal output. |
| `command` | string | Required. Shell command to execute. |
| `tools` | list | Tools to validate. Defaults to the first token of `command` when omitted. |
| `env` | map | Merged on top of pipeline `env` and the inherited process environment. |
| `working-directory` | string | Overrides pipeline `working-directory` for this task. |
| `when` | string | Condition expression. Task is skipped when false. See [Conditional Tasks](/pipelines/conditional-tasks). |
| `continue-on-error` | bool | When `true`, a non-zero exit code logs a warning and execution continues. |

## Annotated Real-World Example

```yaml
---
parameters:
  - name: flavor
    default: debug
  - name: upload
    description: Set to true to upload the build artifact
    default: "false"

env:
  CI: "true"

working-directory: ios/

tasks:
  - name: Install dependencies
    command: luca install --only-tools
    working-directory: .        # Override: run from repo root

  - name: Generate Xcode project
    command: tuist generate
    tools:
      - tuist

  - name: Build
    command: xcodebuild -scheme MyApp -configuration ${flavor} build

  - name: Run unit tests
    command: xcodebuild -scheme MyApp test
    when: ${flavor} == debug

  - name: Upload to TestFlight
    command: ./scripts/upload.sh
    when: ${upload} == true
    continue-on-error: true
```
