import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import KanaGridBlock from './KanaGridBlock';
import { KanaStatsContext } from '../contexts/KanaStatsContext';
import { SettingsContext } from '../contexts/SettingsContext';

const KanaGrid = ({ gridState, kanaFont, onKanaPress, showStats }) => {
  const { kanaStats } = useContext(KanaStatsContext);
  const { settings } = useContext(SettingsContext);

  return gridState.map((rowState, i) => (
    <View key={i} style={styles.kanaRow}>
      {rowState.map((item, j) =>
        item.kana === '' ? (
          <View key={j} style={styles.dummyBlock} />
        ) : (
          <KanaGridBlock
            style={styles.kanaBlock}
            kanaFont={kanaFont}
            fontSize={wp(12)}
            onPress={() => onKanaPress(item)}
            key={j}
            selected={item.selected}
            kanaItem={item}
            kanaStats={showStats ? kanaStats : null}
            accuracySize={settings.accuracySize}
          />
        )
      )}
    </View>
  ));
};

export default KanaGrid;

const styles = StyleSheet.create({
  dummyBlock: {
    flex: 1,
    margin: 5,
    padding: 5,
  },
  kanaRow: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5,
  },
  kanaBlock: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#000',
  },
});
