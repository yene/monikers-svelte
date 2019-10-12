
<!-- TODO: make sure one item is selected, comuted property-->

<script>
import {roundsData} from './rounds.js';
import {showAlert} from './dialog.js';
import { createEventDispatcher } from 'svelte';
import Swal from 'sweetalert2';

const dispatch = createEventDispatcher();
let rounds = JSON.parse(JSON.stringify(roundsData));

$: selectedRounds = rounds.filter(r => r.checked).map(r => r.index);

function next() {
  dispatch('next', {selectedRounds: selectedRounds});
}

function showModalFor(round) {
  // showAlert(round.title, round.desc);
  Swal.fire({
    title: round.title,
    text: round.desc,
  });
}

</script>

<div class="layout-root">
	<div class="layout-content">
    <h1 class="center">Select Rounds</h1>
    <ul>
      {#each rounds as round}
        <li>
          <label>
            <input type=checkbox bind:checked={round.checked}> {round.title}
          </label>
          <button class="info" on:click={e => showModalFor(round)}></button>
        </li>
      {/each}
    </ul>
	</div>
  <div class="layout-footer">
  	<!-- <a class="cancel-link" on:click={() => {window.location.reload()}} href="#">cancel</a> -->
    <button class:pure-button-disabled={selectedRounds.length === 0} on:click={next}>Next</button>
  </div>
</div>

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

ul {
  list-style: none;
}

.cancel-link {
  color: rgba(102, 95, 124, 0.596);
}

.layout-root {
	display: flex;
	flex-direction: column;
	min-height: 100%;
	padding: 10px;
}
.layout-content {
	flex: 1;
}
.layout-footer {
	text-align: center;
}
</style>
