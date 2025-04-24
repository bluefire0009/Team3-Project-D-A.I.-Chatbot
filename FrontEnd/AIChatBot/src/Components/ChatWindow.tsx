import { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import "../Styling/ChatWindow.css";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      sender: "user",
    };
    setMessages((prev) => [...prev, newMessage]);

    setIsTyping(true);

    setTimeout(() => {
      const botReply: Message = {
        id: Date.now() + 1,
        text: "Dit is een voorbeeldantwoord van de bot!",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 1500);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="chat-window-container">
      <div className="chat-window-box">
        <div className="chat-messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message ${msg.sender === "user" ? "message-user" : "message-bot"}`}
            >
              {msg.text}
            </div>
          ))}

          {isTyping && <div className="typing-indicator">Bot is aan het typen...</div>}

          <div ref={messagesEndRef} />
        </div>

        <div className="input-container">
          <ChatInput onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}