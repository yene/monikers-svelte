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
  fetch('/pnp-cards.json')
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
  var crds = shuffledCardPool.splice(0, 10);
  crds.forEach(c => c.choosen = false);
  offeredCards = crds;
}

function selectCard(e, index) {
  offeredCards[index].choosen = !offeredCards[index].choosen;
  e.preventDefault(); // Note: click would still have sent the double click throuhg to the elment behind.
  checkCardCount();
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

<div class="layout-root">
  <div class="layout-content">
    <h3 class="center">Cards: {pickedCardCount}/5</h3>

    {#if showNextPlayer}
      Please hand to the next player to pick out 5 cards.
    {:else}
      <div class="cards-row">
      {#each offeredCards as card, i}
        <div class="a-card" on:mousedown={(e) => {selectCard(e, i)}}>
          <Card {...card} />
        </div>
      {/each}
      </div>
    {/if}
  </div>
  {#if showNextPlayer}
  <div class="layout-footer">
    <button class="nav-button" on:click={nextPlayer}>Ok</button>
  </div>
  {/if}
</div>
