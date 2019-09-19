<script>
	let playersCount = 4;
	let timeLimit = 60;
</script>

<h1>Monikers</h1>
Players <input type="number" bind:value={playersCount}>
Time per card <input type="number" bind:value={timeLimit}>
<!-- hide used <input type="checkbox"-->

{playersCount} {timeLimit}

<a href="rules.pdf" target="_blank">How to play</a>
<button>Start</button>
