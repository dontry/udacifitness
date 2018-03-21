import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import AddEntry from "./components/AddEntry";

export default class App extends React.Component {
  handlePress = () => {
    alert('hello');
  }
  render() {
    return (
      <View style={styles.container}>
      <TouchableHighlight>

      </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItem: 'stretch',
    justifyContent: 'center'
  }
})
