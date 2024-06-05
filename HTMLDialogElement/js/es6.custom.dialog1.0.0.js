/**
 * CustomDialog 類
 * 這個類用於創建和管理自定義對話框。
 * 
 * @class CustomDialog
 * @param {string} dialogContentSelector - 對話框內容的 CSS 選擇器
 * @param {Object} [options={}] - 配置選項
 * @param {string} [options.backdropStyle] - 對話框背景樣式
 * @param {string|string[]} [options.closeButtonSelectors] - 用於關閉對話框的按鈕選擇器
 */
class CustomDialog {
  constructor(root, dialogContentSelector, options = {}) {
    this.root = root || document.body;
    this.dialogContent = this.root.querySelector(dialogContentSelector);
    if (!this.dialogContent) {
      throw new Error('Dialog content not found');
    }

    this.dialog = document.createElement('dialog');
    this.dialog.appendChild(this.dialogContent);
    this.root.appendChild(this.dialog);

    if (options.backdropStyle) {
      this.setBackdropStyle(options.backdropStyle);
    }
    this.setDialogStyle();
    this.initializeEvents(options.closeButtonSelectors);
  }

  setBackdropStyle(style) {
    let styleTag = document.getElementById('dynamicDialogStyles');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'dynamicDialogStyles';
      this.root.appendChild(styleTag);
    }
    styleTag.textContent = `dialog::backdrop { ${style} }`;
  }

  setDialogStyle() {
    Object.assign(this.dialog.style, {
      all: "unset",
      width: "100%",
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    })
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

// 動態檢查環境並導出
if (typeof window !== 'undefined') {
  window.CustomDialog = CustomDialog;
}

// 如果支援模組導出，則導出 CustomDialog
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CustomDialog };
} else if (typeof define === 'function' && define.amd) {
  define([], function() {
    return { CustomDialog };
  });
}
