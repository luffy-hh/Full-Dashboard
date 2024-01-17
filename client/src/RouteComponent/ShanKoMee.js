import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import ShanGame from "../GameApp/Pages/ShanGame/ShanGame";

function ShanKoMee() {
  return (
    <Fragment>
      <Route path="shankomee">
        <Route path=":tableId" element={<ShanGame />} />
      </Route>
    </Fragment>
  );
}

export default ShanKoMee;
