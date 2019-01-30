import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {
  ScrollView,
  StyleSheet,
  View,
  Text
} from 'react-native';

import { TextSwitch } from '../components/TextSwitch';
import { QuizSettings } from '../constants/Settings';
import { KanaBlock } from '../components/KanaBlock';
import { FontList } from '../constants/Fonts';

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
  toggleRandomizeFont = () => {
    QuizSettings.randomizeKanaFont = !QuizSettings.randomizeKanaFont;
    this.setState({ QuizSettings });
  }
  setFont = (fontName) => {
    QuizSettings.kanaFont = fontName;
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
        <View>
          <Text style={styles.fontLabel}>Font:</Text>
          <TextSwitch value={this.state.QuizSettings.randomizeKanaFont} onValueChange={this.toggleRandomizeFont} style={styles.switch}>Randomize font</TextSwitch>
          <FontSelector disabled={this.state.QuizSettings.randomizeKanaFont} selectedFont={this.state.QuizSettings.kanaFont} onSelected={this.setFont} />
        </View>
      </ScrollView>
    );
  }
}

const FontSelector = props => (
  <View opacity={props.disabled ? 0.5 : 1} style={styles.fontSelector}>
    {
      FontList.map((fontName, i) =>
        <KanaBlock style={styles.kanaBlock} disabled={props.disabled} onPress={props.onSelected.bind(this, fontName)} key={i} kanaFont={fontName} selected={props.selectedFont === fontName}>き</KanaBlock>
      )
    }
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  fontLabel: {
    marginTop: 20,
    marginLeft: 10,
  },
  fontSelector: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5,
  },
  kanaBlock: {
    aspectRatio: 1,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#000',
  },
  switch: {
    margin: 10
  }
});
