import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "GET"
      })
      const result = await data.json()
      console.log(result)
      setData(result)
    }
    fetchData()
  }, [])

  return (
    <div>
      <Header />
      {
      data ? (
      <p>Address: {data[0]?.address?.zipcode}</p>
      ) :
      (<p>Laddar...</p>)
      }
      <Footer />
    </div> 
  );
};

export default App;