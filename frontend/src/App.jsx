import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import { useEffect, useState } from "react";
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
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        {data ? <p>Address: {data[0]?.address?.zipcode}</p> : <p>Laddar...</p>}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
