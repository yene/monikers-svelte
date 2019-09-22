<script>
import { gameStore } from './store.js';

import Setup from './Setup.svelte';
import SelectRounds from './SelectRounds.svelte';
import ChooseCards from './ChooseCards.svelte';
import {roundsData} from './rounds.js';
import GuessCards from './GuessCards.svelte';

function gameInProgress() {
	try {
		var s = window.localStorage.getItem('gameState');
		return (s !== null);
	} catch (e) {
		return false;
	}
}

function storeAndNext(e) {
	console.log(e.detail);
	gameStore.mergeObject(e.detail);
	gameStore.nextPage();
}

</script>

<style>

</style>
page: {$gameStore.page}
<button on:click={gameStore.nextPage}>skip</button>

{#if $gameStore.page === 0}
	<Setup on:next={storeAndNext}/>
{:else if $gameStore.page === 1}
	<SelectRounds on:next={storeAndNext}/>
{:else if $gameStore.page === 2}
	Build 2 teams. Black and White.
	Every player is now going to pick 5 out of 8 cards, for his team to guess.
	<button on:click={gameStore.nextPage}>Next</button>
{:else if $gameStore.page === 3}
	<ChooseCards playerCount={$gameStore.playerCount} on:next={storeAndNext} />
{:else if $gameStore.page === 4}
	<h1>Round {$gameStore.currentRound + 1}: {roundsData[$gameStore.currentRound].title}</h1>
	<p>{roundsData[$gameStore.currentRound].desc}</p>
	<p>
		We play until all cards are guessed. Then we score.
	</p>
	<button on:click={gameStore.nextPage}>Next</button>
{:else if $gameStore.page === 5}
	<GuessCards cards={$gameStore.cards} />
{:else}
	not implemented yet
{/if}
