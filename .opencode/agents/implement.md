---
name: implement
description: Implement a Windows feature using strict TDD. Pass the feature name or spec ID as the prompt argument.
---

# Agent: implement — TDD feature implementation

## Context to read before any code

1. `AGENTS.md` — engineering rules, safety boundary, architecture constraints
2. `docs/windows/NEXT-STEPS.md` — confirm this is an approved Phase 7 item
3. `../tidymac-docs/features/TM-WIN-<ID>/spec.md` — the normative spec
4. `crates/core/src/scan/catalog.rs` — current `ToolId` and `ToolAvailability`

## Strict TDD workflow

### Step 1 — Register
Add `📝 TODO` row to `docs/windows/TM-WINDOWS-01.md` (with spec link).

### Step 2 — Write failing test
Create `crates/core/tests/<feature>_windows.rs` with a test using synthetic fixtures.
Run: `cargo test --workspace -- <test_name>` — it MUST FAIL first.

### Step 3 — Implement minimal passing code
- Platform file: `crates/core/src/scan/tools/<feature>_windows.rs`  
- Always `#[cfg(target_os = "windows")]`
- Use `SHGetKnownFolderPath` for all paths — no hardcoded strings
- Run: `cargo test --workspace` — all tests must pass

### Step 4 — Wire into catalog
Update `crates/core/src/scan/catalog.rs` to set `ToolAvailability::Available` on Windows.

### Step 5 — Add Vue pane
File: `src/flow/<feature>/` — follow design tokens in `src/styles/tokens.css`.
Nothing pre-ticked. `ComingSoon` if any sub-feature is not yet implemented.

### Step 6 — Validate and document
- Run: `cargo test --workspace && bun run test`
- Mark `✅ Checked` in `docs/windows/TM-WINDOWS-01.md`
- Update `docs/windows/port-status.md`
- Mark priority done in `docs/windows/NEXT-STEPS.md`

## Safety checklist (must pass before completing)
- [ ] No direct `fs::remove_file` or `DeleteFileW` — use identity-safe mover
- [ ] Handle-based identity captured before any staging operation
- [ ] Synthetic fixture tests only — no real profile or system paths
- [ ] Nothing pre-ticked in scan result UI
- [ ] macOS-only code behind `#[cfg(target_os = "macos")]`
- [ ] No telemetry, network calls, or background processes
