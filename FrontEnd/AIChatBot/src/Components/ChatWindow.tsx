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
  // State to store all chat messages
  const [messages, setMessages] = useState<Message[]>([]);
  // Whether the bot is currently "typing"
  const [isTyping, setIsTyping] = useState(false);
  // Adjustable font size for accessibility
  const [fontSize, setFontSize] = useState(16);
  // Whether dyslexia-friendly font is enabled
  const [dyslexiaMode, setDyslexiaMode] = useState(false);
  // Ref to scroll to the latest message
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to handle sending user messages
  const handleSend = async (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      sender: "user",
    };
  
    // Add the new message to the local messages state
    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(true);
  
    // Include the new message in the payload explicitly
    const updatedMessages = [
      ...messages,
      {
        id: Date.now(),
        sender: newMessage.sender,
        text: newMessage.text,
      },
    ];
  

    // Simulated POST request to backend endpoint for message logging
    try {
      console.log(updatedMessages)
      console.log(JSON.stringify(updatedMessages.map((msg) => (
        {
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text
        }
      ))))
      await fetch("https://project-d-ai-api-cad4hddsbvgvg4fu.germanywestcentral-01.azurewebsites.net/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMessages.map((msg) => (
          {
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.text
          }
        ))),
      })
        .then((response) => response.json())
        .then((data) => {
          const resultText = data.choices[0].message.content;
          setMessages((prev) => [...prev, { id: Date.now() + 1, sender: "bot", text: resultText }])
          setIsTyping(false);
          console.log(resultText)
        })
    } catch (error) {
      console.error("Fout bij verzenden van bericht naar server:", error);
    }


  };

  // Scroll to bottom when new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Functions to increase/decrease font size within allowed range
  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 2, 24));
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 2, 12));

  // Toggle for enabling/disabling dyslexia-friendly font
  const toggleDyslexiaFont = () => setDyslexiaMode((prev) => !prev);

  return (
    <div className="chat-window-container">
      <div className="chat-window-box">
        {/* Header with font controls */}
        <div className="chat-header">
          {/* Toggle dyslexia font */}
          <button
            className="font-size-btn"
            onClick={toggleDyslexiaFont}
            title="Toggle dyslexie-lettertype"
          >
            📖
          </button>

          {/* Decrease font size */}
          <button className="font-size-btn" onClick={decreaseFontSize}>A−</button>
          {/* Increase font size */}
          <button className="font-size-btn" onClick={increaseFontSize}>A+</button>
        </div>

        {/* Chat messages area */}
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

          {/* Typing indicator when bot is generating a reply */}
          {isTyping && (
            <div
              className={`typing-indicator ${dyslexiaMode ? "dyslexia-font" : ""}`}
              style={{ fontSize: `${fontSize}px` }}
            >
              Bot is aan het typen...
            </div>
          )}

          {/* Invisible anchor to scroll to latest message */}
          <div ref={messagesEndRef} />
        </div>

        {/* Bottom input area with voice buttons */}
        <div className="input-container-with-buttons">
          {/* Placeholder buttons for speech input/output */}
          <div className="voice-buttons">
            <button className="voice-btn" title="Spraak naar tekst">🎤</button>
            <button className="voice-btn" title="Tekst naar spraak">🔊</button>
          </div>

          {/* Input component for typing messages */}
          <div className="input-field">
            <ChatInput onSend={handleSend} />
          </div>
        </div>
      </div>
    </div>
  );
}