# /next — What to work on next

Read `docs/windows/NEXT-STEPS.md` and present a clear, actionable summary of the next highest-priority item to implement.

## Steps

1. Read `docs/windows/NEXT-STEPS.md` in full.
2. Identify the highest `📝 TODO` priority item.
3. For that item:
   - Read its spec from `../tidymac-docs/features/TM-WIN-<ID>/spec.md`
   - Check `crates/core/src/scan/catalog.rs` to see its current `ToolAvailability`
   - Identify the exact files to create or modify
4. Output a concise action plan:
   - What to build (one sentence)
   - Spec reference
   - Files to create/edit (with paths)
   - First test to write (TDD — write the failing test first)
   - Safety constraints specific to this feature

Do NOT start implementing yet. Present the plan for confirmation first.
