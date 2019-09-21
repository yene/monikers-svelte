
<!-- TODO: make sure one item is selected, comuted property-->

<script>

import Modal from './Modal.svelte';
import {roundsData} from './rounds.js';

let rounds = JSON.parse(JSON.stringify(roundsData));
let selectedRound = null;

function next() {
  var seletedRounds = rounds.filter(r => r.checked);
  console.log(selectedRounds);
  // dispatch('next', {seletedRounds: seletedRounds});
}

function showModalFor(round) {
  selectedRound = round;
}

function closeModal() {
  selectedRound = null;
}

</script>

<style>
.info {
  border: 1px solid black;
  padding: 2px;
  border-radius: 50%;
  cursor: help;
  width: 20px;
  height: 20px;
  background-image: url("icons/question-mark.svg");
  background-repeat: no-repeat;
  background-position: center center;
  vertical-align: top;
}

label {
  display: inline-block;
}

</style>

<ul>
	{#each rounds as round}
		<li>
      <label>
        <input type=checkbox bind:checked={round.checked}>{round.title}
      </label>
      <button class="info" on:click={e => showModalFor(round)}></button>
    </li>
	{/each}
</ul>

{#if selectedRound !== null}
  <Modal title={selectedRound.title} content={selectedRound.desc} on:close={closeModal} />
{/if}

<button on:click={next}>Next</button>
