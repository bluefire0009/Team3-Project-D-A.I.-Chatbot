import { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import "../Styling/ChatWindow.css";

// Type definition for messages
interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [dyslexiaMode, setDyslexiaMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [errorOccured, setErrorOccurance] = useState(false);

  const handleSend = async (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      sender: "user",
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(true);

    const updatedMessages = [
      ...messages,
      {
        id: Date.now(),
        sender: newMessage.sender,
        text: newMessage.text,
      },
    ];

    await fetch("https://project-d-ai-api-cad4hddsbvgvg4fu.germanywestcentral-01.azurewebsites.net/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMessages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text
      }))),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessages((prev) => [...prev, { id: Date.now() + 1, sender: "bot", text: data["answer"] }]);
        setIsTyping(false);
      }).catch((e) => {
        console.error(e);
        setErrorOccurance(true);
        setIsTyping(false);
      });


  };

  // Scroll naar onderen bij nieuwe berichten
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Initieel welkomstbericht bij laden van component
  useEffect(() => {
    const welcomeMessage: Message = {
      id: Date.now(),
      text: "Welkom bij de AI Chatbot GedeeldeZorg! Waarmee kan ik je helpen? 😊",
      sender: "bot",
    };
    setMessages([welcomeMessage]);
  }, []);

  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 2, 24));
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 2, 12));
  const toggleDyslexiaFont = () => setDyslexiaMode((prev) => !prev);

  return (
    <div className="chat-window-container">
      <div className="chat-window-box">
        {!errorOccured ? '' : <div className="error-header">
          ‼ Er is iets onverwachts misgegaan, probeer het later opnieuw ‼
        </div>}
        <div className="chat-header">
          <button
            className="font-size-btn"
            onClick={toggleDyslexiaFont}
            title="Toggle dyslexie-lettertype"
          >
            📖
          </button>
          <button className="font-size-btn" onClick={decreaseFontSize}>−</button>
          <button className="font-size-btn" onClick={increaseFontSize}>+</button>
        </div>

        <div className="chat-messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message ${msg.sender === "user" ? "message-user" : "message-bot"} ${dyslexiaMode ? "dyslexia-font" : ""}`}
              style={{ fontSize: `${fontSize}px` }}
            >
              {msg.text}
            </div>
          ))}

          {isTyping && (
            <div
              className={`typing-indicator ${dyslexiaMode ? "dyslexia-font" : ""}`}
              style={{ fontSize: `${fontSize}px` }}
            >
              Bot is aan het typen...
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="input-container-with-buttons">
          <div className="voice-buttons">
            <button className="voice-btn" title="Spraak naar tekst">🎤</button>
            <button className="voice-btn" title="Tekst naar spraak">🔊</button>
          </div>

          <div className="input-field">
            <ChatInput onSend={handleSend} />
          </div>
        </div>
      </div>
    </div>
  );
}
