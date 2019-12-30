import React from 'react';
import {
  View, SafeAreaView, StyleSheet,
} from 'react-native';
import { ScrollView } from 'react-navigation';
import {
  Ionicons, AntDesign, Feather,
  MaterialCommunityIcons,
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
    // borderWidth: 1,
  },
  scrollViewStyle: {
    // borderWidth: 1,
    // borderColor: 'red',
  },
});

function Playground() {
  return (
    // <SafeAreaView style={{ flex: 1, borderWidth: 1 }}>
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <PanelView title="广场">
          <ItemView title="我的收藏" icon={<AntDesign size={28} name="star" color={Colors.orangeColor} />} />
          <ItemView title="我的收藏" icon={<Ionicons size={28} name="ios-heart" color={Colors.redColor} />} />
          <ItemView title="我的星球" icon={<Ionicons size={28} name="md-planet" color={Colors.blueColor} />} />
        </PanelView>
        <PanelView title="三连哦亲">
          <ItemView title="点赞" icon={<Ionicons size={28} name="md-thumbs-up" color={Colors.tealColor} />} />
          <ItemView title="投币" icon={<MaterialCommunityIcons size={28} name="coin" />} />
          <ItemView title="收藏" icon={<AntDesign size={28} name="star" color={Colors.orangeColor} />} />
        </PanelView>
        {/* <PanelView title="广场" /> */}
      </ScrollView>
    </View>
  );
}

export default Playground;
