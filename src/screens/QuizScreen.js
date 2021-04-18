import React, { useState } from 'react';
import RandomQuizView from '../components/RandomQuizView';
import QuizCompleteView from '../components/QuizCompleteView';

const QuizScreen = ({ navigation }) => {
  const fullQuizPool = navigation.state.params.kanaSet;

  const [isComplete, setIsComplete] = useState(false);
  const [accuracy, setAccuracy] = useState(0);

  const onComplete = (failCount) => {
    setAccuracy(((fullQuizPool.length - failCount) / fullQuizPool.length) * 100);
    setIsComplete(true);
  };

  const quizAgain = () => setIsComplete(false);

  return isComplete ? (
    <QuizCompleteView navigation={navigation} accuracy={accuracy} quizAgain={quizAgain} />
  ) : (
    <RandomQuizView fullQuizPool={fullQuizPool} onRoundComplete={onComplete} />
  );
};

QuizScreen.navigationOptions = {
  headerShown: false,
};

export default QuizScreen;
