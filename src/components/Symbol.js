import { Icon } from "react-native-elements";
import { Text, StyleSheet, Dimensions } from "react-native";

const Symbol = ({ sign }) => {
  const { height, width } = Dimensions.get("window");
  const small = width < 350;
  const trades = {
    "+": (
      <Icon
        type="font-awesome-5"
        name="plus"
        size={small ? 18 : 20}
        iconStyle={{ alignSelf: "center", marginTop: 7, marginLeft: 2 }}
      />
    ),
    "-": (
      <Icon
        type="font-awesome-5"
        name="minus"
        size={small ? 18 : 20}
        iconStyle={{ alignSelf: "center", marginTop: 6, marginLeft: 2 }}
      />
    ),
    "*": (
      <Icon
        type="font-awesome-5"
        name="times"
        size={small ? 20 : 22}
        iconStyle={{ alignSelf: "center", marginTop: 6, marginLeft: 2 }}
      />
    ),
    "/": (
      <Icon
        type="font-awesome-5"
        name="divide"
        size={small ? 18 : 20}
        iconStyle={{ alignSelf: "center", marginTop: 7, marginLeft: 1 }}
      />
    ),
  };
  return (
    <Text style={small ? styles.smallBoxText : styles.boxText}>
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
  smallBoxText: {
    fontWeight: "bold",
    fontSize: 21,
    textAlign: "center",
  },
});

export default Symbol;
