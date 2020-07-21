import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import KanaText from './KanaText';

export class KanaBlock extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSelected = this.toggleSelected.bind(this);
    this.state = {
      selected: false,
    };
  }

  toggleSelected() {
    this.setState({ selected: !this.state.selected });
  }

  render() {
    return (
      <TouchableOpacity
        disabled={this.props.disabled}
        onPress={this.props.onPress}
        style={[
          this.props.style,
          styles.block,
          {
            backgroundColor: this.props.selected
              ? this.props.selectColor || '#0c4'
              : '#ccc',
          },
        ]}
      >
        <KanaText fontSize={this.props.fontSize} kanaFont={this.props.kanaFont}>
          {this.props.children}
        </KanaText>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    margin: 5,
  },
});
