import React from 'react';
import _ from 'lodash';
import {
    StyleSheet,
    View,
} from 'react-native';

import { KanaBlock } from '../components/KanaBlock';
import { KanaText } from '../components/KanaText';
import * as Kana from '../constants/Kana';
import { QuizSettings } from '../constants/Settings';
import { JapaneseFonts } from '../constants/Fonts';
import { Audio } from 'expo';

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
            setTimeout(() => this.showNewQuizItem(), 1000);
        } else if (idx != -1) {
            quizOptions[idx].fail = true;
            this.setState({ quizOptions: quizOptions });
        }
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
            const fontNames = Object.keys(JapaneseFonts);
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
            <View style={styles.container}>
                <View style={styles.displayKanaView}>
                    <View style={styles.tmp}>
                        <KanaText kanaFont={this.state.kanaFont}>{this.state.useKanaSelection ? this.state.currentQuizItem.eng : this.state.currentQuizItem.kana}</KanaText>
                    </View>
                </View>
                <View style={styles.quizOptionsView}>
                    <KanaQuizRow kanaFont={this.state.kanaFont} useKanaSelection={this.state.useKanaSelection} onKanaPress={this.handleAnswerSelected} options={this.state.quizOptions.slice(0, 3)} />
                    <KanaQuizRow kanaFont={this.state.kanaFont} useKanaSelection={this.state.useKanaSelection} onKanaPress={this.handleAnswerSelected} options={this.state.quizOptions.slice(3, 6)} />
                </View>
            </View>
        )
    }
};

const KanaQuizRow = props => (
    <View style={styles.kanaRow}>
        {
            props.options.map((kanaData, i) =>
                <KanaBlock kanaFont={props.kanaFont} onPress={props.onKanaPress.bind(this, kanaData)} selectColor={kanaData.fail ? "#f00" : "#0f0"} key={i} selected={kanaData.fail || kanaData.success}>{props.useKanaSelection ? kanaData.kana : kanaData.eng}</KanaBlock>
            )
        }
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // aspectRatio: 1,
        alignItems: "center",
        backgroundColor: '#fff',
    },
    quizOptionsView: {
        flex: 1,
        width: "100%",
        // aspectRatio: 1,
        // backgroundColor: '#0f0',
    },
    kanaRow: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 5,
        marginRight: 5
    },
    tmp: {
        flex: 1,
        margin: '25%',
    },
    displayKanaView: {
        flex: 1,
        aspectRatio: 1,
    },
});