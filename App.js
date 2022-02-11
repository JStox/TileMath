import React from "react";
import AppNavContainer from "./src/navigation";
import { GameProvider } from "./src/context/GameContext";

export default function App() {
  return (
    <GameProvider>
      <AppNavContainer />
    </GameProvider>
  );
}
