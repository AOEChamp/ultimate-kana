import React, { useContext } from 'react';
import { ScrollView, StyleSheet, Text, View, Alert } from 'react-native';

import { RoundedButton } from '../components/RoundedButton';
import { LessonHistoryContext } from '../contexts/LessonHistoryContext';

const ReviewSelectScreen = ({ navigation }) => {
  const { lessonHistory } = useContext(LessonHistoryContext);

  const goToReviewScreen = () => {
    if (Object.values(lessonHistory).some((lesson) => lesson.completed)) {
      navigation.navigate('ReviewScreen');
    } else {
      Alert.alert(
        'No Reviews',
        "You don't have any reviews yet. Try completing some lessons first!",
        [{ text: 'OK', onPress: () => {} }]
      );
    }
  };
  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.headerText}>Review</Text>
        <Text style={styles.subtext}>
          You will be quizzed on kana you have learned so far. Kana that you have trouble with will
          be shown more often.
        </Text>
        <View style={styles.buttonContainer}>
          <RoundedButton onClick={goToReviewScreen} title="Review" />
        </View>
        <View style={styles.hr} />
        <Text style={styles.headerText}>Custom Quiz</Text>
        <Text style={styles.subtext}>Choose the Kana you wish to be quizzed on</Text>
        <View style={styles.buttonContainer}>
          <RoundedButton
            title="Choose Kana"
            onClick={() => navigation.navigate('KanaSelectScreen')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

ReviewSelectScreen.navigationOptions = {
  headerShown: false,
};

export default ReviewSelectScreen;

const styles = StyleSheet.create({
  headerText: {
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  hr: {
    marginTop: 40,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '100%',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  subtext: {
    marginTop: 10,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
  },
  contentContainer: {
    justifyContent: 'center',
    padding: 40,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 10,
  },
});
