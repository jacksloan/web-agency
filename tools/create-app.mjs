#!/usr/bin/env node
// Scaffold a new SvelteKit app by cloning apps/example.
//
// Copies the example app's source (src/, static/) and project files (configs,
// package.json, etc.) into apps/<name>, skipping generated and dependency
// directories (.svelte-kit, .turbo, .vercel, node_modules, dist, build). Then
// renames the new project so its package.json "name" matches <name>.
//
// Usage:
//   node tools/create-app.mjs <name>
//   pnpm create-app <name>
//
// Example:
//   pnpm create-app acme-landing   ->   apps/acme-landing (package name "acme-landing")

import { cpSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const TEMPLATE = join(ROOT, 'apps', 'example');

// Directories that are generated, installed, or environment-specific — never copy these.
const EXCLUDE = new Set([
  'node_modules',
  '.svelte-kit',
  '.turbo',
  '.vercel',
  'dist',
  'build',
  '.DS_Store'
]);

function fail(message) {
  console.error(`\n  ✖ ${message}\n`);
  process.exit(1);
}

const name = process.argv[2];

if (!name || name === '--help' || name === '-h') {
  console.log(`
  Create a new SvelteKit app from the apps/example template.

  Usage:
    pnpm create-app <name>

  <name> must be kebab-case (lowercase letters, digits, hyphens), e.g. "acme-landing".
  The app is created at apps/<name> and its package.json name is set to <name>.
`);
  process.exit(name ? 0 : 1);
}

if (!/^[a-z][a-z0-9-]*$/.test(name)) {
  fail(`Invalid name "${name}". Use kebab-case: lowercase letters, digits, and hyphens (must start with a letter).`);
}

if (!existsSync(TEMPLATE)) {
  fail(`Template not found at ${TEMPLATE}. Run this from within the web-agency monorepo.`);
}

const dest = join(ROOT, 'apps', name);
if (existsSync(dest)) {
  fail(`apps/${name} already exists. Choose a different name or remove it first.`);
}

// Copy everything except the excluded directories. The filter receives the
// source path for each entry; returning false skips it (and its descendants).
cpSync(TEMPLATE, dest, {
  recursive: true,
  filter: (src) => {
    const rel = src.slice(TEMPLATE.length + 1);
    if (!rel) return true; // the template root itself
    return !rel.split(sep).some((segment) => EXCLUDE.has(segment));
  }
});

// Rename the project: set package.json "name" to the new app name.
const pkgPath = join(dest, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
pkg.name = name;
writeFileSync(pkgPath, JSON.stringify(pkg, null, '\t') + '\n');

console.log(`
  ✔ Created apps/${name} from the example template.

  Next steps:
    pnpm install                  # link the new workspace package
    pnpm turbo dev --filter=${name}   # run it locally
    /deploy-app ${name}               # deploy it (prebuilt, CLI-driven)
`);
