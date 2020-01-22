import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
import { changeDisplayedComponent } from './actionCreator';

import MenuItem from './MenuItem';
import Resources from '../Resources';

import buildingMenuIcon from '../../assets/menu/Buildings.png';
import troopsMenuIcon from '../../assets/menu/Troops.png';
import battleMenuIcon from '../../assets/menu/Battle.png';
import leaderBoardMenuIcon from '../../assets/menu/Leaderboard.png';

const ICON_LIST = [
  { name: 'Buildings', url: buildingMenuIcon },
  { name: 'Troops', url: troopsMenuIcon },
  { name: 'Battle', url: battleMenuIcon },
  { name: 'Leaderboard', url: leaderBoardMenuIcon },
];

const styles = StyleSheet.create({
  container: {
    padding: 0,
    height: 150,
    // marginBottom: 10,
    // backgroundColor: '#00bcd4',
  },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.08)',
    marginHorizontal: 10,
  },
  titleStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#eee',
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
});

function Menu() {
  const activeComponent = useSelector((state) => state.menu.currentlyDisplayComponent);
  const dispatch = useDispatch();

  function handlePress(name) {
    dispatch(changeDisplayedComponent(name));
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.titleStyle}>My Kingdom</Text>
        </View>
        <Resources />
      </View>
      <View style={styles.itemContainer}>
        {ICON_LIST.map((element) => (
          <MenuItem
            key={element.url}
            src={element.url}
            name={element.name}
            onPress={handlePress}
            activeComponent={activeComponent}
          />
        ))}
      </View>
    </View>
  );
}

export default Menu;
