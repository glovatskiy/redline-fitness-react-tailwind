import { useState } from "react";
import Header from "./components/Header";

function App() {
  const [redRoom, setRedRoom] = useState(false);

  return (
    <div className={redRoom ? "red-room" : ""}>
      <Header redRoom={redRoom} setRedRoom={setRedRoom} />

      <main>{/* Next sections will go here */}</main>
    </div>
  );
}

export default App;
