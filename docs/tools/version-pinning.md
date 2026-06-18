---
title: Version Pinning
description: Pin tool versions per-project and pin the Luca CLI version itself.
---

# Version Pinning

## Pinning Tool Versions

Each tool entry in your Lucafile has a `version:` field. This is the version Luca installs and caches. Different projects can pin different versions of the same tool — they coexist at `~/.luca/tools/<name>/<version>/`.

```yaml
tools:
  - name: SwiftLint
    version: 0.61.0
    url: https://github.com/realm/SwiftLint/releases/download/0.61.0/SwiftLintBinary.artifactbundle.zip
    binaryPath: SwiftLintBinary.artifactbundle/swiftlint-0.61.0-macos/bin/swiftlint
```

Running `luca install` in a project always activates the version declared in that project's Lucafile, regardless of what other projects have installed.

## Pinning the Luca CLI Version

To pin the Luca CLI version for a project (useful for teams), create a `.luca-version` file:

```bash
echo "0.21.0" > .luca-version
```

The installer reads this file and installs the specified version instead of the latest. The git post-checkout hook also uses this file to determine whether to self-update Luca when switching branches.

## Viewing Installed Versions

All versions of all tools cached on the current machine:

```bash
luca installed
```

The version currently symlinked into the project:

```bash
luca linked
```
