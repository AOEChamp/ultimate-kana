import React from 'react';
import _ from 'lodash';
import { StyleSheet } from 'react-native';

import * as Kana from '../constants/Kana';
import { QuizView } from '../components/QuizView';
import { SettingsContext } from '../contexts/SettingsContext';
import { KanaStatsContext } from '../contexts/KanaStatsContext';

class QuizScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);

    this.fullQuizPool = _.cloneDeep(this.props.navigation.state.params.kanaSet);
    this.resetQuizPool();
  }

  componentWillMount() {
    this.showNewQuizItem();
  }

  resetQuizPool = () => {
    this.currentQuizPool = _.cloneDeep(this.fullQuizPool);
  };

  pickQuizItemFromPool = () => {
    if (this.currentQuizPool.length == 0) {
      this.resetQuizPool();
    }
    const idx = Math.floor(Math.random() * this.currentQuizPool.length);
    const currentQuizItem = Kana.KanaData[this.currentQuizPool.splice(idx, 1)];
    return currentQuizItem;
  };

  handleAnswerSelected = (kanaStats, setKanaStats, kanaData) => {
    if (this.state.lockUntilNextQuiz) {
      return;
    }

    const { quizOptions } = this.state;
    const idx = quizOptions.indexOf(kanaData);

    if (kanaData.kana === this.state.currentQuizItem.kana) {
      quizOptions[idx].success = true;
      this.setState({
        quizOptions,
        lockUntilNextQuiz: true,
      });
      this.setQuizStat(kanaStats, setKanaStats, kanaData, false);
      setTimeout(() => this.showNewQuizItem(), 1000);
    } else if (idx != -1) {
      quizOptions[idx].fail = true;
      this.setState({ quizOptions });
      this.setQuizStat(kanaStats, setKanaStats, kanaData, true);
    }
  };

  setQuizStat = (kanaStats, setKanaStats, kanaData, fail) => {
    const newKanaStats = _.cloneDeep(kanaStats);
    const stat = newKanaStats[kanaData.kana];
    stat.totalFailures += fail ? 1 : 0;
    stat.totalViews++;
    if (stat.lastNAttempts.unshift(!fail) > 5) {
      stat.lastNAttempts.pop();
    }
    setKanaStats(newKanaStats);
  };

  getNewQuizItem = () => {
    const currentQuizItem = this.pickQuizItemFromPool();

    const quizOptions = new Array(
      this.fullQuizPool.length >= 6 ? 6 : this.fullQuizPool.length
    );
    quizOptions[
      Math.floor(Math.random() * quizOptions.length)
    ] = currentQuizItem;
    for (let i = 0; i < quizOptions.length; i++) {
      while (quizOptions[i] !== currentQuizItem) {
        const randomItem =
          Kana.KanaData[
            this.fullQuizPool[
              Math.floor(Math.random() * this.fullQuizPool.length)
            ]
          ];
        if (
          randomItem != currentQuizItem &&
          !quizOptions.includes(randomItem)
        ) {
          quizOptions[i] = randomItem;
          break;
        }
      }
    }

    let useKanaSelection = this.context.settings.enableKanaSelectionDrills;
    if (useKanaSelection && this.context.settings.enableRomajiSelectionDrills) {
      useKanaSelection = Math.random() >= 0.5;
    }

    return {
      currentQuizItem,
      quizOptions: _.cloneDeep(quizOptions),
      useKanaSelection,
      lockUntilNextQuiz: false,
    };
  };

  showNewQuizItem = () => {
    this.setState(this.getNewQuizItem());
  };

  render() {
    return (
      <KanaStatsContext.Consumer>
        {({ kanaStats, setKanaStats }) => (
          <QuizView
            style={styles.container}
            useKanaSelection={this.state.useKanaSelection}
            onKanaPress={this.handleAnswerSelected.bind(
              this,
              kanaStats,
              setKanaStats
            )}
            quizOptions={this.state.quizOptions}
            quizQuestion={this.state.currentQuizItem}
          />
        )}
      </KanaStatsContext.Consumer>
    );
  }
}

QuizScreen.contextType = SettingsContext;

export default QuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
