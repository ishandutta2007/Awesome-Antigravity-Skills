---
name: understand-project-yylo
description: Inspects a repository's architecture, dependencies, and validation loops before planning or implementing a requested change, so agent edits stay grounded in how the product actually works. Antigravity port of the YYLO understand-project skill.
license: MIT
compatibility: Google Antigravity >= 1.0.0
---

## Use this skill when
- The user asks to change, extend, or fix a product feature and the codebase is unfamiliar or only partially known.
- Planning work that must respect existing architecture, conventions, and test loops.
- You need a bounded architecture briefing (entry points, dependency paths, validation commands) before proposing an implementation.

## Do not use
- For trivial one-line edits in a file that is already open and understood.
- As a substitute for reading the specific code you are about to edit — this skill frames the investigation, it does not replace it.
- To delay delivery with unbounded exploration; every investigation step must trace back to the requested goal.

## Instructions

### 1. Read the project's own instructions first
- Read `AGENTS.md`, `GEMINI.md`, and `CLAUDE.md` at the repository root (whichever exist) before touching code; they define the working contract.
- Check repository status (current branch, dirty files, recent commits) so the working state is known, not assumed.

### 2. Map only what the goal needs
- Trace the entry points, modules, and runtime paths relevant to the requested change. Do not enumerate the whole tree.
- Use bounded parallel investigation (parallel subagent probes) when independent questions justify it; keep each probe scoped to exactly one question.
- Identify the dependency boundaries the change crosses: internal modules, external packages, network, and storage.

### 3. Find the validation loops
- Identify how the project verifies itself: unit tests, integration tests, linters, type checks, and build steps.
- Run the cheapest loop that covers the area you will touch, and record the baseline result before any edit is made.

### 4. Read the related work items
- If the project tracks tasks or specs (Kanban board, issue tracker, docs/specs), read the items related to the goal.
- Discover the layout from the repository's own instructions; do not assume a fixed path for task metadata.

### 5. Deliver the briefing
- Summarize for the user: the architecture as it affects the goal, dependencies and their versions, validation loops with baseline status, and any constraint found in the project instructions.
- Only then move on to planning or implementing the change.

## Source
Ported for Google Antigravity from [understand-project-yylo](https://github.com/yylo-dev/yylo-skills) in the YYLO skills repository. YYLO ([yylo-dev/yylo](https://github.com/yylo-dev/yylo)) is a command-line orchestrator for coding agents.
