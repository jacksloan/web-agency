<script lang="ts">
	import { projects } from '$lib/data.js';
</script>

<svelte:head>
	<title>Projects — Jack Sloan</title>
</svelte:head>

<div class="mx-auto max-w-3xl px-6 py-16 sm:px-10 lg:py-24">
	<header>
		<h1 class="font-display text-4xl font-bold tracking-tight sm:text-5xl">Projects</h1>
		<p class="text-base-content/70 mt-4 text-lg">
			A selection of open-source work focused on type-safety and developer experience.
		</p>
	</header>

	<div class="mt-12 grid gap-5 sm:grid-cols-2">
		{#each projects as project (project.name)}
			<a
				href={project.url}
				target="_blank"
				rel="noopener noreferrer"
				class="card bg-base-100 border-base-300 hover:border-primary rounded-box flex h-full flex-col border transition-colors"
			>
				<div class="card-body gap-4">
					<h2 class="font-mono text-base font-semibold tracking-tight">{project.name}</h2>
					<p class="text-base-content/70 flex-1 text-sm leading-relaxed">{project.description}</p>
					<div class="flex flex-wrap gap-1.5">
						{#each project.tech as t (t)}
							<span class="badge badge-soft badge-sm">{t}</span>
						{/each}
					</div>
				</div>
			</a>
		{/each}
	</div>

	<div class="mt-10">
		<a
			href="https://github.com/jacksloan"
			target="_blank"
			rel="noopener noreferrer"
			class="link link-primary text-sm"
		>
			See more on GitHub →
		</a>
	</div>
</div>
