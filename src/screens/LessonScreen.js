import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { RoundedButton } from '../components/RoundedButton';
import { Icon } from 'expo';
import { KanaText } from '../components/KanaText';
import * as Kana from '../constants/Kana';
import { QuizSettings } from '../constants/Settings';

export default class LessonScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);

        this.lesson = this.props.navigation.state.params.lesson;
        this.lessonItems = this.lesson.kana;

        this.state = {
            kanaFont: QuizSettings.kanaFont,
            currentItemIndex: 0,
            currentKanaItem: Kana.KanaData[this.lessonItems[0]]
        };
    }
    showNextItem = () => {
        let currentItemIndex = this.state.currentItemIndex + 1;

        if (currentItemIndex < this.lessonItems.length) {
            this.setState({
                currentItemIndex: currentItemIndex,
                currentKanaItem: Kana.KanaData[this.lessonItems[currentItemIndex]]
            });
        } else {
            this.setState({ lessonComplete: true });
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
                    <Text style={styles.titleText}>Hiragana {this.lesson.title}</Text>
                    <Text style={styles.subtitleText}>Memorize the following...</Text>
                    <View style={styles.contentContainer}>
                        <KanaText fontSize={100} kanaFont={this.state.kanaFont}>
                            {this.state.currentKanaItem.kana}
                        </KanaText>
                        <KanaText fontSize={100} kanaFont={this.state.kanaFont}>
                            {this.state.currentKanaItem.eng}
                        </KanaText>
                        <RoundedButton onClick={this.showNextItem} style={styles.nextButtonStyle}>
                            <Text style={styles.buttonText}>Next</Text>
                        </RoundedButton>
                    </View>
                </View>
            );
        }
        return (
            <View style={styles.container}>
                {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    lessonCompleteView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nextButtonStyle: {
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 24,
        color: '#fff',
        textAlign: 'center',
    },
    titleText: {
        fontSize: 24,
        marginTop: 20,
        marginLeft: 20
    },
    subtitleText: {
        fontSize: 16,
        marginTop: 5,
        marginLeft: 20
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
