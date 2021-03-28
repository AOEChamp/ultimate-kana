import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackActions } from 'react-navigation';

import { RoundedButton } from './RoundedButton';

const ReviewCompleteView = ({ navigation, reviewAgain }) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headerText}>Review Complete!</Text>
      <RoundedButton
        onClick={() => navigation.dispatch(StackActions.popToTop())}
        title="Take a Break"
      />
      <RoundedButton onClick={reviewAgain} title="Review Again" />
    </View>
  );
};

export default ReviewCompleteView;

const styles = StyleSheet.create({
  headerText: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
    alignSelf: 'center',
  },
  mainContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
