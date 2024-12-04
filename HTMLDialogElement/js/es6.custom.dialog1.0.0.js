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
      border: "unset",
      overflow: 'unset',
      padding: 0,
      margin: "0 auto",
      "background-color": "unset",
      "max-width": "unset",
      "max-height": "unset",
      color: "unset",
      position: "relative"
    })
  }

  showDialog() {
    // 保存當前滾動位置
    this.previousScrollY = window.scrollY;

    // 固定背景並禁用滾動
    document.body.style.position = 'fixed';
    document.body.style.top = `-${this.previousScrollY}px`;
    document.body.style.width = '100%';

    // 顯示對話框
    this.dialog.showModal();
    this.dialogContent.style.display = 'block';
    this.dialogContent.style.width = '100vw';
    this.dialogContent.style.height = '100vh';
  }

  closeDialog() {
    // 取消對話框顯示
    this.dialog.close();
    this.dialogContent.style.display = 'none';

    // 恢復背景滾動
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, this.previousScrollY);
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
    })
  }
}

// 修改導出部分
if (typeof module !== 'undefined' && module.exports) {
  // CommonJS 導出
  module.exports = CustomDialog;
} else if (typeof define === 'function' && define.amd) {
  // AMD 導出
  define([], function() {
    return CustomDialog;
  });
} else {
  // 瀏覽器全局導出
  window.CustomDialog = CustomDialog;
}

// ES6 默認導出
export default CustomDialog;