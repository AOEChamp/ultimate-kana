import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import AppNavigator from '../navigation/AppNavigator';
import { LoadFonts, loadAllSVGFonts } from '../constants/Fonts';
import { getItem, setItem } from '../utils/Storage';
import { KanaStats, SettingKeys } from '../constants/Settings';
import { KanaData } from '../constants/Kana';
import { LessonHistoryProvider, initialLessionHistory, SettingKey } from '../contexts/LessonHistoryContext';

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
      this.initKanaStats(),
      this.loadLessonHistory()
    ]);
  }

  initialLessionHistoryState = null;

  loadLessonHistory = async () => {
    this.initialLessionHistoryState = await getItem(SettingKey) || initialLessionHistory();
  }

  initKanaStats = async () => {
    let kanaStats = await getItem(SettingKeys.KanaGridStats);

    if (kanaStats == null) {
      kanaStats = Object.keys(KanaData).reduce(function (result, key) {
        result[key] = new KanaStats(key);
        return result;
      }, {});
      await setItem(SettingKeys.KanaGridStats, kanaStats);
    }
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
            <AppNavigator />
          </LessonHistoryProvider>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      loadAllSVGFonts(),
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
