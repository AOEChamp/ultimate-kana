import React from 'react';
import _ from 'lodash';
import {
    StyleSheet,
} from 'react-native';

import * as Kana from '../constants/Kana';
import { FontList } from '../constants/Fonts';
import { Audio } from 'expo-av';
import { QuizView } from '../components/QuizView';
import { SettingsContext } from '../contexts/SettingsContext';
import { KanaStatsContext } from '../contexts/KanaStatsContext';

class QuizScreen extends React.Component {
    static navigationOptions = {
        headerShown: false,
    };
    constructor(props) {
        super(props);

        this.fullQuizPool = _.cloneDeep(this.props.navigation.state.params.kanaSet);
        this.resetQuizPool();
    }
    componentWillMount() {
        this.showNewQuizItem();
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
    handleAnswerSelected = (kanaStats, setKanaStats, kanaData) => {
        if (this.state.lockUntilNextQuiz) {
            return;
        }

        var quizOptions = this.state.quizOptions;
        var idx = quizOptions.indexOf(kanaData);

        if (this.context.settings.audioOnQuizAnswer) {
            this.playAudio(kanaData);
        }

        if (kanaData.kana === this.state.currentQuizItem.kana) {
            quizOptions[idx].success = true;
            this.setState({
                quizOptions: quizOptions,
                lockUntilNextQuiz: true
            });
            this.setQuizStat(kanaStats, setKanaStats, kanaData, false);
            setTimeout(() => this.showNewQuizItem(), 1000);
        } else if (idx != -1) {
            quizOptions[idx].fail = true;
            this.setState({ quizOptions: quizOptions });
            this.setQuizStat(kanaStats, setKanaStats, kanaData, true);
        }
    }
    setQuizStat = (kanaStats, setKanaStats, kanaData, fail) => {
        let newKanaStats = _.cloneDeep(kanaStats);
        let stat = newKanaStats[kanaData.kana];
        stat.totalFailures += fail ? 1 : 0;
        stat.totalViews++;
        if(stat.lastNAttempts.unshift(fail ? false : true) > 5) {
            stat.lastNAttempts.pop();
        }
        setKanaStats(newKanaStats);
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

        if (this.context.settings.audioOnQuizDisplay) {
            this.playAudio(currentQuizItem);
        }

        var useKanaSelection = this.context.settings.enableKanaSelectionDrills;
        if (useKanaSelection && this.context.settings.enableRomajiSelectionDrills) {
            useKanaSelection = Math.random() >= 0.5;
        }

        return {
            currentQuizItem: currentQuizItem,
            quizOptions: _.cloneDeep(quizOptions),
            useKanaSelection: useKanaSelection,
            lockUntilNextQuiz: false,
        };
    }
    showNewQuizItem = () => {
        this.setState(this.getNewQuizItem());
    }
    getFont = () => {
        let kanaFont = this.context.settings.kanaFont;
        if (this.context.settings.randomizeKanaFont) {
            const fontNames = Object.keys(FontList);
            const fontIdx = Math.floor(Math.random() * (fontNames.length - 1));
            kanaFont = fontNames[fontIdx];
        }
        return kanaFont;
    }
    render() {
        return (
            <KanaStatsContext.Consumer>
                {({kanaStats, setKanaStats}) => (
                    <QuizView style={styles.container}
                        kanaFont={this.getFont()}
                        useKanaSelection={this.state.useKanaSelection}
                        onKanaPress={this.handleAnswerSelected.bind(this, kanaStats, setKanaStats)}
                        quizOptions={this.state.quizOptions}
                        quizQuestion={this.state.currentQuizItem} />
                )}
            </KanaStatsContext.Consumer>
        )
    }
};

QuizScreen.contextType = SettingsContext;

export default QuizScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: '#fff',
    },
});
