import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';
import Settings from '../Settings';
import colors from '../common/colors';
import Game from '../Game';
import Login from '../Login';
import ForgottenPassword from '../Login/ForgottenPassword';
import Registration from '../Registration';
import RegistrationMap from '../Map';
import AuthLoadingScreen from '../AuthLoadingScreen';

const hideHeaderOptions = {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  },
};

const bottomNavigationOptions = {
  initialRouteName: 'MyKingdom',
  order: ['MyKingdom', 'Settings'],
  tabBarOptions: {
    activeBackgroundColor: '#00695c',
    tabStyle: {
      padding: 0,
    },
    labelStyle: {
      fontWeight: 'bold',
      color: colors.whiteColor,
    },
    style: {
      backgroundColor: colors.tealColor,
      position: 'absolute',
    },
  },
};

const renderIcon = (name) => (
  <Ionicons
    style={{ color: colors.whiteColor }}
    name={name}
    size={25}
  />
);

const TabNavigator = createBottomTabNavigator({
  MyKingdom: {
    screen: Game,
    navigationOptions: {
      title: 'Kingdom',
      tabBarLabel: 'My Kingdom',
      tabBarIcon: () => renderIcon('ios-home'),
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarIcon: () => renderIcon('md-settings'),
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
