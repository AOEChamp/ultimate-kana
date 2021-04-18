import React, { useContext, useState } from 'react';
import { shuffle } from 'lodash';

import * as Kana from '../constants/Kana';
import RandomQuizView from '../components/RandomQuizView';
import ReviewCompleteView from '../components/ReviewCompleteView';
import { LessonHistoryContext } from '../contexts/LessonHistoryContext';
import { SettingsContext } from '../contexts/SettingsContext';

const ReviewScreen = ({ navigation }) => {
  const { settings } = useContext(SettingsContext);
  const { lessonHistory } = useContext(LessonHistoryContext);
  const getFullQuizPool = () => {
    let pool = [...Kana.HiraganaLessons, ...Kana.KatakanaLessons]
      .filter((lesson) => lessonHistory[lesson.id].completed)
      .flatMap((lesson) => lesson.kana);

    pool = shuffle(pool);
    return pool.slice(0, Math.min(settings.reviewSize, pool.length));
  };
  const [fullQuizPool] = useState(getFullQuizPool);

  const [isComplete, setIsComplete] = useState(false);
  const [accuracy, setAccuracy] = useState(0);

  const onComplete = (failCount) => {
    setAccuracy(((fullQuizPool.length - failCount) / fullQuizPool.length) * 100);
    setIsComplete(true);
  };

  const reviewAgain = () => setIsComplete(false);

  return isComplete ? (
    <ReviewCompleteView navigation={navigation} accuracy={accuracy} reviewAgain={reviewAgain} />
  ) : (
    <RandomQuizView fullQuizPool={fullQuizPool} onRoundComplete={onComplete} />
  );
};

ReviewScreen.navigationOptions = {
  headerShown: false,
};

export default ReviewScreen;
