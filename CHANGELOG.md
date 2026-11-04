# Changelog

## 1.1.0 (2026-11-03)

- The MCP registry entry (`server.json`) points at `https://api.phoenix.so/mcp` and signs in with OAuth; it no longer asks for an API key header.
- The registry entry carries the 512px Rush icon.

## 1.0.0 (2026-11-03)

- Plugin for Claude Code, Codex and Gemini CLI that connects to the hosted Rush MCP server at `https://api.phoenix.so/mcp`.
- Skills: `get-started` (a first task, from asking to the result), `hand-off-a-task` (start, wait, read, continue or stop a task) and `review-a-pr` (a review of one pull request).
- `scripts/build.ts` writes every client's manifest from `source/plugin.json`; `--check` fails when one is out of date.
