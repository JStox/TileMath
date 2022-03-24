import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import data from "../data/datasm";
import { DraxView, DraxProvider } from "react-native-drax";
import { LinearGradient } from "expo-linear-gradient";
import Symbol from "../components/Symbol";
import { Icon } from "react-native-elements";
import Help from "../components/Help";
import Settings from "../components/Settings";
import Modal from "../components/Modal";
import Header from "../components/Header";
import KeyModal from "../components/KeyModal";
import { useGlobalContext } from "../context/GameContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Level = ({ route, navigation }) => {
  const { item, difficulty } = route.params; // get the params passed in from navigation.navigate
  // console.log(item, difficulty);
  const [equation, setEquation] = useState([...data[item - 1].initialEquation]);
  const [tiles, setTiles] = useState([...data[item - 1].initialTiles]);
  const [message, setMessage] = useState(" ");
  const solution = data[item - 1].solution;
  const [showModal, setShowModal] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showKeys, setShowKeys] = useState(false);
  const usedKey = useRef(false);

  const { height, width } = Dimensions.get("window");
  const small = width < 350;
  const {
    easyCurrentLevel,
    setEasyCurrentLevel,
    mediumCurrentLevel,
    setMediumCurrentLevel,
    hardCurrentLevel,
    setHardCurrentLevel,
    insaneCurrentLevel,
    setInsaneCurrentLevel,
    keyLevels,
    dark,
  } = useGlobalContext();

  const [messageColor, setMessageColor] = useState(
    dark ? "hsl(180, 20%, 80%)" : "hsl(180, 20%, 20%)"
  );

  const difficultyMap = {
    easy: ["easyCurrentLevel", easyCurrentLevel, setEasyCurrentLevel],
    medium: ["mediumCurrentLevel", mediumCurrentLevel, setMediumCurrentLevel],
    hard: ["hardCurrentLevel", hardCurrentLevel, setHardCurrentLevel],
    insane: ["insaneCurrentLevel", insaneCurrentLevel, setInsaneCurrentLevel],
  };

  const Box = ({ spot, receptive, value, children }) => {
    const [hover, setHover] = useState(false);

    const handleDrop = ({ dragged: { payload } }) => {
      const { draggedspot, draggedValue } = payload;
      if (spot < equation.length && draggedspot < equation.length) {
        setEquation((prevEquation) => {
          const temp = {
            type: prevEquation[spot].type,
            value: prevEquation[spot].value,
          };
          prevEquation[spot] = { type: "tile", value: draggedValue };
          prevEquation[draggedspot] = temp;
          return [...prevEquation];
        });
      } else if (spot < equation.length && draggedspot >= equation.length) {
        const temp = { type: equation[spot].type, value: equation[spot].value };
        setEquation((prevEquation) => {
          prevEquation[spot] = { type: "tile", value: draggedValue };
          return [...prevEquation];
        });
        setTiles((prevTiles) => {
          prevTiles[draggedspot - equation.length] = temp;
          return [...prevTiles];
        });
      } else if (spot >= equation.length && draggedspot < equation.length) {
        const temp = {
          type: tiles[spot - equation.length].type,
          value: tiles[spot - equation.length].value,
        };
        setTiles((prevTiles) => {
          prevTiles[spot - equation.length] = {
            type: "tile",
            value: draggedValue,
          };
          return [...prevTiles];
        });
        setEquation((prevEquation) => {
          prevEquation[draggedspot] = temp;
          return [...prevEquation];
        });
      } else {
        setTiles((prevTiles) => {
          const temp = {
            type: prevTiles[spot - equation.length].type,
            value: prevTiles[spot - equation.length].value,
          };
          prevTiles[spot - equation.length] = {
            type: "tile",
            value: draggedValue,
          };
          prevTiles[draggedspot - equation.length] = temp;
          return [...prevTiles];
        });
      }
    };

    return (
      <DraxView
        receptive={receptive}
        spot={spot}
        style={[small ? styles.smallBox : styles.box, styles.payloadNone]}
        onReceiveDragDrop={handleDrop}
        onReceiveDragEnter={() => setHover(true)}
        onReceiveDragExit={() => setHover(false)}
      >
        <LinearGradient
          colors={["hsl(180, 20%, 70%)", "hsl(180, 20%, 80%)"]}
          style={[small ? styles.smallBox : styles.box, hover && styles.hover]}
        >
          {value ? <Symbol sign={value} /> : children}
        </LinearGradient>
      </DraxView>
    );
  };

  const Tile = ({ spot, value }) => {
    const handleDrop = ({ dragged: { payload } }) => {
      console.log(payload, equation);
    };

    return (
      <DraxView
        receptive={true}
        dragPayload={{ draggedspot: spot, draggedValue: value }}
        payload={{ spot, value }}
        draggingStyle={{ opacity: 0 }}
        style={[small ? styles.smallBox : styles.box, styles.containsPayload]}
        onDragStart={() => {
          console.log("Dragging");
        }}
        onDragEnd={() => {
          console.log("Not dragging, ended");
        }}
        onDragDrop={() => {
          setMessage(" ");
          console.log("Not dragging, dropped");
        }}
        onReceiveDragDrop={handleDrop}
      >
        <LinearGradient
          colors={["hsl(180, 20%, 100%)", "hsl(180, 20%, 80%)"]}
          style={small ? styles.smallBox : styles.box}
        >
          <Symbol sign={value} />
        </LinearGradient>
      </DraxView>
    );
  };

  useEffect(() => {
    if (keyLevels.length > 0) {
      if (keyLevels.split(",").indexOf(item.toString()) > -1) {
        resetLevel(); // get tiles back and set equation to initial state
        setEquation([...data[item - 1].keyEquation]);
        setMessage("You used a key!");
        setMessageColor(dark ? "hsl(180, 20%, 80%)" : "hsl(180, 20%, 20%)");
        usedKey.current = true;
      }
    }
  }, [showKeys]);

  useEffect(async () => {
    const equationList = [];
    equation.forEach((item) => {
      if (item.value !== "") {
        equationList.push(item.value);
      } else {
        return;
      }
    });
    if (equationList.length < equation.length) return;
    try {
      const evaluatedSolution = eval(equationList.join("").toString());
      if (evaluatedSolution === solution) {
        if (difficultyMap[difficulty][1] === item) {
          difficultyMap[difficulty][2](item + 1); // Then need to store value
          console.log("set current level in var");
          const res = await AsyncStorage.setItem(
            difficultyMap[difficulty][0].toString(),
            (item + 1).toString()
          );
          console.log(res);
          console.log("set", difficultyMap[difficulty][0], "= ", item + 1);
        }
        setShowModal(true);
      } else {
        setMessage(evaluatedSolution.toString());
        setMessageColor("hsl(0, 50%, 60%)");
      }
    } catch (e) {
      console.log(e);
      setMessage("Undefined");
      setMessageColor("hsl(0, 50%, 60%)");
    }
  }, [equation]);

  const resetLevel = () => {
    if (usedKey.current) {
      setEquation([...data[item - 1].keyEquation]);
      setTiles([...data[item - 1].initialTiles]);
    } else {
      setEquation([...data[item - 1].initialEquation]);
      setTiles([...data[item - 1].initialTiles]);
    }
    setMessage(" ");
  };

  const shuffleTiles = () => {
    const draggables = tiles.filter(({ type }) => type === "tile");
    const droppables = tiles.filter(({ type }) => type === "droppable");
    setTiles(draggables.sort((a, b) => 0.5 - Math.random()).concat(droppables));
  };

  const evaluateCurrentEquation = () => {
    const equationList = [];
    let full = true;
    equation.forEach((item) => {
      if (item.value !== "") {
        equationList.push(item.value);
      } else {
        full = false;
      }
    });
    try {
      const evaluatedSolution = eval(equationList.join("").toString());
      setMessage(evaluatedSolution.toString());
      if (evaluatedSolution === solution && full) {
        setShowModal(true);
        setMessageColor("hsl(150, 50%, 50%)");
      } else if (evaluatedSolution === solution) {
        setMessageColor("hsl(150, 50%, 50%)");
      } else {
        setMessageColor("hsl(0, 50%, 60%)");
      }
    } catch {
      setMessage("Undefined");
      setMessageColor("hsl(0, 50%, 60%)");
    }
  };

  return (
    <LinearGradient
      colors={
        dark
          ? ["hsl(210, 30%, 20%)", "hsl(210, 30%, 40%)"]
          : ["hsl(210, 30%, 50%)", "hsl(210, 30%, 70%)"]
      }
      style={styles.background}
    >
      <View style={styles.page}>
        <Header
          navigation={navigation}
          hasHelpButton={true}
          hasSettingsButton={true}
          hasKeyButton={true}
          hasBackButton={true}
          hasLevelIndicator={true}
          setShowHelp={setShowHelp}
          setShowSettings={setShowSettings}
          setShowKeys={setShowKeys}
          item={item}
          difficulty={difficulty}
        />
        <View style={styles.body}>
          <DraxProvider style={{ flex: 1, alignItems: "center" }}>
            <View style={styles.solutionContainer}>
              <Text
                style={[styles.textColor, { fontSize: 50, fontWeight: "bold" }]}
              >
                {solution}
              </Text>
            </View>
            <View style={styles.equationContainer}>
              {equation.map(({ type, value }, index) => {
                if (type === "tile") {
                  return (
                    <Box key={index} spot={index} receptive={true} value={""}>
                      <Tile spot={index} value={value} />
                    </Box>
                  );
                } else if (type === "droppable") {
                  return (
                    <Box key={index} spot={index} receptive={true} value={""} />
                  );
                } else {
                  return (
                    <Box
                      key={index}
                      spot={index}
                      receptive={false}
                      value={value}
                    >
                      <Text>{value}</Text>
                    </Box>
                  );
                }
              })}
            </View>
            <View style={styles.messageContainer}>
              <Text style={[{ color: messageColor }, styles.messageStyle]}>
                {message ? message : " "}
              </Text>
            </View>
            <View style={[styles.holdingTileContainer, { minWidth: width }]}>
              <View
                style={small ? styles.smallTileContainer : styles.tileContainer}
              >
                {tiles.map(({ type, value }, index) => {
                  if (type === "droppable") {
                    return (
                      <Box
                        key={index}
                        spot={equation.length + index}
                        receptive={true}
                        value={""}
                      />
                    );
                  } else {
                    return (
                      <Box
                        key={index}
                        spot={equation.length + index}
                        receptive={true}
                        value={""}
                      >
                        <Tile spot={equation.length + index} value={value} />
                      </Box>
                    );
                  }
                })}
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={resetLevel}>
                <Icon
                  type="font-awesome-5"
                  name="undo"
                  color={dark ? "hsl(180, 20%, 80%)" : "hsl(180, 20%, 30%)"}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={shuffleTiles}>
                <Icon
                  type="font-awesome-5"
                  name="random"
                  color={dark ? "hsl(180, 20%, 80%)" : "hsl(180, 20%, 30%)"}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={evaluateCurrentEquation}>
                <Icon
                  type="font-awesome-5"
                  name="check"
                  color={dark ? "hsl(180, 20%, 80%)" : "hsl(180, 20%, 30%)"}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </DraxProvider>
        </View>
      </View>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          navigation={navigation}
          item={item}
          difficulty={difficulty}
        />
      )}
      {showHelp && <Help setShowHelp={setShowHelp} />}
      {showSettings && <Settings setShowSettings={setShowSettings} />}
      {showKeys && (
        <KeyModal
          setShowKeys={setShowKeys}
          item={item}
          usedKey={usedKey.current}
        />
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  page: {
    flex: 1,
  },
  textColor: {
    color: "hsl(180, 20%, 100%)",
  },
  body: {
    flex: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  solutionContainer: {
    flex: 5,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 40,
  },
  equationContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  messageContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 20,
  },
  holdingTileContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  tileContainer: {
    flexDirection: "row",
    justifyContent: "center",
    maxWidth: 300,
    alignItems: "center",
    flexWrap: "wrap",
  },
  smallTileContainer: {
    flexDirection: "row",
    justifyContent: "center",
    maxWidth: 250,
    alignItems: "center",
    flexWrap: "wrap",
  },
  buttonContainer: {
    flex: 2,
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "center",
  },
  icon: {
    margin: 20,
  },
  box: {
    height: 45,
    width: 45,
    borderRadius: 5,
    borderWidth: 1,
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  smallBox: {
    height: 38,
    width: 38,
    borderRadius: 5,
    borderWidth: 1,
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  hover: {
    borderColor: "hsl(150, 50%, 60%)",
  },
  payloadNone: {
    backgroundColor: "hsl(180, 20%, 80%)",
  },
  containsPayload: {
    backgroundColor: "hsl(180, 20%, 90%)",
    borderWidth: 1,
  },
  boxText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  fadedDrag: {
    backgroundColor: "hsl(180, 20%, 80%)",
  },
  displayNone: {
    display: "none",
  },
  messageStyle: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default Level;
