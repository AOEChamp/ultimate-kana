import React, { useReducer, useEffect } from "react";
import { HiraganaLessons, KatakanaLessons } from '../constants/Kana';

let reducer = (lessonHistory, newLessonHistory) => {
  if (newLessonHistory === null) {
    // localStorage.removeItem("lessonHistory");
    return initialState;
  }
  return { ...lessonHistory, ...newLessonHistory };
};

const LessonHistoryContext = React.createContext();

const SettingKey = "LessonHistory";

function LessonHistoryProvider(props) {
  const [lessonHistory, setLessonHistory] = useReducer(reducer, props.initialState);

  useEffect(() => {
    // localStorage.setItem("lessonHistory", JSON.stringify(lessonHistory));
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

export { LessonHistoryContext, LessonHistoryProvider, initialLessionHistory, SettingKey };
