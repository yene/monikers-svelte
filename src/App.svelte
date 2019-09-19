<script>
	let playersCount = 4;
	let timeLimit = 60;
	import HowToPlay from './HowToPlay.svelte';

</script>

<style>


</style>


<h1>Monikers</h1>
Players <input type="number" bind:value={playersCount}>
Time per card <input type="number" bind:value={timeLimit}>
<!-- hide used <input type="checkbox"-->

{playersCount} {timeLimit}

<a>How to play</a>
<button>Start</button>

<HowToPlay/>
