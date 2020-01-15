/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View, ScrollView, StyleSheet, ActivityIndicator, Text,
} from 'react-native';

import { fetchBuildings, addBuildingSuccess } from './actionCreator';

import addFarmIcon from '../../assets/buildings/addFarm.png';
import addMineIcon from '../../assets/buildings/addMine.png';

import { CardView } from '../common/components';

import BuildingItem from './buildingItem';
import AddBuildingItem from './addBuildingItem';
import OneBuilding from '../OneBuilding';

import ErrorPopup from '../ErrorPopup';

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
  const token = useSelector((state) => state.auth.token);
  const { listOfBuildings, isLoading, error } = useSelector((state) => state.buildings);

  const [activeId, setActiveId] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchBuildings(token));
  }, []);

  function handlePress(id) {
    setModalVisible(true);
    setActiveId(id);
  }

  function addNewBuilding(type) {
    dispatch(addBuildingSuccess(type));
  }

  if (error) {
    return <ErrorPopup message={`Oops, ${error.message}`} />;
  }

  if (isLoading) {
    return (
      <CardView style={{ alignItems: 'center' }}>
        <ActivityIndicator size={32} />
        <Text style={{ marginTop: 12 }}>Loading...</Text>
      </CardView>
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
          {ADD_ICON_LIST.map((addBuildingIcon) => (
            <AddBuildingItem
              key={addBuildingIcon.type}
              icon={addBuildingIcon.url}
              type={addBuildingIcon.type}
              onPress={() => addNewBuilding(addBuildingIcon.type)}
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
