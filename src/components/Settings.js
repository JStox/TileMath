import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Switch,
} from "react-native";
import React, { useState } from "react";
import { Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGlobalContext } from "../context/GameContext";

const Settings = ({ setShowSettings }) => {
  const { width } = Dimensions.get("window");

  const { dark, setDark } = useGlobalContext();

  const handleDarkSwitch = async () => {
    const res = await AsyncStorage.setItem("dark", (!dark).toString());
    setDark(!dark);
  };

  return (
    <View style={styles.modalContainer}>
      <View style={[styles.settings, { minWidth: width - 60 }]}>
        <Text style={styles.settingsTitle}>Settings:</Text>
        <View style={styles.switchContainer}>
          <Text style={{ fontFamily: "Futura", fontSize: 18 }}>Dark Mode</Text>
          <Switch
            trackColor={{ true: "hsl(150, 50%, 50%)" }}
            thumbColor={dark ? "hsl(150, 90%, 80%)" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={handleDarkSwitch}
            value={dark}
          />
        </View>
        <TouchableOpacity
          style={styles.settingsClose}
          onPress={() => setShowSettings(false)}
        >
          <Icon
            type="font-awesome-5"
            name="times"
            size={35}
            iconStyle={{ color: "hsl(0, 30%, 50%)" }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(20, 20, 20, 0.6)",
  },
  settings: {
    position: "relative",
    flex: 1,
    backgroundColor: "hsl(180, 20%, 70%)",
    marginVertical: 40,
    marginHorizontal: 30,
    padding: 20,
    paddingBottom: 0,
    overflow: "hidden",
    borderRadius: 5,
  },
  settingsClose: {
    position: "absolute",
    top: 5,
    right: 10,
  },
  settingsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Futura",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 30,
    marginLeft: 10,
    alignItems: "center",
  },
});

export default Settings;
