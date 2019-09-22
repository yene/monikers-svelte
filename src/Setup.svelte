<script>
	import 'whatwg-fetch';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let playerCount = 4;
	let timeLimit = 60;
	let excludeCards = false

	function next() {
		dispatch('next', {playerCount: playerCount, timeLimit: timeLimit});
	}

</script>

<h1>Monikers</h1>
<p>A dumb party game that respects your intelligence.</p>

Players <input type="number" bind:value={playerCount}>
Time per card <input type="number" bind:value={timeLimit}>
<!-- exclude cards from previous play <input type="checkbox" bind:value={excludeCards}>-->
<!-- TODO: aim for You want to aim for using around 40-50 cards  -->

<p>Make two groups with equal amount players.</p>

<p>Restart the app or refresh in the browser to reset the game.</p>

<a href="rules.pdf" target="_blank">How to play</a>
<button on:click={next}>Start</button>
