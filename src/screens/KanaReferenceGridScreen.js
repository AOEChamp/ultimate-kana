import React, { useState, useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import KanaSwitchSelector from '../components/KanaSwitchSelector';
import KanaGrid from '../components/KanaGrid';
import * as Kana from '../constants/Kana';
import playAudio from '../utils/Audio';
import { SettingsContext } from '../contexts/SettingsContext';
import { KanaStatsContext } from '../contexts/KanaStatsContext';

const KanaReferenceGridScreen = () => {
  const { kanaStats } = useContext(KanaStatsContext);
  const getGridStateForLayout = (gridType) => {
    const gridLayout =
      gridType === Kana.KanaGridTypes.Hiragana ? Kana.HiraganaGridLayout : Kana.KatakanaGridLayout;

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

  const [kanaGridType, setKanaGridType] = useState(Kana.KanaGridTypes.Hiragana);
  const [kanaGridState, setKanaGridState] = useState(() => getGridStateForLayout(kanaGridType));
  const { settings } = useContext(SettingsContext);

  const handleKanaPress = (kanaItem) => {
    playAudio(Kana.KanaData[kanaItem.kana]);
  };
  const changeGridType = (value) => {
    if (kanaGridType !== value) {
      setKanaGridType(value);
      setKanaGridState(getGridStateForLayout(value));
    }
  };

  return (
    <View style={styles.container}>
      <KanaSwitchSelector
        style={styles.switch}
        initialType={kanaGridType}
        onChange={changeGridType}
      />
      <ScrollView style={styles.kanaGridContainer} contentContainerStyle={styles.contentContainer}>
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
  switch: {
    margin: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  kanaGridContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    // paddingTop: 10,
  },
});
