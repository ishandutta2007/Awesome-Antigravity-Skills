<!-- 
  Title: NexaCore Plugin Manager
  Description: NexaCore is the next-generation architecture for autonomous AI agents, enabling fast execution and seamless modularity for AI development workflows.
  Keywords: AI, agents, autonomous, modular, plugin manager, node.js, javascript, plugins, extension, architecture, nexacore, ai tools, developer tools
-->

<div align="center">

<img src="./assets/banner.svg" alt="NexaCore Plugin Manager Banner" width="800" />

# 🔮 NexaCore Plugin Manager 🔮

**The Next-Generation Architecture for Autonomous AI Agents**

[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg?style=for-the-badge&logo=githubactions)](https://github.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge&logo=opensourceinitiative)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/Version-v2.0.0-purple.svg?style=for-the-badge&logo=semver)](https://github.com/)
[![Node.js Required](https://img.shields.io/badge/Node.js-%3E%3D20.0-green.svg?style=for-the-badge&logo=nodedotjs)](https://nodejs.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=for-the-badge&logo=github)](https://github.com/)
[![Community](https://img.shields.io/badge/Discord-Join-7289da.svg?style=for-the-badge&logo=discord)](https://discord.com/)

<p align="center">
  <i>Supercharge your development workflow with hyper-optimized, composable modules.</i>
</p>

</div>

---

## ⚡ What is NexaCore?

**NexaCore** (formerly known as Antigravity Skills) is a robust, lightning-fast plugin ecosystem designed from the ground up for modern developers. It empowers developers and AI agents alike to compose, manage, and distribute modular capabilities without friction. 

Whether you are extending an existing CLI or building a brand new autonomous agent, NexaCore acts as the central nervous system for your tools.

---

## 🌌 Key Highlights

<details>
<summary><b>1. 🚀 Blazing Fast Execution</b></summary>
<p>Written entirely in optimized JavaScript, NexaCore ensures zero-latency plugin resolution and execution, minimizing the overhead for your agents.</p>
</details>

<details>
<summary><b>2. 🧩 Seamless Modularity</b></summary>
<p>Every plugin is strictly isolated, yet flawlessly integrated via our <code>core</code> engine, ensuring that breaking changes in one module never impact the whole.</p>
</details>

<details>
<summary><b>3. 🛠️ Intelligent CLI Tooling</b></summary>
<p>Ship with confidence using our built-in CLI that validates, installs, and updates your plugins effortlessly via <code>registry.json</code>.</p>
</details>

---

## 🏗️ Architecture Overview

The NexaCore ecosystem operates on a highly decoupled architecture. The diagram below illustrates how the internal systems interact:

```mermaid
graph TD
    CLI[fa:fa-terminal CLI Entry] -->|Parses Arguments| Core(fa:fa-cogs Core Engine)
    Core -->|Reads| Registry[(registry.json)]
    Core -->|Fetches| Plugins[fa:fa-puzzle-piece Local Plugins]
    
    subgraph Build Phase
        Tools(fa:fa-wrench Build Tools) -.->|Generates| Registry
        Tools -.->|Generates| Pkg[(packages.json)]
        Tools -.->|Generates| Shortcuts[(shortcuts.json)]
    end
```

### Directory Taxonomy

| Directory | Purpose |
|:---:|:---|
| 📂 `core/` | The brain of NexaCore. Contains the schema validator and utility libraries. |
| 📂 `cli-entry/` | Houses the `cli.js` entrypoint for direct terminal invocation. |
| 📂 `plugins/` | The raw source code and metadata for all available agent modules. |
| 📂 `build-tools/` | Build scripts used to dynamically generate the `registry.json` cache. |
| 📂 `specs/` | The comprehensive Node.js test suite ensuring 100% stability. |

---

## 💻 Getting Started

### Installation

NexaCore is deployed as a global package. Simply install it via NPM:

```bash
npm install -g @super-cool/plugin-manager
```

### CLI Quickstart

Manage your environment effortlessly with our CLI:

```bash
# 🔍 Search the registry for a specific tool
ag-skills search "python debugging"

# 📥 Install a plugin to your local agent environment
ag-skills install python-pro

# 🔄 Update an installed plugin
ag-skills update python-pro

# 🏥 Verify the health of your installation
ag-skills doctor
```

> [!TIP]
> **Advanced Users:** You can override the local installation path by setting the `AG_SKILLS_DIR` environment variable before running commands!

---

## 🤝 Contributing

We love contributions! If you're building a new plugin for NexaCore:
1. Fork this repository.
2. Add your plugin under the `plugins/` directory.
3. Ensure you have a valid `SKILL.md` defining your module.
4. Run the build tools (`npm run build:catalog`) to update `registry.json`.
5. Run the specs (`npm run test`) to guarantee everything passes.
6. Open a Pull Request!

---

<div align="center">
  <p>Built with 🩵 by the NexaCore Community</p>
</div>
