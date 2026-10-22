# /review — Code review with Windows safety and product focus

Review the changes in $ARGUMENTS (file path, PR description, or "current changes") with focus on TidyMac's engineering standards.

## Review dimensions

### 1. Safety and correctness (BLOCKING if violated)
- File operations must use identity-safe mover — no direct delete or rename
- Platform gates must be explicit (`cfg(target_os = "windows")` / `cfg(target_os = "macos")`)
- No hardcoded localized folder names or usernames in paths
- No background processes, telemetry, or network calls added
- No pre-ticked items in any UI result list

### 2. Spec compliance (BLOCKING if violated)
- Does the implementation match the feature spec in `../tidymac-docs/features/`?
- Are all spec acceptance criteria testable and covered by tests?
- Is `ComingSoon` used correctly for unimplemented UI paths?

### 3. Test coverage (BLOCKING if missing)
- Synthetic fixture tests for all new scan paths
- Error case tests (missing path, locked file, access denied)
- No test that touches real profile or system directories

### 4. Code quality (non-blocking suggestions)
- Follows existing module structure and naming conventions
- Error types use `thiserror` consistently
- Vue components follow `src/styles/tokens.css` design tokens
- No `unwrap()` or `expect()` in production paths — use `?` and proper error types

### 5. Documentation
- `TM-WINDOWS-01.md` row updated for this feature
- `port-status.md` updated if release gate changed
- Public functions and modules have doc comments

## Output format

```
## Review Summary: <feature/file name>

### 🚨 Blocking Issues
<numbered list or "None">

### ⚠️ Warnings
<numbered list or "None">

### 💡 Suggestions
<numbered list or "None">

### ✅ Good patterns noted
<numbered list>

### Verdict: APPROVE / REQUEST CHANGES / NEEDS DISCUSSION
```
