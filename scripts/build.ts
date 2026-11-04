// Writes every client's manifest from source/plugin.json, so the copies never drift.
// `bun scripts/build.ts --check` fails when a generated file is out of date.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";

const root = resolve(import.meta.dir, "..");
const source = JSON.parse(await readFile(join(root, "source/plugin.json"), "utf8"));
const { name, version, title, description, summary, url, registryName, repository, author, homepage, icon, keywords, interface: ui, onboardingSkill } = source;

const identity = { name, version, description, author, homepage, keywords, license: "MIT", repository };
const mcp = { mcpServers: { [name]: { type: "http", url } } };

const files: Record<string, unknown> = {
  ".claude-plugin/plugin.json": { ...identity, privacyPolicyUrl: ui.privacyPolicyURL },
  ".claude-plugin/marketplace.json": {
    name,
    owner: { name: author.name },
    description,
    plugins: [{ name, source: "./", description }],
  },
  ".codex-plugin/plugin.json": { ...identity, interface: ui, skills: "./skills/", mcpServers: "./.mcp.json" },
  ".mcp.json": mcp,
  "plugin.json": {
    $schema: "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
    ...identity,
    extensions: { "com.openai": { interface: ui, onboardingSkill } },
  },
  "gemini-extension.json": { name, version, description, contextFileName: "GEMINI.md", mcpServers: { [name]: { httpUrl: url } } },
  "server.json": {
    $schema: "https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json",
    name: registryName,
    title,
    description: summary,
    version,
    websiteUrl: homepage,
    icons: [{ src: icon, mimeType: "image/png", sizes: ["512x512"] }],
    remotes: [{ type: "streamable-http", url }],
  },
};

const text: Record<string, string> = {
  "GEMINI.md": `# Rush

The \`${name}\` MCP server hands a task to an agent that works in its own cloud
computer and returns the result: a pull request, a report, files or an answer.
Work takes minutes: start it with \`create_session\`, then call
\`wait_for_sessions\` until it settles, and read it with \`get_session\`. The
workflows in \`skills/\` show how to combine the tools.
`,
  "llms-install.md": `# Installing Rush

Rush is a hosted remote MCP server; there is nothing to clone, build or run.
Add it to the MCP settings:

\`\`\`json
{"mcpServers":{"${name}":{"type":"streamableHttp","url":"${url}"}}}
\`\`\`

The first tool call opens a browser to sign in to Rush (OAuth 2.1 with dynamic
client registration and PKCE). Do not ask the user for an API key. Verify the
install by calling \`list_models\`.
`,
};

const rendered = new Map<string, string>([
  ...Object.entries(files).map(([path, value]) => [path, JSON.stringify(value, null, 2) + "\n"] as const),
  ...Object.entries(text),
]);

const check = process.argv.includes("--check");
const stale: string[] = [];
for (const [path, body] of rendered) {
  const full = join(root, path);
  if (check) {
    const current = await readFile(full, "utf8").catch(() => "");
    if (current !== body) stale.push(path);
  } else {
    await mkdir(dirname(full), { recursive: true });
    await writeFile(full, body);
  }
}
if (stale.length) {
  console.error(`Out of date: ${stale.join(", ")}. Run: bun scripts/build.ts`);
  process.exit(1);
}
