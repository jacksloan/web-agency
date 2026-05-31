import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		// Deploys to Vercel using Fluid Compute (Node.js) functions.
		// See https://svelte.dev/docs/kit/adapter-vercel for configuration options.
		adapter: adapter()
	}
};

export default config;
