# template-tailwind

A SvelteKit + **[Tailwind CSS](https://tailwindcss.com)** starter template for the web-agency
monorepo. This is the simplest UI flavor — just Tailwind's utility classes, with **no component
library** on top (no DaisyUI, no shadcn).

This is one of the project's UI-flavor templates (alongside `template-daisy` and `template-shadcn`).
Clone it to start a new vanilla-Tailwind app:

```bash
pnpm create-app <app-name> --template template-tailwind
# or the shorthand:
pnpm create-app <app-name> --template tailwind
```

## What's set up

- **Tailwind v4** via `@tailwindcss/vite` (no `tailwind.config.js`). `src/app.css` is just:
  ```css
  @import 'tailwindcss';
  ```
  Tailwind scans the app's source for the utility classes it uses.
- **`@sveltejs/adapter-vercel`** so `/deploy-app <name>` (prebuilt, CLI-driven) works unchanged.
- A demo home page (`src/routes/+page.svelte`) with a hero and a grid of cards, styled entirely
  with Tailwind utilities — delete it and build your own.

## Develop

```bash
pnpm install
pnpm turbo dev --filter=template-tailwind   # or your cloned app's name
```

## Build

```bash
pnpm turbo build --filter=template-tailwind
```

See the repo root `README.md` for the full templating and deploy story.
