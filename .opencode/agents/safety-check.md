---
name: safety-check
description: Audit code for TidyMac Windows safety invariants. Pass a file path or "current changes" as prompt argument.
---

# Agent: safety-check — Windows safety audit

## Invariants to check

### File identity (CRITICAL)
- All file removal goes through the identity-safe mover (`mover_windows.rs`) — no `fs::remove_file`, `fs::remove_dir_all`, `DeleteFileW`
- Handle captured BEFORE move/staging
- Post-move identity verification present
- Same-volume staging slot pattern used

### Path resolution (CRITICAL)
- No hardcoded localized folder names (`Documents`, `Documenten`, etc.)
- No hardcoded usernames
- All profile/appdata paths via `SHGetKnownFolderPath` with `FOLDERID_*` constants

### Platform gates (CRITICAL)
- macOS code behind `#[cfg(target_os = "macos")]`
- Windows code behind `#[cfg(target_os = "windows")]`
- No silent no-op for unavailable features — must return error or `ComingSoon`

### UI safety (HIGH)
- Nothing pre-ticked in scan results
- Destructive actions need explicit typed confirmation

### Privacy (HIGH)
- No telemetry or analytics added
- No background capture or scanning
- No unapproved shell execution

## Output format

For each violation:
```
VIOLATION [HIGH/MEDIUM/LOW]
File: <path>#L<line>
Rule: <invariant name>
Issue: <one sentence>
Fix: <one sentence>
```

No violations → `✅ Safe — no invariant violations found. Checked: <list of invariants>.`
