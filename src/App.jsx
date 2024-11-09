import "./App.css";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function App() {
  const [data, setData] = useState(null);

  return (
    <>
      <NavBar />
      <Outlet data={data} />
    </>
  );
}

export default App;
