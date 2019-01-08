import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {
  ScrollView,
  StyleSheet,
  View
} from 'react-native';

import { TextSwitch } from '../components/TextSwitch';
import { QuizSettings } from '../constants/Settings';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };
  constructor(props) {
    super(props);

    this.state = { QuizSettings };
  }
  toggleRomajiDrill = () => {
    QuizSettings.enableRomajiSelectionDrills = !QuizSettings.enableRomajiSelectionDrills;
    QuizSettings.enableKanaSelectionDrills = !QuizSettings.enableRomajiSelectionDrills ? true : QuizSettings.enableKanaSelectionDrills;
    this.setState({ QuizSettings });
  }
  toggleKanaDrill = () => {
    QuizSettings.enableKanaSelectionDrills = !QuizSettings.enableKanaSelectionDrills;
    QuizSettings.enableRomajiSelectionDrills = !QuizSettings.enableKanaSelectionDrills ? true : QuizSettings.enableRomajiSelectionDrills;
    this.setState({ QuizSettings });
  }
  toggleAudioDisplay = () => {
    QuizSettings.audioOnQuizDisplay = !QuizSettings.audioOnQuizDisplay;
    this.setState({ QuizSettings });
  }
  toggleAudioAnswer = () => {
    QuizSettings.audioOnQuizAnswer = !QuizSettings.audioOnQuizAnswer;
    this.setState({ QuizSettings });
  }
  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    // return <ExpoConfigView />;
    return (
      <ScrollView style={styles.container}>
        <TextSwitch value={this.state.QuizSettings.enableRomajiSelectionDrills} onValueChange={this.toggleRomajiDrill} style={styles.switch}>Enable Romaji selection drills</TextSwitch>
        <TextSwitch value={this.state.QuizSettings.enableKanaSelectionDrills} onValueChange={this.toggleKanaDrill} style={styles.switch}>Enable Kana selection drills</TextSwitch>
        <TextSwitch value={this.state.QuizSettings.audioOnQuizAnswer} onValueChange={this.toggleAudioAnswer} style={styles.switch}>Play audio on selection</TextSwitch>
        <TextSwitch value={this.state.QuizSettings.audioOnQuizDisplay} onValueChange={this.toggleAudioDisplay} style={styles.switch}>Play audio on drill</TextSwitch>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  switch: {
    margin: 10
  }
});
