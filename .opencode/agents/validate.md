---
name: validate
description: Run the full Windows validation suite and report results. Checks Rust tests, frontend tests, and formatting.
---

# Agent: validate — Run and report validation

## Steps to execute in order

### 1. Check toolchain
```powershell
rustup show active-toolchain
where.exe cargo
```

### 2. Rust workspace tests
```powershell
cargo test --workspace 2>&1
```
Count total tests and any failures. Report exact failure names.

### 3. Rust formatting
```powershell
cargo fmt --all -- --check 2>&1
```

### 4. Frontend tests
```powershell
bun run test 2>&1
```

### 5. Full validator (if available)
```powershell
.\scripts\validate-windows.ps1 2>&1
```

## Report format

```
## Validation Report — <timestamp>

| Step | Result | Notes |
|------|--------|-------|
| Rust tests | ✅ 423 passed / ❌ N failed | <failing test names> |
| Rust formatting | ✅ clean / ❌ issues | |
| Frontend tests | ✅ 349 passed / ❌ N failed | |
| Full validator | ✅ / ❌ / ⏭️ skipped | |

### Failing tests
<list with file and assertion>

### Recommendation
<PASS — safe to mark gate complete> or <FAIL — fix X before marking done>
```

## Rules
- Never claim tests passed without running them
- Never skip a failing step or hide errors
- Never modify a test to make it pass — fix the implementation
