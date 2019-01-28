import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button
} from 'react-native';
import { RoundedButton } from '../components/RoundedButton';
import { Icon } from 'expo';
import { HiraganaLessons } from '../constants/Kana';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>Hiragana Lessons</Text>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    {HiraganaLessons.map(({ title, subtitle }, i) =>
                        <LessonButton key={i} text={title} subtext={subtitle} />
                    )}
                </ScrollView>
            </View>
        );
    }
}

const LessonButton = ({ text, subtext, onClick }) => (
    <RoundedButton style={styles.buttonStyle} onClick={onClick}>
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
    </RoundedButton>
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
