import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";

const App = () => {
  const [data, setData] = useState();
  return (
    <div>
      <Header />
      <Home />
      <Footer />
    </div>
  );
};

export default App;
