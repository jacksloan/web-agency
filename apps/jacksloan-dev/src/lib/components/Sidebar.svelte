<script lang="ts">
	import { page } from '$app/state';
	import { theme } from '$lib/theme.svelte.js';
	import { profile, socials } from '$lib/data.js';

	let { onNavigate = () => {} }: { onNavigate?: () => void } = $props();

	const nav = [
		{ href: '/', label: 'About' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/contact', label: 'Contact' }
	];

	const isActive = (href: string) =>
		href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);
</script>

<aside
	class="bg-base-100 border-base-300 flex h-full min-h-screen w-72 flex-col justify-between border-r px-8 py-12"
>
	<div class="space-y-12">
		<a href="/" onclick={onNavigate} class="block">
			<p class="font-display text-2xl font-bold tracking-tight">{profile.name}</p>
			<p class="text-base-content/60 mt-1 text-xs uppercase tracking-widest">{profile.role}</p>
		</a>

		<nav class="flex flex-col gap-1">
			{#each nav as item (item.href)}
				<a
					href={item.href}
					onclick={onNavigate}
					aria-current={isActive(item.href) ? 'page' : undefined}
					class="border-l-2 py-1.5 pl-4 text-sm tracking-wide transition-colors {isActive(item.href)
						? 'border-primary text-primary font-semibold'
						: 'text-base-content/60 hover:text-primary border-transparent'}"
				>
					{item.label}
				</a>
			{/each}
		</nav>
	</div>

	<div class="space-y-6">
		<a href="/contact" onclick={onNavigate} class="btn btn-primary btn-block btn-sm">Work with me</a>

		<ul class="flex flex-col gap-2">
			{#each socials as s (s.href)}
				<li>
					<a
						href={s.href}
						target="_blank"
						rel="noopener noreferrer"
						class="text-base-content/60 hover:text-primary text-sm transition-colors"
					>
						{s.label}
					</a>
				</li>
			{/each}
		</ul>

		<button
			onclick={() => theme.toggle()}
			class="text-base-content/60 hover:text-primary flex items-center gap-2 text-sm transition-colors"
			aria-label="Toggle light / dark theme"
		>
			{#if theme.isDark}
				<svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
				</svg>
				Light mode
			{:else}
				<svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
				</svg>
				Dark mode
			{/if}
		</button>
	</div>
</aside>
