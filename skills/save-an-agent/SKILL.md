---
name: save-an-agent
description: Save a reusable Rush agent with standing instructions, model and connected accounts, or add a ready-made one from Community, so repeat work starts by name. Use when someone asks for the same kind of task again and again (weekly triage, release notes, PR reviews to a team's standard), or asks to set up, change or find a Rush agent.
---

# Save a Rush agent

A saved agent fixes the harness, model, instructions, skills and connected
accounts, so each task only says what is new this time.

1. **Check what exists.** Call `list_agents` with a `query` for the job. To
   start from someone else's work, `list_agents` with `community: true` lists
   agents companies published; `create_agent` with only `template` set to its
   id adds it as the person's own, running on their connected accounts.
2. **Write the instructions.** Turn what the person keeps repeating into
   standing instructions: what the agent is for, the steps it always takes,
   the standard its output meets, and what it must never do (for example,
   "never merge" or "draft replies, do not send"). Leave out anything that
   changes per task; that goes in each task.
3. **Choose the rest.** `harness` is `claude`, `codex` or `opencode`; leave
   `model` and `effort` out for the harness default, or pick from
   `list_models`. Name only the accounts it needs in `connections`
   (`list_connections`); Gmail and Outlook take `{name, access: "read"}` to
   read without sending. Add `skills` by their source URL when the person has
   them.
4. **Save it.** Show the person the name and instructions, then call
   `create_agent`. If a connection it names is not connected yet, connect it as
   in `hand-off-a-task` under "When Rush refuses".
5. **Use and refine.** Start tasks with `create_session` and `agent` set to its
   name. Change it with `update_agent`; sessions already running keep the
   version they started with. The person can also edit it at
   https://cloud.getrush.ai/console/agents/
