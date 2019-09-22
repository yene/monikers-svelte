<script>
import Card from './Card.svelte';
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

export let cards = [];

let currentTeam = 0; // 0 or 1
let scoredCards = [[],[]];

function changeTeam() {
  currentTeam = Number(!currentTeam);

}
</script>
  <h1>I is team {currentTeam} turn.</h1>
  <div class="cards-row">
  {#each cards as card}
    <div class="a-card">
      <label>
      <Card {...card} />
      <input type="checkbox" bind:checked={card.guessed}>Guessed</label>
    </div>
  {/each}
  </div>
