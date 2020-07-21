import React, { useState, useContext } from 'react';
import _ from 'lodash';
import {
    StyleSheet,
} from 'react-native';

import * as Kana from '../constants/Kana';
import { QuizView } from '../components/QuizView';
import { SettingsContext } from '../contexts/SettingsContext';
import { LessonHistoryContext } from '../contexts/LessonHistoryContext';
import { KanaStatsContext } from '../contexts/KanaStatsContext';

const ReviewScreen = () => {
    const { settings } = useContext(SettingsContext);
    const { lessonHistory } = useContext(LessonHistoryContext);
    const [isUILocked, setIsUILocked] = useState(false);
    const getFullQuizPool = () => {
        return [...Kana.HiraganaLessons, ...Kana.KatakanaLessons]
            .filter(lesson => lessonHistory[lesson.id].completed)
            .flatMap(lesson => lesson.kana);
    }
    const [fullQuizPool] = useState(getFullQuizPool());
    const [currentQuizPool, setCurrentQuizPool] = useState(fullQuizPool);
    const getRandomItem = () => {
        const idx = Math.floor(Math.random() * currentQuizPool.length);
        return Kana.KanaData[currentQuizPool[idx]];
    }
    const [currentQuizItem, setCurrentQuizItem] = useState(getRandomItem());
    const getQuizOptions = (currItem) => {
        const quizOptions = new Array(fullQuizPool.length >= 6 ? 6 : fullQuizPool.length);
        quizOptions[Math.floor(Math.random() * quizOptions.length)] = currItem;
        for (let i = 0; i < quizOptions.length; i++) {
            while (quizOptions[i] !== currItem) {
                const randomItem = Kana.KanaData[fullQuizPool[Math.floor(Math.random() * fullQuizPool.length)]];
                if (randomItem != currItem
                    && !quizOptions.includes(randomItem)) {
                    quizOptions[i] = randomItem;
                    break;
                }
            }
        }
        return quizOptions;
    }
    const [currentQuizOptions, setCurrentQuizOptions] = useState(getQuizOptions(currentQuizItem));

    const showNewQuizItem = () => {
        const newCurrItem = getRandomItem();
        if (currentQuizPool.length == 1) {
            setCurrentQuizPool(fullQuizPool)
        } else {
            setCurrentQuizPool(currentQuizPool.filter(kanaKey => kanaKey != newCurrItem.kana));
        }
        setCurrentQuizItem(newCurrItem);
        setCurrentQuizOptions(getQuizOptions(newCurrItem));
        setIsUILocked(false);
    }
    const onAnswerSelected = (kanaData) => {
        if(isUILocked) {
            return;
        }
        const quizOptions = _.cloneDeep(currentQuizOptions);
        const idx = currentQuizOptions.indexOf(kanaData);
        if (kanaData.kana === currentQuizItem.kana) {
            quizOptions[idx].success = true;
            setCurrentQuizOptions(quizOptions);
            setIsUILocked(true);
            // this.setQuizStat(kanaStats, setKanaStats, kanaData, false);
            setTimeout(() => showNewQuizItem(), 1000);
        } else if (idx != -1) {
            quizOptions[idx].fail = true;
            setCurrentQuizOptions(quizOptions);
            // this.setQuizStat(kanaStats, setKanaStats, kanaData, true);
        }
    }
    return (
        <QuizView style={styles.container}
            useKanaSelection={false}
            onKanaPress={onAnswerSelected}
            quizOptions={currentQuizOptions}
            quizQuestion={currentQuizItem}
        />
    );
}

ReviewScreen.navigationOptions = {
    headerShown: false,
};

export default ReviewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: '#fff',
    },
});
