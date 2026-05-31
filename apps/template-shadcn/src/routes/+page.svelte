<script lang="ts">
	import { Button } from '@repo/ui/components/ui/button/index.js';
	import { Badge } from '@repo/ui/components/ui/badge/index.js';
	import { Input } from '@repo/ui/components/ui/input/index.js';
	import { Label } from '@repo/ui/components/ui/label/index.js';
	import { Switch } from '@repo/ui/components/ui/switch/index.js';
	import { Checkbox } from '@repo/ui/components/ui/checkbox/index.js';
	import { Separator } from '@repo/ui/components/ui/separator/index.js';
	import { Slider } from '@repo/ui/components/ui/slider/index.js';
	import { Progress } from '@repo/ui/components/ui/progress/index.js';
	import * as Card from '@repo/ui/components/ui/card/index.js';
	import * as Tabs from '@repo/ui/components/ui/tabs/index.js';
	import * as Accordion from '@repo/ui/components/ui/accordion/index.js';
	import * as Alert from '@repo/ui/components/ui/alert/index.js';
	import * as Avatar from '@repo/ui/components/ui/avatar/index.js';
	import * as Select from '@repo/ui/components/ui/select/index.js';
	import * as Tooltip from '@repo/ui/components/ui/tooltip/index.js';
	import * as Dialog from '@repo/ui/components/ui/dialog/index.js';

	import { toggleMode } from 'mode-watcher';
	import { toast } from 'svelte-sonner';
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import RocketIcon from '@lucide/svelte/icons/rocket';

	let switchOn = $state(true);
	let checked = $state(true);
	let sliderValue = $state(50);
	let fruit = $state<string>('');

	const fruits = [
		{ value: 'apple', label: 'Apple' },
		{ value: 'banana', label: 'Banana' },
		{ value: 'blueberry', label: 'Blueberry' },
		{ value: 'grapes', label: 'Grapes' }
	];
	const selectedFruitLabel = $derived(
		fruits.find((f) => f.value === fruit)?.label ?? 'Select a fruit'
	);
</script>

<div class="mx-auto max-w-5xl space-y-10 px-6 py-12">
	<!-- Header -->
	<header class="flex items-center justify-between">
		<div class="space-y-1">
			<h1 class="text-3xl font-bold tracking-tight">shadcn-svelte × Turborepo</h1>
			<p class="text-muted-foreground">
				Components imported from the <code class="text-foreground">@repo/ui</code> package.
			</p>
		</div>
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<Button
							{...props}
							variant="outline"
							size="icon"
							onclick={toggleMode}
							aria-label="Toggle theme"
						>
							<SunIcon class="size-5 scale-100 dark:scale-0" />
							<MoonIcon class="absolute size-5 scale-0 dark:scale-100" />
						</Button>
					{/snippet}
				</Tooltip.Trigger>
				<Tooltip.Content>Toggle light / dark mode</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
	</header>

	<Separator />

	<!-- Buttons + badges -->
	<Card.Root>
		<Card.Header>
			<Card.Title>Buttons &amp; Badges</Card.Title>
			<Card.Description>The full set of variants and sizes.</Card.Description>
		</Card.Header>
		<Card.Content class="space-y-4">
			<div class="flex flex-wrap items-center gap-2">
				<Button>Default</Button>
				<Button variant="secondary">Secondary</Button>
				<Button variant="destructive">Destructive</Button>
				<Button variant="outline">Outline</Button>
				<Button variant="ghost">Ghost</Button>
				<Button variant="link">Link</Button>
			</div>
			<div class="flex flex-wrap items-center gap-2">
				<Badge>Default</Badge>
				<Badge variant="secondary">Secondary</Badge>
				<Badge variant="destructive">Destructive</Badge>
				<Badge variant="outline">Outline</Badge>
			</div>
			<div>
				<Button
					onclick={() =>
						toast.success('Components are working!', {
							description: 'This toast comes from the sonner component.'
						})}
				>
					Trigger a toast
				</Button>
			</div>
		</Card.Content>
	</Card.Root>

	<!-- Form controls -->
	<Card.Root>
		<Card.Header>
			<Card.Title>Form controls</Card.Title>
			<Card.Description>Inputs, selects, toggles and sliders.</Card.Description>
		</Card.Header>
		<Card.Content class="grid gap-6 md:grid-cols-2">
			<div class="space-y-2">
				<Label for="email">Email</Label>
				<Input id="email" type="email" placeholder="you@example.com" />
			</div>

			<div class="space-y-2">
				<Label>Favorite fruit</Label>
				<Select.Root type="single" bind:value={fruit}>
					<Select.Trigger class="w-full">{selectedFruitLabel}</Select.Trigger>
					<Select.Content>
						{#each fruits as f (f.value)}
							<Select.Item value={f.value} label={f.label}>{f.label}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>

			<div class="flex items-center gap-3">
				<Switch id="notifications" bind:checked={switchOn} />
				<Label for="notifications">Notifications {switchOn ? 'on' : 'off'}</Label>
			</div>

			<div class="flex items-center gap-3">
				<Checkbox id="terms" bind:checked />
				<Label for="terms">Accept terms &amp; conditions</Label>
			</div>

			<div class="space-y-2 md:col-span-2">
				<Label>Volume — {sliderValue}</Label>
				<Slider type="single" bind:value={sliderValue} max={100} step={1} />
				<Progress value={sliderValue} class="mt-2" />
			</div>
		</Card.Content>
	</Card.Root>

	<!-- Tabs + accordion -->
	<div class="grid gap-6 md:grid-cols-2">
		<Card.Root>
			<Card.Header>
				<Card.Title>Tabs</Card.Title>
			</Card.Header>
			<Card.Content>
				<Tabs.Root value="overview">
					<Tabs.List>
						<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
						<Tabs.Trigger value="activity">Activity</Tabs.Trigger>
						<Tabs.Trigger value="settings">Settings</Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content value="overview" class="text-muted-foreground pt-3 text-sm">
						A high-level summary of your project lives here.
					</Tabs.Content>
					<Tabs.Content value="activity" class="text-muted-foreground pt-3 text-sm">
						Recent activity and events show up on this tab.
					</Tabs.Content>
					<Tabs.Content value="settings" class="text-muted-foreground pt-3 text-sm">
						Tweak your preferences from the settings tab.
					</Tabs.Content>
				</Tabs.Root>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title>Accordion</Card.Title>
			</Card.Header>
			<Card.Content>
				<Accordion.Root type="single">
					<Accordion.Item value="a">
						<Accordion.Trigger>Is it accessible?</Accordion.Trigger>
						<Accordion.Content>
							Yes — built on Bits UI primitives with full keyboard support.
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="b">
						<Accordion.Trigger>Is it themeable?</Accordion.Trigger>
						<Accordion.Content>
							Yes — colors come from CSS variables in the shared globals.css.
						</Accordion.Content>
					</Accordion.Item>
				</Accordion.Root>
			</Card.Content>
		</Card.Root>
	</div>

	<!-- Alert + avatar + dialog -->
	<Card.Root>
		<Card.Header>
			<Card.Title>Overlays &amp; feedback</Card.Title>
		</Card.Header>
		<Card.Content class="space-y-6">
			<Alert.Root>
				<RocketIcon class="size-4" />
				<Alert.Title>Heads up!</Alert.Title>
				<Alert.Description>
					This Alert, the Dialog below, and the Avatar all come from @repo/ui.
				</Alert.Description>
			</Alert.Root>

			<div class="flex items-center gap-4">
				<Avatar.Root>
					<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
					<Avatar.Fallback>SC</Avatar.Fallback>
				</Avatar.Root>

				<Dialog.Root>
					<Dialog.Trigger>
						{#snippet child({ props })}
							<Button {...props} variant="outline">Open dialog</Button>
						{/snippet}
					</Dialog.Trigger>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>It works end to end</Dialog.Title>
							<Dialog.Description>
								This dialog is a shadcn-svelte component rendered from the shared UI package.
							</Dialog.Description>
						</Dialog.Header>
						<Dialog.Footer>
							<Button onclick={() => toast('Nice.')}>Got it</Button>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Root>
			</div>
		</Card.Content>
	</Card.Root>

	<footer class="text-muted-foreground pt-4 text-center text-sm">
		All 56 components are available under
		<code class="text-foreground">@repo/ui/components/ui/*</code>.
	</footer>
</div>
