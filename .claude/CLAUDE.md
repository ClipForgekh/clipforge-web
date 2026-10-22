# TidyMac Windows — Claude Code configuration

Always read `AGENTS.md` at the root before starting any task. It contains the engineering rules, safety boundaries, and architecture constraints for this project.

## Skills
- **graphify** (`.claude/skills/graphify/SKILL.md`) - any input to knowledge graph. Trigger: `/graphify`
When the user types `/graphify`, use the installed graphify skill or instructions before doing anything else.

## Project slash commands

| Command | When to use |
|---------|-------------|
| `/next` | Find the highest-priority next item to implement from `docs/windows/NEXT-STEPS.md` |
| `/discover` | Find new features & enhancements: checks parity gaps, unregistered specs, Windows-specific ideas, UX backlog |
| `/spec <TM-WIN-ID>` | Research a feature spec and produce an implementation plan (no code yet) |
| `/implement <feature>` | Implement a new Windows feature using strict TDD workflow |
| `/validate` | Run the full Windows validation suite (Rust + frontend tests) |
| `/safety-check [file]` | Audit code for TidyMac's Windows file-safety invariants |
| `/review [file or description]` | Structured code review against engineering and spec standards |

## Quick project context

- **Stack:** Rust (Tauri shell + core) + Vue 3 (Vite) + Bun
- **Toolchain:** `x86_64-pc-windows-gnu` (MinGW at `F:\Project\Programs\msys64\`) — currently GNU, not MSVC
- **Phases 1–6:** Complete and verified. Next work → Phase 7, see `docs/windows/NEXT-STEPS.md`
- **Spec repo:** `../tidymac-docs/features/TM-WIN-*/spec.md`
- **Validation:** `.\scripts\validate-windows.ps1` or `cargo test --workspace`
- **App data:** `%LOCALAPPDATA%\com.chamrong.tidymac`
