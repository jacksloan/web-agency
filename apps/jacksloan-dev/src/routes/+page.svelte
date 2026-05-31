<script lang="ts">
	import { profile, socials } from '$lib/data.js';
</script>

<svelte:head>
	<title>Jack Sloan — Software Consultant</title>
</svelte:head>

<div class="mx-auto max-w-3xl px-6 py-16 sm:px-10 lg:py-24">
	<!-- Hero -->
	<section>
		<h1 class="font-display text-5xl font-bold tracking-tight sm:text-6xl">{profile.name}</h1>
		<p class="text-base-content/70 mt-5 text-xl leading-relaxed sm:text-2xl">
			{profile.tagline}
		</p>
	</section>

	<!-- Photo -->
	<figure class="border-base-300 rounded-box mt-10 overflow-hidden border">
		<img
			src={profile.photo}
			alt={profile.photoAlt}
			class="h-64 w-full object-cover grayscale transition-all duration-700 hover:grayscale-0 sm:h-80"
			loading="lazy"
		/>
	</figure>

	<!-- Bio -->
	<section class="mt-10">
		<p class="text-base-content/80 text-lg leading-relaxed">{profile.bio}</p>
		<div class="mt-8 flex flex-wrap gap-3">
			<a href="/projects" class="btn btn-primary">View projects</a>
			<a href="/contact" class="btn btn-outline">Get in touch</a>
		</div>
	</section>

	<!-- Find me online -->
	<section class="border-base-300 mt-16 border-t pt-10">
		<p class="text-base-content/50 mb-5 text-xs uppercase tracking-widest">Find me online</p>
		<ul class="flex flex-wrap gap-x-8 gap-y-3">
			{#each socials as s (s.href)}
				<li>
					<a
						href={s.href}
						target="_blank"
						rel="noopener noreferrer"
						class="link link-hover hover:text-primary text-sm"
					>
						{s.label}
					</a>
				</li>
			{/each}
		</ul>
	</section>
</div>
