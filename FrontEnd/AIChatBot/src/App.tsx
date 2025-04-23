import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './Styling/App.css';
import ChatInput from "./Components/ChatInput";
import ChatWindow from "./Components/ChatWindow";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      {/* Uitleg boven de chat */}
      <div className="info-text max-w-lg text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Welkom bij de AI Chatbot van GedeeldeZorg!</h1>
        <p className="text-xl text-gray-300">
        Welkom bij de AI ChatBot van GedeeldeZorg.
Een AI ChatBot is een digitaal systeem dat met behulp van kunstmatige intelligentie zelfstandig gesprekken kan voeren 
en vragen kan beantwoorden. Deze technologie biedt ondersteuning door snel en eenvoudig informatie te verstrekken, 
zonder tussenkomst van een medewerker.

Houd er rekening mee dat u in gesprek bent met een geautomatiseerde chatbot en niet met een echte persoon. 
Alle berichten die u hier typt, blijven volledig anoniem en worden niet opgeslagen. Wanneer u de pagina ververst of sluit, 
worden alle berichten direct verwijderd en zijn deze niet meer terug te halen.
        </p>
      </div>

      {/* Chatbox */}
      <div className="chat-box bg-gray-800 rounded-lg p-4 shadow-lg w-full max-w-lg h-[80vh] flex flex-col">
        <ChatWindow />
      </div>
    </div>
  );
}

export default App;