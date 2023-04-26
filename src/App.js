import React from "react";
import { Game } from "./components/Game";
import { Leaderboard } from "./components/Leaderboard";
import { Timer } from "./components/Timer";

function App() {
  return (
    <div className="flex flex-col items-center">
      <Timer />
      <Game />
    </div>
  );
}

export default App;
