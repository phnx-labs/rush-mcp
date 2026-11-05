# Directory listings

Where the Rush MCP server (`https://api.phoenix.so/mcp`) and this plugin are
listed, and what each is waiting on. Update a row when its status changes.
Submission fields and review test cases are in [SUBMISSION.md](SUBMISSION.md).

Last checked: 2026-11-05.

## Live

| Directory | Listing | Notes |
|---|---|---|
| Official MCP Registry | [`ai.getrush/rush`](https://registry.modelcontextprotocol.io/v0/servers?search=getrush) | Serves 1.0.0: `api.prix.dev/mcp` with an API key header. `server.json` here (1.2.0) has `api.phoenix.so` and sign-in; publishing needs the `ai.getrush` namespace key. |

## Ready to submit once the repo is public

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

- Registry: `curl -s 'https://registry.modelcontextprotocol.io/v0/servers?search=getrush'`
- Server and sign-in: `curl -s https://api.phoenix.so/.well-known/mcp/server-card.json` and `/.well-known/oauth-authorization-server`
