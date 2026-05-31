<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { theme } from '$lib/theme.svelte.js';
	import { profile } from '$lib/data.js';

	let { children } = $props();
	let drawerOpen = $state(false);

	onMount(() => theme.init());
</script>

<div class="drawer lg:drawer-open">
	<input id="nav-drawer" type="checkbox" class="drawer-toggle" bind:checked={drawerOpen} />

	<div class="drawer-content flex min-h-screen flex-col">
		<!-- Mobile top bar (sidebar is persistent on lg+) -->
		<header
			class="navbar border-base-300 bg-base-100/80 sticky top-0 z-30 border-b backdrop-blur-md lg:hidden"
		>
			<div class="flex-1">
				<a href="/" class="font-display px-2 text-lg font-bold">{profile.name}</a>
			</div>
			<label for="nav-drawer" class="btn btn-ghost btn-square" aria-label="Open menu">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="size-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</label>
		</header>

		<main class="flex-1">
			{@render children()}
		</main>
	</div>

	<div class="drawer-side z-40">
		<label for="nav-drawer" aria-label="Close menu" class="drawer-overlay"></label>
		<Sidebar onNavigate={() => (drawerOpen = false)} />
	</div>
</div>
