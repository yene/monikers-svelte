<script>
import Card from './Card.svelte';
import {createEventDispatcher} from 'svelte';
import {Timer} from './utils.js';
import {onMount} from 'svelte';
import {gameStore} from './store.js';
import ArrowRight from '../public/icons/arrow-right-regular.svg';
import Check from '../public/icons/check-regular.svg';
import Times from '../public/icons/times-regular.svg';
import Swal from 'sweetalert2';
import {roundsData} from './rounds.js';

const dispatch = createEventDispatcher();

export let cardpool = [];
let cards = [];

let currentTeam = 0; // 0 or 1
let scoredCards = [[],[]];

function changeTeam() {
  Swal.fire(
    'Other teams turn!',
    'Please hand over the device.',
  ).then(() => {
    currentTeam = Number(!currentTeam);
    cards = cards.filter((c) => {
      return c.guessed !== true;
    });
    showCurrentTeam();
  });
}

function showCurrentTeam() {
  setTimeout(() => {
    nextCard(-1);
  }, 0);

  Swal.fire(
    'Team ' + (currentTeam + 1),
    roundsData[$gameStore.currentRound].desc,
  ).then(() => {
    timer.reset();
  });
}

function endRound() {
  timer.pause();
  var team0points = scoredCards[0].reduce((accumulator, currentValue) => accumulator + currentValue.Points, 0);
  var team1points = scoredCards[1].reduce((accumulator, currentValue) => accumulator + currentValue.Points, 0);
  dispatch('scoreRound', {
    cards: [scoredCards[0].length, scoredCards[1].length],
    points: [team0points, team1points],
  });
}

function scoreCards() {
  var sc = cards.filter((c) => {
    return c.guessed === true;
  });
  scoredCards[currentTeam] = scoredCards[currentTeam].concat(sc);
}

function areAllCardsGuessed() {
  var remaining = cards.filter((c) => {
    return c.guessed !== true;
  }).length;
  return (remaining === 0);
}

var timerLabel = "&#10074;&#10074;";
var timer = null;
var currentTime = $gameStore.timeLimit;

onMount(() => {
  cards = JSON.parse(JSON.stringify(cardpool));
  cards.forEach((c) => {
    c.choosen = false;
  });
  // TODO: current team has to be restored correcty
  setupTimer();
  showCurrentTeam();
});

function guessedCard(i, card) {
  // I have the array to tell which index I changed, I cannot change the object.
  cards[i].guessed = true;
  if (areAllCardsGuessed()) {
    scoreCards();
    endRound();
    return;
  }
  nextCard(i);
}
function nextCard(i) {
  // Find next card which is not guessed, first to the right, then from anywhere.
  var cardIndex = cards.findIndex((c, j) => {
    return c.guessed === false && j > i;
  });
  if (cardIndex === -1) {
    cardIndex = cards.findIndex((c, i) => {
      return c.guessed === false;
    });
  }
  var element = document.getElementById('card-' + cardIndex);
  var offset = element.offsetLeft;
  // scrollTo does not work together with scroll-snap on iOS
  var cardWidth = 288;
  var margin = screen.width - cardWidth;
  offset = offset - (margin/2);
  element.parentNode.scrollTo({left: offset, behavior: 'smooth'});
}

function setupTimer() {
  currentTime = $gameStore.timeLimit;
  timerLabel = currentTime;
  timer = new Timer(() => {
    currentTime--;
    timerLabel = currentTime;
  },
  () => {
    timer.pause();
    // reset time butotn labels
    currentTime = $gameStore.timeLimit;
    timerLabel = $gameStore.timeLimit;
    scoreCards();
    changeTeam();
  }, 1000 * $gameStore.timeLimit);
}

function toggleTimer(e) {
  if (timer.isPaused()) {
    timerLabel= currentTime;
  } else {
    timerLabel = "&#10074;&#10074;";
  }
  timer.toggle();
  e.preventDefault();
}
function stopTimer() {
  timer.pause();
  currentTime = $gameStore.timeLimit;
  timerLabel = $gameStore.timeLimit;
}
function showImage(img) {
  Swal.fire({
    imageUrl: img,
    imageHeight: 320,
  });
}
</script>

<div class="layout-root">
  <div class="layout-header">
    <span class="game-progress">Team {currentTeam + 1} - {cards.length} cards left.</span>
    <button class="timer-btn" on:click={toggleTimer}>{@html timerLabel}</button>
  </div>
  <div class="layout-content">
    <div class="cards-row">
    {#each cards as card, i}
      <div class="a-card" id={'card-' + i}>
        {#if card.PictureURL}
          <a class="card-picture" on:click={() => {showImage(card.PictureURL)}}><img src="/icons/image-solid.svg" width="40" height="40"></a>
        {/if}
        <Card {...card} />
        {#if !card.guessed}
        <div class="button-row">
          <button class="card-button button-correct" on:click={() => {guessedCard(i, card)}}>{@html Check}</button>
          <button class="card-button button-next" on:click={() => {nextCard(i)}}>{@html ArrowRight}</button>
        </div>
        {/if}
      </div>
      <div class="space-between"></div>
    {/each}
    </div>
  </div>
</div>

<style>

.space-between {
  min-width: 20px;
}

.button-correct {
  color: limegreen;
}

.button-next {
  color: deepskyblue;
}

.button-row {
  margin-top: 10px;
  text-align: center;
}

.card-button:first-child {
  margin-right: 10px;
}

.card-button {
  width: 50px;
  height: 50px;
  padding: 5px;
}

.timer-btn {
  width: 40px;
  margin-right: 15px;
  float: right;
}
.game-progress {
  line-height: 40px;
  font-size: 22px;
  padding-left: 20px;
}

.cards-row {
  display: flex;
  padding: 10px;
  overflow: scroll;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}
.a-card {
  position: relative;
  scroll-snap-align: center;
}

/* hide scrollbar */
.cards-row {
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
}
.cards-row::-webkit-scrollbar {
  display: none;  /* Safari and Chrome */
}

.card-picture {
  position: absolute;
  bottom: 80px;
  z-index: 99;
  left: 20px;
}

</style>
