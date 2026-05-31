# Web Agency

> Spin up an entire, redesigned website from a single prompt and a target URL — from your phone.

**Web Agency** is an AI-driven pipeline that turns any existing website or business URL into a brand-new, deployed website concept. Point it at a site, describe what you want, and it scrapes the existing content, reimagines the design, scaffolds a fresh SvelteKit project, and ships it to Vercel — all orchestrated by Claude.

The whole flow is designed to run hands-free via **Claude remote-control**, so a developer can kick off a complete website build from their phone with nothing more than a prompt and a URL.

---

## What it does

Give it a prompt and a target website or business URL. Web Agency will:

1. **Scrape** the existing web content from the target URL using [Firecrawl](https://firecrawl.dev).
2. **Plan** the new site concept with Claude — selecting 3 high-impact pages to redesign.
3. **Scaffold** a new [SvelteKit](https://svelte.dev/docs/kit) app inside a [Turborepo](https://turbo.build/repo) monorepo, cloned from the template that best fits the desired app (see [Templates](#templates)).
4. **Design** a whole new website concept for those 3 pages using [Google Stitch](https://stitch.withgoogle.com), storing the generated HTML in a `designs/` folder in the SvelteKit project.
5. **Build** mobile- and web-friendly SvelteKit pages with [TailwindCSS](https://tailwindcss.com) from the Stitch designs — respecting the design as closely as possible and extracting common UI elements (Nav, Footer, Cards, etc.) into reusable components.
6. **Publish** the finished site to [Vercel](https://vercel.com).

---

## The pipeline

```
   ┌─────────────┐
   │   Prompt    │   "Redesign acme.com as a bold,
   │   + URL     │    modern SaaS landing experience"
   └──────┬──────┘
          │
          ▼
   ┌─────────────┐
   │  Firecrawl  │   Scrape existing content, copy,
   │   (scrape)  │   structure, and assets
   └──────┬──────┘
          │
          ▼
   ┌─────────────┐
   │   Claude    │   Plan the concept + pick the
   │   (plan)    │   3 high-impact pages to redesign
   └──────┬──────┘
          │
          ▼
   ┌─────────────┐
   │  SvelteKit  │   Scaffold a new app in a
   │  + Turbo    │   Turborepo monorepo
   └──────┬──────┘
          │
          ▼
   ┌─────────────┐
   │   Google    │   Design 3 new pages → store HTML
   │   Stitch    │   in the project's designs/ folder
   └──────┬──────┘
          │
          ▼
   ┌─────────────┐
   │  SvelteKit  │   Convert Stitch HTML → responsive
   │  + Tailwind │   pages; extract Nav/Footer/Cards
   └──────┬──────┘   (guided by svelte.dev/llms-*.txt)
          │
          ▼
   ┌─────────────┐
   │   Vercel    │   Publish the new site live
   │  (deploy)   │
   └─────────────┘
```

---

## Tech stack

| Stage      | Tool                | Role                                                        |
| ---------- | ------------------- | ----------------------------------------------------------- |
| Scraping   | **Firecrawl**       | Extract clean content from the target website               |
| Planning   | **Claude**          | Orchestrate the build and design the site concept           |
| Framework  | **SvelteKit**       | The application framework for each generated site           |
| Monorepo   | **Turborepo**       | Manage and build each project as a monorepo                 |
| Design     | **Google Stitch**   | Generate the new page designs as HTML                       |
| Styling    | **TailwindCSS**     | Always present — responsive, mobile- and web-friendly pages   |
| UI flavor  | **shadcn-svelte · DaisyUI · vanilla Tailwind** | Per-template component layer chosen to fit the app (see [Templates](#templates)) |
| Hosting    | **Vercel**          | Deploy and host the published site                          |
| Interface  | **Claude remote-control** | Drive the entire pipeline from a phone, hands-free    |

---

## How a build works

Each website is generated end-to-end from a single instruction:

> **Prompt:** A natural-language description of the site you want.
> **Target:** A website or business URL to scrape content from.

From there the pipeline runs autonomously:

- **Scrape** — Firecrawl pulls the target site's content into clean, structured data.
- **Plan** — Claude reviews the scraped content and proposes a new website concept, identifying the **3 highest-impact pages** to redesign.
- **Scaffold** — A new SvelteKit app is created inside a Turborepo monorepo by cloning the most appropriate [template](#templates) for the desired app, ready for the new designs.
- **Design** — Google Stitch generates a fresh visual concept for each of the 3 pages. The resulting HTML is saved into the project's `designs/` folder.
- **Build** — Claude turns the static Stitch HTML into mobile- and web-friendly SvelteKit pages styled with TailwindCSS. The generated pages respect the Stitch design as closely as possible, and common UI elements — `Nav`, `Footer`, `Card`, and similar — are extracted into reusable Svelte components in the project.
- **Publish** — The site is deployed to Vercel and a live URL is returned.

### Svelte best practices

The build stage follows current Svelte conventions by referencing the official LLM context files:

- **[svelte.dev/llms-small.txt](https://svelte.dev/llms-small.txt)** — the default reference, used for initial Svelte/SvelteKit best practices. Preferred first because it fits comfortably in smaller context windows.
- **[svelte.dev/llms-medium.txt](https://svelte.dev/llms-medium.txt)** / **[svelte.dev/llms-full.txt](https://svelte.dev/llms-full.txt)** — consulted only when there's confusion about a specific Svelte problem that the small reference doesn't resolve, trading a larger context for more detail.

---

## Templates

New apps aren't scaffolded from scratch — they're cloned from a **template** chosen to match the
desired app. Over time the project will ship several templates, and the planning step picks the one
that best fits the site being built.

Today every template shares the same foundation — **[SvelteKit](https://svelte.dev/docs/kit)** and
**[TailwindCSS](https://tailwindcss.com)** are always present — and they differ only in their **UI
flavor**:

| Template | UI flavor | When it's chosen |
| --- | --- | --- |
| `template-tailwind` | **Vanilla TailwindCSS** | **The default.** Maximum control / minimal dependencies — utility classes only, no component library. |
| `template-shadcn` | **[shadcn-svelte](https://shadcn-svelte.com)** | Polished, accessible component-driven UIs (built on Bits UI); the richest flavor. |
| `template-daisy` | **[DaisyUI](https://daisyui.com)** | Fast, themeable Tailwind component classes with many prebuilt themes. |

Each template is a working SvelteKit app living in `apps/template-*`, preconfigured with TailwindCSS
v4 and the Vercel adapter so the rest of the pipeline (build, deploy) works unchanged regardless of
which flavor is used. A new app is created from one with:

```bash
pnpm create-app <app-name>                            # defaults to template-tailwind (vanilla)
pnpm create-app <app-name> --template <template>      # pick a flavor
# e.g. pnpm create-app acme-landing --template template-shadcn
#      pnpm create-app acme-landing --template daisy   # the "template-" prefix is optional
```

This copies the template's `src/`, `static/`, and project files into `apps/<app-name>` (skipping
generated/dependency directories) and renames the package. See `tools/create-app.mjs`.

> Scope: templates are currently **Svelte-only**. The three UI flavors above —
> shadcn-svelte, DaisyUI, and vanilla TailwindCSS — are the supported choices for now; more
> flavors (and, later, other frameworks) may be added.

---

## Project structure

Each generated project follows a Turborepo monorepo layout:

```
my-new-site/
├── apps/
│   └── web/                  # SvelteKit app (TailwindCSS)
│       ├── designs/          # Stitch-generated HTML for the 3 redesigned pages
│       ├── src/
│       │   ├── lib/
│       │   │   └── components/   # Extracted UI: Nav, Footer, Card, etc.
│       │   └── routes/          # SvelteKit pages built from the designs
│       ├── tailwind.config.js
│       └── svelte.config.js
├── packages/                 # Shared packages (ui, config, etc.)
├── turbo.json                # Turborepo task pipeline
└── package.json
```

---

## Getting started

> ⚠️ This project is in active development. Setup steps below describe the intended workflow.

### Prerequisites

- Node.js 24 LTS
- A package manager (pnpm recommended for Turborepo workspaces)
- A [Firecrawl API key](https://firecrawl.dev)
- A [Vercel account](https://vercel.com) and CLI
- Access to Google Stitch
- Claude (with remote-control enabled for phone-driven builds)

### Environment

Create a `.env` with the credentials the pipeline needs:

```bash
FIRECRAWL_API_KEY=your_firecrawl_key
VERCEL_TOKEN=your_vercel_token
# ...plus any Stitch / Claude credentials required by your setup
```

### Run a build

Provide a prompt and a target URL, and let the pipeline do the rest:

```bash
# Example (intended usage)
web-agency build \
  --prompt "Redesign as a bold, modern SaaS landing experience" \
  --target https://example.com
```

When run via **Claude remote-control**, the same build can be triggered entirely from your phone with a single message.

---

## Roadmap

- [ ] One-prompt build pipeline (scrape → plan → scaffold → design → deploy)
- [ ] Firecrawl content extraction
- [ ] Claude-driven planning and page selection
- [ ] SvelteKit + Turborepo scaffolding via `create-app` from a chosen template
- [ ] UI-flavor templates: shadcn-svelte, DaisyUI, vanilla TailwindCSS
- [ ] Google Stitch design generation into `designs/`
- [ ] Stitch → SvelteKit + TailwindCSS conversion (responsive pages, extracted Nav/Footer/Card components)
- [ ] Svelte best-practice grounding via `svelte.dev/llms-*.txt`
- [ ] Vercel deployment with returned live URL
- [ ] Full phone-driven flow via Claude remote-control

---

## License

TBD.
