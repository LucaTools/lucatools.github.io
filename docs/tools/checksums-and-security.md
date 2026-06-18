---
title: Checksums & Security
description: How Luca verifies tool integrity and hardens archive extraction.
---

# Checksums & Security

## Why Checksums Matter

When you install a tool by URL, you're trusting the server to deliver the binary you expect. Checksums let you verify the download matches a known good hash — protecting against corrupted downloads, MITM attacks, and supply chain tampering.

## Adding a Checksum to Your Lucafile

```yaml
tools:
  - name: Tuist
    binaryPath: tuist
    version: 4.80.0
    url: https://github.com/tuist/tuist/releases/download/4.80.0/tuist.zip
    checksum: 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822...
    algorithm: sha256
```

Supported algorithms: `md5`, `sha1`, `sha256`, `sha512`.

You can compute a checksum with:

```bash
luca calculate-checksum --url https://github.com/tuist/tuist/releases/download/4.80.0/tuist.zip --algorithm sha256
```

## Security Warnings

Luca emits warnings when security best practices aren't met:

- **Missing checksum** — Luca warns when a tool is installed without a `checksum` field. The install still proceeds, but the warning signals that integrity is unverified.
- **Weak algorithm** — Luca warns when `md5` or `sha1` is used. These algorithms are cryptographically broken. Use `sha256` or `sha512`.

## Archive Security

Luca validates archive contents before extracting:

- **Absolute paths rejected** — Archive entries with absolute paths (e.g. `/etc/passwd`) are rejected.
- **Path traversal rejected** — Entries that would write outside the extraction directory (e.g. `../../evil`) are rejected.
- **Symlinks in archives rejected** — Archive entries that are symlinks are rejected.

If a trusted archive contains entries that would otherwise be rejected (rare), you can opt out per-tool:

```yaml
tools:
  - name: SomeTool
    version: 1.0.0
    url: https://example.com/sometool.zip
    ignoreUnsafeArchiveEntries: true
```

Or pass the flag at invocation time to skip the check for all tools in that run:

```bash
luca install --ignore-unsafe-entries
```
