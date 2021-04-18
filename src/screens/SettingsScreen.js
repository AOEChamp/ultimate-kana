import React, { useContext } from 'react';
import { ScrollView, StyleSheet, Platform, PlatformColor, Alert } from 'react-native';
import { SettingsSwitch, SettingsButton } from 'react-native-settings-components';

import { FontList } from '../constants/Fonts';
import { SettingsContext, initialSettings } from '../contexts/SettingsContext';
import { KanaStatsContext, initialKanaStats } from '../contexts/KanaStatsContext';
import { LessonHistoryContext, initialLessionHistory } from '../contexts/LessonHistoryContext';
import SettingsSection from '../components/settings/SettingsSection';
import SettingsCheckbox from '../components/settings/SettingsCheckbox';
import SettingsPicker from '../components/settings/SettingsPicker';

const SettingsScreen = ({ navigation }) => {
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

  const setValue = (key, value) => {
    const newSettings = {
      ...settings,
      [key]: value,
    };
    setSettings(newSettings);
  };

  const resetSettings = () => {
    Alert.alert(
      'Are you sure you want to reset settings?',
      'Settings will be reset to defaults. Your lesson history will be preserved.',
      [
        { text: 'Cancel', style: 'cancel', onPress: () => {} },
        { text: 'Reset', style: 'destructive', onPress: () => setSettings(initialSettings()) },
      ]
    );
  };

  const resetHistory = () => {
    Alert.alert(
      'Are you sure you want to reset history?',
      'Your lesson progress and stats will cleared.',
      [
        { text: 'Cancel', style: 'cancel', onPress: () => {} },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            setKanaStats(initialKanaStats());
            setLessonHistory(initialLessionHistory());
          },
        },
      ]
    );
  };

  const resetAll = () => {
    Alert.alert(
      'Are you sure you want to reset all data?',
      'Your lesson progress and stats will cleared, and all settings will revert to defaults.',
      [
        { text: 'Cancel', style: 'cancel', onPress: () => {} },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            setSettings(initialSettings());
            setKanaStats(initialKanaStats());
            setLessonHistory(initialLessionHistory());
          },
        },
      ]
    );
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
        <SettingsPicker
          title="Review batch size"
          screenTitle="Review Batch Size"
          value={settings.reviewSize}
          options={[
            { label: '5', longLabel: '5 reviews', value: 5 },
            { label: '10', longLabel: '10 reviews', value: 10 },
            { label: '15', longLabel: '15 reviews', value: 15 },
            { label: '20', longLabel: '20 reviews', value: 20 },
          ]}
          navigation={navigation}
          onChange={(value) => setValue('reviewSize', value)}
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
            <SettingsCheckbox
              key={fontFamily}
              title={name}
              subtitle="きふれゆ"
              fontFamily={fontFamily}
              checked={settings.kanaFont === fontFamily}
              onPress={() => setValue('kanaFont', fontFamily)}
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
