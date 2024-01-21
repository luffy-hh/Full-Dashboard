import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import Admin from "./RouteComponent/Admin";

function App() {
  return (
    <BrowserRouter>
      {/* <Game />
        <ShanKoMee /> */}
      <Admin />
    </BrowserRouter>
  );
}

export default App;
