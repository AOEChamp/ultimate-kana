import React from 'react';
import { View, Text, StyleSheet, Platform, PlatformColor } from 'react-native';
import { SettingsButton } from 'react-native-settings-components';
import { Ionicons } from '@expo/vector-icons';

const SettingsPicker = ({ title, screenTitle, value, options, navigation, onChange }) => {
  const selectedItem = options.find((o) => o.value === value);
  const selectValue = (newValue) => onChange(newValue);
  const showPicker = () => {
    navigation.navigate('SettingsPickerScreen', {
      options,
      selectedValue: selectedItem.value,
      title: screenTitle,
      onSelect: selectValue,
    });
  };
  return (
    <SettingsButton
      title={title}
      onPress={showPicker}
      rightIcon={() => (
        <View style={styles.container}>
          <Text style={styles.text}>{selectedItem.label}</Text>
          <Ionicons
            name="ios-chevron-forward"
            size={20}
            color={Platform.select({
              ios: PlatformColor('tertiaryLabel'),
              default: '#424246',
            })}
          />
        </View>
      )}
    />
  );
};

export default SettingsPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    marginRight: 5,
    ...Platform.select({
      ios: { color: PlatformColor('secondaryLabel') },
      default: { color: '#424246' },
    }),
  },
});
