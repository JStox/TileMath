import { Icon } from "react-native-elements";
import { Text, StyleSheet } from "react-native";

const Symbol = ({ sign }) => {
  const trades = {
    "+": (
      <Icon
        type="font-awesome-5"
        name="plus"
        size={20}
        iconStyle={{ alignSelf: "center", marginTop: 7, marginLeft: 2 }}
      />
    ),
    "-": (
      <Icon
        type="font-awesome-5"
        name="minus"
        size={20}
        iconStyle={{ alignSelf: "center", marginTop: 6, marginLeft: 2 }}
      />
    ),
    "*": (
      <Icon
        type="font-awesome-5"
        name="times"
        size={22}
        iconStyle={{ alignSelf: "center", marginTop: 6, marginLeft: 2 }}
      />
    ),
    "/": (
      <Icon
        type="font-awesome-5"
        name="divide"
        size={20}
        iconStyle={{ alignSelf: "center", marginTop: 7, marginLeft: 1 }}
      />
    ),
  };

  return (
    <Text style={trades[sign] ? styles.symbolText : styles.boxText}>
      {trades[sign] ? trades[sign] : sign}
    </Text>
  );
};

const styles = StyleSheet.create({
  boxText: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },
});

export default Symbol;
