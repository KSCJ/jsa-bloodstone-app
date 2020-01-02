import React from 'react';
import {
  SafeAreaView, StyleSheet, Platform, ScrollView,
} from 'react-native';
import {
  Ionicons, AntDesign, Entypo, Foundation,
} from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useNavigation } from 'react-navigation-hooks';
import PanelView from './PanelView';
import ItemView from './ItemView';
import Colors from '../common/colors';

const styles = StyleSheet.create({
  safeViewContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
    flexWrap: 'wrap',
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
    padding: 10,
  },
});

function Playground() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeViewContainer}>
      <ScrollView bounces contentContainerStyle={styles.container}>
        <PanelView title="广场">
          <ItemView title="我的收藏" icon={<AntDesign size={28} name="star" color={Colors.orangeColor} />} />
          <ItemView title="我的收藏" icon={<Ionicons size={28} name="ios-heart" color={Colors.redColor} />} />
          <ItemView title="我的星球" icon={<Ionicons size={28} name="md-planet" color={Colors.blueColor} />} />
          <ItemView title="我的星球" icon={<Ionicons size={28} name="md-planet" color={Colors.blueColor} />} />
        </PanelView>
        <PanelView title="中文">
          <ItemView title="我的收藏" icon={<AntDesign size={28} name="star" color={Colors.orangeColor} />} />
          <ItemView
            title="Map"
            icon={<Foundation size={32} name="map" color={Colors.greenColor} />}
            onPress={() => navigation.navigate('Map')}
          />
          <ItemView
            title="Logout"
            icon={<Entypo size={28} name="log-out" color={Colors.blueColor} />}
            onPress={() => navigation.push('Login')}
          />
        </PanelView>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Playground;
