import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  kit: {
    // Self-referential alias so shadcn-svelte places components under src/ and so
    // generated components can cross-import each other via the package name. This
    // resolves identically here and in consuming apps (which import the built dist).
    alias: {
      '@repo/ui': './src',
      '@repo/ui/*': './src/*'
    }
  }
};

export default config;
