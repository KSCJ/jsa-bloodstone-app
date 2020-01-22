import React from 'react';
import {
  ScrollView, StyleSheet, Platform, Text, StatusBar,
} from 'react-native';

import Constants from 'expo-constants';
import Colors from '../common/colors';
import commonStyles from '../common/styles';
import Menu from '../Menu';
import Troops from '../Troops';
import Leaderboard from '../Leaderboard';
import Buildings from '../Buildings';
import Battle from '../Battle';

const styles = StyleSheet.create({
  safeViewContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    flexGrow: 1,
  },
  container: {
    ...commonStyles.container,
    backgroundColor: '#222',
  },
});

function Playground() {
  return (
    <ScrollView style={styles.container}>
      <Menu />
      {/* <Buildings />
      <Troops />
      <Battle />
      <Leaderboard /> */}
    </ScrollView>
  );
}

export default Playground;
