---
title: LucaScripts
description: Shell hook, git post-checkout hook, and install/uninstall scripts.
---

# LucaScripts

[LucaScripts](https://github.com/LucaTools/LucaScripts) provides the supporting shell scripts that make Luca work seamlessly in your shell and git workflows.

## Shell Hook

The shell hook (`shell_hook.sh`) manages your PATH dynamically as you navigate directories. When you `cd` into a project that has a `.luca/tools/` directory, the hook automatically prepends it to `PATH`. When you `cd` out, it removes it.

The installer sources the hook from your `~/.zshrc` or `~/.bashrc`:

```sh
source ~/.luca/shell_hook.sh
```

This means tool binaries are available without any prefix after you enter a project directory:

```bash
cd my-project/
swiftlint --version   # works — .luca/tools/ is on PATH
cd ~
swiftlint --version   # command not found — removed from PATH
```

## Git Post-Checkout Hook

The post-checkout hook runs `luca install` automatically after `git checkout` or `git switch`. This keeps your project tools in sync when switching between branches that declare different tool versions.

The installer offers to install the hook into `.git/hooks/post-checkout` when you run it inside a git repository.

**Behaviour:**
- Skips file checkouts (only acts on branch checkouts)
- Checks whether the installed Luca version matches `.luca-version` (if present) and self-updates if needed
- In non-interactive terminals (e.g. GUI Git clients) where Luca is missing: logs a warning and skips
- In non-interactive terminals where Luca is present but the version is wrong: skips the self-update but still runs `luca install`

## install.sh

Downloads and installs the Luca binary, the shell hook, and optionally the git hook:

```bash
curl -fsSL https://luca.tools/install.sh | bash
```

## uninstall.sh

Removes the Luca binary, the shell hook, and the source line from your shell RC file:

```bash
curl -fsSL https://luca.tools/uninstall.sh | bash
```
