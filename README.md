# Rush for agents

Hand Rush a task from your assistant: an agent does the work in its own cloud
computer and returns a pull request, a report, files or an answer, with a
record of every step. Rush is a hosted MCP server at
`https://api.phoenix.so/mcp`. Sign in with your Rush account; it uses OAuth
with dynamic registration and PKCE, so no API key is needed. Runs use the
Claude or ChatGPT account you connected to Rush, or Rush's models within the
free trial.

This plugin adds six skills on top of the server's tools:

- `get-started`: your first task, from asking to the result, in three turns.
- `hand-off-a-task`: write a task, start it, wait, read the result, continue or stop it.
- `fix-a-bug`: reproduce a bug, fix its cause and open a pull request with a test.
- `review-a-pr`: a review of one pull request, each finding with its file and line.
- `run-in-parallel`: many independent tasks at once, one cloud computer each.
- `save-an-agent`: a reusable agent with standing instructions, or one from Community.

The plugin talks to one host, `api.phoenix.so`.

## Claude Code

```sh
claude plugin marketplace add phnx-labs/rush-mcp
claude plugin install rush@rush
```

Restart Claude Code, open `/mcp`, and sign in to Rush. For the tools alone:

```sh
claude mcp add --transport http rush https://api.phoenix.so/mcp
```

## Codex

```sh
codex mcp add rush --url https://api.phoenix.so/mcp
codex mcp login rush
```

## claude.ai and ChatGPT

Add `https://api.phoenix.so/mcp` as a custom connector and sign in to Rush when
asked.

## Cursor

Add to `.cursor/mcp.json`, then sign in from MCP settings:

```json
{"mcpServers":{"rush":{"url":"https://api.phoenix.so/mcp"}}}
```

## VS Code

```sh
code --add-mcp '{"name":"rush","type":"http","url":"https://api.phoenix.so/mcp"}'
```

## Gemini CLI

```sh
gemini extensions install https://github.com/phnx-labs/rush-mcp
```

## From your own server

Use an API key from the console's Developers page instead of signing in:
[developer API quickstart](https://getrush.ai/docs/quickstart/).

## Help

Email contact@phoenix.so. Privacy: https://getrush.ai/legal/privacy/.
Terms: https://getrush.ai/legal/terms/.

## Maintaining this repository

`source/plugin.json` is the one source. `bun scripts/build.ts` writes every
client's manifest from it; `bun scripts/build.ts --check` fails when one is out
of date. Edit skills under `skills/` directly.
