import React, { useState, useContext } from 'react';
import { Platform, ScrollView, StyleSheet, View, Text } from 'react-native';

import KanaSwitchSelector from '../components/KanaSwitchSelector';
import KanaGrid from '../components/KanaGrid';
import { TextSwitch } from '../components/TextSwitch';
import { KanaGridData, KanaGridTypes, KanaData } from '../constants/Kana';
import playAudio from '../utils/Audio';
import { RoundedButton } from '../components/RoundedButton';
import { SettingsContext } from '../contexts/SettingsContext';

const KanaSelectScreen = ({ navigation }) => {
  const { settings } = useContext(SettingsContext);
  const [currentGridType, setCurrentGridType] = useState(KanaGridTypes.Hiragana);
  const initialGridState = (gridType) =>
    KanaGridData[gridType].layout.map((row) =>
      row.map((kana) => ({
        kana,
        selected: false,
        eng: kana === '' ? '' : KanaData[kana].eng,
      }))
    );
  const [hiraganaGridState, setHiraganaGridState] = useState(
    initialGridState(KanaGridTypes.Hiragana)
  );
  const [katakanaGridState, setKatakanaGridState] = useState(
    initialGridState(KanaGridTypes.Katakana)
  );
  const initialSelectCount = () => ({
    gojuonSelectedCount: 0,
    dakutenSelectedCount: 0,
    yoonSelectedCount: 0,
  });
  const [selectCounts, setSelectCounts] = useState({
    [KanaGridTypes.Hiragana]: initialSelectCount(),
    [KanaGridTypes.Katakana]: initialSelectCount(),
  });
  const currentGridState =
    currentGridType === KanaGridTypes.Hiragana ? hiraganaGridState : katakanaGridState;
  const currentGridCounts = selectCounts[currentGridType];
  const currentGridData = KanaGridData[currentGridType];
  const getTotalCount = (gridType) => {
    const counts = selectCounts[gridType];
    return counts.gojuonSelectedCount + counts.yoonSelectedCount + counts.dakutenSelectedCount;
  };

  const totalSelectedCount =
    getTotalCount(KanaGridTypes.Hiragana) + getTotalCount(KanaGridTypes.Katakana);

  const getGridForType = (type) =>
    type === KanaGridTypes.Katakana ? katakanaGridState : hiraganaGridState;

  const getSelectedKana = (type) => {
    const gridState = getGridForType(type);
    return gridState.reduce(
      (result, current) =>
        result.concat(
          current.reduce(
            (result, kanaItem) => (kanaItem.selected ? result.concat(kanaItem.kana) : result),
            []
          )
        ),
      []
    );
  };
  const navigateToQuiz = () => {
    const selectedKana = [
      ...getSelectedKana(KanaGridTypes.Hiragana),
      ...getSelectedKana(KanaGridTypes.Katakana),
    ];
    navigation.navigate('QuizScreen', { kanaSet: selectedKana });
  };

  const setCurrentGridState = (newGridState) => {
    if (currentGridType === KanaGridTypes.Hiragana) {
      setHiraganaGridState(newGridState);
    } else {
      setKatakanaGridState(newGridState);
    }
  };

  const toggleList = (itemMap, selected) => {
    const newGridState = currentGridState.map((row) =>
      row.map((item) => ({
        ...item,
        selected: itemMap[item.kana] ? selected : item.selected,
      }))
    );
    setCurrentGridState(newGridState);
  };

  const toggle = (countKey, listKey) => {
    const selected = !(currentGridCounts[countKey] === currentGridData[listKey].length);
    /* eslint-disable no-param-reassign */
    const itemMap = currentGridData[listKey].reduce((obj, key) => {
      obj[key] = true;
      return obj;
    }, {});
    /* eslint-enable no-param-reassign */
    toggleList(itemMap, selected);

    const count = selected ? currentGridData[listKey].length : 0;
    setSelectCounts({
      ...selectCounts,
      [currentGridType]: {
        ...currentGridCounts,
        [countKey]: count,
      },
    });
  };

  const changeCount = (kanaItem, list) => {
    if (list.includes(kanaItem.kana)) {
      return kanaItem.selected ? -1 : 1;
    }
    return 0;
  };

  const handleKanaPress = (kanaItem) => {
    playAudio(KanaData[kanaItem.kana]);

    const gojuonSelectedCount =
      currentGridCounts.gojuonSelectedCount + changeCount(kanaItem, currentGridData.gojuon);
    const dakutenSelectedCount =
      currentGridCounts.dakutenSelectedCount + changeCount(kanaItem, currentGridData.dakuten);
    const yoonSelectedCount =
      currentGridCounts.yoonSelectedCount + changeCount(kanaItem, currentGridData.yoon);

    const newGridState = currentGridState.map((row) =>
      row.map((item) => ({
        ...item,
        selected: item.kana === kanaItem.kana ? !kanaItem.selected : item.selected,
      }))
    );

    setCurrentGridState(newGridState);
    setSelectCounts({
      ...selectCounts,
      [currentGridType]: {
        gojuonSelectedCount,
        dakutenSelectedCount,
        yoonSelectedCount,
      },
    });
  };

  return (
    <View style={styles.container}>
      <KanaSwitchSelector
        style={styles.switch}
        initialType={currentGridType}
        onChange={(value) => setCurrentGridType(value)}
      />
      <ScrollView style={styles.kanaGridContainer} contentContainerStyle={styles.contentContainer}>
        {currentGridType === KanaGridTypes.Hiragana && (
          <KanaGrid
            gridState={hiraganaGridState}
            kanaFont={settings.kanaFont}
            onKanaPress={handleKanaPress}
          />
        )}
        {currentGridType === KanaGridTypes.Katakana && (
          <KanaGrid
            gridState={katakanaGridState}
            kanaFont={settings.kanaFont}
            onKanaPress={handleKanaPress}
          />
        )}
      </ScrollView>
      <View style={styles.tabBarInfoContainer}>
        <View>
          <TextSwitch
            value={currentGridCounts.gojuonSelectedCount === currentGridData.gojuon.length}
            onValueChange={() => toggle('gojuonSelectedCount', 'gojuon')}
          >
            All Gojūon ({currentGridData.gojuon.length})
          </TextSwitch>
          <TextSwitch
            value={currentGridCounts.dakutenSelectedCount === currentGridData.dakuten.length}
            onValueChange={() => toggle('dakutenSelectedCount', 'dakuten')}
          >
            All (Han)Dakuten ({currentGridData.dakuten.length})
          </TextSwitch>
          <TextSwitch
            value={currentGridCounts.yoonSelectedCount === currentGridData.yoon.length}
            onValueChange={() => toggle('yoonSelectedCount', 'yoon')}
          >
            All Yōon ({currentGridData.yoon.length})
          </TextSwitch>
        </View>
        <View style={styles.tabBarRightView}>
          <Text>{totalSelectedCount} kana selected</Text>
          <RoundedButton
            onClick={navigateToQuiz}
            disabled={totalSelectedCount < 6}
            title="Start!"
          />
        </View>
      </View>
    </View>
  );
};

KanaSelectScreen.navigationOptions = {
  headerShown: false,
};

export default KanaSelectScreen;

const styles = StyleSheet.create({
  switch: {
    margin: 20,
    marginTop: 30,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  kanaGridContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {},
  tabBarRightView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarInfoContainer: {
    height: 130,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    flexDirection: 'row',
    backgroundColor: '#fbfbfb',
    padding: 10,
  },
});
