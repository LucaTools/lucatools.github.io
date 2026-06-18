---
title: Global Skills
description: Install skills globally so they are available in every project.
---

# Global Skills

Some skills are useful across all your projects. The `--global` flag installs them to your home directory, making them available regardless of which project you're in.

## Installing Globally

Install all skills from your global Lucafile:

```bash
luca install --global
```

Install a specific skill globally from a repository:

```bash
luca install AvdLee/Swift-Testing-Agent-Skill --skill swift-testing-expert --global
```

Use a custom global Lucafile:

```bash
luca install --global --spec ~/my-global-skills.yaml
```

Running `luca install --global` again fetches the latest version of all globally installed skills — there is no separate update command.

## Global Lucafile

The default global Lucafile lives at `~/.config/luca/Lucafile`. It accepts the same `skills:` and `agents:` syntax as a project Lucafile.

Example `~/.config/luca/Lucafile`:

```yaml
---
skills:
  - name: swift-testing-expert
    repository: AvdLee/Swift-Testing-Agent-Skill
  - repository: vercel-labs/agent-skills

agents:
  - claude-code
```

## Global Paths

| Resource | Path |
|---|---|
| Global Lucafile | `~/.config/luca/Lucafile` |
| Global skill cache | `~/.luca/skills/` |
| Agent global skill dirs | Per agent (run `luca agents` for full list) |

## Precedence

Project-local skills take precedence over global skills when both exist for the same agent. Global skills act as a base layer that project-local installs can override.

## Listing and Uninstalling Global Skills

```bash
luca installed --skills --global
luca uninstall my-skill --global
```
