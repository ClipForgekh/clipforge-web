# /safety-check — Review code for Windows safety invariants

Audit the file(s) in $ARGUMENTS (or current diff if no argument) for safety violations specific to TidyMac's Windows safety model.

## Safety invariants to check

### File identity and movement
- [ ] All file removals go through the identity-safe mover (`mover_windows.rs`) — no direct `fs::remove_file`, `fs::remove_dir_all`, or `DeleteFileW`
- [ ] Handle-based identity is captured BEFORE any move or staging operation
- [ ] Post-move identity verification is present (compare pre/post device+inode or NTFS file ID)
- [ ] Rollback is implemented for identity mismatch
- [ ] Same-volume staging slot pattern is used (not cross-volume moves)

### Path resolution
- [ ] No hardcoded localized folder names (e.g. `C:\Users\Public\Documents` — use `SHGetKnownFolderPath` or `FOLDERID_*` constants)
- [ ] No hardcoded username in paths
- [ ] `%LOCALAPPDATA%` and `%USERPROFILE%` resolved via Win32 APIs, not env vars alone

### UI and UX safety
- [ ] Nothing pre-selected / pre-ticked in the scan result UI
- [ ] `ComingSoon` is shown for any tool whose backend is not implemented on Windows (never silent no-op)
- [ ] Destructive actions require explicit typed confirmation (e.g. `"EMPTY"` for Recycle Bin empty)

### Platform gating
- [ ] macOS-only code is behind `#[cfg(target_os = "macos")]`
- [ ] Windows-only code is behind `#[cfg(target_os = "windows")]`
- [ ] No `#[cfg(not(target_os = "macos"))]` used as a proxy for Windows (use explicit Windows gate)

### Privacy and network
- [ ] No telemetry, analytics, or network calls added
- [ ] No background scanning or capture without explicit user trigger
- [ ] No shell execution (`cmd /c`, `powershell -Command`) except the approved allowlist (`ipconfig /flushdns`, `snippingtool`, `ms-settings:*` URIs)

## Output format

For each violation found:
```
VIOLATION [severity: HIGH/MEDIUM/LOW]
File: <path>#L<line>
Rule: <which invariant above>
Issue: <one sentence>
Fix: <one sentence suggested fix>
```

If no violations: output `✅ No safety violations found` and list what was checked.
