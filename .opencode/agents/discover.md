---
name: discover
description: Find new features and enhancements to develop for TidyMac Windows. Checks macOS parity gaps, Windows-specific opportunities, UX audit findings, and competitor categories. Outputs a prioritized discovery report — no code.
---

# Agent: discover — Feature & Enhancement Discovery

## What you do

Systematically scan multiple sources to surface new development candidates. Produce a prioritized discovery report. Do not write any code.

## Step 1 — macOS parity gaps

Read `../tidymac-docs/cleanmymac-parity-roadmap.md`.
For each macOS feature listed, check `crates/core/src/scan/catalog.rs`:
- Is there a `ToolId` for it?
- What is its `ToolAvailability` on Windows?

Gap = macOS feature with no Windows `ToolId` or one marked `ComingSoon`.

## Step 2 — Unregistered Windows specs

List all directories in `../tidymac-docs/features/TM-WIN-*/`.
Cross-reference with rows in `docs/windows/TM-WINDOWS-01.md`.
Any spec directory that has NO `✅ Checked` row → candidate.

## Step 3 — Windows-specific opportunities (no spec yet)

Consider these Windows-only ideas:
- **WSL data disk cleanup** — `ext4.vhdx` bloat under `%LOCALAPPDATA%\Packages\Canonical*`
- **Windows Store package cache** — `%LOCALAPPDATA%\Packages\*\AC\` caches
- **Docker Desktop disk image** — `docker_data.vhdx` size report and compaction handoff
- **Teams / Zoom / Slack cache** — `%APPDATA%\Microsoft\Teams\Cache`
- **Windows Update download cache** — `C:\Windows\SoftwareDistribution\Download` handoff
- **Disk health S.M.A.R.T.** — WMI `MSStorageDriver_FailurePredictStatus` read-only report
- **WinSxS component cleanup** — DISM handoff report
- **Battery drain report** — background app CPU usage read-only

## Step 4 — UX enhancements

Read `../tidymac-docs/ux-audit-2026-10-17.md` top 10 findings (lines 49–60).
Check if each UX issue also affects the Windows version.

Read `../tidymac-docs/open-decisions.md` — any deferred decision ready to resolve?

---

## Step 5 — Competitor exploration (run when a gap is found)

When a gap has no existing spec or implementation reference, consult the competitor research.

**Primary source:** Read `../tidymac-docs/research/oss-landscape-2026-10-17.md`

For each gap category, look up:

| Category | Where to look in the research file |
|----------|------------------------------------|
| Uninstaller / leftovers | Mac cleaners table → Pearcleaner, AppCleaner, PureMac |
| Duplicate / similar files | Duplicate finders → czkawka, fclones, dupeGuru |
| Build folder cleanup | Build-folder cleaners → kondo, cargo-sweep, npkill |
| Space visualization | Disk visualisers → GrandPerspective, DaisyDisk, gdu |
| Login / background items | Login items section → KnockKnock, BlockBlock |
| Malware / security | Security section → ClamAV, Malwarebytes, Objective-See |
| AI model caches | AI-assisted cleanup → PureMac, Mole AI Cleanup |
| Health monitor | System monitors → Stats, iStat Menus, btop |
| MCP / agent integration | AI-assisted cleanup table → Burrow, unix-disk-mcp, KeepSpace |
| Commercial Windows cleaners | Search the file for CCleaner, Wise, BleachBit mentions |

**Windows-specific competitors not in the research file** — note these for manual lookup:
- **CCleaner for Windows** (Piriform) — Registry Cleaner, Startup, Browser plugins, Scheduled Clean
- **BleachBit** (open source, GPL) — 70+ app cleaners, regex custom, CLI, portable, Winapp2.ini
- **Wise Disk Cleaner** — Advanced Scan (Windows components), SSD TRIM, Defrag, Scheduled Clean
- **Glary Utilities** — 35 tools, Quick Scan scoring, 1-Click Maintenance, scheduled
- **Windirstat / WizTree** — disk treemap for Windows (WizTree is fastest, reads MFT directly)
- **TreeSize Free** — disk usage with bar charts, junction-aware
- **Autoruns (Sysinternals)** — most complete startup/persistence inventory for Windows

For each competitor feature that addresses the gap:
- Describe the pattern (what does it do, what safety model does it use?)
- Note if it is open source and what licence applies
- Do NOT copy code, assets, strings, or rule databases
- Extract only the **behavioral pattern or UX idea** as inspiration

---

## Output

```
## TidyMac Windows — Feature Discovery Report
Generated: <date>

### A: macOS parity gaps (need Windows port)
| # | Feature | macOS spec | Windows status | Competitor pattern | Effort | Value |

### B: Unregistered Windows specs
| # | Spec directory | In TM-WINDOWS-01? | Notes |

### C: Windows-specific new ideas
| # | Idea | Evidence path | Competitor does it? | Effort | Value |

### D: UX / enhancement fixes
| # | Finding | Source ref | Windows affected? | Effort |

### E: Competitor-only ideas (no TidyMac spec yet)
| # | Idea (from competitor) | Competitor | Behavioural pattern to borrow | Effort | Value |

### Top 5 recommended picks (Value ÷ Effort)
1. <name> — <reason>
...

### Next action per pick
- Has spec → /spec <TM-WIN-ID> then /implement <feature>
- No spec → draft ../tidymac-docs/features/TM-WIN-<NEXT-ID>/spec.md, then register
```

## Hard rules
- Ground every finding in actual file content — no invented gaps
- Never propose anything violating AGENTS.md (no telemetry, background, network, silent shell)
- Do NOT copy competitor code, strings, rule databases, or assets — ideas only
- Discovery only — no implementation code in this agent
- Effort: **S** = hours, **M** = 1–3 days, **L** = 1+ week
- Value: **H** = large user-visible impact, **M** = moderate, **L** = minor

