<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '@repo/ui/components/ui/sonner/index.js';

	let { children } = $props();
</script>

<ModeWatcher />
<Toaster />

{@render children()}
