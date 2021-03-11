import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { shuffle } from 'lodash';

import * as Kana from '../../constants/Kana';
import QuizView from '../QuizView';
import { useUpdateEffect } from '../../utils/updateEffects';

const LessonQuizView = ({ optionsPool, questionPool, onComplete }) => {
  const [quizItemOrder, setQuizItemOrder] = useState(shuffle(questionPool));

  useUpdateEffect(() => {
    setQuizItemOrder(shuffle(questionPool));
  }, [questionPool]);

  const getNextQuizAnswer = () => {
    const key = quizItemOrder[quizItemOrder.length - 1];
    return Kana.KanaData[key];
  };

  const [currentAnswer, setCurrentAnswer] = useState(getNextQuizAnswer());

  useLayoutEffect(
    () => setQuizItemOrder(quizItemOrder.filter((key) => key !== currentAnswer.kana)),
    [currentAnswer]
  );

  const nextAnserTimeoutRef = useRef(-1);

  useEffect(() => () => clearTimeout(nextAnserTimeoutRef.current), []);

  const showNextQuestion = () => {
    if (quizItemOrder.length === 0) {
      onComplete();
    } else {
      setCurrentAnswer(getNextQuizAnswer());
    }
  };

  const onCorrectAnswer = () => {
    nextAnserTimeoutRef.current = setTimeout(() => showNextQuestion(), 1000);
  };

  return (
    <QuizView
      optionsPool={optionsPool}
      onCorrectAnswer={onCorrectAnswer}
      answerItem={currentAnswer}
    />
  );
};

export default LessonQuizView;
