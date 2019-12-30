import React from 'react';
import {
  SafeAreaView, StyleSheet,
} from 'react-native';
import { ScrollView } from 'react-navigation';
import { useNavigation } from 'react-navigation-hooks';
import {
  Ionicons, AntDesign, Entypo, Foundation,
} from '@expo/vector-icons';
import commonStyles from '../common/styles';
import PanelView from './PanelView';
import ItemView from './ItemView';
import Colors from '../common/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...commonStyles.container,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
});

function Playground() {
  const navigation = useNavigation();
  function handleLogin() {
    navigation.push('Login');
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <PanelView title="广场">
          <ItemView title="我的收藏" icon={<AntDesign size={28} name="star" color={Colors.orangeColor} />} />
          <ItemView title="我的收藏" icon={<Ionicons size={28} name="ios-heart" color={Colors.redColor} />} />
          <ItemView title="我的星球" icon={<Ionicons size={28} name="md-planet" color={Colors.blueColor} />} />
        </PanelView>
        <PanelView title="Test">
          <ItemView
            title="Map"
            icon={<Foundation size={28} name="map" color={Colors.greenColor} />}
          />
          <ItemView
            title="Logout"
            icon={<Entypo size={28} name="log-out" color={Colors.blueColor} />}
            onPress={handleLogin}
          />
        </PanelView>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Playground;
