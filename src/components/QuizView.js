import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { FontList } from '../constants/Fonts';
import { KanaBlock } from '../components/KanaBlock';
import KanaText from '../components/KanaText';
import { SettingsContext } from '../contexts/SettingsContext';
import playAudio from '../utils/Audio';

export const QuizView = ({
  useKanaSelection,
  onKanaPress,
  quizOptions,
  quizQuestion,
  style,
}) => {
  const { settings } = useContext(SettingsContext);

  const getFont = () => {
    let kanaFont = settings.kanaFont;
    if (settings.randomizeKanaFont) {
      const fontNames = Object.keys(FontList);
      const fontIdx = Math.floor(Math.random() * (fontNames.length - 1));
      kanaFont = fontNames[fontIdx];
    }
    return kanaFont;
  };
  const [fontName, setFontName] = useState(getFont());

  useEffect(() => {
    setFontName(getFont());
  }, [settings]);

  useEffect(() => {
    if (settings.audioOnQuizDisplay) {
      playAudio(quizQuestion);
    }
  }, [quizQuestion]);

  const internalOnPress = (...props) => {
    if (settings.audioOnQuizAnswer) {
      playAudio(quizQuestion);
    }
    onKanaPress(...props);
  };

  return (
    <View style={style}>
      <View style={styles.displayKanaView}>
        <View style={styles.quizQuestionView}>
          <KanaText fontSize={100} kanaFont={fontName}>
            {useKanaSelection ? quizQuestion.eng : quizQuestion.kana}
          </KanaText>
        </View>
      </View>
      <View style={styles.quizOptionsView}>
        <KanaQuizRow
          kanaFont={fontName}
          useKanaSelection={useKanaSelection}
          onKanaPress={internalOnPress}
          options={quizOptions.slice(0, 3)}
        />
        <KanaQuizRow
          kanaFont={fontName}
          useKanaSelection={useKanaSelection}
          onKanaPress={internalOnPress}
          options={quizOptions.slice(3, 6)}
        />
      </View>
    </View>
  );
};

const KanaQuizRow = (props) => (
  <View style={styles.kanaRow}>
    {props.options.map((kanaData, i) => (
      <KanaBlock
        fontSize={60}
        style={styles.kanaBlock}
        kanaFont={props.kanaFont}
        onPress={props.onKanaPress.bind(this, kanaData)}
        selectColor={kanaData.fail ? '#f00' : '#0f0'}
        key={i}
        selected={kanaData.fail || kanaData.success}
      >
        {props.useKanaSelection ? kanaData.kana : kanaData.eng}
      </KanaBlock>
    ))}
  </View>
);

const styles = StyleSheet.create({
  quizOptionsView: {
    flex: 1,
    width: '100%',
  },
  kanaRow: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5,
  },
  kanaBlock: {
    aspectRatio: 1,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#000',
  },
  quizQuestionView: {
    flex: 1,
    margin: '25%',
  },
  displayKanaView: {
    flex: 1,
  },
});
