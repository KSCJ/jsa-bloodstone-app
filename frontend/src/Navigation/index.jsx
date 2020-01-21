import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';
import createTabNavigator from './createTabNavigator';
import Settings from '../Settings';
import Colors from '../common/colors';
import Game from '../Game';
import Login from '../Login';
import ForgottenPassword from '../Login/ForgottenPassword';
import Registration from '../Registration';
import RegistrationMap from '../Map';
import AuthLoadingScreen from '../AuthLoadingScreen';
import Playground from '../Playground';

const hideHeaderOptions = {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  },
};

const bottomNavigationOptions = {
  animationEnabled: true,
  initialRouteName: 'Playground',
  order: ['MyKingdom', 'Playground', 'Settings'],
  barStyle: {
    backgroundColor: Colors.blueColor,
  },
  resetOnBlur: false,
  shifting: true,
  activeTintColor: '#566ed3',
  inactiveTintColor: '#999999',
  tabBarOptions: {
    style: {
      backgroundColor: Colors.tabBar,
    },
    activeTintColor: '#566ed3',
    inactiveTintColor: '#999999',
  },
};

const renderIcon = (name, tintColor) => (
  <Ionicons
    style={{ color: tintColor }}
    name={name}
    size={25}
  />
);

const TabNavigator = createTabNavigator({
  MyKingdom: {
    screen: Game,
    navigationOptions: {
      title: 'Kingdom',
      tabBarLabel: 'My Kingdom',
      tabBarIcon: ({ tintColor }) => renderIcon('md-home', tintColor),
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => renderIcon('md-settings', tintColor),
    },
  },
  Playground: {
    screen: Playground,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => renderIcon('md-planet', tintColor),
    },
  },
}, bottomNavigationOptions);

const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
    path: 'login/',
  },
  Registration,
  ForgottenPassword,
}, hideHeaderOptions);

const HomeStack = createStackNavigator({
  Home: {
    screen: TabNavigator,
    path: 'kingdom/',
  },
}, hideHeaderOptions);

const AuthLoadingStack = createStackNavigator({
  AuthLoading: {
    screen: AuthLoadingScreen,
    path: 'authLoading/',
  },
}, hideHeaderOptions);

const MapStack = createStackNavigator({
  RegistrationMap,
}, hideHeaderOptions);

const AppNavigator = createSwitchNavigator({
  AuthLoading: AuthLoadingStack,
  Auth: AuthStack,
  Map: MapStack,
  Home: HomeStack,
}, {
  initialRouteName: 'AuthLoading',
  ...hideHeaderOptions,
});

export default AppNavigator;
