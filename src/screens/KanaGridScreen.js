import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Button,
} from 'react-native';

import { KanaGrid } from '../components/KanaGrid';
import { TextSwitch } from '../components/TextSwitch';
import * as Kana from '../constants/Kana';
import { Audio } from 'expo-av';
import { QuizSettings } from '../constants/Settings';
import { RoundedButton } from '../components/RoundedButton';

export default class KanaGridScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);

    this.props.navigation.state.params = this.props.navigation.state.params || {};
    this.kanaGridType = this.props.navigation.state.params.gridType || Kana.KanaGridTypes.Hiragana;

    var gridLayout;

    switch (this.kanaGridType) {
      case Kana.KanaGridTypes.Hiragana:
        gridLayout = Kana.HiraganaGridLayout;
        this.gojuonList = Kana.HiraganaGojuon;
        this.dakutenList = Kana.HiraganaDakuten;
        this.yoonList = Kana.HiraganaYoon;
        break;
      case Kana.KanaGridTypes.Katakana:
        gridLayout = Kana.KatakanaGridLayout;
        this.gojuonList = Kana.KatakanaGojuon;
        this.dakutenList = Kana.KatakanaDakuten;
        this.yoonList = Kana.KatakanaYoon;
        break;
    }

    var kanaGridState = gridLayout.map(row => row.map(kana => (
      { kana: kana, selected: false, eng: kana === '' ? '' : Kana.KanaData[kana].eng }
    )));

    this.state = {
      kanaGridState: kanaGridState,
      gojuonSelectedCount: 0,
      dakutenSelectedCount: 0,
      yoonSelectedCount: 0,
      kanaFont: QuizSettings.kanaFont
    };
  }
  toggleDakuten = () => {
    var selected = !(this.state.dakutenSelectedCount === this.dakutenList.length);
    var dakutenSelectedCount = selected ? this.dakutenList.length : 0;
    var kanaGridState = this.selectGridWithList(this.dakutenList, selected);

    this.setState({
      kanaGridState: kanaGridState,
      dakutenSelectedCount: dakutenSelectedCount
    });
  }
  toggleGojuon = () => {
    var selected = !(this.state.gojuonSelectedCount === this.gojuonList.length);
    var gojuonSelectedCount = selected ? this.gojuonList.length : 0;
    var kanaGridState = this.selectGridWithList(this.gojuonList, selected);

    this.setState({
      kanaGridState: kanaGridState,
      gojuonSelectedCount: gojuonSelectedCount
    });
  }
  toggleYoon = () => {
    var selected = !(this.state.yoonSelectedCount === this.yoonList.length);
    var yoonSelectedCount = selected ? this.yoonList.length : 0;
    var kanaGridState = this.selectGridWithList(this.yoonList, selected);

    this.setState({
      kanaGridState: kanaGridState,
      yoonSelectedCount: yoonSelectedCount
    });
  }
  selectGridWithList = (list, selected) => {
    var kanaGridState = this.state.kanaGridState.map(row => row.map(item => (
      {
        ...item,
        selected: list.includes(item.kana) ? selected : item.selected
      }
    )));
    return kanaGridState;
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
  getCountModifier = (kanaItem, list) => {
    if (list.includes(kanaItem.kana)) {
      return kanaItem.selected ? -1 : 1;
    }
    return 0;
  }
  handleKanaPress = (kanaItem) => {
    this.playAudio(kanaItem.kana);

    var gojuonSelectedCount = this.state.gojuonSelectedCount + this.getCountModifier(kanaItem, this.gojuonList);
    var dakutenSelectedCount = this.state.dakutenSelectedCount + this.getCountModifier(kanaItem, this.dakutenList);
    var yoonSelectedCount = this.state.yoonSelectedCount + this.getCountModifier(kanaItem, this.yoonList);

    var kanaGridState = this.state.kanaGridState.map(row => row.map(item => (
      {
        ...item,
        selected: item.kana === kanaItem.kana ? !kanaItem.selected : item.selected
      }
    )));

    this.setState({
      kanaGridState: kanaGridState,
      gojuonSelectedCount: gojuonSelectedCount,
      dakutenSelectedCount: dakutenSelectedCount,
      yoonSelectedCount: yoonSelectedCount
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
  getTotalCount = () => {
    return this.state.gojuonSelectedCount + this.state.yoonSelectedCount + this.state.dakutenSelectedCount;
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.kanaGridContainer} contentContainerStyle={styles.contentContainer}>
          <KanaGrid gridState={this.state.kanaGridState} kanaFont={this.state.kanaFont} onKanaPress={this.handleKanaPress} />
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <View>
            <TextSwitch value={this.state.gojuonSelectedCount === this.gojuonList.length} onValueChange={this.toggleGojuon}>All Gojūon ({this.gojuonList.length})</TextSwitch>
            <TextSwitch value={this.state.dakutenSelectedCount === this.dakutenList.length} onValueChange={this.toggleDakuten}>All (Han)Dakuten ({this.dakutenList.length})</TextSwitch>
            <TextSwitch value={this.state.yoonSelectedCount === this.yoonList.length} onValueChange={this.toggleYoon}>All Yōon ({this.yoonList.length})</TextSwitch>
          </View>
          <View style={styles.tabBarRightView}>
            <RoundedButton onClick={this.navigateToQuiz} disabled={this.getTotalCount() < 6} title="Start!" />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  kanaGridContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  tabBarRightView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  tabBarInfoContainer: {
    height: 130,
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
    flexDirection: 'row',
    backgroundColor: '#fbfbfb',
    padding: 10,
  },
});
