import React from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import ScalableText from 'react-native-text';

import { KanaGridTypes } from '../constants/Kana';
import { RoundedButton } from '../components/RoundedButton';
import KanaDropText from '../components/KanaDropText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  navigateToLessonSelectH = () => {
    this.props.navigation.navigate('LessonSelectScreen', {
      lessonType: KanaGridTypes.Hiragana,
    });
  };

  navigateToLessonSelectK = () => {
    this.props.navigation.navigate('LessonSelectScreen', {
      lessonType: KanaGridTypes.Katakana,
    });
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <ScalableText style={styles.titleText}>Ultimate Kana</ScalableText>
          </View>
          <KanaDropText
            height={Math.round(Dimensions.get('window').height / 2)}
            style={styles.canvas}
          />
          <Text style={styles.headerText}>Lessons</Text>
          <View style={styles.buttonContainer}>
            <RoundedButton
              onClick={this.navigateToLessonSelectH}
              title="Hiragana"
            />
            <RoundedButton
              onClick={this.navigateToLessonSelectK}
              title="Katakana"
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  canvas: {
    flexShrink: 1,
  },
  titleText: {
    fontFamily: 'Arkipelago',
    fontSize: 50,
    marginTop: 20,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 20,
  },
  buttonContainer: {},
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    justifyContent: 'center',
    padding: 40,
    flex: 1,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
});
