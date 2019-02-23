import React from 'react';
import _ from 'lodash';
import {
    StyleSheet,
} from 'react-native';

import * as Kana from '../constants/Kana';
import { QuizSettings, getItem, setItem, SettingKeys } from '../constants/Settings';
import { FontList } from '../constants/Fonts';
import { Audio } from 'expo';
import { QuizView } from '../components/QuizView';

export default class QuizScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);

        this.fullQuizPool = _.cloneDeep(this.props.navigation.state.params.kanaSet);
        this.resetQuizPool();
        this.state = this.getNewQuizItem();
    }
    resetQuizPool = () => {
        this.currentQuizPool = _.cloneDeep(this.fullQuizPool);
    }
    pickQuizItemFromPool = () => {
        if (this.currentQuizPool.length == 0) {
            this.resetQuizPool();
        }
        const idx = Math.floor(Math.random() * this.currentQuizPool.length);
        const currentQuizItem = Kana.KanaData[this.currentQuizPool.splice(idx, 1)];
        return currentQuizItem;
    }
    handleAnswerSelected = (kanaData) => {
        if (this.state.lockUntilNextQuiz) {
            return;
        }

        var quizOptions = this.state.quizOptions;
        var idx = quizOptions.indexOf(kanaData);

        if (QuizSettings.audioOnQuizAnswer) {
            this.playAudio(kanaData);
        }

        if (kanaData.kana === this.state.currentQuizItem.kana) {
            quizOptions[idx].success = true;
            this.setState({
                quizOptions: quizOptions,
                lockUntilNextQuiz: true
            });
            this.setQuizStat(kanaData, false);
            setTimeout(() => this.showNewQuizItem(), 1000);
        } else if (idx != -1) {
            quizOptions[idx].fail = true;
            this.setState({ quizOptions: quizOptions });
            this.setQuizStat(kanaData, true);
        }
    }
    setQuizStat = async (kanaData, fail) => {
        if(!this.kanaStats) {
            this.kanaStats = await getItem(SettingKeys.KanaGridStats);
        }

        let stat = this.kanaStats[kanaData.kana];
        stat.totalFailures += fail ? 1 : 0;
        stat.totalViews++;
        if(stat.lastNAttempts.unshift(fail ? false : true) > 5) {
            stat.lastNAttempts.pop();
        }
        
        setItem(SettingKeys.KanaGridStats, this.kanaStats);
    }
    playAudio = async (kanaData) => {
        const soundObject = new Audio.Sound();

        try {
            await soundObject.loadAsync(kanaData.audio);
            await soundObject.playAsync();
        } catch (error) {
            console.log(error);
        }
    }
    getNewQuizItem = () => {
        const currentQuizItem = this.pickQuizItemFromPool();

        var quizOptions = new Array(this.fullQuizPool.length >= 6 ? 6 : this.fullQuizPool.length);
        quizOptions[Math.floor(Math.random() * quizOptions.length)] = currentQuizItem;
        for (var i = 0; i < quizOptions.length; i++) {
            while (quizOptions[i] !== currentQuizItem) {
                const randomItem = Kana.KanaData[this.fullQuizPool[Math.floor(Math.random() * this.fullQuizPool.length)]];
                if (randomItem != currentQuizItem
                    && !quizOptions.includes(randomItem)) {
                    quizOptions[i] = randomItem;
                    break;
                }
            }
        }

        if (QuizSettings.audioOnQuizDisplay) {
            this.playAudio(currentQuizItem);
        }

        var useKanaSelection = QuizSettings.enableKanaSelectionDrills;
        if (useKanaSelection && QuizSettings.enableRomajiSelectionDrills) {
            useKanaSelection = Math.random() >= 0.5;
        }

        var kanaFont = QuizSettings.kanaFont;
        if (QuizSettings.randomizeKanaFont) {
            const fontNames = Object.keys(FontList);
            const fontIdx = Math.floor(Math.random() * (fontNames.length - 1));
            kanaFont = fontNames[fontIdx];
        }

        return {
            currentQuizItem: currentQuizItem,
            quizOptions: _.cloneDeep(quizOptions),
            useKanaSelection: useKanaSelection,
            lockUntilNextQuiz: false,
            kanaFont: kanaFont,
        };
    }
    showNewQuizItem = () => {
        this.setState(this.getNewQuizItem());
    }
    render() {
        return (
            <QuizView style={styles.container}
                kanaFont={this.state.kanaFont}
                useKanaSelection={this.state.useKanaSelection}
                onKanaPress={this.handleAnswerSelected}
                quizOptions={this.state.quizOptions}
                quizQuestion={this.state.currentQuizItem} />
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: '#fff',
    },
});
