import React from 'react';
import {
  View, Text, Image, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { SubCardView } from '../common/components';

import troopAvatar from '../../assets/troop/troop.png';
import crownIcon from '../../assets/crown.png';
import goldIcon from '../../assets/gold.png';
import colors from '../common/colors';

const styles = StyleSheet.create({
  container: {
    minWidth: 250,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  triangle: {
    borderWidth: 10,
    borderTopColor: colors.transparent,
    borderBottomColor: colors.transparent,
  },
  rankTextStyle: {
    fontWeight: 'bold',
    color: colors.whiteColor,
    paddingHorizontal: 10,
  },
  avatarStyle: {
    width: 48,
    height: 48,
    marginRight: 15,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  headerTextStyle: {
    fontSize: 15,
    maxWidth: 130,
    color: colors.whiteColor,
    fontWeight: 'bold',
  },
  textStyle: {
    color: colors.whiteColor,
  },
});

function RankingItem({
  ranking, gold, kingdom, themeColor, name,
}) {
  const extraContainerStyle = {
    backgroundColor: themeColor,
  };
  const extraTriangleStyle = {
    borderLeftColor: colors.transparent,
    borderRightColor: themeColor,
    marginLeft: -30,
  };

  return (
    <SubCardView style={[styles.container, extraContainerStyle]}>
      <View style={[styles.triangle, extraTriangleStyle]} />
      <Text style={styles.rankTextStyle}>{ranking}</Text>
      <Image source={troopAvatar} resizeMode="contain" style={styles.avatarStyle} />
      <View>
        <Text numberOfLines={1} style={styles.headerTextStyle}>{name}</Text>
        <View style={{ flexDirection: 'row', marginTop: 5 }}>
          <View style={{ flexDirection: 'row', marginRight: 10 }}>
            <Image style={styles.iconStyle} source={goldIcon} />
            <Text style={styles.textStyle}>{` ${gold}`}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: 10 }}>
            <Image style={styles.iconStyle} source={crownIcon} />
            <Text style={styles.textStyle}>{` ${kingdom}`}</Text>
          </View>
        </View>
      </View>
    </SubCardView>
  );
}

RankingItem.propTypes = {
  ranking: PropTypes.number,
  gold: PropTypes.number,
  kingdom: PropTypes.number,
  themeColor: PropTypes.string,
  name: PropTypes.string,
};

RankingItem.defaultProps = {
  ranking: 1,
  gold: 0,
  kingdom: 0,
  themeColor: colors.greyColor,
  name: 'The Incredible',
};

export default RankingItem;
