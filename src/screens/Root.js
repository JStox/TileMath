import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Help from "../components/Help";
import Settings from "../components/Settings";
import Header from "../components/Header";
import { useGlobalContext } from "../context/GameContext";
import Symbol from "../components/Symbol";
import HelpTile from "../components/HelpTile";

const Root = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const small = width < 350;
  const [showHelp, setShowHelp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { dark } = useGlobalContext();
  const difficultyColorMap = {
    easy: ["hsl(150, 50%, 50%)", "hsl(150, 50%, 30%)"],
    medium: ["hsl(50, 60%, 70%)", "hsl(50, 60%, 40%)"],
    hard: ["hsl(20, 60%, 60%)", "hsl(20, 60%, 38%)"],
    insane: ["hsl(0, 50%, 60%)", "hsl(0, 50%, 30%)"],
  };
  return (
    <LinearGradient
      colors={
        dark
          ? ["hsl(210, 30%, 20%)", "hsl(210, 30%, 30%)"]
          : ["hsl(210, 30%, 50%)", "hsl(210, 30%, 60%)"]
      }
      style={styles.background}
    >
      <Header
        navigation={navigation}
        hasHelpButton={true}
        hasSettingsButton={true}
        hasBackButton={false}
        hasLevelIndicator={false}
        setShowHelp={setShowHelp}
        setShowSettings={setShowSettings}
      />
      <View style={{ marginBottom: 30, marginTop: -50 }}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <HelpTile value={"T"} blank={true} />
          <HelpTile value={"I"} blank={true} />
          <HelpTile value={"L"} blank={true} />
          <HelpTile value={"E"} blank={true} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <HelpTile value={"M"} />
          <HelpTile value={"A"} />
          <HelpTile value={"T"} />
          <HelpTile value={"H"} />
        </View>
      </View>
      <View style={styles.page}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("LevelMenu", { difficulty: "easy" })
          }
        >
          <LinearGradient
            colors={difficultyColorMap.easy}
            style={small ? styles.smallSelect : styles.select}
          >
            <Text
              style={[
                small ? styles.smallLevelText : styles.levelText,
                Platform.OS === "ios" && { transform: [{ translateY: 3 }] },
              ]}
            >
              Easy
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("LevelMenu", { difficulty: "medium" })
          }
        >
          <LinearGradient
            colors={difficultyColorMap.medium}
            style={small ? styles.smallSelect : styles.select}
          >
            <Text
              style={[
                small ? styles.smallLevelText : styles.levelText,
                Platform.OS === "ios" && { transform: [{ translateY: 3 }] },
              ]}
            >
              Medium
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("LevelMenu", { difficulty: "hard" })
          }
        >
          <LinearGradient
            colors={difficultyColorMap.hard}
            style={small ? styles.smallSelect : styles.select}
          >
            <Text
              style={[
                small ? styles.smallLevelText : styles.levelText,
                Platform.OS === "ios" && { transform: [{ translateY: 3 }] },
              ]}
            >
              Hard
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("LevelMenu", { difficulty: "insane" })
          }
        >
          <LinearGradient
            colors={difficultyColorMap.insane}
            style={small ? styles.smallSelect : styles.select}
          >
            <Text
              style={[
                small ? styles.smallLevelText : styles.levelText,
                Platform.OS === "ios" && { transform: [{ translateY: 3 }] },
              ]}
            >
              Insane
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      {showHelp && <Help setShowHelp={setShowHelp} />}
      {showSettings && <Settings setShowSettings={setShowSettings} />}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  select: {
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    padding: 15,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  smallSelect: {
    borderWidth: 1,
    borderRadius: 5,
    margin: 8,
    padding: 15,
    width: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1,
    margin: 20,
    marginTop: 50,
  },
  page: {
    flex: 2,
    alignItems: "center",
  },
  levelText: {
    color: "hsl(180, 00%, 90%)",
    fontSize: 20,
    fontFamily: "JosefinSans",
  },
  smallLevelText: {
    color: "hsl(180, 00%, 90%)",
    fontSize: 16,
    fontFamily: "JosefinSans",
  },
});

export default Root;
