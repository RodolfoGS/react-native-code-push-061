import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import CodePush from "react-native-code-push";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    CodePush.notifyAppReady();
  }

  codePushStatusDidChange(syncStatus) {
    switch (syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        this.setState({ syncMessage: "Checking for update." });
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        this.setState({ syncMessage: "Downloading package." });
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        this.setState({ syncMessage: "Awaiting user action." });
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        this.setState({ syncMessage: "Installing update." });
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        this.setState({ syncMessage: "App up to date.", progress: false });
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        this.setState({ syncMessage: "Update cancelled by user.", progress: false });
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        this.setState({ syncMessage: "Update installed and will be applied on restart.", progress: false });
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        this.setState({ syncMessage: "An unknown error occurred.", progress: false });
        break;
    }
    if (this.state.syncMessage) {
      console.log(`[CodePush] ${this.state.syncMessage}`);
    }
  }

  syncImmediate() {
    CodePush.sync(
      { installMode: CodePush.InstallMode.IMMEDIATE, updateDialog: true },
      this.codePushStatusDidChange.bind(this),
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!{'\n'}
          <Text style={{
            color: 'red'
          }}>
            Update 2
          </Text>
        </Text>
        <TouchableOpacity onPress={this.syncImmediate.bind(this)}>
          <Text>Check for updates</Text>
        </TouchableOpacity>
        <Text style={styles.messages}>{this.state.syncMessage || ""}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  messages: {
    marginTop: 30,
    textAlign: "center",
    color: "green",
  },
});

export default CodePush()(App);
