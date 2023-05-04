import React from "react";
import { Game } from "./components/Game";
import { Leaderboard } from "./components/Leaderboard";

function App() {
  return (
    <div className="flex flex-col items-center bg-black w-full h-full">
      <Game />
    </div>
  );
}

export default App;
