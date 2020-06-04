import React, { useReducer, useEffect } from "react";
import { HiraganaLessons, KatakanaLessons } from '../constants/Kana';
import { setItem } from '../utils/Storage';

const LessonHistoryContext = React.createContext();
const LessonHistoryKey = "LessonHistory";

let reducer = (lessonHistory, newLessonHistory) => {
  if (newLessonHistory === null) {
    const tmp = initialLessionHistory();
    setItem(LessonHistoryKey, tmp);
    return tmp;
  }
  return { ...lessonHistory, ...newLessonHistory };
};

function LessonHistoryProvider(props) {
  const [lessonHistory, setLessonHistory] = useReducer(reducer, props.initialState);

  useEffect(() => {
    setItem(LessonHistoryKey, lessonHistory);
  }, [lessonHistory]);

  return (
    <LessonHistoryContext.Provider value={{ lessonHistory, setLessonHistory }}>
      {props.children}
    </LessonHistoryContext.Provider>
  );
}

function initialLessionHistory() {
    let hist = {};
    [...HiraganaLessons, ...KatakanaLessons].forEach(lesson => hist[lesson.id] = {
        completed: false,
        attempts: 0,
    });
    return hist;
}

export { LessonHistoryContext, LessonHistoryProvider, initialLessionHistory, LessonHistoryKey };
