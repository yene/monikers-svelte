<script>
	import 'whatwg-fetch';
	import { onMount } from 'svelte';


	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let playerCount = 4;
	let timeLimit = 60;
	let excludeCards = false

	function next() {
		dispatch('next', {playerCount: playerCount, timeLimit: timeLimit});
	}

	let cards = [];
	onMount(() => {
		fetch('/cards.json')
		.then(function(response) {
			return response.json()
		}).then(function(json) {
			cards = json;
			console.log('parsed json', json);
		}).catch(function(ex) {
			console.log('parsing failed', ex);
		});
	});

</script>

<h1>Monikers</h1>
<p>A dumb party game that respects your intelligence.</p>

Players <input type="number" bind:value={playerCount}>
Time per card <input type="number" bind:value={timeLimit}>
<!-- exclude cards from previous play <input type="checkbox" bind:value={excludeCards}>-->


<p>Make two groups with equal amount players.</p>

<p>Restart the app or refresh in the browser to reset the game.</p>

<a href="rules.pdf" target="_blank">How to play</a>
<button on:click={next}>Start</button>
