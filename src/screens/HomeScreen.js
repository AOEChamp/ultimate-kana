import React, { useRef, useContext } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ScalableText from 'react-native-text';

import { FontFamilyList } from '../constants/Fonts';
import { SettingsContext } from '../contexts/SettingsContext';
import { KanaGridTypes, HiraganaGojuon, KatakanaGojuon } from '../constants/Kana';
import { RoundedButton } from '../components/RoundedButton';
import BubbleText from '../components/bubble/BubbleText';

const HomeScreen = ({ navigation }) => {
  const { settings } = useContext(SettingsContext);
  const kanaRef = useRef();
  if (!kanaRef.current) {
    kanaRef.current = [...HiraganaGojuon, ...KatakanaGojuon];
  }
  const navigateToLessonSelectH = () => {
    navigation.navigate('LessonSelectScreen', {
      lessonType: KanaGridTypes.Hiragana,
    });
  };

  const navigateToLessonSelectK = () => {
    navigation.navigate('LessonSelectScreen', {
      lessonType: KanaGridTypes.Katakana,
    });
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <BubbleText
          maxFontSize={40}
          minFontSize={5}
          maxOffest={50}
          maxDuration={15000}
          textPool={kanaRef.current}
          fontFamily={settings.randomizeKanaFont ? FontFamilyList : settings.kanaFont}
        />
        <View style={styles.welcomeContainer}>
          <ScalableText style={styles.titleText}>Ultimate Kana</ScalableText>
        </View>
        <Text style={styles.headerText}>Lessons</Text>
        <View style={styles.buttonContainer}>
          <RoundedButton onClick={navigateToLessonSelectH} title="Hiragana" />
          <RoundedButton onClick={navigateToLessonSelectK} title="Katakana" />
        </View>
      </ScrollView>
    </View>
  );
};

HomeScreen.navigationOptions = {
  headerShown: false,
};

export default HomeScreen;

const styles = StyleSheet.create({
  canvas: {
    flexShrink: 1,
  },
  titleText: {
    fontFamily: 'Arkipelago',
    fontSize: 50,
    marginTop: 20,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 20,
  },
  buttonContainer: {},
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    justifyContent: 'center',
    padding: 40,
    flex: 1,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
});
