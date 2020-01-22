import React from 'react';
import { View, StyleSheet } from 'react-native';
import Menu from '../Menu';
import MainView from '../MainView';
import commonStyles from '../common/styles';

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
    backgroundColor: 'rgba(0,0,0,.65)',
  },
});
function Game() {
  return (
    // <ImageBackground
    //   style={commonStyles.background}
    //   resizeMode="cover"
    //   source={background}
    // >
    <View style={styles.container}>
      <Menu />
      <MainView />
    </View>
    // </ImageBackground>
  );
}

export default Game;
