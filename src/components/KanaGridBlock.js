import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { KanaText } from './KanaText';

export class KanaGridBlock extends React.Component {
    constructor(props) {
        super(props);
        this.toggleSelected = this.toggleSelected.bind(this);
        this.state = {
            selected: false
        };
    }

    toggleSelected() {
        this.setState({ selected: !this.state.selected });
    }

    render() {
        return (
            <TouchableOpacity disabled={this.props.disabled} onPress={this.props.onPress}
                style={[this.props.style, styles.block, {
                    backgroundColor: this.props.selected ? this.props.selectColor || '#0c4' : '#ccc'
                }]}>
                <KanaText fontSize={this.props.fontSize} kanaFont={this.props.kanaFont}>{this.props.kanaItem.kana}</KanaText>
                <Text>{this.props.kanaItem.eng}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        margin: 5
    },
});
