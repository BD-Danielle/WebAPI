const express = require('express');
const app = express();

// 提供靜態文件
app.use(express.static('.'));

// SSE 端點
app.get('/events', (req, res) => {
  // 設置 SSE 所需的 headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // 發送初始消息
  res.write('data: 連接成功！\n\n');

  // 每 5 秒發送一條消息
  const intervalId = setInterval(() => {
    res.write(`data: ${new Date().toLocaleTimeString()}\n\n`);
  }, 5000);

  // 當客戶端斷開連接時清理
  req.on('close', () => {
    clearInterval(intervalId);
  });
});

app.listen(3000, () => {
  console.log('服務器運行在 http://localhost:3000');
}); 