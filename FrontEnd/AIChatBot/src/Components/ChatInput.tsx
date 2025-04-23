import { useState } from "react";
import "../Styling/ChatInput.css";

interface ChatInputProps {
  onSend: (text: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <textarea
        className="chat-input-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Stel hier je vraag..."
        rows={1} // standaard 1 rij
      />
      <button type="submit" className="chat-input-button">
        Verstuur
      </button>
    </form>
  );
}