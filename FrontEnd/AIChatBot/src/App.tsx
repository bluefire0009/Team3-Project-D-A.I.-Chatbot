import './Styling/App.css';
// import ChatInput from "./Components/ChatInput";
import ChatWindow from "./Components/ChatWindow";
import Logo from './assets/Logo.png';
import InfoModal from './Components/InfoModal';

function App() {
  return (
    <div className="content">
      
      {/* Logo rechtsboven */}
      
        <img src={Logo} alt="GedeeldeZorg Logo" className="Logo" />
      

      <div className="w-full max-w-4xl flex flex-col gap-6">
        <InfoModal/>
        {/* Chatvenster */}
        <div className="flex justify-center">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
}

export default App;