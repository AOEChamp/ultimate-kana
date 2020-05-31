import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import * as Svg from 'react-native-svg';

const {
  Circle,
  Rect,
  Text
} = Svg;

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };
  constructor(props) {
    super(props);
    this.state = {
      width: 100
    };
  }
  scaleToWidth = (event) => {
    var { x, y, width, height } = event.nativeEvent.layout;
    var max = Math.round(Math.max(width, height));
    if (this.state.width > max * 2) {
      console.log(max);

      this.setState({
        viewBox: "0 0 " + max + " " + max
      });
    }
    // this.text.measure((x, y, width, height, px, py) => {
    //   console.log(width);
    // });
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.view}>
          <Svg height="100%" width="100%" style={styles.svg} viewBox={this.state.viewBox}>
            <Text x="50%" y="50%" alignmentBaseline="middle" textAnchor="middle" onLayout={this.scaleToWidth} ref={(e) => { this.text = e; }}>abc</Text>
          </Svg>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    aspectRatio: 1,
    width: "100%",
    backgroundColor: "#000"
  },
  svg: {
    flex: 1,
    width: "100%",
    backgroundColor: "#f00"
  },
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
