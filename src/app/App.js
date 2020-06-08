import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import AppNavigator from '../navigation/AppNavigator';
import { LoadFonts } from '../constants/Fonts';
import { getItem } from '../utils/Storage';
import { LessonHistoryProvider, initialLessionHistory, LessonHistoryKey } from '../contexts/LessonHistoryContext';
import { SettingsProvider, initialSettings, SettingsKey } from '../contexts/SettingsContext';
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
      playThroughEarpieceAndroid: false
    });

    this.state = {
      isLoadingComplete: false
    }
  }

  initAsync = async () => {
    return Promise.all([
      this._loadResourcesAsync(),
      this.loadSavedStates()
    ]);
  }

  initialLessionHistoryState = null;
  initialSettingsState = null;
  initialKanaStatsState = null;

  loadSavedStates = async () => {
    this.initialLessionHistoryState = await getItem(LessonHistoryKey) || initialLessionHistory();
    this.initialSettingsState = await getItem(SettingsKey) || initialSettings();
    this.initialKanaStatsState = await getItem(KanaStatsKey) || initialKanaStats();
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.initAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <LessonHistoryProvider initialState={this.initialLessionHistoryState}>
            <SettingsProvider initialState={this.initialSettingsState}>
              <KanaStatsProvider initialState={this.initialKanaStatsState}>
                <AppNavigator />
              </KanaStatsProvider>
            </SettingsProvider>
          </LessonHistoryProvider>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('../assets/images/robot-dev.png'),
        require('../assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        ...LoadFonts,
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
