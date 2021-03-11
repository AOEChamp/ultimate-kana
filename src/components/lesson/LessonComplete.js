import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RoundedButton } from '../RoundedButton';

const LessonComplete = ({ onFinishClick }) => {
  return (
    <View style={styles.contentContainer}>
      <View style={styles.lessonCompleteView}>
        <Text style={styles.titleText}>Lesson complete!</Text>
      </View>
      <RoundedButton onClick={onFinishClick} style={styles.nextButtonStyle} title="Finish" />
    </View>
  );
};

export default LessonComplete;

const styles = StyleSheet.create({
  lessonCompleteView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonStyle: {
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
  },
  contentContainer: {
    marginRight: 20,
    marginLeft: 20,
    flex: 1,
    flexDirection: 'column',
  },
});
