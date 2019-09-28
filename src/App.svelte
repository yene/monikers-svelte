<script>
import { gameStore } from './store.js';

import Setup from './Setup.svelte';
import SelectRounds from './SelectRounds.svelte';
import ChooseCards from './ChooseCards.svelte';
import {roundsData} from './rounds.js';
import GuessCards from './GuessCards.svelte';
import Restore from './Restore.svelte';

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

function scoreRound(e) {
	var currentRound = $gameStore.currentRound;
	var roundCount = $gameStore.selectedRounds.length;

	var s = $gameStore.scores;
	s[currentRound] = e.detail;
	gameStore.mergeObject({
		scores: s,
	});

	if ((currentRound + 1) === roundCount) {
		// total scoring
		gameStore.nextPage();
		gameStore.mergeObject({
			gameInProgress: false,
		});
		return;
	}

	gameStore.mergeObject({
		currentRound: (currentRound + 1),
		page: 4,
	});
}

function scoreTotal() {
	console.log('called');
	var total = {cards: [0,0], points: [0,0]};
	for (var round of $gameStore.scores) {
		total.cards[0] += round.cards[0];
		total.cards[1] += round.cards[1];
		total.points[0] += round.points[0];
		total.points[1] += round.points[1];
	}
	return total;
}

</script>

<Restore />

game in progress: {$gameStore.gameInProgress}

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
	<GuessCards cardpool={$gameStore.cards} on:scoreRound={scoreRound}/>
{:else if $gameStore.page === 6}
	<h1>Game did end</h1>
	<table class="pure-table pure-table-horizontal">
		<thead>
		<tr>
			<th></th>
			<th>Team 1</th>
			<th>Team 2</th>
		</tr>
		</thead>
		<tbody>
		{#each $gameStore.scores as round, i}
		<tr>
			<td>Round {i+1}</td>
			<td>{round.points[0]} points {round.cards[0]} cards</td>
			<td>{round.points[1]} points {round.cards[1]} cards</td>
		</tr>
		{/each}
		<tr>
			<td><strong>Total</strong></td>
			{#if scoreTotal().points[0] > scoreTotal().points[1]}
			<td><strong>{scoreTotal().points[0]} points {scoreTotal().cards[0]} cards</strong></td>
			<td>{scoreTotal().points[1]} points {scoreTotal().cards[1]} cards</td>
			{:else if scoreTotal().points[0] < scoreTotal().points[1]}
			<td>{scoreTotal().points[0]} points {scoreTotal().cards[0]} cards</td>
			<td><strong>{scoreTotal().points[1]} points {scoreTotal().cards[1]} cards</strong></td>
			{:else}
			<td>{scoreTotal().points[0]} points {scoreTotal().cards[0]} cards</td>
			<td>{scoreTotal().points[1]} points {scoreTotal().cards[1]} cards</td>
			{/if}
		</tr>
		</tbody>
	</table>
{:else}
	How did you get here!
{/if}
