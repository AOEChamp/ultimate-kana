import React from 'react';
import { Text, StyleSheet } from 'react-native';

export class KanaText extends React.Component {
    constructor(props) {
        super(props);
        this.isEnglish = /^[a-zA-Z]+$/.test(this.props.children);
        this.state = {
            width: 0.5,
            complete: false,
        };
    }
    scaleToWidth = () => {
        this.element.measure((x, y, width, height, px, py) => {
            this.setState({ width: width, complete: true });
        });
    }
    render() {
        var fontSize;
        if (this.isEnglish) {
            fontSize = this.state.width / 2;
        } else {
            fontSize = this.props.children.length === 1 ? this.state.width : this.state.width / 2;
        }

        return (
            <Text onLayout={this.scaleToWidth} ref={(e) => { this.element = e; }} {...this.props}
                style={[this.props.style, styles.text, {
                    fontSize: fontSize,
                    color: this.state.complete ? '#333' : 'transparent',
                    fontFamily: this.isEnglish ? 'System' : this.props.kanaFont || 'System'
                }]}>
                {this.props.children}
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        textAlignVertical: "center",
        textAlign: "center",
        width: '100%',
    },
});

