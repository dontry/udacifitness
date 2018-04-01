import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { white, gray, purple } from "../utils/colors";

export default function UdaciStepper({
  max,
  unit,
  step,
  value,
  onIncrement,
  onDecrement
}) {
  const btnStyle = Platform.OS === 'ios' ? 'iosBtn' : 'androidBtn';
  return (
    <View style={[styles.row, { justifyContent: "space-between" }]}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={[
            styles[btnStyle],
            { borderTopRightRadius: 0, borderBottomLeftRadius: 0 }
          ]}
          onPress={onDecrement}
        >
          <FontAwesome name="minus" size={30} color={"black"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles[btnStyle],
            { borderTopRightRadius: 0, borderBottomLeftRadius: 0 }
          ]}
          onPress={onIncrement}
        >
          <FontAwesome name="plus" size={30} color={"black"} />
        </TouchableOpacity>
      </View>
      <View style={styles.metricCounter}>
        <Text>{value}</Text>
        <Text style={{color: gray}}>{unit}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center"
  },
  iosBtn: {
    backgroundColor: white,
    borderColor: purple,
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25
  },
  androidBtn: {
       margin: 5,
      backgroundColor: purple,
    padding: 10,
    borderRadius: 2
  },
  metricCounter: {
       width: 85,
       justifyContent: 'center',
       alignItems: 'center'
  }
});
