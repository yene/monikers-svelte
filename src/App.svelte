<script>
import 'whatwg-fetch'
import { onMount } from 'svelte';

import Card from './Card.svelte';
// full reset or cancel of current game

// storing the setup, rounds, current progress

let cards = [];
onMount(() => {
	fetch('/cards.json')
  .then(function(response) {
    return response.json()
  }).then(function(json) {
		cards = json;
    console.log('parsed json', json);
  }).catch(function(ex) {
    console.log('parsing failed', ex);
  })
});

</script>

<style>


</style>

{#each cards as card}
	<Card {...card} />
{/each}
