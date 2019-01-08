import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Button,
} from 'react-native';

import { KanaBlock } from '../components/KanaBlock';
import { TextSwitch } from '../components/TextSwitch';
import * as Kana from '../constants/Kana';
import { Audio } from 'expo';

export default class KanaGridScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);

    this.kanaGridType = this.props.navigation.state.params;

    var gridLayout;

    switch (this.kanaGridType) {
      case Kana.KanaGridTypes.Hiragana:
        gridLayout = Kana.HiraganaGridLayout;
        break;
      case Kana.KanaGridTypes.Katakana:
        gridLayout = Kana.KatakanaGridLayout;
        break;
    }

    var kanaGridState = gridLayout.map(row => row.map(kana => (
      { kana: kana, selected: false }
    )));
    this.state = {
      kanaGridState: kanaGridState,
      gojuonSelectedCount: 0
    };
  }
  toggleGojuon = () => {
    var selected = !(this.state.gojuonSelectedCount === Kana.KanaGojuon.length);
    var gojuonSelectedCount = selected ? Kana.KanaGojuon.length : 0;
    var kanaGridState = this.state.kanaGridState.map(row => row.map(item => (
      {
        kana: item.kana,
        selected: Kana.KanaGojuon.includes(item.kana) ? selected : item.selected
      }
    )));
    this.setState({
      kanaGridState: kanaGridState,
      gojuonSelectedCount: gojuonSelectedCount
    });
  }
  playAudio = async (kanaKey) => {
    const soundObject = new Audio.Sound();

    try {
      await soundObject.loadAsync(Kana.KanaData[kanaKey].audio);
      await soundObject.playAsync();
    } catch (error) {
      console.log(error);
    }
  }
  handleKanaPress = (kanaItem) => {
    this.playAudio(kanaItem.kana);

    var gojuonSelectedCount = this.state.gojuonSelectedCount;
    if (Kana.KanaGojuon.includes(kanaItem.kana)) {
      kanaItem.selected ? gojuonSelectedCount-- : gojuonSelectedCount++;
    }
    var kanaGridState = this.state.kanaGridState.map(row => row.map(item => (
      {
        kana: item.kana,
        selected: item.kana === kanaItem.kana ? !kanaItem.selected : item.selected
      }
    )));
    this.setState({
      kanaGridState: kanaGridState,
      gojuonSelectedCount: gojuonSelectedCount
    });
  }
  navigateToQuiz = () => {
    var selectedKana = this.state.kanaGridState.reduce((result, current) =>
      result.concat(current.reduce(
        (result, kanaItem) => kanaItem.selected ? result.concat(kanaItem.kana) : result
        , []))
      , []);
    this.props.navigation.navigate('QuizScreen', { kanaSet: selectedKana });
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.kanaGridContainer} contentContainerStyle={styles.contentContainer}>
          {
            this.state.kanaGridState.map((kanaRowLayout, i) => <KanaRow onKanaPress={this.handleKanaPress} key={i} row={kanaRowLayout} />)
          }
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <View>
            <TextSwitch value={this.state.gojuonSelectedCount === Kana.KanaGojuon.length} onValueChange={this.toggleGojuon}>All Gojūon ({Kana.KanaGojuon.length})</TextSwitch>
            <TextSwitch value={true}>Test</TextSwitch>
            <TextSwitch value={true}>Test</TextSwitch>
          </View>
          <View style={styles.tabBarRightView}>
            <Button title="Start!" onPress={this.navigateToQuiz} />
          </View>
        </View>
      </View>
    );
  }

}

const KanaRow = props => (
  <View style={styles.kanaRow}>
    {
      props.row.map((item, i) =>
        <KanaBlock onPress={props.onKanaPress.bind(this, item)} key={i} selected={item.selected}>{item.kana}</KanaBlock>
      )
    }
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  kanaGridContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 130
  },
  contentContainer: {
    paddingTop: 30,
  },
  kanaRow: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5
  },
  tabBarRightView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
});
