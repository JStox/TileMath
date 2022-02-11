import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Easing,
} from "react-native";
import { Icon } from "react-native-elements";
import { useGlobalContext } from "../context/GameContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const KeyModal = ({ setShowKeys, item, usedKey }) => {
  const { height } = Dimensions.get("window");
  const { numKeys, setNumKeys, keyLevels, setKeyLevels } = useGlobalContext();

  const moveAnim = useRef(new Animated.Value(-height / 2 - 200)).current;
  const dis = usedKey || numKeys < 1;
  console.log(dis);

  useEffect(() => {
    Animated.timing(moveAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
      easing: Easing.bezier(0.68, -0.6, 0.32, 1.6),
    }).start();
  }, [moveAnim]);

  const getHint = async () => {
    if (numKeys > 0) {
      const res = await AsyncStorage.setItem(
        "numKeys",
        (numKeys - 1).toString()
      );
      const r = await AsyncStorage.setItem(
        "keyLevels",
        keyLevels + item.toString() + ","
      );
      setNumKeys(numKeys - 1);
      setKeyLevels(keyLevels + item.toString() + ",");
      setShowKeys(false);
    }
  };

  return (
    <View style={styles.modalContainer} onPress={() => setShowKeys(false)}>
      <Animated.View
        style={[styles.modal, { transform: [{ translateY: moveAnim }] }]}
      >
        <View style={styles.modalTextContainer}>
          <Text
            style={{
              fontSize: 24,
              textAlign: "center",
              margin: 20,
              transform: [{ translateY: 15 }],
              fontFamily: "Futura",
            }}
          >
            Use a key to get a hint.
          </Text>
          <Text style={{ fontSize: 18, fontFamily: "Futura" }}>
            You currently have {numKeys} key{numKeys !== 1 && s}.
          </Text>
        </View>
        <View style={styles.modalButtonContainer}>
          <TouchableOpacity
            onPress={getHint}
            disabled={dis}
            style={[
              styles.nextButton,
              dis && {
                backgroundColor: "hsl(150, 10%, 70%)",
                borderColor: "hsl(150, 10%, 70%)",
              },
            ]}
          >
            <Text
              style={{
                fontSize: 24,
                color: "hsl(150, 20%, 86%)",
                fontFamily: "Futura",
              }}
            >
              Use a Key
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.modalIcon}
          onPress={() => setShowKeys(false)}
        >
          <Icon
            type="font-awesome-5"
            name="times"
            size={35}
            iconStyle={{ color: "hsl(0, 30%, 50%)" }}
          />
        </TouchableOpacity>
      </Animated.View>
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
    backgroundColor: "rgba(20, 20, 20, 0.3)",
  },
  modal: {
    width: 300,
    height: 220,
    borderRadius: 10,
    backgroundColor: "hsl(180, 20%, 80%)",
    position: "relative",
  },
  modalIcon: {
    position: "absolute",
    top: 5,
    right: 10,
  },
  modalTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalButtonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  modalButton: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    borderWidth: 2,
  },
  backButton: {
    backgroundColor: "hsl(0, 30%, 50%)",
    borderColor: "hsl(0, 50%, 50%)",
    marginLeft: 20,
    marginRight: 10,
  },
  nextButton: {
    backgroundColor: "hsl(150, 30%, 50%)",
    borderColor: "hsl(150, 50%, 50%)",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 2,
    flex: 1,
    margin: 20,
    alignItems: "center",
  },
});

export default KeyModal;
