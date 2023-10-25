import React from "react";
import { BrowserRouter } from "react-router-dom";
import Admin from "./RouteComponent/Admin";
import Game from "./RouteComponent/Game";
import MasterLayout from "./RouteComponent/MasterLayout";
import AgentLayout from "./RouteComponent/AgentLayout";

function App() {
  return (
    <BrowserRouter>
      <Admin />
      <Game />
      <MasterLayout />
      <AgentLayout />
    </BrowserRouter>
  );
}

export default App;
