# CLAUDE.md

## Working with GitHub

**Use `gh` CLI for Actions, not the GitHub MCP server. Use Session Pooler, not Direct connection, for DB access from CI.**

- **GitHub Actions (workflow runs, logs, triggering)** — the GitHub MCP server has no tools for Actions (no list/trigger/log-read for workflow runs), only Issues/PRs/repo contents/commits. Use `gh` CLI instead:
  - `gh workflow run <file>.yml -R <owner>/<repo>` — trigger manually
  - `gh run watch <run-id> -R <owner>/<repo> --exit-status` — follow a run live
  - `gh run view <run-id> -R <owner>/<repo> --log-failed` — get failure logs
  - If `gh` isn't authenticated, ask the user to run `gh auth login` (interactive, requires their browser)
- **GitHub MCP server** — fine for Issues, PRs, repo file contents/commits, branches, releases, search
- **Connecting to Supabase Postgres from GitHub Actions** — always use the **Session Pooler** connection string (`aws-*.pooler.supabase.com:5432`), never **Direct connection** (`db.<ref>.supabase.co:5432`)
  - Direct connection resolves IPv6-only; GitHub Actions runners have no outbound IPv6 → `pg_dump`/`psql` fails with "Network is unreachable"
  - Session Pooler is IPv4-compatible and still supports full session semantics (unlike Transaction Pooler on port 6543, which breaks tools relying on prepared statements)
