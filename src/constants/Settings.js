import { AsyncStorage } from 'react-native';

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
