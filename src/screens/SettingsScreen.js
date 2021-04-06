import React, { useContext } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

import { TextSwitch } from '../components/TextSwitch';
import KanaBlock from '../components/KanaBlock';
import { RoundedButton } from '../components/RoundedButton';
import { FontList } from '../constants/Fonts';
import { SettingsContext, initialSettings } from '../contexts/SettingsContext';

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

  const toggleSetting = (setting) => () => {
    const newSettings = {
      ...settings,
      [setting]: !settings[setting],
    };
    setSettings(newSettings);
  };

  const setFont = (fontName) => {
    settings.kanaFont = fontName;
    setSettings(settings);
  };

  const reset = () => {
    setSettings(initialSettings());
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
        onValueChange={toggleSetting('audioOnQuizAnswer')}
        style={styles.switch}
      >
        Play audio on selection
      </TextSwitch>
      <TextSwitch
        value={settings.audioOnQuizDisplay}
        onValueChange={toggleSetting('audioOnQuizDisplay')}
        style={styles.switch}
      >
        Play audio on drill
      </TextSwitch>
      <TextSwitch
        value={settings.successAnimation}
        onValueChange={toggleSetting('successAnimation')}
        style={styles.switch}
      >
        Confetti animation
      </TextSwitch>
      <View>
        <Text style={styles.fontLabel}>Font:</Text>
        <TextSwitch
          value={settings.randomizeKanaFont}
          onValueChange={toggleSetting('randomizeKanaFont')}
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
      <RoundedButton onClick={reset} title="Reset All" />
    </ScrollView>
  );
};

SettingsScreen.navigationOptions = {
  title: 'Settings',
};

export default SettingsScreen;

const FontSelector = ({ disabled, selectedFont, onSelected }) => (
  <View opacity={disabled ? 0.5 : 1} style={styles.fontSelector}>
    {FontList.map((fontName) => (
      // <Text>{fontName}{i}</Text>
      <KanaBlock
        style={styles.kanaBlock}
        disabled={disabled}
        onPress={() => onSelected(fontName)}
        key={fontName}
        kanaFont={fontName}
        selected={selectedFont === fontName}
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
  },
  switch: {
    margin: 10,
  },
});
