import React from 'react';
import RandomQuizView from '../components/RandomQuizView';

const QuizScreen = ({ navigation }) => {
  const fullQuizPool = navigation.state.params.kanaSet;

  return <RandomQuizView fullQuizPool={fullQuizPool} />;
};

QuizScreen.navigationOptions = {
  headerShown: false,
};

export default QuizScreen;
