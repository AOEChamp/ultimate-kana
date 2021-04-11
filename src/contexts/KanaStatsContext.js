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

function KanaStatsProvider({ children, initialState }) {
  const [kanaStats, setKanaStats] = useState(initialState);

  useEffect(() => {
    setItem(KanaStatsKey, kanaStats);
  }, [kanaStats]);

  return (
    <KanaStatsContext.Provider value={{ kanaStats, setKanaStats }}>
      {children}
    </KanaStatsContext.Provider>
  );
}

function initialKanaStats() {
  /* eslint-disable no-param-reassign */
  return Object.keys(KanaData).reduce((result, key) => {
    result[key] = new KanaStats(key);
    return result;
  }, {});
  /* eslint-enable no-param-reassign */
}

export { KanaStatsContext, KanaStatsProvider, initialKanaStats, KanaStatsKey, KanaStats };
