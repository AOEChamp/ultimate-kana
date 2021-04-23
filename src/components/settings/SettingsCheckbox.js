import React from 'react';
import { StyleSheet, View, Text, Pressable, Platform, PlatformColor } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const SettingsCheckbox = ({ title, subtitle, checked, fontFamily, onPress }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      {
        backgroundColor: pressed
          ? Platform.select({
              ios: PlatformColor('quaternaryLabel'),
              default: '#d1d1d6',
            })
          : Platform.select({
              ios: PlatformColor('systemBackground'),
              default: 'white',
            }),
      },
      styles.checkbox,
    ]}
  >
    <View style={styles.textContainer}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={{ ...styles.kanaText, fontFamily }}>{subtitle}</Text>
    </View>
    <Entypo name="check" size={24} color="#2089dc" style={{ opacity: checked ? 1 : 0 }} />
  </Pressable>
);

export default SettingsCheckbox;

const styles = StyleSheet.create({
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    minHeight: 50,
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
});
