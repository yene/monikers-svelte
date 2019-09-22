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
