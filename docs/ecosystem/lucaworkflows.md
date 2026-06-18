---
title: LucaWorkflows
description: Ready-made GitHub Actions workflow templates for publishing Luca-compatible releases.
---

# LucaWorkflows

[LucaWorkflows](https://github.com/LucaTools/LucaWorkflows) provides ready-to-use GitHub Actions workflow templates that build, package, and publish Luca-compatible releases from your project.

## Supported Languages

Workflow templates are available for:

- **Swift** — builds a universal macOS binary (arm64 + x86_64) and a static Linux binary, creates a GitHub Release with both archives
- **Go** — cross-compiles for macOS (arm64/x86_64) and Linux (amd64/arm64), publishes to GitHub Releases
- **Rust** — uses `cross` for cross-compilation, publishes macOS and Linux binaries
- **Python** — packages with PyInstaller into self-contained executables for macOS and Linux
- **C#** — publishes self-contained .NET executables for macOS and Linux
- **Zig** — cross-compiles and packages for macOS and Linux targets

## How It Works

Each template:

1. Builds your project for the target platforms
2. Packages the binary into a `.zip` archive named according to Luca's auto-detection convention (e.g. `Mytool-macOS.zip`, `Mytool-Linux.zip`)
3. Creates a GitHub Release and uploads the archives
4. Optionally computes and publishes SHA-256 checksums alongside the archives

Once your tool is published via one of these templates, any team can install it with a single Lucafile entry:

```yaml
tools:
  - name: MyTool
    version: 1.0.0
    url: https://github.com/myorg/mytool/releases/download/1.0.0/MyTool-macOS.zip
    binaryPath: mytool
    checksum: abc123...
    algorithm: sha256
```

## Getting Started

Copy the workflow template for your language from the [LucaWorkflows repository](https://github.com/LucaTools/LucaWorkflows) into your project's `.github/workflows/` directory and adjust the configuration variables at the top of the file.
