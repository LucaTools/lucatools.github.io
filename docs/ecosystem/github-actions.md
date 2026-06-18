---
title: GitHub Actions
description: Use Luca in CI with the setup-luca GitHub Action.
---

# GitHub Actions

The [setup-luca](https://github.com/LucaTools/setup-luca) action installs Luca and optionally runs `luca install` as part of your GitHub Actions workflow.

## Basic Usage

```yaml
- name: Setup Luca
  uses: LucaTools/setup-luca@v1
```

This installs the latest stable version of Luca on the runner.

## Pin a Specific Version

```yaml
- name: Setup Luca
  uses: LucaTools/setup-luca@v1
  with:
    version: "0.21.0"
```

## Install Tools Automatically

Use `install: true` to run `luca install` immediately after setup:

```yaml
- name: Setup Luca and install tools
  uses: LucaTools/setup-luca@v1
  with:
    install: true
```

## Full Workflow Example

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  build:
    runs-on: macos-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Luca
        uses: LucaTools/setup-luca@v1
        with:
          install: true

      - name: Generate project
        run: .luca/tools/tuist generate

      - name: Build
        run: .luca/tools/swiftlint lint --strict
```

## On the GitHub Marketplace

The action is available on the [GitHub Marketplace](https://github.com/marketplace/actions/setup-luca).
