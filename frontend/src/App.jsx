import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Header from "./components/header";


const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Header />
      <p>{count}</p>
      <button onClick={() => setCount(count + 100)}>Öka</button>
    </div>
  );
};

export default App;
