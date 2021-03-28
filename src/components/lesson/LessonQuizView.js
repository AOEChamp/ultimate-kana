import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { shuffle } from 'lodash';

import * as Kana from '../../constants/Kana';
import QuizView from '../QuizView';
import { useUpdateEffect } from '../../utils/updateEffects';
import playAudio from '../../utils/Audio';

const LessonQuizView = ({ optionsPool, questionPool, onComplete, onStep = () => {} }) => {
  const [quizItemOrder, setQuizItemOrder] = useState(shuffle(questionPool));

  const getNextQuizAnswer = () => {
    const key = quizItemOrder[quizItemOrder.length - 1];
    return Kana.KanaData[key];
  };

  const [currentAnswer, setCurrentAnswer] = useState(getNextQuizAnswer());

  useUpdateEffect(() => {
    const newOrder = shuffle(questionPool);
    setQuizItemOrder(newOrder);
    const key = newOrder[newOrder.length - 1];
    setCurrentAnswer(Kana.KanaData[key]);
  }, [questionPool]);

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
      onStep();
    }
  };

  const onCorrectAnswer = () => {
    playAudio(currentAnswer);
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
