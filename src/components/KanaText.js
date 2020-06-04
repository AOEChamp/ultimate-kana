import React from 'react';
import { Text as Text, StyleSheet } from 'react-native';

const KanaText = ({children, kanaFont, fontSize, style}) => {
    let isEnglish = /^[a-zA-Z]+$/.test(children)
    let fontFamily = isEnglish ? 'System' : kanaFont || 'System';
    fontSize = fontSize || 50;

    return (
        <Text
            style={[style, styles.text, {
                fontSize: fontSize,
                fontFamily: fontFamily,
                height: fontSize,
            }]}>
            {children}
        </Text>
    );
};

export default KanaText;

const styles = StyleSheet.create({
    text: {
        textAlign: "center",
        color: '#333',
    },
});

