(() => {
  const trigger = document.getElementById('contact-open');
  const dialog = document.getElementById('contact-dialog');
  const close = document.getElementById('contact-close');
  [trigger, ...document.querySelectorAll('[data-contact-open]')].forEach(button => {
    button.addEventListener('click', () => dialog.showModal());
  });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
})();

(() => {
  const dialog = document.getElementById('contact-dialog');
  const status = document.getElementById('contact-copy-status');
  async function copy(value) {
    if (navigator.clipboard && window.isSecureContext) {
      try { await navigator.clipboard.writeText(value); return; } catch (_) {}
    }
    const field = document.createElement('textarea');
    field.value = value;
    field.setAttribute('readonly', '');
    field.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
    dialog.append(field);
    const focused = document.activeElement;
    try {
      field.select();
      if (!document.execCommand('copy')) throw new Error('Copy failed');
    } finally {
      field.remove();
      if (focused) focused.focus();
    }
  }
  dialog.querySelectorAll('[data-copy]').forEach(button => {
    button.addEventListener('click', async () => {
      status.textContent = '';
      try {
        await copy(button.dataset.copy);
        status.textContent = button.dataset.kind === 'phone'
          ? '\uC804\uD654\uBC88\uD638\uAC00 \uBCF5\uC0AC\uB418\uC5C8\uC5B4\uC694.'
          : '\uC774\uBA54\uC77C\uC774 \uBCF5\uC0AC\uB418\uC5C8\uC5B4\uC694.';
      } catch (_) {
        status.textContent = '\uBCF5\uC0AC\uD558\uC9C0 \uBABB\uD588\uC5B4\uC694. \uD14D\uC2A4\uD2B8\uB97C \uC120\uD0DD\uD574 \uC9C1\uC811 \uBCF5\uC0AC\uD574 \uC8FC\uC138\uC694.';
      }
    });
  });
  dialog.addEventListener('close', () => { status.textContent = ''; });
})();
