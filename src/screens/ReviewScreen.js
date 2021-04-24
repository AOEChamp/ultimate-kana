import React, { useContext, useState } from 'react';

import * as Kana from '../constants/Kana';
import RandomQuizView from '../components/RandomQuizView';
import ReviewCompleteView from '../components/ReviewCompleteView';
import { LessonHistoryContext } from '../contexts/LessonHistoryContext';
import { SettingsContext } from '../contexts/SettingsContext';
import { KanaStatsContext } from '../contexts/KanaStatsContext';
import { weightedRandomSample } from '../utils/WeightedRandomSampling';

const ReviewScreen = ({ navigation }) => {
  const { settings } = useContext(SettingsContext);
  const { lessonHistory } = useContext(LessonHistoryContext);
  const { kanaStats } = useContext(KanaStatsContext);
  const getFullQuizPool = () => {
    let pool = [...Kana.HiraganaLessons, ...Kana.KatakanaLessons]
      .filter((lesson) => lessonHistory[lesson.id].completed)
      .flatMap((lesson) => lesson.kana)
      .map((kana) => [kana, 1 + kanaStats[kana].lastNAttempts.filter((a) => !a).length]);

    pool = weightedRandomSample(pool, settings.reviewSize);
    return pool;
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
