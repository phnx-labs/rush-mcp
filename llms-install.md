# Installing Rush

Rush is a hosted remote MCP server; there is nothing to clone, build or run.
Add it to the MCP settings:

```json
{"mcpServers":{"rush":{"type":"streamableHttp","url":"https://api.phoenix.so/mcp"}}}
```

The first tool call opens a browser to sign in to Rush (OAuth 2.1 with dynamic
client registration and PKCE). Do not ask the user for an API key. Verify the
install by calling `list_models`.
