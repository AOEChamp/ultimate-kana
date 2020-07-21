import React, { useReducer, useEffect } from 'react';
import { setItem } from '../utils/Storage';

const SettingsContext = React.createContext();
const SettingsKey = 'Settings';

const reducer = (settings, newSettings) => {
  if (newSettings === null) {
    const tmp = initialSettings();
    setItem(SettinsgKey, tmp);
    return tmp;
  }
  return { ...settings, ...newSettings };
};

function SettingsProvider(props) {
  const [settings, setSettings] = useReducer(reducer, props.initialState);

  useEffect(() => {
    setItem(SettingsKey, settings);
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {props.children}
    </SettingsContext.Provider>
  );
}

function initialSettings() {
  return {
    enableRomajiSelectionDrills: true,
    enableKanaSelectionDrills: false,
    audioOnQuizDisplay: false,
    audioOnQuizAnswer: true,
    kanaFont: 'System',
    randomizeKanaFont: false,
  };
}

export { SettingsContext, SettingsProvider, initialSettings, SettingsKey };
