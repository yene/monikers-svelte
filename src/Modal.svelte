<script>
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

export let title;
export let content;
export let closeHandler;

function closeModal() {
		dispatch('close');
}
</script>

<style>
.modal {


}

</style>

<div class="modal">
  <button on:click={closeModal}>
		X
	</button>
  <h1>{title}</h1>
  <div>{content}</div>
</div>
