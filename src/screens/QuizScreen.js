import React, { useState } from 'react';
import RandomQuizView from '../components/RandomQuizView';
import QuizCompleteView from '../components/QuizCompleteView';

const QuizScreen = ({ navigation }) => {
  const fullQuizPool = navigation.state.params.kanaSet;

  const [isComplete, setIsComplete] = useState(false);

  const onComplete = () => setIsComplete(true);

  const quizAgain = () => setIsComplete(false);

  return isComplete ? (
    <QuizCompleteView navigation={navigation} quizAgain={quizAgain} />
  ) : (
    <RandomQuizView fullQuizPool={fullQuizPool} onRoundComplete={onComplete} />
  );
};

QuizScreen.navigationOptions = {
  headerShown: false,
};

export default QuizScreen;
