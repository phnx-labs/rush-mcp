# Directory listings

Where the Rush MCP server (`https://api.phoenix.so/mcp`) and this plugin are
listed, and what each is waiting on. Update a row when its status changes.
Submission fields and review test cases are in [SUBMISSION.md](SUBMISSION.md).

Last checked: 2026-11-12 (evening: free directories).

## Live

| Directory | Listing | Notes |
|---|---|---|
| Official MCP Registry | [`so.phoenix/rush`](https://registry.modelcontextprotocol.io/v0/servers?search=so.phoenix/rush) | Published from `server.json` with `mcp-publisher login http --domain phoenix.so` (key in the `mcp-registry` secrets bundle; public half at `https://phoenix.so/.well-known/mcp-registry-auth`). Company namespace, product name (owner, 2026-11-12). The old `ai.getrush/rush` 1.0.0 (`api.prix.dev`, API key header) is to be marked deprecated. |

## Ready to submit (the repo is public, issues on, as of 2026-11-11)

| Directory | Where | Waiting on |
|---|---|---|
| Claude connectors directory | claude.ai/directory/manage, "MCP connector" | A reviewer account with finished tasks and credit. |
| Claude plugin directory | claude.ai/directory/manage, "Plugin bundle" | This repo public. |
| OpenAI (ChatGPT apps and Codex plugins) | platform.openai.com, apps submission | Verified OpenAI org, the challenge token served at `https://api.phoenix.so/.well-known/openai-apps-challenge`, a demo video, a reviewer account with no email or SMS code. |
| Cursor Marketplace | cursor.com/marketplace/publish | This repo public. |

## In review (submitted 2026-11-12)

| Directory | Submitted | Waiting on |
|---|---|---|
| Docker MCP registry | [PR #7006](https://github.com/docker/mcp-registry/pull/7006) | Maintainer review. SV Atlas's PR #5531 has waited since 2026-10-09. |
| mcp.so | [issue #7203](https://github.com/chatmcp/mcpso/issues/7203) | Maintainer response. |
| awesome-codex-plugins (HOL) | [PR #710](https://github.com/hashgraph-online/awesome-codex-plugins/pull/710) | Their centralized scanner and a maintainer. Local HOL scanner 3.38.0: 99/100 with #11's fixes. |
| cursor.directory | [plugin page](https://cursor.directory/plugins/rush-2) (slug `rush` was taken) | Their security agent's scan; hidden until it finishes. No logo uploaded (the form takes a file only). |

## Started, not finished

| Directory | State | Next step |
|---|---|---|
| Glama | Already lists [`so.phoenix/rush`](https://glama.ai/mcp/connectors/so.phoenix/rush) from the registry: Unhealthy, unclaimed. Signed in with the getrush.ai Google account, which holds SV Atlas's claim (same token). `https://phoenix.so/.well-known/glama.json` merged in phnx-labs/homepage#46. | Deploy phoenix.so (`scripts/deploy.sh`), press Check HTTP file on the claim panel, then add an OAuth test profile under Admin so health checks find the tools. |
| awesome-remote-mcp-servers | Not filed. | Needs a Healthy Glama listing (the Glama row above). |
| github/awesome-copilot (41k stars) | Install-tested with Copilot CLI 1.0.80 (`Installed 6 skills`). | File the external-plugin issue form. |

## Not submitted

| Directory | Why |
|---|---|
| Smithery | Taken over by Arcade; accounts and publishing shut down 2026-10-31, and it now lists a curated set of verified servers (smithery.ai/future). |
| PulseMCP | Not taking submissions (page updated 2026-09-03); it ingests the official registry. |
| Gemini CLI gallery, claudemarketplaces.com | No submission: they crawl public repos. The repo has the `gemini-cli-extension` topic and a homepage as of 2026-11-12. |
| SkillsMP, hesreallyhim/awesome-claude-code | Need 2+ stars, or 100 stars or 14 days of commits. |

## Checking status

- Registry: `curl -s 'https://registry.modelcontextprotocol.io/v0/servers?search=so.phoenix/rush'`
- Server and sign-in: `curl -s https://api.phoenix.so/.well-known/mcp/server-card.json` and `/.well-known/oauth-authorization-server`
