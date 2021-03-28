import React from 'react';
import { StyleSheet, View } from 'react-native';

const getColor = (value) => {
  if (value <= 1 / 3) return '#d9534f';
  if (value <= 4 / 5) return '#f0ad4e';
  return '#5cb85c';
};

const VerticalMeter = ({ value }) => {
  const color = getColor(value);
  const height = `${value * 100}%`;
  return (
    <View style={styles.container}>
      <View style={{ ...styles.bar, backgroundColor: color, height }} />
    </View>
  );
};

export default VerticalMeter;

const styles = StyleSheet.create({
  bar: {
    borderRadius: 10,
  },
  container: {
    justifyContent: 'flex-end',
    padding: 1,
    width: 5,
    backgroundColor: '#fff',
    borderColor: '#7a44cf',
    borderRadius: 10,
  },
});
