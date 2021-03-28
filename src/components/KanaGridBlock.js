import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import KanaText from './KanaText';
import VerticalMeter from './VerticalMeter';

const KanaGridBlock = ({
  disabled,
  onPress,
  selected,
  selectColor,
  kanaFont,
  style,
  kanaItem,
  fontSize,
}) => {
  let percentage = 0;
  if (kanaItem.stats) {
    percentage =
      (kanaItem.stats.lastNAttempts.filter((x) => x).length + 1) /
      (kanaItem.stats.lastNAttempts.length + 1);
  }
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        style,
        styles.block,
        {
          backgroundColor: selected ? selectColor || '#00BCD4' : '#ccc',
        },
      ]}
    >
      {kanaItem.stats && <VerticalMeter value={percentage} />}
      <View style={styles.column}>
        <KanaText fontSize={fontSize} kanaFont={kanaFont}>
          {kanaItem.kana}
        </KanaText>
        <Text>{kanaItem.eng}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default KanaGridBlock;

const styles = StyleSheet.create({
  column: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  block: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    margin: 5,
  },
});
