---
title: Installation
description: Install Luca on macOS or Linux.
---

# Installation

## Stable Release

Install the latest version with a single command:

```bash
curl -fsSL https://luca.tools/install.sh | bash
```

The installer:
1. Detects your OS and architecture (macOS arm64/x86_64, Linux x86_64/arm64)
2. Downloads the appropriate Luca binary from GitHub Releases
3. Installs it to `/usr/local/bin/luca`
4. Installs the shell hook to `~/.luca/shell_hook.sh` and sources it from `~/.zshrc` or `~/.bashrc`
5. Optionally installs the git post-checkout hook if you're inside a git repository

## Pinning the CLI Version

Create a `.luca-version` file before running the installer to pin a specific version:

```bash
echo "0.21.0" > .luca-version
curl -fsSL https://luca.tools/install.sh | bash
```

The installer reads `.luca-version` from the current directory. This is useful for teams that need a consistent CLI version across machines.

## Building from Source

Requires Swift 5.7+ and macOS 13+ or Linux.

```bash
git clone https://github.com/LucaTools/Luca.git
cd Luca
swift build -c release
cp .build/release/luca /usr/local/bin/luca
```

On Linux, build a static binary that doesn't require the Swift runtime:

```bash
swift build -c release -Xswiftc -static-stdlib
```

## Verifying the Installation

```bash
luca --version
```

Expected output: the installed version number (e.g. `0.21.0`).

```bash
luca --help
```

Expected output: the list of available subcommands (`install`, `run`, `init`, `uninstall`, `installed`, `linked`, `unlink`, `update`, `agents`).

## Uninstalling

```bash
curl -fsSL https://luca.tools/uninstall.sh | bash
```

This removes the `luca` binary from `/usr/local/bin`, the shell hook from `~/.luca/`, and the source line from your shell RC file.
