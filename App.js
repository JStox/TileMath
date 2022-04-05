import React from "react";
import AppNavContainer from "./src/navigation";
import { GameProvider } from "./src/context/GameContext";
import { useFonts } from "expo-font";

export default function App() {
  const [loaded] = useFonts({
    JosefinSans: require("./assets/font/Josefin_Sans/static/JosefinSans-Bold.ttf"),
    JosefinSansLight: require("./assets/font/Josefin_Sans/static/JosefinSans-Medium.ttf"),
    JosefinSans: require("./assets/font/Josefin_Sans/static/JosefinSans-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <GameProvider>
      <AppNavContainer />
    </GameProvider>
  );
}
