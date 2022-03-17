import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "react-native-elements";
import { Dimensions } from "react-native";

const LevelPage = ({
  navigation,
  numRows,
  startNumber,
  difficulty,
  currentLevel,
}) => {
  const { height, width } = Dimensions.get("window");

  const difficultyColorMap = {
    easy: ["hsl(150, 40%, 50%)", "hsl(150, 40%, 30%)"],
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

  const boxSide = width > 1000 ? 65 : width / 4 - 30;

  const LevelIcon = ({
    item,
    navigation,
    difficulty,
    currentLevel,
    startNumber,
  }) => {
    return (
      <TouchableOpacity
        style={[styles.box, { height: boxSide, width: boxSide }]}
        onPress={() =>
          navigation.navigate("Level", {
            item: item + difficultyLevelMap[difficulty] + startNumber,
            difficulty: difficulty,
          })
        }
        disabled={
          item + difficultyLevelMap[difficulty] + startNumber > currentLevel
        }
      >
        <LinearGradient
          colors={difficultyColorMap[difficulty]}
          style={[
            styles.box,
            { flex: 1, margin: 0, height: boxSide, width: boxSide },
          ]}
        >
          <Text style={styles.levelText}>
            {item + difficultyLevelMap[difficulty] + startNumber >
            currentLevel ? (
              <Icon
                type="font-awesome-5"
                name="lock"
                color="hsl(210, 20%, 90%)"
                iconStyle={{
                  transform: [{ translateY: 2 }, { translateX: 1 }],
                }}
              />
            ) : (
              item + startNumber
            )}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const levelIcons = [];
  for (let i = 0; i < 20; i++) {
    levelIcons.push(
      <LevelIcon
        item={i + 1}
        navigation={navigation}
        difficulty={difficulty}
        currentLevel={currentLevel}
        startNumber={startNumber}
      />
    );
  }

  return (
    <View style={[styles.body, { maxWidth: 400 }]}>
      {levelIcons.map((item, index) => (
        <View key={index}>{item}</View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "row",
    flex: 10,
    minHeight: 300,
    maxHeight: 450,
  },
  box: {
    height: 65,
    width: 65,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    margin: 10,
    borderWidth: 0.5,
    borderColor: "hsl(150, 10%, 30%)",
  },
  levelText: {
    color: "hsl(180, 20%, 100%)",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default LevelPage;
