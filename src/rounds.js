let rounds = [
  {title: 'Any Words', desc: 'Use ANY WORDS except the name itself, \nincluding other card text.', checked: true},
  {title: 'One Word', desc: 'Use only ONE WORD.', checked: true},
  {title: 'No Language', desc: 'NO LANGUAGE allowed, \nonly physical gestures and imitations.', checked: true},
  {title: 'Hands', desc: 'Only use your hands.', checked: false},
  {title: 'Noise', desc: 'No words, no movement, \njust a singular noise.', checked: false},
];

// add index to the object, for easier handling later
rounds.forEach(function(r, i) {
  r.index = i;
});

export let roundsData = rounds;
