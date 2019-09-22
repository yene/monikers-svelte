
import Modal from './Modal.svelte'
export function showAlert(title, content, closeHandler) {
  var div = document.createElement('div');
  document.body.appendChild(div);
  var modal = new Modal({
    target: div,
    props: {
      title: title,
      content: content,
    }
  });
  modal.$on('close', (e) => {
    document.body.removeChild(div);
    modal.$destroy();
    if (typeof closeHandler === 'function') {
      closeHandler(e);
    }
  });
}
