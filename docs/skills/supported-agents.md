---
title: Supported Agents
description: All AI coding agents Luca can install skills for.
---

# Supported Agents

Luca installs skills for 45 AI coding agents. Each agent has a project-relative path where skill files are symlinked and a global path for globally installed skills.

## Listing Agents

```bash
luca agents
```

## All Supported Agents

| Agent ID | Project Skills Path |
|---|---|
| `adal` | `.adal/skills` |
| `amp` | `.agents/skills` |
| `antigravity` | `.agents/skills` |
| `augment` | `.augment/skills` |
| `bob` | `.bob/skills` |
| `claude-code` | `.claude/skills` |
| `cline` | `.agents/skills` |
| `codebuddy` | `.codebuddy/skills` |
| `codex` | `.agents/skills` |
| `command-code` | `.commandcode/skills` |
| `continue` | `.continue/skills` |
| `cortex` | `.cortex/skills` |
| `crush` | `.crush/skills` |
| `cursor` | `.agents/skills` |
| `deepagents` | `.agents/skills` |
| `droid` | `.factory/skills` |
| `firebender` | `.agents/skills` |
| `gemini-cli` | `.agents/skills` |
| `github-copilot` | `.agents/skills` |
| `goose` | `.goose/skills` |
| `iflow-cli` | `.iflow/skills` |
| `junie` | `.junie/skills` |
| `kilo` | `.kilocode/skills` |
| `kimi-cli` | `.agents/skills` |
| `kiro-cli` | `.kiro/skills` |
| `kode` | `.kode/skills` |
| `mcpjam` | `.mcpjam/skills` |
| `mistral-vibe` | `.vibe/skills` |
| `mux` | `.mux/skills` |
| `neovate` | `.neovate/skills` |
| `openclaw` | `skills` |
| `opencode` | `.agents/skills` |
| `openhands` | `.openhands/skills` |
| `pi` | `.pi/skills` |
| `pochi` | `.pochi/skills` |
| `qoder` | `.qoder/skills` |
| `qwen-code` | `.qwen/skills` |
| `replit` | `.agents/skills` |
| `roo` | `.roo/skills` |
| `trae` | `.trae/skills` |
| `trae-cn` | `.trae/skills` |
| `universal` | `.agents/skills` |
| `warp` | `.agents/skills` |
| `windsurf` | `.windsurf/skills` |
| `zencoder` | `.zencoder/skills` |

## Using Agent IDs

Pass agent IDs to the `--agent` flag when installing skills:

```bash
luca install vercel-labs/agent-skills --agent claude-code --agent cursor
```

Or declare them in your Lucafile's `agents:` key:

```yaml
agents:
  - claude-code
  - cursor
  - github-copilot
```

Omitting the `agents:` key (or `--agent` flag) installs skills for all supported agents.
