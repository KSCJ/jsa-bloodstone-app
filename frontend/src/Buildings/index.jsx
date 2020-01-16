/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View, ScrollView, StyleSheet, ActivityIndicator,
} from 'react-native';
import { Toast } from 'native-base';

import { fetchBuildings, addBuilding, ADD_BUILDING_FAILURE } from './actionCreator';

import addFarmIcon from '../../assets/buildings/addFarm.png';
import addMineIcon from '../../assets/buildings/addMine.png';

import Colors from '../common/colors';
import { CardView } from '../common/components';

import BuildingItem from './buildingItem';
import AddBuildingItem from './addBuildingItem';
import OneBuilding from '../OneBuilding';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    marginBottom: 0,
    paddingBottom: 52,
  },
  scrollViewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  addBuildingContainer: {
    bottom: 0,
    width: '100%',
    paddingVertical: 10,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.08)',
  },
  textStyle: {
    fontSize: 15,
    lineHeight: 20,
  },
});

const ADD_ICON_LIST = [
  { type: 'Farm', url: addFarmIcon },
  { type: 'Mine', url: addMineIcon },
];

function Buildings() {
  const dispatch = useDispatch();
  const buildings = useSelector((state) => state.buildings);
  const { listOfBuildings, buildingPrice, isLoading } = buildings;
  const { token } = useSelector((state) => state.auth);
  const [isModalVisible, setModalVisible] = useState(false);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    dispatch(fetchBuildings(token));
  }, []);

  function handlePress(id) {
    setModalVisible(true);
    setActiveId(id);
  }

  async function addNewBuilding(type) {
    const { type: actionType, payload } = await dispatch(addBuilding(type, token));
    if (actionType === ADD_BUILDING_FAILURE) {
      Toast.show({
        type: 'warning',
        duration: 3000,
        text: payload,
        buttonText: 'Okay',
      });
    } else {
      Toast.show({
        type: 'success',
        duration: 3000,
        text: 'Building is succesfully added',
        buttonText: 'Okay',
      });
    }
  }

  if (isLoading) {
    return (
      <ActivityIndicator size="large" color={Colors.tealColor} />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CardView style={styles.container}>
        <ScrollView
          bounces
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollViewContainer}
        >
          {listOfBuildings.map((building) => (
            <BuildingItem
              key={building._id}
              type={building.type}
              level={building.level}
              onPress={() => handlePress(building._id)}
            />
          ))}
        </ScrollView>
        <View style={styles.addBuildingContainer}>
          {ADD_ICON_LIST.map((addBuildingIcon, index) => (
            <AddBuildingItem
              key={addBuildingIcon.type}
              icon={addBuildingIcon.url}
              type={addBuildingIcon.type}
              onPress={() => addNewBuilding(addBuildingIcon.type)}
              price={buildingPrice[index]}
            />
          ))}
        </View>
      </CardView>
      {isModalVisible
        ? (
          <OneBuilding
            isVisible={isModalVisible}
            onClickClose={() => setModalVisible(false)}
            targetBuildingId={activeId}
          />
        )
        : null}
    </View>
  );
}

export default Buildings;
