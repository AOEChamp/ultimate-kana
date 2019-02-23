import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { RoundedButtonBase } from '../components/RoundedButton';
import { getAllLessonSettings } from '../constants/Settings';
import { Icon } from 'expo';
import * as Kana from '../constants/Kana';

export default class LessonSelectScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);

        this.lessonType = this.props.navigation.state.params.lessonType;

        switch (this.lessonType) {
            case Kana.KanaGridTypes.Hiragana:
                this.lessonsSet = Kana.HiraganaLessons;
                break;
            case Kana.KanaGridTypes.Katakana:
                this.lessonsSet = Kana.KatakanaLessons;
                break;
        }

        this.state = { disabledIndex: this.lessonsSet.length };
        this.init();
    }
    init = async () => {
        let lessonSettings = await getAllLessonSettings(this.lessonsSet.map(lesson => lesson.subtitle));
        console.log(lessonSettings);

        let disabledIndex = 1;
        for (let i = 0; i < lessonSettings.length; i++) {
            if (!lessonSettings[i]) {
                disabledIndex = i + 1;
                break;
            }
        }

        this.setState({
            lessonSettings: lessonSettings,
            disabledIndex: disabledIndex
        });
    }
    isLessonCompleted = (index) => {
        if (this.state.lessonSettings &&
            this.state.lessonSettings[index]) {
            return this.state.lessonSettings[index].completed;
        }
        return false;
    }
    navigateToLesson = (index) => {
        this.props.navigation.navigate('LessonScreen', { lesson: this.lessonsSet[index], lessonType: this.lessonType });
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>{this.lessonType} Lessons</Text>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    {this.lessonsSet.map(({ title, subtitle }, i) =>
                        <LessonButton onClick={this.navigateToLesson.bind(this, i)} key={i} text={title} subtext={subtitle}
                            completed={this.isLessonCompleted(i)} disabled={i >= this.state.disabledIndex} />
                    )}
                </ScrollView>
            </View>
        );
    }
}

const LessonButton = ({ text, subtext, onClick, completed, disabled }) => (
    <RoundedButtonBase onClick={onClick}
        style={[styles.buttonStyle, completed ? { backgroundColor: "#009eb3" } : disabled ? { backgroundColor: "#ccc" } : {}]}>
        <View style={styles.buttonLeft}>
            <Text style={styles.buttonText}>{text}</Text>
            <Text style={styles.buttonSubtext}>{subtext}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
            {completed &&
                <Icon.Ionicons
                    name="md-checkmark-circle-outline"
                    size={26}
                    style={styles.buttonIconStyle}
                    color="#0f0"
                />}
            <Icon.Ionicons
                name="ios-arrow-forward"
                size={26}
                style={styles.buttonIconStyle}
                color="#fff"
            />
        </View>
    </RoundedButtonBase>
);

const styles = StyleSheet.create({
    buttonStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    buttonLeft: {
        marginLeft: 20,
    },
    titleText: {
        fontWeight: "bold",
        fontSize: 35,
        marginTop: 40,
        marginLeft: 20
    },
    contentContainer: {
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20,
        paddingBottom: 20
    },
    buttonIconStyle: {
        marginRight: 20,
    },
    buttonText: {
        fontSize: 24,
        color: '#fff',
    },
    buttonSubtext: {
        fontSize: 16,
        color: '#fff',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
