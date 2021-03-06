import { AsyncStorage } from 'react-native';

const asyncStorageCache = {};

export const getItem = async (key) => {
  let jsonObj = null;
  if (asyncStorageCache[key] !== undefined) {
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
    const jsonObj = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonObj);
    asyncStorageCache[key] = jsonObj;
  } catch (error) {
    console.log(error.message);
  }
};
