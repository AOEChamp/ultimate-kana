import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackActions } from 'react-navigation';

import { RoundedButton } from './RoundedButton';

const QuizCompleteView = ({ navigation, quizAgain }) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headerText}>Quiz Complete!</Text>
      <RoundedButton
        onClick={() => navigation.dispatch(StackActions.popToTop())}
        title="Take a Break"
      />
      <RoundedButton onClick={quizAgain} title="Quiz Again" />
      <RoundedButton onClick={() => navigation.goBack()} title="Choose new Kana" />
    </View>
  );
};

export default QuizCompleteView;

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
