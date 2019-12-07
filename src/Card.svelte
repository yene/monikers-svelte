<script>
export let Title;
export let Description;
export let Category;
export let Points;
export let selected;

</script>

<div class="card" class:card-selected={selected} class:green="{Points === 1}" class:blue="{Points === 2}" class:violet="{Points === 3}" class:red="{Points === 4}">
  <h1>{Title}</h1>
  <p>{Description}</p>
  <div class="line"></div>
  <div class="genre" id="genre">{Category}</div>
  <div class="points" id="points">
    <span class="points-value">{Points}</span>
    <div class="points-label">Point</div>
  </div>
</div>

<style>
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

  .card-selected {
    box-shadow: 2px 2px 5px 0px rgba(43, 68, 209, 0.75);
    border: 1px solid rgba(43, 68, 209, 1);
    margin-left: -1px;
    margin-top: -1px;
    width: 242px;
    height: 362px;
  }

  .card > h1 {
    font-size: 18px;
    margin-top: 15px; /*26px;*/
    margin-bottom: 15px; /*23px;*/
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
    /* color: #62A591; */
    font-size: 10px;
    letter-spacing: 2px;
  }

  .card > .points {
    position: absolute;
    bottom: 0;
    left: 90px;
    color: white;
    /* background-color: #62A591; */
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

</style>
