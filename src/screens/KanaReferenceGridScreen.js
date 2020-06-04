import React, { useState, useContext } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';

import { KanaGrid } from '../components/KanaGrid';
import * as Kana from '../constants/Kana';
import { Audio } from 'expo-av';
import { SettingsContext }  from '../contexts/SettingsContext';
import { Dropdown } from 'react-native-material-dropdown';

const KanaReferenceGridScreen = ({navigation}) => {
    const getGridStateForLayout = (gridType) => {
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
            { kana: kana, selected: false, eng: kana === '' ? '' : Kana.KanaData[kana].eng }
        )));
        return kanaGridState;
    }

    const [kanaGridType, setKanaGridType] = useState(navigation.state.params?.gridType || Kana.KanaGridTypes.Hiragana);
    const [kanaGridState, setKanaGridState] = useState(getGridStateForLayout(kanaGridType));
    const gridTypeData = Object.keys(Kana.KanaGridTypes).map((gridType) => ({ value: gridType }));
    const { settings } = useContext(SettingsContext);
    console.log("font:"+settings.kanaFont);

    const playAudio = async (kanaKey) => {
        const soundObject = new Audio.Sound();

        try {
            await soundObject.loadAsync(Kana.KanaData[kanaKey].audio);
            await soundObject.playAsync();
        } catch (error) {
            console.log(error);
        }
    }
    const handleKanaPress = (kanaItem) => {
        playAudio(kanaItem.kana);
    }
    const handleDropdownChange = (value) => {
        if (kanaGridType !== value && Kana.KanaGridTypes[value]) {
            setKanaGridType(value);
            setKanaGridState(getGridStateForLayout(value));
        }
    }

    return (
        <View style={styles.container}>
            <Dropdown
                labelFontSize={0}
                dropdownPosition={-2}
                data={gridTypeData}
                value={kanaGridType}
                containerStyle={styles.dropdownStyle}
                onChangeText={handleDropdownChange}
            />
            <ScrollView style={styles.kanaGridContainer} contentContainerStyle={styles.contentContainer}>
                <KanaGrid gridState={kanaGridState} kanaFont={settings.kanaFont} onKanaPress={handleKanaPress} />
            </ScrollView>
        </View>
    );
}

KanaReferenceGridScreen.navigationOptions = {
    headerShown: false,
};

export default KanaReferenceGridScreen;

const styles = StyleSheet.create({
    dropdownStyle: {
        marginRight: 20,
        marginLeft: 20,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    kanaGridContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        // paddingTop: 30,
    },
});
