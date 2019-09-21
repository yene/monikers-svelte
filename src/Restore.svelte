<script>
import Swal from 'sweetalert2';

onMount(() => {
	if (gameInProgress()) {
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
				}
			}
		});
	}
});

</script>
