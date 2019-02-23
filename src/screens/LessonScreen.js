import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import _ from 'lodash';
import { RoundedButton, RoundedButtonBase } from '../components/RoundedButton';
import { KanaText } from '../components/KanaText';
import * as Kana from '../constants/Kana';
import { Icon } from 'expo';
import { QuizSettings, getLessonSetting, setLessonSetting, LessonSetting } from '../constants/Settings';
import ProgressBar from 'react-native-progress/Bar';
import { Audio } from 'expo';
import { QuizView } from '../components/QuizView';

const LessonState = {
    MEMORIZE: 1,
    QUIZ: 2,
    COMPLETE: 3
}

export default class LessonScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);

        this.lessonType = this.props.navigation.state.params.lessonType;
        this.lesson = this.props.navigation.state.params.lesson;
        this.lessonItems = this.lesson.kana;
        this.lessonSteps = this.lessonItems.length * 3;
        this.currentLessonStep = 0;
        this.currentLearnedIndex = 0;
        this.memorizeCounter = this.lessonItems.length > 3 ? 1 : this.lessonItems.length - 1;
        this.quizCounter = 1;

        this.state = {
            lessonState: LessonState.MEMORIZE,
            kanaFont: QuizSettings.kanaFont,
            currentItemIndex: 0,
            currentKanaItem: Kana.KanaData[this.lessonItems[0]],
            barProgress: 0,
            useKanaSelection: false
        };
        this.playAudio(this.state.currentKanaItem);
    }
    shuffleArray = (a) => {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
    getStateForQuizItem = (quizItemIndex) => {
        let currentKanaItem = Kana.KanaData[this.lessonItems[quizItemIndex]];
        let fullQuizPool = this.shuffleArray(this.lessonItems.slice(0, this.currentLearnedIndex + 1));
        let quizOptions = new Array(6);

        for (var i = 0; i < quizOptions.length; i++) {
            quizOptions[i] = { ignore: true };
        }

        quizOptions[Math.floor(Math.random() * quizOptions.length)] = currentKanaItem;
        for (var i = 0; i < Math.min(quizOptions.length - 1, fullQuizPool.length); i++) {
            const item = Kana.KanaData[fullQuizPool[i]];
            if (item === currentKanaItem)
                continue;
            let j;
            do {
                j = Math.floor(Math.random() * quizOptions.length);
            } while (quizOptions[j].kana)

            quizOptions[j] = item;
        }
        return {
            quizOptions: _.cloneDeep(quizOptions),
            currentKanaItem: currentKanaItem,
        };
    }
    saveLesson = async () => {
        let lessonSetting = await getLessonSetting(this.lesson.subtitle);

        if (lessonSetting === null) {
            lessonSetting = new LessonSetting(true, 1);
        } else {
            lessonSetting.completed = true;
            lessonSetting.attempts++;
        }

        setLessonSetting(this.lesson.subtitle, lessonSetting);
    }
    showNextItem = () => {
        this.currentLessonStep++;

        if (this.currentLessonStep === this.lessonSteps) {
            this.saveLesson();

            this.setState({
                lessonState: LessonState.COMPLETE,
                barProgress: 100
            });
            return;
        }

        let lessonState = this.state.lessonState;
        let currentItemIndex = this.state.currentItemIndex;

        if (this.currentLessonStep === this.lessonSteps / 3 * 2) {
            this.quizCounter = this.lessonItems.length;
            currentItemIndex = -1;
        } else if (lessonState === LessonState.MEMORIZE
            && this.memorizeCounter == 0) {
            lessonState = LessonState.QUIZ;
            currentItemIndex -= this.quizCounter;
        } else if (lessonState == LessonState.QUIZ
            && this.quizCounter == 0) {
            lessonState = LessonState.MEMORIZE;
            this.memorizeCounter += this.lessonItems.length - currentItemIndex == 4 ? 3 : 2;
        }

        if (lessonState === LessonState.MEMORIZE) {
            this.memorizeCounter--;
            this.quizCounter++;
            currentItemIndex++;
            this.currentLearnedIndex = currentItemIndex;

            console.log("memorize, idx: " + currentItemIndex)
            let currentKanaItem = Kana.KanaData[this.lessonItems[currentItemIndex]];
            this.setState({
                currentItemIndex: currentItemIndex,
                currentKanaItem: currentKanaItem,
                barProgress: this.currentLessonStep / this.lessonSteps,
                lessonState: LessonState.MEMORIZE
            });
            this.playAudio(currentKanaItem);
        } else {
            this.quizCounter--;
            currentItemIndex++;
            console.log("quiz, idx: " + currentItemIndex);
            let state = this.getStateForQuizItem(currentItemIndex);
            this.setState({
                ...state,
                currentItemIndex: currentItemIndex,
                barProgress: this.currentLessonStep / this.lessonSteps,
                lessonState: LessonState.QUIZ,
                lockUntilNextQuiz: false,
                useKanaSelection: this.currentLessonStep >= this.lessonSteps / 3 * 2
            });
        }
    }
    playCurrentSound = () => {
        this.playAudio(this.state.currentKanaItem);
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
    handleAnswerSelected = (kanaData) => {
        if (this.state.lockUntilNextQuiz) {
            return;
        }

        var quizOptions = this.state.quizOptions;
        var idx = quizOptions.indexOf(kanaData);

        if (QuizSettings.audioOnQuizAnswer) {
            this.playAudio(kanaData);
        }

        if (kanaData.kana === this.state.currentKanaItem.kana) {
            quizOptions[idx].success = true;
            this.setState({
                quizOptions: quizOptions,
                lockUntilNextQuiz: true
            });
            setTimeout(() => this.showNextItem(), 1000);
        } else if (idx != -1) {
            quizOptions[idx].fail = true;
            this.setState({ quizOptions: quizOptions });
        }
    }
    endLesson = () => {
        this.props.navigation.pop();
    }
    render() {
        let content;
        if (this.state.lessonState == LessonState.COMPLETE) {
            content = (
                <View style={styles.contentContainer}>
                    <View style={styles.lessonCompleteView}>
                        <Text style={styles.titleText}>Lesson complete!</Text>
                    </View>
                    <RoundedButton onClick={this.endLesson} style={styles.nextButtonStyle} title="Finish" />
                </View>
            );
        } else if (this.state.lessonState == LessonState.QUIZ) {
            content = (
                <View style={styles.quizView}>
                    <Text style={styles.subtitleText}>Choose the correct sound...</Text>
                    <QuizView style={styles.quizView}
                        kanaFont={this.state.kanaFont}
                        useKanaSelection={this.state.useKanaSelection}
                        onKanaPress={this.handleAnswerSelected}
                        quizOptions={this.state.quizOptions}
                        quizQuestion={this.state.currentKanaItem} />
                </View>
            );
        } else {
            content = (
                <View style={styles.contentContainer}>
                    {/* <Text style={styles.titleText}>{this.lessonType} {this.lesson.title}</Text> */}
                    <Text style={styles.subtitleText}>Memorize the following...</Text>
                    <View style={styles.lessonLearnView}>
                        <View style={styles.kanaDisplayContainer}>
                            <KanaText fontSize={150} kanaFont={this.state.kanaFont}>
                                {this.state.currentKanaItem.kana}
                            </KanaText>

                            <KanaText fontSize={100} kanaFont={this.state.kanaFont}>
                                {this.state.currentKanaItem.eng}
                            </KanaText>
                            <RoundedButtonBase style={styles.soundButton} onClick={this.playCurrentSound}>
                                <Icon.Ionicons
                                    name="md-volume-high"
                                    size={26}
                                    color="#fff"
                                />
                            </RoundedButtonBase>
                        </View>
                        <RoundedButton onClick={this.showNextItem} style={styles.nextButtonStyle} title="Next" />
                    </View>
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <View style={styles.progressView}>
                    <ProgressBar progress={this.state.barProgress} width={null} color="#00BCD4" borderRadius={30} height={20} />
                </View>
                {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    soundButton: {
        alignSelf: 'center'
    },
    kanaDisplayContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    progressView: {
        margin: 20
    },
    lessonCompleteView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nextButtonStyle: {
        marginBottom: 20,
    },
    titleText: {
        fontSize: 24,
    },
    subtitleText: {
        fontSize: 16,
        marginTop: 5,
        marginBottom: 20,
        marginLeft: 20
    },
    lessonLearnView: {
        flex: 1,
        flexDirection: 'column',
    },
    contentContainer: {
        marginRight: 20,
        marginLeft: 20,
        flex: 1,
        flexDirection: 'column',
    },
    quizView: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
