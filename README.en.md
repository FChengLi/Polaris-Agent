<div align="center">
  <img src="desktop/public/brand/polaris-north-star.png" width="88" alt="Polaris Agent North Star logo" />
  <h1>Polaris Agent</h1>
  <p>A local agent project I am building while learning how agents work.</p>
  <p><a href="README.md">简体中文</a> · English</p>
</div>

## About this project

While learning about agents, I wanted to connect conversations, tool calls, task execution, and a desktop interface myself. That became Polaris Agent.

This repository is a record of my learning and experiments. I will update it from time to time as I learn, try new capabilities, and improve the implementation. It is a personal experimental project; features and interfaces may change. Questions, issues, and suggestions are welcome.

## Preview

![Polaris Agent dark workspace](docs/images/workspace-dark.png)

*The preview contains demonstration conversation content. The app follows the system light or dark appearance. The interface is currently primarily in Chinese.*

## What is implemented

- **Conversations and tools**: streaming responses, reasoning fragments, tool progress, normal and plan modes.
- **Run history**: execution steps, checkpoints, usage and traces, with interruption and recovery.
- **Approvals**: confirmation for sensitive actions, plus an independent always-on-top window for computer operations.
- **Automations**: one-time, interval, and Cron tasks.
- **Artifacts**: display, preview, and download files and links.
- **Memory and ongoing tasks**: core memory, cross-conversation search, post-run reflection, and tasks with steps. New memories require review; goals, constraints, and acceptance criteria are versioned.
- **Project Wiki and knowledge review**: sourced project facts and experience, with review, revision history, and quarantine. Agents can retrieve active entries on demand.
- **Extensions**: Skill installation and management, MCP Server configuration and import. Learned Skills require review before installation and support version restoration.
- **Model configuration**: OpenAI, DeepSeek, Qwen, and Anthropic.
- **Experimental computer use**: a native macOS helper for screenshots, accessibility observations, clicks, typing, and window focus.

These capabilities are still evolving. Availability depends on the model, system permissions, and platform.

## Feature update — October 28, 2026

Added project Wiki, knowledge review, Skill version restoration, and task specification management. Improved automatic conversation titles and chat status updates. See the [changelog](CHANGELOG.md).

In Settings, select **知识审核** (Knowledge Review) to manage Wiki entries, long-term memory, Skill review and versions, and task specifications. Review checks cover relevance, sources, applicability, sensitive information, and prompt injection. Pattern checks only flag some obvious risks; factual verification still requires a person.

**Existing data**: database upgrades create a backup first. Legacy unreviewed long-term and core memories are retained as candidates and require approval before reuse in later tasks. Conversations and run records are retained. New task runs bind to the current specification revision; existing runs keep their original version after a user revises the goal.

Wiki search currently uses keyword matching and scopes entries by workspace path. This update does not introduce a vector database or LangChain / LangGraph dependencies.

## Structure

```text
desktop/                     React + TypeScript + Vite / Electron desktop app
backend/kore_next/           Python Host: agent, tools, memory, approvals, scheduling
backend/tests/               Backend tests
native/macos-computer-helper/ Swift computer-use helper
scripts/                     Windows startup, icon, and shortcut scripts
docs/                        Project preview assets
```

The desktop app communicates with the local Python Host through WebSocket JSON-RPC. The default service is `127.0.0.1:8765`, exposing `/health` and `/rpc`.

## Quick start (Windows)

Install **Python 3.12 with the py launcher**, **Node.js 20+**, and npm. Then run in PowerShell:

```powershell
git clone https://github.com/FChengLi/Polaris-Agent.git
cd Polaris-Agent
Set-ExecutionPolicy -Scope Process Bypass
.\scripts\start.ps1
```

The script creates a Python virtual environment, installs missing dependencies, and starts the backend and Electron. Initial installation needs network access. Unless `ELECTRON_MIRROR` is set, the script downloads Electron through npmmirror.

Open Settings in the app to configure your model, endpoint, and API key. Alternatively, edit `backend/.env`, created from the example on the first launch.

### Desktop shortcut

```powershell
.\scripts\build-windows-launcher.ps1
.\scripts\create-desktop-shortcut.ps1
```

You can then open **Polaris Agent** from your desktop. The generated `Polaris Agent.exe` launches the local source project and requires its directory and runtime dependencies. It is not a standalone installer, and generated executables are not committed.

### Manual development setup

The backend supports Python 3.11+. The Windows startup script specifically uses Python 3.12. Run these two groups in separate terminals:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\python -m pip install -r requirements-dev.txt
Copy-Item .env.example .env # Only if .env does not already exist
.\.venv\Scripts\python -m kore_next.server
```

```powershell
cd desktop
npm ci
npm run electron:dev
```

On macOS, create the environment with `python3` and use `.venv/bin/python` for the backend, then run the same desktop commands. For browser-only development, use `npm run dev`.

## Configuration and local data

See [`backend/.env.example`](backend/.env.example) for the base configuration. For example, with Qwen:

```dotenv
KORENEXT_PROVIDER=qwen
KORENEXT_MODEL=qwen-plus
KORENEXT_API_KEY=YOUR_API_KEY
KORENEXT_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
```

| Setting | Purpose / default |
| --- | --- |
| `KORENEXT_DATA_DIR` | Runtime data; `backend/.koreagent-next` |
| `KORENEXT_WORKSPACE_DIR` | Working files; `backend/workspace` |
| `KORENEXT_USER_SKILLS_DIR` | User Skills; `~/.koreagent-next/skills` |
| `KORENEXT_HOST` / `KORENEXT_PORT` | Local address; `127.0.0.1:8765` |
| `KORENEXT_SEARCH_PROVIDER` | `auto`, `duckduckgo`, or `tavily` |
| `KORENEXT_TAVILY_API_KEY` | Optional Tavily search key |
| `KORENEXT_COMPUTER_ENABLED` | Enable macOS computer use; `false` |

The Python package name, `KORENEXT_` configuration prefix, and some internal paths retain earlier names for compatibility with existing data.

Environment files, databases, conversations, personal working files, dependencies, and build outputs are excluded from version control. Run records may contain model inputs, tool results, and local paths. Review logs and traces before sharing them.

## macOS computer use

A Swift toolchain is required. Build and test the helper:

```bash
cd native/macos-computer-helper
swift build -c release
swift test
```

Set `KORENEXT_COMPUTER_ENABLED=true` and grant Accessibility and Screen Recording permissions when prompted. The computer-use helper currently supports macOS only.

## Current limitations

- This is a learning project with no production reliability guarantee.
- Without the workspace sandbox required by this project, Windows refuses Shell and default MCP processes that require isolation. Explicitly configuring MCP filesystem access as `host` and network access as `allowed` enables host mode. Tool calls still require approval; host mode provides no isolation.
- HTTP tools reject private-network destinations by default. `KORENEXT_HTTP_ALLOW_PRIVATE_NETWORK=true` lifts that restriction.
- Model APIs generally require your own credentials and may incur provider charges.

## Development checks

Run these from their respective directories:

```powershell
# backend/ (install requirements-dev.txt first)
.\.venv\Scripts\python -m pytest
.\.venv\Scripts\python -m ruff check .
.\.venv\Scripts\python -m compileall -q kore_next

# desktop/
npm test
npm run build
```

GitHub Actions is configured for backend tests and static checks, desktop tests and builds, and macOS Swift tests.

## Feedback and licensing

Issues are welcome. Include reproduction steps and your system environment, and leave out credentials and private conversations.

No open-source license has been selected for the project code yet. A public repository does not itself grant redistribution or commercial-use rights. Third-party dependencies and fonts retain their own licenses; bundled font licenses are in [`desktop/public/fonts/`](desktop/public/fonts/). Interface icons use Lucide. The North Star logo was created with an image-generation tool; its prompt is recorded alongside the brand assets.
