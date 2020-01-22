import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import Troops from '../Troops';
import Leaderboard from '../Leaderboard';
import Buildings from '../Buildings';
import Battle from '../Battle';

const mainViewStyle = {
  flex: 1,
  // paddingVertical: 10,
};

function MainView() {
  const currentlyDisplayComponent = useSelector((state) => state.menu.currentlyDisplayComponent);
  let componentToRender;
  switch (currentlyDisplayComponent) {
    case 'Buildings':
      componentToRender = <Buildings />;
      break;
    case 'Troops':
      componentToRender = <Troops />;
      break;
    case 'Battle':
      componentToRender = <Battle />;
      break;
    case 'Leaderboard':
      componentToRender = <Leaderboard />;
      break;
    default:
      componentToRender = <Text>Sorry, something went wrong</Text>;
  }

  return (
    <View style={mainViewStyle}>
      {componentToRender}
    </View>
  );
}

export default MainView;
