import React from 'react';
import { Text, StyleSheet } from 'react-native';

const KanaText = ({ children, kanaFont, fontSize = 50, style }) => {
  const isEnglish = /^[a-zA-Z]+$/.test(children);
  const fontFamily = isEnglish ? 'System' : kanaFont || 'System';

  return (
    <Text
      style={[
        style,
        styles.text,
        {
          fontSize,
          fontFamily,
        },
      ]}
    >
      {children}
    </Text>
  );
};

export default KanaText;

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: '#333',
  },
});
