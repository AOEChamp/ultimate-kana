import React, { useState, useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import KanaSwitchSelector from '../components/KanaSwitchSelector';
import KanaGrid from '../components/KanaGrid';
import KanaDetailsModal from '../components/KanaDetailsModal';
import * as Kana from '../constants/Kana';
import playAudio from '../utils/Audio';
import { SettingsContext } from '../contexts/SettingsContext';

const KanaReferenceGridScreen = () => {
  const getGridStateForLayout = (gridType) => {
    const gridLayout =
      gridType === Kana.KanaGridTypes.Hiragana ? Kana.HiraganaGridLayout : Kana.KatakanaGridLayout;

    const kanaGridState = gridLayout.map((row) =>
      row.map((kana) => ({
        kana,
        selected: false,
        eng: kana === '' ? '' : Kana.KanaData[kana].eng,
      }))
    );
    return kanaGridState;
  };

  const [kanaGridType, setKanaGridType] = useState(Kana.KanaGridTypes.Hiragana);
  const [kanaGridState, setKanaGridState] = useState(() => getGridStateForLayout(kanaGridType));
  const { settings } = useContext(SettingsContext);
  const [detailsItem, setDetailsItem] = useState(null);

  const handleKanaPress = (kanaItem) => {
    playAudio(Kana.KanaData[kanaItem.kana]);
    setDetailsItem(kanaItem);
  };
  const changeGridType = (value) => {
    if (kanaGridType !== value) {
      setKanaGridType(value);
      setKanaGridState(getGridStateForLayout(value));
    }
  };

  const hideDetails = () => {
    setDetailsItem(null);
  };

  return (
    <View style={styles.container}>
      <KanaSwitchSelector
        style={styles.switch}
        initialType={kanaGridType}
        onChange={changeGridType}
      />
      <ScrollView style={styles.kanaGridContainer} onScrollBeginDrag={hideDetails}>
        <KanaGrid
          gridState={kanaGridState}
          kanaFont={settings.kanaFont}
          onKanaPress={handleKanaPress}
          showStats
        />
      </ScrollView>
      {detailsItem && (
        <KanaDetailsModal item={detailsItem} hide={hideDetails} kanaFont={settings.kanaFont} />
      )}
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
  },
  kanaGridContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
