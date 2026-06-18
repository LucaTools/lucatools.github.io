---
title: "Lucafile: tools"
description: Full reference for the tools section of the Lucafile spec.
---

# Lucafile: tools

The `tools:` section of your Lucafile tells Luca which binary tools to install and where to find them.

## Scaffolding a Lucafile

Generate a starter Lucafile in the current directory:

```bash
luca init
```

## Full Schema

```yaml
---
tools:
  - name: ToolName              # Logical name used for installation and listing
    version: 1.2.3              # Version string (used for caching and display)
    url: https://...            # URL to a binary archive (.zip) or a raw executable
    binaryPath: path/to/bin    # Path inside the archive to the binary (omit for raw executables)
    desiredBinaryName: toolname # Override the binary name stored locally (raw executables only)
    checksum: e0a6540d...       # Hash of the asset for integrity verification (recommended)
    algorithm: sha256           # Hash algorithm: md5, sha1, sha256, or sha512
```

## Field Reference

| Field | Required | Description |
|---|---|---|
| `name` | Yes | Logical name. Used for `luca uninstall <name>`, `luca linked`, and caching. |
| `version` | Yes | Version string. Determines the cache path `~/.luca/tools/<name>/<version>/`. |
| `url` | Yes | Remote URL to a `.zip` archive or a raw executable. |
| `binaryPath` | If archive | Path to the binary inside the archive. Omit when `url` points to a raw executable. |
| `desiredBinaryName` | No | Override the local binary name. Only valid when `url` is a raw executable. |
| `checksum` | No | Hash of the downloaded asset. Strongly recommended — Luca warns when missing. |
| `algorithm` | No | Hash algorithm. Defaults to `sha256`. Options: `md5`, `sha1`, `sha256`, `sha512`. |

## Examples

**Tool distributed as a zip archive:**

```yaml
tools:
  - name: SwiftLint
    binaryPath: SwiftLintBinary.artifactbundle/swiftlint-0.61.0-macos/bin/swiftlint
    version: 0.61.0
    url: https://github.com/realm/SwiftLint/releases/download/0.61.0/SwiftLintBinary.artifactbundle.zip
    checksum: e0a6540d01434f43633...
    algorithm: sha256
```

**Raw executable (no archive):**

```yaml
tools:
  - name: FirebaseCLI
    version: 14.12.1
    url: https://github.com/firebase/firebase-tools/releases/download/v14.12.1/firebase-tools-macos
    desiredBinaryName: firebase
```

## Spec File Priority

Luca looks for a spec file in the current directory in this order:

1. `Lucafile`
2. `Lucafile.yml`
3. `Toolfile`
4. `Toolfile.yml`
5. `Skillfile`
6. `Skillfile.yml`

All names accept the same YAML structure. The alternative names are convenient when you keep tool and skill definitions in separate files.

## Installing Only Tools

Skip skills when running `luca install`:

```bash
luca install --only-tools
```
