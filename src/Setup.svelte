<script>
	import 'whatwg-fetch';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let playerCount = 4;
	let timeLimit = 60;
	let excludeCards = false;
	let hasCordova = (window.plugins !== undefined);
	let preventSleep = hasCordova ? window.plugins.insomnia.isEnabled : false;

	function next() {
		dispatch('next', {playerCount: playerCount, timeLimit: timeLimit});
		if (hasCordova) {
			window.plugins.insomnia.setEnabled(preventSleep);
		}
	}

	function showPDF() {
		window.plugins.utils.openURL('https://shiro.ch/rules.pdf');
	}

</script>

<div class="layout-root">
	<div class="layout-content">
		<h1 class="center">Monikers</h1>
		<p>A dumb party game that respects your intelligence.</p>
		Players <br><input type="number" pattern="\d*" min="2" bind:value={playerCount}><br>

		Time per card <br><input type="number" pattern="\d*" min="10" bind:value={timeLimit}><br>
		{#if hasCordova}
		Prevent display sleep <input type="checkbox" bind:checked={preventSleep}>
		{/if}
		<!-- exclude cards from previous play <input type="checkbox" bind:checked={excludeCards}>-->

		<p>Make two groups with equal amount players. Restart the app or refresh in the browser to reset the game.</p>
		{#if hasCordova}
			<a href="#" on:click={showPDF}>How to play PDF</a>
		{:else}
			<a href="/rules.pdf" target="_blank">How to play PDF</a>
		{/if}
	</div>
	<div class="layout-footer">
		<button class="nav-button" on:click={next}>Start</button>
	</div>
</div>

<style>

</style>
