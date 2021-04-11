import React, { useContext } from 'react';
import { ScrollView, StyleSheet, Platform, PlatformColor } from 'react-native';
import { SettingsSwitch, SettingsButton } from 'react-native-settings-components';

import { FontList } from '../constants/Fonts';
import { SettingsContext, initialSettings } from '../contexts/SettingsContext';
import { KanaStatsContext, initialKanaStats } from '../contexts/KanaStatsContext';
import { LessonHistoryContext, initialLessionHistory } from '../contexts/LessonHistoryContext';
import SettingsSection from '../components/SettingsSection';
import SettingsFontItem from '../components/SettingsFontItem';

const SettingsScreen = () => {
  const { settings, setSettings } = useContext(SettingsContext);
  const { setKanaStats } = useContext(KanaStatsContext);
  const { setLessonHistory } = useContext(LessonHistoryContext);

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

  const resetSettings = () => {
    setSettings(initialSettings());
  };

  const resetHistory = () => {
    setKanaStats(initialKanaStats());
    setLessonHistory(initialLessionHistory());
  };

  const resetAll = () => {
    resetSettings();
    resetHistory();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <SettingsSection title="Review">
        <SettingsSwitch
          title="Romaji drills"
          onValueChange={toggleRomajiDrill}
          value={settings.enableRomajiSelectionDrills}
        />
        <SettingsSwitch
          title="Kana drills"
          onValueChange={toggleKanaDrill}
          value={settings.enableKanaSelectionDrills}
        />
      </SettingsSection>
      <SettingsSection title="Audio">
        <SettingsSwitch
          title="After correct answer"
          onValueChange={toggleSetting('audioOnQuizAnswer')}
          value={settings.audioOnQuizAnswer}
        />
        <SettingsSwitch
          title="With each question"
          onValueChange={toggleSetting('audioOnQuizDisplay')}
          value={settings.audioOnQuizDisplay}
        />
      </SettingsSection>
      <SettingsSection title="Animation">
        <SettingsSwitch
          title="Confetti animation"
          onValueChange={toggleSetting('successAnimation')}
          value={settings.successAnimation}
        />
      </SettingsSection>
      <SettingsSection title="Font">
        <SettingsSwitch
          title="Randomize font"
          onValueChange={toggleSetting('randomizeKanaFont')}
          value={settings.randomizeKanaFont}
        />
        {!settings.randomizeKanaFont &&
          FontList.map(({ fontFamily, name }) => (
            <SettingsFontItem
              key={fontFamily}
              title={name}
              subtitle="きふれゆ"
              fontFamily={fontFamily}
              checked={settings.kanaFont === fontFamily}
              onPress={() => setFont(fontFamily)}
            />
          ))}
      </SettingsSection>
      <SettingsSection title="">
        <SettingsButton
          title="Reset settings"
          onPress={resetSettings}
          titleStyle={styles.resetButton}
        />
        <SettingsButton
          title="Reset history"
          onPress={resetHistory}
          titleStyle={styles.resetButton}
        />
        <SettingsButton title="Reset all" onPress={resetAll} titleStyle={styles.resetButton} />
      </SettingsSection>
    </ScrollView>
  );
};

SettingsScreen.navigationOptions = {
  title: 'Settings',
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: { backgroundColor: PlatformColor('secondarySystemBackground') },
      default: { backgroundColor: '#fff' },
    }),
  },
  contentContainer: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  resetButton: {
    ...Platform.select({
      ios: { color: PlatformColor('systemRed') },
      default: { backgroundColor: 'red' },
    }),
  },
});
