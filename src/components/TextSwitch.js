import React from 'react';
import { Switch, Text, View, StyleSheet } from 'react-native';

export const TextSwitch = (props) => (
  <View style={[props.style, styles.view]}>
    <Switch style={props.switchStyle} onValueChange={props.onValueChange} value={props.value} />
    <Text style={[styles.text, props.textStyle]}>{props.children}</Text>
  </View>
);

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 5,
  },
});
