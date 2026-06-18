---
title: Conditional Tasks
description: Skip tasks at runtime using when expressions.
---

# Conditional Tasks

The `when:` field on a task lets you skip it based on parameter values or environment variables.

## Syntax

Three expression forms are supported:

| Form | Example | Meaning |
|---|---|---|
| Equality | `${flavor} == release` | Run if `flavor` equals `release` |
| Inequality | `${env} != production` | Run if `env` does not equal `production` |
| Truthy | `${upload}` | Run if `upload` is non-empty and not `false` or `0` |

## Example

```yaml
parameters:
  - name: flavor
    default: debug
  - name: upload
    default: "false"

tasks:
  - name: Run tests
    command: swift test
    when: ${flavor} == debug

  - name: Upload artifact
    command: ./scripts/upload.sh
    when: ${upload} == true

  - name: Always runs
    command: echo "done"
```

Running with `--param flavor=release --param upload=false`:
- `Run tests` — skipped (`release != debug`)
- `Upload artifact` — skipped (`false != true`)
- `Always runs` — executed

## Conditions with Environment Variables

`when:` expressions can reference environment variables as well as parameters. Variables are resolved from the merged context: `.env` file → pipeline `env:` → task `env:` → parameters.

```yaml
env:
  ENVIRONMENT: staging

tasks:
  - name: Smoke test
    command: ./smoke-test.sh
    when: ${ENVIRONMENT} == staging
```

## Dry Run Shows Outcomes

`--dry-run` evaluates conditions and shows whether each task would run or be skipped:

```
Task 1: Run tests
  Command: swift test
  When:    ${flavor} == debug → skip

Task 2: Upload artifact
  Command: ./scripts/upload.sh
  When:    ${upload} == true → skip

Task 3: Always runs
  Command: echo "done"
```
