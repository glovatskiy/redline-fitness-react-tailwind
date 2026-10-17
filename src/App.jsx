import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import Trainers from "./components/Trainers";
import Classes from "./components/Classes";
import Editorial from "./components/Editorial";
import Membership from "./components/Membership";
import FindYourRed from "./components/FindYourRed";


function App() {
  const [redRoom, setRedRoom] = useState(false);

  return (
    <div className={redRoom ? "red-room" : ""}>
      <Header redRoom={redRoom} setRedRoom={setRedRoom} />

      <main>
        <Hero redRoom={redRoom} />
        <Ticker redRoom={redRoom} />
        <Trainers redRoom={redRoom} />
        <Classes redRoom={redRoom} />
        <Editorial redRoom={redRoom} />
        <Membership redRoom={redRoom} />
        <FindYourRed redRoom={redRoom} />
      </main>
    </div>
  );
}

export default App;
