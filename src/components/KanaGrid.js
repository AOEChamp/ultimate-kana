import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import KanaGridBlock from './KanaGridBlock';
import { KanaStatsContext } from '../contexts/KanaStatsContext';

const KanaGrid = ({ gridState, kanaFont, fontSize, onKanaPress, showStats }) => {
  const { kanaStats } = useContext(KanaStatsContext);

  return gridState.map((rowState, i) => (
    <View key={i} style={styles.kanaRow}>
      {rowState.map((item, j) =>
        item.kana === '' ? (
          <View key={j} style={styles.dummyBlock} />
        ) : (
          <KanaGridBlock
            style={styles.kanaBlock}
            kanaFont={kanaFont}
            fontSize={fontSize || 50}
            onPress={() => onKanaPress(item)}
            key={j}
            selected={item.selected}
            kanaItem={item}
            kanaStats={showStats ? kanaStats : null}
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
