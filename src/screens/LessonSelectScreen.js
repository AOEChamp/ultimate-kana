import React, { useState, useContext } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RoundedButtonBase } from '../components/RoundedButton';
import * as Kana from '../constants/Kana';
import { LessonHistoryContext } from '../contexts/LessonHistoryContext';

const LessonSelectScreen = ({ navigation }) => {
  const { lessonType } = navigation.state.params;
  const [lessonSet] = useState(() => {
    switch (lessonType) {
      case Kana.KanaGridTypes.Hiragana:
        return Kana.HiraganaLessons;
      case Kana.KanaGridTypes.Katakana:
        return Kana.KatakanaLessons;
    }
  });
  const { lessonHistory } = useContext(LessonHistoryContext);
  let disabledIndex = 1;
  for (let i = 0; i < lessonSet.length; i++) {
    if (!lessonHistory[lessonSet[i].id].completed) {
      disabledIndex = i + 1;
      break;
    }
  }

  const isLessonCompleted = (id) => {
    return lessonHistory[id].completed;
  };

  const navigateToLesson = (index) => {
    navigation.navigate('LessonScreen', {
      lesson: lessonSet[index],
      lessonType,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{lessonType} Lessons</Text>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {lessonSet.map(({ title, subtitle, id }, i) => (
          <LessonButton
            onClick={navigateToLesson.bind(this, i)}
            key={i}
            text={title}
            subtext={subtitle}
            completed={isLessonCompleted(id)}
            disabled={i >= disabledIndex}
          />
        ))}
      </ScrollView>
    </View>
  );
};

LessonSelectScreen.navigationOptions = {
  headerShown: false,
};

export default LessonSelectScreen;

const LessonButton = ({ text, subtext, onClick, completed, disabled }) => (
  <RoundedButtonBase
    onClick={onClick}
    style={[
      styles.buttonStyle,
      completed ? { backgroundColor: '#009eb3' } : disabled ? { backgroundColor: '#ccc' } : {},
    ]}
  >
    <View style={styles.buttonLeft}>
      <Text style={styles.buttonText}>{text}</Text>
      <Text style={styles.buttonSubtext}>{subtext}</Text>
    </View>
    <View style={{ flexDirection: 'row' }}>
      {completed && (
        <Ionicons
          name="md-checkmark-circle-outline"
          size={26}
          style={styles.buttonIconStyle}
          color="#0f0"
        />
      )}
      <Ionicons name="ios-arrow-forward" size={26} style={styles.buttonIconStyle} color="#fff" />
    </View>
  </RoundedButtonBase>
);

const styles = StyleSheet.create({
  buttonStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonLeft: {
    marginLeft: 20,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 35,
    marginTop: 40,
    marginLeft: 20,
  },
  contentContainer: {
    flexDirection: 'column',
    marginLeft: 20,
    marginRight: 20,
    paddingBottom: 20,
  },
  buttonIconStyle: {
    marginRight: 20,
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
  },
  buttonSubtext: {
    fontSize: 16,
    color: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
