import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Icon } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../components/Header";
import { useGlobalContext } from "../context/GameContext";
import Help from "../components/Help";
import Settings from "../components/Settings";
import LevelPage from "../components/LevelPage";

const data = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
const rows = [0, 1, 2, 3, 4, 5];

const LevelMenu = ({ navigation, route }) => {
  const difficulty = route.params.difficulty;

  const [showHelp, setShowHelp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);

  const {
    easyCurrentLevel,
    mediumCurrentLevel,
    hardCurrentLevel,
    insaneCurrentLevel,
    dark,
  } = useGlobalContext();

  const { width, height } = Dimensions.get("window");

  const difficultyColorMap = {
    easy: ["hsl(150, 50%, 50%)", "hsl(150, 50%, 30%)"],
    medium: ["hsl(50, 60%, 70%)", "hsl(50, 60%, 40%)"],
    hard: ["hsl(20, 60%, 60%)", "hsl(20, 60%, 38%)"],
    insane: ["hsl(0, 50%, 60%)", "hsl(0, 50%, 30%)"],
  };

  const difficultyLevelMap = {
    easy: 0,
    medium: 40,
    hard: 100,
    insane: 200,
  };

  const difficultyLevelCount = {
    easy: 40,
    medium: 60,
    hard: 100,
    insane: 100,
  };

  const difficultyPageCountMap = {
    easy: 2,
    medium: 3,
    hard: 5,
    insane: 5,
  };

  const difficultyCurrentLevelMap = {
    easy: easyCurrentLevel,
    medium: mediumCurrentLevel,
    hard: hardCurrentLevel,
    insane: insaneCurrentLevel,
  };

  const pages = [];
  for (let i = 0; i < difficultyPageCountMap[difficulty]; i++) {
    pages.push(
      <LevelPage
        navigation={navigation}
        numRows={5}
        startNumber={i * 20}
        difficulty={difficulty}
        currentLevel={difficultyCurrentLevelMap[difficulty]}
      />
    );
  }

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
        hasBackButton={true}
        hasLevelIndicator={false}
        setShowHelp={setShowHelp}
        setShowSettings={setShowSettings}
      />
      <View style={{ flex: 20, minWidth: width }}>
        <View
          style={[
            {
              justifyContent: "space-around",
              flexDirection: "row",
              marginTop: 30,
              flex: 1,
            },
            height < 1000 && { flex: 2 },
          ]}
        >
          <TouchableOpacity
            disabled={pageIndex === 0}
            onPress={() => setPageIndex(pageIndex - 1)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon
              name="arrow-left"
              type="font-awesome"
              iconStyle={{ color: "hsl(210, 30%, 100%)" }}
              style={pageIndex === 0 && styles.disabled}
            />
          </TouchableOpacity>
          <Text style={styles.levelText}>
            Levels {pageIndex + 1}/{difficultyPageCountMap[difficulty]}
          </Text>
          <TouchableOpacity
            disabled={pageIndex === difficultyPageCountMap[difficulty] - 1}
            onPress={() => setPageIndex(pageIndex + 1)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon
              name="arrow-right"
              type="font-awesome"
              iconStyle={{ color: "hsl(210, 30%, 100%)" }}
              style={
                pageIndex + 1 === difficultyPageCountMap[difficulty] &&
                styles.disabled
              }
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            minWidth: width,
            flex: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {pages[pageIndex]}
        </View>
      </View>
      {showHelp && <Help setShowHelp={setShowHelp} />}
      {showSettings && <Settings setShowSettings={setShowSettings} />}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  box: {
    height: 70,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "hsl(180, 20%, 60%)",
    borderRadius: 5,
    margin: 10,
    borderColor: "hsl(180, 20%, 30%)",
    borderStyle: "solid",
    borderWidth: 2,
  },
  levelText: {
    color: "hsl(180, 20%, 100%)",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Futura",
  },
  disabled: {
    opacity: 0.5,
  },
});

export default LevelMenu;
