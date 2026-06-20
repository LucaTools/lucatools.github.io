---
title: "Lucafile: skills"
description: Full reference for the skills section of the Lucafile spec.
---

# Lucafile: skills

Add a `skills:` section to your Lucafile to declare which skills to install alongside your tools.

## Full Schema

```yaml
---
skills:
  - name: swift-testing-expert            # Install a specific skill by name (optional)
    repository: AvdLee/Swift-Testing-Agent-Skill

  - repository: vercel-labs/agent-skills  # Omit name to install all skills from the repo

agents:                                   # Agent identifiers to target (optional — omit for all)
  - claude-code
  - cursor
  - github-copilot
```

## Field Reference

| Field | Required | Description |
|---|---|---|
| `repository` | Yes | GitHub shorthand (`owner/repo`) or full HTTPS/Git URL. |
| `name` | No | Name of a specific skill to install. Omit to install all skills from the repository. |
| `agents` | No | List of agent identifiers to install skills for. Omit to target all supported agents. |

## Repository Aliases

Use `repos:` to define shorthand aliases for repositories you reference often:

```yaml
repos:
  myskills: https://github.com/myorg/agent-skills

skills:
  - name: my-skill
    repository: myskills
```

## Installing Only Skills

Skip tools when running `luca install`:

```bash
luca install --only-skills
```
