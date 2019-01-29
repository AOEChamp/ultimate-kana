import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { RoundedButton } from '../components/RoundedButton';
import { KanaText } from '../components/KanaText';
import * as Kana from '../constants/Kana';
import { QuizSettings } from '../constants/Settings';
import ProgressBar from 'react-native-progress/Bar';
import { Audio } from 'expo';

export default class LessonScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);

        this.lessonType = this.props.navigation.state.params.lessonType;
        this.lesson = this.props.navigation.state.params.lesson;
        this.lessonItems = this.lesson.kana;

        this.state = {
            kanaFont: QuizSettings.kanaFont,
            currentItemIndex: 0,
            currentKanaItem: Kana.KanaData[this.lessonItems[0]],
            progress: 0,
            maxProgress: this.lesson.length
        };
        this.playAudio(this.state.currentKanaItem);
    }
    showNextItem = () => {
        let currentItemIndex = this.state.currentItemIndex + 1;
        let progress = currentItemIndex / this.lessonItems.length;

        if (currentItemIndex < this.lessonItems.length) {
            let currentKanaItem = Kana.KanaData[this.lessonItems[currentItemIndex]];
            this.setState({
                currentItemIndex: currentItemIndex,
                currentKanaItem: currentKanaItem,
                progress: progress
            });
            this.playAudio(currentKanaItem);
        } else {
            this.setState({
                lessonComplete: true,
                progress: 100
            });
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
    endLesson = () => {
        this.props.navigation.pop();
    }
    render() {
        let content;
        if (this.state.lessonComplete) {
            content = (
                <View style={styles.contentContainer}>
                    <View style={styles.lessonCompleteView}>
                        <Text style={styles.titleText}>Lesson complete!</Text>
                    </View>
                    <RoundedButton onClick={this.endLesson} style={styles.nextButtonStyle}>
                        <Text style={styles.buttonText}>Finish</Text>
                    </RoundedButton>
                </View>
            );
        } else {
            content = (
                <View style={styles.contentContainer}>
                    <Text style={styles.titleText}>{this.lessonType} {this.lesson.title}</Text>
                    <Text style={styles.subtitleText}>Memorize the following...</Text>
                    <View style={styles.contentContainer}>
                        <View style={styles.kanaDisplayContainer}>
                            <KanaText fontSize={150} kanaFont={this.state.kanaFont}>
                                {this.state.currentKanaItem.kana}
                            </KanaText>
                            <KanaText fontSize={100} kanaFont={this.state.kanaFont}>
                                {this.state.currentKanaItem.eng}
                            </KanaText>
                        </View>
                        <RoundedButton onClick={this.showNextItem} style={styles.nextButtonStyle} title="Next" />
                    </View>
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <View style={styles.progressView}>
                    <ProgressBar progress={this.state.progress} width={null} color="#00BCD4" borderRadius={30} height={20} />
                </View>
                {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    kanaDisplayContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    progressView: {
        marginTop: 20,
        marginBottom: 20
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
        marginBottom: 20
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
});
