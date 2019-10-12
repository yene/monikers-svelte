import { writable, get } from 'svelte/store';


var defaultGameState = {
  page: 0, // current view the user sees.
  cards: [], // cards which have been choosen.
  gameInProgress: false, // to check if the user has started the game
  playerCount: 4,
  timeLimit: 60,
  selectedRounds: [],
  currentRound: 0,
  scores: [], // scores[currentround].cards[team] scores[currentround].points[team]
};

function createGameStore() {
	const { subscribe, set, update } = writable(defaultGameState);

	return {
    subscribe,
    // Objects are not observable, thats why we merge each property manually and then send an update for the whole object.
    mergeObject: (obj) => {
      var ks = Object.keys(obj);
      for (var k of ks) {
        if (!defaultGameState.hasOwnProperty(k)) {
          throw new Error('Cannot merge object, it is not compatible with defaultGameState. ' + JSON.stringify(obj));
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
      if (s.page === 5) {
        s.gameInProgress = true;
      }
      return s;
    }),
    reset: () => {
      console.log('setting store to defaults', defaultGameState);
      set(defaultGameState);
    },
	};
}

export const gameStore = createGameStore();
