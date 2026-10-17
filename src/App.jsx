import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";

function App() {
  const [redRoom, setRedRoom] = useState(false);

  return (
    <div className={redRoom ? "red-room" : ""}>
      <Header redRoom={redRoom} setRedRoom={setRedRoom} />

      <main>
        <Hero redRoom={redRoom} />
      </main>
    </div>
  );
}

export default App;
