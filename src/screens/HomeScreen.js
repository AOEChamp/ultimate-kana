import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { KanaGridTypes } from '../constants/Kana';
import { RoundedButton } from '../components/RoundedButton';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  navigateToLessonSelectH = () => {
    this.props.navigation.navigate('LessonSelectScreen', { lessonType: KanaGridTypes.Hiragana });
  }
  navigateToLessonSelectK = () => {
    this.props.navigation.navigate('LessonSelectScreen', { lessonType: KanaGridTypes.Katakana });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.titleText}>Ultimate Kana</Text>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>
          <Text style={styles.headerText}>Lessons</Text>
          <View style={styles.buttonContainer}>
            <RoundedButton onClick={this.navigateToLessonSelectH} title="Hiragana" />
            <RoundedButton onClick={this.navigateToLessonSelectK} title="Katakana" />
          </View>
          <Text style={styles.headerText}>Quiz</Text>
          <View style={styles.buttonContainer}>
            <RoundedButton title="Hiragana"
              onClick={() => this.props.navigation.navigate('KanaGrid', { gridType: KanaGridTypes.Hiragana })} />
            <RoundedButton title="Katakana"
              onPress={() => this.props.navigation.navigate('KanaGrid', { gridType: KanaGridTypes.Katakana })} />
          </View>
          <Text style={styles.subtext}>
            Choose the Kana you wish to be quizzed on in the following page
          </Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontFamily: 'Arkipelago',
    fontSize: 60,
    marginTop: 20,
  },
  headerText: {
    fontSize: 24,
    marginTop: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subtext: {
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 40,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 10,
  },
});
