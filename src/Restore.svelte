<script>
import Swal from 'sweetalert2';
import { onMount } from 'svelte';
import { gameStore } from './store.js';

window.addEventListener('beforeunload', (e) => {
	console.log('beforeunload');
	if (!$gameStore.gameInProgress) {
		return;
	}
	try {
		window.localStorage.setItem('gameStore', JSON.stringify($gameStore));
	} catch (e) {
		console.log(e)
	}
})

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
			type: 'question',
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
					'Continue',
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
