import React, { useState } from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import TopRanking from './TopRanking';
import MyRanking from './MyRanking';
import MenuItem from './MenuItem';

import { CardView } from '../common/components';
import colors from '../common/colors';

const TOP_RANKING = 'Leaderboard';
const MY_RANKING = 'MyRanking';

const styles = StyleSheet.create({
  container: {
    marginTop: 1,
    flex: 1,
    padding: 0,
    paddingBottom: 50,
  },
  menuContainer: {
    backgroundColor: '#ffffffcc',
    flexDirection: 'row',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  contentContainer: {
    flex: 1,
    elevation: 0,
    marginBottom: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: '#ffffffcc',
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  textStyle: {
    color: colors.whiteColor,
  },
});

function getChildComponent(active) {
  if (active === TOP_RANKING) {
    return <TopRanking />;
  }
  if (active === MY_RANKING) {
    return <MyRanking />;
  }
  return null;
}

function Leaderboard() {
  const [activeMenuText, setActiveMenuText] = useState(MY_RANKING);
  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <MenuItem
          active={activeMenuText}
          title={TOP_RANKING}
          onPress={() => setActiveMenuText(TOP_RANKING)}
        />
        <MenuItem
          active={activeMenuText}
          title={MY_RANKING}
          onPress={() => setActiveMenuText(MY_RANKING)}
        />
      </View>
      <CardView style={styles.contentContainer}>
        {getChildComponent(activeMenuText)}
      </CardView>
    </View>
  );
}

export default Leaderboard;
