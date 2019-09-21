<script>
import { gameState } from './store.js';


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
	gameState.mergeObject(e.detail);
	gameState.nextPage();
}
function roundsSelected(e) {
	gameState.nextPage();
}

</script>

<style>

</style>
page: {$gameState.page}

{$gameState.timeLimit}
{$gameState.playerCount}

{#if $gameState.page === 0}
	<Setup on:next={setupDone}/>
{:else if $gameState.page === 1}
	<SelectRounds on:next={setupDone}/>
	<button on:click={setupDone}>Next</button>
{:else if $gameState.page === 2}
	Build 2 teams. Black and White.
	Every player is now going to pick 5 out of 8 cards, for his team to guess.
	<button on:click={setupDone}>Next</button>

{:else if $gameState.page === 3}
	Step 3
{:else if $gameState.page === 4}
	Step 4
{:else if $gameState.page === 5}
	Step 5
{:else if $gameState.page === 6}
	Step 6
{:else if $gameState.page === 7}
	Step 7
{:else}
	default gameState.page
{/if}

<!--
{#each cards as card}
	<Card {...card} />
{/each}
-->
