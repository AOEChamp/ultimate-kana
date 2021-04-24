import React from 'react';
import { Platform, StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import AppLoading from 'expo-app-loading';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as Font from 'expo-font';
import AppNavigator from '../navigation/AppNavigator';
import { LoadFonts } from '../constants/Fonts';
import { getItem } from '../utils/Storage';
import {
  LessonHistoryProvider,
  initialLessionHistory,
  LessonHistoryKey,
} from '../contexts/LessonHistoryContext';
import { SettingsProvider, loadSettings } from '../contexts/SettingsContext';
import { KanaStatsProvider, initialKanaStats, KanaStatsKey } from '../contexts/KanaStatsContext';

export default class HybridApp extends React.Component {
  constructor(props) {
    super(props);

    // Audio config
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: false,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      playThroughEarpieceAndroid: false,
    });

    this.state = {
      isLoadingComplete: false,
    };

    this.initialLessionHistoryState = null;
    this.initialSettingsState = null;
    this.initialKanaStatsState = null;
  }

  initAsync = async () => {
    return Promise.all([this.loadResourcesAsync(), this.loadSavedStates()]);
  };

  loadSavedStates = async () => {
    this.initialLessionHistoryState = (await getItem(LessonHistoryKey)) || initialLessionHistory();
    this.initialSettingsState = await loadSettings();
    this.initialKanaStatsState = (await getItem(KanaStatsKey)) || initialKanaStats();
  };

  loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        ...LoadFonts,
      }),
    ]);
  };

  handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    const { isLoadingComplete } = this.state;
    if (!isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this.initAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <LessonHistoryProvider initialState={this.initialLessionHistoryState}>
          <SettingsProvider initialState={this.initialSettingsState}>
            <KanaStatsProvider initialState={this.initialKanaStatsState}>
              <AppNavigator />
            </KanaStatsProvider>
          </SettingsProvider>
        </LessonHistoryProvider>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
