import React, { useState, useEffect, useRef } from 'react';
import { shuffle } from 'lodash';

import * as Kana from '../constants/Kana';
import QuizView from './QuizView';

const RandomQuizView = ({ fullQuizPool }) => {
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

  const showNextQuestion = () => setCurrentAnswer(popNextQuizAnswer());

  const onCorrectAnswer = () => {
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
