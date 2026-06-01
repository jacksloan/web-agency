---
name: deploy-app
description: >-
  Deploy a single app from this Turborepo to Vercel, CLI-driven and prebuilt, so Vercel
  never spends build minutes. Use this skill whenever the user wants to ship/deploy/publish
  a specific app in apps/* — phrases like "deploy the example app", "deploy-app example",
  "ship apps/<name> to vercel", "push <app> live", or "publish the new site". It builds only
  the target app and its workspace dependencies with a turbo filter, then uploads the locally
  produced Build Output via `vercel deploy --prebuilt` (no server-side build). Reach for this
  instead of git-push or a plain `vercel deploy` — those rebuild on Vercel and burn build
  minutes, which this monorepo deliberately avoids since it will host many apps.
---

# deploy-app

This monorepo (pnpm + Turborepo) will host **many** SvelteKit apps under `apps/*`, all deploying
to Vercel. To conserve Vercel build minutes, deploys are **CLI-driven and prebuilt**: we build the
target app locally with a turbo filter (which also builds its workspace deps like `@repo/ui`), then
upload the resulting Build Output with `vercel deploy --prebuilt`. Because the artifact is already
built, **Vercel skips its build step entirely — zero build minutes consumed**, and only the target
app is built, not the whole repo.

This is the opposite of git-push / dashboard deploys (which rebuild every app on Vercel). Keep it CLI.

## Prerequisites (per app)

- The app must use **`@sveltejs/adapter-vercel`** in its `svelte.config.js`. That adapter writes a
  Build Output API v3 directory to `apps/<app>/.vercel/output` during `vite build` — exactly what
  `vercel deploy --prebuilt` uploads. An app on `adapter-auto`/another adapter won't produce this;
  switch it to `adapter-vercel` first.
- The Vercel CLI must be authenticated (`vercel whoami`). If not, tell the user to run `! vercel login`.

## Conventions (this repo)

- **Team scope:** `jacksloans-projects` (the user's only team). Pass `--scope jacksloans-projects` on
  every `vercel` command.
- **Project naming:** `web-agency-<app>` (e.g. `apps/example` → Vercel project `web-agency-example`).
- **Linking is per-app and local.** Each app's `.vercel/` (containing `project.json`) is gitignored,
  so in a fresh clone / remote session it won't exist — that's fine: the link step below re-links to
  the existing Vercel project by name (idempotent).

## Workflow

Run from the repo root. `<app>` is the directory name under `apps/` (the app's `package.json` `name`
is what turbo filters on — for this repo the app dir name and package name match, e.g. `example`).

### 1. Resolve the target app

If the user named one, use it. Otherwise list options and ask:

```bash
ls apps
```

Confirm the app uses `adapter-vercel`:

```bash
grep -q "adapter-vercel" apps/<app>/svelte.config.js && echo OK || echo "NOT adapter-vercel — fix first"
```

### 2. Build locally with a turbo filter

Builds only `<app>` and its workspace dependencies (turbo resolves `^build`, so `@repo/ui` etc. build
first). This is the whole point — no other app is built, and Vercel won't rebuild anything.

```bash
pnpm turbo build --filter=<app>
```

Then confirm the Build Output exists:

```bash
test -d apps/<app>/.vercel/output && echo "build output ready" || echo "MISSING — build failed or wrong adapter"
```

### 3. Ensure the app is linked to its Vercel project

Safe to run every time — links to the existing project (or creates it on first deploy):

```bash
cd apps/<app>
vercel link --yes --project web-agency-<app> --scope jacksloans-projects
```

### 4. Deploy the prebuilt output

From `apps/<app>`. **Deploy to production by default** — these apps are the deliverable, and only a
production deploy updates the project's main URL (`https://web-agency-<app>.vercel.app`). A plain
(preview) deploy gets its own throwaway URL and does **not** move the main alias, which is surprising
if you expect "deploy" to update the live site.

```bash
# Production (default) — updates the main https://web-agency-<app>.vercel.app alias
vercel deploy --prebuilt --prod --scope jacksloans-projects

# Preview (opt-in) — throwaway URL, does NOT touch the main alias
vercel deploy --prebuilt --scope jacksloans-projects
```

Use preview only when the user explicitly wants a throwaway/preview URL (e.g. "give me a preview").
`--prebuilt` uploads `.vercel/output` as-is; Vercel does not run a build, so no build minutes are used
either way.

### 5. Report the URLs

The command prints JSON with the deployment `url` and `inspectorUrl`. Surface the live URL (and the
project's stable alias if shown, e.g. `https://web-agency-<app>.vercel.app`) to the user.

## Deploying several apps

Loop the workflow per app, or build a set in one pass then deploy each:

```bash
pnpm turbo build --filter=app-a --filter=app-b      # build only these two + their deps
# then run steps 3–4 inside apps/app-a and apps/app-b
```

Turbo caches unchanged packages, so re-deploys of an untouched app rebuild almost nothing locally.

## Why not the alternatives

- **git-push deploys** rebuild on Vercel for every push and, in a monorepo, can trigger builds for
  multiple projects — exactly the build-minute drain we're avoiding.
- **`vercel deploy` without `--prebuilt`** uploads source and builds in Vercel's build container,
  also consuming build minutes and re-running the monorepo build server-side.
- **`vercel build`** is an alternative way to produce `.vercel/output`, but `adapter-vercel` already
  writes it during `turbo build`, so we skip straight to `--prebuilt`.

## Troubleshooting

- **`MISSING` output after build:** the app isn't on `adapter-vercel`, or the build failed. Check the
  turbo build log and `apps/<app>/svelte.config.js`.
- **`@repo/ui` import errors during build:** ensure you used `turbo build --filter=<app>` (not
  `vite build` directly) so the `^build` dependency builds `@repo/ui`'s `dist/` first.
- **Link prompts interactively:** pass `--yes --project web-agency-<app> --scope jacksloans-projects`
  so it never prompts.
