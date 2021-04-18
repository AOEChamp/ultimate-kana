import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import KanaSelectScreen from '../screens/KanaSelectScreen';
import KanaReferenceGridScreen from '../screens/KanaReferenceGridScreen';
import SettingsScreen from '../screens/SettingsScreen';
import QuizScreen from '../screens/QuizScreen';
import ReviewScreen from '../screens/ReviewScreen';
import LessonSelectScreen from '../screens/LessonSelectScreen';
import LessonScreen from '../screens/LessonScreen';
import ReviewSelectScreen from '../screens/ReviewSelectScreen';
import SettingsPickerScreen from '../components/settings/SettingsPickerScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  LessonSelectScreen,
  LessonScreen,
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

const ReviewStack = createStackNavigator({
  ReviewSelectScreen,
  KanaSelectScreen,
  QuizScreen,
  ReviewScreen,
});

ReviewStack.navigationOptions = {
  tabBarLabel: 'Review',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
};

const KanaGridStack = createStackNavigator({
  KanaGrid: KanaReferenceGridScreen,
});

KanaGridStack.navigationOptions = {
  tabBarLabel: 'Grid',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-grid' : 'md-grid'} />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
  SettingsPickerScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  ReviewStack,
  KanaGridStack,
  SettingsStack,
});
