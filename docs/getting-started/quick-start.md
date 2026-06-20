---
title: Quick Start
description: Get Luca set up in a new project in under five minutes.
---

# Quick Start

This guide creates a project that manages a binary tool, an agentic skill, and a task pipeline — using all three of Luca's capabilities in one place.

## 1. Scaffold a Lucafile

Inside your project directory, run:

```bash
luca init
```

This creates a starter `Lucafile` in the current directory.

## 2. Edit the Lucafile

Open the generated `Lucafile` and add a tool and a skill:

```yaml
---
tools:
  - name: SwiftLint
    binaryPath: SwiftLintBinary.artifactbundle/swiftlint-0.61.0-macos/bin/swiftlint
    version: 0.61.0
    url: https://github.com/realm/SwiftLint/releases/download/0.61.0/SwiftLintBinary.artifactbundle.zip

skills:
  - name: swift-testing-expert
    repository: AvdLee/Swift-Testing-Agent-Skill

agents:
  - claude-code
```

## 3. Install Tools and Skills

```bash
luca install
```

Luca downloads `SwiftLint` to `~/.luca/tools/SwiftLint/0.61.0/` and symlinks it into `.luca/tools/`. It also clones the skill repository and symlinks the skill into `.claude/skills/`.

Verify the tool is available:

```bash
which swiftlint
# $PWD/.luca/tools/swiftlint
swiftlint --version
# 0.61.0
```

## 4. Create a Pipeline

Create a `pipelines/` directory and add a pipeline file:

```bash
mkdir pipelines
```

Write the following to `pipelines/ci.yml`:

```yaml
---
parameters:
  - name: flavor
    description: Build configuration
    default: debug

tasks:
  - name: Lint
    command: swiftlint lint --strict

  - name: Build
    command: swift build --configuration ${flavor}

  - name: Test
    command: swift test
    when: ${flavor} == debug
```

## 5. Run the Pipeline

```bash
luca run ci
```

To run with a different flavor:

```bash
luca run ci --param flavor=release
```

Preview what will run without executing:

```bash
luca run ci --dry-run
```

## Next Steps

- [Installing Tools](/tools/installing-tools) — install tools directly from GitHub without a Lucafile
- [Pipeline Engine: Overview](/pipelines/overview) — full pipeline file lookup and execution details
- [Skill Management](/skills/installing-skills) — install skills for specific agents
