import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";

const App = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "GET",
      });
      const result = await data.json();
      console.log(result);
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <Home />
      <Footer />
    </div>
  );
};

export default App;
