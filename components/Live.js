import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import Foundation from "@expo/vector-icons/Foundation";
import { purple, white } from "../utils/colors";
import { Location, Permissions } from "expo";
import { calculateDirection } from "../utils/helpers";

export default class Live extends Component {
  state = {
    coords: null,
    status: "denied",
    direction: ""
  };
  componentDidMount() {
    Permissions.getAsync(Permissions.LOCATION)
      .then(({ status }) => {
        if (status === "granted") {
          return this.setLocation();
        }
        this.setState(() => ({ status }));
      })
      .catch(error => {
        console.warn("Error getting Location permission: ", error);
        this.setState(() => ({ status: "undetermined" }));
      });
  }
  askPermission = () => {
    Permissions.askAsync(Permissions.LOCATION)
      .then(({ status }) => {
        if (status === "granted") {
          return this.setLocation();
        }
        this.setState(() => ({ status }));
      })
      .catch(error => {
        console.warn("Error asking Location permission: ", error);
      });
  };
  setLocation = () => {
    Location.watchPosistionAsync(
      {
        enableHighAccuracy: true,
        timeInterval: 1,
        distanceInterval: 1
      },
      ({ coords }) => {
        const newDirection = calculateDirection(coords.heading);
        const { direction } = this.state;

        this.setState(() => ({
          coords,
          status: "granted",
          direction: newDirection
        }));
      }
    );
  };
  render() {
    const { status, coords, direction } = this.state;

    if (status === null) {
      return <ActivityIndicator style={{ marginTop: 30 }} />;
    }

    if (status === "denied") {
      return (
        <View style={styles.container}>
          <View style={styles.center}>
            <Foundation name="alert" size={50} />
            <Text>
              You denied your loaction. You can fix this by visiting your
              settings and enable location services for this app.
            </Text>
          </View>
        </View>
      );
    }

    if (status === "undetermined") {
      return (
        <View style={styles.container}>
          <View style={styles.center}>
            <Foundation name="alert" size={50} />
            <Text>You need to enable location services for this app.</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={this.askPermission}
            >
              <Text style={styles.buttonText}>Enable</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.directionContainer}>
          <Text style={styles.header}>You're heading </Text>
          <Text style={styles.direction}>{direction}</Text>
        </View>
        <View style={styles.metricContainer}>
          <View style={styles.metric}>
            <Text style={[styles.header, { color: white }]}>Altitude</Text>
            <Text style={[styles.subHeader, { color: white }]}>
              {coords.altitude} Meters
            </Text>
          </View>
          <View style={styles.metric}>
            <Text style={[styles.header, { color: white }]}>Speed</Text>
            <Text style={[styles.subHeader, { color: white }]}>
              {(coords.speed * 2.2369).toFixed(1)} MPH
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30
  },
  button: {
    padding: 10,
    backgroundColor: purple,
    alignSelf: "center",
    borderRadius: 5,
    margin: 20
  },
  buttonText: {
    color: white,
    fontSize: 20
  },
  directionContainer: {
    flex: 1,
    justifyContent: "center"
  },
  header: {
    fontSize: 35,
    textAlign: "center"
  },
  direction: {
    color: purple,
    fontSize: 120,
    textAlign: "center"
  },
  metricContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: purple
  },
  metric: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10
  },
  subHeader: {
    fontSize: 25,
    textAlign: "center",
    marginTop: 5
  }
});
