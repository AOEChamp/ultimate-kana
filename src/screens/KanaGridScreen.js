import React from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';

import { KanaGrid } from '../components/KanaGrid';
import { TextSwitch } from '../components/TextSwitch';
import * as Kana from '../constants/Kana';
import playAudio from '../utils/Audio';
import { RoundedButton } from '../components/RoundedButton';
import { SettingsContext } from '../contexts/SettingsContext';

export default class KanaGridScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);

    this.props.navigation.state.params =
      this.props.navigation.state.params || {};
    this.kanaGridType =
      this.props.navigation.state.params.gridType ||
      Kana.KanaGridTypes.Hiragana;

    let gridLayout;

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

    const kanaGridState = gridLayout.map((row) =>
      row.map((kana) => ({
        kana,
        selected: false,
        eng: kana === '' ? '' : Kana.KanaData[kana].eng,
      }))
    );

    this.state = {
      kanaGridState,
      gojuonSelectedCount: 0,
      dakutenSelectedCount: 0,
      yoonSelectedCount: 0,
    };
  }

  toggleDakuten = () => {
    const selected = !(
      this.state.dakutenSelectedCount === this.dakutenList.length
    );
    const dakutenSelectedCount = selected ? this.dakutenList.length : 0;
    const kanaGridState = this.selectGridWithList(this.dakutenList, selected);

    this.setState({
      kanaGridState,
      dakutenSelectedCount,
    });
  };

  toggleGojuon = () => {
    const selected = !(
      this.state.gojuonSelectedCount === this.gojuonList.length
    );
    const gojuonSelectedCount = selected ? this.gojuonList.length : 0;
    const kanaGridState = this.selectGridWithList(this.gojuonList, selected);

    this.setState({
      kanaGridState,
      gojuonSelectedCount,
    });
  };

  toggleYoon = () => {
    const selected = !(this.state.yoonSelectedCount === this.yoonList.length);
    const yoonSelectedCount = selected ? this.yoonList.length : 0;
    const kanaGridState = this.selectGridWithList(this.yoonList, selected);

    this.setState({
      kanaGridState,
      yoonSelectedCount,
    });
  };

  selectGridWithList = (list, selected) => {
    const kanaGridState = this.state.kanaGridState.map((row) =>
      row.map((item) => ({
        ...item,
        selected: list.includes(item.kana) ? selected : item.selected,
      }))
    );
    return kanaGridState;
  };

  getCountModifier = (kanaItem, list) => {
    if (list.includes(kanaItem.kana)) {
      return kanaItem.selected ? -1 : 1;
    }
    return 0;
  };

  handleKanaPress = (kanaItem) => {
    playAudio(Kana.KanaData[kanaItem.kana]);

    const gojuonSelectedCount =
      this.state.gojuonSelectedCount +
      this.getCountModifier(kanaItem, this.gojuonList);
    const dakutenSelectedCount =
      this.state.dakutenSelectedCount +
      this.getCountModifier(kanaItem, this.dakutenList);
    const yoonSelectedCount =
      this.state.yoonSelectedCount +
      this.getCountModifier(kanaItem, this.yoonList);

    const kanaGridState = this.state.kanaGridState.map((row) =>
      row.map((item) => ({
        ...item,
        selected:
          item.kana === kanaItem.kana ? !kanaItem.selected : item.selected,
      }))
    );

    this.setState({
      kanaGridState,
      gojuonSelectedCount,
      dakutenSelectedCount,
      yoonSelectedCount,
    });
  };

  navigateToQuiz = () => {
    const selectedKana = this.state.kanaGridState.reduce(
      (result, current) =>
        result.concat(
          current.reduce(
            (result, kanaItem) =>
              kanaItem.selected ? result.concat(kanaItem.kana) : result,
            []
          )
        ),
      []
    );
    this.props.navigation.navigate('QuizScreen', { kanaSet: selectedKana });
  };

  getTotalCount = () => {
    return (
      this.state.gojuonSelectedCount +
      this.state.yoonSelectedCount +
      this.state.dakutenSelectedCount
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.kanaGridContainer}
          contentContainerStyle={styles.contentContainer}
        >
          <SettingsContext.Consumer>
            {(settings) => (
              <KanaGrid
                gridState={this.state.kanaGridState}
                kanaFont={settings.kanaFont}
                onKanaPress={this.handleKanaPress}
              />
            )}
          </SettingsContext.Consumer>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <View>
            <TextSwitch
              value={this.state.gojuonSelectedCount === this.gojuonList.length}
              onValueChange={this.toggleGojuon}
            >
              All Gojūon ({this.gojuonList.length})
            </TextSwitch>
            <TextSwitch
              value={
                this.state.dakutenSelectedCount === this.dakutenList.length
              }
              onValueChange={this.toggleDakuten}
            >
              All (Han)Dakuten ({this.dakutenList.length})
            </TextSwitch>
            <TextSwitch
              value={this.state.yoonSelectedCount === this.yoonList.length}
              onValueChange={this.toggleYoon}
            >
              All Yōon ({this.yoonList.length})
            </TextSwitch>
          </View>
          <View style={styles.tabBarRightView}>
            <RoundedButton
              onClick={this.navigateToQuiz}
              disabled={this.getTotalCount() < 6}
              title="Start!"
            />
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
    alignItems: 'center',
    justifyContent: 'center',
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
