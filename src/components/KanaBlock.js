import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import KanaText from './KanaText';

const KanaBlock = ({
  disabled,
  onPress,
  selected,
  kanaFont,
  fontSize,
  style,
  children,
  selectColor,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        style,
        styles.block,
        {
          backgroundColor: selected ? selectColor || '#0c4' : '#ccc',
        },
      ]}
    >
      <KanaText fontSize={fontSize} kanaFont={kanaFont}>
        {children}
      </KanaText>
    </TouchableOpacity>
  );
};

export default KanaBlock;

const styles = StyleSheet.create({
  block: {
    aspectRatio: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    margin: 5,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#000',
  },
});
