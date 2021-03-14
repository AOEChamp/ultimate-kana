import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import KanaText from './KanaText';

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
      <KanaText fontSize={fontSize} kanaFont={kanaFont}>
        {kanaItem.kana}
      </KanaText>
      <Text>
        {kanaItem.eng}
        {kanaItem.stats?.totalViews}
      </Text>
    </TouchableOpacity>
  );
};

export default KanaGridBlock;

const styles = StyleSheet.create({
  block: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    margin: 5,
  },
});
