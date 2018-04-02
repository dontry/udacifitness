import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";
import MetricCard from "./MetricCard";
import { white } from "../utils/helpers";
import { addEntry } from "../actions";
import { removeEntry } from "../utils/api";
import { timeToString, getDailyReminderValue } from "../utils/helpers";
import { ImagePicker, ImageEditor } from "expo";

class EntryDetail extends Component {
  state = {
    image: null
  };
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params;
    const year = entryId.slice(0, 4);
    const month = entryId.slice(5, 7);
    const day = entryId.slice(8);

    return {
      title: `${month}/${day}/${year}`
    };
  };
  reset = () => {
    const { remove, goBack, entryId } = this.props;

    remove();
    goBack();
    removeEntry(entryId);
  };
  pickImage = () => {
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [2, 1]
    }).then(result => {
      if (result.cancelled) {
        return;
      }

      // ImageEditor.cropImage(
      //   result.uri,
      //   {
      //     offset: { x: 0, y: 0 },
      //     size: { width: result.width, height: result.height },
      //     displaySize: { width: 200, height: 100 },
      //     resizeMode: "contain"
      //   },
      //   uri => this.setState(() => ({ image: uri })),
      //   () => console.log("Error")
      // );
      this.setState(() => ({ image: result.uri }));
    });
  };

  shouldComponentUpdate(nextProps) {
    //stop rendering if metrics === null or today is undefined
    return nextProps.metrics !== null && !nextProps.metrics.today;
  }
  render() {
    const { metrics } = this.props;
    const { image } = this.state;
    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics} />
        <Text>
          Entry Detail -{" "}
          {JSON.stringify(this.props.navigation.state.params.entryId)}{" "}
        </Text>
        <TouchableOpacity onPress={this.pickImage}>
          <Text>Open Camera Roll</Text>
        </TouchableOpacity>
        {image && <Image style={styles.img} source={{ uri: image }} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15
  },
  img: {
    width: 200,
    height: 200
  }
});

function mapStateToProps(state, { navigation }) {
  const { entryId } = navigation.state.params;
  return {
    entryId,
    metrics: state[entryId]
  };
}

function mapDispatchToProps(dispatch, { navigation }) {
  const { entryId } = navigation.state.params;
  return {
    remove: () =>
      dispatch(
        addEntry({
          [entryId]: timeToString() === entryId ? getDailyReminderValue() : null
        })
      ),
    goBack: () => navigation.goBack()
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail);
