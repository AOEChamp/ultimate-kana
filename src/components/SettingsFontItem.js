import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { CheckBox } from 'react-native-elements';

const SettingsFontItem = ({ title, subtitle, checked, fontFamily, onPress, disabled }) => (
  <CheckBox
    checked={!disabled && checked}
    iconRight
    uncheckedIcon=""
    checkedIcon="check"
    iconType="entypo"
    containerStyle={StyleSheet.flatten([styles.container, disabled && styles.disabled])}
    onPress={onPress}
    disabled={disabled}
    title={
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={{ ...styles.kanaText, fontFamily }}>{subtitle}</Text>
      </View>
    }
    wrapperStyle={styles.wrapper}
  />
);

export default SettingsFontItem;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'normal',
    color: 'black',
  },
  kanaText: {
    fontSize: 30,
    fontWeight: 'normal',
    color: 'black',
  },
  textContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 10,
  },
  container: {
    backgroundColor: 'white',
    margin: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingRight: 16,
    paddingLeft: 16,
    borderWidth: 0,
  },
});
