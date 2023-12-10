import React from "react";
import { Route, Routes } from "react-router-dom";
import ShanGame from "../GameApp/Pages/ShanGame/ShanGame";

function ShanKoMee() {
  return (
    <Routes>
      <Route path="shankomee">
        <Route path=":tableId" element={<ShanGame />} />
      </Route>
    </Routes>
  );
}

export default ShanKoMee;
