import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { KanaGridTypes } from '../constants/Kana';
import { RoundedButton } from '../components/RoundedButton';

const ReviewSelectScreen = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.headerText}>Review</Text>
        <View style={styles.buttonContainer}>
          <RoundedButton
            onClick={() => navigation.navigate('ReviewScreen')}
            title="Review"
          />
        </View>
        <View style={styles.hr}></View>
        <Text style={styles.headerText}>Custom Quiz</Text>
        <Text style={styles.subtext}>
          Choose the Kana you wish to be quizzed on in the following page
        </Text>
        <View style={styles.buttonContainer}>
          <RoundedButton
            title="Hiragana"
            onClick={() =>
              navigation.navigate('KanaGrid', {
                gridType: KanaGridTypes.Hiragana,
              })
            }
          />
          <RoundedButton
            title="Katakana"
            onClick={() =>
              navigation.navigate('KanaGrid', {
                gridType: KanaGridTypes.Katakana,
              })
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

ReviewSelectScreen.navigationOptions = {
  headerShown: false,
};

export default ReviewSelectScreen;

const styles = StyleSheet.create({
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
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  hr: {
    marginTop: 40,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '100%',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  subtext: {
    marginTop: 10,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
  },
  contentContainer: {
    justifyContent: 'center',
    padding: 40,
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
