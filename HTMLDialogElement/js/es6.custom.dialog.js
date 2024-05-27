class CustomDialog {
  constructor(dialogContentSelector, options = {}) {
    this.dialogContent = document.querySelector(dialogContentSelector);
    if (!this.dialogContent) {
      throw new Error('Dialog content not found');
    }

    this.dialog = document.createElement('dialog');
    this.dialog.appendChild(this.dialogContent);
    document.body.appendChild(this.dialog);

    this.setDialogStyles();
    if (options.backdropStyle) {
      this.setBackdropStyle(options.backdropStyle);
    }

    this.initializeEvents(options.closeButtonSelectors);
  }

  setDialogStyles() {
    Object.assign(this.dialog.style, {
      all: 'unset',
      width: '100%',
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    });
  }
  
  setBackdropStyle(style) {
    let styleTag = document.getElementById('dynamicDialogStyles');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'dynamicDialogStyles';
      document.head.appendChild(styleTag);
    }
    styleTag.textContent = `dialog::backdrop { ${style} }`;
  }

  showDialog() {
    this.dialog.showModal();
    this.dialogContent.style.display = 'block';
  }

  closeDialog() {
    this.dialog.close();
    this.dialogContent.style.display = 'none';
  }

  initializeEvents(closeButtonSelectors) {
    if (!Array.isArray(closeButtonSelectors)) {
      closeButtonSelectors = [closeButtonSelectors];
    }

    closeButtonSelectors.forEach(selector => {
      const buttons = this.dialogContent.querySelectorAll(selector);
      buttons.forEach(button => {
        button.addEventListener('click', () => this.closeDialog());
      });
    });
  }
}

window.CustomDialog = CustomDialog;