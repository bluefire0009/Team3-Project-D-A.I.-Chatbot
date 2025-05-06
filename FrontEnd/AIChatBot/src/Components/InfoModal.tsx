import { useState } from "react";
import "../Styling/App.css";

export default function ChatInput() {
  const [showing, setShowing] = useState(true);
  
  if (showing) {
    return (
        <div className="modal">
            <div className="modal-content text-white text-center space-y-4">
              <h1 className="text-3xl font-bold">
                Welkom bij de AI Chatbot van GedeeldeZorg!
              </h1>
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
              <div className="modal-buttons">
                <button className="modal-confirm" onClick={() => setShowing(false)}>Oké!</button>
              </div>
            </div>
        </div>
        
      );
  } else {
    return;
  }
  
}