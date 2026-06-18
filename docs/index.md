---
layout: home
title: Luca — Tool, Skill & Pipeline Manager
description: A minimalistic, decentralised tool, skill, and pipeline manager for macOS and Linux.

hero:
  name: "Luca"
  tagline: "A minimalistic, decentralised tool, skill, and pipeline manager for macOS and Linux."
  image:
    src: /images/luca-logo-alt.svg
    alt: Luca
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started/installation
    - theme: alt
      text: View on GitHub
      link: https://github.com/LucaTools/Luca

features:
  - icon: 🔧
    title: Tool Management
    details: Install version-pinned binaries from any URL — GitHub Releases, S3, or any HTTP endpoint. No registry, no PATH pollution.
  - icon: 🤖
    title: Skill Management
    details: Install agentic skills for 40+ AI coding agents including Claude Code, Cursor, and GitHub Copilot — from any Git repository.
  - icon: ▶️
    title: Pipeline Engine
    details: Define and run task pipelines in YAML with luca run. Parameters, conditional tasks, env files, and dry-run support built in.
  - icon: 🌐
    title: Decentralised
    details: Any URL serving a binary works. No formula to write, no registry to submit to, no approval to wait for.
  - icon: 📁
    title: Project Isolation
    details: Tool versions belong to projects, not machines. Each project gets its own .luca/tools/ symlinks.
  - icon: 🐧
    title: macOS & Linux
    details: Universal binary for macOS (arm64 + x86_64) and static binary for Linux. CI-ready with the setup-luca GitHub Action.
---

<div class="home-install">

## Install

```bash
curl -fsSL https://luca.tools/install.sh | bash
```

Pin a specific CLI version before installing:

```bash
echo "0.21.0" > .luca-version
curl -fsSL https://luca.tools/install.sh | bash
```

</div>

<div class="home-whats-new">

## What's New — Pipeline Engine

Since v0.19, Luca ships a built-in task runner. Define shell pipelines in YAML and run them with `luca run`. Full support for typed parameters, conditional task execution, `.env` files, per-task working directories, and `--dry-run` previews.

```yaml
# pipelines/ci.yml
parameters:
  - name: flavor
    default: debug

env:
  CI: "true"

tasks:
  - name: Generate project
    command: tuist generate
    working-directory: ios/

  - name: Run tests
    command: swift test --configuration ${flavor}

  - name: Upload artifact
    command: ./scripts/upload.sh
    when: ${flavor} == release
    continue-on-error: true
```

```bash
luca run ci --param flavor=release
```

[Explore the Pipeline Engine →](/pipelines/overview)

</div>
