import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { RoundedButtonBase } from '../components/RoundedButton';
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
                        <LessonButton onClick={this.navigateToLesson.bind(this, i)} key={i} text={title} subtext={subtitle} />
                    )}
                </ScrollView>
            </View>
        );
    }
}

const LessonButton = ({ text, subtext, onClick }) => (
    <RoundedButtonBase style={styles.buttonStyle} onClick={onClick}>
        <View style={styles.buttonLeft}>
            <Text style={styles.buttonText}>{text}</Text>
            <Text style={styles.buttonSubtext}>{subtext}</Text>
        </View>
        <Icon.Ionicons
            name="ios-arrow-forward"
            size={26}
            style={styles.buttonIconStyle}
            color="#fff"
        />
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
        fontSize: 24,
        marginTop: 20,
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
