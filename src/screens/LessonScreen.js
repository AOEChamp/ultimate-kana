import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { chunk, cloneDeep } from 'lodash';
import ProgressBar from 'react-native-progress/Bar';
import { RoundedButton } from '../components/RoundedButton';
import * as Kana from '../constants/Kana';
import playAudio from '../utils/Audio';
import LessonQuizView from '../components/lesson/LessonQuizView';
import { LessonHistoryContext } from '../contexts/LessonHistoryContext';
import MemorizeView from '../components/lesson/MemorizeView';
import LessonComplete from '../components/lesson/LessonComplete';

const LESSON_STATE = {
  MEMORIZE: 1,
  QUIZ: 2,
  COMPLETE: 3,
};

const GROUP_SIZE = 3;

const LessonScreen = ({ navigation }) => {
  const { lessonHistory, setLessonHistory } = useContext(LessonHistoryContext);

  const lessonData = navigation.state.params.lesson;
  const lessonItems = lessonData.kana;

  const splitGroups = () => chunk(lessonItems, GROUP_SIZE);

  const [groups] = useState(splitGroups());
  const [groupIndex, setGroupIndex] = useState(0);
  const [groupItemIndex, setGroupItemIndex] = useState(0);
  const [groupState, setGroupState] = useState(LESSON_STATE.MEMORIZE);
  const [stepCount, setStepCount] = useState(0);

  const currentGroup = groups[groupIndex];
  const totalStepCount = lessonItems.length + groups.length;
  const barProgress = stepCount / totalStepCount;
  const currentItem = Kana.KanaData[groups[groupIndex][groupItemIndex]];

  useEffect(() => {
    if (groupState === LESSON_STATE.MEMORIZE) playCurrentSound();
  }, [groupState, groupIndex, groupItemIndex]);

  const showNextItem = () => {
    if (groupItemIndex < currentGroup.length - 1) {
      setGroupItemIndex(groupItemIndex + 1);
    } else if (groupState === LESSON_STATE.MEMORIZE) {
      setGroupState(LESSON_STATE.QUIZ);
    } else if (groupIndex < groups.length - 1) {
      setGroupIndex(groupIndex + 1);
      setGroupItemIndex(0);
      setGroupState(LESSON_STATE.MEMORIZE);
    } else {
      setGroupState(LESSON_STATE.COMPLETE);
    }
    setStepCount(stepCount + 1);
  };

  const playCurrentSound = () => {
    playAudio(currentItem);
  };

  const skipToEnd = () => {
    setStepCount(setStepCount);
    setGroupState(LESSON_STATE.COMPLETE);
  };

  const endLesson = () => {
    const newLessonHistory = cloneDeep(lessonHistory);
    newLessonHistory[lessonData.id].completed = true;
    newLessonHistory[lessonData.id].attempts++;
    setLessonHistory(newLessonHistory);
    navigation.pop();
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressView}>
        <ProgressBar
          progress={barProgress}
          style={styles.progressBar}
          width={null}
          color="#00BCD4"
          borderRadius={30}
          height={20}
        />
        {__DEV__ && <RoundedButton onClick={skipToEnd} style={styles.skipBtn} title="Skip" />}
      </View>
      {groupState === LESSON_STATE.COMPLETE && <LessonComplete onFinishClick={endLesson} />}
      {groupState === LESSON_STATE.QUIZ && (
        <LessonQuizView
          optionsPool={lessonItems}
          questionPool={groups[groupIndex]}
          onComplete={showNextItem}
        />
      )}
      {groupState === LESSON_STATE.MEMORIZE && (
        <MemorizeView
          currentKanaItem={currentItem}
          playCurrentSound={playCurrentSound}
          showNextItem={showNextItem}
        />
      )}
    </View>
  );
};

LessonScreen.navigationOptions = {
  headerShown: false,
};

export default LessonScreen;

const styles = StyleSheet.create({
  progressBar: {
    flexGrow: 1,
  },
  skipBtn: {
    height: 30,
    marginTop: 0,
    padding: 0,
  },
  progressView: {
    margin: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
