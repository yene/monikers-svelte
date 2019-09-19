<script>
export let person;
export let text;
export let genre;
export let points;

</script>

<div class="card">
  <h1>{person}</h1>
  <p>{text}</p>
  <div class="line"></div>
  <div class="genre" id="genre">{genre}</div>
  <div class="points" id="points">
    <span class="points-value">{points}</span>
    <div class="points-label">Point</div>
  </div>
</div>
<div class="control">
  <button class="button-error pure-button" id="x" on-tap="skip"><img src="icons/x.svg" height="25" width="25"></button>
  <button class="button-success pure-button" id="check" on-tap="identified"><img src="icons/check.svg" height="25" width="25"></button>
</div>

<style>
  :host {
    margin: 10px;
  }

  .card {
    pointer-events: none;
    position: relative;
    padding: 20px;
    /* 6x9 cm */
    width: 240px;
    height: 360px;
    background-color: white;
    border-radius: 10px;
    text-align: center;
    box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.75);
  }

  .card > h1 {
    font-size: 18px;
    margin-top: 26px;
    margin-bottom: 23px;
    font-weight: normal;
    /*height: 46px;*/
    line-height: 23px;
  }

  .card > p {
    font-size: 12px;
  }

  .card > .line {
    position: absolute;
    bottom: 100px;
    left: 70px;
    width: 100px;
    border-bottom: 2px dotted gray;
  }

  .card > .genre {
    text-transform: uppercase;
    position: absolute;
    bottom: 70px;
    left: 20px;
    width: 200px;
    color: #62A591;
    font-size: 10px;
    letter-spacing: 2px;
  }

  .card > .points {
    position: absolute;
    bottom: 0;
    left: 90px;
    color: white;
    background-color: #62A591;
    width: 60px;
    height: 50px;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    font-size: 20px;
    padding-top: 5px;
  }

  .card > .points > .points-label {
    text-transform: uppercase;
    font-size: 8px;
  }

  .control {
    text-align: center;
    margin-top: 10px;
  }

  .button-success {
    background: rgb(28, 184, 65); /* this is a green */
  }

  .button-error {
    margin-right: 10px;
    background: rgb(202, 60, 60); /* this is a maroon */
  }
</style>
