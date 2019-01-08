import React from 'react';
import { Text, StyleSheet } from 'react-native';

export class KanaText extends React.Component {
    constructor(props) {
        super(props);
        this.scaleToWidth = this.scaleToWidth.bind(this);
        this.state = {
            width: 0.5,
            complete: false,
        };
    }
    scaleToWidth() {
        this.element.measure((x, y, width, height, px, py) => {
            var chars = this.props.children.length;
            this.setState({width: width, complete: true});
        });
    }
    render() {
        const isEnglish = /^[a-zA-Z]+$/.test(this.props.children);
        var fontSize = this.state.width;
        if(isEnglish) {
            fontSize = this.props.children.length == 1 ? this.state.width / 2 : this.state.width / this.props.children.length;
        }
        
        return (
            <Text onLayout={this.scaleToWidth} ref={(e) => { this.element = e; }} {...this.props} 
            style={[this.props.style, styles.text, { 
                fontSize: fontSize,
                color: this.state.complete ? '#333': 'transparent',
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
        // fontFamily: 'space-mono',
    },
});

