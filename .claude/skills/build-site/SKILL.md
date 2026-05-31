---
name: build-site
description: >-
  End-to-end orchestrator for the web-agency pipeline: turn a target website/business URL plus a
  prompt into a brand-new, deployed SvelteKit site. Use this skill whenever the user wants to spin
  up / build / generate / redesign a website from a URL — e.g. "spin up a site for acme.com",
  "redesign this business's site", "build me a landing page from https://…", "make a new site like
  X but modern", or kicks off a build from their phone via remote-control. It sequences the
  project's existing skills (Firecrawl scrape → plan → create-app scaffold → Google Stitch designs
  → SvelteKit+Tailwind build → Vercel deploy). Reach for it for the whole flow; for a single stage
  (just scraping, just deploying) use that stage's dedicated skill directly.
---

# build-site

This is the orchestrator for the **web-agency** pipeline described in the repo `README.md`. It does
**not** reimplement any step — it sequences the project's existing skills and tools, applying the
repo's conventions. Given a **target URL** and a **prompt/brief**, it produces a new SvelteKit app in
`apps/<name>` and deploys it to Vercel.

Run the stages in order. Each stage names the skill/tool to use — invoke that skill and follow it.
Confirm the resolved app name, template, and target URL with the user before scaffolding, since those
are hard to change later.

## Requirements (non-negotiable)

This skill runs the **full pipeline, every time** — including for "simple" sites. The whole point is
that every site is produced the same way, with real artifacts at each step.

- **Run all six stages in order. None is optional**, and none may be merged, shortcut, or skipped.
- **Use the named tool for each stage — no substitutes, no hand-rolled fallbacks.** In particular:
  scrape with **Firecrawl** (never WebFetch, `curl`, or manual browsing); design with **Google
  Stitch** (never hand-author pages in place of generated Stitch designs).
- **Persist artifacts to disk** under `apps/<name>/designs/` (stages 1 and 4) so every build is
  reproducible and reviewable — never leave scraped content or designs living only in the chat.
- **If a required tool or credential is missing, STOP. Do not adapt around it.** Tell the user exactly
  what to set up (see Preflight) and wait for them to do it — never silently downgrade to a lesser
  method. Adapting a stage away is a failure, not a workaround.

## Preflight — verify before you start

Check all of these up front. **Abort at the first failure** with the exact fix; do not begin a stage
whose tool isn't confirmed.

| Capability | Check | If missing — require the user to |
| --- | --- | --- |
| **Firecrawl** (stage 1) | `firecrawl` CLI available and `FIRECRAWL_API_KEY` set (see the `firecrawl` skill) | install/authenticate Firecrawl and set `FIRECRAWL_API_KEY`, then re-run |
| **Google Stitch** (stage 4) | Stitch MCP / `stitch-*` skills reachable | connect Google Stitch access, then re-run |
| **Vercel** (stage 6) | `vercel whoami` succeeds | run `vercel login`, then re-run |

If a prerequisite is missing, stop and say so plainly, e.g.: *"Can't continue — the scrape stage
requires Firecrawl, which isn't set up. Set `FIRECRAWL_API_KEY` (and install the Firecrawl CLI), then
re-run."* Do not proceed with a substitute.

## Inputs

- **Target URL** (required) — the site/business to scrape from.
- **Prompt / brief** (required) — what the new site should be.
- **App name** (optional) — kebab-case; otherwise derive one from the brand/URL and confirm it.
- **UI flavor / template** (optional) — see template selection below.
- **Page count** (optional) — default **3** high-impact pages.

## Template selection (default: vanilla Tailwind)

Every template is SvelteKit + TailwindCSS; they differ only by UI flavor.

- If the user explicitly asks for a flavor, map it: `shadcn`→`template-shadcn`, `daisy`/`daisyui`→`template-daisy`, `tailwind`/`vanilla`→`template-tailwind`.
- **If the user does NOT specify a template, default to `template-tailwind` (vanilla).** Do not
  auto-upgrade to shadcn or daisy unless the brief clearly calls for a component-library look and the
  user agrees. (`create-app`'s own default is also `template-tailwind`, so omitting `--template` is
  equivalent.)

## Workflow

### 1. Scrape — pull the target's content (Firecrawl required)
Use the **firecrawl** skills: `firecrawl-scrape` for a single page, `firecrawl-map` + `firecrawl-crawl`
to discover and pull the key pages. Capture copy, structure, nav, and assets. For brand/visual cues
(colors, fonts), `firecrawl-website-design-clone` can extract a design summary.

**Save the scraped content to disk** — one Markdown file per page plus any structured notes. Keep it
in a working location during scrape, and once the app is scaffolded (stage 3) persist it under
`apps/<name>/designs/source/` so it ships and is reviewable alongside the build. Do not keep scrape
output only in the conversation. If Firecrawl is unavailable, **stop** (see Preflight) — do not
substitute WebFetch or manual browsing.

### 2. Plan — concept + page selection (Claude)
From the scraped content, decide the new site concept and select the **3 highest-impact pages** to
redesign (typically home + two conversion-critical pages). Resolve the template per the rule above.
Write down the plan (pages, template, brand direction) and confirm name + template with the user.

### 3. Scaffold — create the app from a template
```bash
pnpm create-app <name>                         # vanilla Tailwind (default)
pnpm create-app <name> --template <template>   # when a flavor was chosen
```
This creates `apps/<name>` (cloned from the chosen template, package renamed). See `tools/create-app.mjs`.
Run `pnpm install` afterward to link the new workspace package.

### 4. Design — generate the pages in Google Stitch (Stitch required)
Use the **stitch** skills: `enhance-prompt` to turn the brief into a strong Stitch prompt, then
`stitch-generate-design` (or `stitch-loop` for iterative multi-page builds) to design each of the 3
pages. **Save the generated HTML into `apps/<name>/designs/`** (one file per page) — this folder is the
handoff artifact between design and build, per the README.

This stage is **required**: the SvelteKit pages in stage 5 must be built from real Stitch designs.
Do not hand-author pages in place of generating designs. If Google Stitch is unavailable, **stop**
(see Preflight) and have the user connect it — even for a "simple" site.

### 5. Build — convert designs into SvelteKit pages
Turn each `designs/*.html` into a responsive SvelteKit route under `apps/<name>/src/routes`, styled
with Tailwind, respecting the Stitch design as closely as possible. Extract shared UI (Nav, Footer,
Card, etc.) into components under `src/lib/components`.
- Follow current Svelte conventions via **`svelte.dev/llms-small.txt`** first; escalate to
  `llms-medium.txt` / `llms-full.txt` only when a specific problem needs more context.
- Use the flavor's skill for components: **`shadcn-svelte`** (template-shadcn) or **`daisyui`**
  (template-daisy). For `template-tailwind`, write plain Tailwind utility markup — no component library.
- Verify locally: `pnpm turbo build --filter=<name>` and `pnpm --filter <name> check`.

### 6. Deploy — ship to Vercel
Invoke the **`deploy-app`** skill with the app name. It builds with a turbo filter and uploads the
prebuilt output (`vercel deploy --prebuilt`), so Vercel spends no build minutes. Preview by default;
production only on explicit request. Report the live URL.

## Conventions (this repo)

- Apps live at `apps/<name>`; templates are `apps/template-*`; shared code in `packages/*`.
- Tailwind is always present; `@sveltejs/adapter-vercel` is preconfigured in every template.
- Deploy projects are named `web-agency-<name>` under the `jacksloans-projects` Vercel team (handled
  by `deploy-app`).
- Designs are stored in the app's `designs/` folder before the build stage.

## Prerequisites

- `FIRECRAWL_API_KEY` set (Firecrawl), Google Stitch access (Stitch skills), and an authenticated
  Vercel CLI (`vercel whoami`) for the deploy stage.

## Scope

Currently Svelte-only, with three UI flavors (vanilla Tailwind default, shadcn-svelte, DaisyUI). The
whole flow is designed to run hands-free via Claude remote-control from a single prompt + URL.
