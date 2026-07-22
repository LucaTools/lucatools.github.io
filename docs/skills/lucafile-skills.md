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
    version: 1.2.0                        # Git tag, commit SHA, or "latest"

  - repository: vercel-labs/agent-skills  # Omit name to install all skills from the repo
    version: abc1234

agents:                                   # Agent identifiers to target (optional — omit for all)
  - claude-code
  - cursor
  - github-copilot
```

## Field Reference

| Field | Required | Description |
|---|---|---|
| `repository` | Yes | GitHub shorthand (`owner/repo`), full HTTPS/Git URL, or a `repos` alias key. |
| `name` | No | Name of a specific skill to install. Omit to install all skills from the repository. |
| `version` | Yes, unless inherited from a `repos` alias | Git tag, commit SHA, or `latest`. |
| `agents` | No | List of agent identifiers to install skills for. Omit to target all supported agents. |

Every skill must resolve to a `version` — either declared on the skill entry or inherited from its `repos:` alias. Installing without one fails with a clear error.

## Versioning

The `version` field accepts:

- a git tag (e.g. `1.2.0`)
- a commit SHA (e.g. `abc1234`)
- the literal value `latest`, which always resolves to the repository's current default-branch HEAD commit

```yaml
skills:
  - name: skill-creator
    repository: vercel-labs/agent-skills
    version: latest
```

When `version: latest` is used, Luca runs `git ls-remote` against the repository on every install to determine the current HEAD commit SHA. That resolved SHA — never the literal string `latest` — is what's used for the on-disk cache path (`~/.luca/skills/{name}/{sha}/`) and the `git checkout`. This has two consequences:

- Every install with `version: latest` requires a network round-trip to check the remote, even if the resolved commit turns out to be one already cached locally (in which case the download itself is still skipped).
- Two installs at different times can resolve to different commits — and therefore install different content — if the upstream repository gained new commits in between. Pin to a tag or SHA instead if you need fully reproducible installs across your team.

Skills are cached at versioned paths — globally at `~/.luca/skills/{name}/{version}/` and project-locally at `.luca/skills/{name}/{version}/` — so different projects (or different skill entries referencing the same repository) can install different versions side by side without conflicting.

## Repository Aliases

Use `repos:` to define shorthand aliases for repositories you reference often. An alias can be a bare string (URL only — each skill referencing it must set its own `version`) or an object with a default `version` inherited by every skill that uses the alias:

```yaml
repos:
  myskills: https://github.com/myorg/agent-skills   # bare string, no default version

  ios-skills:
    url: git@github.com:org/ios-skills.git
    version: 1.2.0           # all skills below inherit this

skills:
  - name: my-skill
    repository: myskills
    version: 1.0.0           # required — myskills has no default version

  - name: swift-concurrency
    repository: ios-skills   # inherits 1.2.0 from the repo entry

  - name: swift-testing-expert
    repository: ios-skills
    version: abc1234         # overrides the repo version for this skill only
```

Referencing the same repository at two different versions (e.g. a stable tag for most skills and a specific SHA for one experimental skill) is supported — each unique `(repository, version)` pair is cloned and cached independently, so it won't trigger a version-conflict error:

```yaml
repos:
  ios-skills:         { url: git@github.com:org/ios-skills.git, version: 947ad594 }
  ios-skills-preview: { url: git@github.com:org/ios-skills.git, version: 3445c638 }

skills:
  - name: swift-concurrency
    repository: ios-skills         # cloned at 947ad594

  - name: swift-concurrency-next
    repository: ios-skills-preview # cloned at 3445c638 — separate checkout
```

## Installing Only Skills

Skip tools when running `luca install`:

```bash
luca install --only-skills
```
