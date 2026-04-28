 import React, { useState } from "react";

function BeachAI({ data }) {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi! Ask me about beach conditions 🌊", type: "welcome" }
  ]);
  const [input, setInput] = useState("");

  if (!data) return null;

  const getAIResponse = (question) => {
    question = question.toLowerCase();

    if (question.includes("safe")) {
      return data.bsi_score > 70
        ? "✅ Yes, it's mostly safe to visit."
        : "⚠️ Not very safe right now.";
    }

    if (question.includes("swim")) {
      return data.tide_height_m > 2 || data.wind_speed > 35
        ? "🚫 Swimming is risky due to high tide or wind."
        : "🏊 Swimming conditions are safe.";
    }

    if (question.includes("weather")) {
      return `🌡️ Temp: ${data.temperature}°C\n💨 Wind: ${data.wind_speed} km/h\n🌧️ Rain: ${data.rain_mm} mm`;
    }

    if (question.includes("tide")) {
      return `🌊 Current tide level is ${data.tide_height_m}m`;
    }

    if (question.includes("advice")) {
      return data.bsi_score > 85
        ? "🔥 Perfect time to visit! Enjoy beach activities."
        : data.bsi_score > 65
        ? "🙂 Conditions are decent, but stay cautious."
        : "⚠️ Not a great time. Consider visiting later.";
    }

    return "🤖 I analyze real-time beach conditions. Try asking about safety, swimming, weather, or advice!";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    const aiMsg = { sender: "ai", text: getAIResponse(input) };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput("");
  };

  return (
    <div className="ai-chat-box">
      <h3>🤖 Beach AI Chat</h3>

      <div className="chat-window">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.sender === "user"
                ? "chat user"
                : msg.type === "welcome"
                ? "chat ai welcome"
                : "chat ai"
            }
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about safety, weather, swimming..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()} // 🔥 ENTER KEY SUPPORT
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default BeachAI;