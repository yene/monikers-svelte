<script>
import Check from '../public/icons/check-regular.svg';

export let Title;
export let Description;
export let Category;
export let Points;
export let choosen;
export let guessed;
export let PictureURL; // placebo to silence runtime
</script>

<div class="card" class:card-selected={choosen} class:green="{Points === 1}" class:blue="{Points === 2}" class:violet="{Points === 3}" class:red="{Points === 4}">
  {#if guessed}
    <div class="card-guessed">{@html Check}</div>
  {/if}
  <div class="card-body">
    <h1>{Title}</h1>
    <p>{Description}</p>
    <div class="line"></div>
    <div class="genre" id="genre">{Category}</div>
    <div class="points" id="points">
      <span class="points-value">{Points}</span>
      <div class="points-label">Point</div>
    </div>
  </div>
</div>

<style>
  .card-guessed {
    background-color:green;
    opacity: 0.7;
    pointer-events: none;
    position: absolute;
    color: limegreen;
    z-index: 1;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
  .green .genre {
    color: #54b899;
  }

  .green .points {
    background-color: #54b899;
  }

  .blue .genre {
    color: #15ace5;
  }
  .blue .points {
    background: #15ace5;
  }

  .violet .genre {
    color: #8f66a5;
  }
  .violet .points {
    background: #8f66a5;
  }

  .red .genre {
    color: #e84735;
  }
  .red .points {
    background: #e84735;
  }

  .card {
    user-select: none;
    -webkit-user-select: none;
    pointer-events: none;
    position: relative;
    /* 6x9 cm */
    width: 288px;
    height: 432px;
    background-color: white;
    border-radius: 10px;
    text-align: center;
    box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.75);
  }
  .card-body {
    padding: 20px;
    height: 100%;
    width: 100%;
  }

  .card-selected {
    box-shadow: 2px 2px 5px 0px rgba(43, 68, 209, 0.75);
    border: 1px solid rgba(43, 68, 209, 1);
    margin-left: -1px;
    margin-top: -1px;
    width: 290px; /* card size + border */
    height: 434px;
  }

  .card-body > h1 {
    font-size: 20px;
    margin-top: 15px; /*26px;*/
    margin-bottom: 15px; /*23px;*/
    font-weight: bold;
    /*height: 46px;*/
    line-height: 23px;
  }

  .card-body  > p {
    font-size: 16px;
  }

  .card-body > .line {
    position: absolute;
    bottom: 100px;
    left: 80px;
    width: 130px;
    border-bottom: 2px dotted gray;
  }

  .card-body > .genre {
    text-transform: uppercase;
    position: absolute;
    bottom: 70px;
    left: 0px;
    width: 100%;
    /* color: #62A591; */
    font-size: 10px;
    letter-spacing: 2px;
  }

  .card-body > .points {
    position: absolute;
    bottom: 0;
    left: 115px;
    color: white;
    /* background-color: #62A591; */
    width: 60px;
    height: 50px;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    font-size: 20px;
    padding-top: 5px;
  }

  .card-body > .points > .points-label {
    text-transform: uppercase;
    font-size: 8px;
  }

</style>
