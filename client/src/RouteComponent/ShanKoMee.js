import React from "react";
import { Route, Routes } from "react-router-dom";
import ShanGame from "../GameApp/Pages/ShanGame/ShanGame";

function ShanKoMee() {
  return (
    <Routes>
      <Route path="/shankomee" element={<ShanGame />} />
    </Routes>
  );
}

export default ShanKoMee;
