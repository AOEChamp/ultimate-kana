import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';

export const RoundedButtonBase = ({ onClick, children, style }) => (
    <TouchableOpacity
        style={[styles.roundedButtonStyle, style]}
        activeOpacity={.5}
        onPress={onClick}
    >
        {children}
    </TouchableOpacity>
);

export const RoundedButton = ({ onClick, style, title }) => (
    <RoundedButtonBase onClick={onClick} style={[styles.roundedButtonStyle, style]}>
        <Text style={styles.buttonText}>{title}</Text>
    </RoundedButtonBase>
);

const styles = StyleSheet.create({
    roundedButtonStyle: {
        marginTop: 10,
        padding: 15,
        backgroundColor: '#00BCD4',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    buttonText: {
        fontSize: 24,
        color: '#fff',
        textAlign: 'center',
    },
});
