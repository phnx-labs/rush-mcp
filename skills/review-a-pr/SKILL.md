---
name: review-a-pr
description: Have a Rush cloud agent review a GitHub pull request and report what it would change. Use when someone asks for a code review, a second opinion on a PR, or a check of a PR before merging.
---

# Review a pull request with Rush

Connect the hosted Rush MCP server at `https://api.phoenix.so/mcp` and sign in
with the person's Rush account before using these tools. Never ask for a
password, token or API key in chat. If sign-in is required, explain how to
connect and stop; do not invent findings.

1. Get the pull request URL. If the person names only a repository, ask which
   PR. Call `list_repositories`; if the repository is not listed, say the Rush
   GitHub App does not reach it yet and stop.
2. Call `create_session` with the PR URL as `repo`, a fresh UUID as
   `request_id`, and a `task` that says what to review and how to answer, for
   example: "Review this pull request. Read the diff and the code around it,
   run the tests if the repo has them, and list each problem with the file and
   line, why it matters, and the change you would make. Do not push commits or
   post comments." Add anything the person asked to focus on.
3. Call `wait_for_sessions` with the id until it settles; a review takes
   minutes.
4. Report from `get_session`: the findings, most serious first, each with its
   file and line. Say plainly when the review found nothing. On
   `needs_review` or `failed`, say so with the reason.
5. Offer next steps: ask follow-up questions with `send_session_message`, or
   start a separate session to make the fixes, which opens its own pull
   request. Only post comments or push changes when the person asks.
