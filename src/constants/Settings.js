import React from "react";
import { AsyncStorage } from 'react-native';

export const QuizSettings = {
    enableRomajiSelectionDrills: true,
    enableKanaSelectionDrills: false,
    audioOnQuizDisplay: false,
    audioOnQuizAnswer: true,
    kanaFont: 'System',
    randomizeKanaFont: false,
}

export class KanaStats {
    totalFailures;
    totalViews;
    lastNAttempts;
    kanaKey;

    constructor(kanaKey) {
        this.totalFailures = 0;
        this.totalViews = 0;
        this.lastNAttempts = [];
        this.kanaKey = kanaKey;
    }
}

export class LessonSetting {
    completed;
    attempts;

    constructor(completed, attempts) {
        this.completed = completed;
        this.attempts = attempts;
    }
}

export const SettingKeys = {
    KanaGridStats: "kanaStats",
}

const asyncStorageCache = {};

export const getItem = async (key) => {
    let jsonObj = null;
    if (asyncStorageCache.hasOwnProperty(key)) {
        jsonObj = asyncStorageCache[key];
    } else {
        try {
            jsonObj = await AsyncStorage.getItem(key);
        } catch (error) {
            console.log(error.message);
        }
    }
    return jsonObj !== null ? JSON.parse(jsonObj) : null;
};

export const setItem = async (key, value) => {
    try {
        let jsonObj = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonObj);
        asyncStorageCache[key] = jsonObj;
    } catch (error) {
        console.log(error.message);
    }
};

export const setLessonSetting = async (lessonId, lessonSetting) => {
    try {
        await AsyncStorage.setItem('lesson' + lessonId, JSON.stringify(lessonSetting));
    } catch (error) {
        console.log(error.message);
    }
};

export const getLessonSetting = async (lessonId) => {
    let lessonSetting = null;
    try {
        lessonSetting = await AsyncStorage.getItem('lesson' + lessonId);
        if (lessonSetting !== null) {
            lessonSetting = JSON.parse(lessonSetting);
        }
    } catch (error) {
        console.log(error.message);
    }
    return lessonSetting;
}

export const getAllLessonSettings = async (idList) => {
    let settingsList = await Promise.all(idList.map((lessonId) => getLessonSetting(lessonId)));

    return settingsList;
}

// export const Settings = React.createContext();
// const createSetter = function (thisObj, propName) {
//     return value => { thisObj.setState({ [propName]: value }) };
// };

// export var createDefaultSettings = function (thisObj) {
//     return {
//         enableRomajiSelectionDrills: true,
//         setEnableRomajiSelectionDrills: createSetter(thisObj, "enableRomajiSelectionDrills"),
//         enableKanaSelectionDrills: false,
//         setEnableKanaSelectionDrills: createSetter(thisObj, "enableKanaSelectionDrills"),
//     }
// };
