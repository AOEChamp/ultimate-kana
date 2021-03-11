import React, { useContext, useRef } from 'react';

import * as Kana from '../constants/Kana';
import RandomQuizView from '../components/RandomQuizView';
import { LessonHistoryContext } from '../contexts/LessonHistoryContext';

const ReviewScreen = () => {
  const { lessonHistory } = useContext(LessonHistoryContext);
  const getFullQuizPool = () => {
    return [...Kana.HiraganaLessons, ...Kana.KatakanaLessons]
      .filter((lesson) => lessonHistory[lesson.id].completed)
      .flatMap((lesson) => lesson.kana);
  };
  const fullQuizPoolRef = useRef(getFullQuizPool());

  return <RandomQuizView fullQuizPool={fullQuizPoolRef.current} />;
};

ReviewScreen.navigationOptions = {
  headerShown: false,
};

export default ReviewScreen;
