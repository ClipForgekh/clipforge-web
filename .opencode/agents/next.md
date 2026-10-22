---
name: next
description: Find the highest-priority next item to implement. Reads NEXT-STEPS.md and presents the top TODO item with an action plan.
---

# Agent: next — What to work on next

## Your task

Read `docs/windows/NEXT-STEPS.md` fully, then:

1. Find the first `📝 TODO` priority item in Phase 7
2. Read its spec: `../tidymac-docs/features/TM-WIN-<ID>/spec.md`
3. Check `crates/core/src/scan/catalog.rs` for its current `ToolAvailability` on Windows
4. Present a focused action plan:

```
## Next item: <feature name> (<spec ID>)

**What:** <one sentence>
**Spec:** ../tidymac-docs/features/<ID>/spec.md

### Files to create
- <path> — <purpose>

### Files to modify
- <path> — <what changes>

### First failing test to write (TDD)
<exact test name and assertion>

### Safety constraints
<list from spec>
```

Stop here. Do not write any code until the user confirms.
