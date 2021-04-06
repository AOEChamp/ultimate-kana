import React, { useContext, useState, useRef } from 'react';
import { cloneDeep, shuffle } from 'lodash';
import ConfettiCannon from 'react-native-confetti-cannon';

import * as Kana from '../constants/Kana';
import QuizButtons from './QuizButtons';
import { SettingsContext } from '../contexts/SettingsContext';
import { KanaStatsContext } from '../contexts/KanaStatsContext';
import { useUpdateLayoutEffect } from '../utils/updateEffects';

// Needs to be constant to prevent slow performance from re-draws
const origin = { x: 0, y: -20 };

const QuizView = ({ optionsPool, answerItem, onCorrectAnswer, forceKanaSelection }) => {
  const { settings } = useContext(SettingsContext);
  const { kanaStats, setKanaStats } = useContext(KanaStatsContext);
  const [isUIDisabled, setIsUIDisabled] = useState(false);
  const confettiCannon = useRef(null);

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
    const newKanaStats = cloneDeep(kanaStats);
    const stat = newKanaStats[kanaData.kana];
    stat.totalFailures += fail ? 1 : 0;
    stat.totalViews++;
    if (stat.lastNAttempts.unshift(!fail) > 5) {
      stat.lastNAttempts.pop();
    }
    setKanaStats(newKanaStats);
  };

  useUpdateLayoutEffect(() => {
    setQuizOptions(getQuizOptions());
    setUseKanaSelection(getUseKanaSelection());
    setIsUIDisabled(false);
  }, [answerItem]);

  const onSelect = (selectedItem) => {
    if (selectedItem.kana === answerItem.kana) {
      if (settings.successAnimation) {
        confettiCannon.current.start();
      }
      setIsUIDisabled(true);
      setQuizStat(answerItem, false);
      onCorrectAnswer();
    } else {
      setQuizStat(selectedItem, true);
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
      {settings.successAnimation && (
        <ConfettiCannon
          ref={confettiCannon}
          autoStart={false}
          count={200}
          fadeOut
          explosionSpeed={250}
          fallSpeed={0}
          origin={origin}
        />
      )}
    </>
  );
};

export default QuizView;
