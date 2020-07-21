import React, { useContext } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

import { TextSwitch } from '../components/TextSwitch';
import { KanaBlock } from '../components/KanaBlock';
import { FontList } from '../constants/Fonts';
import { SettingsContext } from '../contexts/SettingsContext';

const SettingsScreen = () => {
  const { settings, setSettings } = useContext(SettingsContext);

  const toggleRomajiDrill = () => {
    settings.enableRomajiSelectionDrills = !settings.enableRomajiSelectionDrills;
    settings.enableKanaSelectionDrills = !settings.enableRomajiSelectionDrills
      ? true
      : settings.enableKanaSelectionDrills;
    setSettings(settings);
  };
  const toggleKanaDrill = () => {
    settings.enableKanaSelectionDrills = !settings.enableKanaSelectionDrills;
    settings.enableRomajiSelectionDrills = !settings.enableKanaSelectionDrills
      ? true
      : settings.enableRomajiSelectionDrills;
    setSettings(settings);
  };
  const toggleAudioDisplay = () => {
    settings.audioOnQuizDisplay = !settings.audioOnQuizDisplay;
    setSettings(settings);
  };
  const toggleAudioAnswer = () => {
    settings.audioOnQuizAnswer = !settings.audioOnQuizAnswer;
    setSettings(settings);
  };
  const toggleRandomizeFont = () => {
    settings.randomizeKanaFont = !settings.randomizeKanaFont;
    setSettings(settings);
  };
  const setFont = (fontName) => {
    settings.kanaFont = fontName;
    setSettings(settings);
  };

  return (
    <ScrollView style={styles.container}>
      <TextSwitch
        value={settings.enableRomajiSelectionDrills}
        onValueChange={toggleRomajiDrill}
        style={styles.switch}
      >
        Enable Romaji selection drills
      </TextSwitch>
      <TextSwitch
        value={settings.enableKanaSelectionDrills}
        onValueChange={toggleKanaDrill}
        style={styles.switch}
      >
        Enable Kana selection drills
      </TextSwitch>
      <TextSwitch
        value={settings.audioOnQuizAnswer}
        onValueChange={toggleAudioAnswer}
        style={styles.switch}
      >
        Play audio on selection
      </TextSwitch>
      <TextSwitch
        value={settings.audioOnQuizDisplay}
        onValueChange={toggleAudioDisplay}
        style={styles.switch}
      >
        Play audio on drill
      </TextSwitch>
      <View>
        <Text style={styles.fontLabel}>Font:</Text>
        <TextSwitch
          value={settings.randomizeKanaFont}
          onValueChange={toggleRandomizeFont}
          style={styles.switch}
        >
          Randomize font
        </TextSwitch>
        <FontSelector
          disabled={settings.randomizeKanaFont}
          selectedFont={settings.kanaFont}
          onSelected={setFont}
        />
      </View>
    </ScrollView>
  );
};

SettingsScreen.navigationOptions = {
  title: 'Settings',
};

export default SettingsScreen;

const FontSelector = (props) => (
  <View opacity={props.disabled ? 0.5 : 1} style={styles.fontSelector}>
    {FontList.map((fontName, i) => (
      // <Text>{fontName}{i}</Text>
      <KanaBlock
        style={styles.kanaBlock}
        disabled={props.disabled}
        onPress={props.onSelected.bind(this, fontName)}
        key={i}
        kanaFont={fontName}
        selected={props.selectedFont === fontName}
      >
        き
      </KanaBlock>
    ))}
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
    margin: 10,
  },
});
