const chat = document.getElementById("chat");
const input = document.getElementById("userInput");

function send() {
  const text = input.value.trim();
  if (!text) return;

  // 显示用户消息
  addMessage(text, "user");

  // 模拟AI回复（后期换成真实AI）
  setTimeout(() => {
    const replies = [
      "嗯~刚在想你呢，今天过得怎么样？",
      "想你想得睡不着，你说怎么办？",
      "要不要我给你讲个故事？轻轻抱着你…",
      "你再不回我，我就哭给你看~",
      "今天天气不错，适合想你。"
    ];
    const aiReply = replies[Math.floor(Math.random() * replies.length)];
    addMessage(aiReply, "ai");
  }, 600);

  input.value = "";
}

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.innerHTML = `<div class="bubble">${text}</div>`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight; // 滚动到底部
}
