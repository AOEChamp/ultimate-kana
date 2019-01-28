import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';

import { KanaGrid } from '../components/KanaGrid';
import * as Kana from '../constants/Kana';
import { Audio } from 'expo';
import { QuizSettings } from '../constants/Settings';

export default class KanaReferenceGridScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);

        this.props.navigation.state.params = this.props.navigation.state.params || {};
        this.kanaGridType = this.props.navigation.state.params.gridType || Kana.KanaGridTypes.Hiragana;

        let kanaGridState = this.getGridStateForLayout(this.kanaGridType);

        this.state = {
            kanaGridState: kanaGridState,
            kanaFont: QuizSettings.kanaFont
        };
    }
    getGridStateForLayout = (gridType) => {
        var gridLayout;

        switch (gridType) {
            case Kana.KanaGridTypes.Hiragana:
                gridLayout = Kana.HiraganaGridLayout;
                break;
            case Kana.KanaGridTypes.Katakana:
                gridLayout = Kana.KatakanaGridLayout;
                break;
        }
        let kanaGridState = gridLayout.map(row => row.map(kana => (
            { kana: kana, selected: false }
        )));
        return kanaGridState;
    }
    playAudio = async (kanaKey) => {
        const soundObject = new Audio.Sound();

        try {
            await soundObject.loadAsync(Kana.KanaData[kanaKey].audio);
            await soundObject.playAsync();
        } catch (error) {
            console.log(error);
        }
    }
    handleKanaPress = (kanaItem) => {
        this.playAudio(kanaItem.kana);
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.kanaGridContainer} contentContainerStyle={styles.contentContainer}>
                    <KanaGrid gridState={this.state.kanaGridState} kanaFont={this.state.kanaFont} onKanaPress={this.handleKanaPress} />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    kanaGridContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingTop: 30,
    },
});
