# Rush

The `rush` MCP server hands a task to an agent that works in its own cloud
computer and returns the result: a pull request, a report, files or an answer.
Work takes minutes: start it with `create_session`, then call
`wait_for_sessions` until it settles, and read it with `get_session`. The
workflows in `skills/` show how to combine the tools.
