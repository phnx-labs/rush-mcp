# Directory listings

Where the Rush MCP server (`https://api.phoenix.so/mcp`) and this plugin are
listed, and what each is waiting on. Update a row when its status changes.
Submission fields and review test cases are in [SUBMISSION.md](SUBMISSION.md).

Last checked: 2026-11-12.

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

## Not submitted yet

Glama, Smithery, cursor.directory, mcp.so, mcpservers.org, Docker MCP registry,
awesome-remote-mcp-servers and the Gemini CLI gallery took SV Atlas from a
public repo; submit Rush to them after the four above.

## Checking status

- Registry: `curl -s 'https://registry.modelcontextprotocol.io/v0/servers?search=so.phoenix/rush'`
- Server and sign-in: `curl -s https://api.phoenix.so/.well-known/mcp/server-card.json` and `/.well-known/oauth-authorization-server`
