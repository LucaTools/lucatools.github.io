---
title: Params Files
description: Supply pipeline parameter values from a YAML file.
---

# Params Files

Parameter values can be loaded from a file instead of (or in addition to) `--param` flags. This is useful for storing environment-specific values or sharing parameter sets across runs.

## Convention-Based Lookup

When you run `luca run ci`, Luca automatically looks for a params file alongside the pipeline file in this order:

1. `./ci.params.yml`
2. `./ci.params`
3. `./pipelines/ci.params.yml`
4. `./pipelines/ci.params`

If a file is found, its values are loaded automatically — no flag needed.

## Params File Format

```yaml
params:
  - key: flavor
    value: release
  - key: upload
    value: "true"
```

## Explicit Params File

Use `--params-file` to specify a path explicitly:

```bash
luca run ci --params-file config/release-params.yml
```

An explicitly specified file that does not exist is an error. The convention-based file is silently skipped if not found.

## Merge Order

When both a params file and `--param` flags are provided, values are merged. `--param` overrides the file:

```bash
# params file has flavor=release
luca run ci --params-file release.params.yml --param flavor=debug
# flavor resolves to: debug  (--param wins)
```

Full precedence (lowest to highest):

1. Declared parameter `default:`
2. Params file values
3. `--param` flag values
