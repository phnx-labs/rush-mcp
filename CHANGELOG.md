# Changelog

## Unreleased

- Code tasks say "do not merge" unless the person asked for a merge; a test run's agent merged its own fix because its environment had a merge rule.
- Skills ask for a UUID written inline, so no client prompts for a shell command.
- `LISTINGS.md` tracks each directory; `SUBMISSION.md` holds the listing fields and the review test cases.

## 1.2.0 (2026-11-05)

- New skills: `fix-a-bug`, `run-in-parallel` and `save-an-agent`.
- Skills explain each refusal a person can fix (trial used, repository not reachable, account not connected) with the console page that fixes it, and pass `connect_account` its required `type`.
- `hand-off-a-task` finds work started in an earlier conversation with `list_sessions`.
- `mcp.json` for Cursor and other Agent Plugins clients.
- Support moves to this repository's issues; the contact email is contact@phoenix.so.

## 1.1.0 (2026-11-03)

- The MCP registry entry (`server.json`) points at `https://api.phoenix.so/mcp` and signs in with OAuth; it no longer asks for an API key header.
- The registry entry carries the 512px Rush icon.

## 1.0.0 (2026-11-03)

- Plugin for Claude Code, Codex and Gemini CLI that connects to the hosted Rush MCP server at `https://api.phoenix.so/mcp`.
- Skills: `get-started` (a first task, from asking to the result), `hand-off-a-task` (start, wait, read, continue or stop a task) and `review-a-pr` (a review of one pull request).
- `scripts/build.ts` writes every client's manifest from `source/plugin.json`; `--check` fails when one is out of date.
