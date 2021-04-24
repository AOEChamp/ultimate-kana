import React, { useState, useEffect, useRef, useContext } from 'react';
import { shuffle } from 'lodash';
import { StyleSheet, View } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import * as Kana from '../constants/Kana';
import QuizView from './QuizView';
import playAudio from '../utils/Audio';
import { SettingsContext } from '../contexts/SettingsContext';

const RandomQuizView = ({ fullQuizPool, onRoundComplete }) => {
  const { settings } = useContext(SettingsContext);
  const quizItemOrderRef = useRef(shuffle(fullQuizPool));
  const failCountRef = useRef(0);

  const popNextQuizAnswer = () => {
    if (quizItemOrderRef.current.length === 0) {
      failCountRef.current = 0;
      quizItemOrderRef.current = shuffle(fullQuizPool);
    }
    const key = quizItemOrderRef.current.pop();
    return Kana.KanaData[key];
  };

  const [currentAnswer, setCurrentAnswer] = useState(popNextQuizAnswer);
  const nextAnswerTimeoutRef = useRef(-1);

  useEffect(() => () => clearTimeout(nextAnswerTimeoutRef.current), []);

  const showNextQuestion = () => {
    const nextAnswer = popNextQuizAnswer();
    if (settings.audioOnQuizDisplay) {
      playAudio(nextAnswer);
    }
    setCurrentAnswer(nextAnswer);
  };

  const onCorrectAnswer = (didFailQuestion) => {
    if (settings.audioOnQuizAnswer) {
      playAudio(currentAnswer);
    }
    if (didFailQuestion) {
      failCountRef.current++;
    }

    if (quizItemOrderRef.current.length === 0 && onRoundComplete) {
      nextAnswerTimeoutRef.current = setTimeout(() => onRoundComplete(failCountRef.current), 1000);
    } else {
      nextAnswerTimeoutRef.current = setTimeout(() => showNextQuestion(), 1000);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressView}>
        <ProgressBar
          progress={
            (fullQuizPool.length - quizItemOrderRef.current.length - 1) / fullQuizPool.length
          }
          width={null}
          color="#00BCD4"
          borderRadius={30}
          height={20}
        />
      </View>
      <QuizView
        optionsPool={fullQuizPool}
        onCorrectAnswer={onCorrectAnswer}
        answerItem={currentAnswer}
      />
    </View>
  );
};

export default RandomQuizView;

const styles = StyleSheet.create({
  progressView: {
    margin: wp(5),
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
