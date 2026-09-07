---
name: skill-porter
description: Imports, converts, and optimizes external agent skills (Claude Code, Cursor, generic LLMs) into native Google Antigravity plugins and skills with parallel invoke_subagent arrays and artifact generation.
license: MIT
compatibility: Google Antigravity >= 1.0.0
---

## Use this skill when
- The user asks to "import skill", "convert skill", "port skill", or "optimize skill for antigravity".
- The user provides a GitHub repository, raw markdown file, or directory containing skills created for Claude Code, Cursor, Codex, or OpenAI.
- Migrating single or multiple third-party agent skills into Google Antigravity standard folder format (~/.gemini/config/skills/ or ~/.gemini/config/plugins/).

## Do not use
- For creating completely new skills from scratch without an existing source skill (use a general skill creator instead).
- For general Antigravity workflow migration that only involves renaming rules (use migrate-workflows instead).

## Instructions

### 1. Identify Target and Mode
Determine the source skill location:
- Local directory or file path
- Remote GitHub repository URL (e.g. https://github.com/owner/repo or tree URL)

### 2. Migration Pipeline
Run the porting process using either the CLI or inline agent commands:

```bash
# Run via python from Pranav-Nexus/antigravity-skill-porter:
python port_skill.py --source "<source-path-or-url>" --dest "~/.gemini/config/skills"
```

### 3. Translation Transformations Applied
1. **Tool Invocation Standardization**:
   - Replaces Claude/Cursor serial subagents with Antigravity parallel invoke_subagent syntax.
   - Maps tool names to Antigravity primitives:
     - View / Read -> view_file
     - Edit / StrReplace -> replace_file_content / write_to_file
     - Bash -> run_command
     - Grep -> grep_search
     - Find -> find_by_name
     - LS -> list_dir
     - WebSearch -> search_web
     - Fetch / Curl -> read_url_content
2. **Context Anchoring**:
   - Replaces CLAUDE.md / CURSOR.md references with GEMINI.md and AGENTS.md.
3. **Artifact Integration**:
   - Rewrites raw code dumps to utilize Antigravity artifacts (ArtifactMetadata, user-facing deliverables).
4. **Plugin Packaging**:
   - Automatically generates valid .claude-plugin/plugin.json or Antigravity plugin manifests when packaging skill collections.

### 4. Verification
After porting:
1. Validate frontmatter schema (name, description).
2. Verify that all referenced scripts or resources exist within the skill directory.
3. Test invoking the skill in an Antigravity prompt.
