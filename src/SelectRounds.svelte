
<!-- TODO: make sure one item is selected, comuted property-->

<script>

import {roundsData} from './rounds.js';
import {showAlert} from './dialog.js';


let rounds = JSON.parse(JSON.stringify(roundsData));

function next() {
  var seletedRounds = rounds.filter(r => r.checked);
  console.log(selectedRounds);
  // dispatch('next', {seletedRounds: seletedRounds});
}

function showModalFor(round) {
  showAlert(round.title, round.desc);
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

<button on:click={next}>Next</button>
