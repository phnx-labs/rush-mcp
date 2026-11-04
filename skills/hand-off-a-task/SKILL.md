---
name: hand-off-a-task
description: Hand a task to a Rush cloud agent and bring back the result. Use when someone wants work done in the background or off their machine, such as fixing a bug, writing tests, upgrading a dependency, investigating an incident or producing a report, or wants several tasks run at once.
---

# Hand off a task to Rush

Connect the hosted Rush MCP server at `https://api.phoenix.so/mcp` and sign in
with the person's Rush account before using these tools. Never ask for a
password, token or API key in chat. If sign-in is required, explain how to
connect and stop; do not invent results. Tool names may carry a
client-specific prefix; use the connected server's tool catalog.

1. **Write the task.** A session knows nothing from this conversation, so put
   everything it needs in `task`: the goal, the files or links that matter,
   and what done looks like (a pull request, a report, an answer). To build on
   a finished session, pass its id as `continue_from`.
2. **Pick where it runs.** For code, pass the repository, branch or pull
   request URL as `repo` (`list_repositories` lists what Rush can reach), or a
   `project` from `list_projects`. Name a saved agent with `agent` when one
   fits (`list_agents`). Name the accounts it may use in `connections`
   (`list_connections`). Leave out what you do not need.
3. **Start it.** Call `create_session` once, with a fresh UUID as
   `request_id`; if the call fails and you retry, send the same `request_id`
   so only one session starts. For several independent tasks, start each one
   and wait on all their ids together.
4. **Wait.** Call `wait_for_sessions` with the ids; each call waits up to 50
   seconds, so call it again until every session settles. Tell the person it
   is running rather than waiting in silence.
5. **Read the result.** `get_session` has the answer, branch, pull request and
   the files it made. `get_session_changes` lists changed files, with
   `include_diff` for the diff. `get_session_artifact` reads one file by name.
   `list_session_events` shows the steps when something needs explaining.
6. **Continue or stop.** `send_session_message` continues the same session in
   the same computer for 7 days after it goes idle. `cancel_session` stops it
   and releases its computer; confirm with the person before stopping one.

Report each session plainly: its status, the answer, and the links. On
`needs_review`, say the result is not confirmed and show what the agent said.
On `failed`, give the error code and the next step; do not retry silently.

**An account the task needs.** If `create_session` is refused
`CONNECTION_NOT_READY`, call `connect_account` with that name. Give the
`authorize_url` it returns to the person to open in their own browser; never
open or fetch it yourself. It works once and expires in 10 minutes. When
`list_connections` shows it connected, start the session again.
