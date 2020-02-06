let rounds = [
  {title: 'Any Words', desc: 'Use any words, sounds, or gestures except the name itself, including the clue text on the card.', checked: true},
  {title: 'One Word', desc: 'Use only one word.', checked: true},
  {title: 'No Language', desc: 'NO LANGUAGE allowed, \nonly physical gestures and imitations, sound effects are ok.', checked: true},
  {title: 'Hands', desc: 'Only use your hands.', checked: false},
  {title: 'Noise', desc: 'No words, no movement, \njust a singular noise.', checked: false},
];

// add index to the object, for easier handling later
rounds.forEach(function(r, i) {
  r.index = i;
});

export let roundsData = rounds;
