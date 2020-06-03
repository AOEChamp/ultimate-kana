import React from 'react';
import { Text as Text, StyleSheet } from 'react-native';

export class KanaText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static getDerivedStateFromProps(props, state) {
        if (state.text !== props.children) {
            let isEnglish = /^[a-zA-Z]+$/.test(props.children)
            let fontFamily = isEnglish ? 'System' : props.kanaFont || 'System';
            let fontSize = props.fontSize || 50;
            return {
                text: props.children,
                fontFamily: fontFamily,
                fontSize: fontSize,
            };
        }
        return null;
    }
    render() {
        return (
            <Text {...this.props}
                style={[this.props.style, styles.text, {
                    fontSize: this.state.fontSize,
                    fontFamily: this.state.fontFamily,
                    height: this.state.fontSize,
                }]}>
                {this.state.text}
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        textAlign: "center",
        color: '#333',
    },
});

