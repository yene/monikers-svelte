<script>
import Swal from 'sweetalert2';
import { onMount } from 'svelte';
import { gameStore } from './store.js';

var isOnIOS = navigator.userAgent.match(/iPad/i)|| navigator.userAgent.match(/iPhone/i);
var eventName = isOnIOS ? 'pagehide' : 'beforeunload';
var _debounce = null;

gameStore.subscribe((gs) => {
	if (gs.gameInProgress === false) {
		return;
	}
	clearTimeout(_debounce);
	_debounce = setTimeout(saveGame, 2000);
});

function saveGame() {
	try {
		window.localStorage.setItem('gameStore', JSON.stringify($gameStore));
		console.log('saved game');
	} catch (e) {
		console.log(e)
	}
}

onMount(() => {
	try {
		var s = window.localStorage.getItem('gameStore');
		var localGameStore = JSON.parse(s);
	} catch (e) {
		console.log(e)
	}

	if (localGameStore && localGameStore.gameInProgress === true) {
		Swal.fire({
			title: 'Game in progress',
			text: 'Do you want to restore previous game?',
			icon: 'question',
			confirmButtonText: 'Restore',
			showCancelButton: true,
			cancelButtonText: 'Restart',
			cancelButtonColor: '#d33',
			reverseButtons: true,
		}).then((result) => {
			if (result.value) {
				gameStore.mergeObject(localGameStore);
				Swal.fire(
					'Restored!',
					'',
					'success'
				);
			} else {
				try {
					window.localStorage.removeItem('gameStore');
				} catch (e) {
					console.log(e);
				}
			}
		});
	}
});

</script>
