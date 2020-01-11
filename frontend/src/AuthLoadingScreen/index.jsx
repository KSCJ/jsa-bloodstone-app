import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View, Text, Image,
} from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

import { fetchBuildings } from '../Buildings/actionCreator';
import { fetchTroops } from '../Troops/actionCreator';
import { fetchResources } from '../Resources/actionCreator';
import JetLoading from '../../assets/jet.gif';

function Sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function PromiseAllWithLoading(promises, callback) {
  let d = 0;
  callback(d);
  promises.forEach((promise) => {
    promise.then(() => {
      d += 1;
      callback((d * 100) / promises.length);
    });
  });
  return Promise.all(promises);
}

function AuthLoadingScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { token } = useSelector((state) => state.auth);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    async function loadStore() {
      await PromiseAllWithLoading([
        dispatch(fetchResources()),
        dispatch(fetchBuildings()),
        dispatch(fetchTroops()),
        Sleep(1000),
        Sleep(2000),
        Sleep(3000),
      ], setPercent);
      await Sleep(200);
      if (token) {
        return navigation.navigate('Home');
      }
      return navigation.navigate('Auth');
    }
    loadStore();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={JetLoading} />
      <Text>{`${Number.parseInt(percent, 10)}%`}</Text>
    </View>
  );
}

export default AuthLoadingScreen;
