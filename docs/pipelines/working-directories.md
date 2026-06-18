---
title: Working Directories
description: Control the working directory for pipeline tasks.
---

# Working Directories

By default, tasks run in the directory where `luca run` was invoked. You can override this at the pipeline level, the task level, or both.

## Pipeline-Level Working Directory

Sets the default working directory for all tasks in the pipeline:

```yaml
working-directory: ios/

tasks:
  - name: Generate
    command: tuist generate   # Runs in ios/

  - name: Build
    command: xcodebuild build  # Also runs in ios/
```

## Task-Level Working Directory

Overrides the pipeline-level setting for a single task:

```yaml
working-directory: ios/

tasks:
  - name: Install tools
    command: luca install
    working-directory: .   # Runs in the invocation directory, not ios/

  - name: Generate
    command: tuist generate  # Runs in ios/
```

## Relative Path Resolution

All relative paths are resolved against the directory where `luca run` was invoked — not against the pipeline file's location.

Given a project layout:

```
my-project/
├── pipelines/
│   └── ci.yml        # working-directory: ios/
├── ios/
└── backend/
```

Running `luca run ci` from `my-project/` resolves `ios/` to `my-project/ios/`.

## Absolute Paths

Absolute paths are also accepted:

```yaml
working-directory: /tmp/build
```
