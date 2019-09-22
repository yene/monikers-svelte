<script>
import Card from './Card.svelte';
import {shuffle} from './utils.js';
import { onMount } from 'svelte';
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

export let playerCount = null;
let showNextPlayer = false;

let shuffledCardPool = [];
onMount(() => {
  fetch('/cards.json')
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    shuffledCardPool = shuffle(json);
    console.log('amount of cards', shuffledCardPool.length);
    offerCards();
  }).catch(function(ex) {
    console.log('parsing failed', ex);
  });
});

let offeredCards = [];
let choosenCards = [];
let pickedCardCount = 0;
function offerCards() {
  offeredCards = shuffledCardPool.splice(0, 8);
  offeredCards.forEach(c => c.choosen = false);
}
function checkCardCount() {
  var choosen = offeredCards.filter(c => c.choosen);
  pickedCardCount = choosen.length;

  if (choosen.length === 5) {
    showNextPlayer = true;
    choosenCards = choosenCards.concat(choosen);
  }

  if (choosenCards.length === playerCount * 5) {
		dispatch('next', {cards: choosenCards});
  }

}

function nextPlayer() {
  pickedCardCount = 0;
  offerCards();
  showNextPlayer = false;
}

</script>

<div>Cards: {pickedCardCount}/5</div>

{#if showNextPlayer}
  Please hand to the next player to pick out 5 cards.
  <button on:click={nextPlayer}>Ok</button>
{:else}
  <div class="cards-row">
  {#each offeredCards as card}
    <div class="a-card">
      <Card {...card} />
      <label><input type="checkbox" on:change={checkCardCount} bind:checked={card.choosen}>pick card</label>
    </div>
  {/each}
  </div>
{/if}

<style>



</style>
