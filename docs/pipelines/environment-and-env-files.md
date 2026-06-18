---
title: Environment & .env Files
description: Set environment variables for pipeline tasks via YAML or dotenv files.
---

# Environment & .env Files

Luca provides three layers of environment configuration for pipeline tasks: the pipeline-level `env:` map, task-level `env:` maps, and dotenv files.

## Pipeline-Level env

Variables declared under the pipeline `env:` key are injected into every task:

```yaml
env:
  CI: "true"
  BUILD_DIR: .build/

tasks:
  - name: Build
    command: swift build   # CI and BUILD_DIR are available here
```

## Task-Level env

Variables under a task's `env:` key are merged on top of the pipeline-level env for that task only:

```yaml
env:
  SCHEME: MyApp

tasks:
  - name: Build debug
    command: xcodebuild build
    env:
      CONFIGURATION: Debug   # Overrides or extends pipeline env for this task

  - name: Build release
    command: xcodebuild build
    env:
      CONFIGURATION: Release
```

## Dotenv Files

Luca auto-detects a `.env` file in the directory where `luca run` is invoked:

```
# .env
API_KEY=secret
ENVIRONMENT=staging
```

All key-value pairs are injected into every task. Lines starting with `#` are comments. Surrounding single or double quotes on values are stripped.

Use `--env-file` to specify an explicit path instead of auto-detection:

```bash
luca run deploy --env-file .env.production
```

Specifying an explicit `--env-file` path that does not exist is an error. The auto-detected `.env` is silently skipped if it doesn't exist.

## Precedence Order

From lowest to highest priority:

1. Inherited process environment (the environment `luca` itself was started in)
2. `.env` file
3. Pipeline `env:` map
4. Task `env:` map

Higher-priority values override lower-priority ones for the same key.

## Example

```yaml
env:
  SCHEME: MyApp
  CONFIGURATION: Debug

tasks:
  - name: Build
    command: xcodebuild -scheme ${SCHEME} -configuration ${CONFIGURATION} build

  - name: Release build
    command: xcodebuild -scheme ${SCHEME} -configuration ${CONFIGURATION} build
    env:
      CONFIGURATION: Release   # Overrides pipeline CONFIGURATION only for this task
```
