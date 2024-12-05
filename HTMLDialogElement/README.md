# ES6 Custom Dialog 使用文檔
版本: 1.0.0

## 功能簡介
這是一個基於 ES6 開發的自定義對話框組件，提供了彈窗、確認框等功能的封裝。

## 基本用法

### 初始化

```javascript
const dialog = new CustomDialog(options);
```

### 配置選項
| 參數         | 類型    | 必填 | 默認值 | 說明               |
| ------------ | ------- | ---- | ------ | ------------------ |
| title        | string  | 否   | '提示' | 對話框標題         |
| content      | string  | 是   | -      | 對話框內容         |
| width        | number  | 否   | 400    | 對話框寬度         |
| height       | number  | 否   | 'auto' | 對話框高度         |
| showClose    | boolean | 否   | true   | 是否顯示關閉按鈕   |
| maskClosable | boolean | 否   | true   | 點擊遮罩是否可關閉 |

### 方法
1. `show()`: 顯示對話框
2. `hide()`: 隱藏對話框
3. `destroy()`: 銷毀對話框實例

### 事件
1. `onOk`: 確認按鈕回調
2. `onCancel`: 取消按鈕回調
3. `onClose`: 關閉對話框回調

## 使用示例

### 基礎對話框

```javascript
const dialog = new CustomDialog({
    title: '提示',
    content: '這是一個基礎對話框',
    onOk: () => {
        console.log('點擊了確定');
    }
});

dialog.show();
```

### 確認對話框

```javascript
const confirmDialog = new CustomDialog({
    title: '確認',
    content: '確定要刪除嗎？',
    showCancel: true,
    onOk: () => {
        console.log('確認刪除');
    },
    onCancel: () => {
        console.log('取消刪除');
    }
});

confirmDialog.show();
```

## 注意事項
1. 建議在使用完對話框後調用 `destroy()` 方法進行銷毀，避免內存洩漏
2. 對話框默認會添加遮罩層，可通過 `maskClosable` 控制點擊遮罩行為
3. 所有回調函數都支持 Promise 方式使用

## 瀏覽器兼容性
- Chrome 60+
- Firefox 55+
- Safari 10+
- Edge 15+

## 依賴
- 無外部依賴，純 ES6 實現

## 版本記錄
### 1.0.0
- 初始版本發布
- 實現基礎對話框功能
- 支持自定義主題
