import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import KanaText from '../KanaText';
import { RoundedButton, RoundedButtonBase } from '../RoundedButton';
import { SettingsContext } from '../../contexts/SettingsContext';
import playAudio from '../../utils/Audio';

const MemorizeView = ({ currentKanaItem, onComplete }) => {
  useEffect(() => {
    playAudio(currentKanaItem);
  }, [currentKanaItem]);

  const { settings } = useContext(SettingsContext);
  return (
    <View style={styles.contentContainer}>
      <Text style={styles.subtitleText}>Memorize the following...</Text>
      <View style={styles.lessonLearnView}>
        <View style={styles.kanaDisplayContainer}>
          <KanaText fontSize={wp(36)} kanaFont={settings.kanaFont}>
            {currentKanaItem.kana}
          </KanaText>

          <KanaText fontSize={wp(24)} kanaFont={settings.kanaFont}>
            {currentKanaItem.eng}
          </KanaText>
          <RoundedButtonBase style={styles.soundButton} onClick={() => playAudio(currentKanaItem)}>
            <Ionicons name="md-volume-high" size={26} color="#fff" />
          </RoundedButtonBase>
        </View>
        <RoundedButton onClick={onComplete} style={styles.nextButtonStyle} title="Next" />
      </View>
    </View>
  );
};

export default MemorizeView;

const styles = StyleSheet.create({
  contentContainer: {
    marginRight: 20,
    marginLeft: 20,
    flex: 1,
    flexDirection: 'column',
  },
  soundButton: {
    alignSelf: 'center',
  },
  kanaDisplayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonStyle: {
    marginBottom: 20,
  },
  lessonLearnView: {
    flex: 1,
    flexDirection: 'column',
  },
  subtitleText: {
    fontSize: 16,
    marginBottom: 10,
    marginLeft: wp(5),
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
