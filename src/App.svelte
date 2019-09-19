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

	if (gameInProgress()) {
		Swal.fire({
			title: 'Game in progress',
			text: 'Do you want to restore previous game?',
			type: 'question',
			confirmButtonText: 'Restore',
			showCancelButton: true,
			cancelButtonText: 'Restart',
			cancelButtonColor: '#d33',
			reverseButtons: true,
		}).then((result) => {
			if (result.value) {
				Swal.fire(
					'Restored!',
					'Your file has been deleted.',
					'success'
				)
			} else {
				Swal.fire(
					'Deleted!',
					'Your file has been deleted.',
					'success'
				)
			}
		});
	}

});

let page = 0;
let playerCount = 4;
let timeLimit = 60;

function next(e) {
	playerCount = e.detail.playerCount;
	timeLimit = e.detail.timeLimit;
}

function gameInProgress() {
	try {
		var s = window.localStorage.getItem('gameState');
		return (s !== null);
	} catch (e) {
		return false;
	}
}

</script>

<style>

</style>

<Setup on:next={next}/>

{#if page === 0}
	Setup
{:else if page === 1}
	Setup
{:else if page === 2}
	Step 2
{:else if page === 3}
	Step 3
{:else if page === 4}
	Step 4
{:else if page === 5}
	Step 5
{:else if page === 6}
	Step 6
{:else if page === 7}
	Step 7
{:else}
	default page
{/if}

<!--
{#each cards as card}
	<Card {...card} />
{/each}
-->
