---
title: Private Repos & GitHub Enterprise
description: Authenticate tool downloads from private repositories on github.com or GitHub Enterprise Server.
---

# Private Repos & GitHub Enterprise

If a tool's `url` points at a private repository — on `github.com` or a GitHub Enterprise
Server instance — set an environment variable holding a personal access token before running
`luca install`:

- `github.com` reads `LUCA_GITHUB_TOKEN`.
- Any other host reads `LUCA_GITHUB_TOKEN_<HOST>`, where `<HOST>` is the hostname uppercased
  with every non-alphanumeric character replaced by `_`. For example, a Lucafile entry
  pointing at `https://ghe.my-company.com/iOS/ModuleCreator/releases/download/2.5.0/ModuleCreator-macOS.zip`
  is authenticated by setting `LUCA_GITHUB_TOKEN_GHE_MY_COMPANY_COM`.

```bash
export LUCA_GITHUB_TOKEN_GHE_MY_COMPANY_COM=ghp_xxxxxxxxxxxx
luca install
```

The token is only ever sent to the host it was configured for. Note that `github.com` asset
downloads never carry this header, even if `LUCA_GITHUB_TOKEN` is set — GitHub redirects those
downloads to a separate signed-URL storage host, so the token is unused there today; it is
still read and applied to the `api.github.com` release-metadata lookup used by
`luca install org/repo@version`.

## GitHub Enterprise Server Behind an SSO Gateway (e.g. Okta)

If your GHE instance sits behind a browser-SSO gateway, the plain release-download URL
(`.../releases/download/{version}/{asset}`) may be intercepted before it reaches GHE and served
back as an HTML login page — even with `LUCA_GITHUB_TOKEN_<HOST>` set — because that URL is
treated as web traffic requiring an interactive session, not a token. The `/api/v3/...` paths are
typically exempt from that gate, since they're designed for token-based access. Point `url` at the
release's **API asset URL** instead of the browser download URL:

```bash
curl -H "Authorization: Bearer $LUCA_GITHUB_TOKEN_GHE_MY_COMPANY_COM" \
  https://ghe.my-company.com/api/v3/repos/iOS/ModuleCreator/releases/tags/2.5.0
```

Find the matching asset's `url` field in the response (not `browser_download_url`) — it looks like
`https://ghe.my-company.com/api/v3/repos/iOS/ModuleCreator/releases/assets/12345` — and use that in
your Lucafile:

```yaml
tools:
  - name: ModuleCreator
    version: 2.5.0
    url: https://ghe.my-company.com/api/v3/repos/iOS/ModuleCreator/releases/assets/12345
```

Luca always sends `Accept: application/octet-stream` on the download request, which the API asset
endpoint requires to return the raw binary instead of JSON metadata.
