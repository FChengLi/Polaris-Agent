# Polaris Agent

## Product

Polaris Agent is a local AI Agent Harness with an Electron desktop workspace, a React frontend, and a Python Host connected over JSON-RPC. Product facts are grounded in README.md and the existing application.

## Users and work

The workspace supports sustained conversation, planning, tool execution, and inspection of ongoing work. Users need to read responses, switch conversations, inspect runs and approvals, and configure models and extensions.

## Existing capabilities

- Conversations, streaming responses, reasoning and tool status; normal and plan modes.
- Run lifecycle, checkpoints, interruption, recovery, usage, evidence and traces.
- Approvals, automations, artifacts, computer operations, memory, skills and MCP configuration.
- OpenAI, DeepSeek, Qwen and Anthropic provider settings.

## Confirmed redesign constraints

- Preserve existing functionality and business behavior. The requested change is visual.
- Prioritize icon consistency, sidebar, conversation area, typography and spacing.
- The user selected cool white surfaces, graphite text and star blue accents.
- Use Impeccable and Taste Skill to avoid generic AI interface styling and establish a coherent visual system.

## Platform constraints

The desktop frontend must continue to load bundled assets in Electron. Fonts are local assets with their licenses. Preserve automatic dark appearance and support narrower window widths. Do not require network font requests.

## Product name

The user confirmed Polaris Agent (北极星智能体). The interface uses the new name and a subdued blue-and-white North Star emblem generated with image_gen and explicitly selected by the user. Existing internal identifiers, RPC protocols and data/profile locations remain compatible. The user also requested Apple-like interface typography; use native Apple system faces on macOS and bundled Inter/Noto Sans SC elsewhere.

Latest visual confirmation: use the user-selected blue circular North Star badge, with no letter P. Match application accents to the logo and use neutral graphite/slate in dark appearance. This supersedes the initial green palette. The later glowing logo variant was not selected.
