import React from 'react';
import SwitchSelector from 'react-native-switch-selector';

import * as Kana from '../constants/Kana';

const SELECTOR_COLOR = '#7a44cf';

const KanaSwitchSelector = ({ style, initialType, onChange }) => {
  return (
    <SwitchSelector
      style={style}
      initial={initialType === Kana.KanaGridTypes.Hiragana ? 0 : 1}
      onPress={onChange}
      textColor={SELECTOR_COLOR}
      selectedColor="#fff"
      buttonColor={SELECTOR_COLOR}
      borderColor={SELECTOR_COLOR}
      hasPadding
      options={[
        { label: 'Hiragana', value: Kana.KanaGridTypes.Hiragana },
        { label: 'Katakana', value: Kana.KanaGridTypes.Katakana },
      ]}
      accessibilityLabel="change kana type"
    />
  );
};

export default KanaSwitchSelector;
