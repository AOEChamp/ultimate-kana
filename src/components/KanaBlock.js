import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { KanaText } from './KanaText';

export class KanaBlock extends React.Component {
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
        if (this.props.children !== '') {
            return (
                <TouchableOpacity style={styles.block} onPress={this.props.onPress}>
                    <View style={[styles.view, {
                        backgroundColor: this.props.selected ? this.props.selectColor || '#0c4' : '#ccc'
                    }]}>
                        <KanaText>{this.props.children}</KanaText>
                    </View>
                </TouchableOpacity>

            );
        } else {
            return (
                <View style={[styles.block]} />
            );
        }
    }
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    view: {
        flex: 1,
        aspectRatio: 1,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
