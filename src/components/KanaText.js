import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { JSFonts } from '../constants/Fonts';
import { Svg } from 'expo';

export class KanaText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    static getRenderData(text, fontSize, fontFamily) {
        var retVal = {};

        if (fontFamily !== "System") {
            const font = JSFonts[fontFamily];

            const path = font.getPath(
                text,
                0,        // x: Horizontal position of the beginning of the text
                fontSize, // y: Vertical position of the baseline of the text
                fontSize  // fontSize: Size of the text in pixels
            );
            const bb = path.getBoundingBox();

            retVal = {
                pathData: path.toPathData(),
                height: bb.y1 + bb.y2,
                width: font.getAdvanceWidth(text, fontSize),
                transformY: 0//fontSize /  2 + Math.abs(bb.y1) / 2 + bb.y2;
            }
        }

        return retVal;
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
                renderData: KanaText.getRenderData(props.children, fontSize, fontFamily),
                isEnglish: isEnglish
            };
        }
        return null;
    }
    render() {
        let textElement;

        if (this.state.fontFamily === "System") {
            textElement = (
                <Text {...this.props}
                    style={[this.props.style, styles.text, {
                        fontSize: this.state.fontSize,
                        fontFamily: this.state.fontFamily
                    }]}>
                    {this.state.text}
                </Text>
            );
        } else {
            textElement = (
                <Svg height={this.state.renderData.height} width={this.state.renderData.width} style={styles.svg}>
                    <Svg.Path
                        x="0" y={this.state.renderData.transformY}
                        strokeWidth={2}
                        d={this.state.renderData.pathData}
                    />
                </Svg>
            );
        }
        return textElement;
    }
}

const styles = StyleSheet.create({
    svg: {
        flex: 1,
        color: '#333',
    },
    text: {
        flex: 1,
        textAlign: "center",
        color: '#333',
    },
});

