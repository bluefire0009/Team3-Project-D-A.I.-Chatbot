import { useState } from "react";

export default function ChatInput() {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Verstuurde vraag:", question);
    setQuestion("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4">
      <input
        type="text"
        placeholder="Stel je vraag..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="flex-1 p-2 border rounded"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Verstuur
      </button>
    </form>
  );
}