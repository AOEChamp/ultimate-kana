import React, { useState, useEffect, useRef, useContext } from 'react';
import { shuffle } from 'lodash';

import * as Kana from '../constants/Kana';
import QuizView from './QuizView';
import playAudio from '../utils/Audio';
import { SettingsContext } from '../contexts/SettingsContext';

const RandomQuizView = ({ fullQuizPool }) => {
  const { settings } = useContext(SettingsContext);
  const quizItemOrderRef = useRef(shuffle(fullQuizPool));

  const popNextQuizAnswer = () => {
    if (quizItemOrderRef.current.length === 0) {
      quizItemOrderRef.current = shuffle(fullQuizPool);
    }
    const key = quizItemOrderRef.current.pop();
    return Kana.KanaData[key];
  };

  const [currentAnswer, setCurrentAnswer] = useState(popNextQuizAnswer());
  const nextAnserTimeoutRef = useRef(-1);

  useEffect(() => () => clearTimeout(nextAnserTimeoutRef.current), []);

  const showNextQuestion = () => {
    const nextAnswer = popNextQuizAnswer();
    if (settings.audioOnQuizDisplay) {
      playAudio(nextAnswer);
    }
    setCurrentAnswer(nextAnswer);
  };

  const onCorrectAnswer = () => {
    if (settings.audioOnQuizAnswer) {
      playAudio(currentAnswer);
    }
    nextAnserTimeoutRef.current = setTimeout(() => showNextQuestion(), 1000);
  };

  return (
    <QuizView
      optionsPool={fullQuizPool}
      onCorrectAnswer={onCorrectAnswer}
      answerItem={currentAnswer}
    />
  );
};

export default RandomQuizView;
