import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import KanaText from '../KanaText';
import { RoundedButton, RoundedButtonBase } from '../RoundedButton';
import { SettingsContext } from '../../contexts/SettingsContext';

const MemorizeView = ({ currentKanaItem, playCurrentSound, showNextItem }) => {
  const { settings } = useContext(SettingsContext);
  return (
    <View style={styles.contentContainer}>
      <Text style={styles.subtitleText}>Memorize the following...</Text>
      <View style={styles.lessonLearnView}>
        <View style={styles.kanaDisplayContainer}>
          <KanaText fontSize={150} kanaFont={settings.kanaFont}>
            {currentKanaItem.kana}
          </KanaText>

          <KanaText fontSize={100} kanaFont={settings.kanaFont}>
            {currentKanaItem.eng}
          </KanaText>
          <RoundedButtonBase style={styles.soundButton} onClick={playCurrentSound}>
            <Ionicons name="md-volume-high" size={26} color="#fff" />
          </RoundedButtonBase>
        </View>
        <RoundedButton onClick={showNextItem} style={styles.nextButtonStyle} title="Next" />
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
    marginTop: 5,
    marginBottom: 20,
    marginLeft: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
