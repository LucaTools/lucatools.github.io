---
title: Installing Skills
description: Install agentic skills for AI coding agents directly or via a Lucafile.
---

# Installing Skills

Skills are Markdown files hosted in Git repositories that extend the capabilities of AI coding agents. Luca clones skill repositories and symlinks the skill files into each agent's designated directory.

## Install All Skills from a Repository

Individual skill installs require a version, pinned with `--ref`:

```bash
luca install AvdLee/Swift-Testing-Agent-Skill --ref 1.2.0
```

Luca clones the repository at that tag or commit, discovers all skills inside it, and symlinks them into every supported agent's skill directory in your project.

## Install Specific Skills

Use `--skill` to install only named skills from a repository:

```bash
luca install vercel-labs/agent-skills --ref 1.2.0 --skill web-design-guidelines --skill deploy-to-vercel
```

## Pinning a Version

`--ref` accepts a git tag, a commit SHA, or the literal value `latest` (always resolves to the repository's current default-branch HEAD commit):

```bash
luca install vercel-labs/agent-skills --ref 1.2.0
luca install owner/repo --ref abc1234
luca install owner/repo --ref latest
```

Unlike a pinned tag or SHA, `--ref latest` re-checks the remote repository on every install, so the resolved commit — and therefore what gets installed — can change between runs as the upstream repository advances. See [Lucafile: skills](/skills/lucafile-skills) for the same behavior when declaring `version:` in a Lucafile.

## Target Specific Agents

Use `--agent` to install skills only for specific agents:

```bash
luca install AvdLee/Swift-Testing-Agent-Skill --agent claude-code --agent cursor
```

Run `luca agents` to see all valid agent identifiers.

## Using npx (Vercel Labs Pipeline)

If you prefer to use Vercel Labs' native skill installer instead of Luca's built-in pipeline, pass `--use-npx` (requires Node.js and npx):

```bash
luca install vercel-labs/agent-skills --use-npx
```

## Listing Installed Skills

```bash
luca installed --skills
```

Output lists each installed version per skill name — including multiple versions when the same skill has been installed at different refs:

```
Installed skills:
  swift-concurrency       2.1.1, abc1234
  swift-testing-expert    1.2.0
  deploy-scripts          v3.0.0
```

## Uninstalling Skills

```bash
luca uninstall swift-testing-expert
```

Uninstall a globally installed skill:

```bash
luca uninstall swift-testing-expert --global
```
