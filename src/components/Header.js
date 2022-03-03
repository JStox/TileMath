import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

const Header = ({
  difficulty,
  setShowHelp,
  setShowSettings,
  setShowKeys,
  navigation,
  hasBackButton,
  hasHelpButton,
  hasSettingsButton,
  hasLevelIndicator,
  hasKeyButton,
  item,
}) => {
  const difficultyLevelMap = {
    easy: 0,
    medium: 40,
    hard: 100,
    insane: 200,
  };

  return (
    <View style={styles.header}>
      <View style={[styles.buttonGroup, styles.left]}>
        {hasBackButton && (
          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={styles.hasMargin}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon
              type="font-awesome-5"
              name="chevron-left"
              color="hsl(180, 30%, 100%)"
              size={30}
            />
          </TouchableOpacity>
        )}
        {hasLevelIndicator && (
          <View style={[styles.headerText, styles.hasMargin]}>
            <Text style={[styles.textColor]}>
              {item - difficultyLevelMap[difficulty]}
            </Text>
          </View>
        )}
      </View>
      <View style={[styles.buttonGroup, styles.right]}>
        {hasKeyButton && (
          <TouchableOpacity
            onPress={() => setShowKeys(true)}
            style={styles.hasMargin}
          >
            <Icon
              type="font-awesome-5"
              name="key"
              color="hsl(180, 30%, 100%)"
              size={30}
            />
          </TouchableOpacity>
        )}
        {hasHelpButton && (
          <TouchableOpacity
            onPress={() => setShowHelp(true)}
            style={styles.hasMargin}
          >
            <Icon
              type="font-awesome-5"
              name="question"
              color="hsl(180, 30%, 100%)"
              size={30}
            />
          </TouchableOpacity>
        )}
        {hasSettingsButton && (
          <TouchableOpacity
            onPress={() => setShowSettings(true)}
            style={styles.hasMargin}
          >
            <Icon
              type="font-awesome-5"
              name="cog"
              color="hsl(180, 30%, 100%)"
              size={30}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 45,
    marginHorizontal: 10,
    flexDirection: "row",
  },
  buttonGroup: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
  },
  left: {
    left: 0,
  },
  right: {
    right: 0,
  },
  headerText: {
    borderWidth: 2,
    height: 40,
    width: 40,
    borderRadius: 125,
    padding: 5,
    borderColor: "hsl(180, 20%, 100%)",
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateY: -5 }],
  },
  textColor: {
    color: "hsl(180, 20%, 100%)",
    fontWeight: "bold",
  },
  hasMargin: {
    marginHorizontal: 10,
  },
});

export default Header;
