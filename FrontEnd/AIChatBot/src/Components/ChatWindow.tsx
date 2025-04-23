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

    // Bot gaat typen
    setIsTyping(true);

    setTimeout(() => {
      const botReply: Message = {
        id: Date.now() + 1,
        text: "Dit is een voorbeeldantwoord van de bot!",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 1500); // 1,5 seconde typen
  };

  // Scroll automatisch naar het laatste bericht
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

return (
    <div className="chat-window">
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender === "user" ? "message-user" : "message-bot"}`}>
            {msg.text}
          </div>
        ))}
  
        {isTyping && (
          <div className="typing-indicator">
            Bot is aan het typen...
          </div>
        )}
  
        <div ref={messagesEndRef} />
      </div>
  
      <div className="input-container">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}