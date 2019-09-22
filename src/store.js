import { writable, get } from 'svelte/store';


var defaultGameState = {
  page: 0, // current view the user sees.
  cards: [], // cards which have been choosen.
  gameInProgress: false, // to check if the user has started the game
  playerCount: 4,
  timeLimit: 60,
  selectedRounds: [],
  currentRound: 0,
};

function createGameStore() {
	const { subscribe, set, update } = writable(defaultGameState);

	return {
    subscribe,
    mergeObject: (obj) => {
      var ks = Object.keys(obj);
      for (var k of ks) {
        if (!defaultGameState.hasOwnProperty(k)) {
          throw new Error('Cannot merge object, it is not compatible with defaultGameState');
        }
      }
      var state = get(gameStore);
      for (var k of ks) {
        state[k] = obj[k];
      }
      update(() => {
        return state;
      });
    },
		nextPage: () => update(s => {
      s.page = s.page + 1;
      return s;
    }),
		reset: () => set(defaultGameState),
	};
}

export const gameStore = createGameStore();
