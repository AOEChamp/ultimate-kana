import React, { useContext, useState, useRef } from 'react';
import { cloneDeep, shuffle } from 'lodash';

import * as Kana from '../constants/Kana';
import QuizButtons from './QuizButtons';
import { SettingsContext } from '../contexts/SettingsContext';
import { KanaStatsContext } from '../contexts/KanaStatsContext';
import { useUpdateLayoutEffect } from '../utils/updateEffects';
import { DefaultExplosion } from './explosion/Explosion';

const QuizView = ({ optionsPool, answerItem, onCorrectAnswer, forceKanaSelection }) => {
  const { settings } = useContext(SettingsContext);
  const { kanaStats, setKanaStats } = useContext(KanaStatsContext);
  const [isUIDisabled, setIsUIDisabled] = useState(false);
  const didSetStatsRef = useRef(false);
  const didFailQuestion = useRef(false);

  const getUseKanaSelection = () => {
    if (forceKanaSelection !== undefined) return forceKanaSelection;
    let val = settings.enableKanaSelectionDrills;
    if (val && settings.enableRomajiSelectionDrills) {
      val = Math.random() >= 0.5;
    }
    return val;
  };

  const getQuizOptions = () => {
    const newQuizOptions = shuffle(optionsPool);
    newQuizOptions.splice(6);

    if (!newQuizOptions.includes(answerItem.kana)) {
      newQuizOptions[Math.floor(Math.random() * newQuizOptions.length)] = answerItem.kana;
    }
    return newQuizOptions.map((key) => Kana.KanaData[key]);
  };

  const [quizOptions, setQuizOptions] = useState(getQuizOptions);
  const [useKanaSelection, setUseKanaSelection] = useState(getUseKanaSelection);

  const setQuizStat = (kanaData, fail) => {
    if (!didSetStatsRef.current) {
      const newKanaStats = cloneDeep(kanaStats);
      const stat = newKanaStats[kanaData.kana];
      stat.totalFailures += fail ? 1 : 0;
      stat.totalViews++;
      if (stat.lastNAttempts.unshift(!fail) > settings.accuracySize) {
        stat.lastNAttempts.pop();
      }
      setKanaStats(newKanaStats);
      didSetStatsRef.current = true;
    }
  };

  useUpdateLayoutEffect(() => {
    didSetStatsRef.current = false;
    didFailQuestion.current = false;
    setQuizOptions(getQuizOptions());
    setUseKanaSelection(getUseKanaSelection());
    setIsUIDisabled(false);
  }, [answerItem]);

  const onSelect = (selectedItem) => {
    if (selectedItem.eng === answerItem.eng) {
      setIsUIDisabled(true);
      setQuizStat(answerItem, false);
      onCorrectAnswer(didFailQuestion.current);
    } else {
      didFailQuestion.current = true;
      setQuizStat(answerItem, true);
    }
  };

  return (
    <>
      <QuizButtons
        useKanaSelection={useKanaSelection}
        onSelect={onSelect}
        quizOptions={quizOptions}
        answerItem={answerItem}
        disabled={isUIDisabled}
      />
      {settings.successAnimation && <DefaultExplosion animating={isUIDisabled} />}
    </>
  );
};

export default QuizView;
