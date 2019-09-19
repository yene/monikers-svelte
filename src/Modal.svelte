<!--
  Modal dialog
  Inspired by bootstrap, https://getbootstrap.com/docs/4.3/components/modal/
  Required: Works well on mobile.
  Optional: Make sure that ESC works.
-->

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
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  outline: 0;
}

.modal-dialog {
  position: relative;
  width: auto;
  margin: .5rem;
  pointer-events: none;
  max-width: 500px;
  margin: 1.75rem auto;
}

.modal-content {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0,0,0,.2);
  border-radius: .3rem;
  outline: 0;
}

</style>

<div class="modal" on:click={closeModal}>
  <div class="modal-dialog">
    <div class="modal-content">
      <button on:click={closeModal}>X</button>
      <h1>{title}</h1>
      <div>{content}</div>
    </div>
  </div>
</div>
