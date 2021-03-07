import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import KanaText from './KanaText';
import { RoundedButton, RoundedButtonBase } from './RoundedButton';

const MemorizeView = ({ kanaFont, currentKanaItem, playCurrentSound, showNextItem }) => {
  return (
    <View style={styles.lessonLearnView}>
      <View style={styles.kanaDisplayContainer}>
        <KanaText fontSize={150} kanaFont={kanaFont}>
          {currentKanaItem.kana}
        </KanaText>

        <KanaText fontSize={100} kanaFont={kanaFont}>
          {currentKanaItem.eng}
        </KanaText>
        <RoundedButtonBase style={styles.soundButton} onClick={playCurrentSound}>
          <Ionicons name="md-volume-high" size={26} color="#fff" />
        </RoundedButtonBase>
      </View>
      <RoundedButton onClick={showNextItem} style={styles.nextButtonStyle} title="Next" />
    </View>
  );
};

export default MemorizeView;

const styles = StyleSheet.create({
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
});
