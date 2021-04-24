import React, { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { chunk, cloneDeep } from 'lodash';
import ProgressBar from 'react-native-progress/Bar';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { RoundedButton } from '../components/RoundedButton';
import * as Kana from '../constants/Kana';
import LessonQuizView from '../components/lesson/LessonQuizView';
import { LessonHistoryContext } from '../contexts/LessonHistoryContext';
import MemorizeView from '../components/lesson/MemorizeView';
import LessonComplete from '../components/lesson/LessonComplete';

const SEGMENT_TYPE = {
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

  const getSegments = () => {
    const segments = [];
    splitGroups().forEach((group) => {
      group.forEach((kana) => {
        segments.push({
          type: SEGMENT_TYPE.MEMORIZE,
          item: Kana.KanaData[kana],
          steps: 1,
        });
      });

      segments.push({
        type: SEGMENT_TYPE.QUIZ,
        items: group,
        steps: group.length,
      });
    });

    segments.push({
      type: SEGMENT_TYPE.QUIZ,
      items: lessonItems,
      steps: lessonItems.length,
    });

    segments.push({
      type: SEGMENT_TYPE.COMPLETE,
      items: [],
      steps: 0,
    });

    return segments;
  };

  const [segments] = useState(getSegments);
  const [segmentIndex, setSegmentIndex] = useState(0);
  const [stepCount, setStepCount] = useState(0);
  const [totalStepCount] = useState(() =>
    segments.reduce((sum, segment) => sum + segment.steps, 0)
  );

  const currentSegment = segments[segmentIndex];
  const barProgress = stepCount / totalStepCount;

  const showNextSegment = () => {
    setSegmentIndex(segmentIndex + 1);
    setStepCount(stepCount + 1);
  };

  const skipToEnd = () => {
    setStepCount(totalStepCount);
    setSegmentIndex(segments.length - 1);
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
      {currentSegment.type === SEGMENT_TYPE.COMPLETE && (
        <LessonComplete onFinishClick={endLesson} />
      )}
      {currentSegment.type === SEGMENT_TYPE.QUIZ && (
        <LessonQuizView
          optionsPool={lessonItems}
          questionPool={currentSegment.items}
          onComplete={showNextSegment}
          onStep={() => setStepCount(stepCount + 1)}
        />
      )}
      {currentSegment.type === SEGMENT_TYPE.MEMORIZE && (
        <MemorizeView currentKanaItem={currentSegment.item} onComplete={showNextSegment} />
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
    margin: wp(5),
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
