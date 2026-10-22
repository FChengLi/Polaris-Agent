---
name: Polaris Agent
description: Local agent workspace in cool white, graphite and star blue.
colors:
  ground: "#f3f5f8"
  surface: "#ffffff"
  raised: "#f6f8fb"
  active: "#e7edf5"
  ink: "#263141"
  muted: "#647185"
  line: "#e2e7ee"
  control: "#c7d0dc"
  accent: "#376fa6"
  accent-soft: "#eaf1fa"
  danger: "#a83e3e"
  success: "#376fa6"
  warning: "#865f22"
  notice: "#fbf4e4"
  negative-soft: "#f9eded"
  code-bg: "#17202d"
  code-ink: "#edf2fa"
  dark-ground: "#141820"
  dark-surface: "#1b2029"
  dark-raised: "#232a35"
  dark-active: "#2c3747"
  dark-ink: "#e9edf5"
  dark-muted: "#a6b1c3"
  dark-line: "#333d4c"
  dark-control: "#5b6c84"
  dark-accent: "#94bdf4"
  dark-accent-soft: "#243853"
  dark-danger: "#eeaaaa"
  dark-success: "#94bdf4"
  dark-warning: "#e0c386"
  dark-notice: "#363128"
  dark-negative-soft: "#3b2930"
  dark-code-bg: "#11161e"
  dark-code-ink: "#e9edf5"
  accent-hover: "#2b5987"
  dark-accent-hover: "#bed6fa"
  dark-primary-ink: "#14243c"
typography:
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"Inter\", \"PingFang SC\", \"Noto Sans SC\", \"Microsoft YaHei UI\", sans-serif"
    fontSize: "26px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "-.025em"
  page-title:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"Inter\", \"PingFang SC\", \"Noto Sans SC\", \"Microsoft YaHei UI\", sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-.02em"
  workspace-title:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"Inter\", \"PingFang SC\", \"Noto Sans SC\", \"Microsoft YaHei UI\", sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: 1.4
  section-title:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"Inter\", \"PingFang SC\", \"Noto Sans SC\", \"Microsoft YaHei UI\", sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: 1.5
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"Inter\", \"PingFang SC\", \"Noto Sans SC\", \"Microsoft YaHei UI\", sans-serif"
    fontSize: "14px"
    lineHeight: 1.5
  conversation:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"Inter\", \"PingFang SC\", \"Noto Sans SC\", \"Microsoft YaHei UI\", sans-serif"
    fontSize: "15px"
    lineHeight: 1.8
  control:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"Inter\", \"PingFang SC\", \"Noto Sans SC\", \"Microsoft YaHei UI\", sans-serif"
    fontSize: "13px"
    lineHeight: 1.4
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"Inter\", \"PingFang SC\", \"Noto Sans SC\", \"Microsoft YaHei UI\", sans-serif"
    fontSize: "12px"
  metadata:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"Inter\", \"PingFang SC\", \"Noto Sans SC\", \"Microsoft YaHei UI\", sans-serif"
    fontSize: "11px"
  code:
    fontFamily: "\"IBM Plex Mono\", Consolas, monospace"
    fontSize: "12px"
    lineHeight: 1.65
rounded:
  control: "8px"
  panel: "16px"
  status: "5px"
  user-message: "14px"
  code: "10px"
  inline-code: "4px"
spacing:
  step-4: "4px"
  step-8: "8px"
  step-12: "12px"
  step-16: "16px"
  step-20: "20px"
  step-24: "24px"
  step-28: "28px"
  step-32: "32px"
  step-36: "36px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.surface}"
    rounded: "{rounded.control}"
    padding: "7px 12px"
    typography: "{typography.control}"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "{colors.surface}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "7px 12px"
    typography: "{typography.control}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "7px"
    size: "32px"
  button-danger:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.danger}"
    rounded: "{rounded.control}"
    padding: "7px 12px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "9px 11px"
  navigation:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.control}"
    padding: "0 12px"
    height: "40px"
  navigation-active:
    backgroundColor: "{colors.active}"
    textColor: "{colors.ink}"
  status:
    backgroundColor: "{colors.active}"
    textColor: "{colors.muted}"
    rounded: "{rounded.status}"
    padding: "3px 6px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "20px"
  composer:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "12px"
    width: "min(760px, calc(100% - 56px))"
  conversation-row:
    backgroundColor: "{colors.active}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px 10px"
---
# Design System: Polaris Agent

## Overview

**Creative North Star: "Framed sheet"**

The framed sheet gives sustained reading and execution a quiet working surface. Cool white content sits inside a neutral frame; graphite carries the prose and star blue marks primary actions, links and meaningful state. Controls stay compact and typography stays readable across navigation, conversations and settings.

This records the implemented desktop workspace, not a pre-build approval. The user confirmed the palette and preserved functionality; the Taste direction is framed-sheet (seed 936329351). The Impeccable direction record explicitly discloses its retrospective provenance. The shipped stylesheet takes precedence over the direction catalog.

**Key Characteristics:**

- Neutral frame and inset cool white sheet.
- Apple-style system typography with bundled Inter and Noto Sans SC fallbacks.
- Flat reading surfaces with sparse functional elevation.
- Consistent Lucide strokes and a Polaris North Star product mark.
- Responsive rails, conversation drawer and automatic dark appearance.

## Colors

Cool white and cool neutral tones establish the hierarchy; graphite carries text and star blue carries action. Exact values are normative in frontmatter, extracted from `desktop/src/workspace.css`.

### Primary

- **Star blue** (`accent`): primary buttons, links, carets and focus outlines; the Polaris mark retains its own blue-and-white artwork. `accent-hover` is the primary hover state; `accent-soft` supports semantic status.
- **Success** (`success`): the connected-service dot. It deliberately shares the blue accent value.

### Neutral

- **Cool frame** (`ground`): application chrome and navigation.
- **Cool sheet** (`surface`): main work area, cards, inputs and dialogs.
- **Raised paper** (`raised`): conversation rail, user messages and supporting data surfaces.
- **Neutral selection** (`active`): selected and hovered navigation or conversation rows.
- **Graphite** (`ink`) and **muted graphite** (`muted`): primary reading and supporting labels.
- **Hairline** (`line`) and **control edge** (`control`): large surface dividers and interactive boundaries.
- **Code background/ink** (`code-bg`, `code-ink`): deliberately dark code panels in either scheme.

### Semantic states and automatic dark appearance

`danger` with `negative-soft` marks failure or denial. `warning` with `notice` marks paused, interrupted and attention states. Text labels accompany status color. These are functional signals, not additional brand accents.

The OS dark preference overrides every base color through the same CSS variable names. Frontmatter `dark-*` entries record those values; remove that prefix to find the runtime variable. Dark primary buttons use `dark-primary-ink`, with `dark-accent-hover` on hover. Component examples use live variables and literal fallbacks; the runtime stylesheet owns scheme switching.

**The Sparse Accent Rule.** Use star blue for primary actions, links and semantic state; keep navigation selection and general working surfaces neutral.

## Typography

**Body and heading font:** Native Apple system faces and PingFang SC when available; bundled Inter and Noto Sans SC provide the Windows fallback. The exact stack is `-apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", "PingFang SC", "Noto Sans SC", "Microsoft YaHei UI", sans-serif`. This creates an Apple-like text rhythm without redistributing Apple fonts.

**Code font:** IBM Plex Mono, followed by Consolas and monospace. Local assets in `desktop/public/fonts/` provide variable Inter and Noto Sans SC (100–900) plus Plex Mono regular (400), with `font-display: swap`. `OFL-Inter.txt`, `OFL-NotoSansSC.txt` and `OFL-Mono.txt` carry their SIL Open Font Licenses. Keep the files and licenses together; Electron loads these bundled assets without network font requests.

The pairing is compact and practical: sans text supports long bilingual reading, while mono distinguishes code and technical data. No display typeface or ratio-based scale is present.

### Hierarchy

- **Headline:** the welcome title uses `headline`; starter headings use 24px at weight 500. Narrow welcome/starter titles reduce to 24px/22px.
- **Page title:** `page-title`; narrow screens reduce it to 20px.
- **Workspace title / section title:** corresponding frontmatter roles; narrow workspace titles reduce to 15px.
- **Body:** `body` for the application; `conversation` for assistant prose. User prose shares the conversation sizing inside a raised bubble.
- **Control / label / metadata:** corresponding roles distinguish 13px controls, 12px labels and 11px details without uppercase decoration.
- **Code:** `code`; raw run-event data reduces to 11px. Inline code is .88em with a small neutral fill.

**The Reading Rule.** Assistant prose stays directly on the sheet, with the conversation type role and the 760px reading column; user messages alone receive the raised bubble.

## Layout

The desktop frame is shared by navigation and the top bar. The sheet is inset 8px from the right and bottom edges, bounded by a single hairline. Navigation is 200px wide, the conversation rail 236px, and the top bar 48px high. Conversation rail and workspace headers are 74px high. Pages use 24px vertical and 28px horizontal content padding.

Messages center on a 760px reading width using a minimum 28px side gutter, 36px vertical padding and 32px between messages. The composer aligns to that reading width. Shared cards use 20px padding and 16px grid gaps. Spacing is predominantly the observed four-pixel rhythm, with smaller control adjustments kept local.

- **At 1200px and below, above 760px:** navigation becomes 168px and the conversation rail 212px; settings and memory columns stack.
- **At 1000px and below, above 760px:** navigation becomes a 64px icon rail and the conversation rail 208px; labels are hidden while accessible names and titles remain.
- **At 760px and below:** the outer inset disappears, the sheet loses its side/bottom edge and corners, the top bar becomes 44px, and navigation moves to a bottom strip with a 56px minimum height. The conversation rail becomes a sliding drawer between top and bottom bars, up to 300px wide with a 40px viewport allowance. Messages use 16px side gutters, 24px vertical padding and 24px gaps. Fields stack; key composer controls increase to 40px minimum height. Safe-area bottom padding is retained.

## Elevation & Depth

The main sheet, shared cards and assistant messages have no shadow. Tonal steps and hairlines define those surfaces. Soft ambient elevation remains on the composer and temporary UI; there is no backdrop blur.

### Shadow Vocabulary

- **Composer:** `0 5px 18px #26314108`.
- **Dialog / command palette:** `0 18px 64px #171e2330`.
- **Toast:** `0 6px 24px #26314114`.
- **Connection banner:** `0 4px 12px #2631410d`.
- **Narrow conversation drawer:** `8px 0 24px #26314118`.

The modal and drawer scrim is `#26314142`; it dims rather than blurs the workspace.

**The Sheet Rule.** The main sheet and shared cards remain shadowless. Reserve the documented soft shadows for the composer, overlays and transient feedback.

## Shapes

Broad work surfaces use the panel radius; controls and selected rows use the smaller control radius. Status tags use a compact 5px corner, user messages a 14px corner, code panels 10px and inline code 4px. Borders are generally 1px; section dividers remain lighter than control edges. The product mark is the selected blue circular badge and white North Star PNG, displayed in its original colors, separate from action icons.

## Components

### Buttons

Compact and steady. Standard buttons use the control radius, 7px × 12px padding and a 34px minimum height. Primary uses blue and cool sheet text; secondary uses sheet, graphite and a control edge. Ghost icons use transparent backgrounds and 32px minimum dimensions. Destructive actions use danger text; explicit destructive confirmation uses a filled danger treatment. Disabled controls retain their shape at .55 opacity.

Hover changes background and border without translation. Standard color transitions are 150ms ease-out. Keyboard focus is a 2px accent outline offset 3px. Primary hover uses the explicit scheme-specific hover color; generic active fill is neutral selection.

### Chips / status tags

Small and descriptive, with 3px × 6px padding, the status radius and 11px text at 1.4 line height. Neutral tags use selection/muted; running and successful states share accent-soft/accent; failure uses negative-soft/danger; paused or interrupted uses notice/warning. Preserve the visible state label.

### Cards / containers

Shared cards, approvals, memory cards, settings sections and observation panels use the panel radius, sheet background, a hairline and 20px padding without shadow. Their titles use the section role; descriptions use 13px with 1.8 line height. Narrow settings and approval panels reduce padding to 16px.

### Inputs / fields

Sheet background, graphite text, a control edge, control radius and 9px × 11px padding. Labels are muted at 12px with an 8px gap. Focus shares the standard outline. Error messages use the negative semantic pairing; selection controls use the accent. The composer textarea relies on the parent focus border rather than its own outline.

### Navigation

Navigation rows are 40px high with 12px horizontal padding and 12px icon/text gaps. Default text is muted; hover and selection use neutral selection/graphite, with active weight 500. Lucide interface icons use a consistent 1.65 stroke, typically 18px in navigation. The responsive rail and bottom strip retain their existing accessible names and selected state.

### Conversation and composer

Assistant text is unboxed with a transparent avatar; user messages use raised paper and a user-message corner. Code and tables can scroll horizontally. Selected conversation rows use neutral selection, 12px × 10px primary row padding and an 8px corner; supporting metadata is 11px.

The composer uses a control edge, panel radius, 12px padding and its documented faint shadow. Focus-within turns the edge blue. Textarea text is 14px/1.7 with a 72px minimum height; the narrow minimum is 64px. The mode control uses raised paper and muted 12px text.

### Motion

Keep state changes functional: 150ms ease-out color transitions, a 220ms `cubic-bezier(.2,.8,.2,1)` drawer movement inherited from the base stylesheet, and a one-second linear loading spin. The reduced motion preference disables transitions, animations and smooth scrolling. No new decorative motion is established here.

## Do's and Don'ts

### Do:

- **Do** preserve the cool white, graphite and star blue roles in both automatic color schemes.
- **Do** use native Apple system fonts where available, bundled Inter/Noto Sans SC elsewhere and keep the shipped font licenses.
- **Do** use Lucide interface icons with a 1.65 stroke and keep the Polaris North Star emblem for product identity.
- **Do** preserve visible keyboard focus, semantic status text and reduced motion behavior.
- **Do** keep long assistant output flat, readable and horizontally safe for code and tables.

### Don't:

- **Don't** add a shadow beneath the main sheet or shared cards.
- **Don't** add hover translation to standard buttons; their states change color and border.
- **Don't** replace the interface icon set with emoji, text glyphs or unrelated icon families.
- **Don't** depend on network font requests or replace the Chinese fallback with a Latin-only stack.
- **Don't** promote a direction catalog value over the value implemented in the stylesheet.

Evidence: `desktop/src/workspace.css` loaded after `styles.css` by `main.tsx`; sampled `App.tsx`, `PolarisMark.tsx`, base layout/motion and `runExplorer.css`; `PRODUCT.md`; bundled font files/licenses. Not canonized: the legacy raw-event disclosure still uses CSS text glyphs; that isolated inherited implementation is not an icon rule and was not repaired in this documentation pass.

Brand update (2026-10-22): user confirmed Polaris Agent and requested a simple, subdued image-generated logo and Apple-like interface fonts. The transparent source is `desktop/public/brand/polaris-north-star.png`; `PolarisMark.tsx` renders the original blue-and-white artwork directly. The favicon uses the same PNG. Generation prompt: `desktop/public/brand/polaris-north-star.png.json`.

Palette update (2026-10-22): the user rejected green-tinted dark surfaces and selected the earlier blue/white North Star image over the later glowing version. The final dark palette uses neutral graphite/slate surfaces and blue accents; the light palette uses cool white and the same blue family. The user allowed gradients/glow for logo exploration, but selected the quieter version. Desktop, executable and window icons use `polaris-north-star.ico`.

Windows title bar: a 36px theme-matched draggable strip with the North Star and product name. Native caption buttons keep Windows snap layouts. The default application menu is removed on Windows.
