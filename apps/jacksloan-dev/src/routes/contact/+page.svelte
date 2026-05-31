<script lang="ts">
	import { profile, resumeUrl } from '$lib/data.js';
</script>

<svelte:head>
	<title>Contact — Jack Sloan</title>
</svelte:head>

<div class="mx-auto flex min-h-[60vh] max-w-3xl flex-col px-6 py-16 sm:px-10 lg:py-24">
	<section>
		<h1 class="font-display text-4xl font-bold tracking-tight sm:text-5xl">Get in touch</h1>
		<p class="text-base-content/70 mt-5 max-w-lg text-lg leading-relaxed">
			Available for software consulting and interesting projects. The fastest way to reach me is
			email — a résumé is available on request.
		</p>
	</section>

	<section class="mt-10 flex flex-col items-start gap-8">
		<a href="mailto:{profile.email}" class="btn btn-primary btn-lg gap-3 text-base">
			{profile.email}
			<svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M5 12h14M13 5l7 7-7 7" />
			</svg>
		</a>

		<div class="border-base-300 flex w-full flex-wrap gap-3 border-t pt-8">
			<a href="https://www.linkedin.com/in/jack-sloan/" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
				LinkedIn
			</a>
			<a href="https://github.com/jacksloan" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
				GitHub
			</a>
			<a href={resumeUrl} target="_blank" rel="noopener noreferrer" class="btn btn-outline">
				Résumé
			</a>
		</div>
	</section>

	<footer class="text-base-content/50 mt-auto pt-16 text-sm">
		© {new Date().getFullYear()} Jack Sloan · Built with SvelteKit + DaisyUI
	</footer>
</div>
