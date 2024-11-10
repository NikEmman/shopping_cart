import "./App.css";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductsContext from "./components/ProductsContext";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItemsArray, setCartItemsArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((json) => setData(json))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    };
    fetchData();
  }, []);

  const onAdd = (id, quantity) => {
    let newCartItemsArray = [...cartItemsArray];
    const itemIndex = newCartItemsArray.findIndex((item) => item[0] === id);

    if (itemIndex > -1) {
      newCartItemsArray[itemIndex][1] += quantity;
    } else {
      newCartItemsArray.push([id, quantity]);
    }

    setCartItemsArray(newCartItemsArray);
  };

  return (
    <>
      <ProductsContext.Provider
        value={{ data, loading, error, onAdd, cartItemsArray }}
      >
        <NavBar />
        <Outlet />
      </ProductsContext.Provider>
    </>
  );
}

export default App;
