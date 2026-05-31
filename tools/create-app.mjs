#!/usr/bin/env node
// Scaffold a new SvelteKit app by cloning a template.
//
// Templates are apps that live in `apps/` with a `template-` prefix (e.g.
// apps/template-shadcn). create-app copies a template's source (src/, static/)
// and project files (configs, package.json, etc.) into apps/<name>, skipping
// generated and dependency directories (.svelte-kit, .turbo, .vercel,
// node_modules, dist, build), then renames the new project so its package.json
// "name" matches <name>.
//
// Usage:
//   node tools/create-app.mjs <name> [--template <template>]
//   pnpm create-app <name> [--template <template>]
//
// The template name may be given with or without the `template-` prefix, and a
// `templates/<name>` directory is also honored if present.
//
// Examples:
//   pnpm create-app acme-shop                          # uses the default template
//   pnpm create-app acme-shop --template template-shadcn
//   pnpm create-app acme-shop --template shadcn        # shorthand for template-shadcn

import { cpSync, existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_TEMPLATE = 'template-tailwind';

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

// Resolve a template name to a directory. Accepts the exact name or the
// `template-`-less shorthand, and looks under both apps/ and templates/.
function resolveTemplate(name) {
  const candidates = [
    join(ROOT, 'apps', name),
    join(ROOT, 'templates', name),
    join(ROOT, 'apps', `template-${name}`),
    join(ROOT, 'templates', `template-${name}`)
  ];
  for (const dir of candidates) {
    if (existsSync(dir) && existsSync(join(dir, 'package.json'))) return dir;
  }
  return null;
}

// Available templates: apps/template-* and any directory under templates/.
function listTemplates() {
  const found = [];
  const dir = (p) => (existsSync(p) ? readdirSync(p, { withFileTypes: true }) : []);
  for (const entry of dir(join(ROOT, 'apps'))) {
    if (entry.isDirectory() && entry.name.startsWith('template-')) found.push(entry.name);
  }
  for (const entry of dir(join(ROOT, 'templates'))) {
    if (entry.isDirectory()) found.push(entry.name);
  }
  return [...new Set(found)];
}

// Parse args: a positional <name> plus an optional --template/-t <template>.
const argv = process.argv.slice(2);
const wantsHelp = argv.some((a) => a === '--help' || a === '-h');
let name;
let template = DEFAULT_TEMPLATE;

for (let i = 0; i < argv.length; i++) {
  const arg = argv[i];
  if (arg === '--help' || arg === '-h') {
    continue;
  } else if (arg === '--template' || arg === '-t') {
    template = argv[++i];
  } else if (arg.startsWith('--template=')) {
    template = arg.slice('--template='.length);
  } else if (!name) {
    name = arg;
  }
}

if (wantsHelp || !name) {
  console.log(`
  Create a new SvelteKit app from a template.

  Usage:
    pnpm create-app <name> [--template <template>]

  <name>      kebab-case (lowercase letters, digits, hyphens), e.g. "acme-landing".
              The app is created at apps/<name> and its package.json name is set to <name>.
  --template  Template to clone (default: "${DEFAULT_TEMPLATE}"). The "template-" prefix is
              optional, so "shadcn" and "template-shadcn" both resolve to apps/template-shadcn.

  Available templates: ${listTemplates().join(', ') || '(none found)'}
`);
  process.exit(wantsHelp ? 0 : 1);
}

if (!/^[a-z][a-z0-9-]*$/.test(name)) {
  fail(`Invalid name "${name}". Use kebab-case: lowercase letters, digits, and hyphens (must start with a letter).`);
}

if (!template) {
  fail('Missing value for --template.');
}

const TEMPLATE = resolveTemplate(template);
if (!TEMPLATE) {
  fail(
    `Template "${template}" not found.\n` +
      `    Available templates: ${listTemplates().join(', ') || '(none found)'}`
  );
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
  ✔ Created apps/${name} from the "${template}" template.

  Next steps:
    pnpm install                  # link the new workspace package
    pnpm turbo dev --filter=${name}   # run it locally
    /deploy-app ${name}               # deploy it (prebuilt, CLI-driven)
`);
