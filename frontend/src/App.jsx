import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";
import "./homeMediaQ.css"


const App = () => {
  return (
    <div>
      <Header />
      <Home />
      <Footer />
    </div>
  );
};

export default App;
