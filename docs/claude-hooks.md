# Claude Code hooks

Hooks are shell scripts the Claude Code harness runs around tool calls. They live in `.claude/hooks/` and are wired up in `.claude/settings.json`. Each hook reads a JSON event from stdin and either exits silently, prints `additionalContext` for Claude, or denies the action via `permissionDecision: "deny"`.

## Events used in this project

- **PreToolUse** — runs before a tool executes; can deny it.
- **PostToolUse** — runs after a tool succeeds; can inject follow-up context.
- **Stop** — runs when Claude finishes a response.

## Hooks

### `prepare-branch.sh` — PreToolUse on `Write|Edit|MultiEdit|Bash`

Before any commitable change, ensures Claude is on a feature branch that's up-to-date with `origin/main`. Behavior on the first fire per session:

1. Fetches `origin --prune`.
2. If on `main`/`master`/`develop`: denies the tool call with a message that lists every local + remote branch and explains the workflow (pick existing or create `feat/`/`fix/`/`chore/`, then `git pull origin main --no-rebase --no-edit`).
3. Otherwise: runs `git pull origin main --no-rebase --no-edit` on the current branch. On conflict, aborts the merge and denies with the conflict list — user must resolve manually.
4. On success (or skipped because the working tree is dirty), injects `additionalContext` reminding Claude that **committing before finishing the task is mandatory** — the Stop hook will block stop until the tree is clean, then auto-push and auto-open the PR. The reminder includes the exact `session-add.sh` + `git commit` snippet.

After a successful run, drops a marker at `.claude/.session-markers/branch-prepared-<session-id>` so it skips on subsequent calls. Also writes the current session id to `.claude/.session-markers/last-session` so `session-add.sh` can find it.

For Bash, it self-filters to file-modifying commands (`mv|cp|rm|touch|mkdir|chmod|chown|ln`, `sed -i`, `>` / `>>`). Git, npm, yarn, pnpm, and reads pass through unchanged.

### `inject-docs.sh` — PreToolUse on `Write|Edit|MultiEdit`

On the first fire per session, reads every `.md`/`.txt` file under `docs/` and injects them as `additionalContext` so Claude has project conventions loaded before its first edit. Marker: `.claude/.session-markers/docs-injected-<session-id>`.

### `block-protected-branch.sh` — PreToolUse on `Write|Edit|MultiEdit`

Denies edits when on `main`/`master`/`develop`. Acts as a fallback if `prepare-branch.sh` is bypassed; in normal flow `prepare-branch.sh` runs first and provides the richer message.

### `block-protected-paths.sh` — PreToolUse on `Write|Edit|MultiEdit`

Denies edits to `.env*`, `secrets/`, `dist/`, `build/`, `node_modules/`, `.git/`.

### `scan-secrets.sh` — PreToolUse on `Write|Edit|MultiEdit`

If `gitleaks` is installed, scans the proposed file content for credentials. Denies on detection. Skips silently if `gitleaks` isn't on PATH.

### `format-prettier.sh` — PostToolUse on `Write|Edit|MultiEdit`

Runs Prettier on the just-written file (matched by extension: `js|jsx|ts|tsx|json|md|mdx|yml|yaml|css|scss|html|vue`). Skips if `npx` isn't available.

### `update-docs.sh` — PostToolUse on `Write|Edit|MultiEdit`

After an edit, greps `docs/` for any markdown that references the touched file by name. If matches exist, injects a reminder to keep those docs in sync. Does not auto-create docs — that's a manual step.

### `track-session-files.sh` — PostToolUse on `Write|Edit|MultiEdit`

Appends every file Claude writes/edits to `.claude/.session-markers/files-<session-id>.txt` and refreshes `.claude/.session-markers/last-session`. Pure tracker — no output, no blocking. Consumed by `session-add.sh` so commits stage only this session's changes.

### `enforce-doc-sync.sh` — Stop (runs BEFORE `open-pr.sh`)

Blocks task end when source files require a corresponding doc update that wasn't made in the same session. Mapping enforced today:

| Source modified             | Required doc            |
| --------------------------- | ----------------------- |
| `.claude/hooks/*.sh`        | `docs/claude-hooks.md`  |
| `.claude/skills/*/SKILL.md` | `docs/claude-skills.md` |

Logic: read this session's tracked file list (`.session-markers/files-<sid>.txt`); for each rule, if any source matches the pattern AND the required doc is neither in the session's files nor has a diff vs `HEAD`/`origin/main`, collect into a "missing" list. If non-empty, emit `decision: "block"` with the list. Capped at `MAX_ATTEMPTS=2` per session via `.session-markers/doc-sync-attempts-<sid>` so a stuck session can't loop. After the cap, logs a warning and exits so the user can intervene.

### `open-pr.sh` — Stop (runs AFTER `enforce-doc-sync.sh`)

Runs when Claude finishes a response. Ensures session work lands as a PR:

1. **Protected branches** (`main`/`master`/`develop`/`HEAD`): exits silently — nothing to push.
2. **Working tree dirty** (uncommitted changes from this session): emits `decision: "block"` so Claude continues and is told to commit. The reason text gives the exact `session-add.sh` + `git commit` snippet and reminds Claude that the hook will handle push + PR. Block attempts are capped per session at `MAX_ATTEMPTS=2` via `.claude/.session-markers/stop-attempts-<session-id>` to avoid loops on stuck commits (e.g. failing pre-commit hook). After the cap is hit, the hook logs a warning and exits so the user can intervene.
3. **Tree clean + commits ahead of `origin/main`**: pushes the branch (`git push -u origin <branch>`), then either opens a new PR against `main` (using the latest commit subject as the title and the commit log since `origin/main` as the body) or logs that an existing PR was updated.
4. **Tree clean + no commits ahead**: logs and exits.

Skips silently if `gh` is missing or unauthenticated. The retry counter is removed once the tree is clean so the next session starts fresh.

## Hook order

### PreToolUse on `Write|Edit|MultiEdit`

1. `prepare-branch.sh` — switch / sync branch
2. `inject-docs.sh` — load project docs once per session
3. `block-protected-branch.sh` — fallback main/master block
4. `block-protected-paths.sh` — refuse `.env`, `dist/`, etc.
5. `scan-secrets.sh` — gitleaks check

### PostToolUse on `Write|Edit|MultiEdit`

1. `track-session-files.sh` — record this session's edits
2. `format-prettier.sh` — format the result
3. `update-docs.sh` — flag stale docs

### Stop

1. `enforce-doc-sync.sh` — block stop if mandatory docs weren't updated alongside their source
2. `open-pr.sh` — commit-gate, push the branch, open or update the PR

## Helpers (not hooks, but called by Claude)

### `.claude/hooks/session-add.sh`

Stages only the files this session has modified, by reading the list `track-session-files.sh` builds. Use this **instead of `git add -A`** when committing — it prevents commits from sweeping up unrelated uncommitted work or another parallel session's edits.

```bash
bash .claude/hooks/session-add.sh
git commit -m "<message>"
```

Resolution: reads the current session id from `.claude/.session-markers/last-session`, then stages files listed in `.claude/.session-markers/files-<session-id>.txt`. Exits non-zero if no session has been recorded or the list is empty.

## Session markers

Hooks write per-session flag files to `.claude/.session-markers/<name>-<session-id>` so once-per-session work isn't repeated. The directory is gitignored.

## Output protocol

Hooks communicate by writing JSON to stdout:

- **Deny** a tool call:
  ```json
  {
    "hookSpecificOutput": {
      "hookEventName": "PreToolUse",
      "permissionDecision": "deny",
      "permissionDecisionReason": "..."
    }
  }
  ```
- **Inject context** for Claude:
  ```json
  {
    "hookSpecificOutput": {
      "hookEventName": "PreToolUse",
      "additionalContext": "..."
    }
  }
  ```
- **Block stop** (Stop hook only — keeps Claude responding instead of finishing):
  ```json
  { "decision": "block", "reason": "..." }
  ```
  Used by `open-pr.sh` when there are uncommitted changes that need to be committed before a PR can open.
- **No-op:** print nothing and exit 0.

Stderr is shown to Claude as a non-blocking note; non-zero exits without JSON also surface as errors.

## Adding a new hook

1. Create the script under `.claude/hooks/` with `set -euo pipefail`, read stdin via `jq`.
2. `chmod +x` it.
3. Wire it into `.claude/settings.json` under the appropriate event/matcher.
4. If the hook produces side effects (logs, markers), gitignore them.
5. Update this doc.
