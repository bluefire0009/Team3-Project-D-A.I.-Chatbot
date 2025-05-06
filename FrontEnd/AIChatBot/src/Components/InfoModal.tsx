import { useState } from "react";
import "../Styling/App.css";

export default function InfoModal() {
  const [showing, setShowing] = useState(true);
  const [fontSize, setFontSize] = useState(16);
  const [dyslexiaMode, setDyslexiaMode] = useState(false);

  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 2, 24));
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 2, 12));
  const toggleDyslexiaFont = () => setDyslexiaMode((prev) => !prev);

  if (!showing) return null;

  return (
    <div className="modal">
      <div
        className={`modal-content text-white space-y-4 ${dyslexiaMode ? "dyslexia-font" : ""}`}
        style={{ fontSize: `${fontSize}px` }}
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welkom bij de AI Chatbot van GedeeldeZorg!</h1>
          <p className="text-base max-w-3xl mx-auto">
            Welkom bij de AI ChatBot van GedeeldeZorg.
            Een AI ChatBot is een digitaal systeem dat met behulp van kunstmatige intelligentie zelfstandig gesprekken kan voeren 
            en vragen kan beantwoorden. Deze technologie biedt ondersteuning door snel en eenvoudig informatie te verstrekken, 
            zonder tussenkomst van een medewerker.
            <br /><br />
            Houd er rekening mee dat u in gesprek bent met een geautomatiseerde chatbot en niet met een echte persoon. 
            Alle berichten die u hier typt, blijven volledig anoniem en worden niet opgeslagen. Wanneer u de pagina ververst of sluit, 
            worden alle berichten direct verwijderd en zijn deze niet meer terug te halen.
          </p>
        </div>

        <div className="modal-footer">
          <button className="modal-confirm" onClick={() => setShowing(false)}>Oké!</button>

          <div className="modal-font-controls">
            <button className="font-size-btn" onClick={toggleDyslexiaFont} title="Dyslexie-lettertype">📖</button>
            <button className="font-size-btn" onClick={decreaseFontSize} title="Kleiner">−</button>
            <button className="font-size-btn" onClick={increaseFontSize} title="Groter">+</button>
          </div>
        </div>
      </div>
    </div>
  );
}