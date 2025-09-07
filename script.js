// 获取页面元素
const chat = document.getElementById("chat");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");

// 点击发送按钮
sendButton.addEventListener("click", async () => {
  await send();
});

// 按下回车键发送
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    send();
  }
});

// 发送消息主函数
async function send() {
  const text = userInput.value.trim();
  if (!text) return;

  // 显示用户消息
  addMessage(text, "user");
  
  // 清空输入框
  userInput.value = "";

  // 显示“正在思考”提示
  const thinking = document.createElement("div");
  thinking.className = "message ai";
  thinking.innerHTML = `<div class="bubble">嗯~让我想想...</div>`;
  chat.appendChild(thinking);

  // 调用你的 Vercel 后端（安全！）
  const aiReply = await getAiReplyFromBackend(text);

  // 删除“正在思考”提示
  chat.removeChild(thinking);

  // 显示 AI 回复
  addMessage(aiReply, "ai");

  // 自动朗读（中文语音）
  speak(aiReply);

  // 滚动到底部
  chat.scrollTop = chat.scrollHeight;
}

// 调用你部署在 Vercel 的后端 API
async function getAiReplyFromBackend(userText) {
  try {
    const response = await fetch("https://my-qwen-ai123.vercel.app/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userText })
    });

    const data = await response.json();
    return data.reply || "我有点害羞，不知道说什么了~";
  } catch (error) {
    console.error("后端调用失败:", error);
    return "我好像卡住了，重启一下试试？";
  }
}

// 浏览器自动朗读（中文）
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";  // 中文
  utterance.rate = 0.9;      // 语速
  utterance.pitch = 1.0;     // 音调
  window.speechSynthesis.speak(utterance);
}

// 显示消息到聊天框
function addMessage(text, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}`;
  messageDiv.innerHTML = `<div class="bubble">${text}</div>`;
  chat.appendChild(messageDiv);
}
    
