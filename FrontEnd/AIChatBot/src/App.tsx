import './Styling/App.css';
// import ChatInput from "./Components/ChatInput";
import ChatWindow from "./Components/ChatWindow";
import Logo from './assets/Logo.png';

function App() {
  return (
    <div className="relative min-h-screen bg-gray-900 flex items-center justify-center px-4 py-8">
      
      {/* Logo rechtsboven */}
      
        <img src={Logo} alt="GedeeldeZorg Logo" className="Logo" />
      

      <div className="w-full max-w-4xl flex flex-col gap-6">
        
        {/* Introtekst */}
        <div className="text-white text-center space-y-4">
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
        </div>

        {/* Chatvenster */}
        <div className="flex justify-center">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
}

export default App;