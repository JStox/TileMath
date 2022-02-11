import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [easyCurrentLevel, setEasyCurrentLevel] = useState(1);
  const [mediumCurrentLevel, setMediumCurrentLevel] = useState(41);
  const [hardCurrentLevel, setHardCurrentLevel] = useState(101);
  const [insaneCurrentLevel, setInsaneCurrentLevel] = useState(201);
  const [dark, setDark] = useState(false);
  const [numKeys, setNumKeys] = useState(3);
  const [keyLevels, setKeyLevels] = useState("");

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        if (key === "easyCurrentLevel") {
          setEasyCurrentLevel(+value);
        } else if (key === "mediumCurrentLevel") {
          setMediumCurrentLevel(+value);
        } else if (key === "hardCurrentLevel") {
          setHardCurrentLevel(+value);
        } else if (key === "insaneCurrentLevel") {
          setInsaneCurrentLevel(+value);
        } else if (key === "dark") {
          console.log("initial value of dark", value);
          setDark(value === "true");
        } else if (key === "numKeys") {
          setNumKeys(+value);
        } else if (key === "keyLevels") {
          setKeyLevels(value);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData("keys");
    getData("easyCurrentLevel");
    getData("mediumCurrentLevel");
    getData("hardCurrentLevel");
    getData("insaneCurrentLevel");
    getData("dark");
    getData("numKeys");
    getData("keyLevels");
  }, []);

  return (
    <GameContext.Provider
      value={{
        numKeys,
        keyLevels,
        easyCurrentLevel,
        mediumCurrentLevel,
        hardCurrentLevel,
        insaneCurrentLevel,
        dark,
        setEasyCurrentLevel,
        setMediumCurrentLevel,
        setHardCurrentLevel,
        setInsaneCurrentLevel,
        setNumKeys,
        setKeyLevels,
        setDark,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GameContext);
};

export { GameContext, GameProvider };
