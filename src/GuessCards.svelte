<script>
import Card from './Card.svelte';
import {createEventDispatcher} from 'svelte';
import {Timer} from './utils.js';
import {onMount} from 'svelte';
import {gameStore} from './store.js';

const dispatch = createEventDispatcher();

export let cardpool = [];
let cards = [];

let currentTeam = 0; // 0 or 1
let scoredCards = [[],[]];

function turnDidEnd() {
  alert('next teams turn, please hand over the phone');
  var stop = scoreCards();
  if (stop === true) {
    return;
  }
  changeTeam();
  startTimer();
  console.log(scoredCards);
}

function changeTeam() {
  currentTeam = Number(!currentTeam);
}

function scoreCards() {
  var sc = cards.filter((c) => {
    return c.guessed === true;
  });
  scoredCards[currentTeam] = scoredCards[currentTeam].concat(sc);
  cards = cards.filter((c) => {
    return c.guessed !== true;
  });
  if (cards.length === 0) {
    stopTimer();
    // show subtotal score, and go to next turn
    var team0points = scoredCards[0].reduce((accumulator, currentValue) => accumulator + currentValue.Points, 0);
    var team1points = scoredCards[1].reduce((accumulator, currentValue) => accumulator + currentValue.Points, 0);
    dispatch('scoreRound', {
      cards: [scoredCards[0].length, scoredCards[1].length],
      points: [team0points, team1points],
    });
    return true;
  }
  return false;
}

function checkGameEnd(e) {
  var remaining = cards.filter((c) => {
    return c.guessed !== true;
  }).length;
  if (remaining === 0) {
    scoreCards();
  }
}

var timerLabel = "&#10074;&#10074;";
var timer = null;
var currentTime = $gameStore.timeLimit;

onMount(() => {
  cards = JSON.parse(JSON.stringify(cardpool));
  setTimeout(()=> {
    startTimer();
  }, 500);
});

function startTimer() {
  currentTime = $gameStore.timeLimit;
  timerLabel = currentTime;
  timer = new Timer(() => {
    currentTime--;
    timerLabel = currentTime;
  },
  () => {
    timer.pause();
    currentTime = $gameStore.timeLimit;
    timerLabel = $gameStore.timeLimit;
    turnDidEnd();
  }, 1000 * $gameStore.timeLimit);
}
function toggleTimer(e) {
  if (timer.isPaused()) {
    timerLabel= currentTime;
  } else {
    timerLabel = "&#10074;&#10074;";
  }
  timer.toggle(); // TODO: toggle takes one second to show the time
  e.preventDefault();
}
function stopTimer() {
  timer.pause();
  currentTime = $gameStore.timeLimit;
  timerLabel = $gameStore.timeLimit;
}
</script>

<div class="layout-root">
  <div class="layout-header">
    <span class="game-progress">Team {currentTeam + 1} turn. {cards.length} cards left.</span>
    <button class="timer-btn" on:click={toggleTimer}>{@html timerLabel}</button>
  </div>
  <div class="layout-content">
    <div class="cards-row">
    {#each cards as card}
      <div class="a-card">
        <label>
        <Card {...card} bind:selected={card.guessed}/>
        <input style="display: none" type="checkbox" bind:checked={card.guessed} on:change={checkGameEnd}></label>
      </div>
    {/each}
    </div>
  </div>
</div>



<style>
.timer-btn {
  width: 40px;
  float: right;
}
.game-progress {
  line-height: 40px;
  font-size: 20px;
}

</style>
