---
name: get-started
description: First-run setup for Rush. Use right after the plugin is installed, or when someone asks how to start with Rush, what it can do, or how to hand it their first task.
---

# Get started with Rush

The hosted Rush MCP server at `https://api.phoenix.so/mcp` must be connected and
signed in with the person's Rush account. If a tool call says sign-in is
required, tell them to finish connecting Rush and stop; never ask for a
password, token or API key in chat, and do not invent results.

Keep the setup to three short turns.

1. Say in one sentence what Rush is: an agent that does a task in its own
   cloud computer and hands back the result with a record of what it did.
   Then ask one question: "What would you like done? It can be on one of your
   GitHub repositories, or need none."
2. If the task names a repository, call `list_repositories` and confirm the
   one they mean. If it is missing, say the Rush GitHub App does not reach it
   yet and offer to run the task without a repository. Then call
   `create_session` with the task in plain words and `repo` if there is one.
   Say the work takes minutes, and call `wait_for_sessions` with its id until
   it settles.
3. Report the result from the last `wait_for_sessions` or `get_session`: the
   answer, the pull request link if there is one, and any files it made.
   On `needs_review`, say Rush could not confirm the result and show what the
   agent reported. On `failed`, give the error code and what to try next.

Close with what to do next time: ask for a task in plain words, reply to a
finished task to continue it in the same computer for 7 days, and see every
run at https://cloud.getrush.ai.

If `create_session` is refused `CONNECTION_NOT_READY`, follow the
`hand-off-a-task` skill's step for connecting an account.
