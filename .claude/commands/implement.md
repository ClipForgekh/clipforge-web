# /implement — Implement a Windows feature with TDD

Implement the feature described in $ARGUMENTS using strict test-driven development.

## Workflow

### 1. Read before touching any code
- Read `docs/windows/NEXT-STEPS.md` to confirm this is an approved next item
- Read `AGENTS.md` sections: Required engineering method, Architecture rules, Safety boundary
- Read the feature spec: `../tidymac-docs/features/TM-WIN-<ID>/spec.md`
- Read `crates/core/src/scan/catalog.rs` to understand the `ToolId` and current platform availability

### 2. Register first (if not already registered)
- Add `📝 TODO` row to `docs/windows/TM-WINDOWS-01.md`
- Link the spec in `docs/windows/DEVELOPMENT-PHASES.md` Phase 7 table

### 3. Write the failing test first
- Create the test file: `crates/core/tests/<feature>_windows.rs` or add to existing test module
- Use synthetic fixtures ONLY — never real profile paths
- Run: `cargo test --workspace -- <test_name> 2>&1` and confirm it FAILS for the right reason

### 4. Implement the minimal passing code
- Create the implementation file(s) following existing patterns (e.g. `crates/core/src/scan/tools/<feature>_windows.rs`)
- Use `#[cfg(target_os = "windows")]` for platform code
- Use `SHGetKnownFolderPath` for path resolution — never hardcode paths
- Run: `cargo test --workspace -- <test_name> 2>&1` and confirm it PASSES

### 5. Wire into catalog
- Update `crates/core/src/scan/catalog.rs` to set `ToolAvailability::Available` on Windows for the new tool
- Update any backend dispatcher or Tauri command that routes to this tool

### 6. Add Vue pane (if needed)
- Add or update the pane in `src/flow/<feature>/`
- Follow `src/styles/tokens.css` for all colors, spacing, and typography — no ad-hoc values

### 7. Validate
- Run: `.\scripts\validate-windows.ps1` (or `cargo test --workspace` if full validation is not available)
- All tests must pass before marking anything done

### 8. Update docs
- Mark `✅ Checked` in `docs/windows/TM-WINDOWS-01.md`
- Update `docs/windows/port-status.md` state
- Update `docs/windows/NEXT-STEPS.md` to mark this priority done

## Safety checklist before completing
- [ ] No `remove_file` / `remove_dir_all` — cleanup goes through identity-safe mover only
- [ ] No hardcoded localized folder names
- [ ] Synthetic fixture tests only — no real profile paths
- [ ] Backend enforcement — unavailable operations return explicit errors, never no-op
- [ ] Nothing pre-ticked in the UI
