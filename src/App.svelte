<script>
import { gameStore } from './store.js';

import Setup from './Setup.svelte';
import SelectRounds from './SelectRounds.svelte';
import Card from './Card.svelte';

// storing data: {timeLimit, playerCount, rounds, currentTurn}

let cards = [];

let page = 0;
let playerCount = 4;
let timeLimit = 60;

function gameInProgress() {
	try {
		var s = window.localStorage.getItem('gameState');
		return (s !== null);
	} catch (e) {
		return false;
	}
}

function setupDone(e) {
	gameStore.mergeObject(e.detail);
	gameStore.nextPage();
}
function roundsSelected(e) {
	gameStore.nextPage();
}

</script>

<style>

</style>
page: {$gameStore.page}

{#if $gameStore.page === 0}
	<Setup on:next={setupDone}/>
{:else if $gameStore.page === 1}
	<SelectRounds on:next={setupDone}/>
	<button on:click={setupDone}>Next</button>
{:else if $gameStore.page === 2}
	Build 2 teams. Black and White.
	Every player is now going to pick 5 out of 8 cards, for his team to guess.
	<button on:click={setupDone}>Next</button>

{:else if $gameStore.page === 3}
	Step 3
{:else if $gameStore.page === 4}
	Step 4
{:else if $gameStore.page === 5}
	Step 5
{:else if $gameStore.page === 6}
	Step 6
{:else if $gameStore.page === 7}
	Step 7
{:else}
	default gameStore.page
{/if}

<!--
{#each cards as card}
	<Card {...card} />
{/each}
-->
