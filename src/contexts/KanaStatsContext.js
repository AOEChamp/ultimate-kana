import React, { useState, useEffect } from 'react';
import { setItem } from '../utils/Storage';
import { KanaData } from '../constants/Kana';

class KanaStats {
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

const KanaStatsContext = React.createContext();
const KanaStatsKey = 'KanaStats';

function KanaStatsProvider(props) {
  const [kanaStats, setKanaStats] = useState(props.initialState);

  useEffect(() => {
    setItem(KanaStatsKey, kanaStats);
  }, [kanaStats]);

  return (
    <KanaStatsContext.Provider value={{ kanaStats, setKanaStats }}>
      {props.children}
    </KanaStatsContext.Provider>
  );
}

function initialKanaStats() {
  return Object.keys(KanaData).reduce(function (result, key) {
    result[key] = new KanaStats(key);
    return result;
  }, {});
}

export {
  KanaStatsContext,
  KanaStatsProvider,
  initialKanaStats,
  KanaStatsKey,
  KanaStats,
};
