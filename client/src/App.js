import React from "react";

import { BrowserRouter } from "react-router-dom";
import Admin from "./RouteComponent/Admin";
import Game from "./RouteComponent/Game";

function App() {
  return (
    <BrowserRouter basename="/myadmin">
      <Admin />
      <Game />
    </BrowserRouter>
  );
}

export default App;
