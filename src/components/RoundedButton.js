import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

export const RoundedButton = ({ onClick, children, style }) => (
    <TouchableOpacity
        style={[styles.roundedButtonStyle, style]}
        activeOpacity={.5}
        onPress={onClick}
    >
        {children}
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    roundedButtonStyle: {
        marginTop: 10,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#00BCD4',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
});
