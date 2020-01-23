<script>
import Card from './Card.svelte';
import {createEventDispatcher} from 'svelte';
import {Timer} from './utils.js';
import {onMount} from 'svelte';
import {gameStore} from './store.js';
import ArrowRight from '../public/icons/arrow-right-regular.svg';
import Check from '../public/icons/check-regular.svg';
import Times from '../public/icons/times-regular.svg';

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
  cards.forEach((c) => {
    c.choosen = false;
  });
  setTimeout(startTimer, 500);
});

function startTimer() {
  console.log('starting timer');
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
    <span class="game-progress">Team {currentTeam + 1} - {cards.length} cards left.</span>
    <button class="timer-btn" on:click={toggleTimer}>{@html timerLabel}</button>
  </div>
  <div class="layout-content">
    <div class="cards-row">
    {#each cards as card}
      <div class="a-card">
        <label>
        <Card {...card} />
        <input style="display: none" type="checkbox" bind:checked={card.guessed} on:change={checkGameEnd}></label>
        <div class="button-row">
          <button class="card-button button-wrong">{@html Times}</button>
          <button class="card-button button-correct">{@html Check}</button>
          <button class="card-button button-next">{@html ArrowRight}</button>
        </div>

      </div>
    {/each}
    </div>
  </div>
</div>



<style>

.button-wrong {
  color: #e84735;
}
.button-correct {
  color: limegreen;
}
.button-next {
  color: deepskyblue;
}


.button-row {
  display: flex;
  justify-content: space-between;
  padding-left: 40px;
  padding-right: 40px;
}

.card-button {
  width: 50px;
  height: 50px;
  padding: 5px;
}

.timer-btn {
  width: 40px;
  float: right;
}
.game-progress {
  line-height: 40px;
  font-size: 20px;
}

.cards-row {
  display: flex;
  padding: 10px;
  overflow: scroll;
  scroll-snap-type: y mandatory;
}
.a-card {
  margin-right: 20px;
  scroll-snap-align: center;
}

.a-card:last-child {
  margin-right: 0;
}

/* hide scrollbar */
.cards-row {
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
}
.cards-row::-webkit-scrollbar {
  display: none;  /* Safari and Chrome */
}
</style>
