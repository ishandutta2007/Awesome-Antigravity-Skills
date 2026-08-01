---
name: universal-clipboard-vision
description: Zero-click image inspection and multi-screenshot visual debugging directly from the native Windows system clipboard (Win + Shift + S) across Antigravity, Claude Code CLI, and Codex sessions without requiring developers to manually save temporary screenshot files to disk.
metadata:
  model: any
---

# Universal AI Clipboard Vision & Screenshot Reader

This skill equips Antigravity, Claude Code CLI, and OpenAI Codex with effortless, zero-click image inspection directly from the native Windows system clipboard (`Win + Shift + S` or `PrintScreen`).

## Use this skill when
* The developer says "check my clipboard", "look at my screenshot", "read my clipboard image", or takes a snip to debug UI, errors, or visual references.
* You need to perform visual regression checks or screenshot debugging without cluttering the project directory with temporary images.

## Do not use this skill when
* The user is referencing an already existing image file saved on their local filesystem (use normal file viewing tools instead).
* The OS environment does not support Windows System Clipboard PowerShell interfaces.

## Instructions

### Step 1: Execute the Extraction Script
When triggered, immediately invoke the companion script using PowerShell to extract whatever image or screenshot is in the OS clipboard to a dedicated temporary cache:

```powershell
powershell.exe -NoProfile -sta -ExecutionPolicy Bypass -File "scripts/save-clipboard-image.ps1"
```

> **Note:** Always include `-sta` (Single-Threaded Apartment) and `-NoProfile`, as Windows OLE Clipboard APIs require an STA model.

### Step 2: Read the Saved Image
Look for the output line from the terminal command:
`SUCCESS_IMAGE_SAVED: <absolute-path-to-image>`
Once saved, use your built-in image reading tool (`view_file` or equivalent vision reader) to load the captured PNG directly into your context and explain or debug what you see!
