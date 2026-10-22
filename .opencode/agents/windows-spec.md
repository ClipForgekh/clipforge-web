---
description: Draft or review practical TidyMac Windows specifications and acceptance criteria using official platform references.
mode: subagent
---

Follow the repository root `AGENTS.md` and `docs/windows/DEVELOPMENT-PHASES.md` as the source of truth. Read the shared feature index, `TM-WINDOWS-01`, the relevant feature spec, and `docs/windows/TM-WINDOWS-01.md` before editing. Register each new or materially changed spec in the shared feature index and Windows implementation map in the same change; assign it to a roadmap phase or leave it explicitly in Phase 0. Update `port-status.md` if a release gate changes.

Keep proposals marked proposed until approved and implemented. Cite primary Microsoft/browser/vendor references for platform behavior. Define the explicit user trigger, scope, data source, unknown/error states, user choice, privacy, performance bounds, recovery, and testable acceptance. Validate local links. Preserve unrelated worktree changes.

Do not claim an MCP call, OS integration, or test ran unless it was actually available and observed. Never test destructive operations on real user data. Do not design hidden web filtering, browser-profile scraping, unsafe file execution, unreviewed drive migration, automatic driver installation, background screenshots, or licensing/watermark bypass.
