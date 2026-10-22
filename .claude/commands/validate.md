# /validate — Run the Windows validation suite

Run the project validation and report results.

## Steps

1. Check the GNU toolchain is active (the official toolchain per the 2026-10-22 owner decision):
   ```powershell
   where.exe gcc.exe 2>$null
   rustc -Vv
   ```
   The host must be `x86_64-pc-windows-gnu` and gcc must resolve to `<msys64>\mingw64\bin`.

2. Run Rust workspace tests (exclude the Tauri lib binary, which cannot start on the GNU toolchain):
   ```powershell
   cargo test --workspace --exclude tidymac 2>&1
   ```

3. Run frontend tests:
   ```powershell
   bun run test 2>&1
   ```

4. Run Rust formatting check:
   ```powershell
   cargo fmt --all -- --check 2>&1
   ```

5. If full packaging is needed:
   ```powershell
   .\scripts\validate-windows.ps1
   ```

## Report format

After running, report:
- ✅ or ❌ for each step
- Total test counts (Rust + frontend)
- Any failing test names with their error
- Any warnings that indicate a safety or correctness issue

## Do NOT
- Claim tests passed without running them
- Skip a failing step silently
- Modify any test to make it pass without fixing the underlying issue
