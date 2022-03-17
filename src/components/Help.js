import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import HelpTile from "./HelpTile";

const Help = ({ setShowHelp }) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.help}>
        <ScrollView
          style={{ flex: 1 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.helpTitle}>Instructions:</Text>
          <Text style={{ fontFamily: "Futura", fontSize: 16 }}>
            Drag the tiles with numbers and operations to the open droppable
            spaces. A number or operation that starts in a non-draggable space
            cannot have a tile dropped on top of it.
          </Text>
          <Text style={[styles.helpTitle, { marginTop: 10, marginBottom: 5 }]}>
            Order of Operations:
          </Text>
          <View style={styles.helpTileView}>
            <HelpTile value="*" />
            <Text
              style={{ marginLeft: 10, fontFamily: "Futura", fontSize: 16 }}
            >
              Multiplication
            </Text>
          </View>
          <View style={styles.helpTileView}>
            <HelpTile value="/" />
            <Text
              style={{ marginLeft: 10, fontFamily: "Futura", fontSize: 16 }}
            >
              Division
            </Text>
          </View>
          <View style={styles.helpTileView}>
            <HelpTile value="+" />
            <Text
              style={{ marginLeft: 10, fontFamily: "Futura", fontSize: 16 }}
            >
              Addition
            </Text>
          </View>
          <View style={styles.helpTileView}>
            <HelpTile value="-" />
            <Text
              style={{ marginLeft: 10, fontSize: 16, fontFamily: "Futura" }}
            >
              Subtraction
            </Text>
          </View>
          <Text style={[styles.helpTitle, { marginTop: 10, marginBottom: 5 }]}>
            Buttons at the Bottom:
          </Text>
          <View style={styles.helpTileView}>
            <Icon
              type="font-awesome-5"
              name="undo"
              color="hsl(180, 20%, 30%)"
              style={{ margin: 10 }}
            />
            <Text
              style={{
                fontSize: 16,
                marginHorizontal: 10,
                fontFamily: "Futura",
                flexShrink: 1,
              }}
            >
              Reset the game to the original starting position.
            </Text>
          </View>
          <View style={styles.helpTileView}>
            <Icon
              type="font-awesome-5"
              name="random"
              color="hsl(180, 20%, 30%)"
              style={{ margin: 10 }}
            />
            <Text
              style={{
                fontSize: 16,
                marginHorizontal: 10,
                fontFamily: "Futura",
                flexShrink: 1,
              }}
            >
              Shuffle the tiles that are not in the expression.
            </Text>
          </View>
          <View style={styles.helpTileView}>
            <Icon
              type="font-awesome-5"
              name="check"
              color="hsl(180, 20%, 30%)"
              style={{ margin: 10 }}
            />
            <Text
              style={{
                fontSize: 16,
                marginHorizontal: 10,
                flexShrink: 1,
                fontFamily: "Futura",
              }}
            >
              Check the current result of the tiles in the expression.
            </Text>
          </View>
          <Text style={[styles.helpTitle, { marginTop: 10, marginBottom: 5 }]}>
            Helpful Hints:
          </Text>
          <Text
            style={{ fontSize: 16, marginBottom: 10, fontFamily: "Futura" }}
          >
            - Putting two numbers next to each other will combine them together.
          </Text>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <HelpTile value={1} />
            <HelpTile value={1} />
            <Text style={{ fontSize: 24, marginLeft: 10 }}>= 11</Text>
          </View>
          <Text style={{ fontFamily: "Futura", fontSize: 16 }}>
            - The only operation that can start the expression to solve the
            puzzle is the minus. This is because the minus tile can be used to
            create a negative number.
          </Text>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <HelpTile value={"-"} />
            <HelpTile value={5} />
            <Text style={{ fontSize: 24, marginLeft: 10 }}>= -5</Text>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.helpClose}
          onPress={() => setShowHelp(false)}
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
  help: {
    position: "relative",
    flex: 1,
    backgroundColor: "hsl(180, 20%, 70%)",
    marginTop: 40,
    marginHorizontal: 30,
    marginBottom: 40,
    padding: 20,
    paddingBottom: 0,
    overflow: "hidden",
    borderRadius: 5,
  },
  helpClose: {
    position: "absolute",
    top: 5,
    right: 10,
  },
  helpTitle: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Futura",
  },
  helpTileView: {
    flexDirection: "row",
    marginBottom: 3,
    alignItems: "center",
  },
});

export default Help;
