# template-daisy

A SvelteKit + **[DaisyUI](https://daisyui.com)** starter template for the web-agency monorepo.
DaisyUI is a [Tailwind CSS](https://tailwindcss.com) component library — it provides semantic
component classes (`btn`, `card`, `navbar`, …) and themeable colors on top of Tailwind utilities.

This is one of the project's UI-flavor templates (alongside `template-shadcn`). Clone it to start a
new DaisyUI-based app:

```bash
pnpm create-app <app-name> --template template-daisy
# or the shorthand:
pnpm create-app <app-name> --template daisy
```

## What's set up

- **Tailwind v4** via `@tailwindcss/vite` (no `tailwind.config.js`).
- **DaisyUI** loaded as a Tailwind plugin in `src/app.css`:
  ```css
  @import 'tailwindcss';
  @plugin 'daisyui' {
    themes: light --default, dark --prefersdark;
  }
  ```
  The `light`/`dark` themes are enabled; the home page includes a `theme-controller` toggle.
- **`@sveltejs/adapter-vercel`** so `/deploy-app <name>` (prebuilt, CLI-driven) works unchanged.
- A demo home page (`src/routes/+page.svelte`) exercising navbar, hero, buttons, badges, form
  controls, alerts, stats, and tabs — delete it and build your own.

## Develop

```bash
pnpm install
pnpm turbo dev --filter=template-daisy   # or your cloned app's name
```

## Build

```bash
pnpm turbo build --filter=template-daisy
```

See the repo root `README.md` for the full templating and deploy story.
