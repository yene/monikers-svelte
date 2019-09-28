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
		window.localStorage.setItem('gameState', JSON.stringify($gameStore));
	} catch (e) {
		console.log(e)
	}
})

onMount(() => {
	if ($gameStore.gameInProgress) {
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
				Swal.fire(
					'Restored!',
					'Continue',
					'success'
				);
			} else {
				Swal.fire(
					'Deleted!',
					'A fresh start.',
					'success'
				);
				try {
					window.localStorage.removeItem('gameState');
				} catch (e) {
					console.log(e);
				}
			}
		});
	}
});

</script>
