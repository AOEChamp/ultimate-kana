import React, { useState, useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import { KanaGrid } from '../components/KanaGrid';
import * as Kana from '../constants/Kana';
import playAudio from '../utils/Audio';
import { SettingsContext } from '../contexts/SettingsContext';
import { KanaStatsContext } from '../contexts/KanaStatsContext';

const KanaReferenceGridScreen = ({ navigation }) => {
  const { kanaStats } = useContext(KanaStatsContext);
  const getGridStateForLayout = (gridType) => {
    let gridLayout;

    switch (gridType) {
      case Kana.KanaGridTypes.Hiragana:
        gridLayout = Kana.HiraganaGridLayout;
        break;
      case Kana.KanaGridTypes.Katakana:
        gridLayout = Kana.KatakanaGridLayout;
        break;
    }
    const kanaGridState = gridLayout.map((row) =>
      row.map((kana) => ({
        kana,
        selected: false,
        eng: kana === '' ? '' : Kana.KanaData[kana].eng,
        stats: kanaStats[kana],
      }))
    );
    return kanaGridState;
  };

  const [kanaGridType, setKanaGridType] = useState(
    navigation.state.params?.gridType || Kana.KanaGridTypes.Hiragana
  );
  const [kanaGridState, setKanaGridState] = useState(
    getGridStateForLayout(kanaGridType)
  );
  const gridTypeData = Object.keys(Kana.KanaGridTypes).map((gridType) => ({
    value: gridType,
  }));
  const { settings } = useContext(SettingsContext);

  const handleKanaPress = (kanaItem) => {
    playAudio(Kana.KanaData[kanaItem.kana]);
  };
  const handleDropdownChange = (value) => {
    if (kanaGridType !== value && Kana.KanaGridTypes[value]) {
      setKanaGridType(value);
      setKanaGridState(getGridStateForLayout(value));
    }
  };

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
      <ScrollView
        style={styles.kanaGridContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <KanaGrid
          gridState={kanaGridState}
          kanaFont={settings.kanaFont}
          onKanaPress={handleKanaPress}
        />
      </ScrollView>
    </View>
  );
};

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
