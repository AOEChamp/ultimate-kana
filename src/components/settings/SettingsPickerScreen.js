import React from 'react';
import { ScrollView, StyleSheet, Platform, PlatformColor } from 'react-native';

import SettingsSection from './SettingsSection';
import SettingsCheckbox from './SettingsCheckbox';

const SettingsPickerScreen = ({ navigation }) => {
  const { options, selectedValue, onSelect } = navigation.state.params;
  const selectItem = (value) => {
    onSelect(value);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <SettingsSection title="">
        {options.map(({ longLabel, value }) => (
          <SettingsCheckbox
            key={longLabel}
            title={longLabel}
            checked={selectedValue === value}
            onPress={() => selectItem(value)}
          />
        ))}
      </SettingsSection>
    </ScrollView>
  );
};

SettingsPickerScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title'),
});

export default SettingsPickerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: { backgroundColor: PlatformColor('secondarySystemBackground') },
      default: { backgroundColor: '#fff' },
    }),
  },
  contentContainer: {
    paddingTop: 15,
    paddingBottom: 15,
  },
});
