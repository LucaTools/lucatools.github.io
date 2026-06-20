---
layout: doc
sidebar: false
title: Manifesto
description: Why decentralized tool management matters and why the infrastructure already exists.
---

# Manifesto

*Why decentralized tool management matters and why the infrastructure already exists.*

---

## The Problem

Standalone CLI tools (linters, formatters, code generators, utilities, etc.) are self-contained binaries. They have no transitive dependencies, no version conflicts with each other, no diamond dependency problems to solve. Yet we distribute them through the same heavyweight registries designed for libraries with complex dependency graphs.

Homebrew, for example, wraps every tool in a formula that passes through a central review process, rebuilds bottles across a matrix of macOS versions, and pulls in a full tap repository. This is infrastructure built for managing system-level packages with deep dependency trees - not for delivering a single binary that is already compiled and ready to run.

The result is process overhead without a matching benefit. Homebrew formulas need maintainer approval. CocoaPods trunk demands registration. Every tool that flows through a central registry inherits the registry's bottlenecks, politics, and attack surface.

Even tools designed specifically for CLI tool management add unnecessary layers. [**Mint**](https://github.com/yonaskolb/Mint) points directly to Git repositories (no registry), but it clones source and compiles locally — requiring Xcode and the Swift toolchain even when the binary is already built and published. [**mise**](https://github.com/jdx/mise) is a capable polyglot manager, it bundles version management, task running, environment variables, a plugin system, and its own tool registry: an excellent Swiss-army-knife. Both are good tools solving broader problems.

Luca is born to addresses the narrow case yet common need of installing pre-built standalone binaries.

## The Security Reality

Central registries create concentrated attack surfaces. In 2024, CocoaPods Trunk disclosed **three critical CVEs**: pod takeover via unclaimed namespaces (CVE-2024-38368), remote code execution via email validation (CVE-2024-38366), and session hijacking through email header manipulation (CVE-2024-38367). Any pod author's account could have been silently compromised.

PyPI faced over **500 coordinated typosquatting attacks**, distributing malware through packages named one character off from popular libraries. The centralized model makes this possible: one namespace, one search index, one place where a typo becomes an attack vector.

## The Pattern Shift

The industry is already moving away from centralized submission processes. **Swift Package Manager** replaced CocoaPods' centralized trunk with direct Git URLs — no spec submission, no approval queue. SPM still solves the harder problem of dependency resolution for libraries, but the key insight is its *distribution model*: you point to a repository and a version, and no central authority decides what gets published.

AI agent skills are following the same pattern. Anthropic defines a **format standard** (YAML frontmatter in Markdown), not a submission process. Any developer can publish a skill by hosting it in a Git repository.

> *"Define a format standard, not a submission process."*

## Luca's Approach

Luca installs standalone CLI binaries from any URL that serves them — GitHub Releases, S3 buckets, or any HTTP endpoint. It operates at the protocol level: give it a URL to a binary archive, and it handles the rest. No formula to write. No registration to complete. No spec to submit. No approval to wait for.

GitHub Releases happen to be a natural fit. They provide **versioning** through Git tags, **CDN delivery**, **checksums** for integrity verification, and **multi-platform artifacts** in a single release — but they are not a requirement. The trade-off is honest: without a central registry, there's no discovery index. You need to know what you want to install. For standalone dev tools, that's usually not a problem — developers choose their linters, formatters, and build tools deliberately, not by browsing a catalog.

Luca applies the same decentralized philosophy to **agentic skills**. Skills are Markdown files hosted in Git repositories. Luca clones them and symlinks them into agent-specific directories — `.claude/skills/`, `.cursor/skills/`, and others — for over 40 AI coding agents. No skill registry. No approval process. The same URL-based, format-over-process approach that works for tools works for skills.

---

## Principles

1. **No Registry Required** — If it's a binary at a release URL, Luca can install it. No formula, no spec, no trunk account.
2. **Distributed Over Centralized** — Tools live where their authors publish them. No single registry stands between you and a binary.
3. **Format Over Process** — Define a conformance format, not a submission process. A Lucafile is YAML. A Luca-compatible tool is any release URL serving a binary.
4. **Project-Local, Not Global** — Tool versions belong to projects, not machines. `.luca/tools/` symlinks per project. Skills symlinked to agent-specific directories. No PATH pollution.
5. **Automatic Platform Detection** — No manual binary picking. Luca auto-detects darwin/linux, arm64/x86_64 from release assets.
6. **Zero Configuration Overhead** — No lockfiles, no resolve steps, no dependency graphs. Specify tool + version. Done.
7. **Transparent and Auditable** — Tools in `~/.luca/tools/{name}/{version}/`, symlinks in `.luca/tools/`. No magic, no hidden state.
8. **Open Distribution** — Any tool author publishes platform binaries wherever they choose: GitHub, S3, their own server. No gatekeepers, no review bottlenecks.

---

<div style="text-align: center; margin-top: 3rem;">
  <a href="https://github.com/LucaTools/Luca" style="margin-right: 1rem; padding: 0.6rem 1.4rem; background: var(--vp-c-brand-1); color: #fff; border-radius: 6px; text-decoration: none; font-weight: 600;">View on GitHub</a>
  <a href="/getting-started/installation" style="padding: 0.6rem 1.4rem; border: 1px solid var(--vp-c-divider); border-radius: 6px; text-decoration: none; font-weight: 600;">Get Started</a>
</div>
