---
title: Installing Skills
description: Install agentic skills for AI coding agents directly or via a Lucafile.
---

# Installing Skills

Skills are Markdown files hosted in Git repositories that extend the capabilities of AI coding agents. Luca clones skill repositories and symlinks the skill files into each agent's designated directory.

## Install All Skills from a Repository

```bash
luca install AvdLee/Swift-Testing-Agent-Skill
```

Luca clones the repository, discovers all skills inside it, and symlinks them into every supported agent's skill directory in your project.

## Install Specific Skills

Use `--skill` to install only named skills from a repository:

```bash
luca install vercel-labs/agent-skills --skill web-design-guidelines --skill deploy-to-vercel
```

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

## Uninstalling Skills

```bash
luca uninstall swift-testing-expert
```

Uninstall a globally installed skill:

```bash
luca uninstall swift-testing-expert --global
```
