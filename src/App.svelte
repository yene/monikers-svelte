<script>
import 'whatwg-fetch';
import Swal from 'sweetalert2';
import { onMount } from 'svelte';

import Setup from './Setup.svelte';
import Card from './Card.svelte';

// full reset or cancel of current game

// storing data: {timeLimit, playerCount, rounds, currentTurn}

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
	});
});

let playerCount = 4;
let timeLimit = 60;

function next(e) {
	playerCount = e.detail.playerCount;
	timeLimit = e.detail.timeLimit;

}

</script>

<style>

</style>
<Setup on:next={next}/>

{#each cards as card}
	<Card {...card} />
{/each}
