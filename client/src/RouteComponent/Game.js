import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import GameTwoD from "../GameApp/Pages/GameTwoPage/GameTwoD";
import GameHome from "../GameApp/Pages/Home/GameHome";
import GameLayout from "../GameApp/Pages/Layout/GameLayout";
import GameUserLogin from "../GameApp/Pages/LoginPage/GameUserLogin";

function Game() {
  const [showform, setShowForm] = useState(true);
  return (
    <Routes>
      <Route path="/" element={showform ? <GameLayout /> : <GameUserLogin />}>
        <Route index element={<GameHome />} />
        <Route path="twothree" element={<GameTwoD />} />
      </Route>
    </Routes>
  );
}

export default Game;
