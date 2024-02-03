<script lang="ts">
	import Logo from '$lib/assets/Logo.svelte';
	import type { Snippet } from 'svelte';
	import './app.css';

	let { children } = $props<{ children: Snippet }>();
</script>

<nav>
	<a href="/">
		<Logo size={48} color="var(--color-brand)" />

		Corridor Requests
	</a>
</nav>

{@render children()}

<style>
	nav {
		height: 5rem;
		display: flex;
		align-items: center;
		justify-content: center;

		gap: var(--sp-05);

		padding: 0 var(--sp-08);
	}
	a {
		color: inherit;
		text-decoration: none;
		font-size: x-large;
		font-weight: bold;
		display: flex;
		align-items: center;
		gap: var(--sp-05);
		font-family: var(--font-brand);
	}
</style>
