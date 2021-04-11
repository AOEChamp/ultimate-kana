import React, { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import { FontList } from '../constants/Fonts';
import KanaBlock from './KanaBlock';
import KanaText from './KanaText';
import { SettingsContext } from '../contexts/SettingsContext';
import { useUpdateLayoutEffect, useUpdateEffect } from '../utils/updateEffects';

const QuizButtons = ({ useKanaSelection, quizOptions, answerItem, onSelect, disabled }) => {
  const { settings } = useContext(SettingsContext);

  const blankArrayFromOptions = () => quizOptions.map(() => false);

  const [quizFailures, setQuizFailures] = useState(blankArrayFromOptions);
  const [successIndex, setSuccessIndex] = useState(-1);

  useUpdateLayoutEffect(() => {
    setQuizFailures(blankArrayFromOptions());
    setSuccessIndex(-1);
  }, [quizOptions, answerItem]);

  const getFont = () => {
    let { kanaFont } = settings;
    if (settings.randomizeKanaFont) {
      const fontIdx = Math.floor(Math.random() * (FontList.length - 1));
      kanaFont = FontList[fontIdx].fontFamily;
    }
    return kanaFont;
  };
  const [fontName, setFontName] = useState(getFont);

  useUpdateEffect(() => {
    setFontName(getFont());
  }, [settings]);

  const internalOnPress = (index, kanaData) => {
    if (answerItem.kana === kanaData.kana) {
      setSuccessIndex(index);
    } else {
      const newQuizFailures = [...quizFailures];
      newQuizFailures[index] = true;
      setQuizFailures(newQuizFailures);
    }
    onSelect(kanaData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.displayKanaView}>
        <View style={styles.quizQuestionView}>
          <KanaText fontSize={100} kanaFont={fontName}>
            {useKanaSelection ? answerItem.eng : answerItem.kana}
          </KanaText>
        </View>
      </View>
      <View style={styles.quizOptionsView}>
        {quizOptions.map((kanaData, i) => (
          <View key={kanaData.kana} style={styles.kanaBlock}>
            <KanaBlock
              disabled={disabled}
              fontSize={60}
              kanaFont={fontName}
              onPress={() => internalOnPress(i, kanaData)}
              selectColor={quizFailures[i] ? '#f00' : '#0f0'}
              key={kanaData.kana}
              selected={quizFailures[i] || i === successIndex}
            >
              {useKanaSelection ? kanaData.kana : kanaData.eng}
            </KanaBlock>
          </View>
        ))}
      </View>
    </View>
  );
};

export default QuizButtons;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  quizOptionsView: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 5,
  },
  kanaBlock: {
    aspectRatio: 1,
    flexBasis: '33%',
    marginBottom: 5,
  },
  quizQuestionView: {
    flex: 1,
    margin: '25%',
  },
  displayKanaView: {
    flex: 1,
  },
});
