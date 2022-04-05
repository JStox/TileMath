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

const Modal = ({ setShowModal, navigation, item, difficulty }) => {
  const { height, width } = Dimensions.get("window");

  const moveAnim = useRef(new Animated.Value(height / 2 + 200)).current;

  const difficultyMapPop = {
    easy: 40,
    medium: 100,
    hard: 200,
    insane: 300,
  };

  const difficultyMapSub = {
    easy: 0,
    medium: 40,
    hard: 100,
    insane: 200,
  };

  useEffect(() => {
    Animated.timing(moveAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
      easing: Easing.bezier(0.68, -0.6, 0.32, 1.6),
    }).start();
  }, [moveAnim]);

  return (
    <View style={styles.modalContainer} onPress={() => setShowModal(false)}>
      <Animated.View
        style={[
          styles.modal,
          { transform: [{ translateY: moveAnim }] },
          width < 350 && { width: 280 },
        ]}
      >
        <View style={styles.modalTextContainer}>
          <Text style={[styles.titleText, width < 400 && { fontSize: 26 }]}>
            Congratulations!
          </Text>
          <Text style={styles.subTitle}>
            You solved {difficulty} level {item - difficultyMapSub[difficulty]}
          </Text>
        </View>
        <View style={styles.modalButtonContainer}>
          <TouchableOpacity
            style={[styles.modalButton, styles.backButton]}
            onPress={() => navigation.pop()}
          >
            <Text style={[styles.subTitle, { color: "hsl(0, 0%, 90%)" }]}>
              Menu
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, styles.nextButton]}
            onPress={() => {
              navigation.pop();
              if (difficultyMapPop[difficulty] !== item) {
                navigation.navigate("Level", {
                  item: item + 1,
                  difficulty: difficulty,
                });
              }
            }}
          >
            <Text style={[styles.subTitle, { color: "hsl(0, 0%, 90%)" }]}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.modalIcon}
          onPress={() => setShowModal(false)}
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
    marginLeft: 10,
    marginRight: 20,
  },
  titleText: {
    fontSize: 30,
    margin: 20,
    transform: [{ translateY: 10 }],
    fontFamily: "JosefinSans",
  },
  subTitle: {
    fontSize: 18,
    fontFamily: "JosefinSansLight",
  },
});

export default Modal;
