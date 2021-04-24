import React, { useReducer, useEffect } from 'react';
import { setItem, getItem } from '../utils/Storage';

const SettingsContext = React.createContext();
const SettingsKey = 'Settings';

const reducer = (settings, newSettings) => ({ ...settings, ...newSettings });

function SettingsProvider({ initialState, children }) {
  const [settings, setSettings] = useReducer(reducer, initialState);

  useEffect(() => {
    setItem(SettingsKey, settings);
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
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
    successAnimation: true,
    homeAnimation: true,
    reviewSize: 5,
    accuracySize: 5,
  };
}

async function loadSettings() {
  const settings = await getItem(SettingsKey);
  // ensures that newly added settings always exist
  const mergedSettings = { ...initialSettings(), ...settings };
  await setItem(SettingsKey, mergedSettings);
  return mergedSettings;
}

export { SettingsContext, SettingsProvider, initialSettings, loadSettings };
