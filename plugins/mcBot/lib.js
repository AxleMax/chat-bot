exports.generateBotInfoHTML = (bot) => `
<html>
<head>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Segoe UI', system-ui, sans-serif;
    }

    .info-card {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      padding: 2rem;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      color: white;
      width: 500px;
      min-height: 300px;
    }

    .title {
      text-align: center;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.8rem;
      justify-content: center;
    }

    .title h1 {
      font-size: 1.8rem;
      font-weight: 600;
      letter-spacing: 1px;
      background: linear-gradient(45deg, #00b4d8, #90e0ef);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .status-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }

    .status-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 10px;
      transition: 0.3s;
    }

    .status-item:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
    }

    .icon {
      font-size: 1.5rem;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .status-running .icon { background: #2ecc71; }
    .status-stopped .icon { background: #e74c3c; }
    .status-server .icon { background: #3498db; }
    .status-users .icon { background: #9b59b6; }
    .status-listening .icon { background: #f1c40f; }

    .content {
      flex: 1;
    }

    .label {
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 0.3rem;
    }

    .value {
      font-size: 1.1rem;
      font-weight: 600;
      color: white;
    }
  </style>
</head>
<body id="body">
  <div class="info-card">
    <div class="title">
      <i class="fas fa-robot" style="font-size: 2rem; color: #00b4d8"></i>
      <h1>Bot 状态监控</h1>
    </div>

    <div class="status-list">
      <div class="status-item ${bot.isRunning ? 'status-running' : 'status-stopped'}">
        <div class="icon">
          <i class="fas ${bot.isRunning ? 'fa-play' : 'fa-stop'}"></i>
        </div>
        <div class="content">
          <div class="label">运行状态</div>
          <div class="value">${bot.isRunning ? '运行中 🟢' : '未运行 🔴'}</div>
        </div>
      </div>

      <div class="status-item status-server">
        <div class="icon">
          <i class="fas fa-server"></i>
        </div>
        <div class="content">
          <div class="label">当前服务器</div>
          <div class="value">${bot.server || '未加入 ⚠️'}</div>
        </div>
      </div>

      <div class="status-item status-users">
        <div class="icon">
          <i class="fas fa-users"></i>
        </div>
        <div class="content">
          <div class="label">在线人数</div>
          <div class="value">${bot.ins ? Object.keys(bot.ins.players).length : 0}</div>
        </div>
      </div>

      <div class="status-item status-listening">
        <div class="icon">
          <i class="fas fa-headphones"></i>
        </div>
        <div class="content">
          <div class="label">监听状态</div>
          <div class="value">${bot.isListening ? '监听中 🔊' : '未监听 🔇'}</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
`;