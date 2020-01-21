import React from 'react';
import {
  View, Text, StyleSheet, Image,
} from 'react-native';
import PropTypes from 'prop-types';

import { CardView } from '../common/components';

import troopAvatar from '../../assets/troop/troop.png';
import crownIcon from '../../assets/crown.png';
import goldIcon from '../../assets/gold.png';
import Colors from '../common/colors';

const styles = StyleSheet.create({
  container: {
    minWidth: 250,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 0,
  },
  contentStyle: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: 10,
  },
  textStyle: {
    lineHeight: 32,
  },
  rankTextStyle: {
    fontWeight: 'bold',
    lineHeight: 32,
  },
  avatarStyle: {
    width: 64,
    height: 64,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  triangle: {
    borderWidth: 10,
    borderTopColor: Colors.transparent,
    borderBottomColor: Colors.transparent,
    borderLeftColor: Colors.transparent,
    borderRightColor: Colors.transparentWhiteColor,
    marginLeft: -32,
  },
});

function MyRankingItem({ ranking, gold, kingdom }) {
  return (
    <CardView style={styles.container}>
      <View style={styles.triangle} />
      <View style={styles.contentStyle}>
        <Image style={styles.avatarStyle} source={troopAvatar} />
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={styles.textStyle}>My ranking: </Text>
          <Text style={styles.rankTextStyle}>{ranking}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', marginRight: 10 }}>
            <Image style={styles.iconStyle} source={goldIcon} />
            <Text style={{ color: Colors.blackColor }}>{` ${gold}`}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: 10 }}>
            <Image style={styles.iconStyle} source={crownIcon} />
            <Text style={{ color: Colors.blackColor }}>{` ${kingdom}`}</Text>
          </View>
        </View>
      </View>
    </CardView>
  );
}

MyRankingItem.propTypes = {
  ranking: PropTypes.number,
  gold: PropTypes.number,
  kingdom: PropTypes.number,
};

MyRankingItem.defaultProps = {
  ranking: 1,
  gold: 0,
  kingdom: 0,
};

export default MyRankingItem;
