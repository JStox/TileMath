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
          <Text style={styles.helpSubSection}>
            Drag the tiles with numbers and operations to the open droppable
            spaces. A number or operation that starts in a non-draggable space
            cannot have a tile dropped on top of it.
          </Text>
          <Text style={[styles.helpTitle, { marginTop: 10, marginBottom: 5 }]}>
            Order of Operations:
          </Text>
          <View style={styles.helpTileView}>
            <HelpTile value="*" />
            <Text style={styles.helpSubSection}>Multiplication</Text>
          </View>
          <View style={styles.helpTileView}>
            <HelpTile value="/" />
            <Text style={styles.helpSubSection}>Division</Text>
          </View>
          <View style={styles.helpTileView}>
            <HelpTile value="+" />
            <Text style={styles.helpSubSection}>Addition</Text>
          </View>
          <View style={styles.helpTileView}>
            <HelpTile value="-" />
            <Text style={styles.helpSubSection}>Subtraction</Text>
          </View>
          <Text style={styles.helpSubSection}>
            Note: Multiplication and Division will execute left to right before
            any Addition or Subtraction.
          </Text>
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
              style={[
                styles.helpSubSection,
                {
                  flexShrink: 1,
                },
              ]}
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
              style={[
                styles.helpSubSection,
                {
                  flexShrink: 1,
                },
              ]}
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
              style={[
                styles.helpSubSection,
                {
                  flexShrink: 1,
                },
              ]}
            >
              Check the current result of the tiles in the expression.
            </Text>
          </View>
          <Text style={[styles.helpTitle, { marginTop: 10, marginBottom: 5 }]}>
            Helpful Hints:
          </Text>
          <Text
            style={[
              styles.helpSubSection,
              {
                flexShrink: 1,
                marginBottom: 5,
              },
            ]}
          >
            Putting two numbers next to each other will combine them together.
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
          <Text
            style={[
              styles.helpSubSection,
              {
                flexShrink: 1,
                marginTop: 0,
              },
            ]}
          >
            The only operation that can start the expression to solve the puzzle
            is the minus. This is because the minus tile can be used to create a
            negative number.
          </Text>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 5,
            }}
          >
            <HelpTile value={"-"} />
            <HelpTile value={5} />
            <Text style={{ fontSize: 24, marginLeft: 10 }}>= -5</Text>
          </View>
          <View>
            <Text
              style={[styles.helpTitle, { marginTop: 10, marginBottom: 5 }]}
            >
              Key Help:{" "}
              <Icon
                type="font-awesome-5"
                name="key"
                color="hsl(180, 20%, 30%)"
                size={30}
              />
            </Text>
            <Text style={[styles.helpSubSection, { marginBottom: 5 }]}>
              Use keys to get hints for puzzles. Using a key will the player up
              to four free tiles. Using keys will never solve a puzzle for you
              or remove any playable tiles, however it will offer a window into
              a possible solution to a puzzle.
            </Text>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 3,
              }}
            >
              <HelpTile value={""} blank={true} />
              <HelpTile value={""} blank={true} />
              <HelpTile value={""} blank={true} />
              <Text style={{ fontSize: 24, marginLeft: 10 }}>= 12</Text>
            </View>
            <Text style={[styles.helpSubSection, { marginBottom: 5 }]}>
              Using a key on the above puzzle may turn it into
            </Text>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 3,
              }}
            >
              <HelpTile value={"3"} blank={true} />
              <HelpTile value={"+"} blank={true} />
              <HelpTile value={""} blank={true} />
              <Text style={{ fontSize: 24, marginLeft: 10 }}>= 12</Text>
            </View>
            <Text style={[styles.helpSubSection, { marginBottom: 10 }]}>
              making it easier to solve. The player will start off with 3 keys,
              with more available as in-app purchases.
            </Text>
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
    backgroundColor: "hsl(180, 10%, 80%)",
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
    fontFamily: "JosefinSans",
  },
  helpTileView: {
    flexDirection: "row",
    marginBottom: 3,
    alignItems: "center",
  },
  helpSubSection: {
    fontFamily: "JosefinSansLight",
    fontSize: 16,
    marginLeft: 10,
    marginTop: 5,
  },
});

export default Help;
