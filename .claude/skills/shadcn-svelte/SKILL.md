---
name: shadcn-svelte
description: >-
  Authoritative, version-current docs for shadcn-svelte — the accessible Svelte/SvelteKit
  component library built on Tailwind CSS and Bits UI. Use this skill whenever building,
  styling, theming, or debugging UI in a Svelte or SvelteKit project: installing the CLI,
  configuring components.json, adding or customizing components (Button, Dialog, Card, Form,
  Data Table, Sidebar, etc.), setting up dark mode, theming with CSS variables, migrating to
  Svelte 5 / Tailwind v4, or running a component registry. Reach for this skill even when the
  user just says "add a shadcn component", "build this UI in SvelteKit", "make a form/table/dialog",
  or pastes shadcn-svelte code to fix — it carries the exact, current API and copy-paste snippets
  so you don't guess at component props or import paths.
---

# shadcn-svelte

shadcn-svelte is **not a dependency you install** — it's a collection of accessible,
copy-into-your-codebase components for Svelte/SvelteKit, built on **TypeScript + Tailwind CSS + Bits UI**.
You own the code: components are added to your project via a CLI and live under `$lib/components/ui/`,
so they're yours to edit. This skill bundles the complete official docs (mirrored from
`shadcn-svelte.com/llms.txt`) as local reference files so you work from the exact current API
instead of memory.

## How to use this skill

Your training data for component props, import paths, and CLI flags is likely stale — these change
between releases. **Read the relevant reference file before writing or editing shadcn-svelte code.**
Each reference is self-contained Markdown with copy-paste-ready snippets; you usually only need one.

1. **Setting up a project?** Read the matching file in `references/docs/installation/` first.
2. **Adding/using a component?** Open `references/docs/components/<name>.md` — it has the install
   command, import paths, props, and usage examples.
3. **Theming, dark mode, config, registry, or migration?** See the maps below.

Don't read all references at once — that wastes context. Use the index below to jump to the one
file you need. `references/llms-index.md` is the original upstream index if you need to re-derive a link.

## This project (web-agency) context

This repo builds redesigned sites as **SvelteKit** apps styled with **Tailwind CSS**, so shadcn-svelte
is the default component layer. When converting Google Stitch designs into SvelteKit pages, prefer
shadcn-svelte primitives for the extracted UI (Nav, Footer, Card, etc.) — they're accessible by default
and Tailwind-native, which keeps the generated pages responsive and consistent. Start from
`references/docs/installation/sveltekit.md` and `references/docs/theming.md`.

## Setup & core concepts

| Topic | Reference |
| --- | --- |
| What it is / credits | `references/docs/about.md` |
| Changelog (recent breaking changes) | `references/docs/changelog.md` |
| **CLI** (`add`, `init`, etc.) | `references/docs/cli.md` |
| `components.json` config | `references/docs/components-json.md` |
| JavaScript (non-TS) usage | `references/docs/javascript.md` |
| **Theming** (CSS variables) | `references/docs/theming.md` |
| Legacy docs (Tailwind v3) | `references/docs/legacy.md` |

## Installation (by framework)

| Framework | Reference |
| --- | --- |
| **SvelteKit** (default here) | `references/docs/installation/sveltekit.md` |
| Vite | `references/docs/installation/vite.md` |
| Astro | `references/docs/installation/astro.md` |
| Manual | `references/docs/installation/manual.md` |

## Dark mode

| Setup | Reference |
| --- | --- |
| Svelte / SvelteKit | `references/docs/dark-mode/svelte.md` |
| Astro | `references/docs/dark-mode/astro.md` |

## Migration

| From → To | Reference |
| --- | --- |
| Svelte 4 + Tailwind 3 → Svelte 5 | `references/docs/migration/svelte-5.md` |
| → Tailwind v4 (with Svelte 5) | `references/docs/migration/tailwind-v4.md` |

## Registry (publish/distribute your own components)

| Topic | Reference |
| --- | --- |
| Getting started | `references/docs/registry/getting-started.md` |
| Examples | `references/docs/registry/examples.md` |
| `registry.json` schema | `references/docs/registry/registry-json.md` |
| `registry-item.json` spec | `references/docs/registry/registry-item-json.md` |
| FAQ | `references/docs/registry/faq.md` |

## Components

All component docs live in `references/docs/components/<name>.md`. Match the user's UI need to a
component below, then read that one file. (File name is the kebab-case of the component.)

### Form & Input
`button` · `button-group` · `calendar` · `checkbox` · `combobox` · `date-picker` · `field` ·
`form` (Formsnap + Superforms + Zod) · `input` · `input-group` · `input-otp` · `label` ·
`native-select` · `radio-group` · `select` · `slider` · `switch` · `textarea`

### Layout & Navigation
`accordion` · `breadcrumb` · `navigation-menu` · `resizable` · `scroll-area` · `separator` ·
`sidebar` · `tabs`

### Overlays & Dialogs
`alert-dialog` · `command` · `context-menu` · `dialog` · `drawer` · `dropdown-menu` ·
`hover-card` · `menubar` · `popover` · `sheet` · `tooltip`

### Feedback & Status
`alert` · `badge` · `empty` · `progress` · `skeleton` · `sonner` (toasts) · `spinner`

### Display & Media
`aspect-ratio` · `avatar` · `card` · `carousel` · `chart` (LayerChart) · `data-table` (TanStack Table) ·
`item` · `kbd` · `table` · `typography`

### Misc
`collapsible` · `pagination` · `range-calendar` · `toggle` · `toggle-group`

## Quick reference: adding a component

The CLI copies the component source into your project. From a configured SvelteKit project:

```bash
# pnpm
pnpm dlx shadcn-svelte@latest add button
# npm
npx shadcn-svelte@latest add button
```

Then import from your local UI directory (not a node_modules package):

```svelte
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<Button variant="outline">Click me</Button>
```

Exact import paths, available `variant`/`size` props, and composition patterns differ per component —
always confirm against the component's reference file before relying on them.
