import React, { useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { KanaStatsContext } from '../contexts/KanaStatsContext';
import KanaText from './KanaText';

const KanaDetailsModal = ({ item, hide, kanaFont }) => {
  const { kanaStats } = useContext(KanaStatsContext);
  const stats = kanaStats[item.kana];
  const recentAcc =
    stats.lastNAttempts.length === 0
      ? 0
      : Math.round(
          (stats.lastNAttempts.filter((x) => x).length / stats.lastNAttempts.length) * 100
        );
  const totalAcc =
    stats.totalViews === 0
      ? 0
      : Math.round(((stats.totalViews - stats.totalFailures) / stats.totalViews) * 100);

  return (
    <TouchableOpacity onPress={hide} style={styles.modalView}>
      <View style={styles.modalInner}>
        <KanaText fontSize={50} kanaFont={kanaFont}>
          {item.kana}
        </KanaText>
        <View>
          <Text style={styles.modalText}>Recent Accuracy: {recentAcc}%</Text>
          <Text style={styles.modalText}>Lifetime Accuracy: {totalAcc}%</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default KanaDetailsModal;

const styles = StyleSheet.create({
  modalInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  modalView: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
