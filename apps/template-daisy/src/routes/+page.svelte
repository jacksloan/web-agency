<script lang="ts">
	let progress = $state(70);
</script>

<!-- Navbar with a light/dark theme toggle (DaisyUI theme-controller) -->
<div class="navbar bg-base-200 shadow-sm">
	<div class="navbar-start">
		<a class="btn btn-ghost text-xl" href="/">DaisyUI Template</a>
	</div>
	<div class="navbar-end gap-2">
		<a class="link link-hover" href="https://daisyui.com/components/">Components</a>
		<label class="swap swap-rotate btn btn-ghost btn-circle">
			<input type="checkbox" class="theme-controller" value="dark" />
			<span class="swap-off">☀️</span>
			<span class="swap-on">🌙</span>
		</label>
	</div>
</div>

<!-- Hero -->
<div class="hero bg-base-100 py-16">
	<div class="hero-content text-center">
		<div class="max-w-xl">
			<h1 class="text-5xl font-bold">SvelteKit × DaisyUI</h1>
			<p class="py-6 text-base-content/70">
				A starter template styled entirely with <span class="font-semibold">DaisyUI</span>, the
				Tailwind CSS component library. Toggle the theme in the top-right — every component recolors
				automatically.
			</p>
			<button class="btn btn-primary">Primary action</button>
			<button class="btn btn-outline">Learn more</button>
		</div>
	</div>
</div>

<div class="mx-auto max-w-5xl space-y-10 px-6 pb-16">
	<!-- Buttons + badges -->
	<section class="card bg-base-100 shadow-sm">
		<div class="card-body">
			<h2 class="card-title">Buttons &amp; Badges</h2>
			<div class="flex flex-wrap items-center gap-2">
				<button class="btn">Default</button>
				<button class="btn btn-primary">Primary</button>
				<button class="btn btn-secondary">Secondary</button>
				<button class="btn btn-accent">Accent</button>
				<button class="btn btn-outline">Outline</button>
				<button class="btn btn-ghost">Ghost</button>
			</div>
			<div class="flex flex-wrap items-center gap-2 pt-2">
				<span class="badge badge-primary">Primary</span>
				<span class="badge badge-secondary">Secondary</span>
				<span class="badge badge-accent badge-outline">Accent</span>
				<span class="badge badge-success">Success</span>
				<span class="badge badge-error">Error</span>
			</div>
		</div>
	</section>

	<!-- Form controls -->
	<section class="card bg-base-100 shadow-sm">
		<div class="card-body grid gap-6 md:grid-cols-2">
			<div>
				<label class="label" for="email">Email</label>
				<input id="email" type="email" placeholder="you@example.com" class="input input-bordered w-full" />
			</div>
			<div>
				<label class="label" for="flavor">Favorite flavor</label>
				<select id="flavor" class="select select-bordered w-full">
					<option disabled selected>Pick one</option>
					<option>Vanilla Tailwind</option>
					<option>DaisyUI</option>
					<option>shadcn-svelte</option>
				</select>
			</div>
			<div class="flex items-center gap-3">
				<input type="checkbox" class="toggle toggle-primary" checked />
				<span>Notifications</span>
			</div>
			<div class="flex items-center gap-3">
				<input type="checkbox" class="checkbox checkbox-primary" checked />
				<span>Accept terms</span>
			</div>
			<div class="md:col-span-2">
				<label class="label" for="vol">Volume — {progress}</label>
				<input id="vol" type="range" min="0" max="100" bind:value={progress} class="range range-primary" />
				<progress class="progress progress-primary mt-3 w-full" value={progress} max="100"></progress>
			</div>
		</div>
	</section>

	<!-- Feedback + stats -->
	<div class="grid gap-6 md:grid-cols-2">
		<section class="card bg-base-100 shadow-sm">
			<div class="card-body gap-3">
				<h2 class="card-title">Alerts</h2>
				<div role="alert" class="alert alert-info">
					<span>Heads up — this is an info alert.</span>
				</div>
				<div role="alert" class="alert alert-success">
					<span>Success! DaisyUI is wired up.</span>
				</div>
			</div>
		</section>

		<section class="stats stats-vertical bg-base-100 shadow-sm sm:stats-horizontal">
			<div class="stat">
				<div class="stat-title">Components</div>
				<div class="stat-value text-primary">61</div>
				<div class="stat-desc">DaisyUI 5</div>
			</div>
			<div class="stat">
				<div class="stat-title">Themes</div>
				<div class="stat-value text-secondary">35+</div>
				<div class="stat-desc">built-in</div>
			</div>
		</section>
	</div>

	<!-- Tabs -->
	<section class="card bg-base-100 shadow-sm">
		<div class="card-body">
			<div role="tablist" class="tabs tabs-border">
				<input type="radio" name="demo_tabs" role="tab" class="tab" aria-label="Overview" checked />
				<div role="tabpanel" class="tab-content pt-4 text-base-content/70">
					A high-level summary lives here.
				</div>
				<input type="radio" name="demo_tabs" role="tab" class="tab" aria-label="Activity" />
				<div role="tabpanel" class="tab-content pt-4 text-base-content/70">
					Recent activity shows on this tab.
				</div>
				<input type="radio" name="demo_tabs" role="tab" class="tab" aria-label="Settings" />
				<div role="tabpanel" class="tab-content pt-4 text-base-content/70">
					Preferences go here.
				</div>
			</div>
		</div>
	</section>

	<footer class="footer footer-center text-base-content/60 p-4">
		<aside>Styled with DaisyUI — utility classes + semantic theme colors.</aside>
	</footer>
</div>
