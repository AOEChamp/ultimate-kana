import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import KanaGridScreen from '../screens/KanaGridScreen';
import LinksScreen from '../screens/LinksScreen';
import KanaReferenceGridScreen from '../screens/KanaReferenceGridScreen';
import SettingsScreen from '../screens/SettingsScreen';
import QuizScreen from '../screens/QuizScreen';
import LessonSelectScreen from '../screens/LessonSelectScreen';
import LessonScreen from '../screens/LessonScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  KanaGrid: KanaGridScreen,
  QuizScreen: QuizScreen,
  LessonSelectScreen: LessonSelectScreen,
  LessonScreen: LessonScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const KanaGridStack = createStackNavigator({
  KanaGrid: KanaReferenceGridScreen,
});

KanaGridStack.navigationOptions = {
  tabBarLabel: 'Grid',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-grid' : 'md-grid'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  KanaGridStack,
  SettingsStack,
});
