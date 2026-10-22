# /spec — Research a feature spec and plan implementation

Research the spec for $ARGUMENTS and produce an implementation plan without writing any code yet.

## Steps

### 1. Locate the spec
- Find it at `../tidymac-docs/features/TM-WIN-<ID>/spec.md`
- If unsure of the ID, check `../tidymac-docs/features/README.md` for the feature index

### 2. Read adjacent context
- Read `docs/windows/TM-WINDOWS-01.md` to see if this feature is already registered
- Read `docs/windows/NEXT-STEPS.md` to confirm this is an approved next item
- Read `crates/core/src/scan/catalog.rs` lines for the relevant `ToolId`

### 3. Find existing patterns to follow
- Identify the most similar already-implemented Windows tool (e.g. for a scanner: look at `crates/core/src/scan/tools/mail_windows.rs`)
- List the files this similar tool uses as a template reference

### 4. Output an implementation plan

```
## Feature: <name> (<spec ID>)

### What it does (one paragraph from spec)

### Files to create
- `crates/core/src/...` — <purpose>
- `src/flow/.../` — <purpose>

### Files to modify
- `crates/core/src/scan/catalog.rs` — set ToolAvailability::Available on Windows
- `docs/windows/TM-WINDOWS-01.md` — add registration row
- `docs/windows/DEVELOPMENT-PHASES.md` — link in Phase 7

### First failing test to write
<exact test function signature and one-sentence assertion>

### Windows APIs needed
<list Win32 API calls with crate/function names>

### Safety constraints
<list from spec or AGENTS.md>

### Open questions
<anything ambiguous that needs owner decision before implementing>
```

Do NOT write any implementation code. Wait for approval before proceeding to `/implement`.
