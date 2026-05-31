<script lang="ts">
	const cards = [
		{
			title: 'Utility-first',
			body: 'Style elements by composing small, single-purpose classes right in your markup — no CSS files to maintain.'
		},
		{
			title: 'Responsive',
			body: 'Prefix any utility with a breakpoint like sm: or lg: to apply it only at that screen size and up.'
		},
		{
			title: 'Themeable',
			body: 'Tailwind v4 reads design tokens from CSS, so colors, spacing, and fonts stay consistent everywhere.'
		}
	];
</script>

<main class="min-h-screen bg-slate-50 text-slate-900">
	<!-- Hero -->
	<section class="mx-auto max-w-3xl px-6 pt-20 pb-12 text-center">
		<span
			class="inline-block rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700"
		>
			SvelteKit × Tailwind CSS
		</span>
		<h1 class="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">Vanilla Tailwind starter</h1>
		<p class="mt-4 text-lg text-slate-600">
			The simplest template — just <span class="font-semibold">Tailwind CSS</span> utilities, no
			component library. The cards below are styled entirely with utility classes.
		</p>
	</section>

	<!-- Cards: proof that Tailwind is working -->
	<section class="mx-auto grid max-w-5xl gap-6 px-6 pb-24 sm:grid-cols-2 lg:grid-cols-3">
		{#each cards as card (card.title)}
			<article
				class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
			>
				<div
					class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white"
				>
					<svg
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
					</svg>
				</div>
				<h2 class="text-lg font-semibold">{card.title}</h2>
				<p class="mt-2 text-sm leading-relaxed text-slate-600">{card.body}</p>
			</article>
		{/each}
	</section>
</main>
