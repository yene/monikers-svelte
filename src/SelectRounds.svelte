<script>

import Modal from './Modal.svelte';

let rounds = [
  {title: 'Any Words', desc: 'Use ANY WORDS except the name itself, \nincluding other card text.', checked: true},
  {title: 'One Word', desc: 'Use only ONE WORD.', checked: true},
  {title: 'No Language', desc: 'NO LANGUAGE allowed, \nonly physical gestures and imitations.', checked: true},
  {title: 'Hands', desc: 'Only use your hands.', checked: true},
  {title: 'Noise', desc: 'No words, no movement, \njust a singular noise.', checked: true},
];
let selectedRound = rounds[0];

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
	{#each rounds as round, i}
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
