import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import { KanaBlock } from '../components/KanaBlock';
import { KanaText } from '../components/KanaText';

export const QuizView = ({ kanaFont, useKanaSelection, onKanaPress, quizOptions, quizQuestion, style }) => (
    <View style={style}>
        <View style={styles.displayKanaView}>
            <View style={styles.quizQuestionView}>
                <KanaText fontSize={100} kanaFont={kanaFont}>{useKanaSelection ? quizQuestion.eng : quizQuestion.kana}</KanaText>
            </View>
        </View>
        <View style={styles.quizOptionsView}>
            <KanaQuizRow kanaFont={kanaFont} useKanaSelection={useKanaSelection} onKanaPress={onKanaPress}
                options={quizOptions.slice(0, 3)} />
            <KanaQuizRow kanaFont={kanaFont} useKanaSelection={useKanaSelection} onKanaPress={onKanaPress}
                options={quizOptions.slice(3, 6)} />
        </View>
    </View>
);

const KanaQuizRow = props => (
    <View style={styles.kanaRow}>
        {
            props.options.map((kanaData, i) =>
                <KanaBlock fontSize={60} style={styles.kanaBlock} kanaFont={props.kanaFont}
                    onPress={props.onKanaPress.bind(this, kanaData)}
                    selectColor={kanaData.fail ? "#f00" : "#0f0"} key={i}
                    selected={kanaData.fail || kanaData.success}>
                    {props.useKanaSelection ? kanaData.kana : kanaData.eng}
                </KanaBlock>
            )
        }
    </View>
);

const styles = StyleSheet.create({
    quizOptionsView: {
        flex: 1,
        width: "100%",
    },
    kanaRow: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 5,
        marginRight: 5
    },
    kanaBlock: {
        aspectRatio: 1,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#000',
    },
    quizQuestionView: {
        flex: 1,
        margin: '25%',
    },
    displayKanaView: {
        flex: 1,
    },
});
