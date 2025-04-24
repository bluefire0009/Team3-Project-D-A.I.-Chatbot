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
  const [fontSize, setFontSize] = useState(16); // standaard fontgrootte in pixels
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

  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 2, 24));
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 2, 12));

  return (
    <div className="chat-window-container">
      <div className="chat-window-box">
        {/* Knoppen rechtsboven */}
        <div className="chat-header">
          <button className="font-size-btn" onClick={decreaseFontSize}>A−</button>
          <button className="font-size-btn" onClick={increaseFontSize}>A+</button>
        </div>

        <div className="chat-messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message ${msg.sender === "user" ? "message-user" : "message-bot"}`}
              style={{ fontSize: `${fontSize}px` }}
            >
              {msg.text}
            </div>
          ))}

          {isTyping && (
            <div className="typing-indicator" style={{ fontSize: `${fontSize}px` }}>
              Bot is aan het typen...
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="input-container">
          <ChatInput onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}