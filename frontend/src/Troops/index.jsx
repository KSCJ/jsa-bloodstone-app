/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View, ActivityIndicator, ScrollView,
} from 'react-native';
import { CardView } from '../common/components';
import Colors from '../common/colors';

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
    return <ActivityIndicator size="large" color={Colors.tealColor} />;
  }

  const {
    attack, defence, hp: sustenance, countByLevel,
  } = infoOfTroops;

  return (
    <View style={{ flexDirection: 'column', marginBottom: 0 }}>
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
    </View>
  );
}

export default Troops;
