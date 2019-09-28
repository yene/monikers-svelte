export function shuffle(c) {
  var l = c.length;
  for (var i = l-1; i > 0; i--) {
    var n = Math.floor((Math.random() * i));
    var temp = c[i];
    c[i] = c[n];
    c[n] = temp;
  }
  return c;
}

export function Timer(cbUpdate, cbEnd, delay) {
  var timeoutId, timerId, paused, start;
  var remaining = delay;

  this.isPaused = function() {
    return paused;
  };

  this.toggle = function() {
    if (paused) {
      this.resume();
    } else {
      this.pause();
    }
  };

  this.pause = function() {
    paused = true;
    window.clearTimeout(timeoutId);
    window.clearInterval(timerId);
    remaining -= Date.now() - start;
  };

  this.resume = function() {
    paused = false;
    start = Date.now();
    window.clearTimeout(timeoutId);
    window.clearInterval(timerId);
    timeoutId = window.setTimeout(cbEnd, remaining);
    timerId = window.setInterval(cbUpdate, 1000);
  };

  this.resume();
};
