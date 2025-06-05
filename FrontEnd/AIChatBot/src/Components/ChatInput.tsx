import { useState } from "react";
import "../Styling/ChatInput.css";

interface ChatInputProps {
  onSend: (text: string) => void;
  dyslexiaMode: boolean
}

export default function ChatInput({ onSend, dyslexiaMode }: ChatInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Voorkomt nieuwe regel
      handleSubmit(e as any); // Verzend bericht
    }
  };

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <textarea
        className={`chat-input-textarea  ${dyslexiaMode ? "dyslexia-font" : ""}`}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Stel hier je vraag..."
        rows={1}
      />
      <button type="submit" className="chat-input-button">
        <svg className="chat-input-button-icon" fill="#fff" viewBox="0 0 512 512" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><path d="M460.54,169.58A222.6,222.6,0,1,0,478,256,221.16,221.16,0,0,0,460.54,169.58ZM256,448C150,448,64,362,64,256S150,64,256,64s192,86,192,192S362,448,256,448Zm28.06-307.33L399.39,256,284.06,371.33l-21.21-21.21L342,271H133.82V241H342l-79.12-79.12Z"/></svg>
      </button>
    </form>
  );
}