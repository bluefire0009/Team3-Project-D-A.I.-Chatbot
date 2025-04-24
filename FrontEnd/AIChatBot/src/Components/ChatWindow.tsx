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
  const [fontSize, setFontSize] = useState(16);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      sender: "user",
    };
    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(true);

    // Bericht naar backend sturen
    try {
      await fetch("http://ChatBot_User_Message/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newMessage.text,
          timestamp: new Date().toISOString(),
          sender: "user",
        }),
      });
    } catch (error) {
      console.error("Fout bij verzenden van bericht naar server:", error);
    }

    // Simuleer bot antwoord
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
        {/* Tekstgrootte knoppen rechtsboven */}
        <div className="chat-header">
          <button className="font-size-btn" onClick={decreaseFontSize}>A−</button>
          <button className="font-size-btn" onClick={increaseFontSize}>A+</button>
        </div>

        {/* Chatberichten */}
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

        {/* Input met spraakknoppen */}
        <div className="input-container-with-buttons">
          <div className="voice-buttons">
            <button className="voice-btn">🎤</button>
            <button className="voice-btn">🔊</button>
          </div>
          <div className="input-field">
            <ChatInput onSend={handleSend} />
          </div>
        </div>
      </div>
    </div>
  );
}