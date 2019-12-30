import React from 'react';
import {
  SafeAreaView, ScrollView, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import commonStyles from '../common/styles';
import PanelView from './PanelView';
import ItemView from './ItemView';
import Colors from '../common/colors';

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
});

function Playground() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView>
        <PanelView title="Playground">
          <ItemView title="Heart" icon={<Ionicons size={28} name="ios-heart" color={Colors.redColor} />} />
          <ItemView title="Jet" icon={<Ionicons size={28} name="ios-jet" color={Colors.blueColor} />} />
          <ItemView title="Planet3" icon={<Ionicons size={28} name="md-planet" />} />
          <ItemView title="Planet4" icon={<Ionicons size={28} name="md-planet" />} />
        </PanelView>
        {/* <PanelView title="Collection" />
        <PanelView title="Mark" /> */}
      </SafeAreaView>
    </ScrollView>
  );
}

export default Playground;
