---
title: Installing Tools
description: Install binary tools directly from GitHub or via a Lucafile.
---

# Installing Tools

## Direct Install from GitHub

Install a tool directly from a GitHub release without a Lucafile:

```bash
luca install TogglesPlatform/ToggleGen@1.0.0
```

Luca constructs the release URL, auto-detects your platform (macOS/Linux, arm64/x86_64), downloads the binary, and symlinks it into `.luca/tools/` in the current directory.

If the release has multiple assets and Luca can't determine the right one automatically, specify it explicitly:

```bash
luca install krzysztofzablocki/sourcery@2.2.7 --asset sourcery-2.2.7.zip
```

## Install from a Lucafile

With a `Lucafile` in your project, `luca install` handles everything:

```bash
luca install
```

See [Lucafile: tools](/tools/lucafile-tools) for the full spec format.

## Listing Installed Tools

List all tool versions cached on the machine:

```bash
luca installed
```

Example output:

```
FirebaseCLI:
  - 14.12.1
SwiftLint:
  - 0.53.0
  - 0.62.0
tuist:
  - 4.78.0
```

## Listing Linked Tools

List the tools symlinked into the current project:

```bash
luca linked
```

Example output:

```
SwiftLint:
  version: 0.62.0
  binary: swiftlint
  location: /Users/you/.luca/tools/SwiftLint/0.62.0/bin/swiftlint
tuist:
  version: 4.78.0
  binary: tuist
  location: /Users/you/.luca/tools/tuist/4.78.0/tuist
```

## Unlinking a Tool

Remove a tool's symlink from the current project without uninstalling it:

```bash
luca unlink swiftlint
```

## Uninstalling a Tool

Uninstall a specific version of a tool from the machine:

```bash
luca uninstall SwiftLint@0.62.0
```

Omit the version to be prompted to select one:

```bash
luca uninstall SwiftLint
```
