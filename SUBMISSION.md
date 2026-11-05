# Submission fields

What the directory forms ask for, filled in once so every submission says the
same thing. Listing text comes from `source/plugin.json`.

| Field | Value |
|---|---|
| Name | Rush |
| One-liner | Hand a task to an agent in the cloud |
| Server URL | `https://api.phoenix.so/mcp` (Streamable HTTP) |
| Auth | OAuth 2.1 with dynamic client registration and PKCE S256; no API key |
| Website | https://getrush.ai |
| Documentation | https://getrush.ai/docs/concepts/mcp-server/ |
| Support | https://github.com/phnx-labs/rush-mcp/issues |
| Contact email | contact@phoenix.so |
| Privacy policy | https://getrush.ai/legal/privacy/ |
| Terms of service | https://getrush.ai/legal/terms/ |
| Category | Developer Tools |
| Reads or writes | Both. Read tools carry `readOnlyHint: true`; `cancel_session` carries `destructiveHint: true`. |
| Network destinations | `api.phoenix.so` only |
| Before connecting | A Rush account. Tasks on code need the Rush GitHub App on the repository. |

## Test cases (OpenAI asks for exactly five and three)

Each positive case passed in a real run on 2026-11-05 through Claude Code with
this plugin. Cases 3 and 4 name the reviewer account's test repository; fill in
its name and an open pull request in it before submitting.

### Should use Rush

1. **Prompt:** "Have Rush look up the current stable Python release and its release date on python.org."
   **Tools:** `list_repositories`, `create_session`, `wait_for_sessions`.
   **Expected:** one session with no repository; the answer gives the version, the date and the python.org page it read.
2. **Prompt:** "Use Rush to research the latest stable release and release date of Node.js, Go and Rust at the same time, then give me a table."
   **Tools:** `create_session` three times, `wait_for_sessions` with `until: any`.
   **Expected:** three sessions run side by side; a table with one row per language and the official source for each.
3. **Prompt:** "Ask Rush to review https://github.com/<test-repo>/pull/<n> before I merge it."
   **Tools:** `list_repositories`, `create_session` with the PR URL as `repo`, `wait_for_sessions`.
   **Expected:** findings ranked by severity, each with file and line; no commits or comments on the PR.
4. **Prompt:** "textstats.median([1, 2, 3, 4]) returns 3 but should return 2.5 in <test-repo>. Have Rush fix it."
   **Tools:** `create_session` with the repository as `repo`, `wait_for_sessions`, `get_session`.
   **Expected:** a pull request with a test that failed before the fix; the PR is left open for the person to merge.
5. **Prompt:** "Set up a Rush agent I can reuse every Monday that writes release notes from last week's merged pull requests and never pushes anything."
   **Tools:** `list_agents`, `list_connections`, `create_agent`.
   **Expected:** a saved agent whose standing instructions carry the person's limits (here, never push); no session is started.

### Should not use Rush

1. "What does `git rebase --onto` do?" A question the assistant answers itself.
2. "Rename this variable in the file I have open." A local edit in the person's own editor.
3. "Merge PR #12 for me." Merging is the person's call; Rush has no merge tool and the assistant should not start a session to do it.
