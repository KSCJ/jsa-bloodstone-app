import React from 'react';
import {
  View, StyleSheet,
  ScrollView,
} from 'react-native';
import RankingItem from './RankingItem';
import MyRankingItem from './MyRankingItem';
import RankingAxis from './RankingAxis';
import colors from '../common/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffffcc',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  scrollViewContainer: {
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
  leftLayout: {
    flexDirection: 'row',
  },
  centerLayout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
function MyRanking() {
  return (
    <ScrollView
      bounces
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContainer}
    >
      <View style={styles.leftLayout}>
        <RankingAxis amount={2} circleColor={colors.tealColor} />
        <View>
          <RankingItem ranking={1} gold={23450} kingdom={3} themeColor={colors.tealColor} name="CLAY" />
          <RankingItem ranking={2} gold={13240} kingdom={1} themeColor={colors.tealColor} name="SHERRY" />
        </View>
      </View>
      <View style={styles.centerLayout}>
        <RankingAxis amount={1} circleColor={colors.blueColor} style={{ paddingVertical: 80 }} />
        <MyRankingItem ranking={3} gold={12580} kingdom={1} />
      </View>
      <View style={styles.leftLayout}>
        <RankingAxis amount={5} circleColor={colors.greyColor} />
        <View>
          <RankingItem ranking={4} gold={12450} kingdom={1} name="JIALU" />
          <RankingItem ranking={5} gold={5680} kingdom={1} name="AJAX" />
          <RankingItem ranking={6} gold={3256} kingdom={1} name="XIAOXING" />
          <RankingItem ranking={7} gold={3000} kingdom={1} name="KATY" />
          <RankingItem ranking={8} gold={2200} kingdom={1} name="DEMO" />
        </View>
      </View>
    </ScrollView>
  );
}

export default MyRanking;
