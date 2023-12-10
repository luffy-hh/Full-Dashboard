import React from "react";
import { BrowserRouter } from "react-router-dom";
import Admin from "./RouteComponent/Admin";
import Game from "./RouteComponent/Game";
import MasterLayout from "./RouteComponent/MasterLayout";
import AgentLayout from "./RouteComponent/AgentLayout";
import ShanKoMee from "./RouteComponent/ShanKoMee";

function App() {
  return (
    <BrowserRouter>
      <Game />
      <ShanKoMee />
      <Admin />
      <MasterLayout />
      <AgentLayout />
    </BrowserRouter>
  );
}

export default App;
