import React from 'react';
import { Text, StyleSheet } from 'react-native';

export class KanaText extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const isEnglish = /^[a-zA-Z]+$/.test(this.props.children);
        return (
            <Text {...this.props}
                style={[this.props.style, styles.text, {
                    fontSize: this.props.fontSize || 50,
                    fontFamily: isEnglish ? 'System' : this.props.kanaFont || 'System'
                }]}>
                {this.props.children}
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        flex: 1,
        textAlign: "center",
        color: '#333',
    },
});

