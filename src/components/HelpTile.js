import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Symbol from "./Symbol";

const HelpTile = ({ value, blank = false, shiftRight = false }) => {
  return (
    <LinearGradient
      colors={
        blank
          ? ["hsl(180, 20%, 70%)", "hsl(180, 20%, 80%)"]
          : ["hsl(180, 20%, 100%)", "hsl(180, 20%, 80%)"]
      }
      style={styles.box}
    >
      <Symbol sign={value} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 45,
    width: 45,
    borderRadius: 5,
    borderWidth: 1,
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HelpTile;
