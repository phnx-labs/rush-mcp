# Submission fields

What the directory forms ask for, filled in once so every submission says the
same thing. Listing text comes from `source/plugin.json`. Review material
(test cases, annotation justifications, release notes) stays here, not in a
manifest, and is pasted into each portal.

| Field | Value |
|---|---|
| Name | Rush |
| One-liner | Hand a task to a cloud agent |
| Server URL | `https://api.phoenix.so/mcp` (Streamable HTTP) |
| Auth | OAuth 2.1 with dynamic client registration and PKCE S256; no API key |
| Website | https://getrush.ai |
| Documentation | https://getrush.ai/docs/concepts/mcp-server/ |
| Support | https://github.com/phnx-labs/rush-mcp/issues |
| Contact email | contact@phoenix.so |
| Privacy policy | https://getrush.ai/legal/privacy/ |
| Terms of service | https://getrush.ai/legal/terms/ |
| Category | Developer Tools |
| Reads or writes | Both. See the annotation table below. |
| Network destinations | `api.phoenix.so` (MCP and OAuth); sign-in and consent pages on `cloud.getrush.ai` and `id.phoenix.so` |
| Before connecting | A Rush account. Tasks on code need the Rush GitHub App on the repository. |
| Domain verification (OpenAI) | The portal's token, served as plain text at `https://api.phoenix.so/.well-known/openai-apps-challenge` |
| Demo video (OpenAI) | A recording of the five positive cases in ChatGPT and Codex |
| Reviewer account | A dedicated Rush account with sample sessions, a connected test repository and credit; sign-in with no email, SMS or magic-link step. Credentials go in the portal only. |

## Tool annotations

OpenAI and Anthropic both read the server's own values, which must be accurate
on every tool. A tool that starts work able to push code, open a pull request
or act in a connected account is a write with effects the person cannot take
back, so it is not read-only and is destructive; a tool confined to the
person's own Rush org is closed-world.

| Tool | readOnly | destructive | openWorld | Why |
|---|---|---|---|---|
| `create_session` | false | true | true | Starts an agent that can push a branch, open a pull request and act in the connected accounts it is given. |
| `send_session_message` | false | true | true | Continues that agent with new instructions, with the same reach. |
| `cancel_session` | false | true | false | Stops a run and releases its sandbox; unsaved work in it is lost. |
| `update_agent` | false | true | false | Replaces a saved agent's instructions and settings for every later run. |
| `create_agent` | false | false | false | Adds a saved agent in the person's org; nothing existing changes. |
| `connect_account` | false | false | true | Returns a sign-in link for a third-party account; the person opens it. |
| `get_session`, `wait_for_sessions`, `list_sessions`, `list_session_events`, `get_session_changes`, `get_session_artifact`, `list_agents`, `get_agent`, `list_projects`, `get_project`, `list_models`, `list_connections`, `list_repositories` | true | false | false | Read the person's own org; no change anywhere. |

## Release notes

First directory release. Hand a task to an agent that works in its own cloud
computer and returns a pull request, a report, files or an answer; wait for
one or several tasks, read what changed, reply to a running task or stop it,
and save reusable agents with standing instructions.

## Test cases (OpenAI asks for exactly five and three)

Each positive case passed in a real run on 2026-11-05 through Claude Code with
this plugin. Cases 3 and 4 name the reviewer account's test repository; fill in
its name and an open pull request in it before submitting.

### Should use Rush

1. **Description:** A task that needs no repository runs in one session and returns a sourced answer.
   **Prompt:** "Have Rush look up the current stable Python release and its release date on python.org."
   **Tools triggered:** `list_repositories`, `create_session`, `wait_for_sessions`.
   **Expected behavior:** One session with no repository; the answer gives the version, the date and the python.org page it read.
2. **Description:** Independent tasks run side by side and are collected into one answer.
   **Prompt:** "Use Rush to research the latest stable release and release date of Node.js, Go and Rust at the same time, then give me a table."
   **Tools triggered:** `create_session` three times, `wait_for_sessions` with `until: any`.
   **Expected behavior:** Three sessions run side by side; a table with one row per language and the official source for each.
3. **Description:** A pull request review reports findings without writing to the pull request.
   **Prompt:** "Ask Rush to review https://github.com/<test-repo>/pull/<n> before I merge it."
   **Tools triggered:** `list_repositories`, `create_session` with the PR URL as `repo`, `wait_for_sessions`.
   **Expected behavior:** Findings ranked by severity, each with file and line; no commits or comments on the PR.
4. **Description:** A reported bug is fixed in a pull request that carries a test.
   **Prompt:** "textstats.median([1, 2, 3, 4]) returns 3 but should return 2.5 in <test-repo>. Have Rush fix it."
   **Tools triggered:** `create_session` with the repository as `repo`, `wait_for_sessions`, `get_session`.
   **Expected behavior:** A pull request with a test that failed before the fix; the PR is left open for the person to merge.
5. **Description:** A reusable agent is saved with the person's limits, without starting work.
   **Prompt:** "Set up a Rush agent I can reuse every Monday that writes release notes from last week's merged pull requests and never pushes anything."
   **Tools triggered:** `list_agents`, `list_connections`, `create_agent`.
   **Expected behavior:** A saved agent whose standing instructions carry the person's limits (here, never push); no session is started.

### Should not use Rush

1. **Description:** A general question the assistant answers itself; no tool is called.
   **Prompt:** "What does `git rebase --onto` do?"
2. **Description:** A local edit in the person's own editor; no cloud task is started.
   **Prompt:** "Rename this variable in the file I have open."
3. **Description:** Merging is the person's call. Rush has no merge tool, so no session is started; the assistant says the person merges it.
   **Prompt:** "Merge PR #12 for me."
