/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View, ActivityIndicator, Text, ScrollView,
} from 'react-native';
import { CardView } from '../common/components';

import { fetchTroops } from './actionCreator';
import TroopInformation from './TroopInformation';
import TroopLevel from './TroopLevel';
import ErrorPopup from '../ErrorPopup';

function Troops() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(fetchTroops(token));
  }, []);

  const { infoOfTroops, isLoading, error } = useSelector((state) => state.troops);

  if (error) {
    return <ErrorPopup message={`Oops, ${error.message}`} />;
  }

  if (isLoading || Object.keys(infoOfTroops).length === 0) {
    return (
      <CardView style={{ alignItems: 'center' }}>
        <ActivityIndicator size={32} />
        <Text style={{ marginTop: 12 }}>Loading...</Text>
      </CardView>
    );
  }

  const {
    attack, defence, hp: sustenance, countByLevel,
  } = infoOfTroops;

  return (
    <CardView style={{ flexDirection: 'column', marginBottom: 0 }}>
      <ScrollView>
        <TroopInformation
          attack={attack}
          defence={defence}
          sustenance={sustenance}
        />
        <View style={{ paddingVertical: 20 }}>
          {countByLevel.map((item, index) => (
            <TroopLevel
              key={index}
              level={item.level}
              count={item.count}
            />
          ))}
        </View>
      </ScrollView>
    </CardView>
  );
}

export default Troops;
