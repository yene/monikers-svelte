<script>
import {gameStore} from './store.js';
import Setup from './Setup.svelte';
import SelectRounds from './SelectRounds.svelte';
import ChooseCards from './ChooseCards.svelte';
import {roundsData} from './rounds.js';
import GuessCards from './GuessCards.svelte';
import Restore from './Restore.svelte';

var totalScore = [];

function storeAndNext(e) {
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
		totalScore = scoreTotal();
		return;
	}

	gameStore.mergeObject({
		currentRound: (currentRound + 1),
		page: 4,
	});
}

function scoreTotal() {
	var total = {cards: [0,0], points: [0,0]};
	for (var round of $gameStore.scores) {
		total.cards[0] += round.cards[0];
		total.cards[1] += round.cards[1];
		total.points[0] += round.points[0];
		total.points[1] += round.points[1];
	}
	return total;
}

function restart() {
	gameStore.reset();
	window.location.reload();
}
</script>

<Restore />
<div class="app">
{#if $gameStore.page === 0}
	<Setup on:next={storeAndNext}/>
{:else if $gameStore.page === 1}
	<SelectRounds on:next={storeAndNext}/>
{:else if $gameStore.page === 2}
	<div class="layout-root">
		<div class="layout-content center padding">
			<h1>Build 2 Teams</h1>
			<div>Every player is now going to pick<br> 5 out of 10 cards, for his team to guess.</div>
		</div>
		<div class="layout-footer">
			<button class="nav-button" on:click={gameStore.nextPage}>Next</button>
		</div>
	</div>
{:else if $gameStore.page === 3}
	<ChooseCards playerCount={$gameStore.playerCount} on:next={storeAndNext} />
{:else if $gameStore.page === 4}
	<div class="layout-root">
		<div class="layout-content center padding">
			<h1>Round {$gameStore.currentRound + 1}: {roundsData[$gameStore.currentRound].title}</h1>
			<div>
				<p>{roundsData[$gameStore.currentRound].desc}</p>
				<p>We play until all cards are guessed.</p>
			</div>
		</div>
		<div class="layout-footer">
			<button class="nav-button" on:click={gameStore.nextPage}>Next</button>
		</div>
	</div>

{:else if $gameStore.page === 5}
	<GuessCards cardpool={$gameStore.cards} on:scoreRound={scoreRound}/>
{:else if $gameStore.page === 6}
	<div class="layout-root">
		<div class="layout-content center padding">
			<h1>Final Score</h1>
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
					<td>{round.cards[0]} cards<br>{round.points[0]} points</td>
					<td>{round.cards[1]} cards<br>{round.points[1]} points</td>
				</tr>
				{/each}
				<tr>
					<td><strong>Total</strong></td>
					{#if totalScore.points[0] > totalScore.points[1]}
					<td><strong>{totalScore.cards[0]} cards<br>{totalScore.points[0]} points</strong></td>
					<td>{totalScore.cards[1]} cards<br>{totalScore.points[1]} points</td>
					{:else if totalScore.points[0] < totalScore.points[1]}
					<td>{totalScore.cards[0]} cards<br>{totalScore.points[0]} points</td>
					<td><strong>{totalScore.cards[1]} cards<br>{totalScore.points[1]} points</strong></td>
					{:else}
					<td>{totalScore.cards[0]} cards<br>{totalScore.points[0]} points</td>
					<td>{totalScore.cards[1]} cards<br>{totalScore.points[1]} points</td>
					{/if}
				</tr>
				</tbody>
			</table>
			<br>
			<button class="nav-button" on:click={restart}>Restart</button>
		</div>
	</div>
{:else}
	How did you get here!
{/if}
</div>

<style>
.app {

}
.pure-table {
	min-width: 95%;
	margin: 0 auto;
}
</style>
