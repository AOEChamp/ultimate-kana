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

export default class QuizScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);

        this.kanaSet = this.props.navigation.state.params.kanaSet;
        this.state = this.getNewQuizItem();
    }
    handleAnswerSelected = (kanaData) => {
        var quizOptions = this.state.quizOptions;
        var idx = quizOptions.indexOf(kanaData);

        if (kanaData.kana === this.state.currentQuizItem.kana) {
            this.showNewQuizItem();
        } else if (idx != -1) {
            quizOptions[idx].fail = true;
            this.setState({ quizOptions: quizOptions });
        }
    }
    getNewQuizItem = () => {
        const currentQuizItem = Kana.KanaData[this.kanaSet[Math.floor(Math.random() * this.kanaSet.length)]];
        var quizOptions = new Array(this.kanaSet.length >= 6 ? 6 : this.kanaSet.length);
        quizOptions[Math.floor(Math.random() * quizOptions.length)] = currentQuizItem;
        for (var i = 0; i < quizOptions.length; i++) {
            while (quizOptions[i] !== currentQuizItem) {
                const randomItem = Kana.KanaData[this.kanaSet[Math.floor(Math.random() * this.kanaSet.length)]];
                if (randomItem != currentQuizItem
                    && !quizOptions.includes(randomItem)) {
                    quizOptions[i] = randomItem;
                    break;
                }
            }
        }
        var useKanaSelection = QuizSettings.enableKanaSelectionDrills;
        if (useKanaSelection && QuizSettings.enableRomajiSelectionDrills) {
            useKanaSelection = Math.random() >= 0.5;
        }
        return {
            currentQuizItem: currentQuizItem,
            quizOptions: _.cloneDeep(quizOptions),
            useKanaSelection: useKanaSelection
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
                        <KanaText>{this.state.useKanaSelection ? this.state.currentQuizItem.eng : this.state.currentQuizItem.kana}</KanaText>
                    </View>
                </View>
                <View style={styles.quizOptionsView}>
                    <KanaQuizRow useKanaSelection={this.state.useKanaSelection} onKanaPress={this.handleAnswerSelected} options={this.state.quizOptions.slice(0, 3)} />
                    <KanaQuizRow useKanaSelection={this.state.useKanaSelection} onKanaPress={this.handleAnswerSelected} options={this.state.quizOptions.slice(3, 6)} />
                </View>
            </View>
        )
    }
};

const KanaQuizRow = props => (
    <View style={styles.kanaRow}>
        {
            props.options.map((kanaData, i) =>
                <KanaBlock onPress={props.onKanaPress.bind(this, kanaData)} selectColor="#f00" key={i} selected={kanaData.fail}>{props.useKanaSelection ? kanaData.kana : kanaData.eng}</KanaBlock>
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