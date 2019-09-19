<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let playerCount = 4;
	let timeLimit = 60;

	function next() {
		dispatch('next', {playerCount: playerCount, timeLimit: timeLimit});
	}

</script>

<h1>Monikers</h1>
<p>A dumb party game that respects your intelligence.</p>

Players <input type="number" bind:value={playerCount}>
Time per card <input type="number" bind:value={timeLimit}>
<!-- hide used <input type="checkbox"-->

<p>Make two groups with equal amount players.</p>

<a href="rules.pdf" target="_blank">How to play</a>
<button on:click={next}>Start</button>
